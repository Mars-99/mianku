(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/student-privilege/student-privilege"],{337:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(338));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},338:function(e,n,t){"use strict";t.r(n);var r=t(339),o=t(341);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(343);var u,a=t(11),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"15b5ce74",null,!1,r["components"],u);c.options.__file="pages/student-privilege/student-privilege.vue",n["default"]=c.exports},339:function(e,n,t){"use strict";t.r(n);var r=t(340);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},340:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,484))},uniNoticeBar:function(){return t.e("uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar").then(t.bind(null,548))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.couponList,(function(n,t){var r=e.__get_orig(n),o=n.title.indexOf("生日");return{$orig:r,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},i=!1,u=[];o._withStripped=!0},341:function(e,n,t){"use strict";t.r(n);var r=t(342),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},342:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(t(19)),o=t(14);function i(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,r,o,i,u){try{var a=e[i](u),c=a.value}catch(s){return void t(s)}a.done?n(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function a(e){u(i,r,o,a,c,"next",e)}function c(e){u(i,r,o,a,c,"throw",e)}a(void 0)}))}}var c={data:function(){return{userDetail:{},couponList:[]}},onLoad:function(){this.getUserDetail(),this.getPrivilegeCoupon()},methods:{openAuthenticate:function(){3==this.userDetail.examine?e.showToast({icon:"none",title:"认证已提交，1-3个工作日完成认证审核",duration:3e3,position:"top"}):e.navigateTo({url:"../student-privilege/authenticate"})},getUserDetail:function(){var e=this;return a(r.default.mark((function n(){var t,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.userDetail)();case 2:if(t=n.sent,i=t.data,1!=i.code){n.next=8;break}return n.abrupt("return",e.$api.msg(i.msg));case 8:e.userDetail=i.data,console.log(e.userDetail);case 10:case"end":return n.stop()}}),n)})))()},getPrivilegeCoupon:function(){var e=this;return a(r.default.mark((function n(){var t,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.privilegeCoupon)();case 2:if(t=n.sent,i=t.data,1!=i.code){n.next=8;break}return n.abrupt("return",e.$api.msg(i.msg));case 8:e.couponList=i.data,console.log("getPrivilegeCoupon",i);case 10:case"end":return n.stop()}}),n)})))()},openSiteContent:function(){e.navigateTo({url:"../site-content/site-content?id=5"})}}};n.default=c}).call(this,t(1)["default"])},343:function(e,n,t){"use strict";t.r(n);var r=t(344),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},344:function(e,n,t){}},[[337,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/student-privilege/student-privilege.js.map