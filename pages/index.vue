<template>
  <div>
    <div class="quick_reservation">
      <h1>Quick reservation</h1>
      <p>Location</p>
      <textarea v-model="location_pickup" placeholder="Pickup"></textarea>
      <textarea v-model="location_return" placeholder="Return"></textarea>
      <p>Date</p>
      <textarea v-model="date_pickup" placeholder="Pickup"></textarea>
      <textarea v-model="date_return" placeholder="Return"></textarea>
      <v-btn>=></v-btn>
    </div>
    <div class="car_examples_slider">
      <splide :options="options">
        <splide-slide v-for="(carPost, index) in carPosts" :key="index">
          <img :src="carPost.img" />
          <h1>{{ carPost.model }}</h1>
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
        rewind: true,
        gap: '2rem',
        perPage: 5,
        fixedWidth: '15rem',
        fixedHeight: '15rem',
        cover: true,
      },
    }
  },
  computed: {
    carPosts() {
      return this.$store.state.carPosts
    },
  },
}
</script>
