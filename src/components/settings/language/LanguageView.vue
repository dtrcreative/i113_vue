<template>
  <div class="sections">
    <div class="section-left">
      <div class="block">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageView"
}
</script>

<style lang="sass" scoped>

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-center
  width: 25%
  margin-top: 10px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    display: none

</style>
