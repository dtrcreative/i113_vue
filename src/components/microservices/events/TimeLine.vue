<template>
  <v-timeline side="end">
    <v-timeline-item size="small">
<!--      <template v-slot:icon>-->
<!--        <v-avatar image="https://i.pravatar.cc/64"></v-avatar>-->
<!--      </template>-->
      <template v-slot:opposite>
        <span>Date</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="text-h5"> Full Name </v-card-title>
      </v-card>
    </v-timeline-item>

    <v-timeline-item size="small">
      <!--      <template v-slot:icon>-->
      <!--        <v-avatar image="https://i.pravatar.cc/64"></v-avatar>-->
      <!--      </template>-->
      <template v-slot:opposite>
        <span>Date</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="text-h5"> Full Name </v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "TimeLine"
}
</script>

<style scoped>

</style>
