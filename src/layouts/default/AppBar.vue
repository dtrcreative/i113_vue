<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-shield-home-outline"/>
      <strong>Ellie</strong>
    </v-app-bar-title>

    <div class="user-info">
      <strong>Guest</strong>
      <v-avatar icon="mdi mdi-account-off"></v-avatar>
    </div>

    <div class="auth">
      <VBtn class="btn">
        Sign in
      </VBtn>

      <VBtn class="btn" variant="outlined">
        Log in
      </VBtn>
    </div>


    <!--    <v-menu>-->
    <!--      <template v-slot:activator="{ on, attrs }">-->
    <!--        <v-btn icon v-bind="attrs" v-on="on">-->
    <!--          <v-icon>mdi-dots-vertical</v-icon>-->
    <!--        </v-btn>-->
    <!--      </template>-->

    <!--      <v-list>-->
    <!--        <v-list-item v-for="n in 4" :key="n" @click="() => {}">-->
    <!--          Option {{ n }}-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-menu>-->

    <!--    <v-app-bar-nav-icon/>-->

  </v-app-bar>
</template>

<script setup>
</script>

<style lang="sass" scoped>
@import '../src/assets/styles/main'

.user-info
  padding: 5px
  horiz-align: right

.auth
  padding: 10px

</style>

