(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ug-address/ug-address"],{"1b6a":function(t,e,r){"use strict";var n=r("ca97"),a=r.n(n);a.a},"23a3":function(t,e,r){"use strict";r.r(e);var n=r("8991"),a=r("b3df");for(var c in a)["default"].indexOf(c)<0&&function(t){r.d(e,t,(function(){return a[t]}))}(c);r("1b6a");var o=r("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=u.exports},2517:function(t,e,r){"use strict";(function(t){var n=r("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(r("9523")),c=r("26cb");function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){(0,a.default)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var s={data:function(){return{}},computed:u(u({},(0,c.mapState)("user",["address"])),(0,c.mapGetters)("user",["addStr"])),methods:u(u({},(0,c.mapMutations)("user",["updateAddress"])),{},{chooseAddress:function(){var e=this;t.chooseAddress({success:function(t){e.updateAddress(t)},fail:function(){t.showToast({title:"取消成功",icon:"none"})}})}})};e.default=s}).call(this,r("543d")["default"])},8991:function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=(this._self._c,JSON.stringify(this.address));this.$mp.data=Object.assign({},{$root:{g0:e}})},a=[]},b3df:function(t,e,r){"use strict";r.r(e);var n=r("2517"),a=r.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){r.d(e,t,(function(){return n[t]}))}(c);e["default"]=a.a},ca97:function(t,e,r){},e78f:function(t,e,r){"use strict";(function(t,e){var n=r("4ea4");r("7d85");n(r("66fd"));var a=n(r("23a3"));t.__webpack_require_UNI_MP_PLUGIN__=r,e(a.default)}).call(this,r("bc2e")["default"],r("543d")["createPage"])}},[["e78f","common/runtime","common/vendor"]]]);