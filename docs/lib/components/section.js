'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _remarkHtml = require('remark-html');

var _remarkHtml2 = _interopRequireDefault(_remarkHtml);

var _highlight = require('../highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _custom = require('../custom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderHighlighted(nodes) {
  return {
    __html: (0, _custom.postHighlight)((0, _remark2.default)().use(_remarkHtml2.default).stringify((0, _remark2.default)().use(_highlight2.default).use(_custom.remarkPlugins).runSync({
      type: 'root',
      children: nodes
    })))
  };
}

var Section = function (_React$PureComponent) {
  _inherits(Section, _React$PureComponent);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
  }

  _createClass(Section, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          chunk = _props.chunk,
          leftClassname = _props.leftClassname,
          rightClassname = _props.rightClassname;
      var left = chunk.left,
          right = chunk.right,
          preview = chunk.preview;

      return _react2.default.createElement(
        'div',
        {
          'data-title': chunk.title,
          className: 'keyline-top section contain clearfix ' + (preview ? 'preview' : '') },
        _react2.default.createElement('div', {
          className: leftClassname,
          dangerouslySetInnerHTML: renderHighlighted(left) }),
        right.length > 0 && _react2.default.createElement('div', {
          className: rightClassname,
          dangerouslySetInnerHTML: renderHighlighted(right) })
      );
    }
  }]);

  return Section;
}(_react2.default.PureComponent);

Section.propTypes = {
  chunk: _propTypes2.default.object.isRequired,
  leftClassname: _propTypes2.default.string.isRequired,
  rightClassname: _propTypes2.default.string.isRequired
};
exports.default = Section;