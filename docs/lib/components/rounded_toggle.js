'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var roundedToggleOptionType = _propTypes2.default.shape({
  title: _propTypes2.default.string,
  value: _propTypes2.default.string
});

var RoundedToggle = function (_React$PureComponent) {
  _inherits(RoundedToggle, _React$PureComponent);

  function RoundedToggle() {
    _classCallCheck(this, RoundedToggle);

    return _possibleConstructorReturn(this, (RoundedToggle.__proto__ || Object.getPrototypeOf(RoundedToggle)).apply(this, arguments));
  }

  _createClass(RoundedToggle, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          active = _props.active;

      return _react2.default.createElement(
        'div',
        { className: 'rounded-toggle inline short' },
        options.map(function (option) {
          return _react2.default.createElement(RoundedToggleOption, {
            key: option.value,
            option: option,
            short: _this2.props.short,
            onClick: _this2.props.onChange,
            className: 'strong ' + (option.value === active.value ? 'active' : '') });
        })
      );
    }
  }]);

  return RoundedToggle;
}(_react2.default.PureComponent);

RoundedToggle.propTypes = {
  options: _propTypes2.default.arrayOf(roundedToggleOptionType).isRequired,
  active: roundedToggleOptionType,
  short: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = RoundedToggle;

var RoundedToggleOption = function (_React$PureComponent2) {
  _inherits(RoundedToggleOption, _React$PureComponent2);

  function RoundedToggleOption() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, RoundedToggleOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = RoundedToggleOption.__proto__ || Object.getPrototypeOf(RoundedToggleOption)).call.apply(_ref, [this].concat(args))), _this3), _this3.onClick = function () {
      _this3.props.onClick(_this3.props.option);
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(RoundedToggleOption, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          option = _props2.option;

      return _react2.default.createElement(
        'a',
        {
          onClick: this.onClick,
          className: className },
        this.props.short ? option.short : option.title
      );
    }
  }]);

  return RoundedToggleOption;
}(_react2.default.PureComponent);

RoundedToggleOption.propTypes = {
  option: roundedToggleOptionType,
  className: _propTypes2.default.string.isRequired,
  short: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired
};