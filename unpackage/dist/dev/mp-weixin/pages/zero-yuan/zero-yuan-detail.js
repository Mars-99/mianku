(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/zero-yuan/zero-yuan-detail"],{385:function(e,t,n){"use strict";(function(e){n(5);r(n(3));var t=r(n(386));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},386:function(e,t,n){"use strict";n.r(t);var r=n(387),a=n(389);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(391);var u,o=n(11),c=Object(o["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"64fe7d0a",null,!1,r["components"],u);c.options.__file="pages/zero-yuan/zero-yuan-detail.vue",t["default"]=c.exports},387:function(e,t,n){"use strict";n.r(t);var r=n(388);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},388:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=!1,u=[];a._withStripped=!0},389:function(e,t,n){"use strict";n.r(t);var r=n(390),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},390:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n(19)),a=n(13),i=n(14);function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r,a,i,u){try{var o=e[i](u),c=o.value}catch(s){return void n(s)}o.done?t(c):Promise.resolve(c).then(r,a)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function u(e){o(i,r,a,u,c,"next",e)}function c(e){o(i,r,a,u,c,"throw",e)}u(void 0)}))}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={data:function(){return{detail_info:{share:{},prize:{}},userinfo:{},helpuserlist:[],type:0,can_receive:0,share:{title:"0元领福利",path:"/pages/index/index",imageUrl:"",desc:"",content:""},target:0,remain:0}},onLoad:function(){this.initData()},computed:f({},(0,a.mapGetters)(["getUserinfo","getNeedAuth","getIsLogin"])),methods:{initData:function(){var t=this;return c(r.default.mark((function n(){var a,u,o,c,s,f,d,l,p,h,m;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("被助力用户id:",t.$mp.query.recommend),t.loginAuth=e.getStorageSync("loginAuth"),t.loginAuth){n.next=6;break}return t.$api.msg("请先登录"),t.$api.href("../login/login"),n.abrupt("return");case 6:return n.next=8,(0,i.userDetail)();case 8:return a=n.sent,u=a.data,t.userinfo=u.data,n.next=13,(0,i.getShareDetail)();case 13:for(o=n.sent,c=o.data,t.detail_info.share=c.data.share,s=1;s<=10;s++)f="target"+s,d="reward"+s,l="prize"+s,c.data.share[f]>0&&c.data.share[d]>0&&(p=c.data[l].find((function(e){return e.id===Number(t.$mp.query.id)})),p&&(t.detail_info.prize=p,t.target=t.detail_info.share[f]));return t.$mp.query.recommend&&(t.type=1),n.next=20,(0,i.getHelpUserList)(1,10);case 20:h=n.sent,console.log("助力用户信息列表：",h),t.helpuserlist=h.data.data.rs,m=h.data.data.num,console.log("助力数：",m),m===t.target?t.can_receive=1:t.remain=t.target-m,t.Share();case 27:case"end":return n.stop()}}),n)})))()},Share:function(){this.share.title="0元领福利",this.share.path="@/zero-yuan/zero-yuan-detail?id="+this.detail_info.share.id+"&recommend="+this.userinfo.id,this.share.imageUrl=""},Help:function(){var e=this;return c(r.default.mark((function t(){var n,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$mp.query.recommend){t.next=6;break}return t.next=3,(0,i.userHelp)(Number(e.$mp.query.recommend),2);case 3:n=t.sent,a=n.data,console.log("助力活动返回结果：",a);case 6:case"end":return t.stop()}}),t)})))()},share_price:function(){return c(r.default.mark((function e(){var t,n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,i.getUserSharePrice)();case 2:t=e.sent,n=t.data,console.log("领取助力奖励返回结果：",n);case 5:case"end":return e.stop()}}),e)})))()}}};t.default=l}).call(this,n(1)["default"])},391:function(e,t,n){"use strict";n.r(t);var r=n(392),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},392:function(e,t,n){}},[[385,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/zero-yuan/zero-yuan-detail.js.map