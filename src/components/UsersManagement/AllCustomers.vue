<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row justify-between items-center q-mb-sm">
              <div
                class="col-shrink"
                :class="{ 'text-h5': !$q.platform.is.mobile }"
              >
                All Customers:
              </div>
              <div class="col-shrink">
                <SearchField
                  :labelName="'Search by ID'"
                  @searchEvent="searchTextInserted"
                />
              </div>
            </div>
            <div class="row">
              <q-card class=" bg-grey-1" style="width:100%;">
                <div class="column">
                  <q-list bordered class="rounded-borders">
                    <div
                      v-for="(customer, index) in outputCustomers"
                      :key="index"
                    >
                      <q-expansion-item expand-separator>
                        <template v-slot:header>
                          <q-item-section avatar>
                            <q-avatar
                              icon="person"
                              :color="customer.color"
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
                                  Name: {{ customer.first_name }}
                                  {{ customer.last_name }}
                                </div>
                                <div class="text-caption">
                                  ID: {{ customer.id }}
                                </div>
                              </div>
                            </div>
                          </q-item-section>

                          <q-item-section side>
                            <div
                              :class="'text-bold text-' + customer.color"
                              background-color="white"
                            >
                              {{ customer.Status }}
                            </div>
                          </q-item-section>
                        </template>
                        <q-card>
                          <q-card-section>
                            <div class="row justify-between q-mb-sm">
                              <div class="col-shrink">
                                Orders:
                              </div>
                              <div class="col-shrink">
                                <q-btn
                                  color="red-8"
                                  label="Deactivate Account"
                                  dense
                                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                                  @click="deactivateAccountClicked(customer)"
                                  v-if="customer.Status == 'Active'"
                                />
                                <q-btn
                                  color="green-8"
                                  label="Activate Account"
                                  dense
                                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                                  @click="activateAccountClicked(customer)"
                                  v-else
                                />
                                <q-btn
                                  color="red-10"
                                  label="Delete Account"
                                  dense
                                  class="q-ml-sm"
                                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                                  @click="deleteAccountClicked(customer)"
                                />
                              </div>
                            </div>
                            <div class="row ">
                              <q-card
                                class="col-md-3 col-xs-12 bg-grey-1 q-mb-sm"
                                v-for="(order, index) in customer.orders"
                                :key="index"
                              >
                                <div class="column">
                                  <div>
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
                                                'q-pr-sm right-border': !$q
                                                  .platform.is.mobile
                                              }"
                                            >
                                              <div class="text-subtitle2">
                                                Order Number: #{{ order.id }}
                                              </div>
                                              <div class="text-caption">
                                                Date:
                                                {{ order.creation_date }}
                                              </div>
                                              <div class="text-caption">
                                                Time:
                                                {{ order.creation_time }}
                                              </div>
                                            </div>
                                          </div>
                                        </q-item-section>
                                      </template>
                                      <q-card>
                                        <q-card-section>
                                          <div class="row">
                                            <div class="col-12">
                                              <div
                                                v-for="(item,
                                                index) in order.products"
                                                :key="index"
                                              >
                                                <div
                                                  class="row"
                                                  :class="{
                                                    'q-mb-sm':
                                                      index ==
                                                      order.products.length - 1
                                                  }"
                                                >
                                                  <div class="col-shrink">
                                                    {{ item.count }} x
                                                    {{ item.product.name }}
                                                  </div>
                                                  <div
                                                    class="col"
                                                    style="position:relative"
                                                  >
                                                    <div
                                                      class="dotted-line"
                                                    ></div>
                                                  </div>
                                                  <div class="col-shrink">
                                                    {{
                                                      item.count *
                                                        item.product.price
                                                    }}EGP
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="row q-mb-sm">
                                                <div
                                                  class="col"
                                                  style="position:relative"
                                                >
                                                  <div
                                                    class="dotted-line2"
                                                  ></div>
                                                </div>
                                              </div>
                                              <div class="row">
                                                <div class="col-shrink">
                                                  Total Price:
                                                </div>
                                                <div
                                                  class="col"
                                                  style="position:relative"
                                                >
                                                  <div
                                                    class="dotted-line"
                                                  ></div>
                                                </div>
                                                <div class="col-shrink">
                                                  {{ order.total_price }} EGP
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </q-card-section>
                                      </q-card>
                                    </q-expansion-item>
                                    <q-separator />
                                  </div>
                                </div>
                              </q-card>
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

      <q-dialog v-model="showActivateCard" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to activate
              {{ selectedCustomer.first_name }}'s Account ?</span
            >
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="activateCardActionClicked(1)"
            />
            <q-btn
              flat
              label="Yes"
              color="primary"
              @click="activateCardActionClicked(2)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showDeactivateCard" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to deactivate
              {{ selectedCustomer.first_name }}'s Account ?</span
            >
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="deactivateCardActionClicked(1)"
            />
            <q-btn
              flat
              label="Yes"
              color="primary"
              @click="deactivateCardActionClicked(2)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showDeleteCard" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to completely delete
              {{ selectedCustomer.first_name }}'s Account ?</span
            >
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="No"
              color="primary"
              v-close-popup
              @click="deleteCardActionClicked(1)"
            />
            <q-btn
              flat
              label="Yes"
              color="primary"
              @click="deleteCardActionClicked(2)"
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
import SearchField from "../Fields/SearchField";
export default {
  name: "AllCustomers",
  components: {
    SearchField
  },
  data() {
    return {
      allCustomers: [],
      showCancel: false,
      selectedCustomer: {},
      showDeactivateCard: false,
      showActivateCard: false,
      showDeleteCard: false,
      searchValue: ""
    };
  },
  methods: {
    async fetchAllCustomers() {
      await api()
        .get("customers/getAllCustomers")
        .then(res => {
          if (res.data.status && res.data.status == "success") {
            var customersData = res.data.data;
            customersData.forEach(cust => {
              if (cust.confirmed && !cust.deleted) {
                cust.Status = "Active";
                cust.color = "primary";
              }
              if (!cust.confirmed && !cust.deleted) {
                cust.Status = "Unconfirmed";
                cust.color = "amber-6";
              }
              if (cust.deleted) {
                cust.Status = "Deactivated";
                cust.color = "red";
              }
              if (!cust.color) {
                cust.color = "grey";
                cust.Status = "undefiend";
              }
              cust.orders.forEach(order => {
                var timeStamp = order.created_at;
                var outputDate = timeStamp.substring(0, 10);
                order.creation_date = outputDate;
                var outputTime = timeStamp.substring(11, 19);
                var hoursPart = parseInt(outputTime.substring(0,2))
                if(hoursPart<22){
                  hoursPart+=2
                }else{
                  hoursPart==22?hoursPart='00':hoursPart='01'
                  var currentDate = new Date(outputDate)
                  var newDate = new Date()
                  newDate.setDate(currentDate.getDate() + 1);
                  var dateString = newDate.toISOString().substring(0, 10).toString()
                  order.creation_date = dateString;
                }
                order.creation_time = hoursPart+outputTime.substring(2,10);
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
                //   order.totalPrice = 0;
                //   order.products.forEach(itm => {
                //     order.totalPrice += itm.count * itm.product.price;
                //   });
              });
            });
            this.allCustomers = [];
            setTimeout(() => {
              this.allCustomers = customersData;
            }, 100);
          }
        });
    },

    deactivateAccountClicked(customer) {
      this.selectedCustomer = customer;
      this.showDeactivateCard = true;
    },
    activateAccountClicked(customer) {
      this.selectedCustomer = customer;
      this.showActivateCard = true;
    },
    deleteAccountClicked(customer) {
      this.selectedCustomer = customer;
      this.showDeleteCard = true;
    },
    async deactivateCardActionClicked(value) {
      if (value == 2) {
        const customer_id = this.selectedCustomer.id;
        await api()
          .delete(`admins/deactivateCustomer/${customer_id}`)
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
        await this.fetchAllCustomers();
      }
      this.showDeactivateCard = false;
    },
    async activateCardActionClicked(value) {
      if (value == 2) {
        const customer_id = this.selectedCustomer.id;
        await api()
          .put(`admins/activateCustomer/${customer_id}`)
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
        await this.fetchAllCustomers();
      }
      this.showActivateCard = false;
    },
    async deleteCardActionClicked(value) {
      if (value == 2) {
        const customer_id = this.selectedCustomer.id;
        await api()
          .delete(`admins/deleteCustomer/${customer_id}`)
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
        await this.fetchAllCustomers();
      }
      this.showDeleteCard = false;
    },
    searchTextInserted(value) {
      this.searchValue = value;
    }
  },
  computed: {
    outputCustomers() {
      return this.allCustomers.filter(customer => {
        if (this.searchValue.length > 0) {
          return customer.id == this.searchValue;
        }
        return true;
      });
    }
  },
  created() {
    this.fetchAllCustomers();
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
</style>
