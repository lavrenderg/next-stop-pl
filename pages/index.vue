<template>
  <div class="background">
    <v-card shaped elevation="15" class="quick_reservation" color="#ffffff">
      <v-col>
        <v-row>
          <h1 class="color_test">Szybka rezerwacja</h1>
        </v-row>
        <v-row>
          <p class="color_test">Lokalizacja</p>
        </v-row>
        <v-row>
          <v-text-field class="location_btn" placeholder="Odbiór"></v-text-field>
          <v-text-field class="location_btn" placeholder="Zwrot"></v-text-field>
        </v-row>
        <v-row>
          <p>Data</p>
        </v-row>
        <v-row>
          <v-btn>=></v-btn>
        </v-row>
      </v-col>
    </v-card>
    <div class="car_examples_slider">
      <splide :options="options">
        <splide-slide v-for="(carPost, index) in carPosts" :key="index">
          <img :src="carPost.img" />
          <div class="car_post_slider">
            <h3>{{ carPost.model }}</h3>
            <h5>Od {{ carPost.price }} zł</h5>
          </div>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  data() {
    return {
      options: {
        type: 'loop',
        rewind: true,
        gap: '1rem',
        perPage: 2,
        fixedWidth: '10rem',
        fixedHeight: '10rem',
        cover: true,
        keyboard: true,
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  computed: {
    carPosts() {
      return this.$store.state.carPosts
    },
  },
}
</script>