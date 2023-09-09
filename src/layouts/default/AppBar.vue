<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-shield-home-outline"/>
      <strong>Ellie</strong>
    </v-app-bar-title>

    <div class="user-info">
      <strong>Guest</strong>
      <v-avatar icon="mdi mdi-account-off"></v-avatar>
    </div>

    <div class="auth" v-if="this.checkUserExist">
      <log-out-button></log-out-button>
    </div>
    <div v-else>
      <log-in-button></log-in-button>
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
import {checkUser} from "@/components/auth/services/auth-helper";
import LogOutButton from "@/components/auth/LogOutButton";

export default {
  name: "AppBar",
  components: {LogOutButton, LogInButton, SignIn, LogIn},
  methods: {},
  computed: {
    async checkUserExist() {
      let result = await checkUser();
      console.log(result);
      return result;
    }
  },
}

</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.user-info
  padding: 5px
  horiz-align: right

.auth
  display: flex
  padding: 10px

</style>

