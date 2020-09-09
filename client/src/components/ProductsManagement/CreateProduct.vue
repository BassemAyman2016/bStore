<template>
  <div class="row">
    <div class="col-2" v-if="$q.screen.gt.sm"></div>
    <div class=" q-pa-md" :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
      <div class="row justify-center">
        <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
          <div class="row text-h5 q-mb-md">
            Add New Product
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
                        v-model="name"
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
                        v-model="description"
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
                        v-model="price"
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
                        v-model="stock"
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
                            @selected="dropdownInput($event, 'category')"
                            :clearData="dataEraser"
                            :maxItem="availableCategories.length"
                          />
                        </div>
                        <div class="col q-mb-md">
                          <Dropdown
                            :options="availableBrands"
                            :placeholder="'Brand'"
                            @selected="dropdownInput($event, 'brand')"
                            :clearData="dataEraser"
                            :maxItem="availableBrands.length"
                          />
                        </div>
                        <div class="col">
                          <Dropdown
                            :options="availableModels"
                            :placeholder="'Model'"
                            @selected="dropdownInput($event, 'model')"
                            :clearData="dataEraser"
                            :maxItem="availableModels.length"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-5 offset-1">
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
                          color="green-7"
                          label="Create Product"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="createNewProduct"
                        />
                      </div>
                      <div class="col-shrink q-my-sm q-mx-xs">
                        <q-btn
                          color="negative"
                          label="Clear"
                          :size="$q.platform.is.mobile ? 'xs' : 'md'"
                          @click="clearAllData"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2" v-if="$q.screen.gt.sm"></div>
  </div>
</template>

<script>
import Dropdown from "../Fields/Dropdown";
import PictureInput from "vue-picture-input";
import cloudinary from "../../store/cloudinary";
import api from "../../store/api";
export default {
  name: "CreateProduct",
  components: {
    Dropdown,
    PictureInput
  },
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: null,
      brand: null,
      model: null,
      imageInputs: [{ distinctNumber: 0 }],
      imageLinks: [{ distinctNumber: 10, link: "" }],
      distinctNumberGenerator: 1,
      value: false,
      dataEraser: false
    };
  },
  methods: {
    async createNewProduct() {
      if (
        !this.name ||
        this.name.length == 0 ||
        !this.description ||
        this.description.length == 0 ||
        !this.price ||
        this.price.length == 0 ||
        !this.stock ||
        this.stock.length == 0 ||
        !this.category ||
        !this.brand ||
        !this.model
      ) {
        this.$q.notify({
          type: "negative",
          message: "Parameter(s) missing",
          timeout: 2000
        });
        return;
      }
      var apiObject = {
        name: this.name && this.name.length > 0 ? this.name : null,
        description:
          this.description && this.description.length > 0
            ? this.description
            : null,
        price: this.price && this.price.length > 0 ? this.price : null,
        stock: this.stock && this.stock.length > 0 ? this.stock : null,
        category_id:
          this.category && this.category.name ? this.category.id : null,
        brand_id: this.brand && this.brand.name ? this.brand.id : null,
        model_id: this.model && this.model.name ? this.model.id : null
      };
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
      apiObject.images = images;
      if (images.length == 0) {
        this.$q.notify({
          type: "negative",
          message: "Product images are missing",
          timeout: 2000
        });
        return;
      }
      await api()
        .post(`products/createProduct`, apiObject)
        .then(res => {
          if (res.data.status && res.data.status == "success") {
            this.$q.notify({
              type: "positive",
              message: "Product created successfully",
              timeout: 2000
            });
            this.clearAllData();
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
      if (inputIndex !== -1) {
        this.imageLinks.splice(inputIndex, 1);
      }
    },
    dropdownInput(value, slot) {
      this[slot] = value;
    },
    clearAllData() {
      this.name = "";
      this.description = "";
      this.price = "";
      this.stock = "";
      this.category = null;
      this.brand = null;
      this.model = null;
      this.imageInputs = [{ distinctNumber: this.distinctNumberGenerator++ }];
      this.imageLinks = [
        { distinctNumber: this.distinctNumberGenerator++, link: "" }
      ];
      this.dataEraser = true;
      setTimeout(() => {
        this.dataEraser = false;
      }, 100);
    }
    // imageLinkInput(value, dis) {
    //   var inputIndex = -1;
    //   this.imageLinks.forEach((input, index) => {
    //     if (input.distinctNumber == dis) {
    //       inputIndex = index;
    //     }
    //   });
    //   if (inputIndex !== -1) {
    //     this.imageLinks[inputIndex].link = value;
    //   }
    // }
  },
  computed: {
    availableCategories() {
      return this.$store.getters.getCategories;
    },
    availableBrands() {
      return this.$store.getters.getBrands;
    },
    availableModels() {
      return this.$store.getters.getModels;
    }
  },
  created() {
    window.scrollTo(0, 0);
  }
};
</script>

<style></style>
