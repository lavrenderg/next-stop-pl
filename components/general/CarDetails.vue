<template>
  <div>
    <v-card>
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
          <v-btn color="#57ba98">Rezerwuj</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['img', 'brand', 'model', 'transmission', 'engine', 'seats', 'trunkCapacity', 'price'],
}
</script>