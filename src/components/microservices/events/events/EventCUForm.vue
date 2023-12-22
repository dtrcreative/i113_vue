<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" sm="3" md="6">
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
      <v-col cols="12" sm="3" md="2">
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
      <v-col cols="12" sm="3" md="2">
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
      <v-col cols="12" sm="6" md="2">
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
    <v-row>
      <v-col cols="12" sm="8" md="10">
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
      <v-col cols="12" sm="3" md="2">
        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="default"
          label="Notify Me"
          v-model="useEventsStore().unitToUpdate.notify"
        ></v-switch>
      </v-col>
    </v-row>
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

  methods:{
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
@import '../../../../assets/styles/main'

.btn
  width: 40%
.btn-clear
  width: 20%

</style>
