<template>
  <v-card class="menu">
    <v-btn class="back_btn" nuxt x-small @click="closeMenu">Zamknij</v-btn>
    <div class="menu_buttons">
      <div class="btn_with_text1">
        <v-btn class="menu_btn1" nuxt small plain outlined
          ><NuxtLink to="/#locations_div">Nasze oddziały </NuxtLink></v-btn
        >
        <img class="btn_img1" src="@/static/icons/map.png" />
      </div>
      <div class="btn_with_text2">
        <v-btn class="menu_btn2" nuxt small plain outlined><NuxtLink to="/carPage">Oferta aut</NuxtLink></v-btn>
        <img class="btn_img2" src="@/static/icons/deal.png" />
      </div>
      <div class="btn_with_text3">
        <v-btn class="menu_btn3" nuxt small plain outlined><NuxtLink to="/#locations_div">Kontakt</NuxtLink></v-btn>
        <img class="btn_img3" src="@/static/icons/contact.png" />
      </div>
    </div>
    <div class="test">
      <div v-show="this.adminIsLoggedIn">
        <v-btn text to="/reservations">Rezerwacje</v-btn>
        <v-btn @click="logout" text>Logout</v-btn>
      </div>
      <div v-show="this.userIsLoggedIn && !this.adminIsLoggedIn">
        <v-btn text to="/myReservations">Moje rezerwacje</v-btn>
        <v-btn @click="logout" text>Logout</v-btn>
      </div>
      <div v-show="!this.userIsLoggedIn">
        <v-btn text to="/register">Rejestracja</v-btn>
        <v-btn text to="/login">Logowanie</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut()
      Cookie.remove('access_token')
      this.$store.commit('SET_LOGGED_ADMIN', false)
      location.href = '/login'
    },
    closeMenu() {
      this.$emit('closeMenu')
    },
  },
  computed: {
    userIsLoggedIn() {
      return this.$store.state.user != null
    },
    adminIsLoggedIn() {
      return this.$store.state.adminIsLoggedIn
    },
  },
}
</script>