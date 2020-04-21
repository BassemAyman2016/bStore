<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row  justify-between">
              <div class="col-shrink text-h5">Brands:</div>
              <div class="col-shrink q-mb-sm">
                <q-btn
                  color="green-6"
                  label="Add New Brand"
                  icon="add"
                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                  @click="showAddBrandCard = !showAddBrandCard"
                />
              </div>
            </div>
            <div class="row" v-if="showAddBrandCard">
              <div class="col-12">
                <q-card class="q-my-md  bg-grey-1">
                  <q-card-section>
                    <div class="row justify-between">
                      <div :class="$q.platform.is.mobile ? 'col-6' : 'col-4'">
                        <q-input
                          :style="{ backgroundColor: '#ffffff' }"
                          outlined
                          v-model="newBrandName"
                          label="Brand Name"
                        />
                      </div>
                      <div class="col-shrink ">
                        <div class="row items-center" style="height:100%;">
                          <div class="col-shrink">
                            <q-btn
                              color="green-8"
                              label="Add Brand"
                              :size="$q.platform.is.mobile ? 'sm' : 'md'"
                              @click="createBrand"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-card
                  class="q-my-md  bg-grey-1"
                  v-for="(brand, index) in allBrands"
                  :key="index"
                >
                  <q-card-section>
                    <div class="row justify-between">
                      <div class="col-shrink name">{{ brand.name }}</div>
                      <div class="col-shrink">
                        <q-btn
                          color="red-8"
                          label="Delete Brand"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="deleteBrand(brand)"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="showCondition" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to delete "{{ selectedBrand.name }}"
              brand?</span
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

      <div class="col-2" v-if="$q.screen.gt.sm"></div>
    </div>
  </q-page>
</template>

<script>
import api from "../../store/api";
export default {
  name: "Brands",
  data() {
    return {
      allBrands: [],
      showAddBrandCard: false,
      newBrandName: "",
      selectedBrand: {},
      showCondition: false
    };
  },
  methods: {
    async getBrands() {
      await this.$store.dispatch("fetchBrands");
      this.allBrands = JSON.parse(
        JSON.stringify(this.$store.getters.getBrands)
      );
    },
    async deleteBrand(Brand) {
      this.selectedBrand = Brand;
      this.showCondition = true;
    },
    async createBrand() {
      const new_Brand_name = this.newBrandName;
      if (new_Brand_name.length == 0) {
        this.$q.notify({
          type: "negative",
          message: "Please write a Brand name",
          timeout: 2000
        });
      } else {
        await api()
          .post(`brands/createBrand`, {
            name: new_Brand_name
          })
          .then(res => {
            if (res.data.status && res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: "Brand created successfully",
                timeout: 2000
              });
              this.showAddBrandCard = false;
              this.newBrandName = "";
              this.getBrands();
            }
          })
          .catch(err => {
            const response = err.response.data;
            this.$q.notify({
              type: "negative",
              message: response.message,
              timeout: 2000
            });
          });
      }
    },
    async deleteAction(value) {
      if (value == 2) {
        const Brand_id = this.selectedBrand.id;
        await api()
          .delete(`brands/deleteBrand/${Brand_id}`)
          .then(async res => {
            if (res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: res.data.message,
                timeout: 2000
              });
              await this.getBrands();
              this.selectedBrand = { name: "" };
            }
          });
      }
      this.showCondition = false;
    }
  },

  created() {
    this.getBrands();
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 16px;
  font-weight: bold;
}
</style>
