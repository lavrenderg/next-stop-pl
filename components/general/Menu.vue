<template>
  <v-card class="menu">
    <v-btn class="back_btn" nuxt x-small @click="showMenu">Zamknij</v-btn>
    <div class="menu_buttons">
      <div class="btn_with_text1">
        <v-btn class="menu_btn1" nuxt small plain outlined>
          <NuxtLink to="/"> Nasze oddziały </NuxtLink>
        </v-btn>
        <img class="btn_img1" src="@/static/icons/map.png" />
      </div>
      <div class="btn_with_text2">
        <v-btn class="menu_btn2" nuxt small plain outlined><NuxtLink to="/carPage">Oferta aut</NuxtLink></v-btn>
        <img class="btn_img2" src="@/static/icons/deal.png" />
      </div>
      <div class="btn_with_text3">
        <v-btn class="menu_btn3" nuxt small plain outlined><NuxtLink to="/">Kontakt</NuxtLink></v-btn>
        <img class="btn_img3" src="@/static/icons/contact.png" />
      </div>
    </div>
    <v-row class="login_buttons">
      <div v-if="$auth.loggedIn">
        <v-btn text>My reservations</v-btn>
        <v-btn v-on:click="logout" text>Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/register">Rejestracja</v-btn>
        <v-btn text to="/login">Logowanie</v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.setUser()
    },
  },
  methods: {
    showMenu() {
      this.$emit('showMenu')
    },
  },
}
</script>