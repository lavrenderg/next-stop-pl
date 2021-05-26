<template></template>

<script>
export default {
  asyncData() {
    firebase.auth().signOut()
  },
}
</script>