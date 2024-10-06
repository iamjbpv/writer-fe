<template>
  <div class="dashboard">
    <header>
      <div class="nav-wrapper">
        <RouterLink to="/"><h1>Dashboard</h1></RouterLink>
        <nav>
          <a @click="logout">
            <svg
              fill="#ffffff"
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 384.971 384.971"
              xml:space="preserve"
            >
              <g>
                <g id="Sign_Out">
                  <path
                    d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
                  />
                  <path
                    d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                  />
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </g>
            </svg>
          </a>
        </nav>
      </div>
    </header>

    <div class="dashboard-content">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-if="isUserEditor">
              <router-link to="/companies">Companies</router-link>
            </li>
            <li>
              <router-link to="/articles">Articles</router-link>
            </li>
            <li v-if="isUserEditor">
              <router-link to="/users">Users</router-link>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUser']),

    isUserEditor() {
      return this.getUser && this.getUser.type === 'Editor'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  background-color: rgb(96 165 250);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px 0;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sidebar nav ul li {
  margin: 0;
}
.sidebar nav ul li a {
  display: block;
  color: black;
}

.sidebar nav ul li a:hover {
  background-color: rgb(96 165 250);
  color: white;
  transition: background-color 0.3s;
}

.main-content {
  flex: 1;
  padding: 16px;
}
</style>
