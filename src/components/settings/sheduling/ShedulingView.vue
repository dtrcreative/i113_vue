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
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-center
  width: 100%

</style>
