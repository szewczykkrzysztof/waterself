!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=703)}({10:function(e,t,o){},703:function(e,t,o){"use strict";o.r(t);o(10);var n=document.querySelector(".import__history--js"),r=JSON.parse(localStorage.getItem("glassHistory"));function l(){for(var e=0;e<=29;e++){var t=new Date;t.setDate(t.getDate()-e);var o=t.toISOString().slice(0,10);console.log(o);var n=localStorage.getItem(o);console.log(n),n&&(console.log(e),console.log(r),r.unshift({data:o,glassCount:n}),console.log(r))}localStorage.setItem("glassHistory",JSON.stringify(r))}n.addEventListener("click",(function(e){return function(){r?(console.log("Tablica istnieje"),l()):(console.log("Zakładam nową tablicę"),r=[],l());console.log(r)}()}))}});