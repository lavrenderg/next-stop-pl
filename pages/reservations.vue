<template>
  <v-app>
    <div v-if="this.adminIsLoggedIn" class="grey_backgound1">
      <v-row>
        <p class="stat_loc_p">Status rezerwacji :</p>
        <v-checkbox
          v-for="(status, index) in this.statuses"
          :key="index"
          :value="status"
          v-model="selectedStatuses"
          :label="status"
        ></v-checkbox>
      </v-row>
      <v-row>
        <p class="stat_loc_p">Lokalizacja odbioru :</p>
        <v-checkbox
          v-for="(loc, index) in this.locations"
          :key="index"
          :value="loc"
          v-model="selectedLocations"
          :label="loc"
        ></v-checkbox>
      </v-row>
    </div>
    <v-container v-if="this.adminIsLoggedIn" fluid class="reservations_container">
      <v-btn to="/registerAdmin" class="add_new_admin_account">Dodaj nowe konto</v-btn>
      <ReservationDetails
        v-for="(reservation, index) in this.filteredReservations"
        :key="index"
        :carBrand="carBrand(reservation.val().vin)"
        :carModel="carModel(reservation.val().vin)"
        :reservationStartDate="reservation.val().PickupDate"
        :reservationEndDate="reservation.val().ReturnDate"
        :status="reservation.val().Status"
        :pickupLocation="reservation.val().PickupLocation"
        :returnLocation="reservation.val().ReturnLocation"
        :reservation="reservation.val().ReservationId"
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
      statuses: ['Nowa', 'Potwierdzona', 'W trakcie', 'Anulowana', 'Wygasła'],
      locations: [
        'Oddział Nr 1 - ul. Graniczna, 159',
        'Oddział Nr 2 - ul. Ceglana, 3',
        'Oddział Nr 3 - ul. Komandorska, 53',
      ],
      selectedStatuses: [],
      selectedLocations: [],
      reservations: [],
    }
  },
  computed: {
    adminIsLoggedIn() {
      console.log('Menu adminIsLoggedIn = ' + this.$store.state.adminIsLoggedIn)
      return this.$store.state.adminIsLoggedIn
    },
    carPosts() {
      return this.$store.state.carPosts
    },
    filteredReservations() {
      this.getReservations()
      let res = this.reservations.filter((res) => {
        //console.log('Res : ' + res.val().Status)
        return (
          (this.selectedStatuses.includes(res.val().Status) &&
            this.selectedLocations.includes(res.val().PickupLocation)) ||
          (this.selectedStatuses.includes(res.val().Status) && this.selectedLocations.length === 0) ||
          (this.selectedStatuses.length === 0 && this.selectedLocations.includes(res.val().PickupLocation)) ||
          (this.selectedStatuses.length === 0 && this.selectedLocations.length === 0)
        )
      })

      console.log('Filtered reservations : ' + res.length)
      return res
    },
  },
  methods: {
    getReservations() {
      this.reservations = []
      this.$fire.database
        .ref('Reservations/')
        .orderByChild('IsHidden')
        .equalTo(0)
        .on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            this.reservations.push(childSnapshot)
          })
        })
      console.log('reservationsPage=' + this.reservations.length)
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
  /*mounted() {
    if (!this.adminIsLoggedIn) {
      window.location.href = '/myReservations'
    }
  },*/
}
</script>
