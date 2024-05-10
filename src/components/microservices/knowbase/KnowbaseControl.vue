<template>
  <v-card>
    <v-card-actions>
      <v-btn
        icon="mdi-plus"
        @click="showAddForm"
      ></v-btn>

      <v-combobox
        variant="outlined"
        label="Select Tag"
        v-model="useKnowbaseStore().selectedTags"
        :items="useKnowbaseStore().tags"
        @change="clearSubtitle"
        hide-details
        chips
        single-line
        closable-chips
      ></v-combobox>
      <v-combobox
        variant="outlined"
        label="Select SubTag"
        v-model="useKnowbaseStore().selectedSubTags"
        :items="useKnowbaseStore().subTags"
        hide-details
        chips
        single-line
        closable-chips
      ></v-combobox>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {useKnowbaseStore} from "@/components/microservices/knowbase/js/knowbaseStore";

useKnowbaseStore()

function showAddForm() {

}

function clearSubtitle(){
  useKnowbaseStore().selectedSubTags = null

}
</script>

<style lang="sass" scoped>
.v-card
  display: flex
  margin: 0 auto 0 auto
  border-radius: 15px
  background-color: rgba(0, 11, 42, 0.25)
  width: 80%
  @media (max-width: 420px)
    width: 100%

.v-card-actions
  width: 100%

.v-combobox
  width: 100%

</style>
