<template>

  <v-card
    class="mx-auto"
    title="TestButtons"
  ></v-card>

  <v-btn @click="gatewayHealth">GatewayHealth</v-btn>
  <v-btn @click="resourcesHealth">ResourcesHealth</v-btn>
  <v-btn @click="pandaHealth">PandaHealth</v-btn>
  <v-btn @click="eventsHealth">EventsHealth</v-btn>
  <v-btn @click="telbotHealth">TelbotHealth</v-btn>
  <v-btn @click="showUserInfo">UserInfo</v-btn>
  <v-btn @click="newLogin">NewLogin</v-btn>

</template>

<script>
import axios from "axios";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";
import {getAuthUser} from "@/store/user.service";
import {getGatewayUrl} from "@/store/app.service";

export default {
  name: "Currencies",

  data: () => ({
    items: [
      {title: 'BYN'},
      {title: 'USD'},
      {title: 'EUR'},
      {title: 'RUB'},
    ],
  }),

  methods: {
    // 643 - RUB
    // 978 - EUR
    // 840 - USD

    async gatewayHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "gateway/info/health", {headers: getAuthHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async resourcesHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/resources/info/health", {headers: getAuthHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async eventsHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/events/info/health", {headers: getAuthHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async pandaHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/panda/info/health", {headers: getAuthHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async telbotHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/telbot/info/health", {headers: getAuthHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async showUserInfo() {
      console.log(getAuthUser())
    },

    newLogin() {
      console.log("TEEST")
    }

  }
}
</script>

<style scoped>

</style>
