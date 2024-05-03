<template>
  <v-dialog
    max-width="500"
    v-model="store.showConfirmDialog"
  >
    <v-card>
      <v-card-title>
        <v-icon icon="mdi-alert" color="orange"></v-icon>
        <h1>{{ title }}</h1>
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          text="Cancel"
          @click="store.showConfirmDialog=false"
        ></v-btn>
        <v-btn
          text="Remove"
          color="red"
          @click=remove
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    store: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    remove() {
      this.store.removeSelected()
      this.store.showConfirmDialog = false
    }
  }
}
</script>

<style lang="sass" scoped>
.v-card-title
  display: flex
  width: 100%
  background-color: rgb(var(--v-theme-background),0.8)
  margin: 0 auto 0 auto

.v-card-text
  text-align: center

.v-btn
  width: 50%

</style>
