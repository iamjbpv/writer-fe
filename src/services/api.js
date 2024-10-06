import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = store.getters.isAuthenticated ? store.state.auth.token : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  getCompanies() {
    return apiClient.get('/company')
  },
  getCompany(id) {
    return apiClient.get(`/company/${id}`)
  },
  createCompany(company) {
    return apiClient.post('/company', company)
  },
  updateCompany(id, company) {
    return apiClient.put(`/company/${id}`, company)
  },
  deleteCompany(id) {
    return apiClient.delete(`/company/${id}`)
  },
  getUsers() {
    return apiClient.get('/users')
  },
  getUser(id) {
    return apiClient.get(`/users/${id}`)
  },
  createUser(user) {
    return apiClient.post('/users', user)
  },
  updateUser(id, user) {
    return apiClient.put(`/users/${id}`, user)
  },
  deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  },

  getArticles() {
    return apiClient.get('/articles')
  },
  getArticle(id) {
    return apiClient.get(`/articles/${id}`)
  },
  createArticle(article) {
    article = {
      ...article,
      CompanyId: article.company
    }
    return apiClient.post('/articles', article)
  },
  updateArticle(id, article) {
    return apiClient.put(`/articles/${id}`, article)
  },
  deleteArticle(id) {
    return apiClient.delete(`/articles/${id}`)
  },

  login(username, password) {
    return apiClient.post('/auth/login', { username, password }).then((response) => {
      // if (response.data.token) {
      //   localStorage.setItem('user', JSON.stringify(response.data))
      // }
      return response.data
    })
  }
}
