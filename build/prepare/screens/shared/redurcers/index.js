"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _page = _interopRequireDefault(require("./page"));

var _default = (0, _redux.combineReducers)({
  pages: _page.default
});

exports.default = _default;