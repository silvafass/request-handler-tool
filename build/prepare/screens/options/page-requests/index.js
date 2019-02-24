"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _Container = _interopRequireDefault(require("react-bootstrap/Container"));

var _Row = _interopRequireDefault(require("react-bootstrap/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/Col"));

var PageRequests =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PageRequests, _React$Component);

  function PageRequests(props) {
    (0, _classCallCheck2.default)(this, PageRequests);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PageRequests).call(this, props));
  }

  (0, _createClass2.default)(PageRequests, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement("h1", null, "Page Requests"), _react.default.createElement("hr", null))));
    }
  }]);
  return PageRequests;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    test: state.defaultAction
  };
}, function (dispatch, ownProps) {
  return {};
})(PageRequests);

exports.default = _default;