<template>
  <div>
    <Menu v-show="showMenu" @showMenu="showMenu = !showMenu" />
    <Header @showMenu="showMenu = !showMenu" />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/general/Header.vue'
import Menu from '~/components/general/Menu.vue'
import Footer from '~/components/general/Footer.vue'

export default {
  components: {
    Menu,
    Header,
    Footer,
  },
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>
