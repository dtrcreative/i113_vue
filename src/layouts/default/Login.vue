<template>
  <router-view/>
</template>

<script>
import {login} from "@/components/auth/services/auth-helper";
import userService from "@/components/auth/services/user.service";

export default {
  name: "LogIn",
  mounted() {
    userService.cleanStorage()
    login();
  }
}
</script>

<style scoped>

</style>
