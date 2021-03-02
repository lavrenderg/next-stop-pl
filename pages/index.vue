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
        <splide-slide>
          <img src="image1.jpg" />
        </splide-slide>
        <splide-slide>
          <img src="image2.jpg" />
        </splide-slide>
        <splide-slide>
          <img src="image3.jpg" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        rewind: true,
        width: 800,
        gap: '1rem',
      },
    }
  },
}
</script>
