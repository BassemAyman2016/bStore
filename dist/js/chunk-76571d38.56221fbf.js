(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76571d38"],{"2dc1":function(e,t,s){},"46c9":function(e,t,s){"use strict";var a=s("2dc1"),n=s.n(a);n.a},"5d9c":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",[s("div",{staticClass:"row"},[e.$q.screen.gt.sm?s("div",{staticClass:"col-2"}):e._e(),s("div",{class:e.$q.screen.gt.sm?"col-8":"col-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 q-pa-md"},[s("div",{staticClass:"row  justify-between"},[s("div",{staticClass:"col-shrink text-h5"},[e._v("Models:")]),s("div",{staticClass:"col-shrink q-mb-sm"},[s("q-btn",{attrs:{color:"green-6",label:"Add New Model",icon:"add",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:function(t){e.showAddModelCard=!e.showAddModelCard}}})],1)]),e.showAddModelCard?s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("q-card",{staticClass:"q-my-md  bg-grey-1"},[s("q-card-section",[s("div",{staticClass:"row justify-between"},[s("div",{class:e.$q.platform.is.mobile?"col-6":"col-4"},[s("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Model Name"},model:{value:e.newModelName,callback:function(t){e.newModelName=t},expression:"newModelName"}})],1),s("div",{staticClass:"col-shrink "},[s("div",{staticClass:"row items-center",staticStyle:{height:"100%"}},[s("div",{staticClass:"col-shrink"},[s("q-btn",{attrs:{color:"green-8",label:"Add Model",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:e.createModel}})],1)])])])])],1)],1)]):e._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},e._l(e.allModels,(function(t,a){return s("q-card",{key:a,staticClass:"q-my-md  bg-grey-1"},[s("q-card-section",[s("div",{staticClass:"row justify-between"},[s("div",{staticClass:"col-shrink name"},[e._v(e._s(t.name))]),s("div",{staticClass:"col-shrink"},[s("q-btn",{attrs:{color:"red-8",label:"Delete Model",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:function(s){return e.deleteModel(t)}}})],1)])])],1)})),1)])])])]),s("q-dialog",{attrs:{persistent:""},model:{value:e.showCondition,callback:function(t){e.showCondition=t},expression:"showCondition"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("span",{staticClass:"q-ml-sm"},[e._v('Are you sure you want to delete "'+e._s(e.selectedModel.name)+'" model?')])]),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"},on:{click:function(t){return e.deleteAction(1)}}}),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:function(t){return e.deleteAction(2)}}})],1)],1)],1),e.$q.screen.gt.sm?s("div",{staticClass:"col-2"}):e._e()],1)])},n=[],o=(s("96cf"),s("1da1")),r=s("c151"),i={name:"Models",data:function(){return{allModels:[],showAddModelCard:!1,newModelName:"",selectedModel:{},showCondition:!1}},methods:{getModels:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("fetchModels");case 2:s=JSON.parse(JSON.stringify(e.$store.getters.getModels)),s=s.sort((function(e,t){return e.id>t.id?-1:e.id<t.id?1:0})),e.allModels=s;case 5:case"end":return t.stop()}}),t)})))()},deleteModel:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:t.selectedModel=e,t.showCondition=!0;case 2:case"end":return s.stop()}}),s)})))()},createModel:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(s=e.newModelName,0!=s.length){t.next=5;break}e.$q.notify({type:"negative",message:"Please write a Model name",timeout:2e3}),t.next=7;break;case 5:return t.next=7,Object(r["a"])().post("models/createModel",{name:s}).then((function(t){t.data.status&&"success"==t.data.status&&(e.$q.notify({type:"positive",message:"Model created successfully",timeout:2e3}),e.showAddModelCard=!1,e.newModelName="",e.getModels())})).catch((function(t){var s=t.response.data;e.$q.notify({type:"negative",message:s.message,timeout:2e3})}));case 7:case"end":return t.stop()}}),t)})))()},deleteAction:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function s(){var a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(2!=e){s.next=4;break}return a=t.selectedModel.id,s.next=4,Object(r["a"])().delete("models/deleteModel/".concat(a)).then(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(s){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("success"!=s.data.status){e.next=5;break}return t.$q.notify({type:"positive",message:s.data.message,timeout:2e3}),e.next=4,t.getModels();case 4:t.selectedModel={name:""};case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:t.showCondition=!1;case 5:case"end":return s.stop()}}),s)})))()}},created:function(){this.getModels()}},c=i,l=(s("46c9"),s("2877")),d=Object(l["a"])(c,a,n,!1,null,"b2e1a7de",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-76571d38.56221fbf.js.map