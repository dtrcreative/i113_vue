<template>
  <v-card class="v-card-control">
    <v-card class="v-card-categories">
      <v-toolbar height="80" flat>
        <template v-slot:prepend>
          <v-btn
            icon="mdi-plus"
            @click="showAddForm"
          ></v-btn>
        </template>

        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-text-field
              variant="outlined"
              v-model="useKnowbaseStore().selectedCategory"
              v-bind="props"
              label="Search Category"
              append-inner-icon="mdi-magnify"
              clearable
              hide-details
              single-line
            >
            </v-text-field>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in useKnowbaseStore().categories" :key="i">
              <v-list-item-title
                @click="useKnowbaseStore().selectedCategory = item.category"
              >
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.category }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-toolbar>
    </v-card>

    <v-card class="v-card-categories">
      <v-divider></v-divider>

      <v-toolbar height="80" flat>

        <v-text-field
          variant="outlined"
          v-model="useKnowbaseStore().selectedCategory"
          label="Search Tag"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          single-line
        ></v-text-field>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-toolbar>
      <!--      <v-combobox-->
      <!--        variant="outlined"-->
      <!--        label="Select Tag"-->
      <!--        v-model="useKnowbaseStore().selectedTags"-->
      <!--        :items="useKnowbaseStore().tags"-->
      <!--        @change="clearSubtitle"-->
      <!--        hide-details-->
      <!--        chips-->
      <!--        single-line-->
      <!--        closable-chips-->
      <!--      ></v-combobox>-->
      <!--      <v-combobox-->
      <!--        variant="outlined"-->
      <!--        label="Select SubTag"-->
      <!--        v-model="useKnowbaseStore().selectedSubTags"-->
      <!--        :items="useKnowbaseStore().subTags"-->
      <!--        hide-details-->
      <!--        chips-->
      <!--        single-line-->
      <!--        closable-chips-->
      <!--      ></v-combobox>-->
    </v-card>
  </v-card>
</template>

<script setup>
import {useKnowbaseStore} from "@/components/microservices/knowbase/js/knowbaseStore";

useKnowbaseStore()

function showAddForm() {

}

function clearSubtitle() {
  useKnowbaseStore().selectedSubTags = null

}

function getCategory() {
  return useKnowbaseStore().selectedCategory === null ? '' : useKnowbaseStore().selectedCategory.title
}
</script>

<style lang="sass" scoped>
.v-card-control
  display: flex
  margin: 0 auto 0 auto
  border-radius: 15px
  background-color: rgba(0, 11, 42, 0.25)
  width: 100%
  @media (max-width: 420px)
    width: 100%

.v-card-categories
  width: 100%

.v-card-categories
  width: 100%

.v-toolbar
  background-color: rgba(0, 0, 0, 0)
  width: 100%

.v-combobox
  width: 100%

</style>
