<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card class="section-center">
      <p class="text-center, text-h1, card-text">
        {{ "Чтобы продолжить, войдите в систему" }}
      </p>
      <div class="lined-text-registration">
        <div>У вас нет аккаунта? </div>
        <div class="linked-text" @click="showRegistrationView">Зарегистрируйтесь</div>
      </div>

      <div class="inputs">
        <v-text-field
          clearable
          label="Введите имя пользователя"
          variant="outlined"
          density="compact"
          type="email"
          v-model.trim="useAuthStore().user.username"
          :maxlength="50"
          :rules="[useAuthStore().rules.required]"
        ></v-text-field>
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
        ></v-text-field>
      </div>

      <div class="linked-text-forgot-password">
        <forgot-password-email-dialog></forgot-password-email-dialog>
      </div>

      <div class="submit-btn">
        <v-btn
          width="70%"
          color="primary"
          variant="outlined"
          @click="submit"
        >Войти
        </v-btn>
      </div>
        <v-progress-linear
          class="loading"
          v-if="isLoading"
          color="primary"
          indeterminate
          width="2"
        ></v-progress-linear>

      <div class="error" v-if="errorMessage!==''">
          {{ this.errorMessage }}
      </div>

    </v-card>
  </v-form>
</template>

<script>
import router from "@/router";
import ForgotPasswordEmailDialog from "@/components/auth/ui/ForgotPasswordEmailDialog";
import {useAuthStore} from "@/components/auth/js/authStore";
import {cleanStorage, cleanUserData} from "@/store/user.service";

export default {
  name: "LoginView",
  components: {ForgotPasswordEmailDialog},
  data() {
    return {
      showPassword: false,
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
        this.clearError()
        let response = await useAuthStore().login()
        if (response !== undefined && response.status===200) {
          this.redirect()
        }else{
          this.showErrorMessage("Упс, что-то пошло не так")
        }
      }else{
        this.showErrorMessage('Неверный адрес электронной почты или пароль. Повторите попытку')
      }
    },
    redirect(){
      router.push("./home")
    },
    showRegistrationView(){
      router.push("/signup")
    },
    clearError(){
      this.errorMessage = ""
    },
    showErrorMessage(message){
      this.isLoading = false;
      this.errorMessage = message
    }
  },
  mounted() {
    cleanUserData()
    useAuthStore().clearFieldsData();
  }
}
</script>

<style lang="sass" scoped>
@import "@/components/auth/css/auth.sass"

.card-text
  padding: 10% 10px 20px 10px
  font-size: 200%

.inputs
  display: block
  margin: 0 auto
  width: 70%

.lined-text-registration
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  padding: 15px

.linked-text-forgot-password
  width: 85%
  display: flex
  align-items: center
  justify-content: end
  padding-top: 5px
  padding-bottom: 10px

.border-radius
  border-radius: 30px

.loading
  display: flex
  align-items: center
  justify-content: center
  width: 70%

.submit-btn
  padding-top: 15px
  width: 100%
</style>
