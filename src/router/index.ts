import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Auth/Login.vue'
import Company from '../components/Company/Company.vue'
import CompanyForm from '../components/Company/CompanyForm.vue'
import Dashboard from '../components/Dashboard.vue'
import api from '../services/api'
import User from '../components/User/User.vue'
import UserForm from '../components/User/UserForm.vue'
import Article from '../components/Article/Article.vue'
import ArticleForm from '../components/Article/ArticleForm.vue'
import store from '../store'
const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
    redirect: '/articles',
    children: [
      {
        path: 'companies',
        name: 'CompanyList',
        component: Company,
        meta: { editorOnly: true }
      },
      {
        path: 'companies/new',
        name: 'CompanyForm',
        component: CompanyForm,
        meta: { editorOnly: true }
      },
      {
        path: 'companies/edit/:id',
        name: 'EditCompany',
        component: CompanyForm,
        props: true,
        meta: { editorOnly: true }
      },
      {
        path: 'users',
        name: 'UserList',
        component: User,
        meta: { editorOnly: true }
      },
      {
        path: 'users/new',
        name: 'UserForm',
        component: UserForm,
        meta: { editorOnly: true }
      },
      {
        path: 'users/edit/:id',
        name: 'EditUser',
        component: UserForm,
        props: true,
        meta: { editorOnly: true }
      },
      {
        path: 'articles',
        name: 'ArticleList',
        component: Article
      },
      {
        path: 'articles/new',
        name: 'ArticleForm',
        component: ArticleForm
      },
      {
        path: 'articles/edit/:id',
        name: 'EditArticle',
        component: ArticleForm,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  const isUserEditor = store.getters.getUser?.type == 'Editor'
  if (to.meta.editorOnly && !isUserEditor) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
