<template>
  <div>
    <div class="component">
      <v-text-field
        label="CurrentBalance"
        variant="outlined"
        v-model="inputBalance"
        v-on:keyup="calcDaysLeft"
      ></v-text-field>
        <v-text-field
          class="reserve"
          label="Reserved:"
          variant="outlined"
          v-model="reserved"
          v-on:keyup="calcDaysLeft"
        ></v-text-field>
        <v-text-field
          class="reserve"
          label="Multiplier:"
          variant="outlined"
          v-model="multiplier"
          v-on:keyup="calcDaysLeft"
        ></v-text-field>
      <VBtn
        size="large"
        variant="text"
        icon="mdi-trash-can-outline"
        rounded="xl"
        @click="clear"
      >
      </VBtn>
    </div>
    <div class="component">
      <v-text-field clearable
        label="DayOn"
        variant="outlined"
        v-model="dayOn"
        v-on:keyup="calcDaysLeft"
      ></v-text-field>
      <v-text-field clearable
        label="DayOff"
        variant="outlined"
        v-model="dayOff"
        v-on:keyup="calcDaysLeft"
      ></v-text-field>
      <v-text-field
        label="DaysLeft"
        variant="outlined"
        v-model="daysLeft"
        disabled
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        label="Balance for the day"
        variant="outlined"
        v-model="calculatedValue"
        disabled
      ></v-text-field>
    </div>
  </div>
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
      multiplier: 1

    };
  },
  methods: {
    calcDaysLeft() {
      const currentDate = new Date();
      const todayDate = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + this.dayOn);
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
    calcResultBalance(value){
      if(this.reserved === ''){
        return value;
      }
      return value-this.reserved*this.multiplier;
    },
    clear() {
      this.inputBalance = '';
      this.calculatedValue = '';
    }
  },
  mounted() {
    this.dayOn = new Date().getDate();
    if(this.dayOn<15){
      this.dayOff = 15;
    }else{
      this.dayOff = 26;
    }
    this.calcDaysLeft();
  },

}
</script>

<style scoped>
* {
  display: -moz-grid-line;
}
.component {
  display: flex;
}
.reserve{
  width: 1%;
}
</style>
