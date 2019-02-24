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

var _Container = _interopRequireDefault(require("react-bootstrap/Container"));

var _Row = _interopRequireDefault(require("react-bootstrap/Row"));

var _Col = _interopRequireDefault(require("react-bootstrap/Col"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _Table = _interopRequireDefault(require("react-bootstrap/Table"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _actions = require("actions");

var RequestMatchingDetail =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RequestMatchingDetail, _React$Component);

  function RequestMatchingDetail(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RequestMatchingDetail);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RequestMatchingDetail).call(this, props));
    var pagePath = decodeURIComponent(props.match.params.pagePath),
        requestMatching = decodeURIComponent(props.match.params.requestMatching);
    _this.state = {
      pagePath: pagePath,
      requestMatching: requestMatching
    };

    _this.props.chromeStorageGet(pagePath);

    return _this;
  }

  (0, _createClass2.default)(RequestMatchingDetail, [{
    key: "handleChangeInput",
    value: function handleChangeInput(event) {
      this.setState((0, _defineProperty2.default)({}, event.target.name, event.target.value));
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
      var pages = this.props.pages,
          _this$state = this.state,
          pagePath = _this$state.pagePath,
          requestMatching = _this$state.requestMatching,
          page = pages[pagePath],
          requestMatchingDetail = page.requestMatchings[requestMatching];
      console.log(1, '###################################', requestMatchingDetail);
      return _react.default.createElement(_Container.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_Col.default, null, _react.default.createElement("h1", null, "Request Matching detail: ", requestMatching), _react.default.createElement("hr", null))));
    }
  }]);
  return RequestMatchingDetail;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RequestMatchingDetail);

exports.default = _default;