"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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