<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon = "mdi mdi-translate"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "TranlateList",
  data: () => ({
    items: [
      { title: 'Eng' },
      { title: 'Rus' },
    ],
    location: 'end',
  }),
}
</script>

<style scoped>

</style>
