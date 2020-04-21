<template>
  <q-page>
    <div class="row">
      <div class="col-2" v-if="$q.screen.gt.sm"></div>

      <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
        <div class="row">
          <div class="col-12 q-pa-md">
            <div class="row  justify-between">
              <div class="col-shrink text-h5">Categories:</div>
              <div class="col-shrink q-mb-sm">
                <q-btn
                  color="green-6"
                  label="Add New Category"
                  icon="add"
                  :size="$q.platform.is.mobile ? 'sm' : 'md'"
                  @click="showAddCategoryCard = !showAddCategoryCard"
                />
              </div>
            </div>
            <div class="row" v-if="showAddCategoryCard">
              <div class="col-12">
                <q-card class="q-my-md  bg-grey-1">
                  <q-card-section>
                    <div class="row justify-between">
                      <div :class="$q.platform.is.mobile ? 'col-6' : 'col-4'">
                        <q-input
                          :style="{ backgroundColor: '#ffffff' }"
                          outlined
                          v-model="newCategoryName"
                          label="Category Name"
                        />
                      </div>
                      <div class="col-shrink ">
                        <div class="row items-center" style="height:100%;">
                          <div class="col-shrink">
                            <q-btn
                              color="green-8"
                              label="Add Category"
                              :size="$q.platform.is.mobile ? 'sm' : 'md'"
                              @click="createCategory"
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
                  v-for="(category, index) in allCategories"
                  :key="index"
                >
                  <q-card-section>
                    <div class="row justify-between">
                      <div class="col-shrink name">{{ category.name }}</div>
                      <div class="col-shrink">
                        <q-btn
                          color="red-8"
                          label="Delete Category"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="deleteCategory(category)"
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
              >Are you sure you want to delete "{{ selectedCategory.name }}"
              category?</span
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
  name: "Categories",
  data() {
    return {
      allCategories: [],
      showAddCategoryCard: false,
      newCategoryName: "",
      selectedCategory: {},
      showCondition: false
    };
  },
  methods: {
    async getCategories() {
      await this.$store.dispatch("fetchCategories");
      this.allCategories = JSON.parse(
        JSON.stringify(this.$store.getters.getCategories)
      );
    },
    async deleteCategory(category) {
      this.selectedCategory = category;
      this.showCondition = true;
    },
    async createCategory() {
      const new_category_name = this.newCategoryName;
      if (new_category_name.length == 0) {
        this.$q.notify({
          type: "negative",
          message: "Please write a Category name",
          timeout: 2000
        });
      } else {
        await api()
          .post(`categories/createCategory`, {
            name: new_category_name
          })
          .then(res => {
            if (res.data.status && res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: "Category created successfully",
                timeout: 2000
              });
              this.showAddCategoryCard = false;
              this.newCategoryName = "";
              this.getCategories();
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
        const category_id = this.selectedCategory.id;
        await api()
          .delete(`categories/deleteCategory/${category_id}`)
          .then(async res => {
            if (res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: res.data.message,
                timeout: 2000
              });
              await this.getCategories();
              this.selectedCategory = { name: "" };
            }
          });
      }
      this.showCondition = false;
    }
  },

  created() {
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 16px;
  font-weight: bold;
}
</style>
