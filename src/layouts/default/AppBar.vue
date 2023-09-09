<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-shield-home-outline"/>
      <strong>Ellie</strong>
    </v-app-bar-title>

    <div class="user-info" v-if="!isExist">
      <v-avatar icon="mdi mdi-account-off"></v-avatar>
      <strong>Guest</strong>
      <log-in-button></log-in-button>
    </div>
    <div class="user-info" v-else>
      <v-avatar icon="mdi mdi-account-star"></v-avatar>
      <strong>UserName</strong>
      <log-out-button></log-out-button>
    </div>


    <!--    <v-menu>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-btn icon v-bind="attrs" v-on="on">-->
    <!--          <v-icon>mdi-dots-vertical</v-icon>-->
    <!--        </v-btn>-->
    <!--      </template>-->

    <!--      <v-list>-->
    <!--        <v-list-item v-for="n in 4" :key="n" @click="() => {}">-->
    <!--          Option {{ n }}-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-menu>-->

    <!--    <v-app-bar-nav-icon/>-->

  </v-app-bar>
</template>

<script>
import LogIn from "@/components/auth/LogIn";
import SignIn from "@/components/auth/SignIn";
import LogInButton from "@/components/auth/LogInButton";
import LogOutButton from "@/components/auth/LogOutButton";

export default {
  name: "AppBar",
  components: {LogOutButton, LogInButton, SignIn, LogIn},
  computed: {
    isExist() {
      return sessionStorage.length !== 0
    }
  },
}

</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.user-info
  padding: 10px
  horiz-align: right

.auth
  display: flex
  padding: 10px

</style>

