<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="12" sm="12" md="12">
        <v-text-field
          clearable
          v-model.trim="useEventsStore().unitToUpdate.eventName"
          label="Event Name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="3" sm="3" md="3">
        <v-text-field
          label="DD"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useEventsStore().unitToUpdate.date.day"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
        ></v-text-field>
      </v-col>
      <v-col xs="3" sm="3" md="3">
        <v-text-field
          label="MM"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useEventsStore().unitToUpdate.date.month"
          hide-details
          :maxlength="2"
          :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
        ></v-text-field>
      </v-col>
      <v-col xs="6" sm="6" md="6">
        <v-text-field
          label="YYYY"
          class="date"
          type="number"
          variant="outlined"
          density="compact"
          v-model="useEventsStore().unitToUpdate.date.year"
          hide-details
          :maxlength="4"
          :rules="[rules.required, rules.range.yearMin]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="8" sm="8" md="8">
        <v-text-field
          clearable
          v-model.trim="useEventsStore().unitToUpdate.description"
          label="Description"
          variant="outlined"
          density="compact"
          :maxlength="250"
          required
        ></v-text-field>
      </v-col>
      <v-col xs="4" sm="4" md="4">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="default"
          label="Notify Me"
          v-model="useEventsStore().unitToUpdate.notify"
        ></v-switch>
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
import {useEventsStore} from "@/components/microservices/events/events/js/eventsStore";

export default {
  name: "EventCUForm",
  data: () => ({
    rules: {
      required: value => !!value || 'Required',
      range: {
        dayMin: value => value > 0 || 'Sure?',
        dayMax: value => value < 32 || 'Sure?',

        monthMin: value => value > 0 || 'Sure?',
        monthMax: value => value <= 12 || 'Sure?',

        yearMin: value => value >= new Date().getFullYear() || 'Too Early',
      },
    },
  }),

  methods: {
    useEventsStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.useEventsStore().unitToUpdate.id === null) {
          useEventsStore().create();
        } else {
          useEventsStore().update();
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
      useEventsStore().showCUForm = false
    },
    regex(value) {
      const regex = /^\d+/;
      return value.match(regex);
    },
  }
}
</script>

<style lang="sass" scoped>

.btn
  width: 40%

.btn-clear
  width: 20%

</style>
