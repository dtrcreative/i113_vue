<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="1" sm="4" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.name"
          label="Name"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="15"
          :rules="[rules.required, rules.range.nameMin]"
        ></v-text-field>
      </v-col>
      <v-col xs="1" sm="4" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.mail"
          label="Mail"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="30"
        ></v-text-field>
      </v-col>
      <v-col xs="1" sm="4" md="4">
        <!--TODO-->
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.password"
          label="Password"
          variant="outlined"
          density="compact"
          hide-details
          :append-inner-icon="'mdi-refresh'"
          @click:append-inner="generatePassword"
          :maxlength="25"
          :rules="[rules.required, rules.range.passwordMin]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="1" sm="4" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.account"
          label="Account"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="30"
          :rules="[rules.required, rules.range.accountMin]"
        ></v-text-field>
      </v-col>
      <v-col xs="1" sm="4" md="4">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.link"
          label="Link"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="200"
        ></v-text-field>
      </v-col>
      <v-col xs="1" sm="4" md="4">
        <v-select
          label="Type"
          :items="usePandaStore().types"
          v-model="usePandaStore().updateUnit.type"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="1" sm="12" md="12">
        <v-text-field
          clearable
          v-model.trim="usePandaStore().updateUnit.description"
          label="Description"
          variant="outlined"
          density="compact"
          hide-details
          :maxlength="200"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 50px;" no-gutters>
      <v-col xs="1" sm="5" md="5">
        <v-btn
          class="btn"
          color="primary"
          variant="elevated"
          @click="clearAndClose"
        >Close
        </v-btn>
      </v-col>
      <v-col xs="1" sm="2" md="2">
        <v-btn
          class="btn"
          color="primary"
          variant="outlined"
          @click="clear"
        >Clear
        </v-btn>
      </v-col>
      <v-col xs="1" sm="5" md="5">
        <v-btn
          class="btn"
          color="primary"
          variant="elevated"
          type="submit"
        >Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {usePandaStore} from "@/components/microservices/panda/js/pandaStore";
import pandaService from "@/components/microservices/panda/js/panda.service";

export default {
  name: "PandaCUForm",
  data: () => ({
    rules: {
      required: value => !!value || 'Required',
      range: {
        nameMin: value => value.length > 3 || 'Too short',
        accountMin: value => value.length > 3 || 'Too short',
        passwordMin: value => value.length > 3 || 'Too short',
      },
    },
  }),
  methods: {
    usePandaStore,
    async submit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        if (this.usePandaStore().updateUnit.id === null) {
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
      usePandaStore().showCUForm = false
    },
    generatePassword() {
      pandaService.generatePassword()
    }
  }

}
</script>

<style lang="sass" scoped>
.btn
  width: 100%

.btn-update
  width: 100%
</style>
