<template>
  <div class="sections">
    <div class="section-left">
      <div class="block">
        <MonthCalculation></MonthCalculation>
      </div>
    </div>
    <div class="section-right">
      <div class="block">
        <eight-ball></eight-ball>
      </div>
    </div>
  </div>
  <div class="sections">
    <div class="section-left">
      <div class="block">
        <expire-timer></expire-timer>
      </div>
    </div>
    <div class="section-right">
      <div class="block">
        <Currencies></Currencies>
      </div>
    </div>
  </div>
</template>

<script setup>
import MonthCalculation from "@/components/home/BalanceCalculation";
import Currencies from "@/components/home/Currencies";
import ExpireTimer from "@/components/home/ExpireTimer";
import About from "@/components/home/About";
import EightBall from "@/components/home/EightBall";</script>

<style lang="sass" scoped>

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-right
  width: 50%
  margin-top: 16px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.info
  height: 100%
  padding: 16px
  background: url('../assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.section-left
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%

</style>
