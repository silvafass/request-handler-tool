/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {




var _interopRequireDefault = __webpack_require__(1);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(2));

var _objectSpread3 = _interopRequireDefault(__webpack_require__(3));

(function () {
  var webRequestEventNames = ['onBeforeRequest', 'onBeforeSendHeaders', //'onSendHeaders',
  'onHeadersReceived', // 'onAuthRequired',
  'onResponseStarted', //'onBeforeRedirect',
  'onCompleted'],
      eventListeners = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action != 'requestHandlerClean') return;
    webRequestEventNames.forEach(function (eventName) {
      chrome.webRequest[eventName].hasListener(eventListeners[eventName]) && chrome.webRequest[eventName].removeListener(eventListeners[eventName]);
    });
  });
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action != 'requestHandler') return;
    var isAlreadyRegistered = false;

    for (var _i = 0; _i < webRequestEventNames.length; _i++) {
      var eventName = webRequestEventNames[_i];

      if (chrome.webRequest[eventName].hasListener(eventListeners[eventName])) {
        isAlreadyRegistered = true;
        break;
      }
    }

    if (isAlreadyRegistered) return;
    chrome.tabs.getSelected(null, function (tab) {
      console.log(3, 'getSelected - ####################################', tab, request);
      var page = null;

      for (var pathPage in request.config.pages) {
        var pathPagePattern = new RegExp(pathPage);

        if (pathPagePattern.test(tab.url)) {
          page = request.config.pages[pathPage];
          break;
        }
      }

      if (!page) return;
      var requestMatchings = Object.keys(page.requestMatchings),
          requests = {};

      var _loop = function _loop() {
        var eventName = webRequestEventNames[_i2];

        eventListeners[eventName] = function (details) {
          var requestMatching = requestMatchings.find(function (matching) {
            return new RegExp(matching).test(details.url);
          });

          if (requestMatching) {
            requests[details.requestId] = (0, _objectSpread3.default)({}, requests[details.requestId] || {}, (0, _defineProperty2.default)({}, eventName, details));
            page.requestMatchings[requestMatching] = (0, _objectSpread3.default)({}, page.requestMatchings[requestMatching], {
              requests: requests
            });
            console.log(1, "".concat(eventName, " - ####################################"), details);
            chrome.tabs.sendMessage(tab.id, {
              action: "savePage",
              pages: request.config.pages
            }); //chrome.storage.local.set({'pages': request.config.pages});
          }

          return {};
        };

        chrome.webRequest[eventName].addListener(eventListeners[eventName], //{urls: requestMatchings},
        {
          urls: ['*://*/*']
        }, Object.values(chrome.webRequest["".concat(eventName, "Options").replace(/^on/, 'On')]));
      };

      for (var _i2 = 0; _i2 < webRequestEventNames.length; _i2++) {
        _loop();
      }
    });
  });
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(2);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ })
/******/ ]);