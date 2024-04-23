<template>
  <v-dialog
    class="dialog"
    v-model="isDialogVisible"
    transition="dialog-top-transition"
    persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <div class="linked-text" v-bind="activatorProps">Забыли пароль?</div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-container class="container">
        <v-form ref="form" @submit.prevent="submit">
          <v-card
            class="card"
            variant="elevated"
            title="Введите адрес электронной почты"
          >
            <v-card-text class="card-text">
              <v-text-field
                class="card-text"
                clearable
                label="Введите электронную почту"
                variant="outlined"
                density="compact"
                type="email"
                v-model.trim="useAuthStore().email"
                :maxlength="50"
                :rules="[useAuthStore().rules.required, useAuthStore().rules.email]"
              ></v-text-field>
              <v-progress-linear
                class="loading"
                v-if="isLoading"
                color="primary"
                indeterminate
                width="2"
              ></v-progress-linear>
            </v-card-text>
            <div class="btns">
              <v-btn
                class="btn-cancel"
                color="warning"
                variant="text"
                @click="clear(), isActive.value = false"
              >Отмена
              </v-btn>

              <v-btn
                class="btn-submit"
                color="primary"
                variant="text"
                @click="submit"
              >Восстановить пароль
              </v-btn>
            </div>
            <div class="error" v-if="errorMessage!==''">
              {{ this.errorMessage }}
            </div>
          </v-card>
        </v-form>
      </v-container>
    </template>
  </v-dialog>

  <v-dialog
    v-model="isEmailMessageDialogVisible"
    max-width="500"
  >
    <v-container>
      <v-card class="dialog2" @click="redirect">
        <div class="text-center, text-h1, card-info-text">
          {{ this.snackBarText }}
        </div>
      </v-card>
    </v-container>
  </v-dialog>

</template>

<script>
import router from "@/router";
import {useAuthStore} from "@/components/auth/js/authStore";

export default {
  name: "ForgotPasswordEmailDialog",
  data() {
    return {
      isDialogVisible: false,
      isEmailMessageDialogVisible: false,
      isLoading: false,

      showSnackBar: false,
      snackBarText: 'На ваш адрес электронной почты отправлено сообщение для восстановления пароля',

      errorMessage: '',
    }
  },
  methods: {
    useAuthStore,
     async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.isLoading=true
        useAuthStore().sendEmail
        setTimeout(() => (this.showMessageDialog()), 4000)
      }
    },
    showMessageDialog(){
      this.isEmailMessageDialogVisible = true
      this.isDialogVisible = false;
    },
    async redirect(){
      this.isLoading = false
      this.isEmailMessageDialogVisible=false
      // await router.push("./") //TODO remove when uri is ready
    },
    async clear() {
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
    },
  },
  mounted() {
    useAuthStore().clearFieldsData()
  }
}
</script>

<style lang="sass" scoped>
@import "@/components/auth/css/auth.sass"

.card-info-text
  padding: 10px 10px 10px 10px
  font-size: 150%

.btn-cancel
  width: 40%

.btn-submit
  width: 60%

.dialog
  align-items: center

  width: 35%

  @media (max-width: 1500px)
    width: 55%

  @media (max-width: 767px)
    width: 90%
    margin-right: 1%
    margin-left: 1%

.dialog2
  border-radius: 30px
  text-align: center

.btns
  margin-bottom: 2%

.container
  background-color: rgba(16, 0, 16, 0.93)
  border-radius: 20px

.card
  background-color: rgba(16, 0, 16, 0.93)
  padding: 10px 10px 10px 10px
  border-radius: 20px

.card-text
  padding-top: 5px

.snackbar
  padding-left: 50%
  justify-content: end

.loading
  display: flex
  align-items: center
  justify-content: center
  width: 100%
</style>
