<template>
  <div class="row">
    <div class="col-2" v-if="$q.screen.gt.sm"></div>

    <div :class="$q.screen.gt.sm ? 'col-8' : 'col-12'">
      <div class="row">
        <div class="col-12 q-pa-md">
          <div class="row text-h5">
            Profile
          </div>
          <div>
            <q-card class=" bg-grey-1 row" style="width:100%;">
              <div class="col-8">
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col-shrink q-mr-sm ">
                      <span>First Name: </span>
                    </div>
                    <div class="col">{{ profileData.first_name }}</div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12">
                  <div class="row">
                    <div class="col-shrink q-mr-sm">
                      <span>Last Name: </span>
                    </div>
                    <div class="col">{{ profileData.last_name }}</div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12">
                  <div class="row">
                    <div class="col-shrink q-mr-sm"><span>Address: </span></div>
                    <div class="col">{{ profileData.address }}</div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12">
                  <div class="row">
                    <div class="col-shrink q-mr-sm">
                      <span>Phone Number: </span>
                    </div>
                    <div class="col">{{ profileData.phone_number }}</div>
                  </div>
                </q-card-section>
              </div>
              <div class="col-4">
                <div class="row content-center" style="height:100%;">
                  <div class="col-12 q-my-sm">
                    <div class="row justify-center">
                      <q-btn
                        color="primary"
                        label="Edit Profile"
                        :size="$q.platform.is.mobile ? 'sm' : 'md'"
                        @click="editProfileClicked"
                      />
                    </div>
                  </div>
                  <div class="col-12 q-my-sm">
                    <div class="row justify-center">
                      <q-btn
                        color="negative"
                        label="Deactivate Account"
                        :size="$q.platform.is.mobile ? 'xs' : 'md'"
                        @click="deactivateClicked"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <div
          class="col-12 q-pa-md animated slideInDown"
          v-if="showEditProfileCard"
        >
          <div class="row text-h5">
            Edit Profile
          </div>
          <div>
            <q-card class=" bg-grey-1 row" style="width:100%;">
              <div class="col-12">
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        outlined
                        v-model="edited_first_name"
                        label="First Name"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        outlined
                        v-model="edited_last_name"
                        label="Last Name"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        outlined
                        v-model="edited_address"
                        label="Address"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        outlined
                        v-model="edited_phone_number"
                        label="Phone Number"
                        style="width:100%"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        outlined
                        v-model="edited_email"
                        label="Email"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class=" col-12 ">
                  <div class="row">
                    <div class="col q-mr-sm ">
                      <q-input
                        :style="{ backgroundColor: '#ffffff' }"
                        v-model="edited_password"
                        outlined
                        label="New Password"
                        :type="isPwd ? 'password' : 'text'"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </div>
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
                          label="Save Changes"
                          :size="$q.platform.is.mobile ? 'sm' : 'md'"
                          @click="saveEditProfileClicked"
                        />
                      </div>
                      <div class="col-shrink q-my-sm q-mx-xs">
                        <q-btn
                          color="negative"
                          label="Cancel"
                          :size="$q.platform.is.mobile ? 'xs' : 'md'"
                          @click="cancelEditClicked"
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
    <q-dialog v-model="showDeactivateDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Are you sure you want to deactivate your account?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="deactivateAction(1)"
          />
          <q-btn
            flat
            label="Yes"
            color="primary"
            @click="deactivateAction(2)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog persistent>
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
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      profileData: {
        first_name: "",
        last_name: "",
        address: "",
        phone_number: ""
      },
      showEditProfileCard: false,
      showEditPasswordCard: false,
      showEditEmailCard: false,
      showDeactivateDialog: false,
      edited_first_name: "",
      edited_last_name: "",
      edited_address: "",
      edited_phone_number: "",
      edited_password: "",
      edited_email: "",
      isPwd: true
    };
  },
  methods: {
    editProfileClicked() {
      this.showEditProfileCard = !this.showEditProfileCard;
    },
    editPsswordClicked() {
      this.showEditPasswordCard = !this.showEditPasswordCard;
    },
    editEmailClicked() {
      this.showEditEmailCard = !this.showEditEmailCard;
    },
    deactivateClicked() {
      this.showDeactivateDialog = true;
    },
    cancelEditClicked() {
      this.showEditProfileCard = false;
      this.edited_first_name = this.profileData.first_name;
      this.edited_last_name = this.profileData.last_name;
      this.edited_address = this.profileData.address;
      this.edited_phone_number = this.profileData.phone_number;
      this.edited_email = this.profileData.email;
    },
    async deactivateAction(value) {
      if (value == 2) {
        await this.$store.dispatch("deactivateProfile").then(res => {
          this.$q.notify({
            type:
              res.status && res.status == "success" ? "positive" : "negative",
            message: res.message ? res.message : "Error Occured",
            timeout: 2000
          });
          if (res.status == "success") {
            this.$store.commit("logout");
            this.$router.push({ name: "Products" });
          }
        });
      }
      this.showDeactivateDialog = false;
    },
    async viewMyProfile() {
      await this.$store.dispatch("getCustomerProfile").then(res => {
        if (res.status == "success") {
          this.profileData = res.data;
          this.edited_first_name = res.data.first_name;
          this.edited_last_name = res.data.last_name;
          this.edited_address = res.data.address;
          this.edited_phone_number = res.data.phone_number;
          this.edited_email = res.data.email;
        } else {
          this.$q.notify({
            type:
              res.status && res.status == "success" ? "positive" : "negative",
            message: res.message ? res.message : "Error Occured",
            timeout: 2000
          });
        }
      });
    },
    async saveEditProfileClicked() {
      var apiObject = {
        first_name: this.edited_first_name,
        last_name: this.edited_last_name,
        address: this.edited_address,
        phone_number: this.edited_phone_number,
        email: this.edited_email
      };
      if (this.edited_password && this.edited_password.length > 0) {
        apiObject.password = this.edited_password;
      }
      await this.$store.dispatch("editProfile", apiObject).then(res => {
        this.$q.notify({
          type: res.status && res.status == "success" ? "positive" : "negative",
          message: res.message ? res.message : "Error Occured",
          timeout: 2000
        });
        if (res.status == "success") {
          this.viewMyProfile();
          this.showEditProfileCard = false;
        }
      });
    }
  },
  async created() {
    await this.viewMyProfile();
  }
};
</script>

<style lang="scss" scoped></style>
