<template>
  <v-card class="section-center">
    <div class="vek-logo">
      <v-img
        src="@/assets/img/main-logo.png"
      ></v-img>
    </div>

    <div class="card-text">

      <p class="text-center, text-h1, card-text">
        {{ "Онлайн бронирование временных слотов для осуществления разгрузки товаров на складе" }}
      </p>

    </div>

    <div class="slot-logo">
      <v-img
        src="@/assets/img/authpage-slot-image.png"
      ></v-img>
    </div>

  </v-card>
</template>

<script>
export default {
  name: "LogoView"
}
</script>

<style lang="sass" scoped>
@import "@/components/auth2/css/auth.sass"

.section-center
  text-align: center
  width: 100%
  height: 900px
  margin-top: 10px
  background-color: rgba(42,19,9,0)

  @media (max-width: 767px)
    visibility: collapse

.card-text
  padding: 7% 10px
  font-size: 150%

.vek-logo
  padding-top: 10px
  max-width: 700px
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
