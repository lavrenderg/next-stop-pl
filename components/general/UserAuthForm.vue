<template>
  <v-form v-model="valid" class="auth_form">
    <v-text-field v-model="userInfo.name" label="Imię" :rules="[required('name')]" v-if="hasName" />

    <v-text-field v-model="userInfo.email" label="Email" :rules="[required('email'), emailFormat()]" />

    <v-text-field
      v-if="hasPassword"
      v-model="userInfo.password"
      label="Hasło"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      counter="true"
      :rules="[required('Hasło'), minLength('Hasło', 8)]"
    />

    <v-text-field
      v-model="userInfo.phoneNumber"
      label="Numer telefonu"
      :rules="[required('Numer telefonu'), phoneNumberFormat()]"
      counter="true"
      v-if="hasPhoneNumber"
    />

    <v-text-field
      v-model="userInfo.age"
      label="Wiek"
      :rules="[required('Wiek'), minAge()]"
      counter="true"
      v-if="hasAge"
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
        age: '',
      },
      ...validation,
    }
  },
  props: ['submitForm', 'buttonText', 'hasName', 'hasPhoneNumber', 'hasAge', 'hasPassword'],
}
</script>