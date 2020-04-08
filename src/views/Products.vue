<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm" style="background-color:red;">
        heree
      </div>

      <div class="col-sm-12 col-md-8">
        <div class="row">
          <div class="col-12">
            <div class="row justify-center">
              <img
                alt="bStore "
                src="../assets/logo.png"
                class="col-xs-4 col-md-2"
              />
            </div>
          </div>
          <div class="col-12 justify-around">
            <div class="row justify-evenly">
              <q-card
                class="col-xs-5 col-md-3  q-my-md"
                :class="{
                  'q-ml-sm': $q.screen.gt.sm,
                  'animated swing': animation
                }"
                v-for="(product, index) in products"
                :key="index"
              >
                <q-img
                  :src="product.images[0].img"
                  :ratio="1"
                  placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                  spinner-color="white"
                  style="height: 150px; max-width:100%"
                />
                <!-- <img class="product-image" :src="product.images[0].img" /> -->

                <q-card-section>
                  <div class="">{{ product.Model.name }}</div>
                  <div class="row justify-between">
                    <div class="col-shrink text-subtitle1">
                      {{ product.name }}
                    </div>
                    <div class="col-shrink text-subtitle1">
                      {{ product.price }}EGP
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  {{ product.name }}
                </q-card-section>
                <q-card-actions>
                  <q-btn>Action 1</q-btn>
                  <q-btn flat>Action 2</q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-2"
        v-if="$q.screen.gt.sm"
        style="background-color:yellow;"
      >
        tesr
      </div>
    </div>
  </q-page>
</template>

<script>
import api from "../store/api";
// import axios from "axios";
export default {
  name: "Products",
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
            this.products = res.data.data;
          }
        });
    },
    clicked() {
      this.animation = !this.animation;
      this.$forceUpdate();
      // LoadingBar.start();

      // LoadingBar.stop();
      this.showLoading();
    },
    showLoading() {
      // this.$q.loading.show();
      // setTimeout(() => {
      //   this.$q.loading.hide();
      // }, 2000);
      this.$q.loadingBar.start();
      // this.$q.loadingBar.stop();
      // this.$q.loadingBar.increment(50);
    }
  },
  created() {
    this.getProducts();
  },
  computed: {
    QuasarObj() {
      return this.$q;
    }
  }
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
.product-image {
  // max-height: 175px;
}
</style>
