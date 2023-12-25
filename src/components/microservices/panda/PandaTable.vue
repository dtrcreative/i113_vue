<template>
  <v-container class="header">
    <v-card-actions>
      <v-row>
        <v-col cols="12" xs="1" sm="1" md="1">
          <v-btn
            icon="mdi-plus"
            min-width="50px"
            @click="showAddForm"
          ></v-btn>
        </v-col>
        <v-col cols="12" xs="1" sm="8" md="6">
          <v-text-field clearable
                        v-model.trim="usePandaStore().searchValue"
                        label="Search"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-magnify"
                        hide-details
                        :maxlength="10"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="1" sm="8" md="2">
          <v-select
            variant="outlined"
            density="compact"
            return-object
            single-line
            :items="usePandaStore().allTypes"
            v-model="usePandaStore().selectedType"
          ></v-select>
        </v-col>
        <v-col cols="12" xs="1" sm="1" md="1">
          <UploadDialog
            :service="pandaService"
          ></UploadDialog>
        </v-col>
        <v-col cols="12" xs="1" sm="1" md="1">
          <DownloadDialog
            :service="pandaService"
          ></DownloadDialog>
        </v-col>
        <v-col cols="12" xs="1" sm="1" md="1">
          <v-btn
            icon="mdi mdi-trash-can"
            min-width="50px"
            @click=usePandaStore().removeSelected()
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="usePandaStore().showCUForm">
        <panda-c-u-form></panda-c-u-form>
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
          @click=usePandaStore().selectAll()
        ></v-btn>
      </th>

      <th class="names" style="text-align: center">ServiceName</th>
      <th class="names" style="text-align: center">Account</th>
      <th class="names" style="text-align: center">Mail</th>
      <th class="btn">Password</th>
      <th class="btn">Update</th>

    </tr>
    </thead>

    <tbody>
    <tr
      v-for="item in usePandaStore().searchUnits"
      :key="item.id"
    >
      <td class="checkbox">
        <v-checkbox
          style="display: flex; justify-content: center;"
          v-model="usePandaStore().selected"
          label=""
          :value=item.id
          color="indigo-darken-3"
        ></v-checkbox>
      </td>
      <td class="names" @click="copyToClipboard(item.name)">{{ item.name }}</td>
      <td class="names" @click="copyToClipboard(item.account)">{{ item.account }}</td>
      <td class="names" @click="copyToClipboard(item.mail)">{{ item.mail }}</td>
      <td class="btn">
        <v-btn
          icon="mdi mdi-lock"
          @click="copyToClipboard(item.password)"
        ></v-btn>
      </td>
      <td class="btn">
        <v-btn
          icon="mdi mdi-pen"
          @click="showUpdateForm(item)"
        ></v-btn>
      </td>
    </tr>
    </tbody>
    <div class="empty-table" v-if="usePandaStore().accounts.length===0">
      <h1>No data</h1>
    </div>
  </v-table>
</template>

<script setup>
import pandaService from "@/components/microservices/panda/js/panda.service";
import UploadDialog from "@/components/UI/fileio/UploadDialog";
import DownloadDialog from "@/components/UI/fileio/DownloadDialog";
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import {onMounted} from "vue";
import PandaCUForm from "@/components/microservices/panda/PandaCUForm";
import utilService from "@/components/microservices/utils/util-service";

usePandaStore()

onMounted(() => {
  pandaService.getAccounts()
})

function showAddForm() {
  usePandaStore().showCUForm = !usePandaStore().showCUForm
  usePandaStore().unitToUpdate = {
    id: null,
    name: null,
    account: null,
    mail: null,
    password: null,
    link: null,
    type: 'TRASH',
    description: null,
  };
}

function getPassword(item){
  utilService.copyToClipboard(item.password)
}

function copyToClipboard(value){
  utilService.copyToClipboard(value)
}

function showUpdateForm(unit) {
  usePandaStore().showCUForm = true
  usePandaStore().unitToUpdate = {
    id: unit.id,
    name: unit.name,
    account: unit.account,
    mail: unit.mail,
    password: unit.password,
    link: unit.link,
    type: unit.type,
    description: unit.description,
  };
}
</script>

<style lang="sass" scoped>
@import '../../../assets/styles/main'

header
  display: flex
  width: 800px

component
  display: flex

.btn-create
  display: flex
  justify-content: center
  align-items: center

.searchField
  width: 100%

.table
  background-color: rgba(0, 0, 0, 0)
  max-height: 600px
  overflow: hidden

.checkbox
  width: 0%

.btn
  text-align: center
  width: 5%

.names
  text-align: center
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