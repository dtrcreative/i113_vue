<template>
  <v-data-table
    class="transparent"
    v-model="usePandaStore().selected"
    :headers="usePandaStore().headers"
    :items="usePandaStore().searchUnits"
    :loading="usePandaStore().loading"
    density="comfortable"
    height="600"
    mobile-breakpoint="0px"
    show-select
  >

    <template v-slot:top>
      <panda-control></panda-control>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td class="column-checkbox">
          <v-checkbox
            style="display: flex; justify-content: right"
            v-model="usePandaStore().selected"
            label=""
            :value=item.id
            density="compact"
            color="primary"
          ></v-checkbox>
        </td>
        <td class="column-name">{{ item.name }}</td>
        <td class="column-account" @click="copyToClipboard(item.account)">{{ item.account }}</td>
        <td class="column-mail" @click="copyToClipboard(item.mail)">{{ item.mail }}</td>
        <td class="column-actions">
          <v-btn class="actions-btn-pass" variant="plain" density="comfortable" icon="mdi-content-copy"
                 @click="copyToClipboard(item.password)"></v-btn>
          <v-btn class="actions-btn-info" variant="plain" density="comfortable" icon="mdi-information-variant"
                 @click="description(item)"></v-btn>
          <v-btn class="actions-btn-update" variant="plain" density="comfortable" icon="mdi-pencil"
                 @click="showUpdateForm(item)"></v-btn>
        </td>
      </tr>
      <tr v-if="usePandaStore().expanded.indexOf(item) !== -1 && item.description !== null && item.description !== ''">
        <td :colspan=usePandaStore().headers.length+1>
          {{ item.description }}
        </td>
      </tr>
    </template>

<!--    <template v-slot:no-data>-->
<!--      <v-btn>There is no data yet</v-btn>-->
<!--    </template>-->

<!--    <template v-slot:loading>-->
<!--      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>-->
<!--    </template>-->

  </v-data-table>

  <panda-snack-bar></panda-snack-bar>

</template>

<script>
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import PandaControl from "@/components/microservices/panda/PandaControl";
import PandaCUForm from "@/components/microservices/panda/PandaCUForm";
import pandaService from "@/components/microservices/panda/js/panda.service";
import utilService from "@/components/UI/utils/util-service";
import PandaSnackBar from "@/components/microservices/panda/ui/PandaSnackBar";

export default {
  name: "PandaTable",
  components: {PandaSnackBar, PandaCUForm, PandaControl},
  data() {
    return {
      selected: [],
    }
  },
  methods: {
    usePandaStore,

    copyToClipboard(item) {
      utilService.copyToClipboard(item)
      usePandaStore().snackbarMessage = "Copied to clipboard"
      usePandaStore().showSnackBar = true
    },

    showUpdateForm(item) {
      usePandaStore().showCUForm = true
      usePandaStore().updateUnit = {
        id: item.id,
        name: item.name,
        account: item.account,
        mail: item.mail,
        password: item.password,
        link: item.link,
        type: item.type,
        description: item.description,
      };
    },
    description(item) {
      usePandaStore().expanded.indexOf(item) === -1 ? usePandaStore().expanded.push(item) : usePandaStore().expanded.pop(item);
    },
    mail(){
      console.log("Gomail")
    }

  },
  mounted() {
    usePandaStore().loading=true
    pandaService.getUnits().then(()=>{
      usePandaStore().loading=false
    })
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.v-data-table__mobile-row__header
  display: none


.v-data-table__mobile-row__cell
  text-align: left !important


.transparent
  background-color: $background-transparent

.v-skeleton-loader
  background-color: $background-transparent
.column-checkbox
  width: 0

.column-name
  width: content-box
  text-align: end

.column-name:hover
  background-color: $table-hover-row

.column-account
  width: content-box
  text-align: start

.column-account:hover
  background-color: $table-hover-row

.column-mail
  width: content-box
  text-align: center

.column-mail:hover
  background-color: $table-hover-row

.column-actions
  white-space: nowrap
  text-align: center

.actions-btn-pass
  color: rgba(255, 192, 0, 0.6)

.actions-btn-info
  color: rgba(0, 228, 255, 0.6)

.actions-btn-mail
  color: rgba(239, 65, 65, 0.6)

.actions-btn-update
  color: rgba(0, 255, 42, 0.6)

tr:hover
  background-color: $table-hover-row


</style>
