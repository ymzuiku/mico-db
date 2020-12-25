!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).micoDb={})}(this,function(e){"use strict";function u(s,i,a,c){return new(a=a||Promise)(function(e,n){function t(e){try{o(c.next(e))}catch(e){n(e)}}function r(e){try{o(c.throw(e))}catch(e){n(e)}}function o(n){n.done?e(n.value):new a(function(e){e(n.value)}).then(t,r)}o((c=c.apply(s,i||[])).next())})}function p(t,r){var o,s,i,e,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return e={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function n(n){return function(e){return function(n){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,s&&(i=2&n[0]?s.return:n[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return a.label++,{value:n[1],done:!1};case 5:a.label++,s=n[1],n=[0];continue;case 7:n=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===n[0]||2===n[0])){a=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){a.label=n[1];break}if(6===n[0]&&a.label<i[1]){a.label=i[1],i=n;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(n);break}i[2]&&a.ops.pop(),a.trys.pop();continue}n=r.call(t,a)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,e])}}}function a(e,n){if(e){var t=Object.keys(e)[0],r=e[t];1===r?n=n.sort(function(e,n){return e[t]-n[t]}):-1===r&&(n=n.sort(function(e,n){return n[t]-e[t]}))}return n}function n(e){var s;function t(e,n,t){var r=window[e];n=h.name+h.version+"_"+n,r.setItem(n,JSON.stringify({json:t}))}function n(e,n){var t=window[e].getItem(h.name+h.version+"_"+n),r=JSON.parse(t);if(r)return r.json}function r(e,n){window[e].removeItem(h.name+h.version+"_"+n)}function i(t){return new Promise(function(n){if(s)n(void 0);else{var e=window.indexedDB.open(h.name,h.version);e.onerror=console.error,e.onsuccess=function(e){s=s||e.target.result,n(void 0)},e.onupgradeneeded=function(e){(s=s||e.target.result).createObjectStore(t,{keyPath:"_id"})}}})}function g(t){return u(this,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,h.get(t)];case 1:return(n=e.sent())||(n=[],h.set(t,n)),[2,n]}})})}function o(e,t,n){var r={set:void 0,get:void 0,remove:void 0};return"sessionStorage"===e?(r.set=h.setSessionStorage,r.get=h.getSessionStorage,r.remove=h.removeSessionStorage):(r.set=h.setLocalStorage,r.get=h.getLocalStorage,r.remove=h.removeLocalStorage),{get:function(){var e=r.get(t);return e||(e=n,r.set(t,e)),e},set:function(e){var n=r.get(t);r.set(t,Object.assign(n,e))},remove:function(){return r.remove(t)}}}void 0===e&&(e="mico-db");var h={name:e,isHaveIndexedDb:void 0!==window.indexedDB,version:1,remove:function(r){return new Promise(function(n){if(!r)return n(void 0);if(!h.isHaveIndexedDb)return n(h.removeLocalStorage(r));var t=h.name+h.version;i(t).then(function(){if(s.objectStoreNames.contains(t)){var e=s.transaction([t],"readwrite").objectStore(t).delete(r);e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},collection:function(v,d){return void 0===d&&(d={}),d.proxy||(d.proxy={}),{proxy:d.proxy,index:function(t,r){return void 0===r&&(r=d.sort),u(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),[2,(n=a(r,n))[t]]}})})},count:function(){return u(void 0,void 0,void 0,function(){return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return[2,e.sent().length]}})})},find:function(s,i){return void 0===i&&(i=d.sort),u(void 0,void 0,void 0,function(){var n,o,t,r;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),n=a(i,n),s?(o=Object.keys(s),t="function"==typeof s?n.filter(s):n.filter(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(s[r]===e[r]){n=!0;break}}return n}),d.proxy.find?[4,Promise.resolve(d.proxy.find(s,t))]:[3,3]):[2,n];case 2:e.sent(),e.label=3;case 3:return d.proxy.onChange?[4,h.get(v)]:[3,6];case 4:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 5:e.sent(),e.label=6;case 6:return[2,t]}})})},findOne:function(s){return u(void 0,void 0,void 0,function(){var n,o,t,r;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),o=Object.keys(s),t="function"==typeof s?n.find(s):n.find(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(s[r]===e[r]){n=!0;break}}return n}),d.proxy.findOne?[4,Promise.resolve(d.proxy.findOne(s,t))]:[3,3];case 2:e.sent(),e.label=3;case 3:return d.proxy.onChange?[4,h.get(v)]:[3,6];case 4:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 5:e.sent(),e.label=6;case 6:return[2,t]}})})},deleteMany:function(a){return u(void 0,void 0,void 0,function(){var n,o,s,i,t;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),o=Object.keys(a),s=[],i=[],n.forEach(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(a[r]===e[r]){n=!0;break}}n?i.push(e):s.push(e)}),[4,h.set(v,s)];case 2:return e.sent(),d.proxy.deleteMany?[4,Promise.resolve(d.proxy.deleteMany(a,i))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 6:e.sent(),e.label=7;case 7:return[2,i]}})})},deleteOne:function(a){return u(void 0,void 0,void 0,function(){var n,o,s,i,t;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),o=Object.keys(a),s=[],n.forEach(function(e){for(var n=!1,t=0;t<o.length;t++){var r=o[t];if(a[r]===e[r]){n=!0;break}}i?s.push(e):n?i=e:s.push(e)}),[4,h.set(v,s)];case 2:return e.sent(),d.proxy.deleteOne?[4,Promise.resolve(d.proxy.deleteOne(a,i))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 6:e.sent(),e.label=7;case 7:return[2,i]}})})},updateOne:function(l,f){return u(void 0,void 0,void 0,function(){var n,t,r,o,s,i,a,c,u;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:for(n=e.sent(),t=Object.keys(l),o=0;o<n.length;o++){for(s=n[o],i=!1,a=0;a<t.length;a++)if(c=t[a],l[c]===s[c]){i=!0;break}if(i){Object.assign(s,f),r=s;break}}return[4,h.set(v,n)];case 2:return e.sent(),d.proxy.updateOne?[4,Promise.resolve(d.proxy.updateOne(l,f,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return u=e.sent(),[4,Promise.resolve(d.proxy.onChange(u))];case 6:e.sent(),e.label=7;case 7:return[2,r]}})})},updateMany:function(l,f){return u(void 0,void 0,void 0,function(){var n,t,r,o,s,i,a,c,u;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:for(n=e.sent(),t=Object.keys(l),r=[],o=0;o<n.length;o++){for(s=n[o],i=!1,a=0;a<t.length;a++)if(c=t[a],l[c]===s[c]){i=!0;break}i&&(Object.assign(s,f),r.push(s))}return[4,h.set(v,n)];case 2:return e.sent(),d.proxy.updateMany?[4,Promise.resolve(d.proxy.updateMany(l,f,r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return u=e.sent(),[4,Promise.resolve(d.proxy.onChange(u))];case 6:e.sent(),e.label=7;case 7:return[2,r]}})})},insertOne:function(r){return u(void 0,void 0,void 0,function(){var n,t;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return(n=e.sent()).push(r),[4,h.set(v,n)];case 2:return e.sent(),d.proxy.insertOne?[4,Promise.resolve(d.proxy.insertOne(r))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return t=e.sent(),[4,Promise.resolve(d.proxy.onChange(t))];case 6:e.sent(),e.label=7;case 7:return[2,n]}})})},insertMany:function(o){return u(void 0,void 0,void 0,function(){var n,t,r;return p(this,function(e){switch(e.label){case 0:return[4,g(v)];case 1:return n=e.sent(),t=n.concat(o),[4,h.set(v,t)];case 2:return e.sent(),d.proxy.insertMany?[4,Promise.resolve(d.proxy.insertMany(o))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy.onChange?[4,h.get(v)]:[3,7];case 5:return r=e.sent(),[4,Promise.resolve(d.proxy.onChange(r))];case 6:e.sent(),e.label=7;case 7:return[2,n]}})})},removeDuplicatie:function(c){return u(void 0,void 0,void 0,function(){var n,t,r,o,s,i,a;return p(this,function(e){switch(e.label){case 0:return[4,g(c)];case 1:for(n=e.sent(),t=[],r=new Set,o=0;o<n.length;o++)s=n[o],void 0!==(i=s[c])?r.has(i)||(r.add(i),t.push(s)):t.push(s);return[4,h.set(c,t)];case 2:return e.sent(),d.proxy.removeDuplicatie?[4,Promise.resolve(d.proxy.removeDuplicatie(c,t))]:[3,4];case 3:e.sent(),e.label=4;case 4:return d.proxy&&d.proxy.onChange?[4,h.get(c)]:[3,7];case 5:return a=e.sent(),[4,Promise.resolve(d.proxy.onChange(a))];case 6:e.sent(),e.label=7;case 7:return[2,t]}})})},set:function(t){return u(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,h.set(v,t)];case 1:return e.sent(),d.proxy.onChange?[4,h.get(v)]:[3,4];case 2:return n=e.sent(),[4,Promise.resolve(d.proxy.onChange(n))];case 3:e.sent(),e.label=4;case 4:return[2]}})})}}},dbItem:function(r,t){return{get:function(){return u(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,h.get(r)];case 1:return void 0!==(n=e.sent())?[3,3]:(n=t,[4,h.set(r,n)]);case 2:e.sent(),e.label=3;case 3:return[2,n]}})})},set:function(t){return u(void 0,void 0,void 0,function(){var n;return p(this,function(e){switch(e.label){case 0:return[4,h.set(r,t)];case 1:return n=e.sent(),[4,h.set(r,Object.assign(n,t))];case 2:return e.sent(),[2]}})})},remove:function(){return h.remove(r)}}},sessionItem:function(e,n){return o("sessionStorage",e,n)},localItem:function(e,n){return o("localStorage",e,n)},get:function(n){return new Promise(function(t){if(!n)return t(void 0);if(!h.isHaveIndexedDb)return t(h.getLocalStorage(n));var e=h.name+h.version;i(e).then(function(){s.objectStoreNames.contains(e)?s.transaction([e]).objectStore(e).get(n).onsuccess=function(e){var n=e.target.result;t(n&&n.obj)}:t(void 0)})})},set:function(r,o){return new Promise(function(n){if(!r)return n(void 0);if(!h.isHaveIndexedDb)return n(h.setLocalStorage(r,o));var t=h.name+h.version;i(t).then(function(){if(s.objectStoreNames.contains(t)){var e=s.transaction([t],"readwrite").objectStore(t).put({obj:o,_id:r});e.onerror=function(e){console.error(e),n(void 0)},e.onsuccess=n}else n(void 0)})})},setLocalStorage:function(e,n){t("localStorage",e,n)},getLocalStorage:function(e){return n("localStorage",e)},removeLocalStorage:function(e){r("localStorage",e)},setSessionStorage:function(e,n){t("sessionStorage",e,n)},getSessionStorage:function(e){return n("sessionStorage",e)},removeSessionStorage:function(e){r("sessionStorage",e)}};return h}var t=n();e.createMicoDb=n,e.default=t,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map