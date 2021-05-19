<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">Our locations</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/carPage">Rent a car</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/">Constact</NuxtLink>
      </li>
      <li>
        <div v-if="$auth.loggedIn">
          <v-btn text>My reservations</v-btn>
          <v-btn v-on:click="logout" text>Logout</v-btn>
        </div>
        <div v-else>
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to="/register">Register</v-btn>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.setUser()
    },
  },
}
</script>