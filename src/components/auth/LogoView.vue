<template>
  <v-card class="section-center">
    <div class="elli-logo">
      <v-img
        icon="$logo"
        src="@/assets/Logo.png"
      ></v-img>
    </div>
    <div class="card-text">

      <!--      <p class="text-center, text-h1, card-text">-->
      <!--        {{ "Добро пожаловать в уютный уголок Элли" }}-->
      <!--      </p>-->

    </div>
  </v-card>
</template>

<script>
export default {
  name: "LogoView"
}
</script>

<style lang="sass" scoped>
@import "@/components/auth/css/auth.sass"

.section-center
  text-align: center
  width: 100%
  height: 800px
  margin-top: 12%
  background-color: rgba(42, 19, 9, 0)

  @media (max-width: 767px)
    visibility: collapse

.card-text
  padding: 20px 10px
  font-size: 150%

.elli-logo
  padding-top: 40px
  max-width: 400px
  position: center
  justify-content: center
  align-items: center
  display: block
  margin: 0 auto

.slot-logo
  max-width: 400px
  position: center
  justify-content: center
  align-items: center
  display: block
  margin: 0 auto


.overflow-visible
  height: 50px
  margin-right: 10px
  margin-left: 10px
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px
</style>
