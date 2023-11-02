<template>
  <v-layout class="overflow-visible">
    <v-bottom-navigation
      v-model="value"
      :bg-color="color"
      grow>
      <v-btn
        @click="getEvents"
      >
        <v-icon>mdi-music-note</v-icon>
        <span>Events</span>
      </v-btn>
      <v-btn
        @click="getBirthdays"
      >
        <v-icon>mdi-heart</v-icon>
        <span>Birthdays</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>

  <div class="sections" v-if="value">
    <div class="section-bottom">
      <div class="block-bottom">
        <birthday-table></birthday-table>
      </div>
    </div>
    <div class="section-right">
      <div class="block-bottom">
        <time-line></time-line>
      </div>
    </div>
  </div>

  <div class="sections" v-else>
    <div class="section-bottom">
      <div class="block-bottom">
        <event-table></event-table>
      </div>
    </div>
    <div class="section-right">
      <div class="block-bottom">
        <time-line></time-line>
      </div>
    </div>
  </div>

</template>

<script>
import TimeLine from "@/components/microservices/events/TimeLine";
import BirthdayTable from "@/components/microservices/events/BirthdayTable";
import EventTable from "@/components/microservices/events/EventTable";
import birthdayService from "@/components/microservices/events/js/birthday.service";
import eventsService from "@/components/microservices/events/js/events.service";

export default {
  name: "BirthdayView",
  components: {EventTable, BirthdayTable, TimeLine},
  data: () => ({value: 1}),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return 'primary'
        case 1:
          return 'secondary'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    },
  },
  methods: {
    getEvents() {
      eventsService.getEvents()
    },
    getBirthdays() {
      birthdayService.getBirthdays()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'

.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d


.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

  &.section-error
    min-width: 235px
    width: auto
    padding-right: 0

.section-right
  width: 25%
  margin-top: 10px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.section-bottom
  width: 75%
  margin-top: 10px

  @media (max-width: 767px)
    width: 100%

.error
  padding-top: 20px

  &-title
    font-size: 18px
    font-weight: 700

  &-message
    padding-top: 10px
    font-size: 13px

.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px
</style>
