(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/customer-service"],{353:function(t,e,n){"use strict";(function(t){n(5);r(n(3));var e=r(n(354));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},354:function(t,e,n){"use strict";n.r(e);var r=n(355),o=n(357);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n(359);var c,a=n(11),s=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"a7c1c04e",null,!1,r["components"],c);s.options.__file="pages/news/customer-service.vue",e["default"]=s.exports},355:function(t,e,n){"use strict";n.r(e);var r=n(356);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},356:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return c})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=!1,c=[];o._withStripped=!0},357:function(t,e,n){"use strict";n.r(e);var r=n(358),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},358:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n(19)),o=n(17),i=n(14),c=n(13);function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,r,o,i,c){try{var a=t[i](c),s=a.value}catch(u){return void n(u)}a.done?e(s):Promise.resolve(s).then(r,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){s(i,r,o,c,a,"next",t)}function a(t){s(i,r,o,c,a,"throw",t)}c(void 0)}))}}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d={data:function(){return{type:"",userId:0,userinfo:{},face:"",chatList:[],inputBottom:0,inputmsg:"",scrollTop:0,mitemHeight:0,contentViewHeight:0,showLoad:!1,delay_timer:{}}},computed:f({},(0,c.mapState)(["hasLogin"])),onShow:function(){var e=this;t.onKeyboardHeightChange((function(t){console.log("aaaaa",t.height),t.height>0?e.inputBottom=t.height-40:e.inputBottom=0}))},onUnload:function(){console.log("清除定时器"),clearInterval(this.delay_timer)},mounted:function(){var e=this,n=t.getSystemInfoSync();console.log("resSystem: ",n),this.contentViewHeight=n.windowHeight;var r=(0,o.handTime)(),i=t.getStorageSync("chatFlag");console.log("isFirstInKefu: ",i),i||setTimeout((function(){e.chatList.push({id:99998,uid:1,face:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png",userName:"眠库客服",msg:"你可以通过联系客服电话15364037300、15580819506与我们联系。添加客服微信获取专属服务 VX：123456789",createdAt:r});var n=[{id:99998,uid:1,face:"https://mkhotel.oss-cn-shanghai.aliyuncs.com/static/image/logo-jxw.png",userName:"眠库客服",msg:"你可以通过联系客服电话15364037300、15580819506与我们联系。添加客服微信获取专属服务 VX：123456789",createdAt:r}];t.setStorage({key:"chatFlag",data:n,success:function(t){console.log("res: ",t)}})}),1e3),this.initData(0,0),this.getUserDetail(),this.delay_timer=setInterval((function(){e.askNewMsg(e.chatList[e.chatList.length-1].id)}),15e3)},methods:{getUserDetail:function(){var t=this;return u(r.default.mark((function e(){var n,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,i.userDetail)();case 2:n=e.sent,o=n.data,t.userinfo=o.data,t.userId=t.userinfo.id,console.log("userinfo",o.data,t.userId);case 7:case"end":return e.stop()}}),e)})))()},initData:function(e,n){var o=this;return u(r.default.mark((function c(){var a,s,u,l;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,i.getUserImList)(e,n);case 2:if(a=r.sent,s=a.data,console.log("res: ",s),-1!=s.code){r.next=8;break}return o.showLoad=!1,r.abrupt("return",o.$api.msg("获取聊天信息列表失败!"+s.msg,"none"));case 8:console.log("res.data.rs.length",s.data.rs.length),s.data.rs.length?(o.chatList=1==n?s.data.rs.reverse().concat(o.chatList):o.chatList.concat(s.data.rs.reverse()),s.data.rs.length<10&&(u=t.getStorageSync("chatFlag"),u&&(o.chatList=u.concat(o.chatList)),o.showLoad=!1)):(l=t.getStorageSync("chatFlag"),l&&(o.chatList=l.concat(o.chatList))),0==n&&o.$nextTick((function(){this.pageScrollToBottom()}));case 11:case"end":return r.stop()}}),c)})))()},askNewMsg:function(t){var e=this;return u(r.default.mark((function n(){var o,c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.getUserImList)(t,0);case 2:if(o=n.sent,c=o.data,console.log("最新的消息res: ",c),1!=c.code){n.next=7;break}return n.abrupt("return",e.$api.msg("获取聊天信息列表失败!"+c.msg,"none"));case 7:c.data.rs.length&&(e.chatList=e.chatList.concat(c.data.rs.reverse()));case 8:case"end":return n.stop()}}),n)})))()},inputFocus:function(t){t.detail.height>0?this.inputBottom=t.detail.height-40:this.inputBottom=0,this.$nextTick((function(){this.pageScrollToBottom()}))},inputBlur:function(){this.inputBottom=0},publishMsg:function(){var t=this;return u(r.default.mark((function e(){var n,c,a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.inputmsg.trim()){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,(0,i.getUserImAdd)(t.inputmsg);case 4:if(n=e.sent,c=n.data,console.log("res: ",c),1!=c.code){e.next=9;break}return e.abrupt("return",t.$api.msg("发送信息失败!"+c.msg,"none"));case 9:a={id:c.data.id,uid:t.userId,face:t.userinfo.face,msg:t.inputmsg,createdAt:(0,o.handTime)()},t.chatList.push(a),t.inputmsg="",t.$nextTick((function(){this.pageScrollToBottom()}));case 13:case"end":return e.stop()}}),e)})))()},pageScrollToBottom:function(){var e=this,n=t.createSelectorQuery();n.selectAll(".chat-items").boundingClientRect(),n.select(".chat-scroll").boundingClientRect(),n.exec((function(t){e.mitemHeight=0,console.log("res",t),t[0].forEach((function(t){return e.mitemHeight=e.mitemHeight+t.height+60})),console.log("inputBottom",e.inputBottom),console.log("mitemHeight",e.mitemHeight),console.log("contentViewHeight",e.contentViewHeight),setTimeout((function(){e.mitemHeight>e.contentViewHeight?(console.log("_self.scrollTop1",e.scrollTop),e.scrollTop=e.mitemHeight-e.contentViewHeight,console.log("_self.scrollTop2",e.scrollTop)):console.log("_self.scrollTop3",e.scrollTop)}),100)}))},scrollToTop:function(){99998!=this.chatList[0].id&&(console.log("滑到顶部了"),this.showLoad=!0,this.initData(this.chatList[0].id,1))}}};e.default=d}).call(this,n(1)["default"])},359:function(t,e,n){"use strict";n.r(e);var r=n(360),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},360:function(t,e,n){}},[[353,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/customer-service.js.map