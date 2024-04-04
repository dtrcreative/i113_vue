<template>
  <v-card variant="tonal" class="card">
    <v-card-title>Telegram</v-card-title>
    <v-card-actions v-if="user.userStatus === 'UNDEFINED'">
      <v-btn
        @click="register">
        Register
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else>
      <v-btn
        variant="tonal"
        @click="status"
        density="comfortable"
        icon="mdi-update"
        class="btn"
      >
      </v-btn>
      <v-text-field
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-model.trim="this.user.userSecretKey"
        variant="outlined"
        density="compact"
        hide-details
        label="SecretKey"
        class="textfield"
        :readonly="true"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        v-model.trim="this.bot.name"
        variant="plain"
        density="compact"
        hide-details
        label="Bot name"
        class="textfield"
        :readonly="true"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        v-model.trim="this.user.userStatus"
        variant="plain"
        density="compact"
        hide-details
        label="User Status"
        class="textfield"
        :readonly="true"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <v-btn v-if="!isUserDisabled()"
             text="Disable bot for me"
             variant="tonal"
             @click="showDialog=true"
      ></v-btn>

      <v-btn v-else
             text="Enable bot for me"
             variant="tonal"
             @click="showDialog=true"
      ></v-btn>

      <v-dialog
        max-width="500"
        v-model="showDialog"
      >
        <v-card title="Elli-bot disable confirmation">
          <v-card-text>
            Please confirm deactivation of the bot.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancel"
              @click="showDialog=false"
            ></v-btn>
            <v-btn v-if="isUserDisabled()"
                   text="Enable"
                   @click=enable
            ></v-btn>
            <v-btn v-else
                   text="Disable"
                   @click=disable
            ></v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
    </v-card-actions>
    <v-card-item>
    </v-card-item>
  </v-card>

</template>

<script>
import telegramService from "@/components/settings/sheduling/telegram/js/telegram.service";

export default {
  name: "TelegramSettingsView",
  data: () => ({
    user: {},
    showPassword: false,
    showDialog: false,
    bot:{
      name: '@i113_assistant_bot',
      link: 'https://t.me/i113_assistant_bot'
    }
  }),
  methods: {
    async register() {
      let response = await telegramService.register();
      this.user = response.data
    },
    async status() {
      let response = await telegramService.status();
      this.user = response.data
    },
    async enable() {
      console.log('enable')
      let response = await telegramService.enable();
      this.user = response.data
      this.showDialog = false;
    },
    async disable() {
      console.log('disable')
      let response = await telegramService.disable();
      this.user = response.data
      this.showDialog = false;
    },
    isUserDisabled(){
      return this.user.userStatus==='DISABLED'
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
.card
  border-radius: 15px

.textfield
  margin-right: 15px
  margin-left: 15px
  max-width: 200px

.btn
  margin-left: 15px
  margin-right: 15px

.btn-disable
  float: right
</style>
