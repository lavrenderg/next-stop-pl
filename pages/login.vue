<template>
  <v-container>
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
    async loginUser(loginDetails) {
      let that = this
      this.$fire.auth.signInWithEmailAndPassword(loginDetails.email, loginDetails.password).catch(function (error) {
        that.showError = true
        that.errMessage = error.message
      })

      this.$forceUpdate()
      this.$router.push('/')
    },
  },
}
</script>