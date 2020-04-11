<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

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
                  'animated swing': animation,
                  'disabled dimmed': product.stock <= 0
                }"
                v-for="(product, index) in products"
                :key="index"
                :title="product.stock <= 0 ? 'Unavailable' : ''"
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
                  {{ product.Brand.name }}
                </q-card-section>
                <q-card-actions class="row justify-center">
                  <q-btn class="bg-indigo-6 text-white" v-if="$q.screen.gt.sm"
                    >View More</q-btn
                  >
                  <q-btn
                    round
                    class="bg-indigo-6 text-white"
                    icon="info"
                    v-else
                  ></q-btn>
                  <div class="q-mx-sm" v-if="!isAdmin">
                    <q-btn
                      class="bg-red-9 text-white"
                      @click="addToCartClicked(product)"
                      v-if="$q.screen.gt.sm"
                      :disable="product.stock <= 0"
                      >Add to Cart</q-btn
                    >
                    <q-btn
                      round
                      class="bg-red-9 text-white"
                      icon="add_shopping_cart"
                      v-else
                      @click="addToCartClicked(product)"
                      :disable="product.stock <= 0"
                    ></q-btn>
                  </div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="showProductCard">
        <q-card style="width:80vw">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Product:</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section v-if="showProductCard">
            <div class="row jusitify-between">
              <div class="col">
                <div class="column">
                  <div class="col">Name : {{ selectedProduct.name }}</div>
                  <div class="col">
                    Category: {{ selectedProduct.Category.name }}
                  </div>
                  <div class="col">Brand: {{ selectedProduct.Brand.name }}</div>
                  <div class="col">Model: {{ selectedProduct.Model.name }}</div>
                  <div class="col">Price: {{ selectedProduct.price }} EGP</div>
                </div>
              </div>
              <div class="col-shrink ">
                <div class="row items-center" style="height:100%;">
                  <div class="col">
                    <q-btn
                      round
                      dense
                      class="bg-red-8 text-white"
                      size="md"
                      icon="remove"
                      :disable="selectedProduct.countOfProducts == 1"
                      @click="decrementProductCount"
                    />
                  </div>
                  <div class="col-shrink">
                    <div class="text-h6 q-px-sm">
                      {{ selectedProduct.countOfProducts }}
                    </div>
                  </div>
                  <div class="col">
                    <q-btn
                      round
                      dense
                      class="bg-green-14 text-white"
                      size="md"
                      icon="add"
                      @click="incrementProductCount"
                      :disable="
                        selectedProduct.stock <= selectedProduct.countOfProducts
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="q-mt-md justify-end"
              :class="{ row: !$q.platform.is.mobile }"
            >
              <div class="col-shrink">
                Total Price:
                {{ selectedProduct.price * selectedProduct.countOfProducts }}
                EGP
              </div>
              <q-space />
              <div class="col-shrink">
                <q-btn
                  dense
                  class="bg-green-14 text-white"
                  size="md"
                  icon="add"
                  label="Add To Cart"
                  @click="addObjectToCart"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="col-2" v-if="$q.screen.gt.sm"></div>
    </div>
  </q-page>
</template>

<script>
// import api from "../store/api";
// import axios from "axios";
export default {
  name: "Products",
  data() {
    return {
      products: [],
      animation: false,
      showProductCard: false,
      selectedProduct: {}
    };
  },
  methods: {
    async getData() {
      await Promise.all([
        this.$store.dispatch("fetchProducts"),
        this.$store.dispatch("fetchCategories"),
        this.$store.dispatch("fetchBrands"),
        this.$store.dispatch("fetchModels")
      ]);

      var data = this.$store.getters.getProducts;
      var currentCart = this.$store.getters.getCart;
      if (currentCart.length > 0) {
        currentCart.forEach(item => {
          data.forEach(product => {
            if (product.id == item.product.id) {
              product.stock -= item.count;
            }
          });
        });
      }
      this.products = data;
    },
    clicked() {
      this.animation = !this.animation;
      this.$forceUpdate();
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
    },
    addToCartClicked(productObject) {
      var token = this.$store.getters.getToken;
      if (!token) {
        this.$q.notify({
          type: "warning",
          message: "Please login or register to add products to your cart",
          timeout: 1000
        });
        // setTimeout(() => {
        //   this.$router.push({ name: "Login" });
        // }, 1000);
      } else {
        this.showProductCard = true;
        productObject.countOfProducts = 1;
        this.selectedProduct = productObject;
      }
    },
    decrementProductCount() {
      this.selectedProduct.countOfProducts--;
      this.$forceUpdate();
    },
    incrementProductCount() {
      if (
        this.selectedProduct.stock >=
        this.selectedProduct.countOfProducts + 1
      ) {
        this.selectedProduct.countOfProducts++;
      }

      this.$forceUpdate();
    },
    addObjectToCart() {
      var currentCar = this.$store.getters.getCart;
      var indexOfProduct = -1;
      currentCar.forEach((cartObj, index) => {
        if (cartObj.product && cartObj.product.id == this.selectedProduct.id) {
          // cartObj.count += this.selectedProduct.countOfProducts;
          indexOfProduct = index;
        }
      });
      this.products.forEach(singleProduct => {
        if (singleProduct.id == this.selectedProduct.id) {
          console.log(singleProduct.stock);
          singleProduct.stock -= this.selectedProduct.countOfProducts;
        }
      });
      if (indexOfProduct !== -1) {
        currentCar[
          indexOfProduct
        ].count += this.selectedProduct.countOfProducts;
      } else {
        var temp = {
          count: this.selectedProduct.countOfProducts,
          product: this.selectedProduct
        };
        this.$store.commit("addToCart", temp);
      }
      this.$q.notify({
        type: "positive",
        message: "Products added to cart",
        timeout: 3000
      });
      this.showProductCard = false;
    }
  },
  created() {
    this.getData();
  },
  computed: {
    QuasarObj() {
      return this.$q;
    },
    isAdmin() {
      return this.$store.getters.getUserType == "admin";
    },
    cart() {
      return this.$store.getters.getCart;
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
