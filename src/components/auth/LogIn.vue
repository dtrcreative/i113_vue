<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn
          class="btn"
          variant="outlined"
          v-bind="props">Log In
        </v-btn>
      </template>
      <v-card>



        <v-card-actions>
          <v-btn
            class="btn"
            variant="text"
            @click="closeDialog"
          >Close
          </v-btn>
          <v-btn
            class="btn"
            variant="text"
            @click="showDialog = false"
          >Log in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main.sass'
</style>
