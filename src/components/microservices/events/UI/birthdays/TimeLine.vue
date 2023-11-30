<template>
  <v-card-title align="center">
    Nearest Birthdays
  </v-card-title>
  <v-timeline density="compact" class="overflow-y-auto" align="start">
    <v-timeline-item
      v-for="item in useBirthdaysStore().getFirstTenUnits" :key="item.id"
      size="x-small"
      max-height="600"
    >
      <div class="mb-4">
        <div class="font-weight-normal">
          <strong>{{ item.daysLeft }}</strong> -- {{ item.firstName }}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";

useBirthdaysStore()
</script>

<style scoped>

</style>
