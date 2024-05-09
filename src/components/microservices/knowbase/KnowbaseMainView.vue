<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <data-card-view></data-card-view>
      </div>
    </div>
  </div>
</template>

<script>
import DataCard from "@/components/microservices/knowbase/ui/DataCard";
import DataCardView from "@/components/microservices/knowbase/DataCardView";
export default {
  name: "KnowbaseMainView",
  components: {DataCardView, DataCard}
}
</script>

<style lang="sass" scoped>
.sections
  padding-top: 5px
  @media (min-width: 1060px)
    margin: 0 auto 0 auto
    width: 70%
</style>
