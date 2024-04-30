<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <panda-table></panda-table>
      </div>
    </div>
  </div>
</template>

<script>
import PandaTable from "@/components/microservices/panda_new/PandaTable";
export default {
  name: "PandaMainView",
  components: {PandaTable}
}
</script>

<style lang="sass" scoped>
.sections
  padding-top: 5px
  @media (min-width: 810px)
    margin: 0 auto 0 auto
    width: 70%
</style>
