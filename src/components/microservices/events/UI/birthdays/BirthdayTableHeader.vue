<template>
    <v-card-actions>
      <v-row>
        <v-col cols="12" sm="1" md="1">
          <v-btn
            icon="mdi-plus"
            @click="show = !show"
          ></v-btn>
        </v-col>
        <v-col cols="12" sm="10" md="10">
          <v-text-field clearable
                        class="searchField"
                        v-model.trim="searchValue"
                        label="Search"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-magnify"
                        hide-details
                        :maxlength="10"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1" md="1">
          <v-btn
            icon="mdi mdi-trash-can"
            min-width="50px"
            @click=useBirthdaysStore().removeSelected()
          ></v-btn>
        </v-col>
      </v-row>

    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
         <birthday-c-u-form
         @hide="hide"
         ></birthday-c-u-form>
      </div>
    </v-expand-transition>
</template>

<script>

import BirthdayCUForm from "@/components/microservices/events/UI/birthdays/BirthdayCUForm";
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";
useBirthdaysStore()
export default {
  name: "birthdayTableHeader",
  components: {BirthdayCUForm},
  data: () => ({
    show: false,
    searchValue: ""
  }),
  methods: {
    async submit() {},

    hide(){
      this.show=!this.show;
    }
  }
}
</script>

<style scoped>

</style>
