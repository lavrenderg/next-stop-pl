<template>
  <div>
    <Menu v-show="showMenu" @closeMenu="showMenu = false" />
    <Header @showMenu="showMenu = true" />
    <Cookie v-show="showCookie" @closeCookie="showCookie = false" class="cookie_card" />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/general/Header.vue'
import Menu from '~/components/general/Menu.vue'
import Footer from '~/components/general/Footer.vue'
import Cookie from '~/components/general/Cookie.vue'

export default {
  components: {
    Menu,
    Header,
    Footer,
    Cookie,
  },
  data() {
    return {
      showMenu: false,
      showCookie: true,
    }
  },
}
</script>
