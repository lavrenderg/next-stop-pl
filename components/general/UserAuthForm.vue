<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" label="Name" :rules="[required('name')]" v-if="hasName" />

    <v-text-field v-model="userInfo.email" label="Email" :rules="[required('email'), emailFormat()]" />

    <v-text-field
      v-model="userInfo.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      counter="true"
      :rules="[required('password'), minLength('password', 8)]"
    />

    <v-text-field
      v-model="userInfo.phone"
      label="PhoneNumber"
      :rules="[required('Phone number'), phoneNumberFormat()]"
      counter="true"
      v-if="hasPhoneNumber"
    />

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
import validation from '@/utils/validation'
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
      ...validation,
    }
  },
  props: ['submitForm', 'buttonText', 'hasName', 'hasPhoneNumber'],
}
</script>