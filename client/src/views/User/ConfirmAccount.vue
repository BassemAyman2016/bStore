<template>
  <div class="window-height window-width row justify-center items-center login">
    <div class="col q-pa-lg">
      <div class="row justify-center">
        <q-card class="shadow-24 animated rollIn login-card col-xs-10 col-md-3">
          <q-card-section class="bg-indigo-7">
            <div class="text-h5 text-white q-my-md" style="text-align:center;">
              Confirm Email Address
            </div>
          </q-card-section>
          <q-card-section>
            <div>Please wait will we confirm your Email .</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../store/api";
export default {
  name: "Confirm",
  data() {
    return {};
  },
  props: {
    user_id: {
      required: false,
      default: 0
    }
  },
  methods: {
    async confirmAccount() {
      await api()
        .post(`customers/confirm/${this.user_id}`)
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
          }, 2500);
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
  created() {
    this.confirmAccount();
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
