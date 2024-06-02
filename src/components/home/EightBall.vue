<template>
  <v-card>
    <v-container>
      <v-row>
        <v-text-field
          hide-details
          label="Question"
          variant="outlined"
          density="compact"
          v-model="input"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn
          text="Roll the ball"
          size="large"
          variant="text"
          rounded="xl"
          @click="ask"
        >
        </v-btn>
      </v-row>
      <v-row>
        <v-text-field
          disabled
          hide-details
          type="text"
          label="Answer"
          variant="plain"
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

      enablePreviousInput: true,
      previousInput: '',

      variants: [
        {answer: "yes", chance: 0.5},
        {answer: "no", chance: 0.5},
      ],
      mistake: {
        empty: "Ask me question first",
        emptyAnswerList: "I have no answer",
        noQuestion: 'There is no question yet',
        someError: 'Things go bad',
        sameQuestion: 'Already asked this'
      },
      answers: [
        {
          type: 'yes', chance: 45, values: [
            {answer: "Ага"},
            {answer: "Да"},
            {answer: "Очевидно. Да))"},
            {answer: "Стопроцентно"},
            {answer: "Слышал как рак на горе свистнул. поэтому - да"},
          ]
        },
        {
          type: 'no', chance: 45, values: [
            {answer: "Нет"},
            {answer: "Неа"},
            {answer: "Ни разу"},
            {answer: "Ни. за. что."},
            {answer: "Даже не надейся"},
            {answer: "Когда-нибудь - возможно. сейчас - нет"},
          ]
        },
        {
          type: 'maybe', chance: 10, values: [
            {answer: "Возможно"},
            {answer: "Ой, да, конечно"},
            {answer: "ПодумОй сам"},
            {answer: "А что говорят звёзды?"},
            {answer: "Чекни гороскоп=)"},
          ]
        },
      ]
    }
  },
  methods: {
    ask() {
      this.output = this.validateQuestion();
      if (this.output === '') {
        let answerValues = this.getTypeValues()
        this.output = this.getRandomAnswer(answerValues);
        this.previousInput = this.input
      }
    },
    getTypeValues() {
      let maxPercentValue = 0;
      this.answers.forEach((answerChance) => maxPercentValue += answerChance.chance)
      let randomizedTypeValue = Math.floor(Math.random() * (maxPercentValue-1)+1)
      let currentAnswerPercent = 0
      let outputValues = []
      this.answers.some((answer) => {
        currentAnswerPercent += answer.chance;
        if(randomizedTypeValue <= currentAnswerPercent){
          outputValues = answer.values
          return outputValues;
        }
      })
      if(outputValues.length > 0){
        return outputValues
      }
      return this.mistake.someError
    },
    getRandomAnswer(values){
      if(typeof values !== "string" && values.length>0){
        let index = Math.floor(Math.random() * (values.length))
        return values[index].answer;
      }
      return values
    },

    validateQuestion() {
      if (this.input === '') {
        return this.mistake.empty
      }
      if (this.input.toString().indexOf("?") === -1) {
        return this.mistake.noQuestion
      }
      if(this.enablePreviousInput && this.input.toString() === this.previousInput.toString()){
        return this.mistake.sameQuestion
      }
      return ''
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
