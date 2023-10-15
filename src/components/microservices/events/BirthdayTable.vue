<template>
  <v-table density="compact" class="table">
    <thead>
    <tr>
      <!--      TODO AllSelections    -->
      <th class="btn">
        <v-btn
          size="small"
          icon="mdi mdi-select-all"
          variant="text"
        ></v-btn>
      </th>

      <th class="names">
        First Name
      </th>
      <th class="names"
          @click="sortByName"
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
      <th class="btn">
        Delete
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in this.units"
      :key="item.id"
    >
      <td class="btn">
        <v-checkbox
          style="display: flex; justify-content: center;"
          v-model="selected"
          label=""
          :value=item.firstName
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
      <td class="btn">
        <v-btn
          icon="mdi mdi-trash-can"
          @click=remove(item.id)
        ></v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>

  <AddBForm
    class="create"
    @create="add"
  ></AddBForm>

</template>

<script>
import AddBForm from "@/components/microservices/events/UI/AddBForm";
import UpdateBForm from "@/components/microservices/events/UI/UpdateBForm";
import birthdayService from "@/components/microservices/events/js/birthday.service";
export default {
  name: "EventTable",
  components: {UpdateBForm, AddBForm},
  data() {
    return {
      selected: [],
      isHovering: false,
      units: ""
    }
  },
  methods: {
    sortByName() {
      console.log("Sort")
    },
    add(unit) {
      birthdayService.createBirthday(unit).then(
        (response) => {
          if(response.status === 200){
            this.units.push(response.data)
          }
        }
      )
    },
    update(unit) {
      birthdayService.updateBirthday(unit).then(
        (response) => {
          if(response.status === 200){
            this.getData()
          }
        }
      )
    },
    remove(id) {
      birthdayService.removeBirthday(id).then(
        (response) => {
          if(response.status === 200){
            this.units = this.units.filter(p => p.id !== id)
          }
        }
      )
    },

    async getData(){
      birthdayService.getBirthdays().then(
        (response) => {
          if(response !== undefined){
            this.units = response;
          }
        }
      )
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'
component
  display: flex

.table
  background-color: rgba(0, 0, 0, 0)

.btn
  width: 5%

.days-left
  width: 5%

.date
  width: 10%

.names
  width: 20%

.names:hover
  width: 20%
  background-color: $table-hover-cell

.names:hover
  width: 20%

.create
  display: flex
  justify-content: center

.notify
  vertical-align: middle
  text-align: center
  width: 10%

tr:hover
  background-color: $table-hover-row

</style>
