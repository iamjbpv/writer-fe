<template>
  <div>
    <router-link class="button" to="/companies/new">Add New Company</router-link>
    <div class="list-container">
      <h2>Company List</h2>
      <table v-if="companies.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Logo</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.id">
            <td>{{ company.name }}</td>
            <td><img width="130px" height="auto" :src="company.logo" alt="Company Logo" /></td>
            <td>{{ company.status ? 'Active' : 'Inactive' }}</td>
            <td>
              <router-link class="button" :to="'/companies/edit/' + company.id">Edit</router-link>
              <a class="button" @click="deleteCompany(company.id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No companies found.</p>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data() {
    return {
      companies: []
    }
  },
  mounted() {
    this.fetchCompanies()
  },
  methods: {
    fetchCompanies() {
      api.getCompanies().then((response) => {
        this.companies = response.data
      })
    },
    deleteCompany(id) {
      if (confirm('Are you sure you want to delete this company?')) {
        api.deleteCompany(id).then(() => {
          this.fetchCompanies()
        })
      }
    }
  }
}
</script>
