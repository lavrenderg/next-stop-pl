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
export default {
  methods: {
    logout() {
      $nuxt.$fire.auth.signOut()
      this.$store.commit('SET_LOGGED_USER', false)
      this.$store.commit('SET_LOGGED_ADMIN', false)
      this.$router.push('/login')
    },
    closeMenu() {
      this.$emit('closeMenu')
    },
  },
  computed: {
    userIsLoggedIn() {
      return this.$store.state.userIsLoggedIn
    },
    adminIsLoggedIn() {
      return this.$store.state.adminIsLoggedIn
    },
    /*adminIsLoggedIn() {
      if (this.$fire.auth.currentUser) {
        if (this.$fire.auth.currentUser.uid == 'gQf6xebhWqYXYzU3OIz39y45Glm1') {
          return true
        } else {
          return false
        }
      }
      return false
      let exists = false
      if (this.$fire.auth.currentUser) {
        let ref = this.$fire.database.ref('Admins/' + this.$fire.auth.currentUser.uid)
        ref.once('value').then((snapshot) => {
          console.log('Exists ' + snapshot.exists())
          if (snapshot.exists()) {
            exists = snapshot.exists()
            console.log('Admin1 : ' + exists)
          }
        })
        console.log('Admin2 : ' + exists)
        return exists
      } else {
        console.log('Admin3 : ' + exists)
        return exists
      }
      if (this.$fire.auth.currentUser) {
        let ref = this.$fire.database.ref()
        console.log('Admin is logged : ' + ref.child('Admins').child(this.$fire.auth.currentUser.uid).child('Email'))
        return ref.child('Admins').child(this.$fire.auth.currentUser.uid).child('Email') != null
      } else {
        return false
      }
    },*/
  },
}
</script>