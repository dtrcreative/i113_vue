<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          color="primary"
          size="small"
        >
          <strong>{{ getUserInitials }}</strong>
        </v-avatar>
      </v-btn>
    </template>
    <v-card rounded width="200">
      <v-list align="center">
        <v-list-item>
          <v-avatar
            color="primary"
            size="large"
          >
            <strong>{{ getUserInitials }}</strong>
          </v-avatar>
        </v-list-item>
        <v-list-item
          :title=getUserFullName
          :subtitle=getEmail
        >
        </v-list-item>
      </v-list>
      <v-divider :thickness="4" class="border-opacity-75"></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          @click="listAction(item.action)"
        >

          <v-list-item-title v-text="item.text"></v-list-item-title>
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="x-large"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>

import authService from "@/components/auth/js/auth.service";
import router from "@/router";
import {cleanUserData, getUser} from "@/store/user.service";

export default {
  name: "UserProfileList",
  data: () => ({
    selectedItem: 0,
    items: [
      {text: 'Profile', icon: 'mdi-account-multiple', action: "profile"},
      {text: 'Settings', icon: 'mdi-cog', action: "settings"},
      {text: 'Logout', icon: 'mdi-logout', action: "logout"},
    ],
  }),
  methods: {
    listAction(action) {
      switch (action) {
        case 'logout': {
          authService.logout();
          cleanUserData();
        }
          break
        case 'profile':
          router.push("/profile");
          break
        case 'settings':
          router.push("/settings");
          break
        case 'home':
          router.push("./");
          break
        default:
          break
      }
    },
  },
  computed: {
    getUserInitials() {
      let user = getUser();
      if (user.firstName === "" || user.lastName === "") {
        return user.userName.charAt(0)
      }
      return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
    },
    getUserFullName() {
      let user = getUser();
      return user.firstName + " " + user.lastName;
    },
    getEmail() {
      let user = getUser();
      return user.email;
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
