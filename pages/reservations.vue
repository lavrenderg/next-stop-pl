<template>
  <v-app>
    <v-container class="reservations_container">
      <ReservationDetails
        v-for="(reservation, index) in getReservations"
        :key="index"
        :reservationNr="'#' + getReservationNr"
        :reservationStartDate="reservation.val().PickupDate"
        :reservationEndDate="reservation.val().ReturnDate"
        :status="reservation.val().Status"
        :pickupLocation="reservation.val().PickupLocation"
        :returnLocation="reservation.val().ReturnLocation"
        :carBrand="carBrand(reservation.val().vin)"
        :carModel="carModel(reservation.val().vin)"
        :reservation="reservation.key"
      />
    </v-container>
  </v-app>
</template>

<script>
import ReservationDetails from '@/components/general/ReservationDetails'
export default {
  components: {
    ReservationDetails,
  },
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  data() {
    return {
      reservationNr: 0,
      carB: '',
      carM: '',
      reservations: [],
    }
  },
  computed: {
    getReservations() {
      this.$fire.database.ref('Reservations/').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.reservations.push(childSnapshot)
        })
      })
      return this.reservations
    },
    getReservationNr() {
      this.reservationNr++
      return this.reservationNr
    },
    carPosts() {
      return this.$store.state.carPosts
    },
  },
  methods: {
    carBrand(vin) {
      this.carPosts.forEach((car) => {
        if (car.vin == vin) {
          this.carB = car.brand
        }
      })
      return this.carB
    },
    carModel(vin) {
      this.carPosts.forEach((car) => {
        if (car.vin == vin) {
          this.carM = car.model
        }
      })
      return this.carM
    },
  },
}
</script>