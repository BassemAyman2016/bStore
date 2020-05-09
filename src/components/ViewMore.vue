<template>
  <div class="row">
    <div class="col-1" v-if="$q.screen.gt.sm"></div>
    <div class=" q-pa-md" :class="$q.screen.gt.sm ? 'col-10' : 'col-12'">
      <div class="row justify-center">
        <div class="col-12">
          <div class="row text-h5 q-mb-md">
            {{ CurrentProduct.name }}
          </div>
          <div>
            <q-card
              class=" bg-grey-1 row q-mb-sm q-pa-sm items-center"
              style="width:100%;"
            >
              <div class="col-xs-12 col-md-6" style="height:100%">
                <!-- <q-carousel
                  swipeable
                  animated
                  v-model="slide"
                  thumbnails
                  infinite
                  arrows
                  style="display: block;overflow: auto;"
                >
                  <q-carousel-slide
                    v-for="(image, index) in CurrentProduct.images"
                    :key="index"
                    :name="index"
                    :img-src="image.img"
                  /> 
                </q-carousel>-->
                <div v-if="$q.platform.is.mobile" style="width:100%;">
                  <div class="row q-mb-sm">
                    <div
                      class="main-image"
                      :style="{
                        'background-image': 'url(' + mainImage + ')'
                      }"
                    ></div>
                  </div>
                  <div class="row justify-center">
                    <div
                      class="col-2 side-image q-mx-xs"
                      v-for="(image, index) in CurrentProduct.images"
                      :key="index"
                      :style="{
                        'background-image': 'url(' + image.img + ')'
                      }"
                      @click="mainImage = image.img"
                    >
                      <!-- <img class="side-image__img" :src="image.img" alt="" /> -->
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="div row" style="width:100%;">
                    <div class="col-2">
                      <div class="column justify-center" style="height:100%">
                        <div
                          class="col-shrink side-image"
                          v-for="(image, index) in CurrentProduct.images"
                          :key="index"
                          :style="{
                            'background-image': 'url(' + image.img + ')',
                            width: '100%'
                          }"
                          @click="mainImage = image.img"
                        >
                          <!-- <img class="side-image__img" :src="image.img" alt="" /> -->
                        </div>
                      </div>
                    </div>
                    <div class="col-9 q-ml-md">
                      <div
                        class="main-image"
                        :style="{
                          'background-image': 'url(' + mainImage + ')'
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-card-section>
                  <div class="row justify-between items-center">
                    <div class="col-shrink">
                      <div class="row">
                        <div class="col-12 title-label">
                          Price:
                        </div>
                        <div class="col-12 q-mb-sm">
                          {{ CurrentProduct.price }} EGP
                        </div>
                      </div>
                    </div>
                    <div class="col-shrink">
                      <q-btn
                        class="bg-primary text-white"
                        @click="addToCartClicked()"
                        :size="$q.screen.gt.xs ? 'md' : 'sm'"
                        :disable="CurrentProduct.stock <= 0"
                        >Add to Cart</q-btn
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 title-label">
                      Description:
                    </div>
                    <div class="col-12 q-mb-sm">
                      {{ CurrentProduct.description }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 title-label">
                      Category:
                    </div>
                    <div class="col-12 q-mb-sm">
                      {{ CurrentProduct.Category.name }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 title-label">
                      Brand:
                    </div>
                    <div class="col-12 q-mb-sm">
                      {{ CurrentProduct.Brand.name }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 title-label">
                      Model:
                    </div>
                    <div class="col-12 q-mb-sm">
                      {{ CurrentProduct.Model.name }}
                    </div>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="col-1" v-if="$q.screen.gt.sm"></div>
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
                <div class="col">Name : {{ CurrentProduct.name }}</div>
                <div class="col">Price: {{ CurrentProduct.price }} EGP</div>
              </div>
            </div>
            <div class="col-shrink ">
              <div class="row items-center" style="height:100%;">
                <div class="col">
                  <q-btn
                    round
                    dense
                    class="bg-red-8 text-white"
                    :size="$q.screen.gt.xs ? 'md' : 'sm'"
                    icon="remove"
                    :disable="countOfProducts == 1"
                    @click="countOfProducts--"
                  />
                </div>
                <div class="col-shrink">
                  <div class="text-h6 q-px-sm">
                    {{ countOfProducts }}
                  </div>
                </div>
                <div class="col">
                  <q-btn
                    round
                    dense
                    class="bg-green-14 text-white"
                    icon="add"
                    @click="incrementProductCount"
                    :size="$q.screen.gt.xs ? 'md' : 'sm'"
                    :disable="CurrentProduct.stock <= countOfProducts"
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
              {{ CurrentProduct.price * countOfProducts }}
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
  </div>
</template>

<script>
export default {
  name: "ViewMore",
  data() {
    return {
      slide: 0,
      countOfProducts: 1,
      showProductCard: false,
      mainImage: ""
    };
  },
  methods: {
    addToCartClicked() {
      var token = this.$store.getters.getToken;
      if (!token) {
        this.$q.notify({
          type: "warning",
          message: "Please login or register to add products to your cart",
          timeout: 5000
        });
      } else {
        this.showProductCard = true;
      }
    },
    incrementProductCount() {
      if (this.CurrentProduct.stock >= this.countOfProducts + 1) {
        this.countOfProducts++;
      }
    },
    addObjectToCart() {
      var currentCart = this.$store.getters.getCart;
      var indexOfProduct = -1;
      currentCart.forEach((cartObj, index) => {
        if (cartObj.product && cartObj.product.id == this.CurrentProduct.id) {
          indexOfProduct = index;
        }
      });
      var products = this.$store.getters.getProducts;
      products.forEach(singleProduct => {
        if (singleProduct.id == this.CurrentProduct.id) {
          singleProduct.stock -= this.countOfProducts;
        }
      });
      if (indexOfProduct !== -1) {
        currentCart[indexOfProduct].count += this.countOfProducts;
      } else {
        var temp = {
          count: this.countOfProducts,
          product: this.CurrentProduct,
          id: this.CurrentProduct.id
        };
        this.$store.commit("addToCart", temp);
      }
      this.$q.notify({
        type: "positive",
        message: "Product(s) added to cart",
        timeout: 3000
      });
      this.showProductCard = false;
      this.countOfProducts = 1;
    }
  },
  computed: {
    CurrentProduct() {
      return this.$store.getters.getSelectedProduct;
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.mainImage = this.CurrentProduct.images[0].img;
  }
};
</script>

<style lang="scss" scoped>
.title-label {
  font-weight: bold;
  font-size: 16px;
}
.side-image {
  height: 50px;
  margin-bottom: 15px;
  // background-color: rgb(206, 198, 198);
  position: relative;
  // background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  overflow: hidden;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 1px solid grey;
  }
  &__img {
    width: 100%;
  }
}
.main-image {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 350px;
}
</style>
