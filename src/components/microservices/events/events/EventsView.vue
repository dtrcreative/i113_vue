<template>
  <div class="sections">
    <div class="section-left">
      <div class="block">
        <event-table></event-table>
      </div>
    </div>
    <div class="section-right">
      <div class="block">
        <time-line></time-line>
      </div>
    </div>
  </div>
</template>

<script>
import EventTable from "@/components/microservices/events/events/EventTable";
import TimeLine from "@/components/microservices/events/events/TimeLine";
export default {
  name: "EventsView",
  components: {TimeLine, EventTable}
}
</script>

<style lang="sass" scoped>

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-right
  width: 25%
  margin-top: 10px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.section-left
  width: 75%
  margin-top: 10px

  @media (max-width: 767px)
    width: 100%

.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px
</style>

