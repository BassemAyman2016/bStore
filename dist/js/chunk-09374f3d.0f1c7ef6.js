(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09374f3d"],{"122e":function(t,e,a){"use strict";var r=a("ff02"),i=a.n(r);i.a},"8cb3":function(t,e,a){t.exports=a.p+"img/iconOnly.30392089.png"},a4f6:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"lhh lpR lff"}},[r("q-header",{staticClass:"bg-primary ",attrs:{reveal:"",elevated:""}},[r("q-toolbar",{staticClass:"row justify-between"},[r("div",{staticClass:"col-shrink"},[t.isAdmin?r("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu",icon:"fas fa-bars"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}):t._e(),r("q-toolbar-title",{staticClass:"title-head",attrs:{shrink:""},on:{click:function(e){return t.$router.push({name:"Products"})}}},[r("q-avatar",[r("img",{staticStyle:{height:"30px"},attrs:{src:a("8cb3")}})]),t._v(" bStore App ")],1)],1),t.isLoggedIn?r("div",{staticClass:"col-shrink"},[r("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"none",flat:"",round:"",icon:"search"},on:{click:t.searchClicked}},[t.$q.platform.is.mobile?t._e():r("q-tooltip",[r("span",{staticClass:"text-subtitle2"},[t._v("Search")])])],1),t.isAdmin?t._e():r("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"none",flat:"",round:"",icon:"shopping_cart"}},[t.$q.platform.is.mobile?t._e():r("q-tooltip",[r("span",{staticClass:"text-subtitle2"},[t._v("Cart")])]),t.currentCart.length>0?r("q-badge",{attrs:{color:"red-8",floating:""}},[t._v(t._s(t.currentCart.length))]):t._e(),r("q-menu",[r("q-list",{staticStyle:{"min-width":"200px"}},[t._l(t.currentCart,(function(e,a){return r("q-item",{key:a},[r("q-item-section",{attrs:{avatar:""}},[r("q-avatar",{attrs:{rounded:""}},[r("img",{attrs:{src:e.product.images?e.product.images[0].img:""}})])],1),r("q-item-section",{staticClass:"col-shrink"},[t._v(t._s(e.count)+" x "+t._s(e.product.name))])],1)})),r("q-separator"),t.currentCart.length>0?r("q-item",[r("q-item-section",[r("q-btn",{staticClass:"bg-green-7 text-white",attrs:{dense:"",label:"View Cart"},on:{click:function(e){return t.$router.push({name:"Cart"})}}})],1)],1):t._e()],2)],1)],1),r("q-btn",{staticClass:"mouseHover",attrs:{icon:"account_circle",dense:"",color:"none",flat:"",round:""}},[t.$q.platform.is.mobile?t._e():r("q-tooltip",[r("span",{staticClass:"text-subtitle2"},[t._v("Options")])]),r("q-menu",[r("q-list",[r("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""}},[r("q-item-section",{on:{click:t.logout}},[t._v("Logout")])],1),r("q-separator"),t.isAdmin?t._e():r("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"","no-wrap":""},on:{click:function(e){return t.changeRoute("MyOrders")}}},[r("q-item-section",[t._v("View My Orders")])],1),r("q-separator"),t.isAdmin?t._e():r("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(e){return t.changeRoute("Profile")}}},[r("q-item-section",[t._v("My Profile")])],1)],1)],1)],1)],1):r("div",{staticClass:"col-shrink"},[r("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"none",flat:"",round:"",icon:"search"},on:{click:t.searchClicked}},[t.$q.platform.is.mobile?t._e():r("q-tooltip",[r("span",{staticClass:"text-subtitle2"},[t._v("Search")])])],1),r("div",{staticClass:"text-body1 header-text q-mx-xs",on:{click:function(e){return t.changeRoute("Login")}}},[t._v(" Login ")]),t._v(" or "),r("div",{staticClass:"text-body1 header-text q-mx-xs",on:{click:function(e){return t.changeRoute("Register")}}},[t._v(" Register ")])],1)])],1),r("q-drawer",{attrs:{bordered:"","content-class":"bg-grey-2",behavior:"mobile"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[t.isAdmin?r("q-list",[r("q-item-label",{attrs:{header:""}},[t._v("Products Management")]),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("AddProduct")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"add_circle"}})],1),r("q-item-section",[r("q-item-label",[t._v("Add Product")])],1)],1),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("Categories")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"category"}})],1),r("q-item-section",[r("q-item-label",[t._v("Edit Categories")])],1)],1),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("Brands")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"copyright"}})],1),r("q-item-section",[r("q-item-label",[t._v("Edit Brands")])],1)],1),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("Models")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"far fa-clipboard"}})],1),r("q-item-section",[r("q-item-label",[t._v("Edit Models")])],1)],1),r("q-item-label",{attrs:{header:""}},[t._v("Users Management")]),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("AllCustomers")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"people"}})],1),r("q-item-section",[r("q-item-label",[t._v("View Customers")])],1)],1),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.changeRoute("AllOrders")}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"far fa-clipboard"}})],1),r("q-item-section",[r("q-item-label",[t._v("View Orders")])],1)],1)],1):t._e()],1),r("q-page-container",[r("router-view")],1)],1)},i=[],n={name:"Default",components:{},data:function(){return{leftDrawerOpen:!1}},methods:{changeRoute:function(t){this.$router.push({name:t})},logout:function(){this.$store.commit("logout"),this.$router.push({name:"Products"})},clearCart:function(){this.$store.commit("clearCart")},searchClicked:function(){this.$router.push({name:"Search"})}},created:function(){this.$q.addressbarColor.set("#ff0000")},computed:{isAdmin:function(){var t=this.$store.getters.getUserType;return"admin"==t},isLoggedIn:function(){return this.$store.getters.getToken},currentCart:function(){return this.$store.getters.getCart}}},s=n,o=(a("122e"),a("2877")),c=Object(o["a"])(s,r,i,!1,null,"01be7f7b",null);e["default"]=c.exports},ff02:function(t,e,a){}}]);
//# sourceMappingURL=chunk-09374f3d.0f1c7ef6.js.map