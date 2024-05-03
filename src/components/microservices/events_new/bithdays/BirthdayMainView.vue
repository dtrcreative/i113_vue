<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <birthday-table></birthday-table>
      </div>
    </div>
  </div>
</template>

<script>
import BirthdayTable from "@/components/microservices/events_new/bithdays/BirthdayTable";
export default {
  name: "BirthdayMainView",
  components: {BirthdayTable}
}
</script>

<style lang="sass" scoped>

.sections
  padding-top: 5px
  @media (min-width: 1060px)
    margin: 0 auto 0 auto
    width: 70%

</style>
