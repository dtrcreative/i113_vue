<template>
<div>{{ useBirthdaysStore().units }}</div>
</template>

<script>
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";
export default {
  name: "EventTable",
  data() {
    return {}
  },
  methods: {
    useBirthdaysStore
  }
}
</script>

<style scoped>
</style>
