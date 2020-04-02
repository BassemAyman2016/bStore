<template>
  <q-page class="flex flex-center">
    <img alt="bStore logo" src="../assets/logo.png" />
    <div
      v-for="(product, index) in products"
      :key="index"
      class="fontTest"
      :class="{ 'animated swing': animation }"
    >
      {{ product.name }}
      <br />
    </div>
    <transition
      appear
      enter-active-class="animated swing"
      leave-active-class="animated fadeOut"
    >
      <!-- Wrapping only one DOM element, defined by QBtn -->
      <q-btn color="secondary" icon="mail" label="Email" @click="clicked" />
    </transition>
  </q-page>
</template>

<script>
import api from "../store/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      products: [],
      animation: false
    };
  },
  methods: {
    async getProducts() {
      await api()
        .get(`products/getallProducts`)
        .then(res => {
          if (res.data.status == "success") {
            console.log(res.data.data);
            this.products = res.data.data;
          }
          console.log(res.data);
          console.log(this.products);
        });
    },
    clicked() {
      console.log("clickeddd");
      this.animation = !this.animation;
      this.$forceUpdate();
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
<style lang="scss" scoped>
.fontTest {
  display: block;
}
</style>
