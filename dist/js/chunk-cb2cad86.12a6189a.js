(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb2cad86"],{1407:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[a("div",{staticClass:"row"},[e.$q.screen.gt.sm?a("div",{staticClass:"col-2"}):e._e(),a("div",{class:e.$q.screen.gt.sm?"col-8":"col-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 q-pa-md"},[a("div",{staticClass:"row  justify-between"},[a("div",{staticClass:"col-shrink text-h5"},[e._v("Brands:")]),a("div",{staticClass:"col-shrink q-mb-sm"},[a("q-btn",{attrs:{color:"green-6",label:"Add New Brand",icon:"add",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:function(t){e.showAddBrandCard=!e.showAddBrandCard}}})],1)]),e.showAddBrandCard?a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("q-card",{staticClass:"q-my-md  bg-grey-1"},[a("q-card-section",[a("div",{staticClass:"row justify-between"},[a("div",{class:e.$q.platform.is.mobile?"col-6":"col-4"},[a("q-input",{style:{backgroundColor:"#ffffff"},attrs:{outlined:"",label:"Brand Name"},model:{value:e.newBrandName,callback:function(t){e.newBrandName=t},expression:"newBrandName"}})],1),a("div",{staticClass:"col-shrink "},[a("div",{staticClass:"row items-center",staticStyle:{height:"100%"}},[a("div",{staticClass:"col-shrink"},[a("q-btn",{attrs:{color:"green-8",label:"Add Brand",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:e.createBrand}})],1)])])])])],1)],1)]):e._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},e._l(e.allBrands,(function(t,n){return a("q-card",{key:n,staticClass:"q-my-md  bg-grey-1"},[a("q-card-section",[a("div",{staticClass:"row justify-between"},[a("div",{staticClass:"col-shrink name"},[e._v(e._s(t.name))]),a("div",{staticClass:"col-shrink"},[a("q-btn",{attrs:{color:"red-8",label:"Delete Brand",size:e.$q.platform.is.mobile?"sm":"md"},on:{click:function(a){return e.deleteBrand(t)}}})],1)])])],1)})),1)])])])]),a("q-dialog",{attrs:{persistent:""},model:{value:e.showCondition,callback:function(t){e.showCondition=t},expression:"showCondition"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("span",{staticClass:"q-ml-sm"},[e._v('Are you sure you want to delete "'+e._s(e.selectedBrand.name)+'" brand?')])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"},on:{click:function(t){return e.deleteAction(1)}}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:function(t){return e.deleteAction(2)}}})],1)],1)],1),e.$q.screen.gt.sm?a("div",{staticClass:"col-2"}):e._e()],1)])},s=[],r=(a("96cf"),a("1da1")),i=a("c151"),c={name:"Brands",data:function(){return{allBrands:[],showAddBrandCard:!1,newBrandName:"",selectedBrand:{},showCondition:!1}},methods:{getBrands:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("fetchBrands");case 2:a=JSON.parse(JSON.stringify(e.$store.getters.getBrands)),a=a.sort((function(e,t){return e.id>t.id?-1:e.id<t.id?1:0})),e.allBrands=a;case 5:case"end":return t.stop()}}),t)})))()},deleteBrand:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.selectedBrand=e,t.showCondition=!0;case 2:case"end":return a.stop()}}),a)})))()},createBrand:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.newBrandName,0!=a.length){t.next=5;break}e.$q.notify({type:"negative",message:"Please write a Brand name",timeout:2e3}),t.next=7;break;case 5:return t.next=7,Object(i["a"])().post("brands/createBrand",{name:a}).then((function(t){t.data.status&&"success"==t.data.status&&(e.$q.notify({type:"positive",message:"Brand created successfully",timeout:2e3}),e.showAddBrandCard=!1,e.newBrandName="",e.getBrands())})).catch((function(t){var a=t.response.data;e.$q.notify({type:"negative",message:a.message,timeout:2e3})}));case 7:case"end":return t.stop()}}),t)})))()},deleteAction:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(2!=e){a.next=4;break}return n=t.selectedBrand.id,a.next=4,Object(i["a"])().delete("brands/deleteBrand/".concat(n)).then(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("success"!=a.data.status){e.next=5;break}return t.$q.notify({type:"positive",message:a.data.message,timeout:2e3}),e.next=4,t.getBrands();case 4:t.selectedBrand={name:""};case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:t.showCondition=!1;case 5:case"end":return a.stop()}}),a)})))()}},created:function(){this.getBrands()}},o=c,d=(a("538d"),a("2877")),l=Object(d["a"])(o,n,s,!1,null,"04a6e8ba",null);t["default"]=l.exports},1427:function(e,t,a){},"538d":function(e,t,a){"use strict";var n=a("1427"),s=a.n(n);s.a}}]);
//# sourceMappingURL=chunk-cb2cad86.12a6189a.js.map