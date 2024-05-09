<template>
  <v-card
  variant="tonal"
  min-width="200"
  link
  @click="showCard(cardId)"
  >
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{subtitle}}</v-card-subtitle>
    <v-card-text>{{text}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataCard",
  props:{
    cardId:{
      type: Number,
      requred: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods:{
    showCard(id){
      console.log(id)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.v-card
  border-radius: 10px
  max-height: 400px

.v-card-title
  height: 50px
  text-align: center
  font-size: 25px
  font-weight: bold
  font-family: "Times New Roman"
  background-color: $background-card-title

.v-card-subtitle
  text-align: center
  font-weight: lighter
  background-color: $background-card-subtitle

</style>
