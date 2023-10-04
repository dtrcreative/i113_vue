<template>
  <!--  <p>{{ selected }}</p>-->
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
      <th class="names">
        Last Name
      </th>
      <th class="dates" style="text-align: center">
        Date
      </th>
      <th class="dates" style="text-align: center">
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
      v-for="item in this.desserts"
      :key="item.name"
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
        ></v-switch>
      </td>
      <td class="btn">
        <v-btn icon="mdi mdi-pen"></v-btn>
      </td>
      <td class="btn">
        <v-btn icon="mdi mdi-trash-can"></v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: "EventTable",
  data() {
    return {
      selected: [],
      desserts: [
        {
          firstName: 'Dmitriy',
          lastName: 'Rogozhnikov',
          date: "19.08.2000",
          daysLeft: 10,
        },
        {
          firstName: 'JOJO',
          lastName: 'Binx',
          date: "19.08.2000",
          daysLeft: 10,
        },
        {
          firstName: 'Geralt',
          lastName: 'Rivia',
          date: "19.08.2000",
          daysLeft: 10,
        },
        {
          firstName: 'Kasper',
          lastName: 'Benington',
          date: "19.08.2000",
          daysLeft: 10,
        },
      ],
    }
  },
}
</script>

<style scoped>
.component {
  display: flex;
}

.table {
  background-color: rgba(0, 0, 0, 0);
}

.btn {

  width: 5%;
}

.dates {
  width: 10%
}

.names {
  width: 30%;
}

.notify {
  vertical-align: middle;
  text-align: center;
  width: 10%;
}
</style>
