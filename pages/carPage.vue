<template>
  <v-app>
    <v-container>
      <input type="text" v-model="searchInput" placeholder="search cars" />

      <v-row>
        <v-col><v-btn @click="showModels = !showModels" text>Select car model</v-btn> </v-col>
        <v-col><v-btn @click="showSegments = !showSegments" text>Select car segment</v-btn> </v-col>
        <v-col
          ><v-text-field
            type="number"
            label="Set minimum price"
            placeholder="Min price"
            v-model="price.minPrice"
            solo
          ></v-text-field
        ></v-col>
        <v-col
          ><v-text-field
            type="number"
            label="Set maximum price"
            placeholder="Max price"
            v-model="price.maxPrice"
            solo
          ></v-text-field
        ></v-col>
        <v-col
          ><v-select
            :items="sort.sortByItems"
            label="Sort by"
            v-model="sort.sortBy"
            :value="sort.sortByItems"
          ></v-select
        ></v-col>
      </v-row>
      <v-row>
        <v-card v-if="showModels" outlined>
          <v-row>
            <v-checkbox
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
        <v-card v-if="showSegments" outlined>
          <v-row>
            <v-checkbox
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
      <div class="car_table">
        <v-card
          elevation="9"
          width="fit-content"
          class="car_description"
          v-for="(carPost, index) in sortedCars"
          :key="index"
        >
          <v-img :src="carPost.img" max-height="100" max-width="200"></v-img>
          <p>{{ carPost.model }}</p>
          <p>Segment : {{ carPost.segment }}</p>
          <p>Price starts from {{ carPost.price }}$</p>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>


<script>
export default {
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
}
</script>