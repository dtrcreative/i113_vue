<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="6" sm="6" md="6">
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
      <v-col xs="6" sm="6" md="6">
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
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="2" sm="2" md="2">
        <v-text-field
          label="DD"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useBirthdaysStore().unitToUpdate.date.day"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
        ></v-text-field>
      </v-col>
      <v-col xs="2" sm="2" md="2">
        <v-text-field
          label="MM"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useBirthdaysStore().unitToUpdate.date.month"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
        ></v-text-field>
      </v-col>
      <v-col xs="4" sm="4" md="4">
        <v-text-field
          label="YYYY"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useBirthdaysStore().unitToUpdate.date.year"
          hide-details
          :maxlength="4"
          :rules="[rules.required, rules.range.yearMin]"
        ></v-text-field>
      </v-col>
      <v-col xs="3" sm="3" md="3">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="default"
          label="Notify Me"
          v-model="useBirthdaysStore().unitToUpdate.notify"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="12" sm="12" md="12">
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
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-btn
        class="btn"
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
        class="btn"
        color="primary"
        variant="elevated"
        type="submit"
      >Save
      </v-btn>
    </v-row>

  </v-form>
</template>

<script>
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";

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
        if (this.useBirthdaysStore().unitToUpdate.id === null) {
          useBirthdaysStore().create();
        } else {
          useBirthdaysStore().update();
        }
        this.clearAndClose();
      }
    },
    clear() {
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
    },
    clearAndClose() {
      this.$refs.form.resetValidation()
      useBirthdaysStore().showCUForm = false
    },
    regex(value) {
      const regex = /^\d+/;
      return value.match(regex);
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../../../../assets/styles/main'

.btn
  width: 40%
.btn-clear
  width: 20%

</style>
