<template>
  <div>{{ activeProfile }}</div>
</template>

<script>

import {getActiveProfile} from "@/store/app.service";

export default {
  name: "About",
  data() {
    return {}
  },
  methods: {},
  computed: {
    activeProfile() {
      return getActiveProfile()
    }
  }
}
</script>

<style scoped>

</style>
