<template>
  <div
    class="window-height window-width row justify-center items-center register"
  >
    <div class="col q-pa-lg">
      <div class="row justify-center">
        <q-card
          class="shadow-24 animated rollIn register-card col-xs-10 col-md-4"
        >
          <q-card-section class="bg-red-14">
            <div class="text-h5 text-white q-my-md" style="text-align:center;">
              Register
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xs row justify-center">
              <div class="col-5 q-mx-sm">
                <q-input
                  ref="email"
                  square
                  clearable
                  v-model="email"
                  label="Email"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  square
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Password"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </div>
              <div class="col-5 q-mx-sm">
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="firstName"
                  type="text"
                  label="First Name"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="fas fa-address-card" />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="lastName"
                  type="text"
                  label="Last Name"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="fas fa-address-card" />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="address"
                  type="text"
                  label="Address"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="phoneNumber"
                  type="text"
                  label="Phone Number"
                  :rules="[val => !!val || 'Field is required']"
                >
                  <template v-if="notMobile" v-slot:prepend>
                    <q-icon name="call" />
                  </template>
                </q-input>
              </div>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="md"
              color="red-4"
              class="full-width text-white q-mb-md"
              label="Sign In"
              @click="registerClicked"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../store/api";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      address: null,
      phoneNumber: null,
      isPwd: true,
      isPwdConfirm: true
    };
  },
  methods: {
    async registerClicked() {
      if (this.password !== this.confirmPassword) {
        this.$q.notify({
          position: "bottom",
          type: "warning",
          timeout: "2000",
          message: "'Password' and 'Confirm Passowrd' don't match"
        });
        return;
      }
      if (
        !this.email ||
        !this.password ||
        !this.firstName ||
        !this.lastName ||
        !this.address ||
        !this.phoneNumber
      ) {
        this.$q.notify({
          position: "bottom",
          type: "negative",
          timeout: "2000",
          message: "Please fill all the fields"
        });
      } else {
        var apiObject = {
          email: this.email,
          password: this.password,
          first_name: this.firstName,
          last_name: this.lastName,
          address: this.address,
          phone_number: this.phoneNumber
        };
        await api()
          .post("customers/customerSignup", apiObject)
          .then(res => {
            const response = res.data;
            if (response.status == "success") {
              this.$q.notify({
                position: "bottom",
                type: "positive",
                timeout: "4000",
                message:
                  "Signup completed successfully ! Check your email to confirm your account"
              });
            } else {
              this.$q.notify({
                position: "bottom",
                type: "negative",
                timeout: "2000",
                message: "Error occured"
              });
            }

            setTimeout(() => {
              this.$router.push({ name: "Products" });
            }, 3000);
          })
          .catch(err => {
            this.$q.notify({
              position: "bottom",
              type: "negative",
              timeout: "2000",
              message: err.response.data.message
            });
          });
      }
    },
    checkNumber(value) {
      const lowerLetterBegin = 96;
      const lowerLetterEnd = 123;
      const upperLetterBegin = 64;
      const upperLetterEnd = 91;
      if (typeof value === "undefined" || value.length === 0) {
        return true;
      } else {
        for (var i = 0; i < value.length; i++) {
          if (
            (value.charCodeAt(i) > lowerLetterBegin &&
              value.charCodeAt(i) < lowerLetterEnd) ||
            (value.charCodeAt(i) > upperLetterBegin &&
              value.charCodeAt(i) < upperLetterEnd)
          ) {
            return true;
          }
        }
        return false;
      }
    }
  },
  computed: {
    quasarInstance() {
      return this.$q.platform;
    },
    notMobile() {
      return !this.$q.platform.is.mobile;
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  background: linear-gradient(#ba142a, rgb(204, 202, 202));
}
.register-card {
  // width: 300px;
  animation-duration: 1s;
}
.mouseHover {
  &:hover {
    cursor: pointer;
  }
}
</style>
