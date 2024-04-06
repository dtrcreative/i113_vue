<template>

  <v-container class="header">
    <v-card-actions>
      <v-row>
        <v-col xs="1" sm="1" md="1">
          <v-btn
            icon="mdi-plus"
            @click="showAddForm"
          ></v-btn>
        </v-col>
        <v-col xs="1" sm="8" md="8">
          <v-text-field clearable
                        class="searchField"
                        v-model.trim="useBirthdaysStore().searchValue"
                        label="Search"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-magnify"
                        hide-details
                        :maxlength="10"
          ></v-text-field>
        </v-col>
        <v-col xs="1" sm="1" md="1">
          <UploadDialog
            :service="birthdayService"
          ></UploadDialog>
        </v-col>
        <v-col xs="1" sm="1" md="1">
          <DownloadDialog
            :service="birthdayService"
          ></DownloadDialog>
        </v-col>
        <v-col xs="1" sm="1" md="1">
          <v-btn
            icon="mdi-trash-can"
            min-width="50px"
            @click=useBirthdaysStore().removeSelected()
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="useBirthdaysStore().showCUForm">
        <birthday-c-u-form></birthday-c-u-form>
      </div>
    </v-expand-transition>

  </v-container>

  <v-table density="compact" class="table">
    <thead>
    <tr>
      <th class="checkbox">
        <v-btn
          size="small"
          icon="mdi-select-all"
          variant="text"
          @click=useBirthdaysStore().selectAll()
        ></v-btn>
      </th>

      <th class="names" style="text-align: center">First Name</th>
      <th class="names" style="text-align: center" @click="">Last Name</th>
      <th class="date" style="text-align: center">Date</th>
      <th class="days-left" style="text-align: center">Days Left</th>
      <th class="notify" style="text-align: center">Notify</th>
      <th class="btn">Update</th>

    </tr>
    </thead>

    <tbody>
    <tr
      v-for="item in useBirthdaysStore().searchUnits"
      :key="item.id"
    >
      <td class="checkbox">
        <v-checkbox
          style="display: flex; justify-content: center;"
          v-model="useBirthdaysStore().selected"
          label=""
          :value=item.id
          color="indigo-darken-3"
        ></v-checkbox>
      </td>
      <td class="names">{{ item.firstName }}</td>
      <td class="names">{{ item.lastName }}</td>
      <td class="dates" style="text-align: center">{{ item.date }}</td>
      <td class="dates" style="text-align: center">{{ item.daysLeft }}</td>

      <td class="notify">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="compact"
          v-model="item.notify"
          @change="birthdayService.updateBirthday(item)"
        ></v-switch>
      </td>
      <td class="btn">
        <v-btn
          icon="mdi-pen"
          @click="showUpdateForm(item)"
        ></v-btn>
      </td>
    </tr>
    </tbody>

    <div class="empty-table" v-if="useBirthdaysStore().units.length===0">
      <h1>No data</h1>
    </div>

  </v-table>
</template>

<script setup>
import BirthdayCUForm from "@/components/microservices/events/birthdays/BirthdayCUForm";
import birthdayService from "@/components/microservices/events/birthdays/js/birthday.service";
import UploadDialog from "@/components/UI/fileio/UploadDialog";
import DownloadDialog from "@/components/UI/fileio/DownloadDialog";
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";
import {onMounted} from "vue";

useBirthdaysStore()

onMounted(() => {
  birthdayService.getUnits()
})

function showAddForm() {
  useBirthdaysStore().showCUForm = !useBirthdaysStore().showCUForm
  useBirthdaysStore().unitToUpdate = {
    id: null,
    firstName: null,
    lastName: null,
    date: {
      day: null,
      month: null,
      year: null
    },
    description: '',
    notify: true
  };
}

function showUpdateForm(unit) {
  useBirthdaysStore().showCUForm = true
  useBirthdaysStore().unitToUpdate = {
    id: unit.id,
    firstName: unit.firstName,
    lastName: unit.lastName,
    date: {
      day: new Date(unit.date).getDate(),
      month: new Date(unit.date).getMonth() + 1,
      year: new Date(unit.date).getFullYear()
    },
    description: unit.description,
    notify: unit.notify
  };

function changeUnitNotification(unit){
  console.log(unit)
  // birthdayService.updateBirthday()
}

function test(){
  console.log('test')
}
}

</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'
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
  width: 0%

.btn
  width: 5%

.days-left
  width: 5%

.date
  width: 30%

.names
  width: 30%

.names:hover
  width: 30%
  background-color: $table-hover-cell

.names:hover
  width: 30%

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
