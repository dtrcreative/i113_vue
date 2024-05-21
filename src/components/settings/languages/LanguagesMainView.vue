<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <languages-table></languages-table>
      </div>
    </div>
  </div>
</template>

<script>
import LanguagesTable from "@/components/settings/languages/LanguagesTable";

export default {
  name: "LanguagesMainView",
  components: {LanguagesTable}
}
</script>

<style lang="sass" scoped>
.sections
  padding-top: 5px
  @media (min-width: 1060px)
    margin: 0 auto 0 auto
    width: 70%
</style>
