process.env.HMR_PORT=55355;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"icons/logo.svg":[function(require,module,exports) {
"use strict";

module.exports = "logo.8a6421da.svg";
},{}],"icons/github.svg":[function(require,module,exports) {
"use strict";

module.exports = "github.203858d6.svg";
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"app.css":[function(require,module,exports) {
'use strict';

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"store/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateSelectedObject = exports.updateScene = exports.toggleMenu = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

/* ------------

--------------- */

var defaultState = {
    menuIsOpen: true,
    project: {
        name: null,
        path: null
    },
    environment: {
        selectedObject: null,
        scene: null
    }
};

var rootStore = function rootStore() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case 'TOGGLE_MENU':
            var menuIsOpen = !state.menuIsOpen;
            return (0, _assign2.default)({}, state, { menuIsOpen: menuIsOpen });

        case 'UPDATE_SCENE':
            var environment = (0, _assign2.default)({}, state.environment, { scene: action.scene });
            return (0, _assign2.default)({}, state, { environment: environment });

        case 'UPDATE_SELECTED_OBJECT':
            var environment = (0, _assign2.default)({}, state.environment, { selectedObject: action.object });
            return (0, _assign2.default)({}, state, { environment: environment });
        default:
            return state;
    }
};

var store = (0, _redux.createStore)(rootStore);

/*actions*/
var toggleMenu = exports.toggleMenu = function toggleMenu() {
    store.dispatch({ type: 'TOGGLE_MENU' });
};

var updateScene = exports.updateScene = function updateScene(scene) {
    store.dispatch({ type: 'UPDATE_SCENE', scene: scene });
};

var updateSelectedObject = exports.updateSelectedObject = function updateSelectedObject(object) {
    store.dispatch({ type: 'UPDATE_SELECTED_OBJECT', object: object });
};
//export the store at the end
var _default = store;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(defaultState, 'defaultState', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(rootStore, 'rootStore', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(store, 'store', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(toggleMenu, 'toggleMenu', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(updateScene, 'updateScene', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(updateSelectedObject, 'updateSelectedObject', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    reactHotLoader.register(_default, 'default', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/store/index.js');
    leaveModule(module);
})();

;
},{}],"components/Menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@blueprintjs/core");

var _store = require("../store");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var ObjectsMenu = function (_Component) {
    (0, _inherits3.default)(ObjectsMenu, _Component);

    function ObjectsMenu() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ObjectsMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ObjectsMenu.__proto__ || (0, _getPrototypeOf2.default)(ObjectsMenu)).call.apply(_ref, [this].concat(args))), _this), _this.xChange = function (value) {
            var object = _this.props.object;

            object.position.x = value;
        }, _this.yChange = function (value) {
            var object = _this.props.object;

            object.position.y = value;
        }, _this.zChange = function (value) {
            var object = _this.props.object;

            object.position.z = value;
        }, _this.rxChange = function (value) {
            var object = _this.props.object;

            object.rotation.x = value;
        }, _this.ryChange = function (value) {
            var object = _this.props.object;

            object.rotation.y = value;
        }, _this.rzChange = function (value) {
            var object = _this.props.object;

            object.rotation.z = value;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ObjectsMenu, [{
        key: "render",
        value: function render() {
            var object = this.props.object;


            var name = object ? object.name : null;
            var position = object ? object.position : { x: 0, y: 0, z: 0 };
            var rotation = object ? object.rotation : { x: 0, y: 0, z: 0 };

            return _react2.default.createElement(
                "div",
                { className: "menu-object", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 46
                    },
                    __self: this
                },
                _react2.default.createElement(
                    "h2",
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 47
                        },
                        __self: this
                    },
                    name
                ),
                "position",
                _react2.default.createElement(
                    "div",
                    { className: "menu-position", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 49
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 51
                            },
                            __self: this
                        },
                        "x",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: position ? position.x : 0, onValueChange: this.xChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 53
                            },
                            __self: this
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 55
                            },
                            __self: this
                        },
                        "y",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: position ? position.y : 0, onValueChange: this.yChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 57
                            },
                            __self: this
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 59
                            },
                            __self: this
                        },
                        "z",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: position ? position.z : 0, onValueChange: this.zChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 61
                            },
                            __self: this
                        })
                    )
                ),
                "rotation",
                _react2.default.createElement(
                    "div",
                    { className: "menu-position", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 66
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 68
                            },
                            __self: this
                        },
                        "x",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: rotation ? rotation.x : 0, onValueChange: this.rxChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 70
                            },
                            __self: this
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 72
                            },
                            __self: this
                        },
                        "y",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: rotation ? rotation.y : 0, onValueChange: this.ryChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 74
                            },
                            __self: this
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "menu-position-cell", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 76
                            },
                            __self: this
                        },
                        "z",
                        _react2.default.createElement(_core.NumericInput, { fill: true, value: rotation ? rotation.z : 0, onValueChange: this.rzChange, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 78
                            },
                            __self: this
                        })
                    )
                )
            );
        }
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return ObjectsMenu;
}(_react.Component);

var Menu = function (_Component2) {
    (0, _inherits3.default)(Menu, _Component2);

    function Menu() {
        (0, _classCallCheck3.default)(this, Menu);
        return (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).apply(this, arguments));
    }

    (0, _createClass3.default)(Menu, [{
        key: "render",
        value: function render() {
            var menuClass = this.props.open ? "menu" : "menu-hidden";
            var environment = this.props.environment;

            console.log("env", environment);

            var selectedObject = "select a object...";
            if (environment.selectedObject) selectedObject = this.props.environment.selectedObject;

            return _react2.default.createElement(
                "div",
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 98
                    },
                    __self: this
                },
                _react2.default.createElement(_core.Icon, {
                    icon: "caret-right",
                    className: this.props.open ? "menu-caret-open" : "menu-caret-closed",
                    onClick: _store.toggleMenu,
                    iconSize: 20,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 99
                    },
                    __self: this
                }),
                _react2.default.createElement(
                    "div",
                    { className: menuClass, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 106
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        _core.Card,
                        { className: _core.Classes.DARK + " content", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 107
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            _core.Tabs,
                            { className: "tabs", __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 108
                                },
                                __self: this
                            },
                            _react2.default.createElement(_core.Tab, { id: "rx", title: "Objects", panel: _react2.default.createElement(ObjectsMenu, { object: selectedObject, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 109
                                    },
                                    __self: this
                                }), __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 109
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_core.Tab, { id: "ng", title: "Data", panel: _react2.default.createElement(
                                    "div",
                                    {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 110
                                        },
                                        __self: this
                                    },
                                    "Angular"
                                ), __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 110
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_core.Tab, { id: "mb", title: "Project", panel: _react2.default.createElement(
                                    "div",
                                    {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 111
                                        },
                                        __self: this
                                    },
                                    "hiiii"
                                ), __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 111
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_core.Tabs, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 112
                                },
                                __self: this
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return Menu;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        menu: state.menuIsOpen,
        environment: state.environment
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: function toggleMenu() {
            dispatch({ type: 'TOGGLE_MENU', open: null });
        }
    };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Menu);

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(ObjectsMenu, "ObjectsMenu", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js");
    reactHotLoader.register(Menu, "Menu", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js");
    reactHotLoader.register(mapStateToProps, "mapStateToProps", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js");
    reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js");
    reactHotLoader.register(_default, "default", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/components/Menu.js");
    leaveModule(module);
})();

;
},{"../store":"store/index.js"}],"App.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/App.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _logo = require('./icons/logo.svg');

var _logo2 = _interopRequireDefault(_logo);

var _github = require('./icons/github.svg');

var _github2 = _interopRequireDefault(_github);

var _electron = require('electron');

require('./app.css');

var _reactRedux = require('react-redux');

var _store = require('./store');

var _Menu = require('./components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);

    function App() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || (0, _getPrototypeOf2.default)(App)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
            (0, _store.toggleMenu)();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(App, [{
        key: 'render',
        value: function render() {
            console.log('props', this.props);
            return _react2.default.createElement(
                'div',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 24
                    },
                    __self: this
                },
                _react2.default.createElement(_Menu2.default, { open: this.props.menu, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 25
                    },
                    __self: this
                })
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return { menu: state.menuIsOpen };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: function toggleMenu() {
            dispatch({ type: 'TOGGLE_MENU', open: null });
        }
    };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(App, 'App', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/App.js');
    reactHotLoader.register(mapStateToProps, 'mapStateToProps', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/App.js');
    reactHotLoader.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/App.js');
    reactHotLoader.register(_default, 'default', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/App.js');
    leaveModule(module);
})();

;
},{"./icons/logo.svg":"icons/logo.svg","./icons/github.svg":"icons/github.svg","./app.css":"app.css","./store":"store/index.js","./components/Menu":"components/Menu.js"}],"index.css":[function(require,module,exports) {
'use strict';

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"viewer/sky.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var Sky = function () {
    function Sky() {
        (0, _classCallCheck3.default)(this, Sky);
    }

    (0, _createClass3.default)(Sky, [{
        key: "getObject",
        value: function getObject() {
            // SKYDOME
            var vertexShader = "\n        varying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\t\tvWorldPosition = worldPosition.xyz;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n            ";
            var fragmentShader = "\n        uniform vec3 topColor;\n\t\t\tuniform vec3 bottomColor;\n\t\t\tuniform float offset;\n\t\t\tuniform float exponent;\n\t\t\tvarying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tfloat h = normalize( vWorldPosition + offset ).y;\n\t\t\t\tgl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );\n            }\n            ";
            var uniforms = {
                topColor: { type: "c", value: new THREE.Color(0x606060) },
                bottomColor: { type: "c", value: new THREE.Color(0x212121) },
                offset: { type: "f", value: 400 },
                exponent: { type: "f", value: 1.0 }
            };

            var skyGeo = new THREE.SphereBufferGeometry(1000, 32, 15);

            var skyMat = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.BackSide
            });

            var sky = new THREE.Mesh(skyGeo, skyMat);
            return sky;
        }
    }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return Sky;
}();

var _default = Sky;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Sky, "Sky", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/sky.js");
    reactHotLoader.register(_default, "default", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/sky.js");
    leaveModule(module);
})();

;
},{}],"viewer/viewer.js":[function(require,module,exports) {
"use strict";

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _sky = require("./sky");

var _sky2 = _interopRequireDefault(_sky);

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var OrbitControls = require('three-orbit-controls')(THREE);

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 10, -30);
camera.lookAt(new THREE.Vector3());
var canvas = document.getElementById("3d-env");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.0);

var interactiveObjects = new THREE.Group();
scene.add(interactiveObjects);

var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var cube = new THREE.Mesh(geometry, material);
cube.name = "cube1";
interactiveObjects.add(cube);

var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshBasicMaterial({ color: 0x00ffFF });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 7.5;
cube.name = "cube2";
interactiveObjects.add(cube);

var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshBasicMaterial({ color: 0x00ffFF });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 15;
cube.name = "cube3";
interactiveObjects.add(cube);

//scene.add(cube);

var controls = new OrbitControls(camera);
var sky = new _sky2.default();

scene.add(sky.getObject(THREE));

var gridHelper = new THREE.GridHelper(100, 10, 0xaaaaaa, 0x666666);
scene.add(gridHelper);

//raycast
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var INTERSECTED;
var INTERSECTED_box;
var INTERSECTED_selected;

function onMouseMove(event) {
    mouse.x = event.clientX / renderer.domElement.clientWidth * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
}

function onMouseDown(event) {
    if (INTERSECTED && event.button == 2) {
        console.log(event);
        console.log(INTERSECTED.name);
    }
    if (INTERSECTED && event.button == 0) {
        (0, _store.updateSelectedObject)(INTERSECTED);
        console.log(_store2.default.getState().environment);
        console.log(INTERSECTED.name);

        INTERSECTED_selected = INTERSECTED;

        if (INTERSECTED_box) scene.remove(INTERSECTED_box);
        INTERSECTED_box = new THREE.BoxHelper(INTERSECTED, 0x55ddff);

        scene.add(INTERSECTED_box);
    }
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);

function animate() {
    requestAnimationFrame(animate);
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(interactiveObjects.children);

    // if there is one (or more) intersections
    if (intersects.length) {
        if (intersects[0].object != INTERSECTED) {
            INTERSECTED = intersects[0].object;
            if (INTERSECTED) {
                //INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                //INTERSECTED.material.color.setHex(0xffff00);
            } else INTERSECTED = null;
        }
    } else {
        if (INTERSECTED) INTERSECTED = null;
    }

    if (INTERSECTED_box) {
        INTERSECTED_box.update();
    }

    renderer.render(scene, camera);
}

//load obj
// instantiate a loader
var loader = new THREE.OBJLoader();

// load a resource
loader.load(
// resource URL
'models/monster.obj',
// called when resource is loaded
function (object) {

    scene.add(object);
},
// called when loading is in progresses
function (xhr) {

    console.log(xhr.loaded / xhr.total * 100 + '% loaded');
},
// called when loading has errors
function (error) {

    console.log('An error happened');
});

animate();
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(OrbitControls, "OrbitControls", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(scene, "scene", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(camera, "camera", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(canvas, "canvas", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(renderer, "renderer", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(interactiveObjects, "interactiveObjects", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(geometry, "geometry", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(material, "material", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(cube, "cube", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(controls, "controls", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(sky, "sky", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(gridHelper, "gridHelper", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(raycaster, "raycaster", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(mouse, "mouse", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(INTERSECTED, "INTERSECTED", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(INTERSECTED_box, "INTERSECTED_box", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(INTERSECTED_selected, "INTERSECTED_selected", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(onMouseMove, "onMouseMove", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(onMouseDown, "onMouseDown", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(animate, "animate", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    reactHotLoader.register(loader, "loader", "/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/viewer/viewer.js");
    leaveModule(module);
})();

;
},{"./sky":"viewer/sky.js","../store":"store/index.js"}],"index.js":[function(require,module,exports) {
'use strict';

var _jsxFileName = '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/index.js';

//export let actions = new Actions(store);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _reactRedux = require('react-redux');

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

require('./index.css');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

require('./viewer/viewer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var render = function render() {
    _reactDom2.default.render(_react2.default.createElement(
        _reactHotLoader.AppContainer,
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 15
            },
            __self: undefined
        },
        _react2.default.createElement(
            _reactRedux.Provider,
            { store: _store2.default, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                },
                __self: undefined
            },
            _react2.default.createElement(_App2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                },
                __self: undefined
            })
        )
    ), window.document.getElementById('app'));
};
if (typeof window !== 'undefined') {
    render();
}

if (module.hot) {
    module.hot.accept(render);
}

window.focus();

//execute the viewer

//let viewer = new Viewer(store);
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(render, 'render', '/Users/lucascassiano/Documents/GitHub/sandbox/webg-viewer/app/src/index.js');
    leaveModule(module);
})();

;
},{"./App.js":"App.js","./index.css":"index.css","./store":"store/index.js","./viewer/viewer.js":"viewer/viewer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = process.env.HMR_HOSTNAME || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + process.env.HMR_PORT + '/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = (
    '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
      '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
      '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
      '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' +
      '<pre>' + stackTrace.innerHTML + '</pre>' +
    '</div>'
  );

  return overlay;

}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id)
  });
}

},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=src.bbd431aa.map