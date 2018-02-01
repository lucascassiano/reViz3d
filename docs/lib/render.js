'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _remarkSlug = require('remark-slug');

var _remarkSlug2 = _interopRequireDefault(_remarkSlug);

var _content = require('./custom/content');

var _content2 = _interopRequireDefault(_content);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ast = (0, _remark2.default)().use(_remarkSlug2.default).runSync((0, _remark2.default)().parse(_content2.default));

var template = _fs2.default.readFileSync('./index.html', 'utf8');

var target = process.argv[2];

var startDiv = '<div id=\'app\'>';
var stopDiv = '</div>';
var startMarker = '<!--START-->' + startDiv;
var stopMarker = stopDiv + '<!--STOP-->';
var startIdx = template.indexOf(startMarker) + startMarker.length;
var stopIdx = template.indexOf(stopMarker);

_fs2.default.writeFileSync(target, template.substring(0, startIdx) + _server2.default.renderToString(_react2.default.createElement(_app2.default, { ast: ast, content: _content2.default })) + template.substring(stopIdx));