<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm buttonText="Register" hasName="true" hasPhoneNumber="true" :submitForm="registerUser" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/general/UserAuthForm'

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    async registerUser(details) {
      await this.$axios.post('/register', {
        email: details.email,
        name: details.name,
        password: details.password,
      })
    },
  },
}
</script>