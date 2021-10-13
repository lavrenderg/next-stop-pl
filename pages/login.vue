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
    async loginUser(loginDetails) {
      let that = this
      this.$fire.auth.signInWithEmailAndPassword(loginDetails.email, loginDetails.password).catch(function (error) {
        that.showError = true
        that.errMessage = error.message
      })
      if (this.$fire.auth.currentUser != null) {
        this.$store.commit('SET_LOGGED_USER', true)
        if (this.$fire.auth.currentUser.uid === 'gQf6xebhWqYXYzU3OIz39y45Glm1') {
          this.$store.commit('SET_LOGGED_ADMIN', true)
        }
        //window.location.reload(true)
        this.$router.push('/')
      }
    },
  },
}
</script>