<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card class="section-center">
      <p class="text-center, text-h1, card-text">
        {{ "Регистрация" }}
      </p>
      <div class="inputs">
        <v-text-field
          clearable
          label="Введите электронную почту"
          variant="outlined"
          density="compact"
          type="email"
          v-model.trim="useAuthStore().email"
          :maxlength="50"
          :rules="[useAuthStore().rules.required, useAuthStore().rules.email]"
        ></v-text-field>

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

        <div class="divider">
          <v-divider
            length="100%"
            thickness="5px"
            color="background"></v-divider>
        </div>

        <div>
          <p>
            {{ "Регистрируясь, вы подтверждаете, что даете согласие на обработку персональных данных." }}
          </p>
        </div>

        <div class="divider">
          <v-divider
            length="100%"
            thickness="5px"
            color="background"></v-divider>
        </div>

        <div class="submit-btn">
          <v-btn
            width="100%"
            color="primary"
            variant="outlined"
            @click="submit"
          >Продолжить
          </v-btn>
        </div>
        <v-progress-linear
          class="loading"
          v-if="isLoading"
          color="primary"
          indeterminate
          width="2"
        ></v-progress-linear>

        <div class="back" @click="redirect">вернуться</div>

        <div v-if="errorMessage!==''">
            {{ this.errorMessage }}
        </div>

      </div>
    </v-card>
  </v-form>

</template>

<script>
import router from "@/router";
import authService from "@/components/auth2/js/auth.service";
import {useAuthStore} from "@/components/auth2/js/authStore";
export default {
  name: "RegView",

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
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.isLoading=true
        useAuthStore().register
        setTimeout(() => (this.redirect()), 4000)
        // this.redirect()
      }
    },
    redirect(){
      this.isLoading = false
      router.push('./')
    },
    clearError(){
      this.errorMessage = ""
    }
  },
  mounted() {
    useAuthStore().clearFieldsData()
  }

}
</script>

<style lang="sass" scoped>
@import "@/components/auth2/css/auth.sass"

.card-text
  padding: 5% 10px 10px 10px
  font-size: 200%

.divider
  padding-top: 10px
  width: 100%

.submit-btn
  padding-top: 15px
  width: 100%

.v-text-field
  padding-top: 5px

.inputs
  display: block
  margin: 0 auto
  width: 70%

.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px

.back
  padding-top: 5px
  text-decoration-line: underline

.loading
  display: flex
  align-items: center
  justify-content: center
  width: 100%

</style>
