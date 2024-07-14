<template>
  <v-card class="card">

    <v-tabs
      v-model="tab"
      align-tabs="center"
      fixed-tabs
      bg-color="rgb(var(--v-theme-primary),0.5)"
    >
      <v-tab value="todo" touchless>
        <span>Do</span>
      </v-tab>
      <v-tab value="towatch" touchless>
        <span>Watch</span>
      </v-tab>
      <v-tab value="toplay" touchless>
        <span>Play</span>
      </v-tab>
      <v-tab value="toproject" touchless>
        <span>Project</span>
      </v-tab>
      <v-tab value="tolisten" touchless>
        <span>Listen</span>
      </v-tab>
    </v-tabs>

    <v-card-item class="tab-body">
      <v-window v-model="tab" :touch="false">
        <v-window-item value="todo">
          <to-do-main-view></to-do-main-view>
        </v-window-item>
        <v-window-item value="towatch">
          <to-watch-main-view></to-watch-main-view>
        </v-window-item>
        <v-window-item value="toplay">
          <to-play-main-view></to-play-main-view>
        </v-window-item>
        <v-window-item value="toproject">
          <to-project-main-view></to-project-main-view>
        </v-window-item>
        <v-window-item value="tolisten">
          <to-listen-main-view></to-listen-main-view>
        </v-window-item>
      </v-window>
    </v-card-item>

  </v-card>
</template>

<script>
import ToDoMainView from "@/components/microservices/todos/todo/ToDoMainView";
import ToWatchMainView from "@/components/microservices/todos/towatch/ToWatchMainView";
import ToProjectMainView from "@/components/microservices/todos/toproject/ToProjectMainView";
import ToListenMainView from "@/components/microservices/todos/tolisten/ToListenMainView";
export default {
  name: "ToDosMainView",
  components: {ToListenMainView, ToProjectMainView, ToWatchMainView, ToDoMainView},
  data: () => ({
    tab: null,
  }),
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/main'

.card
  background-color: rgb(var(--v-theme-transparent), 0)
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.tab-body
  border-bottom-left-radius: 20px
  border-bottom-right-radius: 20px

.v-tabs-bar__content
  flex-wrap: wrap
  width: 100%

div.v-tabs-bar
  height: auto


</style>
