<template>
  <v-row>
    <v-col cols="3">
      <v-progress-circular
        :model-value="value"
        :rotate="360"
        :size="80"
        :width="10"
        color="teal"
      >
        {{ value }}
      </v-progress-circular>
    </v-col>
    <v-col cols="9">
      <v-text-field
        class="dateFiled"
        disabled
        variant="outlined"
        label="Token will expire at"
        hide-details
        v-model="timeOrigin"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import {getUser} from "@/store/user.service";
import router from "@/router";

export default {
  name: "ExpireTimer",
  data() {
    return {
      interval: {},
      value: Math.floor((getUser().expireAt * 1000 - new Date().getTime()) / 1000),

      timeOrigin: new Date(getUser().expireAt * 1000),
      secondsToExpire: Math.floor((getUser().expireAt * 1000 - new Date().getTime()) / 1000),
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value <= 0) {
        router.push("./")
      }
      this.value -= 1
    }, 1000)
  },
  computed: {},
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  margin: 1rem

.dateFiled
  display: block
  text-align: left
  padding-top: 5%
  width: 100%

.inline
  display: inline-block
  width: 50%
</style>
