<template>
  <v-card class="card">

    <v-tabs
      v-model="tab"
      align-tabs="center"
      fixed-tabs
      bg-color="rgb(var(--v-theme-primary),0.5)"
    >
      <v-tab value="calendar">
        <span>Calendar</span>
      </v-tab>
      <v-tab value="events">
        <span>Events</span>
      </v-tab>
      <v-tab value="birthdays">
        <span>Birthdays</span>
      </v-tab>
    </v-tabs>

    <v-card-item class="tab-body">
      <v-window v-model="tab">
        <v-window-item value="calendar">
          <v-btn>test</v-btn>
        </v-window-item>
        <v-window-item value="events">
          <event-main-view></event-main-view>
        </v-window-item>
        <v-window-item value="birthdays">
          <birthday-main-view></birthday-main-view>
        </v-window-item>
      </v-window>
    </v-card-item>

  </v-card>
</template>

<script>
import BirthdayMainView from "@/components/microservices/events/bithdays/BirthdayMainView";
import EventMainView from "@/components/microservices/events/events/EventMainView";

export default {
  name: "EventsMainView",
  components: {EventMainView, BirthdayMainView},
  data: () => ({
    tab: null,
  }),
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.card
  //background-color: $background-transparent
  background-color: rgb(var(--v-theme-transparent), 0)
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.tab-body
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

</style>
