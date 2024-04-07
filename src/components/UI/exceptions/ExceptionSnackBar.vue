<template>
  <v-snackbar
    :timeout="3000"
    color="warning"
    rounded="pill"
    variant="tonal"
    v-model="useExcStore().isException"
  >
    {{ useExcStore().getExceptionText }}
  </v-snackbar>
</template>

<script setup>
import {useExcStore} from "@/components/UI/exceptions/exceptionStore";

useExcStore()
</script>

<style scoped>

</style>
