<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="860">

      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi mdi-pen"
          v-bind="props"
        ></v-btn>
      </template>
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <span class="text-h5">Update Form</span>
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
                                :maxlength="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field clearable
                                v-model.trim="unit.lastName"
                                label="Last name"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :rules="[rules.required]"
                                required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field clearable
                                label="DD"
                                class="date"
                                type="number"
                                variant="outlined"
                                density="compact"
                                :maxlength="2"
                                :rules="[rules.required, rules.range.dayMin, rules.range.dayMax]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field clearable
                                label="MM"
                                class="date"
                                type="number"
                                variant="outlined"
                                density="compact"
                                :maxlength="2"
                                :rules="[rules.required, rules.range.monthMin, rules.range.monthMax]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="2" md="3">
                  <v-text-field clearable
                                label="YYYY"
                                class="date"
                                type="number"
                                variant="outlined"
                                density="compact"
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
                    v-model="unit.isNotify"
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
              variant="outlined"
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
  name: "UpdateBForm",
  emits: ["update"],
  data() {
    return {
      dialog: false,
      unit: {
        id: this.selectedUnit.id,
        firstName: this.selectedUnit.firstName,
        middleName: this.selectedUnit.middleName,
        lastName: this.selectedUnit.lastName,
        date: this.selectedUnit.date,
        description: this.selectedUnit.description,
        isNotify: this.selectedUnit.isNotify,
      },

      day: this.reFormatDate(this.selectedUnit.date, 0),
      month: this.reFormatDate(this.selectedUnit.date, 1),
      year: this.reFormatDate(this.selectedUnit.date, 2),

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
    }
  },

  props: {
    selectedUnit: {
      type: Object,
    }
  },

  methods: {
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.clearAndClose();
        this.unit.date = this.formatDate();
        this.$emit('update', this.unit);
      }
    },
    clearAndClose() {
      this.dialog = false;
      this.$refs.form.resetValidation()
    },
    formatDate() {
      return this.day + '-' + this.month + '-' + this.year;
    },
    reFormatDate(fullDate, numberOfValueInside) {
      const mass = fullDate.split("-");
      let result = mass[numberOfValueInside];
      return parseInt(result);
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

.btn-close
  width: 100px

.btn-save
  width: 150px
</style>
