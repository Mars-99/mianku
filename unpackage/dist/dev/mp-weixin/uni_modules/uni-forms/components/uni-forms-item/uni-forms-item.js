(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-forms/components/uni-forms-item/uni-forms-item"],{570:function(e,t,r){"use strict";r.r(t);var i=r(571),n=r(573);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);r(575);var s,a=r(11),l=Object(a["default"])(n["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],s);l.options.__file="uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue",t["default"]=l.exports},571:function(e,t,r){"use strict";r.r(t);var i=r(572);r.d(t,"render",(function(){return i["render"]})),r.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),r.d(t,"components",(function(){return i["components"]}))},572:function(e,t,r){"use strict";var i;r.r(t),r.d(t,"render",(function(){return n})),r.d(t,"staticRenderFns",(function(){return s})),r.d(t,"recyclableRender",(function(){return o})),r.d(t,"components",(function(){return i}));try{i={uniIcons:function(){return Promise.all([r.e("common/vendor"),r.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(r.bind(null,484))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement;e._self._c},o=!1,s=[];n._withStripped=!0},573:function(e,t,r){"use strict";r.r(t);var i=r(574),n=r.n(i);for(var o in i)"default"!==o&&function(e){r.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},574:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(r(19));function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t,r,i,n,o,s){try{var a=e[o](s),l=a.value}catch(u){return void r(u)}a.done?t(l):Promise.resolve(l).then(i,n)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(i,n){var o=e.apply(t,r);function a(e){s(o,i,n,a,l,"next",e)}function l(e){s(o,i,n,a,l,"throw",e)}a(void 0)}))}}var l={name:"uniFormsItem",props:{custom:{type:Boolean,default:!1},showMessage:{type:Boolean,default:!0},name:String,required:Boolean,validateTrigger:{type:String,default:""},leftIcon:String,iconColor:{type:String,default:"#606266"},label:String,labelWidth:{type:[Number,String],default:""},labelAlign:{type:String,default:""},labelPosition:{type:String,default:""},errorMessage:{type:[String,Boolean],default:""},rules:{type:Array,default:function(){return[]}}},data:function(){return{errorTop:!1,errorBottom:!1,labelMarginBottom:"",errorWidth:"",errMsg:"",val:"",labelPos:"",labelWid:"",labelAli:"",showMsg:"undertext",border:!1,isFirstBorder:!1,isArray:!1,arrayField:""}},computed:{msg:function(){return this.errorMessage||this.errMsg},fieldStyle:function(){var e={};return"top"==this.labelPos&&(e.padding="0 0",this.labelMarginBottom="6px"),"left"==this.labelPos&&!1!==this.msg&&""!=this.msg?(e.paddingBottom="0px",this.errorBottom=!0,this.errorTop=!1):"top"==this.labelPos&&!1!==this.msg&&""!=this.msg?(this.errorBottom=!1,this.errorTop=!0):(this.errorTop=!1,this.errorBottom=!1),e},justifyContent:function(){return"left"===this.labelAli?"flex-start":"center"===this.labelAli?"center":"right"===this.labelAli?"flex-end":void 0},labelLeft:function(){return("left"===this.labelPos?parseInt(this.labelWid):0)+"px"}},watch:{validateTrigger:function(e){this.formTrigger=e}},created:function(){this.form=this.getForm(),this.group=this.getForm("uniGroup"),this.formRules=[],this.formTrigger=this.validateTrigger,this.name&&-1!==this.name.indexOf("[")&&-1!==this.name.indexOf("]")&&(this.isArray=!0,this.arrayField=this.name,this.form.formData[this.name]=this.form._getValue(this.name,""))},mounted:function(){this.form&&this.form.childrens.push(this),this.init()},destroyed:function(){this.__isUnmounted||this.unInit()},methods:{init:function(){if(this.form){var e=this.form,t=e.formRules,r=e.validator,i=(e.formData,e.value,e.labelPosition),n=e.labelWidth,o=e.labelAlign,s=e.errShowType;this.labelPos=this.labelPosition?this.labelPosition:i,this.label?this.labelWid=this.labelWidth?this.labelWidth:n||70:this.labelWid=this.labelWidth?this.labelWidth:n||"auto",this.labelWid&&"auto"!==this.labelWid&&(this.labelWid+="px"),this.labelAli=this.labelAlign?this.labelAlign:o,this.form.isFirstBorder||(this.form.isFirstBorder=!0,this.isFirstBorder=!0),this.group&&(this.group.isFirstBorder||(this.group.isFirstBorder=!0,this.isFirstBorder=!0)),this.border=this.form.border,this.showMsg=s;var a=this.isArray?this.arrayField:this.name;if(!a)return;t&&this.rules.length>0&&(t[a]||(t[a]={rules:this.rules}),r.updateSchema(t)),this.formRules=t[a]||{},this.validator=r}else this.labelPos=this.labelPosition||"left",this.labelWid=this.labelWidth||65,this.labelAli=this.labelAlign||"left"},unInit:function(){var e=this;this.form&&this.form.childrens.forEach((function(t,r){t===e&&(e.form.childrens.splice(r,1),delete e.form.formData[t.name])}))},getForm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",t=this.$parent,r=t.$options.name;while(r!==e){if(t=t.$parent,!t)return!1;r=t.$options.name}return t},clearValidate:function(){this.errMsg=""},setValue:function(e){var t=this.isArray?this.arrayField:this.name;if(t){if(this.errMsg&&(this.errMsg=""),this.form.formData[t]=this.form._getValue(t,e),!this.formRules||(this.formRules,"{}"===JSON.stringify(this.formRules)))return;this.triggerCheck(this.form._getValue(this.name,e))}},triggerCheck:function(t,r){var n=this;return a(i.default.mark((function s(){var a,l,u,f,h;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(null,n.errMsg="",n.validator&&0!==Object.keys(n.formRules).length){i.next=4;break}return i.abrupt("return");case 4:if(a=n.isRequired(n.formRules.rules||[]),l=n.isTrigger(n.formRules.validateTrigger,n.validateTrigger,n.form.validateTrigger),u=null,!l&&!r){i.next=12;break}return f=n.isArray?n.arrayField:n.name,i.next=11,n.validator.validateUpdate(o({},f,t),n.form.formData);case 11:u=i.sent;case 12:return a||void 0!==t&&""!==t||(u=null),h=n.form.inputChildrens.find((function(e){return e.rename===n.name})),(l||r)&&u&&u.errorMessage?(h&&(h.errMsg=u.errorMessage),"toast"===n.form.errShowType&&e.showToast({title:u.errorMessage||"校验错误",icon:"none"}),"modal"===n.form.errShowType&&e.showModal({title:"提示",content:u.errorMessage||"校验错误"})):h&&(h.errMsg=""),n.errMsg=u?u.errorMessage:"",n.form.validateCheck(u||null),i.abrupt("return",u||null);case 18:case"end":return i.stop()}}),s)})))()},isTrigger:function(e,t,r){return!("submit"===e||!e)||void 0===e&&("bind"===t||!t&&"bind"===r)},isRequired:function(e){for(var t=!1,r=0;r<e.length;r++){var i=e[r];if(i.required){t=!0;break}}return t}}};t.default=l}).call(this,r(1)["default"])},575:function(e,t,r){"use strict";r.r(t);var i=r(576),n=r.n(i);for(var o in i)"default"!==o&&function(e){r.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},576:function(e,t,r){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-forms/components/uni-forms-item/uni-forms-item-create-component',
    {
        'uni_modules/uni-forms/components/uni-forms-item/uni-forms-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(570))
        })
    },
    [['uni_modules/uni-forms/components/uni-forms-item/uni-forms-item-create-component']]
]);
