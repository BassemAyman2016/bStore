<template>
  <router-view></router-view>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {},

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    changeRoute(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  created() {
    this.$q.addressbarColor.set("#ff0000");
  }
};
</script>

<style lang="scss" scoped>
body {
  font-family: "Lato", sans-serif;
}
.mouseHover {
  &:hover {
    cursor: pointer;
  }
}
</style>
