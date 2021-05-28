<template>
  <v-card class="menu">
    <v-btn class="back_btn" nuxt x-small @click="showMenu">Zamknij</v-btn>
    <div class="menu_buttons">
      <div class="btn_with_text1">
        <v-btn class="menu_btn1" nuxt small plain outlined href="/#locations_div">Nasze oddziały </v-btn>
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
      <div>
        <v-btn text to="/myReservations">My reservations</v-btn>
        <v-btn @click="logout" text>Logout</v-btn>
      </div>
      <div>
        <v-btn text to="/reservations">Rezerwacje</v-btn>
        <v-btn @click="logout" text>Logout</v-btn>
      </div>
      <div>
        <v-btn text to="/register">Rejestracja</v-btn>
        <v-btn text to="/login">Logowanie</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  methods: {
    showMenu() {
      this.$emit('showMenu')
    },
    logout() {
      $nuxt.$fire.auth.signOut()
      this.$forceUpdate()
      this.$router.push('/login')
    },
  },
  computed: {
    async adminIsLoggedIn() {
      if (this.$fire.auth.currentUser) {
        let ref = this.$fire.database.ref()
        console.log('REF TO CHILD' + ref.child('Admins').child(this.$fire.auth.currentUser.uid))
        return ref.child('Admins').child(this.$fire.auth.currentUser.uid) != null
      } else {
        return false
      }
    },
  },
}
</script>