<template>
  <div class="sections">
    <div class="section-left">
      <div class="block">
        <label>Panda</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PandaMainView"
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

  &.section-error
    min-width: 235px
    width: auto
    padding-right: 0

.section-left
  width: 100%
  margin-top: 10px

  @media (max-width: 767px)
    width: 100%

.error
  padding-top: 20px

  &-title
    font-size: 18px
    font-weight: 700

  &-message
    padding-top: 10px
    font-size: 13px

.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px

</style>
