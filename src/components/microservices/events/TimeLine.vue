<template>
  <v-timeline side="end">
      <v-timeline-item
        size="small"
        v-for="item in useBirthdaysStore().filterByDaysLeft"
        :key="item.id"
      >
        <template v-slot:opposite>
          <span>{{item.firstName}}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="text-h5"> {{item.daysLeft}} </v-card-title>
        </v-card>
      </v-timeline-item>
  </v-timeline>
</template>

<script setup>
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";
useBirthdaysStore()
</script>

<style scoped>

</style>
