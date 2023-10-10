<template>

  <v-card
    class="mx-auto"
    title="TestButtons"
  ></v-card>

  <v-btn
    @click="logintest"
  >
    TestLogin
  </v-btn>
  <v-btn
    @click="logouttest"
  >
    TestLogout
  </v-btn>
  <v-btn
    @click="apiCall"
  >
    apiCall
  </v-btn>

  <v-btn
    @click="userData"
  >
    userData
  </v-btn>

  <v-btn
    @click="checkUser"
  >
    checkUser
  </v-btn>

  <v-btn
    @click="userHelperFill"
  >
    userHelperFill
  </v-btn>


</template>

<script>
import {checkUser, getAuthUser, login, logout} from "@/components/auth/services/auth-helper";
import UserHelper from "@/components/auth/services/user.helper"
import eventsService from "@/components/microservices/events/js/events.service";

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

    logintest() {
      login();
    },
    logouttest() {
      logout();
    },
    apiCall() {
      eventsService.getEvents();
    },
    userData() {
      console.log(getAuthUser())
    },
    async checkUser() {
      console.log(checkUser())
    },
    userHelperFill() {
      UserHelper.fillLocalsStorageUser();
    }
  }
}
</script>

<style scoped>
.component {
  display: flex;
  /*@media (max-width: 767 px) display: flex;*/
}
</style>
