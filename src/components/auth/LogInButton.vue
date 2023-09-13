<template>
  <v-btn
    class="btn"
    variant="outlined"
    @click="login"
  >Log In
  </v-btn>
</template>

<script>
import {login} from "@/components/auth/services/auth-helper";

export default {
  name: "LogInButton",
  methods:{
    login(){
      login();
    },
  },

}
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main.sass'

.btn
  min-width: 100px
  padding: 5px

</style>
