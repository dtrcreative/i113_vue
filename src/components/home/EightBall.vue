<template>
  <v-card>
    <v-container>
      <v-row>
        <v-text-field
          hide-details
          type="number"
          label="Question"
          variant="outlined"
          density="compact"
          v-model="input"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn
          text="Get answer"
          size="large"
          variant="text"
          rounded="xl"
          @click="ask"
        >
        </v-btn>
      </v-row>
      <v-row>
        <v-text-field
          hide-details
          type="text"
          label="Answer"
          variant="outlined"
          density="compact"
          v-model="output"
        ></v-text-field>
      </v-row>
    </v-container>
  </v-card>

</template>

<script>
export default {
  name: "EightBall",
  data() {
    return {
      input: '',
      output: '',
    }
  },
  methods:{
    ask(){

    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.v-btn
  margin: auto auto auto auto

.v-card
  background-color: $background-transparent

.v-text-field
  width: 20%
  padding: 5px 0 5px 0
</style>
