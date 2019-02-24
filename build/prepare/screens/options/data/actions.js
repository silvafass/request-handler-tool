"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAction = defaultAction;
exports.DEFAULT_ACTION = void 0;
var DEFAULT_ACTION = 'DEFAULT_ACTION';
exports.DEFAULT_ACTION = DEFAULT_ACTION;

function defaultAction() {
  return {
    type: DEFAULT_ACTION,
    test: 'tested...'
  };
}