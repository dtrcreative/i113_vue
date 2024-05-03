<template>
  <v-list bg-color="rgba(0,0,0,0)">
    <v-list-item
      :title=useNavStore().appPage.home.title
      :value=useNavStore().appPage.home.value
      :prepend-icon="useNavStore().appPage.home.icon"
      :color="useNavStore().appPage.home.color"
      @click="redirect(useNavStore().appPage.home)"
    ></v-list-item>
    <v-divider :thickness="1" class="border-opacity-50"></v-divider>

    <v-list-item
      v-for="(item, i) in useNavStore().microPages"
      :key="i"
      :value="item"
      :prepend-icon="item.icon"
      :color="item.color"
      :title="item.title"
      @click="redirect(item)"
    >
    </v-list-item>

    <v-divider :thickness="1" class="border-opacity-50"></v-divider>
    <v-list-item
      :title=useNavStore().appPage.about.title
      :value=useNavStore().appPage.about.value
      :prepend-icon="useNavStore().appPage.about.icon"
      :color="useNavStore().appPage.about.color"
      @click="redirect(useNavStore().appPage.about)"
    ></v-list-item>
  </v-list>
</template>

<script>

import router from "@/router";
import {useNavStore} from "@/components/appbar/js/navigationStore";

export default {
  name: "NavigationBar",
  data() {
    return {
      items: [
        {text: 'Panda', icon: 'mdi-panda', action: "goPanda"},
        {text: 'Events', icon: 'mdi-calendar', action: "goEvents"},
      ],
    }
  },
  methods: {
    useNavStore,
    redirect(item) {
      router.push(item.redirect);
    },
  }
}
</script>

<style lang="sass" scoped>
</style>
