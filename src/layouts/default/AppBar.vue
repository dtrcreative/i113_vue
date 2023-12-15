<template>
  <v-app-bar
    image="$background-image-vbaner-green"
  >
    <div>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </div>

    <v-app-bar-title>
      <v-avatar icon="$fox" image="src/assets/Fox.png" size="30"> Ellie</v-avatar>
    </v-app-bar-title>

    <div class="auth">
      <toggle-theme></toggle-theme>
      <tranlate-list></tranlate-list>
      <user-profile-list></user-profile-list>
    </div>

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left">
    <navigation-bar></navigation-bar>
  </v-navigation-drawer>

</template>

<script>
import LogIn from "@/components/auth/LogIn";
import SignIn from "@/components/auth/SignIn";

import ToggleTheme from "@/components/UI/ToggleTheme";
import TranlateList from "@/components/UI/TranlateList";
import UserProfileList from "@/components/UI/UserProfileList";
import NavigationBar from "@/components/UI/NavigationBar";

export default {
  name: "AppBar",
  components: {
    NavigationBar, UserProfileList, TranlateList, ToggleTheme, SignIn, LogIn
  },

  data() {
    return {
      drawer: false,
    }
  },

}

</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.user-info
  padding-left: 5px

.auth
  display: flex
  padding: 10px

</style>

