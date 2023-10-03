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
    <v-card>

      <v-list>
        <v-list-item
          :title = getUserFullName
          :subtitle = getEmail
        >
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          @click="listAction(item.action)"
        >

          <v-list-item-title v-text="item.text"></v-list-item-title>
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
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
      {text: 'Home', icon: 'mdi mdi-home-account', action: "goHome"},
      {text: 'Profile', icon: 'mdi-account-multiple', action: "goProfile"},
      {text: 'Logout', icon: 'mdi mdi-logout', action: "logout"},
    ],
  }),
  methods:{
    listAction(action){
      switch (action){
        case 'logout': this.listLogout()
          break
        case 'goProfile': this.redirect("profile")
          break
        case 'goHome': this.redirect("./")
          break
        default:
          break
      }
    },
    listLogout(){
      logout();
    },
    redirect(page){
      router.push(page);
    }
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
