<template>
  <div class="sections">
    <div class="section-center">
      <div class="block">
        <telegram-settings-view></telegram-settings-view>
      </div>
    </div>
  </div>
</template>

<script>
import TelegramSettingsView from "@/components/settings/sheduling/telegram/TelegramSettingsView";

export default {
  name: "ShedulingView",
  components: {TelegramSettingsView}
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
