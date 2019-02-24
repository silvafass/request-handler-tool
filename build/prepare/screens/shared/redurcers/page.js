"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var pages = function pages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_PAGE':
      if (state[action.page.path]) return (0, _objectSpread3.default)({}, state);
      return (0, _objectSpread3.default)({}, state, (0, _defineProperty2.default)({}, action.page.path, action.page));

    case 'LOAD_PAGES':
      return (0, _objectSpread3.default)({}, state);

    case 'REMOVE_PAGE':
      var newState = (0, _objectSpread3.default)({}, state);
      delete newState[action.pagePath];
      return newState;

    default:
      return state;
  }
};

var _default = pages;
exports.default = _default;