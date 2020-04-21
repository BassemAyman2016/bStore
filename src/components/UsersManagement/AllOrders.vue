<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row text-h5">
              All Orders:
            </div>
            <div class="row">
              <q-card class=" bg-grey-1" style="width:100%;">
                <div class="column">
                  <q-list bordered class="rounded-borders">
                    <div
                      v-for="(order, index) in tempCurrentOrders"
                      :key="index"
                    >
                      <q-expansion-item expand-separator>
                        <template v-slot:header>
                          <q-item-section avatar>
                            <q-avatar
                              :icon="order.icon"
                              :color="order.color"
                              text-color="white"
                            />
                          </q-item-section>

                          <q-item-section>
                            <div class="row">
                              <div
                                class="col-shrink "
                                :class="{
                                  'q-pr-sm right-border': !$q.platform.is.mobile
                                }"
                              >
                                <div class="text-subtitle2">
                                  Order Number: #{{ order.id }}
                                </div>
                                <div class="text-caption">
                                  Date: {{ order.creation_date }}
                                </div>
                                <div class="text-caption">
                                  Time: {{ order.creation_time }}
                                </div>
                              </div>
                              <div
                                class="col-shrink "
                                :class="{
                                  'q-ml-sm ': !$q.platform.is.mobile
                                }"
                              >
                                <div class=" header">Customer Info:</div>
                                <div class="data ">
                                  Name: {{ order.Customer.first_name }}
                                  {{ order.Customer.last_name }}
                                </div>
                                <div class="data ">
                                  ID: {{ order.Customer.id }}
                                </div>
                              </div>
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
                                    {{ order.total_price }} EGP
                                  </div>
                                </div>
                              </div>
                              <div
                                :class="
                                  $q.platform.is.mobile ? 'col-4' : 'col-3'
                                "
                                v-if="order.Status == 'Pending'"
                              >
                                <div class="column justify-end">
                                  <div class="col-12 q-my-sm">
                                    <div class="row justify-center"></div>
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
                      <q-separator />
                    </div>
                  </q-list>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="showCancel" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to cancel Order #{{
                selectedOrder.id
              }}
              ?</span
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
import api from "../../store/api";
export default {
  name: "MyOrders",
  data() {
    return {
      totalPrice: 0,
      showPay: false,
      showCancel: false,
      createdOrderId: null,
      currentOrders: [],
      tempCurrentOrders: [],
      selectedOrder: { id: 0 }
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

    async paymentCardAction(value) {
      if (value == 2) {
        await this.$store
          .dispatch("payOrder", this.selectedOrder.id)
          .then(res => {
            this.$q.notify({
              type:
                res.status && res.status == "success" ? "positive" : "negative",
              message: res.message ? res.message : "Error Occured",
              timeout: 2000
            });
          });
        await this.getAllOrders();
      }
      this.showPay = false;
      this.selectedOrder = null;
    },
    async cancelCardAction(value) {
      if (value == 2) {
        const order_id = this.selectedOrder.id;
        await api()
          .put(`orders/adminCancelOrder/${order_id}`)
          .then(res => {
            if (res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: res.data.message,
                timeout: 2000
              });
            }
          })
          .catch(err => {
            this.$q.notify({
              type: "negative",
              message: err.response.data
                ? err.response.data.message
                : "Error Occured",
              timeout: 2000
            });
          });
        await this.getAllOrders();
      }
      this.showCancel = false;
      this.selectedOrder = { id: 0 };
    },
    async getAllOrders() {
      await api()
        .get("orders/getAllOrders")
        .then(res => {
          if (res.data.status == "success") {
            console.log("here");
            var holder = res.data.data;
            holder.forEach(order => {
              var timeStamp = order.created_at;
              var outputDate = timeStamp.substring(0, 10);
              order.creation_date = outputDate;
              var outputTime = timeStamp.substring(11, 19);
              order.creation_time = outputTime;

              if (!order.payed && !order.cancelled) {
                order.Status = "Pending";
                order.color = "yellow";
                order.icon = "receipt";
              }
              if (!order.payed && order.cancelled) {
                order.Status = "Cancelled";
                order.color = "red";
                order.icon = "close";
              }
              if (order.payed && !order.cancelled) {
                order.Status = "Payed";
                order.color = "green";
                order.icon = "check";
              }
              //   order.totalPrice = 0;
              //   order.products.forEach(itm => {
              //     order.totalPrice += itm.count * itm.product.price;
              //   });
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
    this.getAllOrders();
  }
};
</script>

<style lang="scss" scoped>
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
.header {
  font-size: 14px;
  font-weight: bold;
}
.data {
  font-size: 12px;
  //   font-weight: bold;
}
.right-border {
  border-right: 0.5px solid rgba(128, 128, 128, 0.534);
}
</style>
