'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _remarkSlug = require('remark-slug');

var _remarkSlug2 = _interopRequireDefault(_remarkSlug);

var _content = require('./custom/content');

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ast = (0, _remark2.default)().use(_remarkSlug2.default).runSync((0, _remark2.default)().parse(_content2.default));

_reactDom2.default.render(_react2.default.createElement(_app2.default, { ast: ast, content: _content2.default }), document.getElementById('app'));