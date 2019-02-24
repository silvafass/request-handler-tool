"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _index = _interopRequireDefault(require("./home/index"));

var _index2 = _interopRequireDefault(require("./page-requests/index"));

require("bootstrap/dist/css/bootstrap.min.css");

var _redurcers = _interopRequireDefault(require("redurcers"));

var _redux = require("redux");

var store = (0, _redux.createStore)(_redurcers.default);
window._store = store;

var Options =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Options, _React$Component);

  function Options(props) {
    (0, _classCallCheck2.default)(this, Options);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Options).call(this, props));
  }

  (0, _createClass2.default)(Options, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactRedux.Provider, {
        store: store
      }, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/options.html",
        component: _index.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/page-requests",
        component: _index2.default
      }))));
    }
  }]);
  return Options;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(Options, null), document.getElementById('root'));