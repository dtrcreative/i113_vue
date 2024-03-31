<template>
  <v-btn
    @click="register">
    Register
  </v-btn>
  <v-btn
    @click="status">
    CheckStatus
  </v-btn>
  <v-btn
    @click="test">
    GetTodayUnitsTest
  </v-btn>
</template>

<script>
import telegramService from "@/components/settings/sheduling/telegram/js/telegram.service";

export default {
  name: "TelegramSettingsView",
  methods: {
    async register() {
      let response = await telegramService.register();
      console.log(response.data)
    },
    async status() {
      let response = await telegramService.status();
      console.log(response.data)
    },
    async test() {
      let response = await telegramService.test();
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

</style>
