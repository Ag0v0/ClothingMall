<template>
  <div id="app">
    <keep-alive exclude="Detail, Buy">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("assets/css/base.css");
#app {
  touch-action: none;
}
</style>
