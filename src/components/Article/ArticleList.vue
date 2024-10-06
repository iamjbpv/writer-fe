<template>
  <div>
    <router-link class="button" to="/articles/new">Add New Article</router-link>
    <div class="list-container">
      <h2>Articles List</h2>
      <table v-if="articles.length">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Link</th>
            <th>Date</th>
            <th>Writer Name</th>
            <th>Editor Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td><img width="130px" height="auto" :src="article?.image" alt="Article Image" /></td>
            <td>{{ article.title }}</td>
            <td>
              <a :href="article.link" target="_blank">{{ article.link }}</a>
            </td>
            <td>{{ new Date(article.date).toISOString().split('T')[0] }}</td>
            <td>{{ article.writer?.Firstname }} {{ article.writer?.Firstname }}</td>
            <td>{{ article.editor?.Firstname }} {{ article.editor?.Firstname }}</td>
            <td>{{ article.status == 0 ? 'For Edit' : 'Published' }}</td>
            <td>
              <router-link class="button" :to="'/articles/edit/' + article.id">Edit</router-link>
              <a class="button" @click="deleteArticle(article.id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No articles found.</p>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      api.getArticles().then((response) => {
        this.articles = response.data
      })
    },
    deleteArticles(id) {
      if (confirm('Are you sure you want to delete this article?')) {
        api.deleteArticles(id).then(() => {
          this.fetchArticles()
        })
      }
    }
  }
}
</script>
