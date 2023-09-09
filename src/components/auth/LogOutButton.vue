<template>
  <v-btn
    class="btn"
    variant="outlined"
    @click="logout"
  >Log Out
  </v-btn>
</template>

<script>
import {logout} from "@/components/auth/services/auth-helper";

export default {
  name: "LogOutButton",
  methods:{
    logout(){
      logout();
    },
  },
}
</script>

<style scoped>

</style>
