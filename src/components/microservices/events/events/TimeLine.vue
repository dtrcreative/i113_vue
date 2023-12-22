<template>
  <v-card-title align="center">
    Nearest Events
  </v-card-title>
  <v-timeline side="end">
      <v-timeline-item
        v-for="item in useEventsStore().getFirstTenUnits" :key="item.id"
        size="x-small"
        max-height="600"
      >
        <div class="mb-4">
          <div class="font-weight-normal">
            <strong>{{ item.eventName }}</strong> -- {{ item.daysLeft }}
          </div>
        </div>
      </v-timeline-item>
  </v-timeline>
</template>

<script setup>
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";
useEventsStore()
</script>

<style scoped>

</style>
