<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs class="tabbar" >
      <v-tab value="language">
        <span>{{ this.lang.inuse.settings_language }}</span>
      </v-tab>
      <v-tab value="sheduling">
        <span>{{ this.lang.inuse.settings_sheduling }}</span>
      </v-tab>
      <v-tab value="status">
        <span>{{ this.lang.inuse.settings_status }}</span>
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">

        <v-window-item value="language">
          <language-view></language-view>
        </v-window-item>

        <v-window-item value="sheduling">
          Sheduling
        </v-window-item>

        <v-window-item value="status">
          Status
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>

import PandaMainView from "@/components/microservices/panda/PandaMainView";
import LanguageView from "@/components/settings/language/LanguageView";
export default {
  name: "SettingsView",
  components: {LanguageView, PandaMainView},
  data: () => ({
    tab: null,
  }),
  methods: {}
}
</script>

<style lang="sass" scoped>

.tabbar
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

</style>
