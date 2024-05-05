<template>
  <v-card variant="tonal">
    <v-card-title>
      Telegram Settings
    </v-card-title>
    <v-container v-if="user.userStatus === 'UNDEFINED'">
      <v-btn
        @click="register">
        Register
      </v-btn>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-btn
          variant="tonal"
          @click="status"
          density="comfortable"
          icon="mdi-update"
        ></v-btn>
        <v-text-field
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          v-model.trim="this.user.userSecretKey"
          variant="outlined"
          density="compact"
          hide-details
          label="SecretKey"
          :readonly="true"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model.trim="this.bot.name"
          variant="plain"
          density="compact"
          hide-details
          label="Bot name"
          :readonly="true"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model.trim="this.user.userStatus"
          variant="plain"
          density="compact"
          hide-details
          label="User Status"
          :readonly="true"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <div class="btn-control">
          <v-btn v-if="!isUserDisabled()"
                 text="Disable Shedule"
                 variant="tonal"
                 color="warning"
                 @click="showDialog=true"
          ></v-btn>
          <v-btn v-else
                 text="Enable Shedule"
                 variant="tonal"
                 color="primary"
                 @click="showDialog=true"
          ></v-btn>
        </div>
      </v-row>
    </v-container>
    <v-dialog
      max-width="500"
      v-model="showDialog"
    >
      <v-card>
        <v-card-title class="dialog-title">
          <v-icon class="icon" size="30px" icon="mdi-alert" color="orange"></v-icon>
          <h1>{{ "Telegram-bot disable confirmation" }}</h1>
        </v-card-title>

        <v-card-text class="dialog-text">
          {{"Are you sure you want to disable telegram bot notifications?"}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Cancel"
            @click="showDialog=false"
          ></v-btn>
          <v-btn v-if="isUserDisabled()"
                 text="Enable"
                 color="primary"
                 @click=enable
          ></v-btn>
          <v-btn v-else
                 text="Disable"
                 color="warning"
                 @click=disable
          ></v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-card>

</template>

<script>
import telegramService from "@/components/settings/sheduling/telegram/js/telegram.service";

export default {
  name: "TelegramSettings",
  data: () => ({
    user: {},
    showPassword: false,
    showDialog: false,
    bot: {
      name: '@i113_assistant_bot',
      link: 'https://t.me/i113_assistant_bot'
    }
  }),
  methods: {
    async register() {
      let response = await telegramService.register();
      this.setUserData(response)
    },
    async status() {
      let response = await telegramService.status();
      this.setUserData(response)
    },
    async enable() {
      let response = await telegramService.enable();
      this.setUserData(response)
      this.showDialog = false;
    },
    async disable() {
      let response = await telegramService.disable();
      this.setUserData(response)
      this.showDialog = false;
    },
    isUserDisabled() {
      return this.user.userStatus === 'DISABLED'
    },
    setUserData(response) {
      if (response !== undefined) {
        this.user = response.data
      }
    }
  },
  mounted() {
    this.status()
  },

  computed: {
    userSecretKey() {
      return this.user.userSecretKey;
    }
  }
}
</script>

<style lang="sass" scoped>

.v-text-field
  padding: 10px 10px 10px 10px
  width: 200px

.v-btn
  width: content-box
  margin: auto auto auto auto

.btn-control
  margin: auto auto auto auto

.v-card
  border-radius: 15px

.v-card-title
  margin-left: 15px

.dialog-title
  display: flex
  width: 100%
  background-color: rgb(var(--v-theme-background),0.8)
  margin: auto auto auto auto

.dialog-text
  text-align: center

.icon
  margin-right: 15px

</style>
