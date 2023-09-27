<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          color="primary"
          size="large"
        >
          <span>{{ user.initials }}</span>
        </v-avatar>

      </v-btn>
    </template>

    <v-list rounded>
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
  </v-menu>
</template>

<script>
import {logout} from "@/components/auth/services/auth-helper";
import router from "@/router";

export default {
  name: "UserProfileList",
  data: () => ({
    selectedItem: 0,
    items: [
      // { text: 'Rus', icon: 'mdi-folder' },
      // { text: 'Shared with me', icon: 'mdi-account-multiple' },
      // { text: 'Starred', icon: 'mdi-star' },
      // { text: 'Recent', icon: 'mdi-history' },
      // { text: 'Offline', icon: 'mdi-check-circle' },
      // { text: 'Uploads', icon: 'mdi-upload' },
      {text: 'Home', icon: 'mdi-folder', action: "goHome"},
      {text: 'Profile', icon: 'mdi-account-multiple', action: "goProfile"},
      {text: 'Logout', icon: 'mdi mdi-logout', action: "logout"},
    ],
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    },
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
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

</style>
