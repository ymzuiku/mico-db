!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("nanoid")):"function"==typeof define&&define.amd?define(["exports","nanoid"],n):n((e=e||self).micoDb={},e.nanoid)}(this,function(e,o){"use strict";var c=function(){return(c=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)};function u(s,i,a,c){return new(a=a||Promise)(function(e,n){function r(e){try{o(c.next(e))}catch(e){n(e)}}function t(e){try{o(c.throw(e))}catch(e){n(e)}}function o(n){n.done?e(n.value):new a(function(e){e(n.value)}).then(r,t)}o((c=c.apply(s,i||[])).next())})}function b(r,t){var o,s,i,e,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=2&n[0]?s.return:n[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=t.call(r,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}}function l(e,n){if(e){var r=Object.keys(e)[0],t=e[r];1===t?n=n.sort(function(e,n){return e[r]-n[r]}):-1===t&&(n=n.sort(function(e,n){return n[r]-e[r]}))}return n}function f(v,d){function h(r){return u(void 0,void 0,void 0,function(){var n;return b(this,function(e){switch(e.label){case 0:return t[r]?[2,t[r]]:[4,d.get(r)];case 1:return n=e.sent(),t[r]=n,[2,t[r]]}})})}function p(n,r){return u(void 0,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return t[n]?[3,2]:[4,h(n)];case 1:e.sent(),e.label=2;case 2:return t[n]=r,[4,d.set(n,r)];case 3:return e.sent(),[2]}})})}function y(r){return u(void 0,void 0,void 0,function(){var n;return b(this,function(e){switch(e.label){case 0:return[4,h(r)];case 1:return(n=e.sent())||p(r,n=[]),[2,n]}})})}d.proxy||(d.proxy={});var a={proxy:d.proxy,index:function(r,t){return void 0===t&&(t=d.sort),u(void 0,void 0,void 0,function(){var n;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return n=e.sent(),d.init&&0===n.length?[4,a.insertOne(d.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return[2,(n=l(t,n))[r]]}})})},count:function(){return u(void 0,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return[2,e.sent().length]}})})},find:function(s,i){return void 0===i&&(i=d.sort),u(void 0,void 0,void 0,function(){var n,o,r,t;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return n=e.sent(),d.init&&0===n.length?[4,a.insertOne(d.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return n=l(i,n),0===(o=Object.keys(s||{})).length?[2,n]:(r="function"==typeof s?n.filter(s):n.filter(function(e){for(var n=!1,r=0;r<o.length;r++){var t=o[r];if(s[t]===e[t]){n=!0;break}}return n}),d.proxy.find?[4,Promise.resolve(d.proxy.find(s,r))]:[3,5]);case 4:e.sent(),e.label=5;case 5:return d.proxy.onChange?[4,h(v)]:[3,8];case 6:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 7:e.sent(),e.label=8;case 8:return[2,r]}})})},findOne:function(s){return u(void 0,void 0,void 0,function(){var n,o,r,t;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return n=e.sent(),d.init&&0===n.length?[4,a.insertOne(d.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return 0===(o=Object.keys(s||{})).length?[2,n[0]||{}]:(r="function"==typeof s?n.find(s):n.find(function(e){for(var n=!1,r=0;r<o.length;r++){var t=o[r];if(s[t]===e[t]){n=!0;break}}return n}),d.proxy.findOne?[4,Promise.resolve(d.proxy.findOne(s,r||{}))]:[3,5]);case 4:e.sent(),e.label=5;case 5:return d.proxy.onChange?[4,h(v)]:[3,8];case 6:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 7:e.sent(),e.label=8;case 8:return[2,r||{}]}})})},deleteMany:function(a){return u(void 0,void 0,void 0,function(){var n,o,s,i,r;return b(this,function(e){switch(e.label){case 0:return a=a||{},[4,y(v)];case 1:return n=e.sent(),0!==(o=Object.keys(a)).length?[3,8]:[4,p(v,[])];case 2:return e.sent(),d.proxy.deleteMany?[4,Promise.resolve(d.proxy.deleteMany(a,n))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 6:e.sent(),e.label=7;case 7:return[2,n];case 8:return s=[],i=[],n.forEach(function(e){for(var n=!1,r=0;r<o.length;r++){var t=o[r];if(a[t]===e[t]){n=!0;break}}n?s.push(e):i.push(e)}),[4,p(v,i)];case 9:return e.sent(),d.proxy.deleteMany?[4,Promise.resolve(d.proxy.deleteMany(a,s))]:[3,11];case 10:e.sent(),e.label=11;case 11:return d.proxy.onChange?[4,h(v)]:[3,14];case 12:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 13:e.sent(),e.label=14;case 14:return[2,s]}})})},deleteOne:function(a){return u(void 0,void 0,void 0,function(){var n,o,r,s,i,t;return b(this,function(e){switch(e.label){case 0:return a=a||{},[4,y(v)];case 1:return n=e.sent(),0!==(o=Object.keys(a)).length?[3,8]:(r=n.shift(),[4,p(v,n)]);case 2:return e.sent(),d.proxy.deleteOne?[4,Promise.resolve(d.proxy.deleteOne(a,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 6:e.sent(),e.label=7;case 7:return[2,r];case 8:return s=[],n.forEach(function(e){for(var n=!1,r=0;r<o.length;r++){var t=o[r];if(a[t]===e[t]){n=!0;break}}i?s.push(e):n?i=e:s.push(e)}),[4,p(v,s)];case 9:return e.sent(),d.proxy.deleteOne?[4,Promise.resolve(d.proxy.deleteOne(a,i))]:[3,11];case 10:e.sent(),e.label=11;case 11:return d.proxy.onChange?[4,h(v)]:[3,14];case 12:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 13:e.sent(),e.label=14;case 14:return[2,i]}})})},updateOne:function(l,f){return u(void 0,void 0,void 0,function(){var n,r,t,o,s,i,a,c,u;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:if(n=e.sent(),0===(r=Object.keys(l)).length)n[0]=Object.assign(n[0]||{},f);else for(o=0;o<n.length;o++){for(s=n[o]||{},i=!1,a=0;a<r.length;a++)if(c=r[a],l[c]===s[c]){i=!0;break}if(i){Object.assign(s,f),t=s;break}}return[4,p(v,n)];case 2:return e.sent(),d.proxy.updateOne?[4,Promise.resolve(d.proxy.updateOne(l,f,t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return u=e.sent(),[4,Promise.resolve(d.proxy.onChange(u))];case 6:e.sent(),e.label=7;case 7:return[2,t]}})})},updateMany:function(l,f){return u(void 0,void 0,void 0,function(){var n,r,t,o,s,i,a,c,u;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:for(n=e.sent(),r=Object.keys(l),t=[],o=0;o<n.length;o++){if(s=n[o]||{},!(i=0===r.length))for(a=0;a<r.length;a++)if(c=r[a],l[c]===s[c]){i=!0;break}i&&(Object.assign(s,f),t.push(s))}return[4,p(v,n)];case 2:return e.sent(),d.proxy.updateMany?[4,Promise.resolve(d.proxy.updateMany(l,f,t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return u=e.sent(),[4,Promise.resolve(d.proxy.onChange(u))];case 6:e.sent(),e.label=7;case 7:return[2,t]}})})},insertOne:function(t){return u(void 0,void 0,void 0,function(){var n,r;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return n=e.sent(),t._id||(t._id=o.nanoid()),n.push(t),[4,p(v,n)];case 2:return e.sent(),d.proxy.insertOne?[4,Promise.resolve(d.proxy.insertOne(t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 6:e.sent(),e.label=7;case 7:return[2,n]}})})},insertMany:function(t){return u(void 0,void 0,void 0,function(){var n,r;return b(this,function(e){switch(e.label){case 0:return[4,y(v)];case 1:return n=e.sent(),t.forEach(function(e){e._id||(e._id=o.nanoid()),n.push(e)}),[4,p(v,n)];case 2:return e.sent(),d.proxy.insertMany?[4,Promise.resolve(d.proxy.insertMany(t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h(v)]:[3,7];case 5:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 6:e.sent(),e.label=7;case 7:return[2,n]}})})},removeDuplicatie:function(c){return u(void 0,void 0,void 0,function(){var n,r,t,o,s,i,a;return b(this,function(e){switch(e.label){case 0:return[4,y(c)];case 1:for(n=e.sent(),r=[],t=new Set,o=0;o<n.length;o++)s=n[o],void 0!==(i=s[c])?t.has(i)||(t.add(i),r.push(s)):r.push(s);return[4,p(c,r)];case 2:return e.sent(),d.proxy.removeDuplicatie?[4,Promise.resolve(d.proxy.removeDuplicatie(c,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy&&d.proxy.onChange?[4,h(c)]:[3,7];case 5:return a=e.sent(),[4,Promise.resolve(d.proxy.onChange(a))];case 6:e.sent(),e.label=7;case 7:return[2,r]}})})},set:function(r){return u(void 0,void 0,void 0,function(){var n;return b(this,function(e){switch(e.label){case 0:return[4,p(v,r)];case 1:return e.sent(),d.proxy.onChange?[4,h(v)]:[3,4];case 2:return n=e.sent(),[4,Promise.resolve(d.proxy.onChange(n))];case 3:e.sent(),e.label=4;case 4:return[2]}})})}};return a}function n(e){var s;function r(e,n,r){var t=window[e];n=a.name+a.version+"_"+n,t.setItem(n,JSON.stringify({json:r}))}function n(e,n){var r=window[e].getItem(a.name+a.version+"_"+n),t=JSON.parse(r);if(t)return t.json}function t(e,n){window[e].removeItem(a.name+a.version+"_"+n)}function i(r){return new Promise(function(n){if(s)n(void 0);else{var e=window.indexedDB.open(a.name,a.version);e.onerror=console.error,e.onsuccess=function(e){s=s||e.target.result,n(void 0)},e.onupgradeneeded=function(e){(s=s||e.target.result).createObjectStore(r,{keyPath:"_id"})}}})}void 0===e&&(e="mico-db");var a={name:e,isHaveIndexedDb:void 0!==window.indexedDB,version:1,remove:function(t){return new Promise(function(n){if(!t)return n(void 0);if(!a.isHaveIndexedDb)return n(a.removeLocalStorage(t));var r=a.name+a.version;i(r).then(function(){if(s.objectStoreNames.contains(r)){var e=s.transaction([r],"readwrite").objectStore(r).delete(t);e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},collection:function(e,n){void 0===n&&(n={});var r=n.type||"indexedDB";return f(e,c(c({},n),{get:"indexedDB"===r?a.get:"sessionStorage"===r?a.getSessionStorage:a.getLocalStorage,set:"indexedDB"===r?a.set:"sessionStorage"===r?a.setSessionStorage:a.setLocalStorage}))},get:function(n){return new Promise(function(r){if(!n)return r(void 0);if(!a.isHaveIndexedDb)return r(a.getLocalStorage(n));var e=a.name+a.version;i(e).then(function(){s.objectStoreNames.contains(e)?s.transaction([e]).objectStore(e).get(n).onsuccess=function(e){var n=e.target.result;r(n&&n.obj)}:r(void 0)})})},set:function(t,o){return new Promise(function(n){if(!t)return n(void 0);if(!a.isHaveIndexedDb)return n(a.setLocalStorage(t,o));var r=a.name+a.version;i(r).then(function(){if(s.objectStoreNames.contains(r)){var e=s.transaction([r],"readwrite").objectStore(r).put({obj:o,_id:t});e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},setLocalStorage:function(e,n){r("localStorage",e,n)},getLocalStorage:function(e){return n("localStorage",e)},removeLocalStorage:function(e){t("localStorage",e)},setSessionStorage:function(e,n){r("sessionStorage",e,n)},getSessionStorage:function(e){return n("sessionStorage",e)},removeSessionStorage:function(e){t("sessionStorage",e)}};return a}var t={},r=n();e.createMicoDb=n,e.default=r,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
