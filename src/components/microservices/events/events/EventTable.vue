<template>

  <v-container class="header">
    <v-card-actions>
      <v-row>
        <v-col cols="12" xs="1" sm="1" md="1">
          <v-btn
            icon="mdi-plus"
            @click="showAddForm"
          ></v-btn>
        </v-col>
        <v-col cols="12" xs="1" sm="8" md="8">
          <v-text-field clearable
                        class="searchField"
                        v-model.trim="useEventsStore().searchValue"
                        label="Search"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-magnify"
                        hide-details
                        :maxlength="10"
          ></v-text-field>
        </v-col>
<!--        <v-col cols="12" xs="1" sm="1" md="1">-->
<!--          <UploadDialog-->
<!--            :service="eventsService"-->
<!--          ></UploadDialog>-->
<!--        </v-col>-->
<!--        <v-col cols="12" xs="1" sm="1" md="1">-->
<!--          <DownloadDialog-->
<!--            :service="eventsService"-->
<!--          ></DownloadDialog>-->
<!--        </v-col>-->
        <v-col cols="12" xs="1" sm="1" md="1">
          <v-btn
            icon="mdi mdi-trash-can"
            min-width="50px"
            @click=useEventsStore().removeSelected()
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="useEventsStore().showCUForm">
        <event-c-u-form></event-c-u-form>
      </div>
    </v-expand-transition>

  </v-container>

  <v-table density="compact" class="table">
    <thead>
    <tr>
      <th class="checkbox">
        <v-btn
          size="small"
          icon="mdi mdi-select-all"
          variant="text"
          @click=useEventsStore().selectAll()
        ></v-btn>
      </th>

      <th class="names" style="text-align: center">Event Name</th>
      <th class="date" style="text-align: center">Date</th>
      <th class="days-left" style="text-align: center">Days Left</th>
      <th class="notify" style="text-align: center">Notify</th>
      <th class="btn">Update</th>

    </tr>
    </thead>

    <tbody>
    <tr
      v-for="item in useEventsStore().searchUnits"
      :key="item.id"
    >
      <td class="checkbox">
        <v-checkbox
          style="display: flex; justify-content: center;"
          v-model="useEventsStore().selected"
          label=""
          :value=item.id
          color="indigo-darken-3"
        ></v-checkbox>
      </td>
      <td class="names">{{ item.eventName }}</td>
      <td class="dates" style="text-align: center">{{ item.date }}</td>
      <td class="dates" style="text-align: center">{{ item.daysLeft }}</td>

      <td class="notify">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="compact"
          v-model="item.notify"
        ></v-switch>
      </td>
      <td class="btn">
        <v-btn
          icon="mdi mdi-pen"
          @click="showUpdateForm(item)"
        ></v-btn>
      </td>
    </tr>
    </tbody>

  <div class="empty-table" v-if="useEventsStore().units.length===0">
    <h1>No data</h1>
  </div>

  </v-table>
</template>

<script setup>
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";
import eventsService from "@/components/microservices/events/events/js/events.service";
import UploadDialog from "@/components/UI/fileio/UploadDialog";
import DownloadDialog from "@/components/UI/fileio/DownloadDialog";
import {onMounted} from "vue";
import EventCUForm from "@/components/microservices/events/events/EventCUForm";

useEventsStore()

onMounted(() => {
  eventsService.getUnits()
})

function showAddForm() {
  useEventsStore().showCUForm = !useEventsStore().showCUForm
  useEventsStore().unitToUpdate = {
    id: null,
    eventName: null,
    date: {
      day: null,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    description: '',
    notify: true
  };
}

function showUpdateForm(unit) {
  useEventsStore().showCUForm = true
  useEventsStore().unitToUpdate = {
    id: unit.id,
    eventName: unit.eventName,
    date: {
      day: new Date(unit.date).getDate(),
      month: new Date(unit.date).getMonth() + 1,
      year: new Date(unit.date).getFullYear()
    },
    description: unit.description,
    notify: unit.notify
  };
}

</script>

<style lang="sass" scoped>
@import '../../../../assets/styles/main'
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
  text-align: center
  width: 50%

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
