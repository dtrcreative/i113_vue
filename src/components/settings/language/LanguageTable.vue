<template>
  <div class="empty-table" v-if="useLangStore().languages.length===0">
    <h1>No data</h1>
  </div>
  <div v-else>
    <v-container class="header">
      <v-card-actions>
        <v-row>
          <v-col xs="1" sm="1" md="1">
            <v-btn
              icon="mdi-plus"
              @click="showAddForm"
            ></v-btn>
          </v-col>
          <v-col xs="8" sm="8" md="8">
            <v-text-field clearable
                          class="searchField"
                          v-model.trim="useLangStore().searchValue"
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
              :service="languageService"
            ></UploadDialog>
          </v-col>
          <v-col xs="1" sm="1" md="1">
            <DownloadDialog
              :service="languageService"
            ></DownloadDialog>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="useLangStore().showCUForm">
          <language-c-u-form></language-c-u-form>
        </div>
      </v-expand-transition>

    </v-container>
    <v-table density="compact" class="table">
      <thead>
      <tr>
        <th class="column-param" style="text-align: center">Param Name</th>
        <th class="column" style="text-align: center">Eng</th>
        <th class="column" style="text-align: center">Rus</th>
        <th class="btn">Update</th>
        <th class="btn">Delete</th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="item in useLangStore().searchUnits"
        :key="item.id"
      >
        <td class="column-param"
            style="text-align: left"
            @click="copyToClipboard(item.param)"
        >{{ item.param }}
        </td>
        <td class="column" style="text-align: center">{{ item.eng }}</td>
        <td class="column" style="text-align: center">{{ item.rus }}</td>
        <td class="btn">
          <v-btn
            icon="mdi-pen"
            @click="showUpdateForm(item)"
          ></v-btn>
        </td>
        <td class="btn">
          <v-btn
            icon="mdi-trash-can"
            @click="deleteItem(item)"
          ></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {useLangStore} from "@/components/settings/language/js/languageStore";
import LanguageCUForm from "@/components/settings/language/LanguageCUForm";
import languageService from "@/components/settings/language/js/language.service";
import utilService from "@/components/UI/utils/util-service";
import UploadDialog from "@/components/UI/fileio/UploadDialog";
import DownloadDialog from "@/components/UI/fileio/DownloadDialog";

useLangStore()

function showAddForm() {
  useLangStore().showCUForm = !useLangStore().showCUForm
  useLangStore().paramToUpdate = {
    id: null,
    param: null,
    eng: null,
    rus: null,
  };
}

function showUpdateForm(item) {
  useLangStore().showCUForm = true;
  useLangStore().paramToUpdate = {
    id: item.id,
    param: item.param,
    eng: item.eng,
    rus: item.rus,
  };
}

function deleteItem(item) {
  useLangStore().remove(item);
}

function copyToClipboard(value) {
  let prefix = "this.lang.inuse."
  utilService.copyToClipboard(value, prefix)
}

</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'
header
  display: flex

.btn-create
  display: flex
  justify-content: center
  align-items: center

.table
  background-color: rgba(0, 0, 0, 0)
  max-height: 600px
  overflow: hidden

.btn
  width: 5%

.column-param
  width: 35%

.column-param:hover
  width: 35%
  background-color: $table-hover-cell

.column-param:hover
  width: 35%

.column
  text-align: center
  width: 25%


.create
  padding-top: 20px
  display: flex
  justify-content: center

.empty-table
  padding-top: 20px
  display: flex
  justify-content: center

tr:hover
  background-color: $table-hover-row
</style>
