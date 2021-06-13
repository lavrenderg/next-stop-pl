<template>
  <v-card class="car_reservation_client_info" :disabled="statusCancelled">
    <v-row>
      <v-col class="car_reservation_client_info1">
        <div>
          <v-card-title>Numer rezerwacji : {{ reservationNr }}</v-card-title>
          <v-card-subtitle>{{ carBrand }} {{ carModel }}</v-card-subtitle>
          <br />
          <v-btn class="cancel_btn" @click="cancelReservation"> Anuluj </v-btn>
        </div>
      </v-col>
      <v-col class="car_reservation_client_info2">
        <v-card-text>
          <v-row>Termin od {{ reservationStartDate }} do {{ reservationEndDate }}</v-row>

          <v-row
            >Lokalizacja odbioru : <br />
            {{ pickupLocation }}</v-row
          >

          <v-row
            >Lokalizacja zwrotu : <br />
            {{ returnLocation }}</v-row
          >

          <v-row>Status : {{ status }}</v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: [
    'reservationNr',
    'carBrand',
    'carModel',
    'reservationStartDate',
    'reservationEndDate',
    'status',
    'pickupLocation',
    'returnLocation',
    'reservation',
  ],
  methods: {
    cancelReservation() {
      this.$fire.database.ref('Reservations/' + this.reservation + '/Status').set('Anulowana')
      this.$forceUpdate()
    },
  },
  computed: {
    statusCancelled() {
      return this.status === 'Anulowana'
    },
  },
}
</script>