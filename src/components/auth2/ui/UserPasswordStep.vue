<template>
  <v-form ref="form">
    <div class="inputs">
      <v-text-field
        label="Введите пароль"
        variant="outlined"
        density="compact"
        v-model.trim="useAuthStore().user.password"
        :maxlength="30"
        :rules="[useAuthStore().rules.required, useAuthStore().rules.range.passwordMin]"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
      >
        <v-tooltip
          activator="parent"
          location="top"
          max-width="300px"
          offset-overflow>
          <p>Пароль должен содержать не менее 8 символов, включая латинские буквы и цифры</p>
        </v-tooltip>

      </v-text-field>
      <v-text-field
        label="Повторите пароль"
        variant="outlined"
        density="compact"
        v-model.trim="useAuthStore().user.confirmPassword"
        :maxlength="30"
        :rules="[useAuthStore().rules.required, useAuthStore().rules.passwordMatch]"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:append-inner="showConfirmPassword = !showConfirmPassword"
      >
      </v-text-field>
    </div>
  </v-form>
</template>

<script>
import {useAuthStore} from "@/components/auth2/js/authStore";

export default {
  name: "UserPasswordStep",
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      errorMessage: '',
      isLoading: false,
    }
  },
  methods: {
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
  padding-top: 7%
  padding-bottom: 5%
  margin: 0 auto
  width: 90%
</style>
