<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-text-field
          clearable
          v-model.trim="useBirthdayStore().updateUnit.firstName"
          label="First name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          clearable
          v-model.trim="useBirthdayStore().updateUnit.lastName"
          label="Last name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          hide-details
          label="DD"
          variant="outlined"
          density="compact"
          :maxlength="2"
          v-model="useBirthdayStore().updateUnit.date.day"
          :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
        ></v-text-field>
        <v-text-field
          hide-details
          label="MM"
          variant="outlined"
          density="compact"
          :maxlength="2"
          v-model="useBirthdayStore().updateUnit.date.month"
          :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
        ></v-text-field>
        <v-text-field
          hide-details
          label="YYYY"
          variant="outlined"
          density="compact"
          :maxlength="4"
          v-model="useBirthdayStore().updateUnit.date.year"
          :rules="[rules.required, rules.range.yearMin]"
        ></v-text-field>

        <v-switch
          style="display: flex; justify-content: center;"
          color="primary"
          density="default"
          label="Shedule"
          v-model="useBirthdayStore().updateUnit.notify"
        ></v-switch>

      </v-row>
      <v-row>
        <v-text-field
          clearable
          label="Description"
          variant="outlined"
          density="compact"
          :maxlength="250"
          v-model.trim="useBirthdayStore().updateUnit.description"
        ></v-text-field>
      </v-row>
      <v-row>
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
    </v-container>
  </v-form>
</template>

<script>
import {useBirthdayStore} from "@/components/microservices/events/bithdays/js/birthdayStore";

export default {
  name: "BirthdayCUForm",
  components: {},

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
    useBirthdayStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.useBirthdayStore().updateUnit.id === null) {
          useBirthdayStore().create();
        } else {
          useBirthdayStore().update();
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
      useBirthdayStore().showCUForm = false
    },
    regex(value) {
      const regex = /^\d+/;
      return value.match(regex);
    },
  }
}
</script>

<style lang="sass" scoped>

.v-text-field
  padding-top: 5px

.v-text-field:hover
  color: #00b0ff

.btn
  width: 40%
  @media (max-width: 450px)
    width: 35%

.btn-clear
  width: 20%

</style>
