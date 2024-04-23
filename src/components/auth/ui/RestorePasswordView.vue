<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card class="section-center">
      <p class="text-center, text-h1, card-text">
        {{ "Создание нового пароля" }}
      </p>
      <div class="inputs">
        <v-text-field
          label="Введите пароль"
          variant="outlined"
          density="compact"
          v-model.trim="useAuthStore().password"
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
          v-model.trim="useAuthStore().confirmPassword"
          :maxlength="30"
          :rules="[useAuthStore().rules.required, useAuthStore().rules.passwordMatch]"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
        >
        </v-text-field>
      </div>
      <div class="submit-btn">
        <v-btn
          width="70%"
          color="primary"
          variant="outlined"
          @click="submit"
        >Сохранить
        </v-btn>
      </div>
      <v-progress-linear
        class="loading"
        v-if="isLoading"
        color="primary"
        indeterminate
        width="2"
      ></v-progress-linear>
      <div class="linked-text" @click="redirect">на главную</div>
    </v-card>
  </v-form>
</template>

<script>
import router from "@/router";
import {useAuthStore} from "@/components/auth/js/authStore";
export default {
  name: "RestorePasswordView",

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
    async submit() {
      console.log("tes2t")
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.isLoading = true
        useAuthStore().reinitPass()
        console.log("test")
        setTimeout(() => (this.redirect()), 4000)
      }else{
        this.errorMessage = 'Неверный адрес электронной почты или пароль. Повторите попытку'
      }
    },
    redirect(){
      this.isLoading = false
      router.push("./")
    },
  },
  mounted() {
    useAuthStore().clearFieldsData()
  }
}
</script>

<style lang="sass" scoped>
@import "@/components/auth/css/auth.sass"

.card-text
  padding: 10% 10px 45px 10px
  font-size: 200%

.inputs
  display: block
  margin: 0 auto
  width: 70%

.submit-btn
  padding-top: 10px

.loading
  display: flex
  align-items: center
  justify-content: center
  width: 70%
</style>
