<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" sm="3" md="4">
        <v-text-field
          clearable
          v-model.trim="useLangStore().paramToUpdate.param"
          label="ParamName"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="4">
        <v-text-field
          label="Eng"
          variant="outlined"
          density="compact"
          v-model="useLangStore().paramToUpdate.eng"
          hide-details
          :maxlength="200"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="4">
        <v-text-field
          label="Rus"
          variant="outlined"
          density="compact"
          v-model="useLangStore().paramToUpdate.rus"
          hide-details
          :maxlength="200"
        ></v-text-field>
      </v-col>
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

  </v-form>
</template>

<script>
import {useLangStore} from "@/components/settings/language/js/languageStore";
export default {
  name: "LanguageCUForm",
  data: () => ({
    rules: {
      required: value => !!value || 'Required',
    },
  }),
  methods:{
    useLangStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.useLangStore().paramToUpdate.id === null) {
          useLangStore().create();
        } else {
          useLangStore().update();
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
      useLangStore().showCUForm = false
    },
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/styles/main'

.btn
  width: 40%
.btn-clear
  width: 20%

</style>
