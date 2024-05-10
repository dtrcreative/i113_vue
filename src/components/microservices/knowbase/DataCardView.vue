<template>
  <v-row dense>
    <knowbase-control></knowbase-control>
  </v-row>
  <v-row dense>
    <v-col v-for="(item) in useKnowbaseStore().filteredBySubTag" :key="item">
      <data-card
        :card-id="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :text="item.text"
      ></data-card>
    </v-col>
  </v-row>
</template>

<script>
import DataCard from "@/components/microservices/knowbase/ui/DataCard";
import {useKnowbaseStore} from "@/components/microservices/knowbase/js/knowbaseStore";
import KnowbaseControl from "@/components/microservices/knowbase/KnowbaseControl";
export default {
  name: "DataCardView",
  components: {KnowbaseControl, DataCard},
  methods:{
    useKnowbaseStore,
  }
}
</script>

<style lang="sass" scoped>

</style>
