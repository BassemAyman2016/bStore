<template>
  <div class="window-height window-width row justify-center items-center login">
    <div class="col q-pa-lg">
      <div class="row justify-center">
        <q-card class="shadow-24 animated rollIn login-card col-xs-10 col-md-3">
          <q-card-section class="bg-green-8">
            <div class="text-h5 text-white q-my-md" style="text-align:center;">
              Reset Password Request
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              Forgot your Password ? Write your email below and we will send you
              a reset link .
            </div>
            <q-form class="q-px-sm q-pt-md">
              <q-input
                ref="email"
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
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
              @click="singInClicked"
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
  data() {
    return {
      email: null
    };
  },
  methods: {
    async singInClicked() {
      if (!this.email) {
        this.$q.notify({
          position: "bottom",
          type: "negative",
          timeout: "2000",
          message: "Please fill all the fields"
        });
      } else {
        var apiObject = {
          email: this.email
        };
        await api()
          .post("sessions/requestPasswordReset", apiObject)
          .then(res => {
            const response = res.data;
            this.$q.notify({
              position: "bottom",
              type: "positive",
              timeout: "2000",
              message: response.msg
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
