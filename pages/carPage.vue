<template>
  <v-app>
    <v-container class="background container">
      <div class="grey_backgound">
        <div class="show_models_segment">
            <v-card class="models_card" v-if="showModels" outlined>
              <v-row>
                <v-checkbox
                  class="checkbox"
                  v-for="(carModel, index) in carModels"
                  :key="index"
                  :value="carModel"
                  v-model="selectedModels"
                  :label="carModel"
                ></v-checkbox>
              </v-row>
            </v-card>
            <v-card class="segment_card" v-if="showSegments && !showModels" outlined>
              <v-row>
                <v-checkbox
                  class="checkbox"
                  v-for="(carSegment, index) in carSegments"
                  :key="index"
                  :value="carSegment"
                  v-model="selectedSegments"
                  :label="carSegment"
                ></v-checkbox>
              </v-row>
            </v-card>
          </v-row>
        </div>
        <v-row>
          <v-col>
            <v-btn class="select_btn" small @click="showModelsSelect" color="#ffffff">Zaznacz producenta aut</v-btn>
          </v-col>
          <v-col>
            <v-btn small class="select_btn" @click="showSegmentSelect" color="#ffffff">Zaznacz segment aut</v-btn>
          </v-col>
          <v-col>
            <v-text-field
              class="price_btn"
              type="number"
              label="Cena min"
              v-model="price.minPrice"
              solo
              color="#ffffff"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="price_btn"
              type="number"
              label="Cena max"
              v-model="price.maxPrice"
              solo
              color="#ffffff"
              outlined
              dense
            ></v-text-field>
          </v-col>
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
                  class="date_picker_menu1"
                  v-model="pickupDate"
                  label="Data odbioru"
                  prepend-icon="mdi-calendar"
                  readonly
                  solo
                  color="#ffffff"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="pickupDate" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
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
                  class="date_picker_menu2"
                  v-model="returnDate"
                  label="Data zwrotu"
                  solo
                  color="#ffffff"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="returnDate" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              solo
              class="select_pickup_date_carPage"
              v-model="pickupLocation"
              :items="locations"
              label="Localizacja odbioru"
              ></v-select>
          </v-col>
          <v-col>
          <v-text-field
            regular
            height="20px"
            class="car_search"
            type="text"
            v-model="searchInput"
            placeholder="Wyszukaj auta"
          />
          </v-col>
          <v-col>
            <v-btn @click="clearFilters" small class="cancel_car_filters">Resetuj filtry
            </v-btn>
          </v-col>
          <v-col>
          <v-select
          class="sort_select"
          :items="sort.sortByItems"
          label="Sortowanie"
          v-model="sort.sortBy"
          :value="sort.sortByItems"
          color="#ffffff"
          dense
        ></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="car_table">
        <v-card
          elevation="9"
          width="fit-content"
          class="car_description"
          v-for="(carPost, index) in sortedCars"
          :key="index"
        >
          <v-img :src="carPost.img" max-height="100" max-width="200"></v-img>
          <p>{{ carPost.brand }} {{ carPost.model }}</p>
          <p>Segment: {{ carPost.segment }}</p>
          <p>Cena: od {{ carPost.price }} zł</p>
          <v-btn text @click="showCarDetails(carPost)">Pokaż szczegóły</v-btn>
        </v-card>
      </div>
      <div
        class="car_details_background_div"
        :style="{ 'background-color': backgroundColor, 'z-index': backgroundZindex }"
        @click="closeCarDetails"
      ></div>
      <CarDetails
        class="car_details_card"
        v-if="showCarDetailsBool"
        :img="car.img"
        :brand="car.brand"
        :model="car.model"
        :transmission="car.transmission"
        :engine="car.engine"
        :seats="car.seats"
        :trunkCapacity="car.trunkCapacity"
        :price="car.price"
        :vin="car.vin"
        :carLocations="car.location"
      />
    </v-container>
  </v-app>
</template>


<script>
import CarDetails from '@/components/general/CarDetails.vue'
export default {
  components: {
    CarDetails,
  },
  head() {
    return {
      script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  data() {
    return {
      searchInput: '',
      showModels: false,
      showSegments: false,
      selectedModels: [],
      selectedSegments: [],
      price: {
        minPrice: '',
        maxPrice: '',
      },
      sort: {
        sortByItems: ['Najniższa cena', 'Najwyższa cena', 'Segment', 'Producent [A-Z]', 'Producent [Z-A]'],
        sortBy: '',
      },
      showCarDetailsBool: false,
      car: {
        img: '',
        brand: '',
        model: '',
        transmission: '',
        engine: '',
        seats: '',
        trunkCapacity: '',
        price: '',
        vin: '',
        location: '',
      },
      backgroundColor: '',
      backgroundOpacity: 0,
      backgroundZindex: -1,
      pickupDate: this.$store.state.pickupDate,
      returnDate: this.$store.state.returnDate,
      pickupLocation: this.$store.state.pickupLocation,
      menu: false,
      menu2: false,
      locations: [
        'Oddział Nr 1 - ul. Graniczna, 159',
        'Oddział Nr 2 - ul. Ceglana, 3',
        'Oddział Nr 3 - ul. Komandorska, 53',
      ],
    }
  },
  computed: {
    getReservations() {
      return this.$store.state.reservations
    },
    carPosts() {
      return this.$store.state.carPosts
    },
    availableCars() {
      var cars = []
      this.carPosts.forEach((car) => {
        var carIsAvailable = true
        if (this.getReservations.length === 0) {
          cars.push(car)
        }
        this.getReservations.forEach((res) => {
          var rPickupDate = new Date(res.PickupDate)
          var rReturnDate = new Date(res.ReturnDate)
          var dPickupDate = new Date(this.pickupDate)
          var dReturnDate = new Date(this.returnDate)
          var maxStartDate = new Date(Math.max(rPickupDate, dPickupDate))
          var minEndDate = new Date(Math.min(rReturnDate, dReturnDate))
          if (maxStartDate < minEndDate && car.vin === res.vin) {
            carIsAvailable = false
          }
        })
        if (carIsAvailable) {
          cars.push(car)
        }
      })
      return cars
    },
    filteredCars() {
      console.log('pickupLoc = ' + this.pickupLocation)
      console.log('pickupLoc2 = ' + this.$store.state.pickupLocation)
      return this.availableCars.filter((car) => {
        return (
          (this.selectedModels.includes(car.brand) || this.selectedModels.length === 0) &&
          (this.selectedSegments.includes(car.segment) || this.selectedSegments.length === 0) &&
          car.price >= this.price.minPrice &&
          (car.price <= this.price.maxPrice || this.price.maxPrice === '' || this.price.maxPrice === '0') &&
          (car.model.toLowerCase().match(this.searchInput.toLowerCase()) ||
            car.brand.toLowerCase().match(this.searchInput.toLowerCase())) &&
          (car.location === this.pickupLocation || this.pickupLocation === '')
        )
      })
    },
    sortedCars() {
      if (this.sort.sortBy === 'Najniższa cena') {
        return this.filteredCars.sort(function (car1, car2) {
          return car1.price - car2.price
        })
      }
      if (this.sort.sortBy === 'Najwyższa cena') {
        return this.filteredCars.sort(function (car1, car2) {
          return car2.price - car1.price
        })
      }
      if (this.sort.sortBy === 'Segment') {
        return this.filteredCars.sort(function (car1, car2) {
          return ('' + car1.segment).localeCompare(car2.segment)
        })
      }
      if (this.sort.sortBy === 'Producent [A-Z]') {
        return this.filteredCars.sort(function (car1, car2) {
          return ('' + car1.model).localeCompare(car2.model)
        })
      }
      if (this.sort.sortBy === 'Producent [Z-A]') {
        return this.filteredCars.sort(function (car1, car2) {
          return ('' + car2.model).localeCompare(car1.model)
        })
      }
      if (this.sort.sortBy === '') {
        return this.filteredCars
      }
    },
    carModels() {
      var i
      var tab = []
      for (i = 0; i < this.carPosts.length; i++) {
        tab[i] = this.carPosts[i].brand
      }
      let unique = [...new Set(tab)]
      return unique.sort()
    },
    carSegments() {
      var i
      var tab = []
      for (i = 0; i < this.carPosts.length; i++) {
        tab[i] = this.carPosts[i].segment
      }
      let unique = [...new Set(tab)]
      return unique.sort()
    },
  },

  methods: {
    showModelsSelect() {
      this.showModels = !this.showModels
      this.showSegments = false
    },
    showSegmentSelect() {
      this.showSegments = !this.showSegments
      this.showModels = false
    },
    showCarDetails(carPost) {
      this.showCarDetailsBool = true
      this.car.img = carPost.img
      this.car.brand = carPost.brand
      this.car.model = carPost.model
      this.car.transmission = carPost.transmission
      this.car.engine = carPost.engineType
      this.car.seats = carPost.seats
      this.car.trunkCapacity = carPost.trunkCapacity
      this.car.price = carPost.price
      this.car.vin = carPost.vin
      this.car.location = carPost.location
      this.backgroundColor = '#ffffff'
      this.backgroundZindex = 3
    },
    closeCarDetails() {
      this.showCarDetailsBool = false
      this.backgroundColor = ''
      this.backgroundZindex = -1
      window.location.reload(true)
    },
    clearFilters() {
      this.selectedModels = []
      this.selectedSegments = []
      this.price.minPrice = ''
      this.price.maxPrice = ''
      this.pickupDate = ''
      this.returnDate = ''
      this.pickupLocation = ''
      this.searchInput = ''
      this.sort.sortBy = ''
    },
  },
}
</script>