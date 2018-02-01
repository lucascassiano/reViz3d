'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _section = require('./section');

var _section2 = _interopRequireDefault(_section);

var _githubSlugger = require('github-slugger');

var _githubSlugger2 = _interopRequireDefault(_githubSlugger);

var _custom = require('../custom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var slugger = new _githubSlugger2.default();
var slug = function slug(title) {
  slugger.reset();return slugger.slug(title);
};

var roundedToggleOptionType = _propTypes2.default.shape({
  title: _propTypes2.default.string,
  value: _propTypes2.default.string
});

function chunkifyAST(ast, language) {
  var preview = false;
  return ast.children.reduce(function (chunks, node) {
    if (node.type === 'heading' && node.depth === 1) {
      return chunks;
    } else if (node.type === 'heading' && node.depth < 4) {
      chunks.push([node]);
    } else {
      chunks[chunks.length - 1].push(node);
    }
    return chunks;
  }, [[]]).filter(function (chunk) {
    return chunk.length;
  }).map(function (chunk) {
    var left = [],
        right = [],
        title;
    if (language === 'cli') {
      language = 'bash';
    }
    if (chunk[0].depth < 3) {
      preview = false;
    }
    chunk.forEach(function (node) {
      if (node.type === 'code') {
        if (node.lang === 'json' || node.lang === 'http' || node.lang === 'html') {
          right.push(node);
        } else if (node.lang === language) {
          if (language === 'curl') {
            right.push(_extends({}, node, { lang: 'bash' }));
          } else {
            right.push(node);
          }
        } else if (node.lang === 'endpoint') {
          right.push((0, _custom.transformURL)(node.value));
        } else if (node.lang === null) {
          left.push(node);
        }
      } else if (node.type === 'heading' && node.depth >= 4) {
        right.push(node);
      } else if (node.type === 'blockquote') {
        right.push(node);
      } else if (node.type === 'heading' && node.depth < 4 && !title) {
        title = node.children[0].value;
        left.push(node);
      } else if (node.type === 'html' && node.value.match(/^<!--\s*preview\s*-->$/)) {
        preview = true;
      } else {
        left.push(node);
      }
    });
    return { left: left, right: right, title: title, preview: preview, slug: slug(title) };
  });
}

var Content = function (_React$PureComponent) {
  _inherits(Content, _React$PureComponent);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ast = _props.ast,
          language = _props.language,
          leftClassname = _props.leftClassname,
          rightClassname = _props.rightClassname;

      return _react2.default.createElement(
        'div',
        { className: 'clearfix' },
        chunkifyAST(ast, language.value).map(function (chunk, i) {
          return _react2.default.createElement(_section2.default, {
            leftClassname: leftClassname,
            rightClassname: rightClassname,
            chunk: chunk,
            key: i });
        })
      );
    }
  }]);

  return Content;
}(_react2.default.PureComponent);

Content.propTypes = {
  ast: _propTypes2.default.object.isRequired,
  language: roundedToggleOptionType,
  leftClassname: _propTypes2.default.string.isRequired,
  rightClassname: _propTypes2.default.string.isRequired
};
exports.default = Content;