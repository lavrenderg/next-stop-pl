<template>
  <nav>
    <ul>
      <li>
        <v-btn icon @click="showMenu">more</v-btn>
      </li>
      <li>
        <p>NextStop</p>
      </li>
      <li>
        <v-btn icon>EN</v-btn>
      </li>
    </ul>
  </nav>
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
