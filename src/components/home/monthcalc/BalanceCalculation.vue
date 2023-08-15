<template>
  <div>
    <div class="component">
      <v-text-field
        label="Current balance: "
        variant="outlined"
        v-model="inputBalance"
        v-on:keyup="calcDaysLeft"
      ></v-text-field>
      <VBtn
        size="large"
        variant="text"
        icon="mdi mdi-trash-can-outline"
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
        this.calculatedValue = (this.inputBalance / this.daysLeft).toFixed(2);
      } else {
        this.calculatedValue = this.inputBalance;
      }
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
  /*@media (max-width: 767 px) display: flex;*/
}
.btn{
  height: 100%;
}
</style>
