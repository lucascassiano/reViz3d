'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _navigation_item = require('./navigation_item');

var _navigation_item2 = _interopRequireDefault(_navigation_item);

var _custom = require('../custom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getAllInSectionFromChild(headings, idx) {
  for (var i = idx; i > 0; i--) {
    if (headings[i].depth === 2) {
      return getAllInSection(headings, i);
    }
  }
}

function getAllInSection(headings, idx) {
  var activeHeadings = [];
  for (var i = idx + 1; i < headings.length; i++) {
    if (headings[i].depth === 3) {
      activeHeadings.push(headings[i].children[0].value);
    } else if (headings[i].depth === 2) {
      break;
    }
  }
  return activeHeadings;
}

var Navigation = function (_React$PureComponent) {
  _inherits(Navigation, _React$PureComponent);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var activeHeadings = [];
      var headings = this.props.ast.children.filter(function (child) {
        return child.type === 'heading';
      });

      if (this.props.activeSection) {

        var activeHeadingIdx = headings.findIndex(function (heading) {
          return heading.children[0].value === _this2.props.activeSection;
        });
        var activeHeading = headings[activeHeadingIdx];

        if (activeHeading.depth === 3) {
          activeHeadings = [this.props.activeSection].concat(getAllInSectionFromChild(headings, activeHeadingIdx));
        }

        // this could potentially have children, try to find them
        if (activeHeading.depth === 2) {
          activeHeadings = [this.props.activeSection].concat(getAllInSection(headings, activeHeadingIdx));
        }
      }

      activeHeadings = activeHeadings.reduce(function (memo, heading) {
        memo[heading] = true;
        return memo;
      }, {});

      return _react2.default.createElement(
        'div',
        { className: 'pad0x small' },
        headings.map(function (child, i) {
          var sectionName = child.children[0].value;
          var active = sectionName === _this2.props.activeSection;
          if (child.depth === 1) {
            return _react2.default.createElement(
              'div',
              { key: i,
                onClick: _this2.navigationItemClicked,
                className: 'small pad0x quiet space-top1' },
              sectionName
            );
          } else if (child.depth === 2) {
            return _react2.default.createElement(_navigation_item2.default, {
              key: i,
              href: '#' + child.data.id,
              onClick: _this2.props.navigationItemClicked,
              active: active,
              sectionName: sectionName });
          } else if (child.depth === 3) {
            if (activeHeadings.hasOwnProperty(sectionName)) {
              return _react2.default.createElement(
                'div',
                {
                  key: i,
                  className: 'space-left1' },
                _react2.default.createElement(_navigation_item2.default, {
                  href: '#' + child.data.id,
                  onClick: _this2.props.navigationItemClicked,
                  active: active,
                  sectionName: sectionName })
              );
            }
          }
        }),
        _custom.footerContent
      );
    }
  }]);

  return Navigation;
}(_react2.default.PureComponent);

Navigation.propTypes = {
  ast: _propTypes2.default.object.isRequired,
  activeSection: _propTypes2.default.string,
  navigationItemClicked: _propTypes2.default.func.isRequired
};
exports.default = Navigation;