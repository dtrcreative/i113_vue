<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon = "mdi mdi-translate"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in useAppStore().languageTypes"
        :key="index"
        :value="index"
        @click="changeLanguage(item.value)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {useAppStore} from "@/store/app";

export default {

  name: "TranlateList",
  data: () => ({
    location: 'end',
  }),

  methods: {
    useAppStore,
    changeLanguage(value){
      useAppStore().languageSelected = value
    }
  }


}
</script>

<style scoped>

</style>
