'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navigation = require('./navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _rounded_toggle = require('./rounded_toggle');

var _rounded_toggle2 = _interopRequireDefault(_rounded_toggle);

var _githubSlugger = require('github-slugger');

var _githubSlugger2 = _interopRequireDefault(_githubSlugger);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _custom = require('../custom');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var slugger = new _githubSlugger2.default();
var slug = function slug(title) {
  slugger.reset();return slugger.slug(title);
};

var languageOptions = [{ title: 'JavaScript',
  short: 'JS',
  value: 'javascript' }];

var defaultLanguage = languageOptions[0];

var debouncedReplaceState = (0, _lodash2.default)(function (hash) {
  window.history.replaceState('', '', hash);
}, 100);

var App = function (_React$PureComponent) {
  _inherits(App, _React$PureComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.toggleNav = function () {
      _this.setState({ showNav: !_this.state.showNav });
    };

    _this.onScrollImmediate = function () {
      var sections = document.querySelectorAll('div.section');
      if (!sections.length) return;
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.bottom > 0) {
          _this.setState({
            activeSection: sections[i].getAttribute('data-title')
          });
          return;
        }
      }
    };

    _this.mediaQueryChanged = function () {
      _this.setState({
        queryMatches: _this.state.mqls.reduce(function (memo, q) {
          memo[q.name] = q.query.matches;
          return memo;
        }, {})
      });
    };

    _this.onChangeLanguage = function (language) {
      _this.setState({ language: language }, function () {
        if (window.history) {
          window.history.pushState(null, null, '?' + _querystring2.default.stringify({ language: language.title }) + window.location.hash);
        }
      });
    };

    _this.navigationItemClicked = function (activeSection) {
      setTimeout(function () {
        _this.setState({ activeSection: activeSection });
      }, 10);
      if (!_this.state.queryMatches.desktop) {
        _this.toggleNav();
      }
    };

    _this.toggleColumnMode = function () {
      _this.setState({
        columnMode: _this.state.columnMode === 1 ? 2 : 1
      });
    };

    var active = 'Introduction';

    if (process.browser) {
      var hash = window.location.hash.split('#').pop();
      var languageFromURL = _querystring2.default.parse(window.location.search.substring(1)).language;
      var language = languageOptions.find(function (option) {
        return option.title === languageFromURL;
      }) || defaultLanguage;
      var mqls = [{ name: 'widescreen', query: window.matchMedia('(min-width: 1200px)') }, { name: 'desktop', query: window.matchMedia('(min-width: 961px)') }, { name: 'tablet', query: window.matchMedia('(max-width: 960px)') }, { name: 'mobile', query: window.matchMedia('(max-width: 640px)') }];
      mqls.forEach(function (q) {
        return q.query.addListener(_this.mediaQueryChanged);
      });
      if (hash) {
        var headingForHash = _this.props.ast.children.filter(function (child) {
          return child.type === 'heading';
        }).find(function (heading) {
          return heading.data.id === hash;
        });
        if (headingForHash) {
          active = headingForHash.children[0].value;
        }
      }
      _this.state = {
        // media queryMatches
        mqls: mqls,
        // object of currently matched queries, like { desktop: true }
        queryMatches: {},
        language: language,
        columnMode: 2,
        activeSection: active,
        // for the toggle-able navigation on mobile
        showNav: false
      };
    } else {
      _this.state = {
        mqls: {},
        queryMatches: {
          desktop: true
        },
        language: defaultLanguage,
        activeSection: '',
        showNav: false
      };
    }
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mediaQueryChanged();
      this.onScroll = (0, _lodash2.default)(this.onScrollImmediate, 100);
      document.addEventListener('scroll', this.onScroll);
      this.onScrollImmediate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      this.state.mqls.forEach(function (q) {
        return q.removeListener(_this2.mediaQueryChanged);
      });
      document.body.removeEventListener('scroll', this.onScroll);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_, prevState) {
      if (prevState.activeSection !== this.state.activeSection) {
        // when the section changes, replace the hash
        debouncedReplaceState('#' + slug(this.state.activeSection));
      } else if (prevState.language.title !== this.state.language.title || prevState.columnMode !== this.state.columnMode) {
        // when the language changes, use the hash to set scroll
        window.location.hash = window.location.hash;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var ast = JSON.parse(JSON.stringify(this.props.ast));
      var _state = this.state,
          activeSection = _state.activeSection,
          queryMatches = _state.queryMatches,
          showNav = _state.showNav,
          columnMode = _state.columnMode;

      var col1 = columnMode === 1 && queryMatches.desktop;
      return _react2.default.createElement(
        'div',
        { className: 'container unlimiter' },
        !col1 && !queryMatches.mobile && _react2.default.createElement(
          'div',
          { className: 'fixed-top fixed-right ' + (queryMatches.desktop && 'space-left16') },
          _react2.default.createElement('div', { className: 'fill-light col6 pin-right' })
        ),
        queryMatches.desktop && _react2.default.createElement(
          'div',
          { className: 'space-top5 scroll-styled overflow-auto pad1 width16 sidebar fixed-left fill-dark dark' },
          _react2.default.createElement(_navigation2.default, {
            navigationItemClicked: this.navigationItemClicked,
            activeSection: activeSection,
            ast: ast })
        ),
        _react2.default.createElement(
          'div',
          { className: '' + (queryMatches.desktop && 'space-left16') },
          _react2.default.createElement(
            'div',
            { className: col1 ? 'col8 margin1' : '' },
            _react2.default.createElement(_content2.default, {
              leftClassname: col1 ? 'space-bottom4 pad2x prose clip' : 'space-bottom8 col6 pad2x prose clip',
              rightClassname: col1 ? 'space-bottom2 pad2 prose clip fill-light space-top5' : 'space-bottom4 col6 pad2 prose clip fill-light space-top5',
              ast: ast,
              language: this.state.language })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fixed-top ' + (queryMatches.desktop && 'space-left16') },
          _react2.default.createElement(
            'div',
            { className: 'events fill-light bottom-shadow pad1 ' + (col1 ? '' : 'col6 pin-topright') + ' ' + (queryMatches.tablet ? 'dark fill-blue' : '') + ' ' + (queryMatches.mobile ? 'space-top5 fixed-topright' : '') },
            _react2.default.createElement(
              'div',
              { className: 'space-right1 small quiet inline' },
              'Code Snippets and Examples'
            ),
            _react2.default.createElement(
              'div',
              { className: 'fr pad0' },
              queryMatches.desktop ? _react2.default.createElement('a', {
                title: 'Display as ' + (col1 ? 2 : 1) + ' column',
                onClick: this.toggleColumnMode,
                style: { cursor: 'pointer' },
                className: 'icon quiet caret-' + (col1 ? 'right' : 'left') + ' pad0 fill-darken0 round' }) : null
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'fill-dark dark bottom-shadow fixed-top ' + (queryMatches.tablet ? 'pad1y pad2x col6' : 'pad0 width16') },
          _react2.default.createElement('a', { href: '/', className: 'active space-top1 space-left1 pin-topleft icon round dark pad0 ' + _custom.brandClasses }),
          _react2.default.createElement(
            'div',
            { className: 'strong small pad0\n          ' + (queryMatches.mobile ? 'space-left3' : '') + '\n          ' + (queryMatches.tablet ? 'space-left2' : 'space-left4 line-height15') },
            queryMatches.desktop ? _custom.brandNames.desktop : queryMatches.mobile ? _custom.brandNames.mobile : _custom.brandNames.tablet
          ),
          queryMatches.tablet && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              {
                onClick: this.toggleNav,
                className: 'short quiet pin-topright button rcon ' + (showNav ? 'caret-up' : 'caret-down') + ' space-right1 space-top1' },
              _react2.default.createElement(
                'span',
                { className: 'micro' },
                activeSection
              )
            ),
            showNav && _react2.default.createElement(
              'div',
              {
                className: 'fixed-left keyline-top fill-dark pin-left col6 pad2 scroll-styled space-top5' },
              _react2.default.createElement(_navigation2.default, {
                navigationItemClicked: this.navigationItemClicked,
                activeSection: activeSection,
                ast: ast })
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.PureComponent);

App.propTypes = {
  content: _propTypes2.default.string.isRequired,
  ast: _propTypes2.default.object.isRequired
};
exports.default = App;