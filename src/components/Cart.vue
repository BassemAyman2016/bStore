<template>
  <div class="row">
    <div class="col-2" v-if="$q.screen.gt.sm"></div>

    <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
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
        <div class="col-12 q-pa-md">
          <div class="row text-h5">
            Cart:
          </div>
          <div class="row">
            <q-card class=" bg-grey-1" style="width:100%;">
              <div class="column">
                <div
                  class="col q-my-md "
                  v-for="(cartItem, index) in currentCart"
                  :key="index"
                >
                  <q-card-section>
                    <div class="row">
                      <div class="col-xs-4 col-md-2">
                        <img
                          :src="cartItem.product.images[0].img"
                          style="width:100px;height:100px;"
                          :ratio="1"
                          basic
                          spinner-color="white"
                          class="rounded-borders"
                        />
                      </div>
                      <div class="col-xs-8 col-md-10">
                        <div class="row jusitify-between">
                          <div class="col">
                            <div>Name: {{ cartItem.product.name }}</div>
                            <div>Count: {{ cartItem.count }}</div>
                            <div>
                              Price of One: {{ cartItem.product.price }} EGP
                            </div>
                            <div>
                              Total Price:
                              {{ cartItem.count * cartItem.product.price }} EGP
                            </div>
                          </div>
                          <div class="col-shrink ">
                            <div class="row items-center" style="height:100%">
                              <q-btn
                                color="red-8"
                                :label="$q.screen.gt.xs ? 'Remove Item' : ''"
                                :round="$q.screen.gt.xs ? false : true"
                                icon="remove"
                                :size="$q.screen.gt.xs ? 'md' : 'sm'"
                                @click="removeItemFromCart(index)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator v-if="index < currentCart.length - 1" />
                </div>
              </div>
            </q-card>
            <q-card class=" bg-grey-1 q-mt-sm" style="width:100%; ">
              <q-card-section>
                <div class="row justify-end items-center">
                  <div
                    class="col-shrink text-weight-bold"
                    :class="{ 'small-font': $q.platform.is.mobile }"
                  >
                    Total Order Price: {{ totalPrice }} EGP
                  </div>
                  <div class="col-shrink q-mx-xs ">
                    <q-btn
                      color="amber-6"
                      label="Create Order"
                      :size="$q.screen.gt.xs ? 'md' : 'sm'"
                      @click="createOrder"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showPayCondition" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm">Would you like to pay for your order ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="No , continue browsing"
            color="primary"
            v-close-popup
            @click="paymentCardAction(1)"
          />
          <q-btn
            flat
            label="Yes"
            color="primary"
            @click="paymentCardAction(2)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showPaymentCard" persistent>
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <!-- <span class="q-ml-sm">Would you like to pay for your order ?</span> -->
          <PaymentCard
            :currentOrder="this.createdOrder"
            @orderPaymentSuccess="paymentCardAction"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="cancel"
            color="primary"
            v-close-popup
            @click="stripeCardAction"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="col-2" v-if="$q.screen.gt.sm"></div>
  </div>
</template>

<script>
import PaymentCard from "./PayementCard";
export default {
  name: "Cart",
  components: {
    PaymentCard
  },
  data() {
    return {
      totalPrice: 0,
      showPayCondition: false,
      createdOrder: null,
      showPaymentCard: false
    };
  },
  methods: {
    calculateTotalPrice() {
      var temp = 0;
      this.currentCart.forEach(item => {
        temp += item.product.price * item.count;
      });
      this.totalPrice = temp;
    },
    async createOrder() {
      await this.$store.dispatch("createOrder").then(res => {
        if (res.id) this.createdOrder = res;
        this.$q.notify({
          type: res.status && res.status == "success" ? "positive" : "negative",
          message: res.message ? res.message : "Error Occured",
          timeout: 2000
        });
        if (res.status && res.status == "success") this.showPayCondition = true;
      });
    },
    removeItemFromCart(index) {
      this.$store.commit("removeFromCart", index);
      this.calculateTotalPrice();
    },
    async paymentCardAction(value) {
      if (value == 2) {
        // await this.$store
        //   .dispatch("payOrder", this.createdOrder)
        //   .then(res => {
        //     this.$q.notify({
        //       type:
        //         res.status && res.status == "success" ? "positive" : "negative",
        //       message: res.message ? res.message : "Error Occured",
        //       timeout: 2000
        //     });
        //   });
        this.showPaymentCard = true;
      } else {
        setTimeout(() => {
          this.$store.commit("clearCart");
          this.$router.push({ name: "Products" });
        });
      }
      this.showPayCondition = false;
    },
    stripeCardAction() {
      this.$store.commit("clearCart");
      this.$router.push({ name: "Products" });
      this.showPaymentCard = false;
    }
  },
  computed: {
    currentCart() {
      return this.$store.getters.getCart;
    }
  },
  created() {
    this.calculateTotalPrice();
  }
};
</script>

<style lang="scss" scoped>
.small-font {
  font-size: 12px;
}
</style>
