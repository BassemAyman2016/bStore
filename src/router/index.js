import Vue from "vue";
import VueRouter from "vue-router";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    component: () => import("../views/Default.vue"),
    children: [
      {
        path: "/",
        name: "Products",
        component: Products
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("../components/Cart.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/User/Login")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/User/Register")
  },
  {
    path: "/resetPassword/:token",
    name: "ResetPassword",
    props: true,
    component: () => import("../views/User/ResetPassword.vue")
  },
  {
    path: "/resetPasswordRequest",
    name: "ResetPasswordRequest",
    props: true,
    component: () => import("../views/User/ResetPasswordRequest.vue")
  },
  {
    path: "/confirmAccount/:user_id",
    name: "ConfirmAccount",
    props: true,
    component: () => import("../views/User/ConfirmAccount.vue")
  },
  {
    path: "/testing",
    name: "Testing",
    props: true,
    component: () => import("../views/Testing.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
