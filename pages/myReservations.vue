<template>
  <v-container fluid class="reservations_container">
    <ClientReservationDetails
      v-for="(reservation, index) in getReservedCarVins"
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
</template>

<script>
import ClientReservationDetails from '@/components/general/ClientReservationDetails'
export default {
  components: {
    ClientReservationDetails,
  },
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  data() {
    return {
      reservations: [],
      reservationNr: 0,
    }
  },
  computed: {
    getReservedCarVins() {
      this.getUserReservations()
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
    getUserReservations() {
      this.reservations = []
      if (this.$fire.auth.currentUser) {
        let ref = this.$fire.database.ref('Reservations/')
        ref
          .orderByChild('UserId')
          .equalTo(this.$fire.auth.currentUser.uid)
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              this.reservations.push(childSnapshot)
            })
          })
      }
      console.log('computing..' + this.reservations.length)
    },
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