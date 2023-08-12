<template>
  <div class="signIn">
    <v-dialog v-model="dialog" width="auto" class="dialog">
      <template v-slot:activator="{ props }">
        <v-btn
          class="btn"
          v-bind="props">Sign In
        </v-btn>
      </template>
      <v-form ref="form">
        <v-card
          class="mx-auto"
          max-width="500"
          title="User Registration"
          prepend-icon="mdi mdi-account-key"
        >
          <v-card-text class="signIn">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model="firstName"
                                label="First name*"
                                variant="outlined"
                                density="compact"
                                :rules="[rules.required]"
                                :maxlength="15"
                                :counter="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model="middleName"
                                label="Middle name"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :counter="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model="accountName"
                                label="AccountName*"
                                variant="outlined"
                                density="compact"
                                :rules="[rules.required]"
                                :maxlength="25"
                                :counter="25"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field clearable
                                v-model="lastName"
                                label="Last name"
                                variant="outlined"
                                density="compact"
                                :maxlength="20"
                                :counter="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field clearable
                                v-model="email"
                                label="Email*"
                                variant="outlined"
                                prepend-inner-icon="mdi-email-outline"
                                density="compact"
                                :rules="[rules.required, rules.email]"
                                :maxlength="40"
                                :counter="40"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field clearable
                                v-model="password"
                                label="Password*"
                                variant="outlined"
                                prepend-icon="mdi-lock-outline"
                                density="compact"
                                :color="password ? 'primary' : undefined"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.lengths.passwordMin, rules.lengths.passwordMax]"
                                :type="showPassword ? 'text' : 'password'"
                                :maxlength="30"
                                :counter="30"
                                @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field clearable
                                v-model="confirmPassword"
                                label="Confirm password*"
                                variant="outlined"
                                prepend-icon="mdi-lock-outline"
                                density="compact"
                                :color="confirmPassword ? 'primary' : undefined"
                                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.passwordMissmatch]"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                :maxlength="30"
                                :counter="30"
                                @click:append="showConfirmPassword = !showConfirmPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!dialog"
              :loading="loading"
              block @click="onSubmit"
              size="large"
              variant="outlined"
            >
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      dialog: false,
      loading: false,

      showPassword: false,
      showConfirmPassword: false,

      rules: {
        required: value => !!value || 'Field is required',
        passwordMissmatch: value => value === this.password || "Passwords missmatch",
        lengths: {
          passwordMin: value => value.length > 3 || 'Password is too short',
          passwordMax: value => value.length <= 25 || 'Password is too long',
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },

      firstName: '',
      middleName: '',
      lastName: '',
      accountName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    async onSubmit() {
      const {valid} = await this.$refs.form.validate()
      if (valid) {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        this.clear();
        this.closeDialog();
      }

    },
    clear() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    async validate() {
      /*TODO :
         -Loading while waiting request
         -Some place to error responce
      */
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main.sass'

.signIn
  background: url('../src/assets/img/gradient-1.jpg')

.dialog
  border-radius: 10px
</style>
