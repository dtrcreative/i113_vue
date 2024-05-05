<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-text-field
          clearable
          v-model.trim="useLangsStore().updateUnit.param"
          label="ParamName"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Eng"
          variant="outlined"
          density="compact"
          v-model="useLangsStore().updateUnit.eng"
          hide-details
          :maxlength="200"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          label="Rus"
          variant="outlined"
          density="compact"
          v-model="useLangsStore().updateUnit.rus"
          hide-details
          :maxlength="200"
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
import {useLangsStore} from "@/components/settings/languages/js/languagesStore";

export default {
  name: "LanguagesCUForm",
  data: () => ({
    rules: {
      required: value => !!value || 'Required',
    },
  }),
  methods: {
    useLangsStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.useLangsStore().updateUnit.id === null) {
          useLangsStore().create();
        } else {
          useLangsStore().update();
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
      useLangsStore().showCUForm = false
    },
  }
}
</script>

<style lang="sass" scoped>

.v-text-field
  padding-bottom: 10px

.btn
  width: 40%

.btn-clear
  width: 20%
</style>
