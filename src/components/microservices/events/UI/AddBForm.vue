<template>

  <v-row justify="center">
    <v-dialog v-model="dialog">

      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-plus"
          variant="text"
          size="small"
          v-bind="props"
        ></v-btn>
      </template>
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <span class="text-h5">Create Form</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.firstName"
                                label="First name*"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.middleName"
                                label="Middle name"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :rules="[rules.required]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.lastName"
                                label="Last name*"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :rules="[rules.required]"
                                required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>

                <v-col cols="12" sm="6" md="2">
                  <v-text-field clearable
                                label="Day*"
                                class="date"
                                variant="outlined"
                                density="compact"
                                :maxlength="2"
                                :rules="[rules.required, rules.isNumber, rules.range.dayMin, rules.range.dayMax]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                  <v-text-field clearable
                                label="Month*"
                                class="date"
                                variant="outlined"
                                density="compact"
                                :maxlength="2"
                                :rules="[rules.required, rules.isNumber, rules.range.monthMin, rules.range.monthMax]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                label="Year*"
                                class="date"
                                variant="outlined"
                                density="compact"
                                :maxlength="4"
                                :rules="[rules.required, rules.isNumber, rules.range.yearMin]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-switch
                    style="display: flex; justify-content: center;"
                    color="primary"
                    density="default"
                    label="Notify Me"
                    v-model="unit.isNotify"
                  ></v-switch>
                </v-col>

              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="clearAndClose"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: "AddForm",
  data: () => ({
    dialog: false,
    unit: {
      firstName: '',
      middleName: '',
      lastName: '',
      day: '',
      month: '',
      year: '',
      notify: '',
      description: '',
      isNotify: true,
    },

    rules: {
      required: value => !!value || 'Required',
      range: {
        dayMin: value => value > 0 || 'Seriously?',
        dayMax: value => value < 32 || 'Seriously?',

        monthMin: value => value > 0 || 'Seriously?',
        monthMax: value => value <= 12 || 'Seriously?',

        yearMin: value => value >= 1900 || 'Too Early',
      },
      isNumber: value => value.match(/^\d+/) || 'Number Only',
    },

  }),
  methods: {
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.clearAndClose();
      }
    },
    clearAndClose() {
      this.dialog = false;
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    formatDate() {
      return this.day + '-' + this.month + '-' + this.year;
    },
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

</style>
