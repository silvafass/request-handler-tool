"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

var _actions = require("actions");

var Options =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Options, _React$Component);

  function Options(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Options);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Options).call(this, props));

    _this.props.loadPages();

    return _this;
  }

  (0, _createClass2.default)(Options, [{
    key: "getPages",
    value: function getPages() {
      var _this2 = this;

      return Object.keys(this.props.pages).map(function (path) {
        return _this2.props.pages[path];
      });
    }
  }, {
    key: "handleChangeInput",
    value: function handleChangeInput(event) {
      this.setState((0, _defineProperty2.default)({}, event.target.name, event.target.value));
    }
  }, {
    key: "handleAddPage",
    value: function handleAddPage() {
      if (!this.state.pagePath || !this.checkFormValidity('#page-form')) {
        return;
      }

      this.props.addPage(this.state.pagePath);
    }
  }, {
    key: "checkFormValidity",
    value: function checkFormValidity(selector) {
      var form = document.querySelector(selector);

      if (form.checkValidity()) {
        return true;
      } else {
        form.reportValidity();
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var handleAddPage = this.handleAddPage,
          handleChangeInput = this.handleChangeInput;
      var pages = this.getPages();
      return _react.default.createElement(_reactstrap.Container, null, _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement("h1", null, "Request Handler Tool"), _react.default.createElement("hr", null))), _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Form, {
        id: "page-form",
        inline: true
      }, _react.default.createElement(_reactstrap.FormGroup, {
        className: "mb-2 mr-sm-2 mb-sm-0"
      }, _react.default.createElement(_reactstrap.Label, {
        for: "pagePath",
        className: "mr-sm-2"
      }, "Page Path"), _react.default.createElement(_reactstrap.Input, {
        type: "url",
        name: "pagePath",
        id: "pagePath",
        placeholder: "http://site.com",
        onChange: this.handleChangeInput.bind(this)
      })), _react.default.createElement(_reactstrap.Button, {
        onClick: this.handleAddPage.bind(this)
      }, "Add")), _react.default.createElement("br", null))), _react.default.createElement(_reactstrap.Row, null, _react.default.createElement(_reactstrap.Col, null, _react.default.createElement(_reactstrap.Table, {
        dark: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Page"))), _react.default.createElement("tbody", null, pages && pages.map(function (page) {
        return _react.default.createElement("tr", {
          key: Math.random()
        }, _react.default.createElement("td", null, _react.default.createElement(_reactRouterDom.Link, {
          to: "/page-requests"
        }, page.path)));
      }))))));
    }
  }]);
  return Options;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    pages: state.pages
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    addPage: function addPage(pagePath) {
      return dispatch((0, _actions.addPage)(pagePath));
    },
    loadPages: function loadPages(pagePath) {
      return dispatch((0, _actions.loadPages)());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Options);

exports.default = _default;