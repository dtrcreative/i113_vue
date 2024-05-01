<template>
  <v-snackbar
    :timeout="3000"
    color="warning"
    rounded="pill"
    variant="tonal"
    v-model="usePandaStore().showSnackBar"
  >
    {{ usePandaStore().snackbarMessage }}
  </v-snackbar>
</template>

<script>
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";

export default {
  name: "PandaSnackBar",
  methods: {
    usePandaStore
  }
}
</script>

<style scoped>

</style>
