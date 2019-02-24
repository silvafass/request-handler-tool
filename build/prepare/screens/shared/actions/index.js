"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromeStorageSet = exports.chromeStorageGet = void 0;

var loadPages = function loadPages(pages) {
  return {
    type: 'LOAD_PAGES',
    pages: pages
  };
};

var chromeStorageGet = function chromeStorageGet() {
  return function (dispatch) {
    return chrome.storage.local.get(['pages'], function (config) {
      dispatch(loadPages(config.pages || {}));
    });
  };
};

exports.chromeStorageGet = chromeStorageGet;

var chromeStorageSet = function chromeStorageSet(pages) {
  return function (dispatch) {
    return chrome.storage.local.set({
      'pages': pages
    }, function () {
      dispatch(loadPages(pages || {}));
    });
  };
};

exports.chromeStorageSet = chromeStorageSet;