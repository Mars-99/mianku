(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{203:function(e,t,n){"use strict";n.r(t);var r=n(204),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},204:function(e,t,n){},54:function(e,t,n){"use strict";(function(e){n(5);r(n(3));var t=r(n(55));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},55:function(e,t,n){"use strict";n.r(t);var r=n(56),a=n(58);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(203);var o,s=n(11),u=Object(s["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"127632e4",null,!1,r["components"],o);u.options.__file="pages/order/order.vue",t["default"]=u.exports},56:function(e,t,n){"use strict";n.r(t);var r=n(57);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},57:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));try{r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,484))},uniSegmentedControl:function(){return n.e("uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control").then(n.bind(null,492))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.loginAuth&&!e.pageshow&&e.orderListData.length>0?e.__map(e.handleOrderList,(function(t,n){var r=e.__get_orig(t),a=e._f("payStatus")(t.state);return{$orig:r,f0:a}})):null);e.$mp.data=Object.assign({},{$root:{l0:n}})},i=!1,o=[];a._withStripped=!0},58:function(e,t,n){"use strict";n.r(t);var r=n(59),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},59:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n(19)),a=n(13),i=n(14),o=u(n(60)),s=u(n(65));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,a,i,o){try{var s=e[i](o),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(r,a)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){c(i,r,a,o,s,"next",e)}function s(e){c(i,r,a,o,s,"throw",e)}o(void 0)}))}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(){n.e("components/pageLoad/pageLoad").then(function(){return resolve(n(499))}.bind(null,n)).catch(n.oe)},g={components:{pageLoad:h,timer:o.default},data:function(){return{items:["全部","待付款","待入住","已完成"],activeIndex:0,state:"",btnnum:0,orderListData:[],handleOrderList:[],pageshow:!0,loginAuth:null,totalPage:0,page:1}},computed:f({},(0,a.mapGetters)(["getUserinfo","getNeedAuth","getIsLogin"])),mounted:function(){},onLoad:function(){this.isLogin()},onShow:function(){this.getOrderList()},filters:{payStatus:function(e){var t={0:"待支付",1:"已支付",2:"支付失败",3:"用户取消",4:"平台取消",5:"已退款",9:"已完成"};return t[e]}},watch:{activeIndex:function(e){switch(e){case 1:this.state=0;break;case 2:this.state=1;break;case 3:this.state=9;break;default:this.state=null;break}this.page=1,this.getOrderList(this.state)}},methods:{onClickItem:function(e){this.btnnum=e,this.activeIndex!==e.currentIndex&&(this.activeIndex=e.currentIndex)},getOrderList:function(e){var t=this;return d(r.default.mark((function n(){var a,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.orderList)(e,t.page,10);case 2:if(a=n.sent,o=a.data,1!=o.code){n.next=8;break}return n.abrupt("return",t.$api.msg(o.msg));case 8:t.totalPage=o.data.pages,1==t.page?(t.orderListData=o.data.rs,t.pageshow=!1,t.orderListData=t.orderListData.sort((function(e,t){return new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()})),t.handleOrder()):(t.orderListData=t.orderListData.concat(o.data.rs),t.pageshow=!1,t.orderListData=t.orderListData.sort((function(e,t){return new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()})),t.handleOrder());case 10:case"end":return n.stop()}}),n)})))()},delOrder:function(e){var t=this;return d(r.default.mark((function n(){var a,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.pageshow=!0,n.next=3,(0,i.delOrder)(e);case 3:if(a=n.sent,o=a.data,1!=o.code){n.next=9;break}return n.abrupt("return",t.$api.msg(o.msg));case 9:t.getOrderList(),t.pageshow=!1;case 11:case"end":return n.stop()}}),n)})))()},cancelOrder:function(e){var t=this;return d(r.default.mark((function n(){var a,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.pageshow=!0,n.next=3,(0,i.cancelOrder)(e);case 3:if(a=n.sent,o=a.data,1!=o.code){n.next=9;break}return n.abrupt("return",t.$api.msg(o.msg));case 9:console.log("res",o);case 10:t.getOrderList(),t.pageshow=!1;case 12:case"end":return n.stop()}}),n)})))()},payWX:function(t){var n=this;return d(r.default.mark((function a(){var o,s;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,i.payWX)(t);case 2:if(o=r.sent,s=o.data,1!=s.code){r.next=8;break}return r.abrupt("return",n.$api.msg(s.msg));case 8:e.requestPayment({provider:"wxpay",timeStamp:s.data.timeStamp,nonceStr:s.data.nonceStr,package:s.data.packageValue,signType:s.data.signType,paySign:s.data.paySign,success:function(t){e.navigateTo({url:"../order/order-result?state=success"}),console.log("success:"+JSON.stringify(t))},fail:function(t){e.navigateTo({url:"../order/order-result?state=fail"}),console.log("fail:"+JSON.stringify(t))}});case 9:case"end":return r.stop()}}),a)})))()},openOrderDetail:function(t){e.navigateTo({url:"../order/order-detail?id="+t})},customerService:function(){e.navigateTo({url:"../news/customer-service"})},openListingsDetail:function(t){e.navigateTo({url:"../listings/listings-detail?id="+t.hid})},isLogin:function(){if(this.loginAuth=e.getStorageSync("loginAuth"),!this.loginAuth)return this.$api.msg("请先登录"),void this.$api.href("../login/login")},handleOrder:function(){var e=this,t=(0,s.default)().format("YYYY-MM-DD");9==this.state?(this.orderListData.find((function(n){if(n.checkOut<t&&1==n.state)return n.state=9,void e.handleOrderList.push(n)})),console.log("handleOrderList9",this.handleOrderList)):(this.orderListData.find((function(e){e.checkOut<t&&1==e.state&&(e.state=9)})),this.handleOrderList=this.orderListData),1==this.state?(this.handleOrderList=[],this.orderListData.find((function(n){n.checkOut>=t&&1==n.state&&5!=n.state&&e.handleOrderList.push(n)})),console.log("handleOrderList9",this.handleOrderList)):(this.orderListData.find((function(e){e.checkOut<t&&1==e.state&&(e.state=9)})),this.handleOrderList=this.orderListData)},onReachBottom:function(){this.page>=this.totalPage||(this.page+=1,this.getOrderList(this.state))}}};t.default=g}).call(this,n(1)["default"])},60:function(e,t,n){"use strict";n.r(t);var r=n(61),a=n(63);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);var o,s=n(11),u=Object(s["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"18c54940",null,!1,r["components"],o);u.options.__file="components/djs/djs.vue",t["default"]=u.exports},61:function(e,t,n){"use strict";n.r(t);var r=n(62);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},62:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=!1,o=[];a._withStripped=!0},63:function(e,t,n){"use strict";n.r(t);var r=n(64),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},64:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(65));function a(e){return e&&e.__esModule?e:{default:e}}var i={props:{endTime:{}},data:function(){return{cancelTime:"",isCounttime:!0}},beforeMount:function(){this.init()},methods:{init:function(){var e=this,t=setInterval((function(){var n=(0,r.default)(e.endTime).format(),a=(0,r.default)().format(),i=1800-(0,r.default)(a,"YYYY-MM-DD hh:mm:ss").diff(n,"seconds"),o=parseInt(i/86400);i-=3600*o*24;var s=parseInt(i/3600);i-=3600*s;var u=parseInt(i/60),c=i-60*u;e.cancelTime=u+"分"+c+"秒",i<=0&&(e.cancelTime=" 0分0秒",e.isCounttime=!1,clearInterval(t))}),1e3)}}};t.default=i}},[[54,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map