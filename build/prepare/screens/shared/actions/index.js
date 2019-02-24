"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPages = exports.addPage = void 0;

var addPage = function addPage(pagePath) {
  return {
    type: 'ADD_PAGE',
    page: {
      path: pagePath,
      requests: []
    }
  };
};

exports.addPage = addPage;

var loadPages = function loadPages() {
  return {
    type: 'LOAD_PAGES'
  };
};

exports.loadPages = loadPages;