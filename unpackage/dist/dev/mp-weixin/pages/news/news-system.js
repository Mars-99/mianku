(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/news-system"],{345:function(e,t,n){"use strict";(function(e){n(5);r(n(3));var t=r(n(346));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},346:function(e,t,n){"use strict";n.r(t);var r=n(347),i=n(349);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n(351);var s,a=n(11),c=Object(a["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,"4e7aef26",null,!1,r["components"],s);c.options.__file="pages/news/news-system.vue",t["default"]=c.exports},347:function(e,t,n){"use strict";n.r(t);var r=n(348);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},348:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return r}));try{r={loadMore:function(){return n.e("components/load-more/load-more").then(n.bind(null,555))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.messageList,(function(t,n){var r=e.__get_orig(t),i=e.$api.timeHandle(t.updatedAt);return{$orig:r,g0:i}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},o=!1,s=[];i._withStripped=!0},349:function(e,t,n){"use strict";n.r(t);var r=n(350),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=i.a},350:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(n(19)),i=n(14),o=n(13);function s(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,r,i,o,s){try{var a=e[o](s),c=a.value}catch(u){return void n(u)}a.done?t(c):Promise.resolve(c).then(r,i)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function s(e){a(o,r,i,s,c,"next",e)}function c(e){a(o,r,i,s,c,"throw",e)}s(void 0)}))}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={data:function(){return{messageList:[],winSize:{},showShade:!1,showPop:!1,popStyle:"",popButton:["删除该消息","复制"],currentPage:1,totalPage:1,loadingType:0,pickerMsgId:0,pickedMsg:""}},computed:d({},(0,o.mapState)(["hasLogin"])),onShow:function(){this.askUserNewMsg(),this.getWindowSize(),this.initData()},methods:{initData:function(){var e=this;return c(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.getUserMsgList)();case 2:if(n=t.sent,o=n.data,console.log(o),1!=o.code){t.next=7;break}return t.abrupt("return",e.$api.msg(o.msg));case 7:e.totalPage=o.data.pages,1==o.data.page?e.messageList=o.data.rs:e.messageList=e.messageList.concat(o.data.rs);case 9:case"end":return t.stop()}}),t)})))()},getWindowSize:function(){var t=this;e.getSystemInfo({success:function(e){t.winSize={witdh:e.windowWidth,height:e.windowHeight}}})},openModal:function(e,t,n,r){var i=this,o=[e.touches[0],""],s=o[0],a=o[1];a=s.clientY>this.winSize.height/2?"bottom:".concat(this.winSize.height-s.clientY,"px;"):"top:".concat(s.clientY,"px;"),s.clientX>this.winSize.witdh/2?a+="right:".concat(this.winSize.witdh-s.clientX,"px"):a+="left:".concat(s.clientX,"px"),this.popStyle=a,this.pickerMsgId=Number(t),this.pickedMsg=r,this.showShade=!0,this.$nextTick((function(){setTimeout((function(){i.showPop=!0}),10)}))},hidePop:function(){var e=this;this.showPop=!1,setTimeout((function(){e.showShade=!1}),250)},pickerMenu:function(t,n){"删除该消息"==t&&0==n&&this.goDelMsg(),"复制"==t&&1==n&&e.setClipboardData({data:this.pickedMsg,showToast:!0,success:function(e){console.log(e)}})},goReadMsg:function(t,n){var o=this;return c(r.default.mark((function s(){var a,c,u,d;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(0===n){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,(0,i.getUserMsgRead)(t);case 4:if(a=r.sent,c=a.data,console.log(c),1!=c.code){r.next=9;break}return r.abrupt("return",o.$api.msg(c.msg));case 9:u=o.messageList.findIndex((function(e){return e.id==t})),u>-1&&(o.messageList[u].state=1),o.$forceUpdate(),o.systemNum--,d=o.systemNum+o.friendNum,d?e.setTabBarBadge({index:2,text:d+""}):e.removeTabBarBadge({index:2});case 15:case"end":return r.stop()}}),s)})))()},goDelMsg:function(){var e=this;return c(r.default.mark((function t(){var n,o,s;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.getUserMsgDel)(e.pickerMsgId);case 2:if(n=t.sent,o=n.data,console.log(o),1!=o.code){t.next=7;break}return t.abrupt("return",e.$api.msg(o.msg));case 7:s=e.messageList.findIndex((function(t){return t.id==e.pickerMsgId})),s>-1&&e.messageList.splice(s,1);case 9:case"end":return t.stop()}}),t)})))()}}};t.default=l}).call(this,n(1)["default"])},351:function(e,t,n){"use strict";n.r(t);var r=n(352),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=i.a},352:function(e,t,n){}},[[345,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/news-system.js.map