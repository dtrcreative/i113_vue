<template>
  <div>
    <v-text-field
      class="inputBalance"
      label="Current balance: "
      variant="outlined"
      prepend-icon="mdi mdi-calendar"
      v-model="inputBalance"
      v-on:keyup="calcDayLimit"
    ></v-text-field>
    <v-text-field
      class="inputDayOfMonth"
      label="Day1"
      variant="outlined"
      v-model="firstDayOfMonth"
    ></v-text-field>
    <v-text-field
      class="inputDayOfMonth"
      label="Day2"
      variant="outlined"
      v-model="secondDayOfMonth"
    ></v-text-field>
    <v-text-field
      class="daysLeft"
      label="DaysLeft"
      variant="outlined"
      v-model="daysLeft"
      disabled="true"
    ></v-text-field>
    <v-text-field
      class="result"
      label="Balance for the day"
      variant="outlined"
      v-model="calculatedValue"
      disabled="true"
    ></v-text-field>

  </div>
</template>

<script>
export default {
  name: "BalanceCalculation",

  data() {
    return {
      firstDayOfMonth: 16,
      secondDayOfMonth: 26,
      daysLeft: '',
      calculatedValue: '',
      inputBalance: '',
    };
  },
  methods: {
    calcDaysLeft() {
      const currentDate = new Date();
      const today = currentDate.getDate();
      if (today <= this.firstDayOfMonth) {
        this.daysLeft = (this.firstDayOfMonth - today)
      } else if (today <= this.secondDayOfMonth) {
        this.daysLeft = this.secondDayOfMonth - today;
      } else if (today > this.secondDayOfMonth) {
        const nearestFirstDay = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 2) + '-' + this.firstDayOfMonth);
        const timeDifference = nearestFirstDay.getTime() - currentDate.getTime();
        this.daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      } else{
        this.daysLeft = 0;
      }
    },
    calcDayLimit() {
      if (this.daysLeft > 0) {
        this.calculatedValue = (this.inputBalance / this.daysLeft).toFixed(2);
      } else {
        this.calculatedValue = this.inputBalance;
      }
    }
  },
  mounted() {
    this.calcDaysLeft();
  },

}
</script>

<style scoped>
* {
  display: flex;
}

.inputBalance {
  max-width: 200px;
}

.inputDayOfMonth {
  max-width: 60px;
}

.daysLeft {
  max-width: 70px;
}

.result {
  max-width: 200px;
}
</style>
