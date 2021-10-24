<template>
  <v-container fluid class="login_register_container">
    <h1>Login</h1>

    <UserAuthForm buttonText="Login" hasPassword="true" :submitForm="loginUser" />
    <p class="error" v-if="showError">{{ errMessage }}</p>
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/general/UserAuthForm'

export default {
  data() {
    return {
      errMessage: '',
      showError: false,
    }
  },
  components: {
    UserAuthForm,
  },
  methods: {
    loginUser(loginDetails) {
      this.$store.dispatch('login', loginDetails).catch((error) => {
        this.showError = true
        this.errMessage = error.message
      })
      this.$router.push('/')
    },
  },
}
</script>