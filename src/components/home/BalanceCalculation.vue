<template>
  <v-card>
    <v-container>
      <v-row>
        <v-text-field
          hide-details
          type="number"
          label="CurrentBalance"
          variant="outlined"
          density="compact"
          v-model="inputBalance"
          v-on:keyup="calcDaysLeft"
        ></v-text-field>
        <v-btn
          size="large"
          variant="text"
          icon="mdi-trash-can-outline"
          rounded="xl"
          @click="clear"
        >
        </v-btn>
        <v-text-field
          hide-details
          label="Balance for the day"
          variant="outlined"
          density="compact"
          v-model="calculatedValue"
          disabled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
                      hide-details
                      type="number"
                      label="DayOn"
                      variant="outlined"
                      density="compact"
                      v-model="dayOn"
                      :onchange="calcDaysLeft"
        ></v-text-field>
        <v-text-field
                      hide-details
                      type="number"
                      label="DayOff"
                      variant="outlined"
                      density="compact"
                      v-model="dayOff"
                      :onchange="calcDaysLeft"
        ></v-text-field>
        <v-text-field
          hide-details
          label="DaysLeft"
          variant="outlined"
          density="compact"
          v-model="daysLeft"
          disabled
        ></v-text-field>
      </v-row>
      <v-row>

        <v-text-field
          hide-details
          type="number"
          label="Reserved:"
          variant="outlined"
          density="compact"
          v-model="reserved"
          v-on:keyup="calcDaysLeft"
        ></v-text-field>
        <v-text-field
          hide-details
          type="number"
          label="Multiplier:"
          variant="outlined"
          density="compact"
          v-model="multiplier"
          v-on:keyup="calcDaysLeft"
        ></v-text-field>
        <v-text-field
          hide-details
          type="number"
          label="ResultReserved:"
          variant="outlined"
          density="compact"
          v-model="reserverResult"
          disabled
        ></v-text-field>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "BalanceCalculation",

  data() {
    return {
      dayOn: '',
      dayOff: '',
      daysLeft: '',
      calculatedValue: '',
      inputBalance: '',

      reserved: '',
      multiplier: 1,
      reserverResult: '',

    };
  },
  methods: {
    calcDaysLeft() {
      const currentDate = new Date();
      const todayDate = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + this.dayOn);
      if (this.dayOn <= this.dayOff) {
        this.daysLeft = this.dayOff - this.dayOn;
      } else if (this.dayOn > this.dayOff) {
        const nearestFirstDay = new Date(todayDate.getFullYear() + '-' + (todayDate.getMonth() + 2) + '-' + this.dayOff);
        const timeDifference = nearestFirstDay.getTime() - todayDate.getTime();
        this.daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      } else {
        this.daysLeft = 0;
      }
      this.calcDayLimit();
    },
    calcDayLimit() {
      if (this.daysLeft > 0) {
        this.calculatedValue = (this.calcResultBalance(this.inputBalance) / this.daysLeft).toFixed(2);
      } else {
        this.calculatedValue = this.calcResultBalance(this.inputBalance);
      }
    },
    calcResultBalance(value) {
      if (this.reserved === '') {
        return value;
      }
      if (this.multiplier === "") {
        this.multiplier = 1
      }
      this.reserverResult = this.reserved * this.multiplier;
      return value - this.reserverResult;
    },
    clear() {
      this.inputBalance = '';
      this.calculatedValue = '';
      this.reserved = '';
      this.multiplier = 1;
    },
    // calcMaxDaysInCurrentMonth(){
    //   let currentDate = new Date()
    //   return new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate()
    // }
  },
  mounted() {
    this.dayOn = new Date().getDate();
    if (this.dayOn < 15) {
      this.dayOff = 15;
    } else {
      this.dayOff = 26;
    }
    this.calcDaysLeft();
  },

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
