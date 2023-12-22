<template>
  <v-card-title align="center">
    Nearest Birthdays
  </v-card-title>
  <v-timeline density="compact" class="overflow-y-auto" align="start">
    <v-timeline-item
      v-for="item in useBirthdaysStore().getFirstTenUnits" :key="item.id"
      size="x-small"
    >
      <div class="mb-4">
        <div class="font-weight-normal">
          <strong>{{ item.firstName }}</strong> -- {{ item.daysLeft }}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";

useBirthdaysStore()
</script>

<style scoped>

</style>
