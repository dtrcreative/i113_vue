<template>
  <v-form ref="form">
    <div class="inputs">
      <div>
        <v-text-field
          class="inputFields"
          disabled
          label="Ваш логин"
          variant="outlined"
          density="compact"
          type="text"
          v-model.trim="useAuthStore().user.username"
        ></v-text-field>
        <v-text-field
          class="inputFields"
          disabled
          label="Ваша электронная почта"
          variant="outlined"
          density="compact"
          v-model.trim="useAuthStore().user.email"
        ></v-text-field>
      </div>

      <div>
        <v-text-field
          class="inputFields"
          disabled
          label="Ваше имя"
          variant="outlined"
          density="compact"
          v-model.trim="useAuthStore().user.firstname"
        ></v-text-field>
        <v-text-field
          class="inputFields"
          disabled
          label="Ваша фамилия"
          variant="outlined"
          density="compact"
          v-model.trim="useAuthStore().user.lastname"
        ></v-text-field>
      </div>

      <v-text-field
        disabled
        label="Ваш пароль"
        variant="outlined"
        density="compact"
        v-model.trim="useAuthStore().user.password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>
    </div>
  </v-form>
</template>

<script>
import {useAuthStore} from "@/components/auth/js/authStore";
export default {
  name: "UserConfirmStep",
  data() {
    return {
      showPassword: false,
    }
  },
  methods:{
    useAuthStore,
    async validate() {
      const {valid} = await this.$refs.form.validate()
      return valid
    },
  }
}
</script>

<style lang="sass" scoped>
.inputs
  display: block
  padding-top: 4%
  margin: 0 auto 5px
  width: 90%
.inputFields
  display: inline-block
  width: 50%
</style>
