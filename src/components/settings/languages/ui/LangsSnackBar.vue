<template>
  <v-snackbar
    :timeout="3000"
    color="warning"
    rounded="pill"
    variant="tonal"
    v-model="useLangsStore().showSnackBar"
  >
    {{ useLangsStore().snackbarMessage }}
  </v-snackbar>
</template>

<script>
import {useLangsStore} from "@/components/settings/languages/js/languagesStore";

export default {
  name: "LangsSnackBar",
  methods: {
    useLangsStore
  }
}
</script>

<style scoped>

</style>
