(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!*****************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/swipers/1.jpg ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/7AARRHVja3kAAQAEAAAARwAA/+EDOmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4NCgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDc2NjIxODNCQjY3MTFFNjk3QkVFRTMxMDgzOTQyRjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDc2NjIxODRCQjY3MTFFNjk3QkVFRTMxMDgzOTQyRjAiPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDc2NjIxODFCQjY3MTFFNjk3QkVFRTMxMDgzOTQyRjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDc2NjIxODJCQjY3MTFFNjk3QkVFRTMxMDgzOTQyRjAiLz4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSd3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"

/***/ }),

/***/ 18:
/*!*****************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/swipers/2.jpg ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/7AARRHVja3kAAQAEAAAAPgAA/+EDjWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4NCgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ1OWM2NzYyLTYxZWItNDNmNi1iY2EzLTVlYmExNGZlNzMxZCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODFCMDQ3RUNEOTIxMUVBODY2RTkwN0E1NTM4N0Y4NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODFCMDQ3RENEOTIxMUVBODY2RTkwN0E1NTM4N0Y4NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDM0NmZlYmItOTE4NC00YTE0LThkNGQtYTRjYTcwYmU1OWZlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1OWM2NzYyLTYxZWItNDNmNi1iY2Ez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"

/***/ }),

/***/ 19:
/*!*****************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/swipers/3.jpg ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/assets/img/nav/shop.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 21:
/*!*************************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/assets/img/nav/客服.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1dCZgcVbX+T88kQDAJyg7BKA9EJAqI8t4TBOKCRJDVmSZKWFQSVIjpSVhVHOSJhKU7IqiAaESBTM8jhk0FHiA8EEEQREAlrCJLQJ6QhADJpM77/qpbk5pOz6Squ7qrqvue7+svIdzl3HPvX/fec88isGQlYCUwrATEysZKwEpgeAlYgNjVYSUwggQsQOzysBKwALFrwEqgNgnYHaQ2udlabSIBC5A2mWg7zNokYAFSm9xiqKVvB7CB+Y0J/P0tAG8AWGH+NH8X/mmpyRKwAGmYwHUjAO8F8J6K3/YACIiotBLAkwAeW/snL0RtzJYPJwELkHByClFK3wHgE4Hfu0NUiqvIiwBuAfA/AG4C5Pm4Gm73dixA6loB+kkAnwLwMQC7RmxqmTlG+Ucp/snf+hXHLu423I2i0F8A3OqBxQXMm1Eq27JrJGABEmk1KOW1J4CpALoAbDJCdR6JHgfwVwB/C/weBWRppG7dwjoawA5VfjzCjQQgAvGXAK70dhhZHb3v9q1hARJq7nUXA4rDAbxzmCoK4AEAN5ov912ArArVfN2F9N8AfNSAlwAmkKrRSwDKHljk7rq7bYMGLEBGnGT9HIAeALsNU+xfAK4zgPgNIK+kY83oxgD2BsAjIEFdbYfhZf9cQH6cDp7TyYUFyFrzouMBzABwAoAJVaaNGiMeWa4GcHv6jyw6CsABAI4C8GkA/O8gvQzghwAuBIR/txSQgAXIoDCUR6dTABxtLsnBhcKjyVUA/huQO7O7gty3F+4o0wHw2FhJ8wHMBYT3JksALECg1BqdCuAko0EKLoynAJwH4DJA+IDXQqRUSXPc1MAFiZf4nwD4JiBLWmjANQ2lzQGinwVwfpWL958AnANgASBOTZLNTCX9kAHKwQByAbapcubH4RxAXs/McGJmtE0Bonzh/gGAyRXyfAjA1wG5PmY5Z6A5pebrW0ZbF+T3nwBOB4T3lLajNgSIng3g5IqZpvbpJEB4tGhz0o+YS/sHKgRxP4BuQGju0jbURgBRmn5Q8xR88eY7xQUAzgCED2qWXAm4D6JfAPBdAJtWHLsKgFzSLoJqE4DocQCKFdopmmEcD8jiBk82TUUmAeAXmccYasv4mwhgiyqKEgL1NfP7PwDUoP3d/J4xBouPABhoMN8EClXe/+XJaQjdAOBIQMhfS1OLA8Q1ILwCwH4VX8HZgPyoQTNLQOwL4FAA/wFguwAIqCGimcmrBgB8aPTB4P+5oXnY4+Ik/2MD/80HQF6kacZCeyvemXj0+V8ADwJokEJBP2hMVYIv9DSQ5JGLfbcstTBA9MMArjVfaX8CuZgOB4Q2UnESjyHUiPEhjq/X6wGggSANBrlwqRXjj6/XNEmph7j77Gx+fOHfywCJAOMbDa16Oe4n6umkel09y2i8gv+b6mDuMi1JLQoQPRBAX+Bdg19Wqm05mXEdTXhEygOgepQ7BWVJjQ9NTxYZm6xmvJ10GBusQwDw59uKPWxe/CkHHslioqq7ST+AzzfP9iymoYRopgUBonz84pfOJ2qoDo7xBXx3ALPNjsHjzrNmIdL85I7GHXNCzKZXhMchHu8IlveZWvQT4ZsGDSljIr3MXOT99n4H4MD02KPFM8wWAojyS/oz70s2SDzSfAIQLuJ66SAAJwLYw1yQaRX7PQD31ttwA+vzvYcXbGqk6N5Ls3vupDQpieG+4n6MvhO4Y1HOnwSE/bQEtQhAdJw5d9OC1SeexQ8DhGfzeojHp5I5Ri0HQOtXvr7/o55Gm1yXl3sChQaY/DuPXN8wR8E6WVH6xtDXxCe+uh8AyG/rbDgV1VsAIMov420A/j0g0csBHFOnmQg1NgTC/gB4TON7CX/UQGWVqGH7ktkJaal8H4CvAeDxqA5SfkSo+qXWjUQFxT6A3FNHo6momnGAKCec52o6Cfl0GiB84KqV2Ca/rjxOERhsiw9jrRRVhCbvPIpynNt6xpjueOsAv9KzkVq7rY3guZN8POsgyTBAlKpUXj6D4ODD30W1IsPYZvEes43RRh1jQFJHk6muSktmgoSmN3yf+bLxOKyRaWXEFqqaNzMN8Hj7UUD+XGODiVfLKEBcJ6DfVJhq06DuzDolyrM5wcFjx0/rbCtL1Xc0Ju5UXW9VH+NKzdldAS9GvrbvkVUfk6wC5BpPpThIZwNCjUq9tJM5ZjxXb0PtXV+pCqeS5G1GDnwf+vcsGjpmECB6IYCvBhYgXUWpnbGUKgkoNYrc5XmMI1H1u1vWfEsyBhClr3jQhmo+ILwnWEqlBJS+8LQs8OlGQIJ2cankOshUhgDiqhJ5AeSDIIlha/aK0XQk9ZOVTQbXsmw4H5A5WRlLRgCivDwy5hSDDpCe9vw6pA61ZFamqBX41AXGbs0fzFGA8K0q9ZQBgLiv5HzQogqRxNfs3QGhubelTEjADYzB3T8YX+w/Afl92tnPAkBoxkBzBhLthz4FCN8/LGVKAkrnMPqv+B6KdP56b9rjBqccIEoDQZqO+3QKIHMztS4sswEJuPfIYMjTCwDhm1NqKcUAcYOcMYCZ/yp7PyAMUWMp0xJQOld9PTCEPQHhw2IqKc0AYSRDRgEk0fhtpyw+NKVy1hNlynVLoBGjfx9J9VErpQBZ62h1AiB8ILTUEhJQGkjSrMd/RPw+IDPTOLQUAsQNtEANlX+0ug2QyvCYaZSl5SmSBJSGkQze51MqtVppBAjD8xSM1Bj+ckdAGPbGUstJQOnHs48Z1n2AMNBGqihlAFH6EjBgtB+ifw4gdFqy1JISUBqHUvXrxwTOA0JX5tRQ2gDC0J++bRUvb9tZU5LUrJUGMaJ0Yf6iaZwWEtunac5TBBDXI413D/9r8llAGCrUUktLQPlwyFMDA+aRZgHCYBipoDQBhGBguBrS7wH5z1RIyDLRBAlor4ksz77oYPWutMRKTglAlDpx2lv5RL+BPzZhZmwXqZCAcvdgtEuao5C+AwhdgROntACE5iQ0KyH9ApBpiUumxRnQfPEnxpfm59JXODL54SrDEn3f8EEr7a0ASTxQRgoAou8yEcvJC+PW0oCNAd8sNUgC2j1vL4jePti84N2yoMALcoLkhm9iQGxab5O+CkjwnSQR3tIAkKAL7Q2A0AvNUoMkoMz90V16GCJ+WFJA9ZNS7kmBhbTOMwEzOPonAWH+90QpYYAonfqZ/4JfD9LkVonIl+isjtC55ufNAHRo6gfF6VIu1BsRJoYhuyYovIv465IRGhmQLjFKGiDMLOubrz8ECMP6W2qQBPTAuWOxwahnAPE9M72eVG+Xco//ot2g3sM2q8wPyWiWpFsAYTbexChpgDwPYEsz+qmA0DXTUoMkoN2lEoTvDBWkOoAxbx8r84+h1XTCpMyvwuxfPk0CJMb0DdGGlyBAhljsPguIn9ci2ghs6VAS0K4L3gdZ/RDED3qh50JxHESYwQpQZ38pz/5VqMYaXkgZIogPx6SzAAn6jzS892AHSQKEiV26DTNxBX5rqvCy0pl2XfQ25N6iw5lZdPoAlizdHZuPvxTA0R5A9FIp90xPx5iU6aj5eEh6GhAmYE2EEgKI68TPF1P/cv5BQBi1xFLMEnC1Vvl5vOhO8YCAFdCBSdJ/4lOaL/HfvF1D8QrKszYVSL0p4mIYgVJ7FUyT94Gk4vsmBRDuHNxBSI8D4kcsiUG4tomgBDRfGuriqviilAtuPnidfvEovPb6ksFLuyP7Sv+sm9MhQeUHcxfDSy8gZyTBV1IACdpdpcasIIkJaGSf2l06GAKmhvNIcYOUC0PemTRf4jGLOUNIKXlVd5kNajj/DAjTaDedEgCIe7xiqH3f52NnQOgTYClGCWhX8f0Q3AMRc4zVZ9Cx/q5y5VeYenoNZrrPnwzJMa8HF+WbWLHhxnLdDDqqJUzKBD/B1Hk0YKQLRFMpCYAEU3Y9AQjziFuKUQJ6WHEndDJ3unnvULwK6fiQ9M1cKzW0uaO8AGBzw8Kx0legj0YKSJn5yrfqPgmQc5vNVBIACWZHnQvIKc0edCv3p12lXZDTW9c8BuqbcLC39PcMm2xUu4vnQYSZe6nNulfKPcF0dgmKS3nvON0wkIgZUhIAWex5Cro0BRCGyLcUgwQ0P+/DgNKmyjP4U6yG6gHS3zOijPXQ4rbolMchxsTDwa7SX3gwBpbqbGLIo+EyAOPRZC1bkwHiBoOjepfEMKLjspYvos4Zb1h1Pfz8j8DJ3QgZTFrDx79pUp79izCdar64CBDP5UD1F1LuSYHLgZtmj/ch38t0F0D+FGY8cZVpNkC6Ajnw/gAIMxFZqlMC2jXvQOScKwHx3Va5e5ws5QJzoociPby0D9TNFkyADEDxLunvSUGmLf0DAD+iZtPjozUbIEyj7GeDOhcQqvIs1SgB3ae3E5uNOwcifpgkLu6VkNwR0jerP2qz2l18CCLvN8ezeVIurGk3amOxlddgGKh+QHzri9h6GKmhZgMk+PiTuClzUyTcoE6065wtIKOuhWBNLCm+hotMkb5Z/OpGJu0uTYWA0fQJtDegnROlf+bLkRuKtYIeAmChafIVQDaJtfl1NNZEgLg5zZk726exgDDXh6WIEjD3jUWQwVQCXNF/hei+smB28O0gUsva25vDX8YzYLhn2aB6lpR7EjMU9JjXjQEwCahP7wSk5jFGEkjAMSVqvRrKK309fM3Ic4DwIchSBAno1PM2gZP7FlS+vMYq111E18NZb6r0f7XuD47m5x0JKHPFEyDL8OaqreXak6lBSpCUTnV+XpGmaj6buYMEt8q7ANkzQYlnqmvtOns8ZDSjTPZAwJ3YfFz1JYj0SF/hirgG5N5rNh9H+zimveNl/xwpF06Oq/3a2tHfAmDWXNJsQHgvaQo1EyB8iDrPjOoKQI5oyggz3Il+5uIx2OCNEwDnVIiMXwMMKASXobNjtlwxk2Y7sZLmi8cA4ho0AliFVau3l4Vzmm7msWZQ+kMAx5n//jEgx8Y64BEaayZAGKGCEb1J1kBxhEnRQy7cGKNXHgsIvf98ExCvhuJvUD1ypJfxehePuYvwvWGSaWuh9BUOq7fdsPW1q9wBeX4PwGEW487rn9929/v/tZlrrr/R6Lee/dr2D/jgHUmKAxC8BMULGOh8QBbO/EfY/oPlagKIHnreRHR2HgRx9ofKRIjrNuuHa4nOBzUmIg/B0ZOlv2dNOJroLWW6huZLO0LxNYgyC6yfO8MHxgsQnIklr10qv+0daPRAtau4H3Ly68F+BJNlQYFHnYaS6Zc7BsNBxUeq90PkSiztuEh+PfOtsA1HAogefv42cHJzIYNJNcP2E7KcOlBMlXJPqiJ8h2S+pmLGWHA/DxhMUFpJyiALczF+zI/lkhmrauqkxkraXbwBIp92q6s+hWWdO0ZZXFG7NetrMQR8QW8QUZ74mvT1XBOmg9AA0e55MyEOjQuHftnC9BKtzFK8hYmyqNCyOdC1q7gdcmBSoMlQ+fhQde2gsJ6Eo2fh5aU/a8aOUW2K9NALJqBz4LGAyfzZ0tdzarTpDF9au4sXQeQrBpCvBbSeeGbFuK3HdKxa8bbOVSs26BgIvQNAsFH1aDn6PTgTZkt/9+qROFwnQDytRsB32eOedlR01aTtz+/x1uin5JfHvxJeFENLeuFoRvMR0QsUVkcAAT3k3M0wqmMaaOKd00ewdNQDjfzqrWvMRn7bQ3V3iJspi2FstqpeTxlVZBEc/Aw7Lb1Jensp50RJu0tzIPDMzGn8KM5u0je7IfZQ2l16AGK8CB05XPpn+V6ndcnA9Y3JyfFQPRoio9c0prdgydL9RvoAjQgQb/sv9QFCGyqPVMsYcE6KW6uh+eKNgOzrdSLHSd+si2uRinaXLoPgC4G6q6B4EKIPu+kVVB9BLrcCjjiQ1S/CWfa09PeurKWvYB33YvvIuG0hMgnChKM6CYqdIPLegHPYMN3o76A6H28OLEj+zaHi4+VemJ+7e/DFXvVx6Hq7xvHmUikMzRcZoMFTLzfA/ddYH/RBsFcAJP3oK+SH88UfGSDdpV4IGGHCgAPnSblwYr2LqVr92AAStEoNy6i6D1GMTesFSxa85Wo/IIzbZcCjoyCyGaBbQOGFyvEKU/1KTdNmQx/vRuicgRMEt0P1Ziiuk/6eYICCsFw3rZxrDj+KmaCMMaTqdVLuOTBuBhoNEPJr/PD5zBD46A9v9TwsQHTqvM3hOES0d+dQXCXlwufiFsog9uLaQTy+ZwD4/JowN43iOmy77pH0j1C5GXBuhi67K45dK2zvcZTTfIl+6/Rf9z+WkayFw/DQDIC4S9ndFf9xPUT2M3w9CWfr91S7jwwPkHwp+G7xJDbYaKdGRt6LawepnAjvTjJqV0DfD+h7ILI9FNtC6PMsvp9BmPlbdxl3J5LFEH0MKouhWAxHHkPOWSz9PYmH8l/3AEYuod2lK4doMB0cI/2F+fW2G/hINvSIFeTTNdtZ3UGN2UbeBlB9F6kKEO3qHQ0Z9+qg9sLBAdJfaGgQ4UYBZLjJc7fafy2dgI7OiXCcCUBuGyCselHegOoSiLyAnPMKVudeAl59MWu7QtSFrVMuWA/jBu4ExPhnqAMH06S/x7MArpOatYMMArK79C2ICVCnuFbKBT9HzeBIhgEIHXDU1xMvkb6Cn/mnThEMX73ZAGnYQFq8Yc9gsoPm9N5Dnro5Xb4t5YIfCbFmCTQdIId9b3t0Ol4uGvrRLOscV6nxrA6Q7uLZEPEM1JoUktICpOZ11fSKng877oAI03Z7pLgWK3FUPe9XzQaIy3a+RCWMF4LKGdiWESeDAq0OkHzpcgCeT7LiNCkXvtvoWbAAabSE423fMzfquAOCNUHHVV9ETo+QBbNvqaW3RADSXVwMMaGnFHtKuXDXugHSXboJAoahJzUlTpIFSC1LKtk62lXcGjkw2IPvM+5vJzfBkbnSXzAB6cLxmQhA8sUHB1/aq9y1h9tB6LxvEqroF6Sv56fhhlh7KQuQ2mWXZE1XZZp77gRA/2tI0AjveL4Mgr9D5R50yGly1awlI/FqATKCdCxAklzm9fetXfPeiZyeAcW0qg+miu9KuXCaBUiNsrYAqVFwKavmGmJ61hefGeLk5eBI6S/83AKkxgmzAKlRcCmt5trxdZUmIYe94eDxdUV3dE9kDbbFqiYqtXeQlK4gy9ZaErAAsXcQC4uR10DTTE18NuwOYpdkZiRgdxC7g2RmsSbBqAWIBUgS6y4zfVqAWIBkZrEmwagFiAVIEusuM31agFiAZGaxJsGoBYgFSBLrLjN9WoBYgGRmsSbBqAWIBUgS6y4zfVqAWIBkZrEmwagFiAVIEusuM31agFiAZGaxJsGoBYgFSBLrLjN9WoCsmSomiVwcnDnrD5KZddwwRkMAhDloGIGk5kDplcyn0Zp3DwB3AvgPAPf4DFuANGzdZabhEABZBODtgXyFdY8tjQBhQhZGaWSymJssQOqe45ZpIARAmOGKoUJ3iWvQFiBxSdK203AJWIB4IrY7SMOXWjY7sACxAMnmym0S1xYgnqCZcel/3Px8AU2WvaQ3aRWmuJsQACmZS/rRcQ0jjXeQqmOzAIlryrPbTgiAxD44C5DYRWobbJQELEBGkKzdQRq17LLTrgWIN1c7mjsIg2MPvqZbgGRnITeK0xAAKQJ4B4DU30E2BMCc39fVICyr5q1BaO1QJQRA6nko7AbArGlvBWXZqDvIN3K53Ncdx3kbgNURJ88CJKLA2qV4AwHyYQD3Gs0pQTZIjQJID4Dz77zzzsKee+45L+IEWoBEFFi7FG8UQM4666w7TjvttI8C2BXAg80ACO2ofrNo0SIcdNBBx4hIlFTAFiDtsuIjjrMRAFHV+TNmzDjq0ksvXaWqtONa0QyAjBaRf+bz+bFXXXUV+4sCEguQiAunXYrHDRCCY/ny5UdtueWWunz58l8D2L9SlrUdsbqLt0KEL93M2jBcCjYm9jzlvvvuw2677RYFJBYg7bLiI44zToAQHACOOvPMM3H66aeTkz0BDEnQ6a7ufOnPACa5rDo6pTKPyTA5CotlQLo8fOgcKfecX2WsY3K53J/Hjx//zrvvvrtzhx12CAsSC5CIC6ddiscBEHOMYk7NgxcuXIiuri51HOdqAN56riDNF18GZBPvn51dpG/2n4JFhsmTXipBMMsULEpfYfYwk7TNqFGj7lt//fU3ueaaa3KTJ7ubznwROWaESbUAaZcVH3Gc9QLEgOM2Vd2lWCzixBNPJAfPqur7ACxfCxxd52yB3KgXBv89t3pTuWrOP9cNkHzpSwAuNQUfkr7CziOMdUIul7vVcZztu7q6MH36dEyePHl+Z2fncCCxAIm4cNqleD0AOeKII3bI5/PXP/HEE9tdcsklzqOPPpoDcAeAPIAXq+8epS8D+IH3//RZ6etZk/PdVKi+g3QV3wGRlwazlQ7oJLm655ERJmoDXtRHjx59/MqVK/lS7tMcqoMr6lmAtMuKjzjOOgBCD1WuK5dE5FVVPQnAj7nyq4Jj+sWj8NqKvwLY1sMHzpFy4eTKslUB4pbPl34FYIqpfJeUC7zkhKFtADCx/LuNa+3fKipZn/QwUmzDMiEAwpdwqmr3rhDPfibGAR+t7wdwG4A3RhKh5ounA3KG2T0cDDg7ydVzCJghNDxAuoq7IyeDQRUA/bb09TC9bxy0HYDHgw1ZW6w4xJrtNkIAJJaoJto9by+IcxsgPIaRfi59hSOrSW9YgLi7SHepH4LPDlZUPUvKPV9vxDRYgDRCqtlqMwRA6h6Qdhc/Acg1EIxxG1NdhgHn/bJwzjPRAXLg3LHYYPTvBvXEXoNlDDgnDddgrSNIN0CUH5KZADq9c628Vus4k62nW/CuCOBNABcCsipZfob2rt3FJyHCozkX2qekr2cw6k29fOqhF0xA58CpgMwYvFurroTmPi79sxiGqiqNuIO4bE6dtzlWO3w4pKrMkDpQWQg4P5DybJ736ibtLt0LAY3KCMK8lHvKdTcaWwM6DcDlprm/U8cOyAOxNd+UhvQjABhXalPT3aGA/LIpXYfsRLtLN0HwSbMGfoGcXBay6trFHO2EygTkdAeofNy9FwvWrHdVfuQ+K+Ueun8PS+sEiLtep527IVZ2coEcunZL+jogT0G19mh3ImMBfHCw7VUd28jCmf+oWTixV1R+dX8SaJZf3tM8DZ1U1ZLEzkLNDbq7H41L5wLoMM3wMrszICNpJmvusdaKmi+eAggtNBpLigehcpD0z+LHbkQKBRC/Be0udkNwDiAT19Vw7f9ffyp9PV+ovX4jaiovcxcBOK6idaNnl6p69kZwEq1NpcqdHzZqFX16FcBhgNwara3Gl9Z9ejufH7vV41uNeb0x60vxMkS+iR1fvVR6e50wI4oEEDaoUy5YD2MHDgfkYIjuB8j6YTpaZxmlvlovR+f6BbnyK/9aZ/lECrhHLT6grhfonrx+x3twkhFVi81jWantoU6fbwG8N/nEHWN/QKpeSJvH33A9qayfW/1UcdfbJ07Z8mlMHLMUEnmFmrbV9VPiWx5fyv/oXsydV2+S/t6VUcZZa/duH9pV7gCe3hROx5bIyTh01Dic1boCb274sFw3Y4gpcpSBNK+sfgDAFUMUF17nSwDwePAjQIZ4rTWRN2pmTgBwKoDxgX4HAHwfwDcASbGMdSqAKwN87wjIWm8TzZMnApeWZvaa+b6UX2V+nfkuNLpiODxu0Xe6D5B1nnHjEYW+CwDNJmgiRJ/tIN0O4FhAhkTTj6ffuFvRNZa1wC2AfCLuHqK2V9cOErWz1iuvtBqgIed0ADS3qSRquhZ6P3k03vErLVAPAkBfa2p+KufyLx6I5fp4+21Ua7ovgBsDrfMoSGuORMkCJBbxK7/aPNrwraTyC+73wLPwfQD+YH73ABLhrqX0/2fKCLqOMiIMTXZ8rVRwFM+ZO9ElgESNFxCLNGprRG8xgUBY/T5APJV/wmQBEusEKHeRzwE43Ey2b8owXC/UKBE4zwd+PL5xd9jY/Ph3/pgXYzjixZMRZqiKvjFbwOCQlFo2fjh8+hggsbyv1Tu9FiD1SnDY+rqZOf4QLHyki1vW/weAbqQ8Qv0KkKUNG0rDG1aCw1dFp+Lu4Q857klruCiz2YF7X6A1NI9H/PFRtNrxaF3DY0QOnsv5uxuQULr8dTWa7P9XGgn+LMDDB9NkpWABksjqcI9i/GJSFcu7BX8Mxsf3C6phuTsEf7RSeCVttlP1i869Vz1ljpBs7r8HXb3rbzyWFixAYhGjbaQ2Cej3jGKD1alQ+Le0PWJagNQ2s7ZW3RJwH1yDARL4wMq3nFSRBUiqpqOdmFGG4KHygkRN3g6ALEubBCxA0jYjbcGP0hg1aMpOJya+g6SOLEBSNyWtzpAySBsfTH2Dz4sBqbSSTo0QLEBSMxXtwIhrZUx7Kz+8Dm3VaJCYWgNKC5B2WJepGaPeDMA3QKSj2R6A3J0a9qowYgGS5tlpKd70mwC+HRjSPEAKaR+iBUjaZ6gl+FNaGwcDMNCyeTdAGDwi1WQBkurpaQXmlDHQGMyN9w8SrQI+BMjTWRidBUgWZimzPCojqBAc9Jsh0dOS9w7+WybIAiQT05RFJt1sTv9b4Zo8FZAFWRqNBUiWZiszvCrfOAiOoNPTHECq5ZlJ9agsQFI9PVlkTmnGT3N8utD6dBEgx2dxNBYgWZy1VPOsjPhCr0qffg5I1cDQqR6GYc4CJAuzlBkevbyAAXbnAyNmG0v9yCxAUj9FWWDQNSFh3F+T+NXl+XJAgmDJwkDW4tECJJPTliamlXZV9I0PBDd3o0x+NU1c1sqLBUitkrP1GI2EvvWMZWWyxLpCOQOQ3lYRjwVIq8xk08eh+3s+5PBjM9P4cDogzAvYMmQB0jJT2cyB6NkmOLbfKT0BGdA88UiIcUvBAiRuibZ0e64fOYNL7xQYJpO0fhqQJ1tx6BYgdc+q7mbiXG3VgOBwtWlaZ4oAAAPuSURBVHLH7EkPAXgYEEadj4H0TC86/BC62lPryusxdJDKJixAapoWZQyrr5ho6u+pqYnmVeIlekbt4XSU2immwwvuGsywRdORC5o3jGR6sgCJLHdljFwGGNg1ctXkKrzkefIJ3V1Dkhvc7hQAp1dUYBzhQwC5N2RDmS5mARJp+lwjPKZd2z1QjV/TJ0wCnUitNbAwdzh+8YMpGeiHQSeldWSXctPNMeoIvf+2DPDoJ+H5VhrD8zRKlhYgkSSrTIYZtEi9AcC0aGkMInVYR2HXaJAJfpjX3o8yvwiQQ4ZvVKcAzEEJRh4JEpPwfAmQx+tgKJNVLUAiTZs+C2CCqcLg0X7gs0itNLewMhMWM9z6tBkgLw/lQbnbMEnp3hW8cWfkXYNmJG1JFiChp12Z4D6oyuRx5Y+hqydaUBkgmmnaSEcDYqKpMwmre5zqqmBvOYDeLPpvxC1mC5DQElUa4vmpkxlpPWheEbqVZAoqtVA+CEoACICjA66wPlu8Z1ziXcyl9rz3yQyyIb1agIQWqx4M4Jem+J8A2SV01cQL6g9Mkk9yQpOQavPODFU8Tj2WOLspYsACJPRkZBogtJk6rMpQuZPQwYkefxFUwKGFlvmCFiChpzDTAGGO9KDL68MALvYyO6UvonroKWlCQQuQ0EJuGYAsAGRq6GG3eUELkNALIHUAYUC2CwPm5v79gjtDRWgdDe4gRUCY291SCAlYgIQQklfEAiS0qFqooAVI6MlMHUBCcw7YHSSCsIYUtQAJLTkLkNCiaqGCFiChJ9MCJLSoWqigBUjoybQACS2qFipoARJ6MhMDCK1v+wHQOjcM0Rr35KEF7R0kjOCqlbEACS05PQAAzTFIfwEkGAcqdCs1FNwCwBcBjApRl2Yk5LHCiFJpX3WsqX8uILTwtRRCAhYgIYTkFVFGKve96OgktSEg/DMDpH/wkta4NBuQYgaYTgWLFiChp8H1Q6eFq5+++POAMMJHyskNKsG0yz59DJDbUs50atizAIk0FXoNgANNFcaCop93in2zdXPjP+8HXKCj1JaArI407DYubAESafJ1Z5NSzL8w03+CxxWe+WMKrxOJoeEKc7djDCu6CAf9Vr4MyI9i6aFNGrEAiTzROs2zgq3qUxG5tSZW+Ckg9B60FEECFiARhLWmqNI7j7kwxtRUvbmVqEgoAVKh+m0uE1ntzQKk5plThsSZabRDVPkysmJaaCmABwEs9EKFVgZpSAub6efDAiT9c2Q5TFACFiAJCt92nX4JWICkf44shwlKwAIkQeHbrtMvAQuQ9M+R5TBBCViAJCh823X6JWABkv45shwmKAELkASFb7tOvwT+H3D2/X3ZT2ZiAAAAAElFTkSuQmCC"

/***/ }),

/***/ 22:
/*!*************************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/assets/img/nav/社区.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 23:
/*!***************************************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/static/assets/img/nav/视频学习.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*******************************************************************!*\
  !*** C:/Users/sugar/Documents/HBuilderProjects/tznews/pages.json ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 68:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 69);

/***/ }),

/***/ 69:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 70);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 70:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map