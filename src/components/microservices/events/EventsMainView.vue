<template>
  <v-card class="card">
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs class="tabbar" touchless>
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

    <v-card-text class="tabbody">
      <v-window v-model="tab">

        <v-window-item value="calendar">
          <calendar-view></calendar-view>
        </v-window-item>

        <v-window-item value="events">
          <events-view></events-view>
        </v-window-item>

        <v-window-item value="birthdays">
          <birthday-view></birthday-view>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

</template>

<script>
import CalendarView from "@/components/microservices/events/calendar/CalendarView";
import EventsView from "@/components/microservices/events/events/EventsView";
import BirthdayView from "@/components/microservices/events/birthdays/BirthdayView";

export default {
  name: "EventsMainView",
  components: {BirthdayView, EventsView, CalendarView},
  data: () => ({
    tab: null,
  }),
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.card
  background-color: rgba(0,0,0,0)
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.tabbody
  background-color: rgba(0,0,0,0)
  border-radius: 20px

.tabbar
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

</style>
