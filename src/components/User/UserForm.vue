<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h1>
    <form @submit.prevent="saveUser" class="user-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" placeholder="Username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Password"
          required
        />
      </div>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          v-model="user.firstname"
          placeholder="First Name"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="user.lastname" placeholder="Last Name" required />
      </div>
      <div class="form-group">
        <label for="type">User Type</label>
        <select id="type" v-model="user.type" required>
          <option value="" disabled>Select User Type</option>
          <option value="Writer">Writer</option>
          <option value="Editor">Editor</option>
        </select>
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="user.status" required>
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
      user: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        type: 'Writer',
        status: 1
      },
      isEditMode: false
    }
  },
  mounted() {
    if (this.id) {
      this.isEditMode = true
      api.getUser(this.id).then((response) => {
        this.user = response.data
      })
    }
  },
  methods: {
    saveUser() {
      if (this.isEditMode) {
        api.updateUser(this.id, this.user).then(() => {
          this.$router.push('/users')
        })
      } else {
        api.createUser(this.user).then(() => {
          this.$router.push('/users')
        })
      }
    }
  }
}
</script>
