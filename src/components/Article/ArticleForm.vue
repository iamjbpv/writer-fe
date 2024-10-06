<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Edit Article' : 'Add New Article' }}</h1>
    <form @submit.prevent="saveArticle(0)">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="article.title" placeholder="Title" required />
      </div>
      <div class="form-group">
        <label for="link">Link</label>
        <input type="url" id="link" v-model="article.link" placeholder="Link" required />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="article.date" required />
      </div>
      <!-- <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="article.content" placeholder="Content" required></textarea>
      </div> -->
      <QuillEditor theme="snow" v-model:content="article.content" ref="quillEditor" />
      <div class="form-group">
        <label for="company">Company</label>
        <select id="company" v-model="article.company" required>
          <option value="" disabled>Select Company</option>
          <option v-for="company in companies" :key="company.id" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="isEditMode && article.image">
        <h5>Current Image</h5>
        <img :src="`${article.image}`" alt="Current Article Image" class="current-image" />
      </div>

      <div class="form-group">
        <label for="image">{{ isEditMode ? 'Replace Image' : 'Image' }}</label>
        <input type="file" id="image" @change="handleImageUpload" />
      </div>
      <!-- <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="article.status" required>
          <option value="" disabled>Select Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div> -->
      <div class="form-group" v-if="isEditMode">
        <label for="status">Status</label>
        <label>{{ this.article.status == 0 ? 'For Edit' : 'Published' }}</label>
      </div>

      <button
        style="margin-bottom: 10px"
        type="submit"
        class="submit-btn button"
        :disabled="isUserWriter && article.status == 1 && !isUserEditor && isEditMode"
      >
        Save
      </button>
    </form>
    <button v-if="isUserEditor" @click="saveArticle(1)" class="submit-btn button">Publish</button>
  </div>
</template>

<script>
import api from '../../services/api'
import { mapGetters } from 'vuex'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { nextTick } from 'vue'
export default {
  components: {
    QuillEditor
  },
  props: ['id'],
  data() {
    return {
      article: {
        title: '',
        link: '',
        date: '',
        content: '',
        image: '',
        imageFile: '',
        status: 0,
        company: ''
      },
      isEditMode: false,
      companies: []
    }
  },
  computed: {
    ...mapGetters(['getUser']),

    isUserWriter() {
      return this.getUser && this.getUser.type === 'Writer'
    },
    isUserEditor() {
      return this.getUser && this.getUser.type === 'Editor'
    }
  },
  async mounted() {
    await this.fetchCompanies()
    if (this.id) {
      this.isEditMode = true
      const response = await api.getArticle(this.id)
      this.article = response.data
      if (this.article.date) {
        this.article.date = new Date(this.article.date).toISOString().split('T')[0]
      }
      this.article.company = response.data.CompanyId
      const deltaString = response.data.content
      const delta = JSON.parse(deltaString)
      await nextTick()
      console.log(delta)
      if (this.$refs.quillEditor && this.$refs.quillEditor.quill) {
        this.$refs.quillEditor.quill.setContents(delta)
      }
      this.article.content = delta
    }
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await api.getCompanies()
        this.companies = response.data
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    },
    async saveArticle(status) {
      this.article.status = status
      this.article.content = JSON.stringify(this.article.content)
      try {
        if (this.isEditMode) {
          await api.updateArticle(this.id, this.article)
        } else {
          await api.createArticle(this.article)
        }
        this.$router.push('/articles')
      } catch (error) {
        console.error('Error saving article:', error)
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.article.imageFile = reader.result
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>
