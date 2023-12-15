<template>
  <router-view/>
</template>

<script>
import {login} from "@/components/auth/services/auth-helper";
import userHelper from "@/components/auth/services/user.helper";

export default {
  name: "LogIn",
  mounted() {
    userHelper.cleanStorage()
    login();
  }
}
</script>

<style scoped>

</style>
