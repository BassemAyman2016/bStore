<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row  justify-between">
              <div class="col-shrink text-h5">Models:</div>
              <div class="col-shrink q-mb-sm">
                <q-btn
                  color="green-6"
                  label="Add New Model"
                  icon="add"
                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                  @click="showAddModelCard = !showAddModelCard"
                />
              </div>
            </div>
            <div class="row" v-if="showAddModelCard">
              <div class="col-12">
                <q-card class="q-my-md  bg-grey-1">
                  <q-card-section>
                    <div class="row justify-between">
                      <div :class="$q.platform.is.mobile ? 'col-6' : 'col-4'">
                        <q-input
                          :style="{ backgroundColor: '#ffffff' }"
                          outlined
                          v-model="newModelName"
                          label="Model Name"
                        />
                      </div>
                      <div class="col-shrink ">
                        <div class="row items-center" style="height:100%;">
                          <div class="col-shrink">
                            <q-btn
                              color="green-8"
                              label="Add Model"
                              :size="$q.platform.is.mobile ? 'sm' : 'md'"
                              @click="createModel"
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
                  v-for="(model, index) in allModels"
                  :key="index"
                >
                  <q-card-section>
                    <div class="row justify-between">
                      <div class="col-shrink name">{{ model.name }}</div>
                      <div class="col-shrink">
                        <q-btn
                          color="red-8"
                          label="Delete Model"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="deleteModel(model)"
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
              >Are you sure you want to delete "{{ selectedModel.name }}"
              model?</span
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
  name: "Models",
  data() {
    return {
      allModels: [],
      showAddModelCard: false,
      newModelName: "",
      selectedModel: {},
      showCondition: false
    };
  },
  methods: {
    async getModels() {
      await this.$store.dispatch("fetchModels");
      var models = JSON.parse(JSON.stringify(this.$store.getters.getModels));
      models = models.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
      this.allModels = models;
    },
    async deleteModel(Model) {
      this.selectedModel = Model;
      this.showCondition = true;
    },
    async createModel() {
      const new_Model_name = this.newModelName;
      if (new_Model_name.length == 0) {
        this.$q.notify({
          type: "negative",
          message: "Please write a Model name",
          timeout: 2000
        });
      } else {
        await api()
          .post(`models/createModel`, {
            name: new_Model_name
          })
          .then(res => {
            if (res.data.status && res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: "Model created successfully",
                timeout: 2000
              });
              this.showAddModelCard = false;
              this.newModelName = "";
              this.getModels();
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
        const Model_id = this.selectedModel.id;
        await api()
          .delete(`models/deleteModel/${Model_id}`)
          .then(async res => {
            if (res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: res.data.message,
                timeout: 2000
              });
              await this.getModels();
              this.selectedModel = { name: "" };
            }
          });
      }
      this.showCondition = false;
    }
  },

  created() {
    this.getModels();
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 16px;
  font-weight: bold;
}
</style>
