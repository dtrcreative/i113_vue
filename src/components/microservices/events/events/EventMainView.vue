<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <event-table></event-table>
      </div>
    </div>
  </div>
</template>

<script>
import EventTable from "@/components/microservices/events/events/EventTable";
export default {
  name: "EventMainView",
  components: {EventTable}
}
</script>

<style lang="sass" scoped>

.sections
  padding-top: 5px
  @media (min-width: 1060px)
    margin: 0 auto 0 auto
    width: 70%

</style>
