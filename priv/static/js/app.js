(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};

require.register("phoenix/priv/static/phoenix.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "phoenix");
  (function() {
    !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Phoenix=t():e.Phoenix=t()}(this,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){e.exports=t.Phoenix=n(2)}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function c(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.r(t),n.d(t,"Channel",function(){return j}),n.d(t,"Serializer",function(){return R}),n.d(t,"Socket",function(){return C}),n.d(t,"LongPoll",function(){return T}),n.d(t,"Ajax",function(){return w}),n.d(t,"Presence",function(){return E});var u="undefined"!=typeof self?self:null,h="undefined"!=typeof window?window:null,l=u||h||void 0,f="2.0.0",d={connecting:0,open:1,closing:2,closed:3},p=1e4,v={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},y={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},m=[y.close,y.error,y.join,y.reply,y.leave],g={longpoll:"longpoll",websocket:"websocket"},k=function(e){if("function"==typeof e)return e;return function(){return e}},b=function(){function e(t,n,i,o){s(this,e),this.channel=t,this.event=n,this.payload=i||function(){return{}},this.receivedResp=null,this.timeout=o,this.timeoutTimer=null,this.recHooks=[],this.sent=!1}return c(e,[{key:"resend",value:function(e){this.timeout=e,this.reset(),this.send()}},{key:"send",value:function(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}},{key:"receive",value:function(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}},{key:"reset",value:function(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}},{key:"matchReceive",value:function(e){var t=e.status,n=e.response;e.ref;this.recHooks.filter(function(e){return e.status===t}).forEach(function(e){return e.callback(n)})}},{key:"cancelRefEvent",value:function(){this.refEvent&&this.channel.off(this.refEvent)}},{key:"cancelTimeout",value:function(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}},{key:"startTimeout",value:function(){var e=this;this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,function(t){e.cancelRefEvent(),e.cancelTimeout(),e.receivedResp=t,e.matchReceive(t)}),this.timeoutTimer=setTimeout(function(){e.trigger("timeout",{})},this.timeout)}},{key:"hasReceived",value:function(e){return this.receivedResp&&this.receivedResp.status===e}},{key:"trigger",value:function(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}}]),e}(),j=function(){function e(t,n,i){var o=this;s(this,e),this.state=v.closed,this.topic=t,this.params=k(n||{}),this.socket=i,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new b(this,y.join,this.params,this.timeout),this.pushBuffer=[],this.rejoinTimer=new S(function(){o.socket.isConnected()&&o.rejoin()},this.socket.rejoinAfterMs),this.socket.onError(function(){return o.rejoinTimer.reset()}),this.socket.onOpen(function(){o.rejoinTimer.reset(),o.isErrored()&&o.rejoin()}),this.joinPush.receive("ok",function(){o.state=v.joined,o.rejoinTimer.reset(),o.pushBuffer.forEach(function(e){return e.send()}),o.pushBuffer=[]}),this.joinPush.receive("error",function(){o.state=v.errored,o.socket.isConnected()&&o.rejoinTimer.scheduleTimeout()}),this.onClose(function(){o.rejoinTimer.reset(),o.socket.hasLogger()&&o.socket.log("channel","close ".concat(o.topic," ").concat(o.joinRef())),o.state=v.closed,o.socket.remove(o)}),this.onError(function(e){o.socket.hasLogger()&&o.socket.log("channel","error ".concat(o.topic),e),o.isJoining()&&o.joinPush.reset(),o.state=v.errored,o.socket.isConnected()&&o.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",function(){o.socket.hasLogger()&&o.socket.log("channel","timeout ".concat(o.topic," (").concat(o.joinRef(),")"),o.joinPush.timeout),new b(o,y.leave,k({}),o.timeout).send(),o.state=v.errored,o.joinPush.reset(),o.socket.isConnected()&&o.rejoinTimer.scheduleTimeout()}),this.on(y.reply,function(e,t){o.trigger(o.replyEventName(t),e)})}return c(e,[{key:"join",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}},{key:"onClose",value:function(e){this.on(y.close,e)}},{key:"onError",value:function(e){return this.on(y.error,function(t){return e(t)})}},{key:"on",value:function(e,t){var n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}},{key:"off",value:function(e,t){this.bindings=this.bindings.filter(function(n){return!(n.event===e&&(void 0===t||t===n.ref))})}},{key:"canPush",value:function(){return this.socket.isConnected()&&this.isJoined()}},{key:"push",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.timeout;if(!this.joinedOnce)throw new Error("tried to push '".concat(e,"' to '").concat(this.topic,"' before joining. Use channel.join() before pushing events"));var i=new b(this,e,function(){return t},n);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}},{key:"leave",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=v.leaving;var n=function(){e.socket.hasLogger()&&e.socket.log("channel","leave ".concat(e.topic)),e.trigger(y.close,"leave")},i=new b(this,y.leave,k({}),t);return i.receive("ok",function(){return n()}).receive("timeout",function(){return n()}),i.send(),this.canPush()||i.trigger("ok",{}),i}},{key:"onMessage",value:function(e,t,n){return t}},{key:"isLifecycleEvent",value:function(e){return m.indexOf(e)>=0}},{key:"isMember",value:function(e,t,n,i){return this.topic===e&&(!i||i===this.joinRef()||!this.isLifecycleEvent(t)||(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:n,joinRef:i}),!1))}},{key:"joinRef",value:function(){return this.joinPush.ref}},{key:"sendJoin",value:function(e){this.state=v.joining,this.joinPush.resend(e)}},{key:"rejoin",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.isLeaving()||this.sendJoin(e)}},{key:"trigger",value:function(e,t,n,i){var o=this.onMessage(e,t,n,i);if(t&&!o)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");for(var r=0;r<this.bindings.length;r++){var s=this.bindings[r];s.event===e&&s.callback(o,n,i||this.joinRef())}}},{key:"replyEventName",value:function(e){return"chan_reply_".concat(e)}},{key:"isClosed",value:function(){return this.state===v.closed}},{key:"isErrored",value:function(){return this.state===v.errored}},{key:"isJoined",value:function(){return this.state===v.joined}},{key:"isJoining",value:function(){return this.state===v.joining}},{key:"isLeaving",value:function(){return this.state===v.leaving}}]),e}(),R={encode:function(e,t){var n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))},decode:function(e,t){var n=r(JSON.parse(e),5);return t({join_ref:n[0],ref:n[1],topic:n[2],event:n[3],payload:n[4]})}},C=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e),this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.timeout=i.timeout||p,this.transport=i.transport||l.WebSocket||T,this.defaultEncoder=R.encode,this.defaultDecoder=R.decode,this.closeWasClean=!1,this.unloaded=!1,this.binaryType=i.binaryType||"arraybuffer",this.transport!==T?(this.encode=i.encode||this.defaultEncoder,this.decode=i.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder),h&&h.addEventListener&&h.addEventListener("beforeunload",function(e){n.conn&&(n.unloaded=!0,n.abnormalClose("unloaded"))}),this.heartbeatIntervalMs=i.heartbeatIntervalMs||3e4,this.rejoinAfterMs=function(e){return i.rejoinAfterMs?i.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4},this.reconnectAfterMs=function(e){return n.unloaded?100:i.reconnectAfterMs?i.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3},this.logger=i.logger||null,this.longpollerTimeout=i.longpollerTimeout||2e4,this.params=k(i.params||{}),this.endPoint="".concat(t,"/").concat(g.websocket),this.vsn=i.vsn||f,this.heartbeatTimer=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new S(function(){n.teardown(function(){return n.connect()})},this.reconnectAfterMs)}return c(e,[{key:"protocol",value:function(){return location.protocol.match(/^https/)?"wss":"ws"}},{key:"endPointURL",value:function(){var e=w.appendParams(w.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return"/"!==e.charAt(0)?e:"/"===e.charAt(1)?"".concat(this.protocol(),":").concat(e):"".concat(this.protocol(),"://").concat(location.host).concat(e)}},{key:"disconnect",value:function(e,t,n){this.closeWasClean=!0,this.reconnectTimer.reset(),this.teardown(e,t,n)}},{key:"connect",value:function(e){var t=this;e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=k(e)),this.conn||(this.closeWasClean=!1,this.conn=new this.transport(this.endPointURL()),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=function(){return t.onConnOpen()},this.conn.onerror=function(e){return t.onConnError(e)},this.conn.onmessage=function(e){return t.onConnMessage(e)},this.conn.onclose=function(e){return t.onConnClose(e)})}},{key:"log",value:function(e,t,n){this.logger(e,t,n)}},{key:"hasLogger",value:function(){return null!==this.logger}},{key:"onOpen",value:function(e){this.stateChangeCallbacks.open.push(e)}},{key:"onClose",value:function(e){this.stateChangeCallbacks.close.push(e)}},{key:"onError",value:function(e){this.stateChangeCallbacks.error.push(e)}},{key:"onMessage",value:function(e){this.stateChangeCallbacks.message.push(e)}},{key:"onConnOpen",value:function(){this.hasLogger()&&this.log("transport","connected to ".concat(this.endPointURL())),this.unloaded=!1,this.closeWasClean=!1,this.flushSendBuffer(),this.reconnectTimer.reset(),this.resetHeartbeat(),this.stateChangeCallbacks.open.forEach(function(e){return e()})}},{key:"resetHeartbeat",value:function(){var e=this;this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(function(){return e.sendHeartbeat()},this.heartbeatIntervalMs))}},{key:"teardown",value:function(e,t,n){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,n||""):this.conn.close(),this.conn=null),e&&e()}},{key:"onConnClose",value:function(e){this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),clearInterval(this.heartbeatTimer),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(function(t){return t(e)})}},{key:"onConnError",value:function(e){this.hasLogger()&&this.log("transport",e),this.triggerChanError(),this.stateChangeCallbacks.error.forEach(function(t){return t(e)})}},{key:"triggerChanError",value:function(){this.channels.forEach(function(e){e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(y.error)})}},{key:"connectionState",value:function(){switch(this.conn&&this.conn.readyState){case d.connecting:return"connecting";case d.open:return"open";case d.closing:return"closing";default:return"closed"}}},{key:"isConnected",value:function(){return"open"===this.connectionState()}},{key:"remove",value:function(e){this.channels=this.channels.filter(function(t){return t.joinRef()!==e.joinRef()})}},{key:"channel",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new j(e,t,this);return this.channels.push(n),n}},{key:"push",value:function(e){var t=this;if(this.hasLogger()){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;this.log("push","".concat(n," ").concat(i," (").concat(s,", ").concat(r,")"),o)}this.isConnected()?this.encode(e,function(e){return t.conn.send(e)}):this.sendBuffer.push(function(){return t.encode(e,function(e){return t.conn.send(e)})})}},{key:"makeRef",value:function(){var e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}},{key:"sendHeartbeat",value:function(){if(this.isConnected()){if(this.pendingHeartbeatRef)return this.pendingHeartbeatRef=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection"),void this.abnormalClose("heartbeat timeout");this.pendingHeartbeatRef=this.makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef})}}},{key:"abnormalClose",value:function(e){this.closeWasClean=!1,this.conn.close(1e3,e)}},{key:"flushSendBuffer",value:function(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(function(e){return e()}),this.sendBuffer=[])}},{key:"onConnMessage",value:function(e){var t=this;this.decode(e.data,function(e){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;r&&r===t.pendingHeartbeatRef&&(t.pendingHeartbeatRef=null),t.hasLogger()&&t.log("receive","".concat(o.status||""," ").concat(n," ").concat(i," ").concat(r&&"("+r+")"||""),o);for(var a=0;a<t.channels.length;a++){var c=t.channels[a];c.isMember(n,i,o,s)&&c.trigger(i,o,r,s)}for(var u=0;u<t.stateChangeCallbacks.message.length;u++)t.stateChangeCallbacks.message[u](e)})}}]),e}(),T=function(){function e(t){s(this,e),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=d.connecting,this.poll()}return c(e,[{key:"normalizeEndpoint",value:function(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+g.websocket),"$1/"+g.longpoll)}},{key:"endpointURL",value:function(){return w.appendParams(this.pollEndpoint,{token:this.token})}},{key:"closeAndRetry",value:function(){this.close(),this.readyState=d.connecting}},{key:"ontimeout",value:function(){this.onerror("timeout"),this.closeAndRetry()}},{key:"poll",value:function(){var e=this;this.readyState!==d.open&&this.readyState!==d.connecting||w.request("GET",this.endpointURL(),"application/json",null,this.timeout,this.ontimeout.bind(this),function(t){if(t){var n=t.status,i=t.token,o=t.messages;e.token=i}else n=0;switch(n){case 200:o.forEach(function(t){return e.onmessage({data:t})}),e.poll();break;case 204:e.poll();break;case 410:e.readyState=d.open,e.onopen(),e.poll();break;case 0:case 500:e.onerror(),e.closeAndRetry();break;default:throw new Error("unhandled poll status ".concat(n))}})}},{key:"send",value:function(e){var t=this;w.request("POST",this.endpointURL(),"application/json",e,this.timeout,this.onerror.bind(this,"timeout"),function(e){e&&200===e.status||(t.onerror(e&&e.status),t.closeAndRetry())})}},{key:"close",value:function(e,t){this.readyState=d.closed,this.onclose()}}]),e}(),w=function(){function e(){s(this,e)}return c(e,null,[{key:"request",value:function(e,t,n,i,o,r,s){if(l.XDomainRequest){var a=new XDomainRequest;this.xdomainRequest(a,e,t,i,o,r,s)}else{var c=l.XMLHttpRequest?new l.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");this.xhrRequest(c,e,t,n,i,o,r,s)}}},{key:"xdomainRequest",value:function(e,t,n,i,o,r,s){var a=this;e.timeout=o,e.open(t,n),e.onload=function(){var t=a.parseJSON(e.responseText);s&&s(t)},r&&(e.ontimeout=r),e.onprogress=function(){},e.send(i)}},{key:"xhrRequest",value:function(e,t,n,i,o,r,s,a){var c=this;e.open(t,n,!0),e.timeout=r,e.setRequestHeader("Content-Type",i),e.onerror=function(){a&&a(null)},e.onreadystatechange=function(){if(e.readyState===c.states.complete&&a){var t=c.parseJSON(e.responseText);a(t)}},s&&(e.ontimeout=s),e.send(o)}},{key:"parseJSON",value:function(e){if(!e||""===e)return null;try{return JSON.parse(e)}catch(t){return console&&console.log("failed to parse JSON response",e),null}}},{key:"serialize",value:function(e,t){var n=[];for(var i in e)if(e.hasOwnProperty(i)){var r=t?"".concat(t,"[").concat(i,"]"):i,s=e[i];"object"===o(s)?n.push(this.serialize(s,r)):n.push(encodeURIComponent(r)+"="+encodeURIComponent(s))}return n.join("&")}},{key:"appendParams",value:function(e,t){if(0===Object.keys(t).length)return e;var n=e.match(/\?/)?"&":"?";return"".concat(e).concat(n).concat(this.serialize(t))}}]),e}();w.states={complete:4};var E=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e);var o=i.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(o.state,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.joinRef=n.channel.joinRef(),n.state=e.syncState(n.state,t,o,r),n.pendingDiffs.forEach(function(t){n.state=e.syncDiff(n.state,t,o,r)}),n.pendingDiffs=[],s()}),this.channel.on(o.diff,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.inPendingSyncState()?n.pendingDiffs.push(t):(n.state=e.syncDiff(n.state,t,o,r),s())})}return c(e,[{key:"onJoin",value:function(e){this.caller.onJoin=e}},{key:"onLeave",value:function(e){this.caller.onLeave=e}},{key:"onSync",value:function(e){this.caller.onSync=e}},{key:"list",value:function(t){return e.list(this.state,t)}},{key:"inPendingSyncState",value:function(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}}],[{key:"syncState",value:function(e,t,n,i){var o=this,r=this.clone(e),s={},a={};return this.map(r,function(e,n){t[e]||(a[e]=n)}),this.map(t,function(e,t){var n=r[e];if(n){var i=t.metas.map(function(e){return e.phx_ref}),c=n.metas.map(function(e){return e.phx_ref}),u=t.metas.filter(function(e){return c.indexOf(e.phx_ref)<0}),h=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0});u.length>0&&(s[e]=t,s[e].metas=u),h.length>0&&(a[e]=o.clone(n),a[e].metas=h)}else s[e]=t}),this.syncDiff(r,{joins:s,leaves:a},n,i)}},{key:"syncDiff",value:function(e,t,n,o){var r=t.joins,s=t.leaves,a=this.clone(e);return n||(n=function(){}),o||(o=function(){}),this.map(r,function(e,t){var o=a[e];if(a[e]=t,o){var r,s=a[e].metas.map(function(e){return e.phx_ref}),c=o.metas.filter(function(e){return s.indexOf(e.phx_ref)<0});(r=a[e].metas).unshift.apply(r,i(c))}n(e,o,t)}),this.map(s,function(e,t){var n=a[e];if(n){var i=t.metas.map(function(e){return e.phx_ref});n.metas=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0}),o(e,n,t),0===n.metas.length&&delete a[e]}}),a}},{key:"list",value:function(e,t){return t||(t=function(e,t){return t}),this.map(e,function(e,n){return t(e,n)})}},{key:"map",value:function(e,t){return Object.getOwnPropertyNames(e).map(function(n){return t(n,e[n])})}},{key:"clone",value:function(e){return JSON.parse(JSON.stringify(e))}}]),e}(),S=function(){function e(t,n){s(this,e),this.callback=t,this.timerCalc=n,this.timer=null,this.tries=0}return c(e,[{key:"reset",value:function(){this.tries=0,clearTimeout(this.timer)}},{key:"scheduleTimeout",value:function(){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){e.tries=e.tries+1,e.callback()},this.timerCalc(this.tries+1))}}]),e}()}])});
  })();
});

require.register("phoenix_html/priv/static/phoenix_html.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "phoenix_html");
  (function() {
    "use strict";

(function() {
  var PolyfillEvent = eventConstructor();

  function eventConstructor() {
    if (typeof window.CustomEvent === "function") return window.CustomEvent;
    // IE<=9 Support
    function CustomEvent(event, params) {
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    return CustomEvent;
  }

  function buildHiddenInput(name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  }

  function handleClick(element) {
    var to = element.getAttribute("data-to"),
        method = buildHiddenInput("_method", element.getAttribute("data-method")),
        csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")),
        form = document.createElement("form"),
        target = element.getAttribute("target");

    form.method = (element.getAttribute("data-method") === "get") ? "get" : "post";
    form.action = to;
    form.style.display = "hidden";

    if (target) form.target = target;

    form.appendChild(csrf);
    form.appendChild(method);
    document.body.appendChild(form);
    form.submit();
  }

  window.addEventListener("click", function(e) {
    var element = e.target;

    while (element && element.getAttribute) {
      var phoenixLinkEvent = new PolyfillEvent('phoenix.link.click', {
        "bubbles": true, "cancelable": true
      });

      if (!element.dispatchEvent(phoenixLinkEvent)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }

      if (element.getAttribute("data-method")) {
        handleClick(element);
        e.preventDefault();
        return false;
      } else {
        element = element.parentNode;
      }
    }
  }, false);

  window.addEventListener('phoenix.link.click', function (e) {
    var message = e.target.getAttribute("data-confirm");
    if(message && !window.confirm(message)) {
      e.preventDefault();
    }
  }, false);
})();
  })();
});

require.register("phoenix_live_view/priv/static/phoenix_live_view.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "phoenix_live_view");
  (function() {
    !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.phoenix_live_view=t():e.phoenix_live_view=t()}(this,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var i;n.r(t);var r="http://www.w3.org/1999/xhtml",o="undefined"==typeof document?void 0:document,a=!!o&&"content"in o.createElement("template"),u=!!o&&o.createRange&&"createContextualFragment"in o.createRange();function c(e){return a?function(e){var t=o.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):u?function(e){return i||(i=o.createRange()).selectNode(o.body),i.createContextualFragment(e).childNodes[0]}(e):function(e){var t=o.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function s(e,t){var n=e.nodeName,i=t.nodeName;return n===i||!!(t.actualize&&n.charCodeAt(0)<91&&i.charCodeAt(0)>90)&&n===i.toUpperCase()}function l(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var d={OPTION:function(e,t){var n=e.parentNode;if(n){var i=n.nodeName.toUpperCase();"OPTGROUP"===i&&(i=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==i||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}l(e,t,"selected")},INPUT:function(e,t){l(e,t,"checked"),l(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var i=e.firstChild;if(i){var r=i.nodeValue;if(r==n||!n&&r==e.placeholder)return;i.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,i,r=-1,o=0,a=e.firstChild;a;)if("OPTGROUP"===(i=a.nodeName&&a.nodeName.toUpperCase()))a=(n=a).firstChild;else{if("OPTION"===i){if(a.hasAttribute("selected")){r=o;break}o++}!(a=a.nextSibling)&&n&&(a=n.nextSibling,n=null)}e.selectedIndex=r}}},h=1,f=11,v=3,p=8;function y(){}function g(e){return e.id}var m=function(e){return function(t,n,i){if(i||(i={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var a=n;(n=o.createElement("html")).innerHTML=a}else n=c(n);var u,l=i.getNodeKey||g,m=i.onBeforeNodeAdded||y,k=i.onNodeAdded||y,b=i.onBeforeElUpdated||y,w=i.onElUpdated||y,x=i.onBeforeNodeDiscarded||y,E=i.onNodeDiscarded||y,A=i.onBeforeElChildrenUpdated||y,S=!0===i.childrenOnly,L={};function C(e){u?u.push(e):u=[e]}function N(e,t,n){!1!==x(e)&&(t&&t.removeChild(e),E(e),function e(t,n){if(t.nodeType===h)for(var i=t.firstChild;i;){var r=void 0;n&&(r=l(i))?C(r):(E(i),i.firstChild&&e(i,n)),i=i.nextSibling}}(e,n))}function _(e){k(e);for(var t=e.firstChild;t;){var n=t.nextSibling,i=l(t);if(i){var r=L[i];r&&s(t,r)&&(t.parentNode.replaceChild(r,t),T(r,t))}_(t),t=n}}function T(i,r,a){var u=l(r);if(u&&delete L[u],!n.isSameNode||!n.isSameNode(t)){if(!a){if(!1===b(i,r))return;if(e(i,r),w(i),!1===A(i,r))return}"TEXTAREA"!==i.nodeName?function(e,t){var n,i,r,a,u,c=t.firstChild,f=e.firstChild;e:for(;c;){for(a=c.nextSibling,n=l(c);f;){if(r=f.nextSibling,c.isSameNode&&c.isSameNode(f)){c=a,f=r;continue e}i=l(f);var y=f.nodeType,g=void 0;if(y===c.nodeType&&(y===h?(n?n!==i&&((u=L[n])?r===u?g=!1:(e.insertBefore(u,f),i?C(i):N(f,e,!0),f=u):g=!1):i&&(g=!1),(g=!1!==g&&s(f,c))&&T(f,c)):y!==v&&y!=p||(g=!0,f.nodeValue!==c.nodeValue&&(f.nodeValue=c.nodeValue))),g){c=a,f=r;continue e}i?C(i):N(f,e,!0),f=r}if(n&&(u=L[n])&&s(u,c))e.appendChild(u),T(u,c);else{var k=m(c);!1!==k&&(k&&(c=k),c.actualize&&(c=c.actualize(e.ownerDocument||o)),e.appendChild(c),_(c))}c=a,f=r}!function(e,t,n){for(;t;){var i=t.nextSibling;(n=l(t))?C(n):N(t,e,!0),t=i}}(e,f,i);var b=d[e.nodeName];b&&b(e,t)}(i,r):d.TEXTAREA(i,r)}}!function e(t){if(t.nodeType===h||t.nodeType===f)for(var n=t.firstChild;n;){var i=l(n);i&&(L[i]=n),e(n),n=n.nextSibling}}(t);var P=t,I=P.nodeType,R=n.nodeType;if(!S)if(I===h)R===h?s(t,n)||(E(t),P=function(e,t){for(var n=e.firstChild;n;){var i=n.nextSibling;t.appendChild(n),n=i}return t}(t,function(e,t){return t&&t!==r?o.createElementNS(t,e):o.createElement(e)}(n.nodeName,n.namespaceURI))):P=n;else if(I===v||I===p){if(R===I)return P.nodeValue!==n.nodeValue&&(P.nodeValue=n.nodeValue),P;P=n}if(P===n)E(t);else if(T(P,n,S),u)for(var H=0,D=u.length;H<D;H++){var O=L[u[H]];O&&N(O,O.parentNode,!1)}return!S&&P!==t&&t.parentNode&&(P.actualize&&(P=P.actualize(t.ownerDocument||o)),t.parentNode.replaceChild(P,t)),P}}(function(e,t){var n,i,r,o,a,u=t.attributes;for(n=u.length-1;n>=0;--n)r=(i=u[n]).name,o=i.namespaceURI,a=i.value,o?(r=i.localName||r,e.getAttributeNS(o,r)!==a&&e.setAttributeNS(o,r,a)):e.getAttribute(r)!==a&&e.setAttribute(r,a);for(n=(u=e.attributes).length-1;n>=0;--n)!1!==(i=u[n]).specified&&(r=i.name,(o=i.namespaceURI)?(r=i.localName||r,t.hasAttributeNS(o,r)||e.removeAttributeNS(o,r)):t.hasAttribute(r)||e.removeAttribute(r))});function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function w(e,t,n){return t&&b(e.prototype,t),n&&b(e,n),e}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,r=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(i=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){r=!0,o=e}finally{try{i||null==u.return||u.return()}finally{if(r)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"debug",function(){return T}),n.d(t,"Rendered",function(){return V}),n.d(t,"LiveSocket",function(){return B}),n.d(t,"Browser",function(){return j}),n.d(t,"DOM",function(){return F}),n.d(t,"View",function(){return K});var A="data-phx-view",S="[".concat(A,"]"),L=["text","textarea","number","email","password","search","tel","url"],C=1,N="phx-",_=function(e,t){return console.error&&console.error(e,t)},T=function(e,t,n,i){console.log("".concat(e.id," ").concat(t,": ").concat(n," - "),i)},P=function(e){return"function"==typeof e?e:function(){return e}},I=function(e){return JSON.parse(JSON.stringify(e))},R=function(e,t){do{if(e.matches("[".concat(t,"]")))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType&&!e.matches(S));return null},H=function(e){return null!==e&&"object"===E(e)&&!(e instanceof Array)},D=function(e,t){return e&&t(e)},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new FormData(e),i=new URLSearchParams,r=!0,o=!1,a=void 0;try{for(var u,c=n.entries()[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){var s=x(u.value,2),l=s[0],d=s[1];i.append(l,d)}}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}for(var h in t)i.append(h,t[h]);return i.toString()},V={mergeDiff:function(e,t){return this.isNewFingerprint(t)?t:(function e(t,n){for(var i in n){var r=n[i],o=t[i];H(r)&&H(o)?(o.dynamics&&!r.dynamics&&delete o.dynamics,e(o,r)):t[i]=r}}(e,t),e)},isNewFingerprint:function(){return!!(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).static},toString:function(e){var t={buffer:""};return this.toOutputBuffer(e,t),t.buffer},toOutputBuffer:function(e,t){if(e.dynamics)return this.comprehensionToBuffer(e,t);var n=e.static;t.buffer+=n[0];for(var i=1;i<n.length;i++)this.dynamicToBuffer(e[i-1],t),t.buffer+=n[i]},comprehensionToBuffer:function(e,t){for(var n=e.dynamics,i=e.static,r=0;r<n.length;r++){var o=n[r];t.buffer+=i[0];for(var a=1;a<i.length;a++)this.dynamicToBuffer(o[a-1],t),t.buffer+=i[a]}},dynamicToBuffer:function(e,t){H(e)?this.toOutputBuffer(e,t):t.buffer+=e}},B=function(){function e(t,n){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(k(this,e),this.unloaded=!1,!n||"Object"===n.constructor.name)throw new Error('\n      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:\n\n          import {Socket} from "phoenix"\n          import {LiveSocket} from "phoenix_live_view"\n          let liveSocket = new LiveSocket("/live", Socket, {...})\n      ');this.socket=new n(t,r),this.bindingPrefix=r.bindingPrefix||N,this.opts=r,this.views={},this.params=P(r.params||{}),this.viewLogger=r.viewLogger,this.activeElement=null,this.prevActive=null,this.prevInput=null,this.prevValue=null,this.silenced=!1,this.root=null,this.linkRef=0,this.href=window.location.href,this.pendingLink=null,this.currentLocation=I(window.location),this.hooks=r.hooks||{},this.socket.onOpen(function(){i.isUnloaded()&&(i.destroyAllViews(),i.joinRootViews()),i.unloaded=!1}),window.addEventListener("beforeunload",function(e){i.unloaded=!0}),this.bindTopLevelEvents()}return w(e,[{key:"getSocket",value:function(){return this.socket}},{key:"log",value:function(e,t,n){if(this.viewLogger){var i=x(n(),2),r=i[0],o=i[1];this.viewLogger(e,t,r,o)}}},{key:"connect",value:function(){var e=this;return["complete","loaded","interactive"].indexOf(document.readyState)>=0?this.joinRootViews():document.addEventListener("DOMContentLoaded",function(){e.joinRootViews()}),this.socket.connect()}},{key:"disconnect",value:function(){this.socket.disconnect()}},{key:"getHookCallbacks",value:function(e){return this.hooks[e]}},{key:"isUnloaded",value:function(){return this.unloaded}},{key:"getBindingPrefix",value:function(){return this.bindingPrefix}},{key:"binding",value:function(e){return"".concat(this.getBindingPrefix()).concat(e)}},{key:"channel",value:function(e,t){return this.socket.channel(e,t)}},{key:"joinRootViews",value:function(){var e=this;F.all(document,"".concat(S,":not([").concat("data-phx-parent-id","])"),function(t){var n=e.joinView(t,null,e.getHref());e.root=e.root||n})}},{key:"replaceRoot",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.setPendingLink(e);this.root.showLoader(C);var r=this.root.el,o=this.root.id,a=this.root.isLoading();j.fetchPage(e,function(u,c){if(200!==u)return j.redirect(e);var s=document.createElement("div");s.innerHTML=c,t.joinView(s.firstChild,null,e,function(e){t.commitPendingLink(i)?(n&&n(),t.destroyViewById(o),r.replaceWith(e.el),t.root=e,a&&t.root.showLoader()):e.destroy()})})}},{key:"joinView",value:function(e,t,n,i){if(!this.getViewByEl(e)){var r=new K(e,this,t,n);return this.views[r.id]=r,r.join(i),r}}},{key:"owner",value:function(e,t){var n=this,i=D(e.closest(S),function(e){return n.getViewByEl(e)});i&&t(i)}},{key:"getViewByEl",value:function(e){return this.views[e.id]}},{key:"onViewError",value:function(e){this.dropActiveElement(e)}},{key:"destroyAllViews",value:function(){for(var e in this.views)this.destroyViewById(e)}},{key:"destroyViewByEl",value:function(e){return this.destroyViewById(e.id)}},{key:"destroyViewById",value:function(e){var t=this.views[e];t&&(delete this.views[t.id],this.root&&t.id===this.root.id&&(this.root=null),t.destroy())}},{key:"setActiveElement",value:function(e){var t=this;if(this.activeElement!==e){this.activeElement=e;var n=function(){e===t.activeElement&&(t.activeElement=null),e.removeEventListener("mouseup",t),e.removeEventListener("touchend",t)};e.addEventListener("mouseup",n),e.addEventListener("touchend",n)}}},{key:"getActiveElement",value:function(){return document.activeElement===document.body&&this.activeElement||document.activeElement}},{key:"dropActiveElement",value:function(e){this.prevActive&&e.ownsElement(this.prevActive)&&(this.prevActive=null)}},{key:"restorePreviouslyActiveFocus",value:function(){this.prevActive&&this.prevActive!==document.body&&this.prevActive.focus()}},{key:"blurActiveElement",value:function(){this.prevActive=this.getActiveElement(),this.prevActive!==document.body&&this.prevActive.blur()}},{key:"bindTopLevelEvents",value:function(){this.bindClicks(),this.bindNav(),this.bindForms(),this.bindTargetable({keyup:"keyup",keydown:"keydown"},function(e,t,n,i,r,o){n.pushKey(i,t,r,{altGraphKey:e.altGraphKey,altKey:e.altKey,charCode:e.charCode,code:e.code,ctrlKey:e.ctrlKey,key:e.key,keyCode:e.keyCode,keyIdentifier:e.keyIdentifier,keyLocation:e.keyLocation,location:e.location,metaKey:e.metaKey,repeat:e.repeat,shiftKey:e.shiftKey,which:e.which})}),this.bindTargetable({blur:"focusout",focus:"focusin"},function(e,t,n,i,r,o){o||n.pushEvent(t,i,r,{type:t})}),this.bindTargetable({blur:"blur",focus:"focus"},function(e,t,n,i,r,o){o&&"window"!==!o&&n.pushEvent(t,i,r,{type:e.type})})}},{key:"setPendingLink",value:function(e){this.linkRef++;this.linkRef;return this.pendingLink=e,this.linkRef}},{key:"commitPendingLink",value:function(e){return this.linkRef===e&&(this.href=this.pendingLink,this.pendingLink=null,!0)}},{key:"getHref",value:function(){return this.href}},{key:"hasPendingLink",value:function(){return!!this.pendingLink}},{key:"bindTargetable",value:function(e,t){var n=this,i=function(i){var r=e[i];n.on(r,function(e){var r=n.binding(i),o=n.binding("target"),a=e.target.getAttribute&&e.target.getAttribute(r);a&&!e.target.getAttribute(o)?n.owner(e.target,function(r){n.debounce(e.target,e,function(){return t(e,i,r,e.target,a,null)})}):F.all(document,"[".concat(r,"][").concat(o,"=window]"),function(o){var a=o.getAttribute(r);n.owner(o,function(r){n.debounce(o,e,function(){return t(e,i,r,o,a,"window")})})})})};for(var r in e)i(r)}},{key:"bindClicks",value:function(){var e=this;window.addEventListener("click",function(t){var n=e.binding("click"),i=R(t.target,n),r=i&&i.getAttribute(n);if(r){t.stopPropagation();var o={altKey:t.altKey,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,metaKey:t.metaKey,x:t.x||t.clientX,y:t.y||t.clientY,pageX:t.pageX,pageY:t.pageY,screenX:t.screenX,screenY:t.screenY};e.owner(i,function(n){e.debounce(i,t,function(){return n.pushEvent("click",i,r,o)})})}},!1)}},{key:"bindNav",value:function(){var e=this;j.canPushState()&&(window.onpopstate=function(t){if(e.registerNewLocation(window.location)){var n=window.location.href;e.root.isConnected()?e.root.pushInternalLink(n):e.replaceRoot(n)}},window.addEventListener("click",function(t){var n=R(t.target,"data-phx-live-link"),i=n&&n.getAttribute("data-phx-live-link");if(i){var r=n.href;t.preventDefault(),e.root.pushInternalLink(r,function(){j.pushState(i,{},r),e.registerNewLocation(window.location)})}},!1))}},{key:"registerNewLocation",value:function(e){var t=this.currentLocation;return t.pathname+t.search!==e.pathname+e.search&&(this.currentLocation=I(e),!0)}},{key:"bindForms",value:function(){var e=this;this.on("submit",function(t){var n=t.target.getAttribute(e.binding("submit"));n&&(t.preventDefault(),t.target.disabled=!0,e.owner(t.target,function(e){return e.submitForm(t.target,n)}))},!1);for(var t=["change","input"],n=0;n<t.length;n++){var i=t[n];this.on(i,function(t){var n=t.target,i=n.form&&n.form.getAttribute(e.binding("change"));if(i){var r=JSON.stringify(new FormData(n.form).getAll(n.name));e.prevInput===n&&e.prevValue===r||"number"===n.type&&n.validity&&n.validity.badInput||(e.prevInput=n,e.prevValue=r,e.owner(n,function(r){F.isTextualInput(n)?F.putPrivate(n,"phx-has-focused",!0):e.setActiveElement(n),e.debounce(n,t,function(){return r.pushInput(n,i,t)})}))}},!1)}}},{key:"debounce",value:function(e,t,n){F.debounce(e,t,this.binding("debounce"),this.binding("throttle"),n)}},{key:"silenceEvents",value:function(e){this.silenced=!0,e(),this.silenced=!1}},{key:"on",value:function(e,t){var n=this;window.addEventListener(e,function(e){n.silenced||t(e)})}}]),e}(),j={canPushState:function(){return void 0!==history.pushState},fetchPage:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.timeout=3e4,n.setRequestHeader("content-type","text/html"),n.setRequestHeader("cache-control","max-age=0, no-cache, no-store, must-revalidate, post-check=0, pre-check=0"),n.setRequestHeader("x-requested-with","live-link"),n.onerror=function(){return t(400)},n.ontimeout=function(){return t(504)},n.onreadystatechange=function(){if(4===n.readyState)return"live-link"!==n.getResponseHeader("x-requested-with")?t(400):200!==n.status?t(n.status):void t(200,n.responseText)},n.send()},pushState:function(e,t,n){this.canPushState()?n!==window.location.href&&history[e+"State"](t,"",n):this.redirect(n)},setCookie:function(e,t){document.cookie="".concat(e,"=").concat(t)},getCookie:function(e){return document.cookie.replace(new RegExp("(?:(?:^|.*;s*)".concat(e,"s*=s*([^;]*).*$)|^.*$")),"$1")},redirect:function(e,t){t&&j.setCookie("__phoenix_flash__",t+"; max-age=60000; path=/"),window.location=e}},F={all:function(e,t,n){return Array.from(e.querySelectorAll(t)).forEach(n)},private:function(e,t){return e.phxPrivate&&e.phxPrivate[t]},deletePrivate:function(e,t){e.phxPrivate&&delete e.phxPrivate[t]},putPrivate:function(e,t,n){e.phxPrivate||(e.phxPrivate={}),e.phxPrivate[t]=n},copyPrivates:function(e,t){t.phxPrivate&&(e.phxPrivate=I(t.phxPrivate))},debounce:function(e,t,n,i,r){var o=this,a=e.getAttribute(n),u=e.getAttribute(i),c=a||u;switch(c){case null:return r();case"blur":if(this.private(e,"debounce-blur"))return;return e.addEventListener("blur",function(){return r()}),void this.putPrivate(e,"debounce-blur",c);default:var s=parseInt(c);if(isNaN(s))return _("invalid throttle/debounce value: ".concat(c));if(u&&"keydown"===t.type){var l=this.private(e,"debounce-prev-key");if(this.putPrivate(e,"debounce-prev-key",t.which),l!==t.which)return r()}if(this.private(e,"debounce-timer"))return;var d=function(t){u&&"phx-change"===t.type&&t.detail.triggeredBy.name===e.name||(clearTimeout(o.private(e,"debounce-timer")),o.deletePrivate(e,"debounce-timer"))};this.putPrivate(e,"debounce-timer",setTimeout(function(){e.form&&(e.form.removeEventListener("phx-change",d),e.form.removeEventListener("submit",d)),o.deletePrivate(e,"debounce-timer"),u||r()},s)),e.form&&(e.form.addEventListener("phx-change",d),e.form.addEventListener("submit",d)),u&&r()}},disableForm:function(e,t){var n="".concat(t).concat("disable-with");e.classList.add("phx-loading"),F.all(e,"[".concat(n,"]"),function(e){var t=e.getAttribute(n);e.setAttribute("".concat(n,"-restore"),e.innerText),e.innerText=t}),F.all(e,"button",function(e){e.setAttribute("data-phx-disabled",e.disabled),e.disabled=!0}),F.all(e,"input",function(e){e.setAttribute("data-phx-readonly",e.readOnly),e.readOnly=!0})},restoreDisabledForm:function(e,t){var n="".concat(t).concat("disable-with");e.classList.remove("phx-loading"),F.all(e,"[".concat(n,"]"),function(e){var t=e.getAttribute("".concat(n,"-restore"));t&&("INPUT"===e.nodeName?e.value=t:e.innerText=t,e.removeAttribute("".concat(n,"-restore")))}),F.all(e,"button",function(e){var t=e.getAttribute("data-phx-disabled");t&&(e.disabled="true"===t,e.removeAttribute("data-phx-disabled"))}),F.all(e,"input",function(e){var t=e.getAttribute("data-phx-readonly");t&&(e.readOnly="true"===t,e.removeAttribute("data-phx-readonly"))})},discardError:function(e,t){var n=t.getAttribute&&t.getAttribute("data-phx-error-for");if(n){var i=e.querySelector("#".concat(n));!n||this.private(i,"phx-has-focused")||this.private(i.form,"phx-has-submitted")||(t.style.display="none")}},isPhxChild:function(e){return e.getAttribute&&e.getAttribute("data-phx-parent-id")},patch:function(e,t,n,i){var r={added:[],updated:[],discarded:[],phxChildrenAdded:[]},o=e.liveSocket.getActiveElement(),a=o&&F.isTextualInput(o)?o:{},u=a.selectionStart,c=a.selectionEnd,s=e.liveSocket.binding("update"),l=this.buildDiffContainer(t,i,s);return m(t,l.outerHTML,{childrenOnly:!0,onBeforeNodeAdded:function(e){return F.discardError(t,e),e},onNodeAdded:function(t){F.isPhxChild(t)&&e.ownsElement(t)&&r.phxChildrenAdded.push(t),r.added.push(t)},onBeforeNodeDiscarded:function(t){if(F.isPhxChild(t))return e.liveSocket.destroyViewByEl(t),!0;r.discarded.push(t)},onBeforeElUpdated:function(e,n){if(e.isEqualNode(n))return!1;if("ignore"===e.getAttribute(s))return!1;if("number"===e.type&&e.validity&&e.validity.badInput)return!1;if(F.isPhxChild(n)){var i=e.getAttribute("data-phx-static");return F.mergeAttrs(e,n),e.setAttribute("data-phx-static",i),!1}return F.copyPrivates(n,e),F.discardError(t,n),F.isTextualInput(e)&&e===o?(F.mergeInputs(e,n),r.updated.push({fromEl:e,toEl:e}),!1):(r.updated.push({fromEl:e,toEl:n}),!0)}}),e.liveSocket.silenceEvents(function(){return F.restoreFocus(o,u,c)}),F.dispatchEvent(document,"phx:update"),r},dispatchEvent:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:n});e.dispatchEvent(i)},cloneNode:function(e,t){var n=e.cloneNode();return n.innerHTML=t||e.innerHTML,n},buildDiffContainer:function(e,t,n){var i=this,r=this.cloneNode(e,t),o=function(e){return e.nodeType===Node.ELEMENT_NODE},a=function(e){return e.id||_("append/prepend children require IDs, got: ",e)};return F.all(r,"[".concat(n,"=append],[").concat(n,"=prepend]"),function(t){var r=t.id||_("append/prepend requires an ID, got: ",t),u=e.querySelector("#".concat(r));if(u){var c=i.cloneNode(u),s=t.getAttribute(n),l=Array.from(t.childNodes).filter(o).map(a),d=Array.from(c.childNodes).filter(o).map(a);if(l.toString()!==d.toString())l.filter(function(e){return d.indexOf(e)>=0}).forEach(function(e){var n=t.querySelector("#".concat(e));c.querySelector("#".concat(e)).replaceWith(n)}),t.insertAdjacentHTML("append"===s?"afterbegin":"beforeend",c.innerHTML)}}),r},mergeAttrs:function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=t.attributes,r=0,o=i.length;r<o;r++){var a=i[r].name;n.indexOf(a)<0&&e.setAttribute(a,t.getAttribute(a))}},mergeInputs:function(e,t){F.mergeAttrs(e,t,["value"]),e.readOnly=t.readOnly},restoreFocus:function(e,t,n){F.isTextualInput(e)&&((""===e.value||e.readOnly)&&e.blur(),e.focus(),(e.setSelectionRange&&"text"===e.type||"textarea"===e.type)&&e.setSelectionRange(t,n))},isTextualInput:function(e){return L.indexOf(e.type)>=0}},K=function(){function e(t,n,i,r){var o=this;k(this,e),this.liveSocket=n,this.parent=i,this.gracefullyClosed=!1,this.el=t,this.id=this.el.id,this.view=this.el.getAttribute(A),this.loaderTimer=null,this.pendingDiffs=[],this.href=r,this.joinedOnce=!1,this.viewHooks={},this.channel=this.liveSocket.channel("lv:".concat(this.id),function(){return{url:o.href||o.liveSocket.root.href,params:o.liveSocket.params(o.view),session:o.getSession(),static:o.getStatic()}}),this.showLoader(C),this.bindChannel()}return w(e,[{key:"isConnected",value:function(){return this.channel.canPush()}},{key:"getSession",value:function(){return this.el.getAttribute("data-phx-session")}},{key:"getStatic",value:function(){var e=this.el.getAttribute("data-phx-static");return""===e?null:e}},{key:"destroy",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};clearTimeout(this.loaderTimer);var n=function(){for(var n in t(),e.viewHooks)e.destroyHook(e.viewHooks[n])};this.hasGracefullyClosed()?(this.log("destroyed",function(){return["the server view has gracefully closed"]}),n()):(this.log("destroyed",function(){return["the child has been removed from the parent"]}),this.channel.leave().receive("ok",n).receive("error",n).receive("timeout",n))}},{key:"setContainerClasses",value:function(){var e;this.el.classList.remove("phx-connected","phx-disconnected","phx-error"),(e=this.el.classList).add.apply(e,arguments)}},{key:"isLoading",value:function(){return this.el.classList.contains("phx-disconnected")}},{key:"showLoader",value:function(e){var t=this;if(clearTimeout(this.loaderTimer),e)this.loaderTimer=setTimeout(function(){return t.showLoader()},e);else{for(var n in this.viewHooks)this.viewHooks[n].__trigger__("disconnected");this.setContainerClasses("phx-disconnected")}}},{key:"hideLoader",value:function(){for(var e in clearTimeout(this.loaderTimer),this.viewHooks)this.viewHooks[e].__trigger__("reconnected");this.setContainerClasses("phx-connected")}},{key:"log",value:function(e,t){this.liveSocket.log(this,e,t)}},{key:"onJoin",value:function(e){var t=e.rendered,n=e.live_redirect;this.log("join",function(){return["",JSON.stringify(t)]}),this.rendered=t,this.hideLoader();var i=F.patch(this,this.el,this.id,V.toString(this.rendered));if(i.added.push(this.el),F.all(this.el,"[".concat(this.binding("hook"),"]"),function(e){return i.added.push(e)}),this.triggerHooks(i),this.joinNewChildren(),n){var r=n.kind,o=n.to;j.pushState(r,{},o)}}},{key:"joinNewChildren",value:function(){var e=this;F.all(document,"".concat(S,"[").concat("data-phx-parent-id",'="').concat(this.id,'"]'),function(t){e.liveSocket.getViewByEl(t)||e.liveSocket.joinView(t,e)})}},{key:"update",value:function(e){if(!function(e){for(var t in e)return!1;return!0}(e)){if(this.liveSocket.hasPendingLink())return this.pendingDiffs.push(e);this.log("update",function(){return["",JSON.stringify(e)]}),this.rendered=V.mergeDiff(this.rendered,e);var t=V.toString(this.rendered),n=F.patch(this,this.el,this.id,t);n.phxChildrenAdded.length>0&&this.joinNewChildren(),this.triggerHooks(n)}}},{key:"getHook",value:function(e){return this.viewHooks[M.elementID(e)]}},{key:"addHook",value:function(e){if(!M.elementID(e)&&e.getAttribute){var t=this.liveSocket.getHookCallbacks(e.getAttribute(this.binding("hook")));if(t&&this.ownsElement(e)){var n=new M(this,e,t);this.viewHooks[M.elementID(n.el)]=n,n.__trigger__("mounted")}}}},{key:"destroyHook",value:function(e){e.__trigger__("destroyed"),delete this.viewHooks[M.elementID(e.el)]}},{key:"triggerHooks",value:function(e){var t=this,n=[];e.updated.push({fromEl:this.el,toEl:this.el}),e.added.forEach(function(e){return t.addHook(e)}),e.updated.forEach(function(e){var n=e.fromEl,i=e.toEl,r=t.getHook(n),o=t.binding("hook");r&&i.getAttribute&&n.getAttribute(o)===i.getAttribute(o)?r.__trigger__("updated"):r&&(t.destroyHook(r),t.addHook(n))}),e.discarded.forEach(function(e){var i=t.componentID(e);i&&n.push(i);var r=t.getHook(e);r&&t.destroyHook(r)}),n.length>0&&this.pushComponentsDestroyed(n)}},{key:"applyPendingUpdates",value:function(){var e=this;this.pendingDiffs.forEach(function(t){return e.update(t)}),this.pendingDiffs=[]}},{key:"bindChannel",value:function(){var e=this;this.channel.on("diff",function(t){return e.update(t)}),this.channel.on("redirect",function(t){var n=t.to,i=t.flash;return e.onRedirect({to:n,flash:i})}),this.channel.on("live_redirect",function(t){var n=t.to,i=t.kind;return e.onLiveRedirect({to:n,kind:i})}),this.channel.on("external_live_redirect",function(t){var n=t.to,i=t.kind;return e.onExternalLiveRedirect({to:n,kind:i})}),this.channel.on("session",function(t){var n=t.token;return e.el.setAttribute("data-phx-session",n)}),this.channel.onError(function(t){return e.onError(t)}),this.channel.onClose(function(){return e.onGracefulClose()})}},{key:"onGracefulClose",value:function(){this.gracefullyClosed=!0,this.liveSocket.destroyViewById(this.id)}},{key:"onExternalLiveRedirect",value:function(e){var t=this,n=e.to,i=e.kind;this.liveSocket.replaceRoot(n,function(){j.pushState(i,{},n),t.liveSocket.registerNewLocation(window.location)})}},{key:"onLiveRedirect",value:function(e){var t=e.to,n=e.kind;this.href=t,j.pushState(n,{},t)}},{key:"onRedirect",value:function(e){var t=e.to,n=e.flash;j.redirect(t,n)}},{key:"hasGracefullyClosed",value:function(){return this.gracefullyClosed}},{key:"join",value:function(e){var t=this;this.parent&&(this.parent.channel.onClose(function(){return t.onGracefulClose()}),this.parent.channel.onError(function(){return t.liveSocket.destroyViewById(t.id)})),this.channel.join().receive("ok",function(n){t.joinedOnce||e&&e(t),t.joinedOnce=!0,t.onJoin(n)}).receive("error",function(e){return t.onJoinError(e)}).receive("timeout",function(){return t.onJoinError("timeout")})}},{key:"onJoinError",value:function(e){return(e.redirect||e.external_live_redirect)&&this.channel.leave(),e.redirect?this.onRedirect(e.redirect):e.external_live_redirect?this.onExternalLiveRedirect(e.external_live_redirect):(this.displayError(),void this.log("error",function(){return["unable to join",e]}))}},{key:"onError",value:function(e){this.log("error",function(){return["view crashed",e]}),this.liveSocket.onViewError(this),document.activeElement.blur(),this.liveSocket.isUnloaded()?this.showLoader(200):this.displayError()}},{key:"displayError",value:function(){this.showLoader(),this.setContainerClasses("phx-disconnected","phx-error")}},{key:"pushWithReply",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.channel.push(e,t,3e4).receive("ok",function(e){e.diff&&n.update(e.diff),e.redirect&&n.onRedirect(e.redirect),e.live_redirect&&n.onLiveRedirect(e.live_redirect),e.external_live_redirect&&n.onExternalLiveRedirect(e.external_live_redirect),i(e)})}},{key:"componentID",value:function(e){return e.getAttribute&&e.getAttribute("data-phx-component")&&e.id}},{key:"targetComponentID",value:function(e){var t=this;return D(e.closest("[".concat("data-phx-component","]")),function(e){return t.ownsElement(e)&&t.componentID(e)})}},{key:"pushEvent",value:function(e,t,n,i){for(var r=this.binding("value-"),o=0;o<t.attributes.length;o++){var a=t.attributes[o].name;a.startsWith(r)&&(i[a.replace(r,"")]=t.getAttribute(a))}void 0!==t.value&&(i.value=t.value),this.pushWithReply("event",{type:e,event:n,value:i,cid:this.targetComponentID(t)||void 0})}},{key:"pushKey",value:function(e,t,n,i){void 0!==e.value&&(i.value=e.value),this.pushWithReply("event",{type:t,event:n,value:i,cid:this.targetComponentID(e)||void 0})}},{key:"pushInput",value:function(e,t,n){F.dispatchEvent(e.form,"phx-change",{triggeredBy:e}),this.pushWithReply("event",{type:"form",event:t,value:O(e.form,{_target:n.target.name}),cid:this.targetComponentID(e)||void 0})}},{key:"pushFormSubmit",value:function(e,t,n){this.pushWithReply("event",{type:"form",event:t,value:O(e),cid:this.targetComponentID(e)||void 0},n)}},{key:"pushInternalLink",value:function(e,t){var n=this;this.isLoading()||this.showLoader(C);var i=this.liveSocket.setPendingLink(e);this.pushWithReply("link",{url:e},function(r){r.link_redirect?n.liveSocket.replaceRoot(e,t,i):n.liveSocket.commitPendingLink(i)&&(n.href=e,n.applyPendingUpdates(),n.hideLoader(),t&&t())}).receive("timeout",function(){return j.redirect(window.location.href)})}},{key:"pushComponentsDestroyed",value:function(e){this.pushWithReply("cids_destroyed",{cids:e})}},{key:"ownsElement",value:function(e){return e.getAttribute("data-phx-parent-id")===this.id||D(e.closest(S),function(e){return e.id})===this.id}},{key:"submitForm",value:function(e,t){var n=this,i=this.liveSocket.getBindingPrefix();F.putPrivate(e,"phx-has-submitted",!0),F.disableForm(e,i),this.liveSocket.blurActiveElement(this),this.pushFormSubmit(e,t,function(){F.restoreDisabledForm(e,i),n.liveSocket.restorePreviouslyActiveFocus()})}},{key:"binding",value:function(e){return this.liveSocket.binding(e)}}]),e}(),U=1,M=function(){function e(t,n,i){for(var r in k(this,e),this.__view=t,this.__callbacks=i,this.el=n,this.viewName=t.view,this.el.phxHookId=this.constructor.makeID(),this.__callbacks)this[r]=this.__callbacks[r]}return w(e,null,[{key:"makeID",value:function(){return U++}},{key:"elementID",value:function(e){return e.phxHookId}}]),w(e,[{key:"pushEvent",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.__view.pushWithReply("event",{type:"hook",event:e,value:t})}},{key:"__trigger__",value:function(e){var t=this.__callbacks[e];t&&t.call(this)}}]),e}();t.default=B},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(t){t.Phoenix||(t.Phoenix={}),e.exports=t.Phoenix.LiveView=n(0)}).call(this,n(1))}])});
  })();
});
require.register("js/app.js", function(exports, require, module) {
"use strict";

require("phoenix_html");

var _phoenix = require("phoenix");

var _phoenix_live_view = require("phoenix_live_view");

var _phoenix_live_view2 = _interopRequireDefault(_phoenix_live_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var liveSocket = new _phoenix_live_view2.default("/live", _phoenix.Socket); // Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".

liveSocket.connect();

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

});

;require.register("js/socket.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var socket = new _phoenix.Socket("/socket", { params: { token: window.userToken } });

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
socket.connect();

// Now that you are connected, you can join channels with a topic:
var channel = socket.channel("topic:subtopic", {});
channel.join().receive("ok", function (resp) {
  console.log("Joined successfully", resp);
}).receive("error", function (resp) {
  console.log("Unable to join", resp);
});

exports.default = socket;

});

require.alias("phoenix/priv/static/phoenix.js", "phoenix");
require.alias("phoenix_html/priv/static/phoenix_html.js", "phoenix_html");
require.alias("phoenix_live_view/priv/static/phoenix_live_view.js", "phoenix_live_view");require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map