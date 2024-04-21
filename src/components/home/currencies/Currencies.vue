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
import router from "@/router";
import {getAuthUser} from "@/components/auth/services/auth.service";
import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios.service";
import exceptionHandler from "@/components/UI/exceptions/js/exception-handler";

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
        const response = await axios.get(getGatewayUrl() + "gateway/info/health", {headers: authHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async resourcesHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/resources/info/health", {headers: authHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async eventsHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/events/info/health", {headers: authHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async pandaHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/panda/info/health", {headers: authHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async telbotHealth() {
      try {
        const response = await axios.get(getGatewayUrl() + "api/telbot/info/health", {headers: authHeader()});
        console.log(response)
      } catch (e) {
        exceptionHandler.handle(e)
      }
    },
    async showUserInfo() {
      console.log(await getAuthUser())
    },

    newLogin() {
      router.push("./login")
    }

  }
}
</script>

<style scoped>

</style>
