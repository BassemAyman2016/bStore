<template>
  <q-page>
    <div class="row justify-center q-ma-lg">
      <div class="col-12">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          autoplay
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          style=" "
        >
          <q-carousel-slide
            :name="1"
            img-src="https://res.cloudinary.com/dtmz1uaon/image/upload/v1587262868/banner3_j96qje.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://isellpackaging.com/wp-content/uploads/2016/05/shopping-bags-slider.jpg"
          />

          <q-carousel-slide
            :name="3"
            img-src="https://lh4.googleusercontent.com/proxy/P-AfSit8mYBRcuSYdhebKWcedXyJD7uN0Sol-AfwHC_BA1uBFeX6XQdLLKAyMVDIa3mcxZ1xAV93mPctdyksKgkBWIenaSt3g9nbjLWYhcO7V24iv4m6H0FH9u5y1B6HumGB"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://dailykroy.com/wp-content/uploads/2018/03/banner2.jpg"
          />
          <q-carousel-slide
            :name="5"
            img-src="https://www.dipeshpatel.com/wp-content/uploads/2018/12/Screenshot-14.png"
          />
          <q-carousel-slide
            :name="6"
            img-src="data:image/png;base64,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"
          />
        </q-carousel>
      </div>
    </div>
    <div class="row justify-center">
      <!-- <div class="col-2 q-ml-sm" v-if="$q.screen.gt.sm">
        <q-card>
          <q-card-section>Category</q-card-section>
          <q-card-section>Brand</q-card-section>
          <q-card-section>Model</q-card-section>
          <q-card-section>Price Range</q-card-section>
        </q-card>
      </div> -->

      <div class="col-xs-12 col-md-8">
        <div class="row">
          <div class="col-12 justify-around">
            <div class="row justify-evenly">
              <q-card
                class="col-xs-5 col-md-3 q-my-md"
                :class="{
                  'q-ml-sm': $q.screen.gt.sm,
                  'animated swing': animation,
                  'disabled dimmed': product.stock <= 0
                }"
                v-for="(product, index) in products"
                :key="index"
                :title="product.stock <= 0 ? 'Unavailable' : ''"
              >
                <div class="column justify-between" style="height:100%;">
                  <div class="col-shrink">
                    <q-img
                      :src="product.images[0].img"
                      :ratio="1"
                      placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                      spinner-color="white"
                      style="height: 150px; max-width:100%"
                    />
                    <!-- <img class="product-image" :src="product.images[0].img" /> -->
                    <q-card-section>
                      <div class="">{{ product.Brand.name }}</div>
                      <div class="row justify-between">
                        <div class="col-shrink text-subtitle1 text-weight-bold">
                          {{ product.name }}
                        </div>
                        <div class="col-shrink text-subtitle1">
                          {{ product.price }}EGP
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      {{ product.Model.name }}
                    </q-card-section>
                  </div>
                  <div class="col-shrink">
                    <q-card-actions class="row justify-center">
                      <div v-if="isAdmin">
                        <q-btn
                          class="bg-indigo-6 text-white q-mx-sm"
                          v-if="$q.screen.gt.sm"
                          @click="editProductClicked(product)"
                          >Edit</q-btn
                        >
                        <q-btn
                          round
                          class="bg-indigo-6 text-white q-mx-xs"
                          icon="edit"
                          @click="editProductClicked(product)"
                          v-else
                        ></q-btn>
                        <q-btn
                          class="bg-red-9 text-white"
                          @click="deleteProduct(product)"
                          v-if="$q.screen.gt.sm"
                          :disable="product.stock <= 0"
                          >Delete</q-btn
                        >
                        <q-btn
                          round
                          class="bg-red-9 text-white"
                          icon="delete_forever"
                          v-else
                          @click="deleteProduct(product)"
                          :disable="product.stock <= 0"
                        ></q-btn>
                      </div>
                      <div v-else>
                        <q-btn
                          class="bg-indigo-6 text-white q-mx-sm"
                          v-if="$q.screen.gt.sm"
                          @click="viewMoreClicked(product)"
                          >View More</q-btn
                        >
                        <q-btn
                          round
                          class="bg-indigo-6 text-white q-mx-xs"
                          icon="info"
                          v-else
                          @click="viewMoreClicked(product)"
                        ></q-btn>
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
                  </div>
                </div>
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
              class=" row q-mt-md items-center"
              :class="{ row: !$q.platform.is.mobile }"
            >
              <div class="col-auto">
                Total Price:
                {{ selectedProduct.price * selectedProduct.countOfProducts }}
                EGP
              </div>
              <q-space />
              <div class="col-shrink">
                <q-btn
                  dense
                  class="bg-green-14 text-white"
                  :size="$q.screen.gt.xs ? 'md' : 'sm'"
                  icon="add"
                  label="Add To Cart"
                  @click="addObjectToCart"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showDeleteDialog" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to delete this product?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="deleteAction(1)"
            />
            <q-btn
              flat
              label="Yes"
              color="primary"
              @click="deleteAction(2)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- <div class="col-2" v-if="$q.screen.gt.sm"></div> -->
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
      selectedProduct: {},
      slide: 1,
      showDeleteDialog: false
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
      data = data.filter(product => product.stock > 0);
      this.products = data;
      var modelsHolder = {};
      var brandsHolder = {};
      var categoriesHolder = {};
      var brandsUbmrella = [];
      data.forEach(product => {
        if (!categoriesHolder[product.Category.name])
          categoriesHolder[product.Category.name] = {};
        if (!brandsHolder[product.Brand.name])
          brandsHolder[product.Brand.name] = {};
        if (!modelsHolder[product.Model.name])
          modelsHolder[product.Model.name] = {};
        if (brandsUbmrella[product.brand_id])
          brandsUbmrella[product.brand_id].push(product.Model);
        else brandsUbmrella[product.brand_id] = [product.Model];
      });
      // console.log(categoriesHolder);
      // console.log(brandsHolder);
      // console.log(brandsUbmrella);
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
          timeout: 5000
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
          product: this.selectedProduct,
          id: this.selectedProduct.id
        };
        this.$store.commit("addToCart", temp);
      }
      this.$q.notify({
        type: "positive",
        message: "Product(s) added to cart",
        timeout: 10000
      });
      this.showProductCard = false;
    },
    deleteProduct(product) {
      this.showDeleteDialog = true;
      this.selectedProduct = product;
    },
    async deleteAction(value) {
      if (value == 2) {
        await this.$store
          .dispatch("deleteProduct", this.selectedProduct.id)
          .then(async res => {
            this.$q.notify({
              type:
                res.status && res.status == "success" ? "positive" : "negative",
              message: res.message ? res.message : "Error Occured",
              timeout: 2000
            });
            if (res.status == "success") {
              await this.getData();
            }
          });
      }
      this.showDeleteDialog = false;
    },
    editProductClicked(value) {
      this.$store.commit("setSelectedProduct", value);
      this.$router.push({ name: "ProductEdit" });
    },
    viewMoreClicked(value) {
      this.$store.commit("setSelectedProduct", value);
      this.$router.push({ name: "ViewMore" });
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
