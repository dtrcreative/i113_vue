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
        v-for="(item, index) in useLangStore().languageTypes"
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
import {useLangStore} from "@/components/settings/language/js/languageStore";

export default {

  name: "TranlateList",
  data: () => ({
    location: 'end',
  }),

  methods: {
    useLangStore,
    changeLanguage(value) {
      useLangStore().changeLanguage(value)
    }
  }


}
</script>

<style scoped>

</style>
