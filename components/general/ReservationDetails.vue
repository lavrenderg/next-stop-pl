<template>
  <v-card class="car_reservation_info">
    <v-row>
      <v-col class="car_reservation_client_info1">
        <div>
          <v-card-title>{{ status }} rezerwacja</v-card-title>
          <v-card-subtitle>{{ carBrand }} {{ carModel }}</v-card-subtitle>
          <br />
          <v-select class="select_new_status" :label="status" :items="this.statuses" v-model="newStatus"></v-select>
          <v-btn small class="confirm_status_change" @click="confirmStatusChange">Potwierdź zmianę statusu</v-btn>
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
    'carBrand',
    'carModel',
    'reservationStartDate',
    'reservationEndDate',
    'status',
    'pickupLocation',
    'returnLocation',
    'reservation',
  ],
  data() {
    return {
      statuses: ['Nowa', 'Potwierdzona', 'W trakcie', 'Anulowana', 'Wygasła'],
      newStatus: this.status,
    }
  },
  methods: {
    confirmStatusChange() {
      this.$fire.database.ref('Reservations/' + this.reservation + '/Status').set(this.newStatus)
      this.$forceUpdate()
    },
  },
}
</script>
