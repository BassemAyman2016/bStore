<template>
  <div style="width:100%">
    <div ref="card"></div>
    <div class="q-mb-lg">Payment Card</div>
    <div id="card-element"></div>
    <div>
      <button class="payment-button" @click="submit">Pay</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentOrder: {
      required: true,
      default: ""
    }
  },
  data() {
    return {
      stripeAPIToken: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      stripe: "",
      elements: "",
      card: ""
    };
  },
  methods: {
    configureStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.stripeAPIToken);
      this.elements = this.stripe.elements();
      let style = {
        base: {
          color: "#32325d",
          paddingTop: "15px"
        }
      };
      this.card = this.elements.create("card", { style });

      this.card.mount("#card-element");
    },
    includeStripe(URL, callback) {
      let documentTag = document,
        tag = "script",
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0];
      object.src = "//" + URL;
      if (callback) {
        object.addEventListener(
          "load",
          function(e) {
            callback(null, e);
          },
          false
        );
      }
      scriptTag.parentNode.insertBefore(object, scriptTag);
    },
    async submit(e) {
      e.preventDefault();
      // console.log("this.card", this.card);
      if (this.card._empty) {
        this.$q.notify({
          type: "negative",
          message: "Please fill your credit card number",
          timeout: 2000
        });
        return;
      }
      if (this.card._invalid) {
        this.$q.notify({
          type: "negative",
          message: "Please fill your credit card data correctly",
          timeout: 2000
        });
        return;
      }
      var clientSecret = this.currentOrder.payment_intent;
      const name = this.$store.getters.getCustomerName;
      this.$q.loading.show();

      await this.stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: name
            }
          }
        })
        .then(async res1 => {
          this.$q.loading.hide();
          if (res1.error) {
            this.$q.notify({
              type: "negative",
              message: "Error occured while paying order",
              timeout: 2000
            });
            console.log("res1", res1);
            return;
          } else {
            await this.$store
              .dispatch("payOrder", {
                order_id: this.currentOrder.id
              })
              .then(async res => {
                this.$q.notify({
                  type:
                    res.status && res.status == "success" && !res1.error
                      ? "positive"
                      : "negative",
                  message:
                    res.message && !res1.error ? res.message : "Error Occured",
                  timeout: 2000
                });
                if (res.status && res.status == "success") {
                  this.$emit("orderPaymentSuccess");
                }
                // this.$emit("orderPaymentSuccess");
                // console.log("re1s", res1, typeof res1, Object.keys(res1));
              });
          }
        });
    }
  },
  created() {
    this.includeStripe(
      "js.stripe.com/v3/",
      function() {
        this.configureStripe();
      }.bind(this)
    );
  }
};
</script>

<style lang="scss" scoped>
.payment-button {
  width: 100%;
  margin-top: 20px;
  color: white;
  background-color: rgb(66, 0, 128);
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 14;
  height: 30px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
