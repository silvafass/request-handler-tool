"use strict";

(function () {
  chrome.runtime.sendMessage({
    action: "requestHandlerClean"
  });
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(5, '####################################', request);
    if (request.action != 'savePage') return;
    chrome.storage.local.set({
      'pages': request.pages
    });
  });
  chrome.storage.local.get(['pages'], function (config) {
    config.pages && chrome.runtime.sendMessage({
      action: "requestHandler",
      config: config
    });
  });
})();