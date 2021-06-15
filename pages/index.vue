<template>
  <v-app>
    <div class="background">
      <v-card elevation="6" class="quick_reservation" color="#ffffff">
        <v-row>
          <h1 class="color_test">Szybka rezerwacja</h1>
        </v-row>
        <v-row>
          <v-col>
            <p class="color_test">Lokalizacja</p>
            <v-select :items="locations" class="location_btn" placeholder="Odbiór"></v-select>
            <v-select :items="locations" class="location_btn" placeholder="Zwrot"></v-select>
          </v-col>
          <v-col>
            <p>Data</p>
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
                  class="data_btn"
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
                  class="data_btn"
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
            <v-btn class="search_btn">Szukaj</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <div class="car_examples_slider">
        <splide :options="options">
          <splide-slide v-for="(carPost, index) in carPosts" :key="index">
            <img :src="carPost.img" />
            <div class="car_post_slider">
              <h3>{{ carPost.model }}</h3>
              <h5>Od {{ carPost.price }} zł</h5>
            </div>
          </splide-slide>
        </splide>
      </div>

      <v-divider> </v-divider>
      <div class="locations_div" id="locations_div">
        <v-container>
          <v-row>
            <v-col class="location_branch">
              <div>
                <h4>Oddział Nr 1</h4>
                <br />
                <p>ul. Graniczna, 159</p>
                <p>54-530, Wrocław</p>
              </div>
            </v-col>
            <v-col class="location_branch">
              <div>
                <h4>Oddział Nr 2</h4>
                <br />
                <p>ul. Ceglana, 3</p>
                <p>50-002, Wrocław</p>
              </div>
            </v-col>
            <v-col class="location_branch">
              <div>
                <h4>Oddział Nr 3</h4>
                <br />
                <p>ul. Komandorska, 53</p>
                <p>53-342, Wrocław</p>
              </div>
            </v-col>
            <v-col class="contact">
              <div>
                <h4>Kontakt</h4>
                <br />
                <p>+48 576 201 166</p>
                <p>Maryna</p>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                <v-btn
                  class="google_maps_btn"
                  rounded
                  text
                  href="https://www.google.com/maps/@51.1098223,17.0069192,12z/data=!3m1!4b1!4m3!11m2!2sMb1L1ARZgXESyLeQ2fxxkZa_9aRmBg!3e3"
                  target="_blank"
                  >Otwórz w GoogleMaps</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      //script: { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    }
  },
  data() {
    return {
      options: {
        type: 'loop',
        rewind: true,
        gap: '1rem',
        perPage: 2,
        fixedWidth: '10rem',
        fixedHeight: '10rem',
        cover: true,
        keyboard: true,
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      locations: [
        'Oddział Nr 1 - ul. Graniczna, 159',
        'Oddział Nr 2 - ul. Ceglana, 3',
        'Oddział Nr 3 - ul. Komandorska, 53',
      ],
    }
  },
  computed: {
    carPosts() {
      return this.$store.state.carPosts
    },
  },
}
</script>