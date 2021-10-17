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
    adminIsLoggedIn() {
      let isAdminLoggedBool = false
      if (this.$fire.auth.currentUser != null) {
        this.$fire.database.ref('Admins/').on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.key === this.$fire.auth.currentUser.uid) {
              console.log('key=' + childSnapshot.key + '  currentUseUid=' + this.$fire.auth.currentUser.uid)
              isAdminLoggedBool = true
            }
          })
        })
        console.log('Admin=' + isAdminLoggedBool)
        return isAdminLoggedBool
      } else {
        return false
      }
    },
    async loginUser(loginDetails) {
      let that = this
      this.$fire.auth.signInWithEmailAndPassword(loginDetails.email, loginDetails.password).catch(function (error) {
        that.showError = true
        that.errMessage = error.message
      })
      if (this.$fire.auth.currentUser != null) {
        this.$store.commit('setLoggedUser', true)
        if (this.adminIsLoggedIn()) {
          this.$store.commit('setLoggedAdmin', true)
        }
        this.$router.push('/')
      }
    },
  },
}
</script>