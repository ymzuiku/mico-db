!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).micoDb={})}(this,function(e){"use strict";var o=function(){return(o=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)};function c(i,s,a,c){return new(a=a||Promise)(function(e,n){function t(e){try{o(c.next(e))}catch(e){n(e)}}function r(e){try{o(c.throw(e))}catch(e){n(e)}}function o(n){n.done?e(n.value):new a(function(e){e(n.value)}).then(t,r)}o((c=c.apply(i,s||[])).next())})}function p(t,r){var o,i,s,e,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=2&n[0]?i.return:n[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,n[1])).done)return s;switch(i=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,i=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){a.label=n[1];break}if(6===n[0]&&a.label<s[1]){a.label=s[1],s=n;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(n);break}s[2]&&a.ops.pop(),a.trys.pop();continue}n=r.call(t,a)}catch(e){n=[6,e],i=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}}function r(){return"u"+Date.now()+Math.random()}function b(t,e,n){t.proxy.onChange&&e(n).then(function(e){var n=JSON.stringify(e);t.lastOnChange!==n&&t.proxy.onChange(e),t.lastOnChange=n})}function a(e,n){if(e){var t=Object.keys(e)[0],r=e[t];1===r?n=n.sort(function(e,n){return e[t]-n[t]}):-1===r&&(n=n.sort(function(e,n){return n[t]-e[t]}))}return n}function u(f,v){function d(t){return c(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return i[t]?[2,i[t]]:[4,v.get(t)];case 1:return n=e.sent(),i[t]=n,[2,i[t]]}})})}function h(n,t){return c(void 0,void 0,void 0,function(){return p(this,function(e){switch(e.label){case 0:return i[n]?[3,2]:[4,d(n)];case 1:e.sent(),e.label=2;case 2:return i[n]=t,[4,v.set(n,t)];case 3:return e.sent(),[2]}})})}function g(t){return c(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,d(t)];case 1:return(n=e.sent())||h(t,n=[]),[2,n]}})})}v.proxy||(v.proxy={});var s={proxy:v.proxy,index:function(t,r){return void 0===r&&(r=v.sort),c(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return n=e.sent(),v.init&&0===n.length?[4,s.insertOne(v.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return[2,(n=a(r,n))[t]]}})})},count:function(){return c(void 0,void 0,void 0,function(){return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return[2,e.sent().length]}})})},find:function(i,r){return void 0===r&&(r=v.sort),c(void 0,void 0,void 0,function(){var n,o,t;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return n=e.sent(),v.init&&0===n.length?[4,s.insertOne(v.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return n=a(r,n),0===(o=Object.keys(i||{})).length?[2,n]:(t="function"==typeof i?n.filter(i):n.filter(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(i[r]===e[r]){n=!0;break}}return n}),v.proxy.find?[4,Promise.resolve(v.proxy.find(i,t))]:[3,5]);case 4:e.sent(),e.label=5;case 5:return[2,t]}})})},findOne:function(i){return c(void 0,void 0,void 0,function(){var n,o,t;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return n=e.sent(),v.init&&0===n.length?[4,s.insertOne(v.init)]:[3,3];case 2:e.sent(),e.label=3;case 3:return 0===(o=Object.keys(i||{})).length?[2,n[0]||{}]:(t="function"==typeof i?n.find(i):n.find(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(i[r]===e[r]){n=!0;break}}return n}),v.proxy.findOne?[4,Promise.resolve(v.proxy.findOne(i,t||{}))]:[3,5]);case 4:e.sent(),e.label=5;case 5:return[2,t||{}]}})})},deleteMany:function(a){return c(void 0,void 0,void 0,function(){var n,o,t,i,s;return p(this,function(e){switch(e.label){case 0:return a=a||{},[4,g(f)];case 1:return n=e.sent(),0!==(o=Object.keys(a)).length?[3,8]:[4,h(f,[])];case 2:return e.sent(),v.proxy.deleteMany?[4,Promise.resolve(v.proxy.deleteMany(a,n))]:[3,4];case 3:e.sent(),e.label=4;case 4:return v.proxy.onChange?[4,d(f)]:[3,7];case 5:return t=e.sent(),[4,Promise.resolve(v.proxy.onChange(t))];case 6:e.sent(),e.label=7;case 7:return[2,n];case 8:return i=[],s=[],n.forEach(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(a[r]===e[r]){n=!0;break}}n?i.push(e):s.push(e)}),[4,h(f,s)];case 9:return e.sent(),v.proxy.deleteMany?[4,Promise.resolve(v.proxy.deleteMany(a,i))]:[3,11];case 10:e.sent(),e.label=11;case 11:return b(v,d,f),[2,i]}})})},deleteOne:function(a){return c(void 0,void 0,void 0,function(){var n,o,t,i,s;return p(this,function(e){switch(e.label){case 0:return a=a||{},[4,g(f)];case 1:return n=e.sent(),0!==(o=Object.keys(a)).length?[3,5]:(t=n.shift(),[4,h(f,n)]);case 2:return e.sent(),v.proxy.deleteOne?[4,Promise.resolve(v.proxy.deleteOne(a,t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,f),[2,t];case 5:return i=[],n.forEach(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(a[r]===e[r]){n=!0;break}}s?i.push(e):n?s=e:i.push(e)}),[4,h(f,i)];case 6:return e.sent(),v.proxy.deleteOne?[4,Promise.resolve(v.proxy.deleteOne(a,s))]:[3,8];case 7:e.sent(),e.label=8;case 8:return b(v,d,f),[2,s]}})})},updateOne:function(u,l){return c(void 0,void 0,void 0,function(){var n,t,r,o,i,s,a,c;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:if(n=e.sent(),0===(t=Object.keys(u)).length)n[0]=Object.assign(n[0]||{},l);else for(o=0;o<n.length;o++){for(i=n[o]||{},s=!1,a=0;a<t.length;a++)if(c=t[a],u[c]===i[c]){s=!0;break}if(s){Object.assign(i,l),r=i;break}}return[4,h(f,n)];case 2:return e.sent(),v.proxy.updateOne?[4,Promise.resolve(v.proxy.updateOne(u,l,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,f),[2,r]}})})},updateMany:function(u,l){return c(void 0,void 0,void 0,function(){var n,t,r,o,i,s,a,c;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:for(n=e.sent(),t=Object.keys(u),r=[],o=0;o<n.length;o++){if(i=n[o]||{},!(s=0===t.length))for(a=0;a<t.length;a++)if(c=t[a],u[c]===i[c]){s=!0;break}s&&(Object.assign(i,l),r.push(i))}return[4,h(f,n)];case 2:return e.sent(),v.proxy.updateMany?[4,Promise.resolve(v.proxy.updateMany(u,l,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,f),[2,r]}})})},insertOne:function(t){return c(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return n=e.sent(),t._id||(t._id=r()),n.push(t),[4,h(f,n)];case 2:return e.sent(),v.proxy.insertOne?[4,Promise.resolve(v.proxy.insertOne(t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,f),[2,n]}})})},insertMany:function(t){return c(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,g(f)];case 1:return n=e.sent(),t.forEach(function(e){e._id||(e._id=r()),n.push(e)}),[4,h(f,n)];case 2:return e.sent(),v.proxy.insertMany?[4,Promise.resolve(v.proxy.insertMany(t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,f),[2,n]}})})},removeDuplicatie:function(a){return c(void 0,void 0,void 0,function(){var n,t,r,o,i,s;return p(this,function(e){switch(e.label){case 0:return[4,g(a)];case 1:for(n=e.sent(),t=[],r=new Set,o=0;o<n.length;o++)i=n[o],void 0!==(s=i[a])?r.has(s)||(r.add(s),t.push(i)):t.push(i);return[4,h(a,t)];case 2:return e.sent(),v.proxy.removeDuplicatie?[4,Promise.resolve(v.proxy.removeDuplicatie(a,t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return b(v,d,a),[2,t]}})})},set:function(n){return c(void 0,void 0,void 0,function(){return p(this,function(e){switch(e.label){case 0:return[4,h(f,n)];case 1:return e.sent(),b(v,d,f),[2]}})})}};return s}function l(t,r){var o=function(e){if(e){var n=o.get();return Object.assign(n,e),o.set(n),n}return o.get()};return o.get=function(){var e=r.get(t);return e||(e=r.init,r.set(t,e)),e},o.set=function(e){return r.set(t,e),e},o.merge=function(e){var n=r.get(t);return Object.assign(n,e),r.set(t,n),n},o}function n(e){var i;function t(e,n,t){var r=window[e];n=a.name+a.version+"_"+n,r.setItem(n,JSON.stringify({json:t}))}function n(e,n){var t=window[e].getItem(a.name+a.version+"_"+n),r=JSON.parse(t);if(r)return r.json}function r(e,n){window[e].removeItem(a.name+a.version+"_"+n)}function s(t){return new Promise(function(n){if(i)n(void 0);else{var e=window.indexedDB.open(a.name,a.version);e.onerror=console.error,e.onsuccess=function(e){i=i||e.target.result,n(void 0)},e.onupgradeneeded=function(e){(i=i||e.target.result).createObjectStore(t,{keyPath:"_id"})}}})}void 0===e&&(e="mico-db");var a={name:e,isHaveIndexedDb:void 0!==window.indexedDB,version:1,remove:function(r){return new Promise(function(n){if(!r)return n(void 0);if(!a.isHaveIndexedDb)return n(a.removeLocalStorage(r));var t=a.name+a.version;s(t).then(function(){if(i.objectStoreNames.contains(t)){var e=i.transaction([t],"readwrite").objectStore(t).delete(r);e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},collection:function(e,n){void 0===n&&(n={});var t=n.type||"indexedDB";return u(e,o(o({},n),{get:"indexedDB"===t?a.get:"sessionStorage"===t?a.getSessionStorage:a.getLocalStorage,set:"indexedDB"===t?a.set:"sessionStorage"===t?a.setSessionStorage:a.setLocalStorage}))},localItem:function(e,n){return l(e,{init:n,type:"localStorage",set:a.setLocalStorage,get:a.getLocalStorage})},sessionItem:function(e,n){return l(e,{init:n,type:"sessionStorage",set:a.setSessionStorage,get:a.getSessionStorage})},get:function(n){return new Promise(function(t){if(!n)return t(void 0);if(!a.isHaveIndexedDb)return t(a.getLocalStorage(n));var e=a.name+a.version;s(e).then(function(){i.objectStoreNames.contains(e)?i.transaction([e]).objectStore(e).get(n).onsuccess=function(e){var n=e.target.result;t(n&&n.obj)}:t(void 0)})})},set:function(r,o){return new Promise(function(n){if(!r)return n(void 0);if(!a.isHaveIndexedDb)return n(a.setLocalStorage(r,o));var t=a.name+a.version;s(t).then(function(){if(i.objectStoreNames.contains(t)){var e=i.transaction([t],"readwrite").objectStore(t).put({obj:o,_id:r});e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},setLocalStorage:function(e,n){t("localStorage",e,n)},getLocalStorage:function(e){return n("localStorage",e)},removeLocalStorage:function(e){r("localStorage",e)},setSessionStorage:function(e,n){t("sessionStorage",e,n)},getSessionStorage:function(e){return n("sessionStorage",e)},removeSessionStorage:function(e){r("sessionStorage",e)}};return a}var i={},t=n();e.createMicoDb=n,e.default=t,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
