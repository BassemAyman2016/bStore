(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5451bcc"],{"0866":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"window-height window-width row justify-center items-center login"},[s("div",{staticClass:"col q-pa-lg"},[s("div",{staticClass:"row justify-center"},[s("q-card",{staticClass:"shadow-24 animated rollIn login-card col-xs-10 col-md-3",class:{"animated rollOut":e.showLeaveAnimation},staticStyle:{"animation-duration":"1s"}},[s("q-card-section",{staticClass:"bg-indigo-7"},[s("div",{staticClass:"text-h5 text-white q-my-md",staticStyle:{"text-align":"center"}},[e._v(" Login ")])]),s("q-card-section",[s("q-form",{staticClass:"q-px-sm q-pt-md"},[s("q-input",{ref:"email",attrs:{square:"",clearable:"",type:"email",label:"Email",rules:[function(e){return!!e||"Field is required"}]},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"email"}})]},proxy:!0}]),model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("q-input",{ref:"password",attrs:{square:"",clearable:"",type:"password",label:"Password",rules:[function(e){return!!e||"Field is required"}]},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.singInClicked(t)}},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"lock"}})]},proxy:!0}]),model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),s("q-card-actions",{staticClass:"q-px-lg"},[s("q-btn",{staticClass:"full-width text-white",attrs:{unelevated:"",size:"lg",color:"indigo-4",label:"Sign In"},on:{click:e.singInClicked}})],1),s("q-card-section",{staticClass:"text-center q-pa-sm"},[s("p",{staticClass:"text-grey-6 mouseHover",on:{click:e.forgotPasswordClicked}},[e._v(" Forgot your password? ")])])],1)],1)])])},i=[],a=(s("b0c0"),s("96cf"),s("1da1")),o=s("c151"),r={name:"Login",data:function(){return{email:null,password:null,showLeaveAnimation:!1}},methods:{singInClicked:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.email&&e.password){t.next=4;break}e.$q.notify({position:"bottom",type:"negative",timeout:"2000",message:"Please fill all the fields"}),t.next=7;break;case 4:return s={email:e.email,password:e.password},t.next=7,Object(o["a"])().post("sessions/login",s).then((function(t){var s=t.data;e.$q.notify({position:"bottom",type:"positive",timeout:"2000",message:"Logged in successfully"}),e.$store.commit("setUserId",s.id),e.$store.commit("setUserType",s.type),e.$store.commit("setToken",s.token),s.name&&e.$store.commit("setName",s.name),e.showLeaveAnimation=!0,setTimeout((function(){e.$router.push({name:"Products"})}),1500)})).catch((function(t){e.$q.notify({position:"bottom",type:"negative",timeout:"2000",message:t.response.data.message})}));case 7:case"end":return t.stop()}}),t)})))()},forgotPasswordClicked:function(){this.$router.push({name:"ResetPasswordRequest"})}}},c=r,l=(s("d945"),s("2877")),u=Object(l["a"])(c,n,i,!1,null,"4eac5254",null);t["default"]=u.exports},"7f33":function(e,t,s){},d945:function(e,t,s){"use strict";var n=s("7f33"),i=s.n(n);i.a}}]);
//# sourceMappingURL=chunk-c5451bcc.4a638e58.js.map