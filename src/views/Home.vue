<template>
  <div class="sections">
    <div class="section-bottom">
      <div class="block-bottom">
        <MonthCalculation></MonthCalculation>
      </div>
    </div>
<!--    <div class="section-right">-->
<!--      <div class="block-bottom">-->
<!--        <MonthCalculation></MonthCalculation>-->
<!--      </div>-->
<!--    </div>-->
  </div>
<!--  <div class="sections">-->

<!--  </div>-->
</template>

<script setup>
import Dialog from "@/components/UI/Dialog";
import MonthCalculation from "@/components/home/monthcalc/BalanceCalculation";
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'

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

.section-right
  width: 50%
  margin-top: 16px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('../assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('../assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 50%
  margin-top: 16px

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

</style>
