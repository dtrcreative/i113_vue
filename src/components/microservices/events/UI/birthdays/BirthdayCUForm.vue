<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          clearable
          v-model.trim="useBirthdaysStore().unitToUpdate.firstName"
          label="First name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          clearable
          v-model.trim="useBirthdaysStore().unitToUpdate.lastName"
          label="Last name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <v-text-field
          label="DD"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="day"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <v-text-field
          label="MM"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="month"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="YYYY"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="year"
          hide-details
          :maxlength="4"
          :rules="[rules.required, rules.range.yearMin]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8" md="10">
        <v-text-field
          clearable
          v-model.trim="useBirthdaysStore().unitToUpdate.description"
          label="Description"
          variant="outlined"
          density="compact"
          :maxlength="250"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="default"
          label="Notify Me"
          v-model="useBirthdaysStore().unitToUpdate.notify"
        ></v-switch>
      </v-col>
    </v-row>
    <v-btn
      class="btn-close"
      color="primary"
      variant="elevated"
      @click="clearAndClose"
    >Close
    </v-btn>
    <v-btn
      class="btn-clear"
      color="primary"
      variant="outlined"
      @click="clear"
    >Clear
    </v-btn>

    <v-btn
      class="btn-save"
      color="primary"
      variant="elevated"
      type="submit"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script>
import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";


export default {
  name: "BirthdayCUForm",
  data: () => ({

    rules: {
      required: value => !!value || 'Required',
      range: {
        dayMin: value => value > 0 || 'Sure?',
        dayMax: value => value < 32 || 'Sure?',

        monthMin: value => value > 0 || 'Sure?',
        monthMax: value => value <= 12 || 'Sure?',

        yearMin: value => value >= 1900 || 'Too Early',
      },
    },
  }),

  methods: {
    useBirthdaysStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.unit.date = this.formatDate();
        if (this.unit.id !== "") {
          console.log("unit dont has id" + this.unit.id)
        } else {
          console.log("unit have id")
        }
        useBirthdaysStore().create(this.unit);
        this.clearAndClose();
      }
    },
    clear() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    clearAndClose() {
      this.clear();
      useBirthdaysStore().showCUForm = false
    },
    formatDate() {
      return this.year + '-' + this.month + '-' + this.day;
    },
    regex(value) {
      const regex = /^\d+/;
      return value.match(regex);
    },
  },

  computed: {
    day() {
      return useBirthdaysStore().unitToUpdate.date !== '' ? new Date(useBirthdaysStore().unitToUpdate.date).getDate() : ''
    },
    month() {
      return useBirthdaysStore().unitToUpdate.date !== '' ? new Date(useBirthdaysStore().unitToUpdate.date).getMonth() + 1 : ''
    },
    year() {
      return useBirthdaysStore().unitToUpdate.date !== '' ? new Date(useBirthdaysStore().unitToUpdate.date).getFullYear() : ''
    }
  }

}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.btn-close
  width: 40%

.btn-clear
  width: 20%

.btn-save
  width: 40%


</style>
