<template>
  <v-card>
    <v-card-actions>
      <v-btn
        icon="mdi-plus"
        @click="showAddForm"
      ></v-btn>

      <div class="search">
        <v-text-field clearable
                      v-model.trim="useEventStore().searchValue"
                      label="Search"
                      variant="outlined"
                      density="compact"
                      append-inner-icon="mdi-magnify"
                      hide-details
                      :maxlength="10"
        >
        </v-text-field>
      </div>

      <v-btn
        icon="mdi-trash-can"
        min-width="50px"
        @click="remove"
      ></v-btn>
    </v-card-actions>
  </v-card>

  <v-container>
    <v-expand-transition v-show="useEventStore().showCUForm">
      <event-c-u-form></event-c-u-form>
    </v-expand-transition>
  </v-container>

  <confirm-dialog
    :store="useEventStore()"
    title='Сonfirm deletion'
    text="Please confirm deletion of selected birthdays."
  ></confirm-dialog>

</template>

<script setup>

import {useEventStore} from "@/components/microservices/events/events/js/eventStore";
import ConfirmDialog from "@/components/UI/ConfirmDialog";
import EventCUForm from "@/components/microservices/events/events/EventCUForm";

useEventStore()

function showAddForm() {
  useEventStore().showCUForm = !useEventStore().showCUForm
  useEventStore().clearUpdateUnit()
}

function remove() {
  if (useEventStore().selected.length > 0) {
    useEventStore().showConfirmDialog = true
  }
}
</script>

<style lang="sass" scoped>

.v-card
  display: flex
  margin: 0 auto 0 auto
  border-radius: 15px
  background-color: rgba(0, 11, 42, 0.25)
  width: 80%
  @media (max-width: 400px)
    width: 100%

.v-container
  background-color: rgba(0, 11, 42, 0)
  border-radius: 0 0 15px 15px
  width: 80%
  @media (max-width: 550px)
    width: 100%
  @media (max-width: 1600px)
    width: 100%

.v-card-actions
  width: 100%

.search
  width: 90%

</style>
