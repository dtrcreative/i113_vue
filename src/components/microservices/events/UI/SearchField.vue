<template>
  <v-text-field clearable
                class="searchField"
                v-model.trim="searchData"
                label="Search"
                variant="outlined"
                density="compact"
                append-inner-icon="mdi-magnify"
                hide-details
                :maxlength="10"
  ></v-text-field>
</template>

<script>
export default {
  name: "SearchField",
  data() {
    return {
      searchData: ""
    }
  }
}
</script>

<style scoped>

.searchField{
  width: 100%;
}

</style>
