(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{213:function(n,e,t){"use strict";(function(n){t(5);o(t(3));var e=o(t(214));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},214:function(n,e,t){"use strict";t.r(e);var o=t(215),r=t(217);for(var i in r)"default"!==i&&function(n){t.d(e,n,(function(){return r[n]}))}(i);t(219);var u,c=t(11),a=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"80842834",null,!1,o["components"],u);a.options.__file="pages/user/user.vue",e["default"]=a.exports},215:function(n,e,t){"use strict";t.r(e);var o=t(216);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},216:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return u})),t.d(e,"recyclableRender",(function(){return i})),t.d(e,"components",(function(){return o}));try{o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,492))},uniCard:function(){return t.e("uni_modules/uni-card/components/uni-card/uni-card").then(t.bind(null,478))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement;n._self._c},i=!1,u=[];r._withStripped=!0},217:function(n,e,t){"use strict";t.r(e);var o=t(218),r=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},218:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(t(19)),r=t(14);function i(n){return n&&n.__esModule?n:{default:n}}function u(n,e,t,o,r,i,u){try{var c=n[i](u),a=c.value}catch(s){return void t(s)}c.done?e(a):Promise.resolve(a).then(o,r)}function c(n){return function(){var e=this,t=arguments;return new Promise((function(o,r){var i=n.apply(e,t);function c(n){u(i,o,r,c,a,"next",n)}function a(n){u(i,o,r,c,a,"throw",n)}c(void 0)}))}}var a={data:function(){return{swiperheight:0,bg:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/user-bg.png",avatarUser:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/avatar-user.jpg",userinfo:{},loginAuth:null,orderList:[{value:"全部",current:0,state:-1,icon:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_all.png"},{value:"待付款",current:1,state:0,icon:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_pending-payment.png"},{value:"待入住",current:2,state:1,icon:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_waiting_checkin.png"},{value:"已完成",current:3,state:9,icon:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/order_finish.png"}]}},onLoad:function(){},onShow:function(){this.getUserDetail()},mounted:function(){var e=this;n.getSystemInfo({success:function(n){e.swiperheight=n.windowHeight}})},methods:{getUserDetail:function(){var e=this;return c(o.default.mark((function t(){var i,u;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.loginAuth=n.getStorageSync("loginAuth"),!e.loginAuth){t.next=7;break}return t.next=4,(0,r.userDetail)();case 4:i=t.sent,u=i.data,e.userinfo=u.data;case 7:case"end":return t.stop()}}),t)})))()},openLogin:function(){n.navigateTo({url:"../login/login"})},openStudentPrivilege:function(){n.navigateTo({url:"../student-privilege/student-privilege"})},openCollect:function(){n.switchTab({url:"../collect/collect"})},customerService:function(){n.navigateTo({url:"../news/customer-service"})},call_phone:function(){n.makePhoneCall({phoneNumber:"15364037300",success:function(n){console.log("调用成功!")},fail:function(n){console.log("调用失败!")}})},openCoupon:function(){n.navigateTo({url:"../user/my-coupon"})},openOrder:function(e){n.setStorageSync("current",e.current),n.setStorageSync("state",e.state),n.switchTab({url:"../order/order"})}}};e.default=a}).call(this,t(1)["default"])},219:function(n,e,t){"use strict";t.r(e);var o=t(220),r=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},220:function(n,e,t){}},[[213,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map