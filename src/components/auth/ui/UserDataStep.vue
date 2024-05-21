<template>
  <v-form ref="form">

    <div class="inputs">
      <v-text-field
        clearable
        label="Введите логин"
        variant="outlined"
        density="compact"
        type="text"
        v-model.trim="useAuthStore().user.username"
        :maxlength="50"
        :rules="[useAuthStore().rules.required]"
      ></v-text-field>

      <div>
        <v-text-field
          class="userFullName"
          clearable
          label="Введите имя"
          variant="outlined"
          density="compact"
          type="email"
          v-model.trim="useAuthStore().user.firstname"
          :maxlength="50"
          :rules="[useAuthStore().rules.required]"
        ></v-text-field>
        <v-text-field
          class="userFullName"
          clearable
          label="Введите фамилию"
          variant="outlined"
          density="compact"
          type="email"
          v-model.trim="useAuthStore().user.lastname"
          :maxlength="50"
          :rules="[useAuthStore().rules.required]"
        ></v-text-field>
      </div>

      <v-text-field
        clearable
        label="Введите электронную почту"
        variant="outlined"
        density="compact"
        type="email"
        v-model.trim="useAuthStore().user.email"
        :maxlength="50"
        :rules="[useAuthStore().rules.required, useAuthStore().rules.email]"
      ></v-text-field>
    </div>
  </v-form>
</template>

<script>
import {useAuthStore} from "@/components/auth/js/authStore";

export default {
  name: "UserDataStep",
  methods: {
    useAuthStore,
    async validate() {
      const {valid} = await this.$refs.form.validate()
      return valid
    },
  }
}
</script>

<style lang="sass" scoped>

.inputs
  display: block
  padding-top: 4%
  margin: 0 auto 5px
  width: 90%

.userFullName
  display: inline-block
  width: 50%

</style>
