<template>
  <v-data-table-virtual
    class="transparent"
    v-model="useLangsStore().selected"
    :headers="useLangsStore().headers"
    :items="useLangsStore().searchUnits"
    :loading="useLangsStore().loading"
    density="comfortable"
    height="600"
    mobile-breakpoint="0px"
    show-select
  >
    <template v-slot:top>
      <languages-control></languages-control>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td class="column-checkbox">
          <v-checkbox
            style="display: flex; justify-content: right"
            v-model="useLangsStore().selected"
            label=""
            :value=item.id
            density="compact"
            color="primary"
          ></v-checkbox>
        </td>
        <td class="column-param">{{ item.param }}</td>
        <td class="column-lang">{{ item.eng }}</td>
        <td class="column-lang">{{ item.rus }}</td>
        <td class="column-actions">
          <v-btn class="actions-btn-update" variant="plain" density="comfortable" icon="mdi-pencil"
                 @click="showUpdateForm(item)"></v-btn>
          <v-btn class="actions-btn-info" variant="plain" density="comfortable" icon="mdi-trash-can"
                 @click="deleteUnit(item)"></v-btn>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn>There is no data yet</v-btn>
    </template>

    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

  </v-data-table-virtual>

  <langs-snack-bar></langs-snack-bar>

</template>

<script>
import {useLangsStore} from "@/components/settings/languages/js/languagesStore";
import LanguagesControl from "@/components/settings/languages/LanguagesControl";
import utilService from "@/components/UI/utils/util-service";
import LangsSnackBar from "@/components/settings/languages/ui/LangsSnackBar";
export default {
  name: "LanguagesTable",
  components: {LangsSnackBar, LanguagesControl},
  methods:{
    useLangsStore,
    showUpdateForm(item) {
      useLangsStore().showCUForm = true;
      useLangsStore().updateUnit = {
        id: item.id,
        param: item.param,
        eng: item.eng,
        rus: item.rus,
      };
    },
    deleteUnit(item) {
      useLangsStore().remove(item);
    },
    copyToClipboard(value) {
      let prefix = "this.lang.inuse."
      utilService.copyToClipboard(value, prefix)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.transparent
  background-color: $background-transparent

.v-skeleton-loader
  background-color: $background-transparent

.column-checkbox
  width: 0

.column-param
  width: content-box
  text-align: end

.column-param:hover
  background-color: $table-hover-row

.column-lang
  //width: 20%
  text-align: center

.column-lang:hover
  background-color: $table-hover-row

.column-actions
  width: 10%
  white-space: nowrap
  text-align: center

.actions-btn-pass
  color: rgba(255, 192, 0, 0.6)

.actions-btn-info
  color: rgba(0, 228, 255, 0.6)

.actions-btn-update
  color: rgba(0, 255, 42, 0.6)

tr:hover
  background-color: $table-hover-row

</style>
