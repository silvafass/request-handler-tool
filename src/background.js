(function() {
  var
  webRequestEventNames = [
    'onBeforeRequest',
    'onBeforeSendHeaders',
    //'onSendHeaders',
    'onHeadersReceived',
    // 'onAuthRequired',
    'onResponseStarted',
    //'onBeforeRedirect',
    'onCompleted',
    //'onErrorOccurred',
    //'onActionIgnored'
  ],
  eventListeners = {};

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action != 'requestHandlerClean') return;
    webRequestEventNames.forEach(eventName => {
      chrome.webRequest[eventName].hasListener(eventListeners[eventName])
      && chrome.webRequest[eventName].removeListener(eventListeners[eventName]);
    });
  });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action != 'requestHandler') return;

    let isAlreadyRegistered = false;
    for (let eventName of webRequestEventNames) {
      if (chrome.webRequest[eventName].hasListener(eventListeners[eventName])) {
        isAlreadyRegistered = true;
        break;
      }
    }
    if (isAlreadyRegistered) return;

    chrome.tabs.getSelected(null, function(tab) {
      console.log(3, 'getSelected - ####################################', tab, request);

      let page = null;
      for (var pathPage in request.config.pages) {
        const pathPagePattern = new RegExp(pathPage);
        if (pathPagePattern.test(tab.url)) {
          page = request.config.pages[pathPage];
          break;
        }
      }

      if (!page) return;

      const
      requestMatchings = Object.keys(page.requestMatchings),
      requests = {};

      for (let eventName of webRequestEventNames) {


        eventListeners[eventName] = function(details) {

          const requestMatching = requestMatchings.find(matching => new RegExp(matching).test(details.url));

          if (requestMatching) {

            requests[details.requestId] = {
              ...(requests[details.requestId] || {}),
              [eventName]: details
            }

            page.requestMatchings[requestMatching] = {
              ...page.requestMatchings[requestMatching],
              requests: requests
            }

            console.log(1, `${eventName} - ####################################`, details);

            chrome.tabs.sendMessage(tab.id, {action: "savePage", pages: request.config.pages});
            //chrome.storage.local.set({'pages': request.config.pages});

          }

          return {};
        };

        chrome.webRequest[eventName].addListener(
          eventListeners[eventName],
          //{urls: requestMatchings},
          {urls: ['*://*/*']},
          Object.values(chrome.webRequest[`${eventName}Options`.replace(/^on/, 'On')])
        );
      }

    });

  });


})();
