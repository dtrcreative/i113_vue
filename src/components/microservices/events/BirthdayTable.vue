<template>
  <v-container class="header">
    <v-row>
      <v-col cols="12" sm="4" md="1">
        <AddBForm></AddBForm>
      </v-col>
      <v-col cols="12" sm="4" md="10">
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
      <v-col cols="12" sm="4" md="1">
        <v-btn
          icon="mdi mdi-trash-can"
          @click=useBirthdaysStore().removeSelected()
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-table density="compact" class="table">
    <thead>
    <tr>
      <!--      TODO AllSelections    -->
      <th class="checkbox">
        <v-btn
          size="small"
          icon="mdi mdi-select-all"
          variant="text"
          @click=useBirthdaysStore().selectAll()
        ></v-btn>
      </th>

      <th class="names">
        First Name
      </th>
      <th class="names"
          @click=""
      >
        Last Name
      </th>
      <th class="date" style="text-align: center">
        Date
      </th>
      <th class="days-left" style="text-align: center">
        Days Left
      </th>
      <th class="notify" style="text-align: center">
        Notify
      </th>
      <th class="btn">
        Update
      </th>
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
        ></v-switch>
      </td>
      <td class="btn">
        <UpdateBForm
          :selectedUnit="item"
          @update="update"
          style="justify-content: center"
        ></UpdateBForm>
      </td>
    </tr>
    </tbody>
  </v-table>

  <div class="empty-table" v-if="useBirthdaysStore().units.length===0">
    <h1>No data</h1>
  </div>

</template>

<script setup>
import AddBForm from "@/components/microservices/events/UI/AddBForm";
import UpdateBForm from "@/components/microservices/events/UI/UpdateBForm";
import birthdayService from "@/components/microservices/events/js/birthday.service";
import SearchField from "@/components/microservices/events/UI/SearchField";
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";
import {onMounted} from "vue";

useBirthdaysStore()

onMounted(() => {
  birthdayService.getBirthdays()
})

function update(){}

</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

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
