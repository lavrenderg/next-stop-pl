<template>
  <v-app>
    <v-container fluid class="reservations_container">
      <v-btn to="/registerAdmin" class="add_new_admin_account">Dodaj nowe konto</v-btn>
      <ReservationDetails
        v-for="(reservation, index) in this.getReservations"
        :key="index"
        :carBrand="carBrand(reservation.vin)"
        :carModel="carModel(reservation.vin)"
        :reservationStartDate="reservation.PickupDate"
        :reservationEndDate="reservation.ReturnDate"
        :status="reservation.Status"
        :pickupLocation="reservation.PickupLocation"
        :returnLocation="reservation.ReturnLocation"
        :reservation="reservation.ReservationId"
      />
    </v-container>
  </v-app>
</template>

<script>
import ReservationDetails from '@/components/general/ReservationDetails'

export default {
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  components: {
    ReservationDetails,
  },
  computed: {
    getReservations() {
      return this.$store.state.reservations
    },
    carPosts() {
      return this.$store.state.carPosts
    },
  },
  methods: {
    carBrand(vin) {
      let carB = ''
      this.carPosts.forEach((car) => {
        if (car.vin == vin) {
          carB = car.brand
        }
      })
      return carB
    },
    carModel(vin) {
      let carM = ''
      this.carPosts.forEach((car) => {
        if (car.vin == vin) {
          carM = car.model
        }
      })
      return carM
    },
  },
}
</script>
