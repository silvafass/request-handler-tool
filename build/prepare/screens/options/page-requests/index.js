"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var PageRequests =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PageRequests, _React$Component);

  function PageRequests(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PageRequests);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PageRequests).call(this, props));
    var pagePath = decodeURIComponent(props.match.params.pagePath);
    _this.state = {
      pagePath: pagePath
    };

    _this.props.chromeStorageGet(pagePath);

    return _this;
  }

  (0, _createClass2.default)(PageRequests, [{
    key: "getRequestMatchings",
    value: function getRequestMatchings() {
      var requestMatchings = this.props.pages[this.state.pagePath].requestMatchings;
      if (!requestMatchings) return [];
      return Object.keys(requestMatchings).map(function (path) {
        return (0, _objectSpread5.default)({}, requestMatchings[path], {
          requestMatching: path
        });
      });
    }
  }, {
    key: "handleChangeInput",
    value: function handleChangeInput(event) {
      this.setState((0, _defineProperty2.default)({}, event.target.name, event.target.value));
    }
  }, {
    key: "handleAddRequestMatching",
    value: function handleAddRequestMatching() {
      if (!this.state.requestMatching || !this.checkFormValidity('#request-matching-form')) {
        return;
      }

      var pages = this.props.pages,
          page = pages[this.state.pagePath],
          requestMatchings = page.requestMatchings || {},
          requestMatching = requestMatchings[this.state.requestMatching];
      this.props.chromeStorageSet((0, _objectSpread5.default)({}, pages, (0, _defineProperty2.default)({}, this.state.pagePath, (0, _objectSpread5.default)({}, page, {
        path: this.state.pagePath,
        requestMatchings: (0, _objectSpread5.default)({}, requestMatchings, (0, _defineProperty2.default)({}, this.state.requestMatching, (0, _objectSpread5.default)({}, requestMatching)))
      }))));
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
    key: "handleRemoveRequestMatching",
    value: function handleRemoveRequestMatching(requestMatching) {
      var pages = this.props.pages,
          page = pages[this.state.pagePath],
          requestMatchings = page.requestMatchings;
      delete requestMatchings[requestMatching];
      this.props.chromeStorageSet((0, _objectSpread5.default)({}, pages, (0, _defineProperty2.default)({}, this.state.pagePath, (0, _objectSpread5.default)({}, page, {
        requestMatchings: (0, _objectSpread5.default)({}, requestMatchings)
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var pages = this.props.pages,
          pagePath = this.state.pagePath,
          page = pages[pagePath],
          requestMatchings = this.getRequestMatchings();
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement("h1", null, "Page Requests: ", page.path), _react.default.createElement("hr", null))), _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement(_Form.default, {
        id: "request-matching-form",
        inline: true
      }, _react.default.createElement(_Form.default.Group, {
        as: _Col.default
      }, _react.default.createElement(_Form.default.Label, null, "Request Matching"), _react.default.createElement(_Form.default.Control, {
        type: "text",
        name: "requestMatching",
        id: "requestMatching",
        placeholder: "http://request.com",
        onChange: this.handleChangeInput.bind(this)
      }), _react.default.createElement(_Button.default, {
        onClick: this.handleAddRequestMatching.bind(this)
      }, "Add"))), _react.default.createElement("br", null))), _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement(_Table.default, {
        bordered: true,
        hover: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Request Matching"), _react.default.createElement("th", null, "Remove"))), _react.default.createElement("tbody", null, requestMatchings && requestMatchings.map(function (requestMatching) {
        return _react.default.createElement("tr", {
          key: Math.random()
        }, _react.default.createElement("td", null, _react.default.createElement(_reactRouterDom.Link, {
          to: "/request-matching-detail/" + encodeURIComponent(pagePath) + "/" + encodeURIComponent(requestMatching.requestMatching)
        }, requestMatching.requestMatching)), _react.default.createElement("td", null, _react.default.createElement(_Button.default, {
          onClick: function onClick() {
            return _this2.handleRemoveRequestMatching(requestMatching.requestMatching);
          }
        }, "Remove")));
      }))))));
    }
  }]);
  return PageRequests;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PageRequests);

exports.default = _default;