"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _redurcers = _interopRequireDefault(require("./redurcers"));

var store = (0, _redux.createStore)(_redurcers.default);
var _default = store;
exports.default = _default;