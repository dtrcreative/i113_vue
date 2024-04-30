<template>
  <v-data-table
    v-model="usePandaStore().selected"
    :headers="usePandaStore().headers"
    :items="usePandaStore().accounts"
    density="comfortable"
    show-select
  >

    <template v-slot:top>
        <panda-control></panda-control>
    </template>


    <template v-slot:header="{ props: { headers } }">
      <thead class="v-data-table-header">
      <tr>
        <th
          v-for="header in headers"
          :key="header.value"
          class="text-uppercase"
          scope="col"
        >
          {{ header.title }}
        </th>
      </tr>
      </thead>
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
        <td class="column-account">{{ item.account }}</td>
        <td class="column-mail">{{ item.mail }}</td>
        <td class="column-actions">
          <v-btn class="actions-btn-pass" variant="plain" density="comfortable" icon="mdi-content-copy"
                 @click="copyPassword(item)"></v-btn>
          <v-btn class="actions-btn-info" variant="plain" density="comfortable" icon="mdi-information-variant"
                 @click="description(item)"></v-btn>
          <v-btn class="actions-btn-update" variant="plain" density="comfortable" icon="mdi-pencil"
                 @click="updateItem(item)"></v-btn>
        </td>
      </tr>
      <tr v-if="usePandaStore().expanded.indexOf(item) !== -1">
        <td :colspan=usePandaStore().headers.length+1>
          {{ item.description }}
        </td>
      </tr>
    </template>


    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset</v-btn>
    </template>

  </v-data-table>
</template>

<script>
import {usePandaStore} from "@/components/microservices/panda_new/js/pandaStore";
import PandaControl from "@/components/microservices/panda_new/PandaControl";
import PandaCUForm from "@/components/microservices/panda_new/PandaCUForm";

export default {
  name: "PandaTable",
  components: {PandaCUForm, PandaControl},
  data() {
    return {
      selected: [],
    }
  },
  methods: {
    usePandaStore,

    copyPassword(item) {
      console.log("copyPassword")
    },
    deleteItem(item) {
      console.log("delete")
    },
    updateItem(item) {
      console.log("update")
    },
    description(item) {
      usePandaStore().expanded.indexOf(item) === -1 ? usePandaStore().expanded.push(item) : usePandaStore().expanded.pop(item);
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.v-data-table
  background-color: rgba(0, 0, 0, 0)

.v-container
  background-color: rgba(0, 0, 0, 0)

.column-checkbox
  width: 0

.column-name
  text-align: center

.column-name:hover
  background-color: $table-hover-row

.column-account
  text-align: center

.column-account:hover
  background-color: $table-hover-row

.column-mail
  text-align: center

.column-mail:hover
  background-color: $table-hover-row

.column-actions
  min-width: 10%
  width: 15%
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
