<template>
  <v-card class="section-center">
    <p class="text-center, text-h1, card-text">
      {{ "Регистрация" }}
    </p>
    <v-stepper :model-value="step" class="stepper" rounded>
      <template v-slot:default="{ prev, next }">
        <v-stepper-header>

          <v-stepper-item
            :complete=items[0].complete
            :color=items[0].color
            :title=items[0].title
            value=1
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            :complete=items[1].complete
            :color=items[1].color
            :title=items[1].title
            value=2
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            :complete=items[2].complete
            :color=items[2].color
            :title=items[2].title
            value=3
          ></v-stepper-item>

        </v-stepper-header>

        <v-stepper-window direction="horizontal">
          <v-stepper-window-item value="1">
            <user-data-step ref="userDataStep"></user-data-step>
          </v-stepper-window-item>

          <v-stepper-window-item value="2">
            <user-password-step ref="userPasswordStep"></user-password-step>
          </v-stepper-window-item>

          <v-stepper-window-item value="3">
            <user-confirm-step ref="userConfirmStep"></user-confirm-step>
          </v-stepper-window-item>
        </v-stepper-window>

        <v-btn @click="prevStep" class="btn" variant="flat">Назад</v-btn>
        <v-btn @click="nextStep" class="btn" variant="tonal">
          {{ this.step === this.items.length - 1 ? "Завершить" : "Далее" }}
        </v-btn>

        <v-progress-linear
          class="loading"
          v-if="isLoading"
          color="primary"
          indeterminate
          width="2"
        ></v-progress-linear>

      </template>
    </v-stepper>

  </v-card>

</template>

<script>
import UserDataStep from "@/components/auth/ui/UserDataStep";
import UserPasswordStep from "@/components/auth/ui/UserPasswordStep";
import UserConfirmStep from "@/components/auth/ui/UserConfirmStep";
import {useAuthStore} from "@/components/auth/js/authStore";
import router from "@/router";

export default {
  name: "SignupView",
  components: {UserConfirmStep, UserPasswordStep, UserDataStep},
  data: () => ({

    step: 0,
    isLoading: false,

    items: [
      {value: 1, title: 'Данные пользователя', complete: false, color: "green"},
      {value: 2, title: 'Установка пароля', complete: false, color: "green"},
      {value: 3, title: 'Подтверждение', complete: false, color: "green"}],
  }),
  methods: {
    useAuthStore,
    async nextStep() {
      if (this.step === this.items.length - 1) {
        this.isLoading = true
        let response = await useAuthStore().signup()
        if (response !== undefined && response.status===200) {
          this.isLoading = false
          await router.push("./")
        }
        this.isLoading = false
      }
      if (this.step < this.items.length - 1 && await this.validate()) {
        this.items[this.step].complete = true
        this.step++
      }
    },
    prevStep() {
      if (this.step === 0) {
        router.push("./")
      }
      if (this.step > 0) {
        this.validate()
        this.items[this.step].complete = false
        this.step--
      }
    },
    async validate() {
      switch (this.step) {
        case 0:
          return await this.$refs.userDataStep.validate()
        case 1:
          return await this.$refs.userPasswordStep.validate()
        case 2:
          return await this.$refs.userConfirmStep.validate()
      }
    }
  },

  computed: {}
}
</script>

<style lang="sass" scoped>
@import "@/components/auth/css/auth.sass"

.loading
  width: 80%

.btn
  width: 40%

.stepper
  background-color: rgba(0, 11, 42, 0)
  height: 100%

.card-text
  padding: 10px 10px 10px 10px
  font-size: 200%

</style>
