<template>
  <v-data-table-virtual
    class="transparent"
    v-model="useBirthdayStore().selected"
    :headers="useBirthdayStore().headers"
    :items="useBirthdayStore().searchUnits"
    :loading="useBirthdayStore().loading"
    density="comfortable"
    height="600"
    mobile-breakpoint="0px"
    show-select
  >
    <template v-slot:top>
      <birthday-control></birthday-control>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td class="column-checkbox">
          <v-checkbox
            style="display: flex; justify-content: right"
            v-model="useBirthdayStore().selected"
            label=""
            :value=item.id
            density="compact"
            color="primary"
          ></v-checkbox>
        </td>
        <td class="column-first-name">{{ item.firstName }}</td>
        <td class="column-last-name">{{ item.lastName }}</td>
        <td class="column-date">{{ item.date }}</td>
        <td class="column-days-left">{{ item.daysLeft }}</td>
        <td class="column-notify">
          <v-switch
            style="display: flex; justify-content: center;"
            color="primary"
            density="compact"
            v-model="item.notify"
            @change="useBirthdayStore.updateShedule(item)"
          ></v-switch>
        </td>
        <td class="column-actions">
          <v-btn class="actions-btn-info" variant="plain" density="comfortable" icon="mdi-information-variant"
                 @click="description(item)"></v-btn>
          <v-btn class="actions-btn-update" variant="plain" density="comfortable" icon="mdi-pencil"
                 @click="showUpdateForm(item)"></v-btn>
        </td>
      </tr>

      <tr v-if="useBirthdayStore().expanded.indexOf(item) !== -1 && item.description !== null && item.description !== ''">
        <td :colspan=useBirthdayStore().headers.length+1>
          {{ item.description }}
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
</template>

<script>
import {useBirthdayStore} from "@/components/microservices/events/bithdays/js/birthdayStore";
import BirthdayControl from "@/components/microservices/events/bithdays/BirthdayControl";
import birthdayService from "@/components/microservices/events/bithdays/js/birthday.service";

export default {
  name: "BirthdayTable",
  components: {BirthdayControl},
  methods: {
    useBirthdayStore,

    showUpdateForm(item) {
      let itemDate = new Date(item.date);
      useBirthdayStore().updateUnit = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        date: {
          day: itemDate.getDate(),
          month: itemDate.getMonth() + 1,
          year: itemDate.getFullYear()
        },
        description: item.description,
        notify: item.notify
      };
      useBirthdayStore().showCUForm = true
    },
    description(item) {
      useBirthdayStore().expanded.indexOf(item) === -1 ? useBirthdayStore().expanded.push(item) : useBirthdayStore().expanded.pop(item);
    },
  },
  mounted() {
    useBirthdayStore().loading = true
    birthdayService.getUnits().then(() => {
      useBirthdayStore().loading = false
    })
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

.column-first-name
  width: content-box
  text-align: end

.column-first-name:hover
  background-color: $table-hover-row

.column-last-name
  width: content-box
  text-align: start

.column-last-name:hover
  background-color: $table-hover-row

.column-date
  width: content-box
  text-align: center

.column-date:hover
  background-color: $table-hover-row

.column-days-left
  width: content-box
  text-align: center

.column-days-left:hover
  background-color: $table-hover-row

.column-notify
  width: content-box
  text-align: center

.column-notify:hover
  background-color: $table-hover-row

.column-actions
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
