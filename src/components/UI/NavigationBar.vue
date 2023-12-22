<template>
  <v-list>
    <v-list-item
      prepend-icon="mdi-view-dashboard"
      title="Home"
      value="home"
      @click="listAction('goHome')"
    ></v-list-item>
    <v-divider :thickness="3" class="border-opacity-50"></v-divider>

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

    <v-divider :thickness="3" class="border-opacity-50"></v-divider>
    <v-list-item
      prepend-icon="mdi-forum"
      title="About"
      value="about"
    ></v-list-item>
  </v-list>
</template>

<script>

import router from "@/router";

export default {
  name: "NavigationBar",
  data(){
    return{
      items: [
        {text: 'Panda', icon: 'mdi mdi-panda', action: "goPanda"},
        {text: 'Events', icon: 'mdi mdi-calendar', action: "goEvents"},
      ],
    }
  },
  methods: {
    listAction(action){
      switch (action){
        case 'goHome': router.push("/home");
          break
        case 'goPanda': router.push("/panda/");
          break
        case 'goEvents': router.push("/events/calendar");
          break
        default:
          break
      }
    },
  }
}
</script>


<style lang="sass" scoped>
@import '../src/assets/styles/main'
</style>
