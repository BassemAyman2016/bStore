<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row text-h5">
              Orders:
            </div>
            <div class="row">
              <q-card class=" bg-grey-1" style="width:100%;">
                <div class="column">
                  <q-list bordered class="rounded-borders">
                    <q-expansion-item
                      v-for="(order, index) in tempCurrentOrders"
                      :key="index"
                      expand-separator
                    >
                      <template v-slot:header>
                        <q-item-section avatar>
                          <q-avatar
                            :icon="order.icon"
                            :color="order.color"
                            text-color="white"
                          />
                        </q-item-section>

                        <q-item-section>
                          <div class="text-subtitle2">
                            Order Number: #{{ order.id }}
                          </div>
                          <div class="text-caption">
                            Date: {{ order.creation_date }}
                          </div>
                          <div class="text-caption">
                            Time: {{ order.creation_time }}
                          </div>
                        </q-item-section>

                        <q-item-section side>
                          <div
                            :class="'text-bold text-' + order.color"
                            background-color="white"
                          >
                            {{ order.Status }}
                          </div>
                        </q-item-section>
                      </template>
                      <q-card>
                        <q-card-section>
                          <div class="row">
                            <div
                              :class="
                                $q.platform.is.mobile
                                  ? order.Status == 'Pending'
                                    ? 'col-8'
                                    : 'col-12'
                                  : order.Status == 'Pending'
                                  ? 'col-9'
                                  : 'col-12'
                              "
                            >
                              <div
                                v-for="(item, index) in order.products"
                                :key="index"
                              >
                                <div
                                  class="row"
                                  :class="{
                                    'q-mb-sm':
                                      index == order.products.length - 1
                                  }"
                                >
                                  <div class="col-shrink">
                                    {{ item.count }} x {{ item.product.name }}
                                  </div>
                                  <div class="col" style="position:relative">
                                    <div class="dotted-line"></div>
                                  </div>
                                  <div class="col-shrink">
                                    {{ item.count * item.product.price }}EGP
                                  </div>
                                </div>
                              </div>
                              <div class="row q-mb-sm">
                                <div class="col" style="position:relative">
                                  <div class="dotted-line2"></div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-shrink">
                                  Total Price:
                                </div>
                                <div class="col" style="position:relative">
                                  <div class="dotted-line"></div>
                                </div>
                                <div class="col-shrink">
                                  {{ order.totalPrice }} EGP
                                </div>
                              </div>
                            </div>
                            <div
                              :class="$q.platform.is.mobile ? 'col-4' : 'col-3'"
                              v-if="order.Status == 'Pending'"
                            >
                              <div class="column justify-end">
                                <div class="col-12 q-my-sm">
                                  <div class="row justify-center">
                                    <q-btn
                                      color="green-6"
                                      label="Pay Order"
                                      :size="
                                        $q.platform.is.mobile ? 'sm' : 'md'
                                      "
                                      :dense="$q.platform.is.mobile"
                                      @click="payOrderClicked(order)"
                                    />
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="row justify-center">
                                    <q-btn
                                      color="red-8"
                                      label="Cancel Order"
                                      :dense="$q.platform.is.mobile"
                                      :size="
                                        $q.platform.is.mobile ? 'sm' : 'md'
                                      "
                                      @click="cancelOrderClicked(order)"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="showPay" persistent>
        <q-card style="width: 300px">
          <q-card-section class="row items-center">
            <PaymentCard
              :currentOrder="this.selectedOrder"
              @orderPaymentSuccess="paymentCardAction"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="cancel"
              color="primary"
              v-close-popup
              @click="paymentCardAction"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showCancel" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to cancel your order ?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="cancelCardAction(1)"
            />
            <q-btn
              flat
              label="Yes"
              color="primary"
              @click="cancelCardAction(2)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="col-2" v-if="$q.screen.gt.sm"></div>
    </div>
  </q-page>
</template>

<script>
import api from "../store/api";
import PaymentCard from "./PayementCard";
export default {
  name: "MyOrders",
  components: {
    PaymentCard
  },
  data() {
    return {
      totalPrice: 0,
      showPay: false,
      showCancel: false,
      createdOrderId: null,
      currentOrders: [],
      tempCurrentOrders: [],
      selectedOrder: null
    };
  },
  methods: {
    cancelOrderClicked(order) {
      this.selectedOrder = order;
      this.showCancel = true;
    },
    payOrderClicked(order) {
      this.selectedOrder = order;
      this.showPay = true;
    },

    async paymentCardAction() {
      await this.getMyOrders();
      this.showPay = false;
      this.selectedOrder = null;
    },
    async cancelCardAction(value) {
      if (value == 2) {
        await this.$store
          .dispatch("cancelOrder", this.selectedOrder.id)
          .then(res => {
            this.$q.notify({
              type:
                res.status && res.status == "success" ? "positive" : "negative",
              message: res.message ? res.message : "Error Occured",
              timeout: 2000
            });
          });
        await this.getMyOrders();
      }
      this.showCancel = false;
      this.selectedOrder = null;
    },
    async getMyOrders() {
      await api()
        .get("/orders/getCustomerOrders")
        .then(res => {
          if (res.data.status == "success") {
            var holder = res.data.data;
            holder.forEach(order => {
              var timeStamp = order.created_at;
              var outputDate = timeStamp.substring(0, 10);
              order.creation_date = outputDate;
              var outputTime = timeStamp.substring(11, 19);
              order.creation_time = outputTime;

              if (!order.paid && !order.cancelled) {
                order.Status = "Pending";
                order.color = "yellow";
                order.icon = "receipt";
              }
              if (!order.paid && order.cancelled) {
                order.Status = "Cancelled";
                order.color = "red";
                order.icon = "close";
              }
              if (order.paid && !order.cancelled) {
                order.Status = "Paid";
                order.color = "green";
                order.icon = "check";
              }
              order.totalPrice = 0;
              order.products.forEach(itm => {
                order.totalPrice += itm.count * itm.product.price;
              });
            });
            this.tempCurrentOrders = holder;
            this.currentOrders = holder;
          }
        });
    }
  },
  computed: {
    currentCart() {
      return this.$store.getters.getCart;
    }
  },
  created() {
    this.getMyOrders();
  }
};
</script>

<style lang="scss" scoped>
.first {
  float: left;
  margin-right: 1em;
}
.price {
  float: right;
  margin-left: 1em;
}
.list:after {
  content: "";
  border-bottom: dotted;
  display: block;
  overflow: hidden;
  height: 0.6em;
}
.dotted-line {
  border-bottom: dashed 1.2px;
  position: absolute;
  top: 50%;
  width: 96%;
  right: 2%;
}
.dotted-line2 {
  border-bottom: solid 1.2px;
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
