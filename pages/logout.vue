<template></template>

<script>
export default {
  asyncData() {
    this.$fire.auth.signOut()
  },
}
</script>