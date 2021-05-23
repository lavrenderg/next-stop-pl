<template>
  <div class="header">
    <v-btn
      class="show_menu_btn"
      height="110px"
      width="110px
    "
      color="#57ba98"
      tile
      elevation="0"
      @click="showMenu"
      >Menu
    </v-btn>
    <img class="header_img" src="@/static/img/buildings.png" />
    <h2 class="header_text">Wynajem samochodów we Wrocławiu</h2>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    showMenu() {
      this.$emit('showMenu')
    },
  },
}
</script>
