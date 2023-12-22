<template>

  <div class="sections">
    <div class="section-left">
      <div class="block">
        <birthday-table></birthday-table>
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
import BirthdayTable from "@/components/microservices/events/birthdays/BirthdayTable";
import TimeLine from "@/components/microservices/events/birthdays/TimeLine";
export default {
  name: "BirthdayView",
  components: {TimeLine, BirthdayTable}
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
    display: none

.section-left
  width: 75%
  margin-top: 10px

  @media (max-width: 767px)
    width: 100%

</style>

