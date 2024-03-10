<template>
  <v-app-bar>

    <v-app-bar-title>
      <v-avatar icon="$fox" image="@/assets/Fox.png" size="30"> Ellie</v-avatar>
    </v-app-bar-title>

    <div class="auth">
      <toggle-theme></toggle-theme>
      <translate-list></translate-list>
      <user-profile-list></user-profile-list>
    </div>

  </v-app-bar>

<v-navigation-drawer location="left" expand-on-hover="" rail="">
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

}

</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.user-info
  padding-left: 5px

.auth
  display: flex
  padding: 10px

</style>

