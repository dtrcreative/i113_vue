<template>
  <v-app-bar>
    <div>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </div>

    <v-app-bar-title>
      <v-avatar icon="$fox" image="/src/assets/Fox.png" size="30"> Ellie</v-avatar>
    </v-app-bar-title>

    <div class="auth">
      <toggle-theme></toggle-theme>
      <translate-list></translate-list>
      <user-profile-list></user-profile-list>
    </div>

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left">
    <navigation-bar></navigation-bar>
  </v-navigation-drawer>

</template>

<script>

import ToggleTheme from "@/components/appbar/ToggleTheme";
import TranslateList from "@/components/appbar/TranlateList";
import UserProfileList from "@/components/appbar/UserProfileList";
import NavigationBar from "@/components/appbar/NavigationBar";

export default {
  name: "AppBar",
  components: {
    NavigationBar, UserProfileList, TranslateList, ToggleTheme
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

