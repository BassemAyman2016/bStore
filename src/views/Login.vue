<template>
  <div class="window-height window-width row justify-center items-center login">
    <div class="col q-pa-lg">
      <div class="row justify-center">
        <q-card class="shadow-24 animated rollIn login-card col-xs-10 col-md-3">
          <q-card-section class="bg-indigo-7">
            <div class="text-h5 text-white q-my-md" style="text-align:center;">
              Login
            </div>
          </q-card-section>
          <q-card-section>
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
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="password"
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
                :rules="[val => !!val || 'Field is required']"
                @keyup.enter="singInClicked"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="indigo-4"
              class="full-width text-white"
              label="Sign In"
              @click="singInClicked"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6 mouseHover">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../store/api";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async singInClicked() {
      if (!this.email || !this.password) {
        this.$q.notify({
          position: "bottom",
          type: "negative",
          timeout: "2000",
          message: "Please fill all the fields"
        });
      } else {
        var apiObject = {
          email: this.email,
          password: this.password
        };
        await api()
          .post("sessions/login", apiObject)
          .then(res => {
            const response = res.data;
            this.$q.notify({
              position: "bottom",
              type: "positive",
              timeout: "2000",
              message: "Logged in successfully"
            });
            this.$store.commit("setUserId", response.id);
            this.$store.commit("setUserType", response.type);
            this.$store.commit("setToken", response.token);
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
  background: linear-gradient(#1467ba, rgb(204, 202, 202));
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
