<template>
  <v-app>
    <div class="grey_backgound1">
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
    <v-container fluid class="reservations_container">
      <v-btn to="/registerAdmin" class="add_new_admin_account">Dodaj nowe konto</v-btn>
      <ReservationDetails
        v-for="(reservation, index) in this.filteredReservations"
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
    }
  },
  computed: {
    getReservations() {
      console.log('Number of reservations=' + this.$store.state.reservations.length)
      return this.$store.state.reservations
    },
    carPosts() {
      return this.$store.state.carPosts
    },
    filteredReservations() {
      return this.getReservations.filter((res) => {
        return (
          this.selectedStatuses.includes(res.Status) ||
          this.selectedLocations.includes(res.PickupLocation) ||
          (this.selectedStatuses.length === 0 && this.selectedLocations.length === 0)
        )
      })
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
