<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <language-table></language-table>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageTable from "@/components/settings/language/LanguageTable";

export default {
  name: "LanguageView",
  components: {LanguageTable}
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

  @media (max-width: 767px)
    display: none

</style>
