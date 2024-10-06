<template>
  <div>
    <router-link class="button" to="/users/new">Add New User</router-link>
    <div class="list-container">
      <h2>User List</h2>
      <table v-if="users.length">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>
              <router-link class="button" :to="'/users/edit/' + user.id">Edit</router-link>
              <a class="button" @click="deleteUser(user.id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No users found.</p>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      api.getUsers().then((response) => {
        this.users = response.data
      })
    },
    deleteUser(id) {
      if (confirm('Are you sure you want to delete this company?')) {
        api.deleteUser(id).then(() => {
          this.fetchUsers()
        })
      }
    }
  }
}
</script>
