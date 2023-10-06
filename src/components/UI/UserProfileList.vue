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
    <v-card rounded  width="200">
      <v-list align="center">
        <v-list-item>
          <v-avatar
            color="primary"
            size="small"
          >
            <strong>{{ getUserInitials }}</strong>
          </v-avatar>
        </v-list-item>
        <v-list-item
          :title = getUserFullName
          :subtitle = getEmail
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
import {isUser, logout} from "@/components/auth/services/auth-helper";
import router from "@/router";
import userHelper from "@/components/auth/services/user.helper";

export default {
  name: "UserProfileList",
  data: () => ({
    selectedItem: 0,
    items: [
      {text: 'Profile', icon: 'mdi-account-multiple', action: "goProfile"},
      {text: 'Logout', icon: 'mdi mdi-logout', action: "logout"},
    ],
  }),
  methods:{
    listAction(action){
      switch (action){
        case 'logout': logout();
          break
        case 'goProfile': router.push("profile");
          break
        case 'goHome': router.push("./");
          break
        default:
          break
      }
    },
  },
  computed:{
    getUserInitials(){
      return userHelper.getUserFirstName().charAt(0).toUpperCase() + userHelper.getUserLastName().charAt(0).toUpperCase();
    },
    getUserFullName(){
      return userHelper.getFullName();
    },
    getEmail(){
      return userHelper.getUserEmail();
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

</style>
