<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs class="tabbar">
      <v-tab value="language">Language</v-tab>
      <v-tab value="Sheduling">Sheduling</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">

        <v-window-item value="language">
          Language
        </v-window-item>

        <v-window-item value="Sheduling">
          Sheduling
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>

import PandaMainView from "@/components/microservices/panda/PandaMainView";
export default {
  name: "SettingsView",
  components: {PandaMainView},
  data: () => ({
    tab: null,
  }),
  methods: {}
}
</script>

<style lang="sass" scoped>
@import '../../assets/styles/main'

.tabbar
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

</style>
