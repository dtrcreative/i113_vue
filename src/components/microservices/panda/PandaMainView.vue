<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <PandaTable></PandaTable>
      </div>
    </div>
  </div>
</template>

<script>
import PandaTable from "@/components/microservices/panda/PandaTable";
export default {
  name: "PandaMainView",
  components: {PandaTable}
}
</script>

<style lang="sass" scoped>
@import '../../../assets/styles/main'

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

.section-center
  width: 100%
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
