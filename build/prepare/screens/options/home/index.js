"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Container = _interopRequireDefault(require("react-bootstrap/Container"));

var _Row = _interopRequireDefault(require("react-bootstrap/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/Col"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _Table = _interopRequireDefault(require("react-bootstrap/Table"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _actions = require("actions");

var Options =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Options, _React$Component);

  function Options(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Options);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Options).call(this, props));
    _this.state = {};

    _this.props.chromeStorageGet();

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

      this.props.chromeStorageSet((0, _objectSpread3.default)({}, this.props.pages, (0, _defineProperty2.default)({}, this.state.pagePath, {
        path: this.state.pagePath
      })));
    }
  }, {
    key: "handleRemovePage",
    value: function handleRemovePage(pagePath) {
      var pages = (0, _objectSpread3.default)({}, this.props.pages);
      delete pages[pagePath];
      this.props.chromeStorageSet(pages);
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
      var _this3 = this;

      var handleAddPage = this.handleAddPage,
          handleChangeInput = this.handleChangeInput,
          pages = this.getPages();
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement("h1", null, "Request Handler Tool"), _react.default.createElement("hr", null))), _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement(_Form.default, {
        id: "page-form",
        inline: true
      }, _react.default.createElement(_Form.default.Group, {
        as: _Col.default
      }, _react.default.createElement(_Form.default.Label, null, "Page Path"), _react.default.createElement(_Form.default.Control, {
        type: "text",
        name: "pagePath",
        id: "pagePath",
        placeholder: "http://site.com",
        onChange: this.handleChangeInput.bind(this)
      }), _react.default.createElement(_Button.default, {
        onClick: this.handleAddPage.bind(this)
      }, "Add"))), _react.default.createElement("br", null))), _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement(_Table.default, {
        bordered: true,
        hover: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Page"), _react.default.createElement("th", null, "Remove"))), _react.default.createElement("tbody", null, pages && pages.map(function (page) {
        return _react.default.createElement("tr", {
          key: Math.random()
        }, _react.default.createElement("td", null, _react.default.createElement(_reactRouterDom.Link, {
          to: "/page-requests/" + encodeURIComponent(page.path)
        }, page.path)), _react.default.createElement("td", null, _react.default.createElement(_Button.default, {
          onClick: function onClick() {
            return _this3.handleRemovePage(page.path);
          }
        }, "Remove")));
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
    chromeStorageSet: function chromeStorageSet(pages) {
      return dispatch((0, _actions.chromeStorageSet)(pages));
    },
    chromeStorageGet: function chromeStorageGet() {
      return dispatch((0, _actions.chromeStorageGet)());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Options);

exports.default = _default;