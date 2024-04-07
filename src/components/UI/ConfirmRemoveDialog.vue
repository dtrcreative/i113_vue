<template>
  <v-dialog
    max-width="500"
    v-model="store.showConfirmDialog"
  >
    <v-card
      title="Deletion confirmation"
      prepend-icon="mdi-alert"
    >
      <v-card-text>
        Please confirm deletion of selected items.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Cancel"
          @click="store.showConfirmDialog=false"
        ></v-btn>
        <v-btn
          text="Remove"
          @click=remove
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmRemoveDialog",
  props: {
    store: {
      type: Object,
      required: true
    },
  },
  methods: {
    remove() {
      this.store.removeSelected()
      this.store.showConfirmDialog = false
    }
  }
}
</script>

<style scoped>

</style>
