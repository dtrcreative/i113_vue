<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-translate"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in useLangsStore().languageTypes"
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
import {useLangsStore} from "@/components/settings/languages/js/languagesStore";

export default {

  name: "TranlateList",
  data: () => ({
    location: 'end',
  }),

  methods: {
    useLangsStore,
    changeLanguage(value) {
      useLangsStore().changeLanguage(value)
    }
  }


}
</script>

<style scoped>
</style>
