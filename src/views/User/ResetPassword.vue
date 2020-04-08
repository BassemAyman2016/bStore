<template>
  <div class="window-height window-width row justify-center items-center login">
    <div class="col q-pa-lg">
      <div class="row justify-center">
        <q-card class="shadow-24 animated rollIn login-card col-xs-10 col-md-3">
          <q-card-section class="bg-green-8">
            <div class="text-h5 text-white q-my-md" style="text-align:center;">
              Reset Password
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-md">
              <q-input
                ref="new"
                square
                clearable
                v-model="newPass"
                type="password"
                label="New Password"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input
                ref="confirmPass"
                square
                clearable
                v-model="confirmPass"
                type="password"
                label="Confirm Password"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg q-mb-md">
            <q-btn
              unelevated
              size="lg"
              color="green-4"
              class="full-width text-white"
              label="Submit"
              @click="submitRequest"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../store/api";
export default {
  name: "Login",
  props: {
    token: {
      required: false,
      default: ""
    }
  },
  data() {
    return {
      newPass: null,
      confirmPass: null
    };
  },
  methods: {
    async submitRequest() {
      if (!this.newPass || !this.confirmPass) {
        this.$q.notify({
          position: "bottom",
          type: "negative",
          timeout: "2000",
          message: "Please fill all the fields"
        });
      } else {
        var apiObject = {
          password: this.newPass
        };
        if (this.newPass !== this.confirmPass) {
          this.$q.notify({
            type: "warning",
            timeout: "1500",
            message: `Passwords written do not match`
          });
          return;
        }
        await api()
          .post(`sessions/resetPassword/${this.token}`, apiObject)
          .then(res => {
            const response = res.data;
            this.$q.notify({
              position: "bottom",
              type: "positive",
              timeout: "2000",
              message: response.message
            });
            setTimeout(() => {
              this.$router.push({ name: "Products" });
            }, 1500);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: linear-gradient(#14ba38, rgb(204, 202, 202));
}
.login-card {
  // width: 300px;
  animation-duration: 1s;
}
.mouseHover {
  &:hover {
    cursor: pointer;
  }
}
</style>
