(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ebbe1d8e"],{6827:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"window-height window-width row justify-center items-center login"},[s("div",{staticClass:"col q-pa-lg"},[s("div",{staticClass:"row justify-center"},[s("q-card",{staticClass:"shadow-24 animated rollIn login-card col-xs-10 col-md-3"},[s("q-card-section",{staticClass:"bg-green-8"},[s("div",{staticClass:"text-h5 text-white q-my-md",staticStyle:{"text-align":"center"}},[e._v(" Reset Password ")])]),s("q-card-section",[s("q-form",{staticClass:"q-px-sm q-pt-md"},[s("q-input",{ref:"new",attrs:{square:"",clearable:"",type:"password",label:"New Password",rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"lock"}})]},proxy:!0}]),model:{value:e.newPass,callback:function(t){e.newPass=t},expression:"newPass"}}),s("q-input",{ref:"confirmPass",attrs:{square:"",clearable:"",type:"password",label:"Confirm Password",rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"lock"}})]},proxy:!0}]),model:{value:e.confirmPass,callback:function(t){e.confirmPass=t},expression:"confirmPass"}})],1)],1),s("q-card-actions",{staticClass:"q-px-lg q-mb-md"},[s("q-btn",{staticClass:"full-width text-white",attrs:{unelevated:"",size:"lg",color:"green-4",label:"Submit"},on:{click:e.submitRequest}})],1)],1)],1)])])},a=[],r=(s("96cf"),s("1da1")),i=s("c151"),o={name:"Login",props:{token:{required:!1,default:""}},data:function(){return{newPass:null,confirmPass:null}},methods:{submitRequest:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.newPass&&e.confirmPass){t.next=4;break}e.$q.notify({position:"bottom",type:"negative",timeout:"2000",message:"Please fill all the fields"}),t.next=10;break;case 4:if(s={password:e.newPass},e.newPass===e.confirmPass){t.next=8;break}return e.$q.notify({type:"warning",timeout:"1500",message:"Passwords written do not match"}),t.abrupt("return");case 8:return t.next=10,Object(i["a"])().post("sessions/resetPassword/".concat(e.token),s).then((function(t){var s=t.data;e.$q.notify({position:"bottom",type:"positive",timeout:"2000",message:s.message}),setTimeout((function(){e.$router.push({name:"Products"})}),1500)})).catch((function(t){e.$q.notify({position:"bottom",type:"negative",timeout:"2000",message:t.response.data.message})}));case 10:case"end":return t.stop()}}),t)})))()}}},c=o,u=(s("8255"),s("2877")),l=Object(u["a"])(c,n,a,!1,null,"f938c7f8",null);t["default"]=l.exports},8255:function(e,t,s){"use strict";var n=s("b113"),a=s.n(n);a.a},b113:function(e,t,s){}}]);
//# sourceMappingURL=chunk-ebbe1d8e.b8dd7621.js.map