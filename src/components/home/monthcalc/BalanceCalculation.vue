<template>
  <div>
    <div class="component">
      <v-text-field
        label="Current balance: "
        variant="outlined"
        v-model="inputBalance"
        v-on:keyup="calcDayLimit"
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
      <v-text-field
        label="Day1"
        variant="outlined"
        v-model="firstDayOfMonth"
      ></v-text-field>
      <v-text-field
        label="Day2"
        variant="outlined"
        v-model="secondDayOfMonth"
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
      } else {
        this.daysLeft = 0;
      }
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
