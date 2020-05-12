<template>
  <div class="row">
    <div class="col-2" v-if="$q.screen.gt.sm"></div>
    <div class=" q-pa-md" :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
      <div class="row justify-center">
        <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
          <div class="row text-h5 q-mb-md">
            Edit Product
          </div>
          <div>
            <q-card class=" bg-grey-1 row q-mb-sm" style="width:100%;">
              <div class="col-12">
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col  ">
                      <q-input
                        bg-color="white"
                        outlined
                        v-model="selectedProduct.name"
                        label="Product Name"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col  ">
                      <q-input
                        bg-color="white"
                        outlined
                        v-model="selectedProduct.description"
                        label="Description"
                        type="textarea"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col  ">
                      <q-input
                        bg-color="white"
                        outlined
                        v-model="selectedProduct.price"
                        label="Price"
                        type="number"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col  ">
                      <q-input
                        bg-color="white"
                        outlined
                        v-model="selectedProduct.stock"
                        label="Stock"
                        type="number"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class=" col-12 ">
                  <div class="row items-center">
                    <div class="col-6">
                      <div class="column">
                        <div class="col q-mb-md">
                          <Dropdown
                            :options="availableCategories"
                            :placeholder="'Category'"
                            @selected="dropdownInput($event, 'newCategory')"
                            :clearData="dataEraser"
                            :outsideValue="selectedProduct.Category"
                          />
                        </div>
                        <div class="col q-mb-md">
                          <Dropdown
                            :options="availableBrands"
                            :placeholder="'Brand'"
                            @selected="dropdownInput($event, 'newBrand')"
                            :clearData="dataEraser"
                            :outsideValue="selectedProduct.Brand"
                          />
                        </div>
                        <div class="col">
                          <Dropdown
                            :options="availableModels"
                            :placeholder="'Model'"
                            @selected="dropdownInput($event, 'newModel')"
                            :clearData="dataEraser"
                            :outsideValue="selectedProduct.Model"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-5 offset-1">
                      <div class="row">
                        <div
                          class="col-shrink"
                          v-for="(image, index) in selectedProduct.images"
                          :key="index"
                        >
                          <q-img
                            :src="image.img"
                            style="width: 100px"
                            :ratio="1"
                            spinner-color="white"
                          >
                            <q-btn
                              round
                              size="xs"
                              color="grey"
                              icon="close"
                              @click="removeImageClicked(image)"
                            ></q-btn
                          ></q-img>
                        </div>
                      </div>
                      <div class="row " style="font-size:12px;">
                        <div class="col-12 q-mb-sm">
                          Uploads
                          <q-toggle size="xs" v-model="value" />
                          Links
                        </div>
                        <div class="col-12" v-show="value">
                          <div
                            class="row justify-evenly items-center q-mb-sm"
                            v-for="(item, index) in imageLinks"
                            :key="item.distinctNumber"
                          >
                            <div class="col-9">
                              <q-input
                                bg-color="white"
                                outlined
                                dense
                                :label="'Link ' + (index + 1)"
                                type="text"
                                v-model="item.link"
                              />
                            </div>
                            <div class="col-2" v-if="index == 0">
                              <q-btn
                                round
                                dense
                                class="bg-green-14 text-white"
                                @click="addImageLink"
                                size="sm"
                                icon="add"
                              />
                            </div>
                            <div class="col-2" v-else>
                              <q-btn
                                round
                                dense
                                class="bg-red-8 text-white"
                                @click="removeImageLink(item)"
                                size="sm"
                                icon="remove"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-12" v-show="!value">
                          <div
                            class="row justify-evenly items-center q-mb-sm"
                            v-for="(item, index) in imageInputs"
                            :key="item.distinctNumber"
                          >
                            <div class="col-9">
                              <PictureInput
                                @change="imageUpload($event, item)"
                                width="150"
                                height="100"
                                accept="image/jpeg,image/png"
                                size="10"
                                :autoToggleAspectRatio="true"
                                :zIndex="0"
                                buttonClass="btn"
                                :hideChangeButton="true"
                              />
                            </div>
                            <div class="col-2" v-if="index == 0">
                              <q-btn
                                round
                                dense
                                class="bg-green-14 text-white"
                                @click="addImageInput"
                                size="sm"
                                icon="add"
                              />
                            </div>
                            <div class="col-2" v-else>
                              <q-btn
                                round
                                dense
                                class="bg-red-8 text-white"
                                @click="removeImageInput(item)"
                                size="sm"
                                icon="remove"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <q-btn-dropdown
                        color="blue-2"
                        text-color="grey-10"
                        :label="SelectedCategory ? SelectedCategory : 'Model'"
                        class="full-width"
                      >
                        <q-list>
                          <q-item
                            clickable
                            v-close-popup
                            @click="dataFilled('Student')"
                            v-for="(item, index) in availableModels"
                            dense
                            :key="index"
                          >
                            <q-item-section>
                              <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown> -->
                  </div>
                </q-card-section>
              </div>
              <div class="col-12">
                <div class="row justify-center " style="height:100%;">
                  <div class="col-shrink">
                    <div class="row">
                      <div class="col-shrink q-my-sm q-mx-xs">
                        <q-btn
                          dense
                          color="green-7"
                          label="Edit Product"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="updateProduct"
                        />
                      </div>

                      <div class="col-shrink q-my-sm q-mx-xs">
                        <q-btn
                          dense
                          color="primary"
                          label="Restore Images"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="restoreDeletedImages"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
          <q-dialog v-model="showImageDeleteCondition" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm"
                  >Are you sure you want to delete this image ?</span
                >
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="No"
                  color="primary"
                  v-close-popup
                  @click="deleteCardAction(1)"
                />
                <q-btn
                  flat
                  label="Yes"
                  color="primary"
                  @click="deleteCardAction(2)"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <div class="col-2" v-if="$q.screen.gt.sm"></div>
  </div>
</template>

<script>
import Dropdown from "./Fields/Dropdown";
import PictureInput from "vue-picture-input";
import api from "../store/api";
import cloudinary from "../store/cloudinary";
export default {
  name: "ProductEdit",
  components: {
    Dropdown,
    PictureInput
  },
  data() {
    return {
      selectedProduct: null,
      imageInputs: [{ distinctNumber: 0 }],
      imageLinks: [{ distinctNumber: 1000, link: "" }],
      globalVariable: 1,
      dataEraser: {},
      value: false,
      toBeDeletedImage: {},
      showImageDeleteCondition: false,
      distinctNumberGenerator: 2
    };
  },
  methods: {
    async deleteCardAction(value) {
      if (value == 2) {
        var image_id = this.toBeDeletedImage.id;
        var flag = false;
        await api()
          .delete(`product_images/deleteSingleImage/${image_id}`)
          .then(async res => {
            if (res.data.status && res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: "Image deleted successfully",
                timeout: 2000
              });
              flag = true;
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
      if (flag) await this.fetchCurrentProduct();
      this.showImageDeleteCondition = false;
    },
    removeImageClicked(imageOb) {
      this.toBeDeletedImage = imageOb;
      this.showImageDeleteCondition = true;
    },
    async fetchCurrentProduct() {
      var product_id = this.selectedProduct.id;
      await this.$store.dispatch("fetchCurrentProduct", product_id);
      this.setSelectedProduct();
    },
    setSelectedProduct() {
      var currentElement = JSON.parse(JSON.stringify(this.currentProduct));
      this.selectedProduct = currentElement;
      window.scrollTo(0, 0);
    },
    addImageInput() {
      this.imageInputs.push({ distinctNumber: this.distinctNumberGenerator++ });
    },
    removeImageInput(obj) {
      var inputIndex = -1;
      this.imageInputs.forEach((input, index) => {
        if (input.distinctNumber == obj.distinctNumber) {
          inputIndex = index;
        }
      });
      if (inputIndex !== -1) {
        this.imageInputs.splice(inputIndex, 1);
      }
    },
    addImageLink() {
      this.imageLinks.push({
        distinctNumber: this.distinctNumberGenerator++,
        link: ""
      });
    },
    removeImageLink(obj) {
      var inputIndex = -1;
      this.imageLinks.forEach((input, index) => {
        if (input.distinctNumber == obj.distinctNumber) {
          inputIndex = index;
        }
      });
      //console.log(inputIndex);
      if (inputIndex !== -1) {
        this.imageLinks.splice(inputIndex, 1);
      }
    },
    async updateProduct() {
      var apiObject = {};
      var editedProduct = this.selectedProduct;
      var vuexProduct = this.currentProduct;
      if (editedProduct.name !== vuexProduct.name)
        apiObject.name = editedProduct.name;
      if (editedProduct.description !== vuexProduct.description)
        apiObject.description = editedProduct.description;
      if (editedProduct.price !== vuexProduct.price)
        apiObject.price = editedProduct.price;
      if (editedProduct.stock !== vuexProduct.stock)
        apiObject.stock = editedProduct.stock;

      if (editedProduct.newCategory && editedProduct.newCategory.id)
        apiObject.category_id = editedProduct.newCategory.id;
      if (editedProduct.newBrand && editedProduct.newBrand.id)
        apiObject.brand_id = editedProduct.newBrand.id;
      if (editedProduct.newModel && editedProduct.newModel.id)
        apiObject.model_id = editedProduct.newModel.id;
      await api()
        .put(`products/editProduct/${editedProduct.id}`, apiObject)
        .then(async res => {
          if (res.data.status && res.data.status == "success") {
            this.$q.notify({
              type: "positive",
              message: res.data.message,
              timeout: 2000
            });
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
      var images = [];
      this.imageInputs.forEach(obj => {
        if (obj.image_url && obj.image_url.length > 0) {
          images.push(obj.image_url);
        }
        // console.log(JSON.parse(JSON.stringify(obj)));
      });
      this.imageLinks.forEach(obj => {
        if (obj.link && obj.link.length > 0) {
          images.push(obj.link);
        }
      });
      if (images.length > 0) {
        await api()
          .post(`product_images/insertImage/${editedProduct.id}`, {
            img: images
          })
          .then(async res => {
            if (res.data.status && res.data.status == "success") {
              this.$q.notify({
                type: "positive",
                message: res.data.message,
                timeout: 2000
              });
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
      await this.fetchCurrentProduct();
    },
    clearAllData() {},
    async restoreDeletedImages() {
      var product_id = this.selectedProduct.id;
      var flag = false;
      await api()
        .put(`product_images/restoreDeletedImages/${product_id}`)
        .then(async res => {
          if (res.data.status && res.data.status == "success") {
            this.$q.notify({
              type: "positive",
              message: "Images restored successfully",
              timeout: 2000
            });
            flag = true;
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

      if (flag) await this.fetchCurrentProduct();
    },
    dropdownInput(value, property) {
      this.selectedProduct[property] = value;
    },
    async imageUpload(image, imageInput) {
      var inputIndex = -1;
      this.imageInputs.forEach((input, index) => {
        if (input.distinctNumber == imageInput.distinctNumber) {
          inputIndex = index;
        }
      });
      const form = new FormData();
      form.append("file", image);
      const uploadImageAPI = await cloudinary(form);
      if (uploadImageAPI.status && uploadImageAPI.status == "success")
        if (inputIndex !== -1) {
          this.imageInputs[inputIndex].image_url = uploadImageAPI.link;
        }
    }
  },
  created() {
    this.setSelectedProduct();
  },
  computed: {
    currentProduct() {
      return this.$store.getters.getSelectedProduct;
    },
    availableCategories() {
      return this.$store.getters.getCategories;
    },
    availableBrands() {
      return this.$store.getters.getBrands;
    },
    availableModels() {
      return this.$store.getters.getModels;
    }
  }
};
</script>

<style lang="scss" scoped></style>
