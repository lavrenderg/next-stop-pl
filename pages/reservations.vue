<template>
  <v-app>
    <v-container fluid class="reservations_container">
      <v-container> </v-container>
      <v-btn to="/registerAdmin" class="add_new_admin_account">Dodaj nowe konto</v-btn>
      <ReservationDetails
        v-for="(reservation, index) in getReservds"
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
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  components: {
    ReservationDetails,
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
    getReservds() {
      this.getReservations()
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
    getReservations() {
      this.reservations = []
      if (this.$fire.auth.currentUser) {
        let ref = this.$fire.database.ref('Reservations/')
        ref
          .orderByChild('IsHidden')
          .equalTo(0)
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              this.reservations.push(childSnapshot)
            })
          })
      }
      console.log('computing..' + this.reservations.length)
    },
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
