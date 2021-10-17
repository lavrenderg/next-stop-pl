<template>
  <v-container fluid class="login_register_container">
    <h1>Rejestracja</h1>

    <UserAuthForm
      buttonText="Zarejestruj się"
      hasName="true"
      hasPhoneNumber="true"
      hasAge="true"
      hasPassword="true"
      :submitForm="registerUser"
    />
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
    async registerUser(registerDetails) {
      let that = this
      await this.$fire.auth
        .createUserWithEmailAndPassword(registerDetails.email, registerDetails.password)
        .catch(function (error) {
          that.showError = true
          that.errMessage = error.message
        })
      this.$fire.auth
        .signInWithEmailAndPassword(registerDetails.email, registerDetails.password)
        .catch(function (error) {
          that.showError = true
          that.errMessage = error.message
        })
      if (this.$fire.auth.currentUser != null) {
        let userUid = this.$fire.auth.currentUser.uid
        this.$fire.database.ref('Users/' + userUid).set({
          Name: registerDetails.name,
          Email: registerDetails.email,
          Phone: registerDetails.phoneNumber,
          Age: registerDetails.age,
        })

        this.$store.commit('setLoggedUser', true)
        this.$store.commit('setLoggedAdmin', false)
        this.$router.push('/')
      }
    },
  },
}
</script>