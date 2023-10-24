<template>
    <v-dialog v-model="dialog" max-width="860">
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-plus"
          variant="tonal"
          v-bind="props"
          min-width="50px"
        ></v-btn>
      </template>
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <h1>Create Form</h1>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.firstName"
                                label="First name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                :maxlength="15"
                                :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.middleName"
                                label="Middle name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                :maxlength="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.lastName"
                                label="Last name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                :maxlength="15"
                                :rules="[rules.required]"
                                required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2">
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
                <v-col cols="12" sm="2" md="2">
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

                <v-col cols="12" sm="2" md="3">
                  <v-text-field label="YYYY"
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

                <v-col cols="12" sm="3" md="4">
                  <v-switch
                    style="display: flex; justify-content: center;"
                    color="primary"
                    density="default"
                    label="Notify Me"
                    v-model="unit.notify"
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="3" md="12">
                  <v-text-field clearable
                                v-model.trim="unit.description"
                                label="Description"
                                variant="outlined"
                                density="compact"
                                :maxlength="250"
                                required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="btn-close"
              color="primary"
              variant="outlined"
              @click="clearAndClose"
            >
              Close
            </v-btn>
            <v-btn
              class="btn-save"
              color="primary"
              variant="elevated"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
</template>

<script>

import {useBirthdaysStore} from "@/components/microservices/events/store/birthdayStore";

export default {
  name: "BirthdayAddForm",
  data: () => ({
    dialog: false,
    unit: {
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      date: '',
      description: '',
      notify: true,
    },

    day: '',
    month: '',
    year: '',

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
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.unit.date = this.formatDate();
        // this.$emit('create', this.unit);
        useBirthdaysStore().create(this.unit);
        this.clearAndClose();
      }
    },
    clearAndClose() {
      this.dialog = false;
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    formatDate() {
      return this.year + '-' + this.month + '-' + this.day;
    },

    regex(value){
      const regex = /^\d+/;
      return value.match(regex);
    }
  },
}

</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.date
  max-width: 200px

.create
  display: flex
  justify-content: center

.btn-close
  width: 100px

.btn-save
  width: 150px

</style>
