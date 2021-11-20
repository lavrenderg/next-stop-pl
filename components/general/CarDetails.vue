<template>
  <div>
    <v-card class="car_details_div" v-if="showCarDetailsDiv">
      <v-row>
        <v-col class="details_img">
          <v-img max-height="200" max-width="500" class="car_details_img" :src="img" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class="car_description-text">{{ brand }}</h3>
          <h3 class="car_description-text">{{ model }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img class="car_details_icon" src="@/static/icons/transmission.png" />
          <p class="car_description-text">{{ transmission }}</p>
        </v-col>
        <v-col>
          <img class="car_details_icon" src="@/static/icons/engine.png" />
          <p class="car_description-text">{{ engine }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img class="car_details_icon" src="@/static/icons/seats.png" />
          <p class="car_description-text">Liczba miejsc: {{ seats }}</p>
        </v-col>
        <v-col>
          <img class="car_details_icon" src="@/static/icons/trunk.png" />
          <p class="car_description-text">Pojemność bagażnika: {{ trunkCapacity }} l</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img class="car_details_icon" src="@/static/icons/price.png" />
          <p class="car_description-text">{{ price }} zł/24 h</p>
        </v-col>
        <v-col>
          <v-btn @click="toggleCarDivWithReservation" color="#57ba98">Rezerwuj</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="car_reservation_div" v-if="showReservationFormDiv">
      <div class="car_reserve_info">
        <p>Rezerwacja samochodu : {{ brand }} {{ model }}</p>
        <v-row>
          <v-col>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickupDate"
                  label="Data odbioru"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="pickupDate" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="returnDate"
                  label="Data zwrotu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="returnDate" @input="menu2 = false"></v-date-picker>
            </v-menu>
            <p>Lokalizacja odbioru : {{ this.carLocations }}</p>
            <v-select v-model="returnLocation" :items="locations" label="Lokalizacja zwrotu"></v-select>
          </v-col>
          <v-col>
            <UserAuthForm
              v-if="unauthorizedUser"
              buttonText="Potwierdź rezerwację"
              hasName="true"
              hasPhoneNumber="true"
              hasAge="true"
              :submitForm="reserveCar"
            />
            <v-btn class="reserve_car_btn" @click="reserveCar(null)" v-if="!unauthorizedUser"
              >Potwierdź rezerwację</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-card class="after_car_reservation_div" v-if="showAfterReservationDiv">
      <p>Dziękujemy za rezerwację samochodu, prosimy o dokonanie wpłaty za posśrednictwem servisu PayPal</p>
      w ciągu 2 dni albo do dnia daty obrioru samochodu. W przeciwnym przypadku rezerwacja zostanie anulowana.
      <br />
      <div class="paypal_img"></div>
    </v-card>
  </div>
</template>

<script>
import UserAuthForm from '@/components/general/UserAuthForm'
export default {
  components: {
    UserAuthForm,
  },
  props: ['img', 'brand', 'model', 'transmission', 'engine', 'seats', 'trunkCapacity', 'price', 'vin', 'carLocations'],
  data() {
    return {
      showCarDetailsDiv: true,
      showReservationFormDiv: false,
      showAfterReservationDiv: false,
      pickupDate: new Date().toISOString().substr(0, 10),
      returnDate: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      locations: [
        'Oddział Nr 1 - ul. Graniczna, 159',
        'Oddział Nr 2 - ul. Ceglana, 3',
        'Oddział Nr 3 - ul. Komandorska, 53',
      ],
      returnLocation: '',
    }
  },
  methods: {
    toggleCarDivWithReservation() {
      this.showCarDetailsDiv = false
      this.showReservationFormDiv = true
    },
    reserveCar(userInfo) {
      var user = this.$fire.auth.currentUser
      if (user) {
        var reservationId = this.$fire.database.ref('Reservations').push().getKey()
        this.$fire.database.ref('Reservations/' + reservationId).set({
          ReservationId: reservationId,
          vin: this.vin,
          UserId: user.uid,
          PickupDate: this.pickupDate,
          ReturnDate: this.returnDate,
          PickupLocation: this.carLocations,
          ReturnLocation: this.returnLocation,
          Status: 'Nowa',
          IsHidden: 0,
        })
      } else {
        var userId = this.$fire.database.ref('Users').push().getKey()
        var reservationId = this.$fire.database.ref('Reservations').push().getKey()
        this.$fire.database.ref('Users/' + userId).set({
          Name: userInfo.name,
          Email: userInfo.email,
          Phone: userInfo.phoneNumber,
          Age: userInfo.age,
        })
        this.$fire.database.ref('Reservations/' + reservationId).set({
          vin: this.vin,
          UserId: userId,
          PickupDate: this.pickupDate,
          ReturnDate: this.returnDate,
          PickupLocation: this.carLocations,
          ReturnLocation: this.returnLocation,
          Status: 'Nowa',
        })
      }
      this.showReservationFormDiv = false
      this.showAfterReservationDiv = true
    },
  },
  computed: {
    unauthorizedUser() {
      return this.$fire.auth.currentUser == null
    },
  },
}
</script>