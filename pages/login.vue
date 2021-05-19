<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm buttonText="Login" :submitForm="loginUser" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/general/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    async loginUser(loginDetails) {
      await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: loginDetails.email,
          password: loginDetails.password,
        }),
      })
      const responce = await fetch('http://localhost:8000/api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const content = await responce.json()
      this.$auth.setUser(content)
    },
  },
}
</script>