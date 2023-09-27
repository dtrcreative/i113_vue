<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-avatar icon="$fox" image="src/assets/Fox.png" size="30"></v-avatar>
    </v-app-bar-title>

    <div class="auth" v-if="!isExist">
      <div class="user-info">
        <log-in-button></log-in-button>
      </div>
    </div>
    <div class="auth" v-else>

      <toggle-theme></toggle-theme>
      <tranlate-list></tranlate-list>
      <user-profile-list></user-profile-list>
    </div>

  </v-app-bar>
</template>

<script>
import LogIn from "@/components/auth/LogIn";
import SignIn from "@/components/auth/SignIn";
import LogInButton from "@/components/auth/LogInButton";
import LogOutButton from "@/components/auth/LogOutButton";
import {isUser} from "@/components/auth/services/auth-helper";
import userHelper from "@/components/auth/services/user.helper";
import ToggleTheme from "@/components/UI/ToggleTheme";
import TranlateList from "@/components/UI/TranlateList";
import UserProfileList from "@/components/UI/UserProfileList";

export default {
  name: "AppBar",
  components: {UserProfileList, TranlateList, ToggleTheme, LogOutButton, LogInButton, SignIn, LogIn},

  data() {
    return {
      userFirstName: userHelper.getUserFirstName(),
      value: 1
    }
  },
  computed: {
    isExist() {
      return isUser();
    },
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

