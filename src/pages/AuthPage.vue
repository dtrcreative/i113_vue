<template>
  <particles></particles>
  <div class="sections">
    <div class="section-left">
      <logo-view></logo-view>
    </div>
    <div class="section-right">
      <router-view/>
    </div>
  </div>
  <exception-snack-bar></exception-snack-bar>
</template>

<script>
import LogoView from "@/components/auth/LogoView";
import ExceptionSnackBar from "@/components/UI/exceptions/ExceptionSnackBar";
import Particles from "@/layouts/default/Particles";

export default {
  name: "AuthPage",
  components: {Particles, ExceptionSnackBar, LogoView}
}
</script>

<style lang="sass" scoped>

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 45%
  margin-top: 16px

  @media (max-width: 767px)
    display: none
    width: 0%

.section-right
  width: 55%
  margin-top: 150px
  padding-left: 5px
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0
</style>
