<template>
  <div class="log-in">
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      width="400"
      class="dialog">
      <template v-slot:activator="{ props }">
        <v-btn
          class="btn"
          v-bind="props"
          variant="outlined"
        >Log In
        </v-btn>
      </template>
      <v-form ref="form" @submit.prevent="submit">

        <v-card
          class="mx-auto"
          title="Log in user"
          prepend-icon="mdi-account-key"
        >
          <v-card-text class="log-in">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field clearable
                                v-model="user.userName"
                                label="AccountName*"
                                variant="outlined"
                                density="compact"
                                :rules="[rules.required]"
                                :maxlength="25"
                                :counter="25"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field clearable
                                v-model="user.password"
                                label="Password*"
                                variant="outlined"
                                density="compact"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.lengths.passwordMin, rules.lengths.passwordMax]"
                                :type="showPassword ? 'text' : 'password'"
                                :maxlength="30"
                                :counter="30"
                                @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-actions>
            <v-btn
              :disabled="!dialog"
              :loading="loading"
              class="mt-2"
              type="submit"
              block
              size="large"
              variant="outlined"
            >
              Sign In
            </v-btn>
          </v-card-actions>
          <v-card-text class="info" v-if="errorCode">
            <v-card-title>{{ errorCode }}</v-card-title>
            <v-card-subtitle>{{ errorMessage }}</v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "LogIn",
  data() {
    return {
      dialog: false,


      errorCode: '',
      errorMessage: '',

      showPassword: false,

      rules: {
        required: value => !!value || 'Field is required',
        passwordMissmatch: value => value === this.password || "Passwords missmatch",
        lengths: {
          passwordMin: value => value.length > 3 || 'Password is too short',
          passwordMax: value => value.length <= 25 || 'Password is too long',
        },
      },

      user: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
    async submit() {
      this.clearError()
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.loading = true

        if (this.register()) {
          this.clear();
          this.closeDialog();
        }
      }
    },
    clear() {
      this.clearError()
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    clearError() {
      this.errorHandler('', '')
    },
    closeDialog() {
      this.dialog = false;
    },
    errorHandler(errorCode, errorMessage) {
      this.errorCode = errorCode;
      this.errorMessage = errorMessage;
    }
  }
}
</script>

<style lang="sass" scoped>

.log-in
  background: url('../src/assets/img/gradient-2.jpg')

.dialog
  border-radius: 10px


</style>
