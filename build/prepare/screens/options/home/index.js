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

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

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
      return _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement("h1", null, "Request Handler Tool"), _react.default.createElement("hr", null))), _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
        inline: true
      }, _react.default.createElement(_reactstrap.FormGroup, {
        className: "mb-2 mr-sm-2 mb-sm-0"
      }, _react.default.createElement(_reactstrap.Label, {
        for: "page",
        className: "mr-sm-2"
      }, "Page"), _react.default.createElement(_reactstrap.Input, {
        type: "url",
        name: "page",
        id: "page",
        placeholder: "http://site1.com"
      })), _react.default.createElement(_reactstrap.Button, null, "Add")), _react.default.createElement("br", null))), _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Table, {
        dark: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Page"))), _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", null, _react.default.createElement(_reactRouterDom.Link, {
        to: "/page-requests"
      }, 'http://site1.com'))))))));
    }
  }]);
  return Options;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    test: state.defaultAction
  };
}, function (dispatch, ownProps) {
  return {};
})(Options);

exports.default = _default;