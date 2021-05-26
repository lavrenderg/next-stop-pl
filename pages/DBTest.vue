<template>
  <v-container>
    <div>
      <v-btn @click="writeUser" />
      <p>{{ myUser }}</p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      myUser: '',
    }
  },
  methods: {
    user() {
      let ref = this.$fire.database.ref()
      ref
        .child('Users')
        .child('User1')
        .child('Name')
        .get()
        .then((snapshot) => {
          this.myUser = snapshot.val()
        })
    },
    writeUser() {
      this.$fire.database.ref('Users/User' + 4).set({
        Name: 'Julia',
        Email: 'julia@j.com',
        Phone: '657483927',
        Age: 16,
      })
    },
  },
}
</script>