<template>
</template>

<script>
import {redirectCallBack} from "@/components/auth/services/auth-helper";

export default {
  name: "RedirectCallBack",
  mounted() {
    redirectCallBack();
  }
}

</script>

<style scoped>

</style>
