(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d03d6"],{"66aa":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[t.$q.screen.gt.sm?s("div",{staticClass:"col-2"}):t._e(),s("div",{class:t.$q.screen.gt.sm?"col-8":"col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 q-pa-md"},[s("div",{staticClass:"row text-h5"},[t._v(" Profile ")]),s("div",[s("q-card",{staticClass:" bg-grey-1 row",staticStyle:{width:"100%"}},[s("div",{staticClass:"col-8"},[s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-shrink q-mr-sm "},[s("span",[t._v("First Name: ")])]),s("div",{staticClass:"col"},[t._v(t._s(t.profileData.first_name))])])]),s("q-card-section",{staticClass:" col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-shrink q-mr-sm"},[s("span",[t._v("Last Name: ")])]),s("div",{staticClass:"col"},[t._v(t._s(t.profileData.last_name))])])]),s("q-card-section",{staticClass:" col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-shrink q-mr-sm"},[s("span",[t._v("Address: ")])]),s("div",{staticClass:"col"},[t._v(t._s(t.profileData.address))])])]),s("q-card-section",{staticClass:" col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-shrink q-mr-sm"},[s("span",[t._v("Phone Number: ")])]),s("div",{staticClass:"col"},[t._v(t._s(t.profileData.phone_number))])])])],1),s("div",{staticClass:"col-4"},[s("div",{staticClass:"row content-center",staticStyle:{height:"100%"}},[s("div",{staticClass:"col-12 q-my-sm"},[s("div",{staticClass:"row justify-center"},[s("q-btn",{attrs:{color:"primary",label:"Edit Profile",size:t.$q.platform.is.mobile?"sm":"md"},on:{click:t.editProfileClicked}})],1)]),s("div",{staticClass:"col-12 q-my-sm"},[s("div",{staticClass:"row justify-center"},[s("q-btn",{attrs:{color:"negative",label:"Deactivate Account",size:t.$q.platform.is.mobile?"xs":"md"},on:{click:t.deactivateClicked}})],1)])])])])],1)]),t.showEditProfileCard?s("div",{staticClass:"col-12 q-pa-md animated slideInDown"},[s("div",{staticClass:"row text-h5"},[t._v(" Edit Profile ")]),s("div",[s("q-card",{staticClass:" bg-grey-1 row",staticStyle:{width:"100%"}},[s("div",{staticClass:"col-12"},[s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"First Name"},model:{value:t.edited_first_name,callback:function(e){t.edited_first_name=e},expression:"edited_first_name"}})],1)])]),s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Last Name"},model:{value:t.edited_last_name,callback:function(e){t.edited_last_name=e},expression:"edited_last_name"}})],1)])]),s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Address"},model:{value:t.edited_address,callback:function(e){t.edited_address=e},expression:"edited_address"}})],1)])]),s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{staticStyle:{width:"100%"},style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Phone Number"},model:{value:t.edited_phone_number,callback:function(e){t.edited_phone_number=e},expression:"edited_phone_number"}})],1)])]),s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Email"},model:{value:t.edited_email,callback:function(e){t.edited_email=e},expression:"edited_email"}})],1)])]),s("q-card-section",{staticClass:" col-12 "},[s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mr-sm "},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"New Password",type:t.isPwd?"password":"text"},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility"},on:{click:function(e){t.isPwd=!t.isPwd}}})]},proxy:!0}],null,!1,3635466494),model:{value:t.edited_password,callback:function(e){t.edited_password=e},expression:"edited_password"}})],1)])])],1),s("div",{staticClass:"col-12"},[s("div",{staticClass:"row justify-center ",staticStyle:{height:"100%"}},[s("div",{staticClass:"col-shrink"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-shrink q-my-sm q-mx-xs"},[s("q-btn",{attrs:{color:"green-7",label:"Save Changes",size:t.$q.platform.is.mobile?"sm":"md"},on:{click:t.saveEditProfileClicked}})],1),s("div",{staticClass:"col-shrink q-my-sm q-mx-xs"},[s("q-btn",{attrs:{color:"negative",label:"Cancel",size:t.$q.platform.is.mobile?"xs":"md"},on:{click:t.cancelEditClicked}})],1)])])])])])],1)]):t._e()])]),s("q-dialog",{attrs:{persistent:""},model:{value:t.showDeactivateDialog,callback:function(e){t.showDeactivateDialog=e},expression:"showDeactivateDialog"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("span",{staticClass:"q-ml-sm"},[t._v("Are you sure you want to deactivate your account?")])]),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"},on:{click:function(e){return t.deactivateAction(1)}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:function(e){return t.deactivateAction(2)}}})],1)],1)],1),s("q-dialog",{attrs:{persistent:""}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("span",{staticClass:"q-ml-sm"},[t._v("Are you sure you want to cancel your order ?")])]),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"},on:{click:function(e){return t.cancelCardAction(1)}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:function(e){return t.cancelCardAction(2)}}})],1)],1)],1),t.$q.screen.gt.sm?s("div",{staticClass:"col-2"}):t._e()],1)},i=[],r=(s("96cf"),s("1da1")),o={name:"Profile",data:function(){return{profileData:{first_name:"",last_name:"",address:"",phone_number:""},showEditProfileCard:!1,showEditPasswordCard:!1,showEditEmailCard:!1,showDeactivateDialog:!1,edited_first_name:"",edited_last_name:"",edited_address:"",edited_phone_number:"",edited_password:"",edited_email:"",isPwd:!0}},methods:{editProfileClicked:function(){this.showEditProfileCard=!this.showEditProfileCard},editPsswordClicked:function(){this.showEditPasswordCard=!this.showEditPasswordCard},editEmailClicked:function(){this.showEditEmailCard=!this.showEditEmailCard},deactivateClicked:function(){this.showDeactivateDialog=!0},cancelEditClicked:function(){this.showEditProfileCard=!1,this.edited_first_name=this.profileData.first_name,this.edited_last_name=this.profileData.last_name,this.edited_address=this.profileData.address,this.edited_phone_number=this.profileData.phone_number,this.edited_email=this.profileData.email},deactivateAction:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(2!=t){s.next=3;break}return s.next=3,e.$store.dispatch("deactivateProfile").then((function(t){e.$q.notify({type:t.status&&"success"==t.status?"positive":"negative",message:t.message?t.message:"Error Occured",timeout:2e3}),"success"==t.status&&(e.$store.commit("logout"),e.$router.push({name:"Products"}))}));case 3:e.showDeactivateDialog=!1;case 4:case"end":return s.stop()}}),s)})))()},viewMyProfile:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getCustomerProfile").then((function(e){"success"==e.status?(t.profileData=e.data,t.edited_first_name=e.data.first_name,t.edited_last_name=e.data.last_name,t.edited_address=e.data.address,t.edited_phone_number=e.data.phone_number,t.edited_email=e.data.email):t.$q.notify({type:e.status&&"success"==e.status?"positive":"negative",message:e.message?e.message:"Error Occured",timeout:2e3})}));case 2:case"end":return e.stop()}}),e)})))()},saveEditProfileClicked:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s={first_name:t.edited_first_name,last_name:t.edited_last_name,address:t.edited_address,phone_number:t.edited_phone_number,email:t.edited_email},t.edited_password&&t.edited_password.length>0&&(s.password=t.edited_password),e.next=4,t.$store.dispatch("editProfile",s).then((function(e){t.$q.notify({type:e.status&&"success"==e.status?"positive":"negative",message:e.message?e.message:"Error Occured",timeout:2e3}),"success"==e.status&&(t.viewMyProfile(),t.showEditProfileCard=!1)}));case 4:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.viewMyProfile();case 2:case"end":return e.stop()}}),e)})))()}},c=o,l=s("2877"),d=Object(l["a"])(c,a,i,!1,null,"7c0ca120",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0d03d6.d985d575.js.map