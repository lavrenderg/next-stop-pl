<template>
  <div class="quick_reservation">
    <h1>Quick reservation</h1>
    <p>Location</p>
    <textarea v-model="location_pickup" placeholder="Pickup"></textarea>
    <textarea v-model="location_return" placeholder="Return"></textarea>
    <p>Date</p>
    <textarea v-model="date_pickup" placeholder="Pickup"></textarea>
    <textarea v-model="date_return" placeholder="Return"></textarea>
    <v-btn>=></v-btn>
  </div>
</template>
