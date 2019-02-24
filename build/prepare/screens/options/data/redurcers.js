"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _actions = require("./actions");

function defaultAction() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.DEFAULT_ACTION:
      return action.test;

    default:
      return state;
  }
}

var requestHandlerApp = (0, _redux.combineReducers)({
  defaultAction: defaultAction
});
var _default = requestHandlerApp;
exports.default = _default;