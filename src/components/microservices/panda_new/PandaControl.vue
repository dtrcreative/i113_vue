<template>
  <v-card>
    <v-card-actions>

      <v-btn
        icon="mdi-plus"
        @click="showAddForm"
      ></v-btn>

      <v-text-field clearable
                    v-model.trim="usePandaStore().searchValue"
                    label="Search"
                    variant="outlined"
                    density="compact"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    :maxlength="10"
      >
      </v-text-field>

      <div class="types">
        <v-select
          variant="outlined"
          density="compact"
          return-object
          single-line
          hide-details
          :items="usePandaStore().allTypes"
          v-model="usePandaStore().selectedType"
        ></v-select>
      </div>


      <upload-dialog
        :service="pandaService"
      ></upload-dialog>

      <download-dialog
        :service="pandaService"
      ></download-dialog>

      <v-btn
        icon="mdi-trash-can"
        min-width="50px"
        @click="remove"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-container>
    <v-expand-transition v-show="usePandaStore().showCUForm">
        <panda-c-u-form></panda-c-u-form>
    </v-expand-transition>
  </v-container>
</template>

<script setup>
import {usePandaStore} from "@/components/microservices/panda_new/js/pandaStore";
import pandaService from "@/components/microservices/panda_new/js/panda.service";
import UploadDialog from "@/components/UI/fileio/UploadDialog";
import DownloadDialog from "@/components/UI/fileio/DownloadDialog";
import PandaCUForm from "@/components/microservices/panda_new/PandaCUForm";

usePandaStore()

function showAddForm() {
  usePandaStore().showCUForm = !usePandaStore().showCUForm
  usePandaStore().clearUpdateUnit
}

function remove() {

}

</script>

<style lang="sass" scoped>

.v-card
  display: flex
  margin: 0 auto 0 auto
  border-radius: 15px
  background-color: rgba(0, 11, 42, 0.25)
  width: 80%

.v-container
  background-color: rgba(0, 11, 42, 0)
  border-radius: 0 0 15px 15px
  width: 80%
  @media (max-width: 400px)
    width: 100%

.v-card-actions
  width: 100%

.types
  width: 10%
  @media (max-width: 400px)
    width: 0
    visibility: collapse

.search
  width: 70%

</style>
