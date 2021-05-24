<template>
  <v-app>
    <v-container class="background container">
      <v-row>
        <v-col><v-btn @click="showModels = !showModels" color="#def2f1">Zaznacz model aut</v-btn> </v-col>
        <v-col><v-btn @click="showSegments = !showSegments" color="#def2f1">Zaznacz segment aut</v-btn> </v-col>
        <v-col
          ><v-text-field
            class="price_btn"
            type="number"
            label="Wpisz minimalną ceną"
            placeholder="Cena min"
            v-model="price.minPrice"
            outlined
            dense
          ></v-text-field
        ></v-col>
        <v-col
          ><v-text-field
            class="price_btn"
            type="number"
            label="Wpisz maksymalną cenę"
            placeholder="Cena max"
            v-model="price.maxPrice"
            outlined
            dense
          ></v-text-field
        ></v-col>
        <v-col
          ><v-select
            class="sort_select"
            :items="sort.sortByItems"
            label="Sortowanie"
            v-model="sort.sortBy"
            :value="sort.sortByItems"
            dense
          ></v-select
        ></v-col>
      </v-row>
      <div class="show_models_segment">
        <v-row>
          <v-card class="models_card" v-if="showModels" outlined>
            <v-row>
              <v-checkbox
                class="checkbox"
                v-for="(carModel, index) in carModels"
                :key="index"
                :value="carModel"
                v-model="selectedModels"
                :label="carModel"
              >
                <v-col></v-col
              ></v-checkbox>
            </v-row>
          </v-card>
        </v-row>
        <v-row>
          <v-card class="segment_card" v-if="showSegments && !showModels" outlined>
            <v-row>
              <v-checkbox
                class="checkbox"
                v-for="(carSegment, index) in carSegments"
                :key="index"
                :value="carSegment"
                v-model="selectedSegments"
                :label="carSegment"
              >
                <v-col></v-col
              ></v-checkbox>
            </v-row>
          </v-card>
        </v-row>
      </div>
      <v-text-field height="20px" class="car_search" type="text" v-model="searchInput" placeholder="Wyszukaj auta" />
      <div class="car_table">
        <v-card
          elevation="9"
          width="fit-content"
          class="car_description"
          v-for="(carPost, index) in sortedCars"
          :key="index"
        >
          <v-img :src="carPost.img" max-height="100" max-width="200"></v-img>
          <p>{{ carPost.brand }} {{ car.model }}</p>
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
        minPrice: 0,
        maxPrice: 50000,
      },
      sort: {
        sortByItems: ['Lowest price', 'Highest price', 'Segment', 'Brand [A-Z]', 'Brand [Z-A]'],
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
      },
      backgroundColor: '',
      backgroundOpacity: 0,
      backgroundZindex: -1,
    }
  },
  computed: {
    carPosts() {
      return this.$store.state.carPosts
    },
    filteredCars() {
      return this.carPosts.filter((car) => {
        return (
          (this.selectedModels.includes(car.model) || this.selectedModels.length === 0) &&
          (this.selectedSegments.includes(car.segment) || this.selectedSegments.length === 0) &&
          car.price >= this.price.minPrice &&
          (car.price <= this.price.maxPrice || this.price.maxPrice === '' || this.price.maxPrice === '0') &&
          car.model.toLowerCase().match(this.searchInput.toLowerCase())
        )
      })
    },

    sortedCars() {
      if (this.sort.sortBy === 'Lowest price') {
        return this.filteredCars.sort(function (car1, car2) {
          return car1.price - car2.price
        })
      }
      if (this.sort.sortBy === 'Highest price') {
        return this.filteredCars.sort(function (car1, car2) {
          return car2.price - car1.price
        })
      }
      if (this.sort.sortBy === 'Segment') {
        return this.filteredCars.sort(function (car1, car2) {
          return ('' + car1.segment).localeCompare(car2.segment)
        })
      }
      if (this.sort.sortBy === 'Brand [A-Z]') {
        return this.filteredCars.sort(function (car1, car2) {
          return ('' + car1.model).localeCompare(car2.model)
        })
      }
      if (this.sort.sortBy === 'Brand [Z-A]') {
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
        tab[i] = this.carPosts[i].model
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
      this.backgroundColor = '#ffffff'
      this.backgroundZindex = 3
    },
    closeCarDetails() {
      this.showCarDetailsBool = false
      this.backgroundColor = ''
      this.backgroundZindex = -1
    },
  },
}
</script>