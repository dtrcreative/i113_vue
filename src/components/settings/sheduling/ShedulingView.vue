<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <telegram-settings></telegram-settings>
      </div>
    </div>
  </div>
</template>

<script>
import TelegramSettings from "@/components/settings/sheduling/telegram/TelegramSettings";

export default {
  name: "ShedulingView",
  components: {TelegramSettings}
}
</script>

<style lang="sass" scoped>

.sections
  padding-top: 5px
  @media (min-width: 1060px)
    margin: 0 auto 0 auto
    width: 80%

.section-center
  width: 100%

</style>
