<template>
  <v-app-bar prominent>

    <v-app-bar-title>
      <v-img src="@/assets/Fox.png" width="35"></v-img>
    </v-app-bar-title>
    <div class="date">
      <v-text-field
        variant="plain"
        hide-details
        disabled
        v-model="date"
      ></v-text-field>
    </div>
    <div class="time">
      <v-text-field
        variant="plain"
        hide-details
        disabled
        v-model="time"
      ></v-text-field>
    </div>
    <about></about>
    <div class="auth">
      <toggle-theme></toggle-theme>
      <translate-list></translate-list>
      <user-profile-list></user-profile-list>
    </div>

  </v-app-bar>

  <v-navigation-drawer
    expand-on-hover
    rail>
    <navigation-bar></navigation-bar>
  </v-navigation-drawer>

  <ExceptionSnackBar></ExceptionSnackBar>

</template>

<script>

import ToggleTheme from "@/components/appbar/ToggleTheme";
import TranslateList from "@/components/appbar/TranlateList";
import UserProfileList from "@/components/appbar/UserProfileList";
import NavigationBar from "@/components/appbar/NavigationBar";
import ExceptionSnackBar from "@/components/UI/exceptions/ExceptionSnackBar";
import ExpireTimer from "@/components/home/ExpireTimer";
import {getCurentDateString} from "@/store/app.service";
import About from "@/components/home/About";

export default {
  name: "AppBar",
  components: {
    About,
    ExpireTimer,
    ExceptionSnackBar,
    NavigationBar, UserProfileList, TranslateList, ToggleTheme
  },
  data(){
    return{
      interval: {},
      date: getCurentDateString(),
      time: ""
    }
  },

  beforeUnmount() {
    clearInterval(this.interval)
  },

  mounted() {
    this.interval = setInterval(() => {
      let date = new Date().toString().split(" ")
        this.time = date[4]
    }, 1000)
  },

}

</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.v-app-bar
  background-color:  rgb(var(--v-theme-background),0.9)
  //background-color: $background-transparent
.v-navigation-drawer
  background-color:  rgb(var(--v-theme-background),0.9)
  //background-color: $background-transparent

.date
  padding-bottom: 1%
  width: 17%
  @media (max-width: 767px)
    width: 0
    visibility: collapse

.time
  width: 9%
  padding-bottom: 1%
  @media (max-width: 767px)
    width: 20%

.inline
  float: left

.user-info
  padding-left: 5px

.auth
  display: flex
  padding: 10px

</style>

