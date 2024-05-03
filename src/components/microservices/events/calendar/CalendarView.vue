<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <v-row>
          <v-col>
            <v-date-picker
              hide-header
              show-adjacent-months
              multiple=""
              class="calendar"
            ></v-date-picker>
          </v-col>
          <v-col>
            <v-date-picker
              hide-header
              show-adjacent-months
              multiple=""
              class="calendar"
            ></v-date-picker>
          </v-col>
          <v-col>
            <v-date-picker
              hide-header
              show-adjacent-months
              class="calendar"
            ></v-date-picker>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CalendarView",
  data: () => ({
    hideHeader: true,
    previousMonth: new Date(),
    currentMonth: new Date(),
    nextMonth: new Date()
  }),
  methods: {
    getPreviousMonth() {
      let date = new Date();

    }
  }
}
</script>

<style lang="sass" scoped>

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-center
  width: 100%
  margin-top: 10px
  padding-left: 5px
  padding-right: 10px
  text-align: center

  @media (max-width: 767px)
    width: 100%

.calendar
  width: 100%
  background-color: rgba(0, 0, 0, 0.17)

.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px
</style>
