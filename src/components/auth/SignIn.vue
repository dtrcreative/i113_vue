<template>
  <div class="signIn">
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      width="500"
      class="dialog">
      <template v-slot:activator="{ props }">
        <v-btn
          class="btn"
          v-bind="props">Sign In
        </v-btn>
      </template>
      <v-form ref="form" @submit.prevent="submit">
        <v-card
          class="mx-auto"
          title="User Registration"
          prepend-icon="mdi-account-key"
        >
          <v-card-text class="signIn">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field clearable
                                v-model="user.firstName"
                                label="First name*"
                                variant="outlined"
                                density="compact"
                                :rules="[rules.required]"
                                :maxlength="15"
                                :counter="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field clearable
                                v-model="user.middleName"
                                label="Middle name"
                                variant="outlined"
                                density="compact"
                                :maxlength="15"
                                :counter="15"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field clearable
                                v-model="user.userName"
                                label="UserName*"
                                variant="outlined"
                                density="compact"
                                :rules="[rules.required]"
                                :maxlength="25"
                                :counter="25"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field clearable
                                v-model="user.lastName"
                                label="Last name"
                                variant="outlined"
                                density="compact"
                                :maxlength="20"
                                :counter="20"
                  ></v-text-field>
                </v-col>
                <v-row>
                </v-row>
                <v-col cols="12">
                  <v-text-field clearable
                                v-model="user.email"
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
                                v-model="user.password"
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
                                v-model="user.confirmPassword"
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
          </v-card-text>

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
  name: "SignIn",
  data() {
    return {
      dialog: false,
      loading: false,

      showPassword: false,
      showConfirmPassword: false,

      errorCode: '',
      errorMessage: '',

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
      user:{
        firstName: '',
        middleName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
    register() {
      //TODO : request to server
      const errorExist = false
      setTimeout(() => {
        (this.loading = false)
        if (errorExist) {
          this.errorHandler('404', 'Page not found')
        }

      }, 3000)
      return !errorExist;
    },
    clear() {
      this.clearError()
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    clearError(){
      this.errorHandler('','')
    },
    errorHandler(errorCode, errorMessage) {
      this.errorCode = errorCode;
      this.errorMessage = errorMessage;
    },
    closeDialog() {
      this.dialog = false;
    },
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main.sass'

.signIn
  background: url('../src/assets/img/gradient-1.jpg')

.dialog
  border-radius: 10px

.info
  background: url('../src/assets/img/gradient-1.jpg')
  text-align: center
  border: solid
  border-radius: 5px
  border-color: #8d0202
</style>
