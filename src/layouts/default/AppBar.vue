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
    <div class="user-info"
         v-else>
      <v-avatar icon="mdi mdi-account-star"></v-avatar>
      <strong>{{this.userFirstName}}</strong>
      <log-out-button></log-out-button>
    </div>

  </v-app-bar>
</template>

<script>
import LogIn from "@/components/auth/LogIn";
import SignIn from "@/components/auth/SignIn";
import LogInButton from "@/components/auth/LogInButton";
import LogOutButton from "@/components/auth/LogOutButton";
import {getUser, isUser} from "@/components/auth/services/auth-helper";
import userHelper from "@/components/auth/services/user.helper";

export default {
  name: "AppBar",
  components: {LogOutButton, LogInButton, SignIn, LogIn},

  data(){
    return {
      userFirstName: userHelper.getUserFirstName(),
    }
  },
  computed: {
    isExist() {
      return isUser();
    },
    getUserFirstName(){
      console.log(userHelper.getUserFirstName() + "====")
      return userHelper.getUserFirstName()
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

