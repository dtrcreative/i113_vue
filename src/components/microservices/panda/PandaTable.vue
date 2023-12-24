<template>

</template>

<script setup>
import pandaService from "@/components/microservices/panda/js/panda.service";
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import {onMounted} from "vue";
usePandaStore()

onMounted(() => {
  pandaService.getUnits()
})
</script>

<style lang="sass" scoped>
@import '../../../assets/styles/main'

header
  display: flex

component
  display: flex

.btn-create
  display: flex
  justify-content: center
  align-items: center

.table
  background-color: rgba(0, 0, 0, 0)
  max-height: 600px
  overflow: hidden

.checkbox
  width: 5%

.btn
  width: 5%

.days-left
  width: 5%

.date
  width: 20%

.names
  width: 20%

.names:hover
  width: 20%
  background-color: $table-hover-cell

.names:hover
  width: 20%

.create
  padding-top: 20px
  display: flex
  justify-content: center

.notify
  vertical-align: middle
  text-align: center
  width: 10%

.empty-table
  padding-top: 20px
  display: flex
  justify-content: center

tr:hover
  background-color: $table-hover-row

</style>
