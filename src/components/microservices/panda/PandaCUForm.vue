<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          clearable
          class="textField"
          v-model.trim="usePandaStore().unitToUpdate.name"
          label="Name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          clearable
          class="textField"
          v-model.trim="usePandaStore().unitToUpdate.mail"
          label="Mail"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="3">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().unitToUpdate.password"
          label="Password"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="1">
        <v-btn
        variant="plain"
        @click=""
        >New</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().unitToUpdate.account"
          label="Account"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().unitToUpdate.link"
          label="Link"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().unitToUpdate.password"
          label="Type"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().unitToUpdate.description"
          label="Description"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[]"
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
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import {useBirthdaysStore} from "@/components/microservices/events/birthdays/js/birthdayStore";


export default {
  name: "PandaCUForm",
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
    usePandaStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.usePandaStore().unitToUpdate.id === null) {
          usePandaStore().create();
        } else {
          usePandaStore().update();
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
@import '../../../assets/styles/main'

.textField
  align-content: center
.btn
  width: 40%

.btn-clear
  width: 20%
</style>
