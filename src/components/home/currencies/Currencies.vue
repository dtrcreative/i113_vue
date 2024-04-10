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

</template>

<script>
import {getAuthUser, login, logout} from "@/components/auth/services/auth.service";
import UserService from "@/components/auth/services/user.service"
import birthdayService from "@/components/microservices/events/birthdays/js/birthday.service";
import pandaService from "@/components/microservices/panda/js/panda.service";
import axios from "axios";
import {authHeader, getGatewayUrl} from "@/components/auth/services/axios.service";
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";
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

  }
}
</script>

<style scoped>
.component {
  display: flex;
  /*@media (max-width: 767 px) display: flex;*/
}
</style>
