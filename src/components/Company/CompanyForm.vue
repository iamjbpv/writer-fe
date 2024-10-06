<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Edit Company' : 'Add New Company' }}</h1>
    <form @submit.prevent="saveCompany" class="company-form">
      <div class="form-group">
        <label for="name">Company Name</label>
        <input type="text" id="name" v-model="company.name" placeholder="Name" required />
      </div>
      <div class="form-group" v-if="isEditMode && company.logo">
        <h5>Current Image</h5>
        <img
          width="200"
          height="auto"
          :src="`${company.logo}`"
          alt="Current Company Logo"
          class="current-image"
        />
      </div>
      <div class="form-group">
        <label for="logo">{{ isEditMode ? 'Replace Logo' : 'Logo' }}</label>
        <input type="file" id="logo" @change="handleImageUpload" />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="company.status" required>
          <option value="" disabled>Select Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">Save</button>
    </form>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  props: ['id'],
  data() {
    return {
      company: {
        name: '',
        logo: '',
        logoFile: '',
        status: true
      },
      isEditMode: false
    }
  },
  mounted() {
    if (this.id) {
      this.isEditMode = true
      api.getCompany(this.id).then((response) => {
        this.company = response.data
      })
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.company.logoFile = reader.result
        }
        reader.readAsDataURL(file)
      }
    },
    saveCompany() {
      if (this.isEditMode) {
        api.updateCompany(this.id, this.company).then(() => {
          this.$router.push('/companies')
        })
      } else {
        api.createCompany(this.company).then(() => {
          this.$router.push('/companies')
        })
      }
    }
  }
}
</script>
