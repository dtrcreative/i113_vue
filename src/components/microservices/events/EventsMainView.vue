<template>
  <v-card class="card">

    <v-tabs
      v-model="tab"
      align-tabs="center"
      fixed-tabs
      bg-color="rgb(var(--v-theme-primary),0.5)"
    >
      <v-tab value="calendar" touchless>
        <span>Calendar</span>
      </v-tab>
      <v-tab value="events" touchless>
        <span>Events</span>
      </v-tab>
      <v-tab value="birthdays" touchless>
        <span>Birthdays</span>
      </v-tab>
    </v-tabs>

    <v-card-item class="tab-body">
      <v-window v-model="tab" :touch="false">
        <v-window-item value="calendar">
          <calendar-view></calendar-view>
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
import CalendarView from "@/components/microservices/events/calendar/CalendarView";

export default {
  name: "EventsMainView",
  components: {CalendarView, EventMainView, BirthdayMainView},
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

.v-tabs-bar__content
  flex-wrap: wrap
  width: 100%

div.v-tabs-bar
  height: auto


</style>
