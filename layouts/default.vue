<template>
  <div class="container">
    <Menu v-show="showMenu" />
    <Header @showMenu="showMenu = !showMenu" />
    <ColorModePicker />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/general/Header.vue'
import ColorModePicker from '~/components/general/ColorModePicker.vue'
import Menu from '~/components/general/Menu.vue'

export default {
  components: {
    Menu,
    Header,
    ColorModePicker,
  },
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>
