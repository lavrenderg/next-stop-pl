<template>
  <v-card>
    <v-card-text class="cookie_text">
      Ten serwis wykorzystuje pliki Cookies w celu trzymania sesji użytkownika. Zmianę parametrów plików Cookies należy
      dokonać w ustawieniach przeglądarki internetowej. Dalsze korzystanie z serwisu, bez zmiany ustawień przeglądarki
      internetowej oznacza, że użytkownik akceptuje stosowanie plików cookies.
      <div class="cookie_icon"></div>
      <v-btn small class="accept_btn" @click="closeCookie">Akceptuję</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    closeCookie() {
      this.$emit('closeCookie')
    },
  },
}
</script>


