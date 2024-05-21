<template>
  <v-card class="card">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      fixed-tabs
      bg-color="rgb(var(--v-theme-primary),0.5)"
    >
      <v-tab value="languages">
        <span>Languages</span>
      </v-tab>
      <v-tab value="sheduling">
        <span>Sheduling</span>
      </v-tab>
      <v-tab value="status">
        <span>Status</span>
      </v-tab>
    </v-tabs>

    <v-card-item>
      <v-window v-model="tab" :touch="false">
        <v-window-item value="languages">
          <languages-main-view></languages-main-view>
        </v-window-item>

        <v-window-item value="sheduling">
          <ShedulingView></ShedulingView>
        </v-window-item>

        <v-window-item value="status">
          Status
        </v-window-item>

      </v-window>
    </v-card-item>
  </v-card>
</template>

<script>

import PandaMainView from "@/components/microservices/panda/PandaMainView";
import ShedulingView from "@/components/settings/sheduling/ShedulingView";
import LanguagesMainView from "@/components/settings/languages/LanguagesMainView";

export default {
  name: "SettingsView",
  components: {LanguagesMainView, ShedulingView, PandaMainView},
  data: () => ({
    tab: null,
  }),
  methods: {}
}
</script>

<style lang="sass" scoped>

.card
  //background-color: $background-transparent
  background-color: rgb(var(--v-theme-transparent), 0)
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.tab-body
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.v-tabs-bar__content
  flex-wrap: wrap
  width: 100%

div.v-tabs-bar
  height: auto


</style>
