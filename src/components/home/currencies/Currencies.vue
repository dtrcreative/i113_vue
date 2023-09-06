<template>

  <v-card
    class="mx-auto"
    title="Today Currencies"
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
    @click="pandacall"
  >
    pandaCall
  </v-btn>


</template>

<script>
import {callApi} from "@/components/auth/services/axios-helper";
import {login, logout} from "@/components/auth/services/auth-helper";
export default {
  name: "Currencies",

  data: () => ({
    items: [
      { title: 'BYN' },
      { title: 'USD' },
      { title: 'EUR' },
      { title: 'RUB' },
    ],
  }),

  methods:{
    //643 - RUB
    //978 - EUR
    //840

    logintest(){
      login();
    },
    logouttest(){
      logout();
    },
    pandacall(){
      callApi();
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
