process.env.HMR_PORT=50614;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
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
      localRequire.cache = {};

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

module.exports = "logo.fe047d72.svg";
},{}],"icons/github.svg":[function(require,module,exports) {
"use strict";

module.exports = "github.60929d30.svg";
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
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.updateSelectedObject = exports.updateScene = exports.toggleMenu = void 0;

var _redux = require("redux");

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
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'TOGGLE_MENU':
      var menuIsOpen = !state.menuIsOpen;
      return Object.assign({}, state, {
        menuIsOpen: menuIsOpen
      });

    case 'UPDATE_SCENE':
      var environment = Object.assign({}, state.environment, {
        scene: action.scene
      });
      return Object.assign({}, state, {
        environment: environment
      });

    case 'UPDATE_SELECTED_OBJECT':
      var environment = Object.assign({}, state.environment, {
        selectedObject: action.object
      });
      return Object.assign({}, state, {
        environment: environment
      });

    default:
      return state;
  }
};

var store = (0, _redux.createStore)(rootStore);
/*actions*/

var toggleMenu = function toggleMenu() {
  store.dispatch({
    type: 'TOGGLE_MENU'
  });
};

exports.toggleMenu = toggleMenu;

var updateScene = function updateScene(scene) {
  store.dispatch({
    type: 'UPDATE_SCENE',
    scene: scene
  });
};

exports.updateScene = updateScene;

var updateSelectedObject = function updateSelectedObject(object) {
  store.dispatch({
    type: 'UPDATE_SELECTED_OBJECT',
    object: object
  });
}; //export the store at the end


exports.updateSelectedObject = updateSelectedObject;
var _default = store;
exports.default = _default;
},{}],"controls/Slider2D.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _paper = _interopRequireWildcard(require("paper"));

var _index = require("./index");

var Slider2D =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Slider2D, _Component);

  function Slider2D(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Slider2D);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Slider2D).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "draw", function (canvas) {
      _paper.default.setup(canvas);

      var colorLines = _index.Colors.neutral_light;

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          width = _canvas$getBoundingCl.width,
          height = _canvas$getBoundingCl.height;

      var center = new _paper.default.Point(width / 2, height / 2);
      var pathY = new _paper.default.Path();
      pathY.strokeColor = _index.Colors.neutral_light;
      var start = new _paper.default.Point(center.x, 0);
      pathY.moveTo(start);
      pathY.lineTo(start.add([0, height]));
      var pathX = new _paper.default.Path();
      pathX.strokeColor = _index.Colors.neutral_light;
      var start = new _paper.default.Point(0, center.y);
      pathX.moveTo(start);
      pathX.lineTo(start.add([width, 0]));
      var axisX = new _paper.default.Path();
      axisX.strokeColor = _index.Colors.blue_base;
      var start = new _paper.default.Point(0, center.y);
      axisX.moveTo(start);
      axisX.lineTo(start.add([width, 0]));
      var axisY = new _paper.default.Path();
      axisY.strokeColor = _index.Colors.blue_base;
      var start = new _paper.default.Point(center.x, 0);
      axisY.moveTo(start);
      axisY.lineTo(start.add([0, height])); //myCircle.selected = true;

      var tool1 = new _paper.default.Tool();
      var pos = center;
      var myCircle = new _paper.default.Path.Circle(pos, 5); //myCircle.strokeColor = config.color3;

      myCircle.fillColor = _index.Colors.blue_base;

      myCircle.onMouseEnter = function (event) {
        myCircle.fillColor = _index.Colors.blue_dark;
        myCircle.strokeColor = _index.Colors.blue_base;
      };

      myCircle.onMouseLeave = function (event) {
        myCircle.fillColor = _index.Colors.blue_base;
        myCircle.strokeColor = _index.Colors.blue_base;
      };

      myCircle.onMouseDrag = function (event) {
        myCircle.fillColor = _index.config.colorHigh; //myCircle.strokeColor = config.color0;

        pos = event.point;
        if (pos.x <= 0) pos.x = 0;else if (pos.x >= width) pos.x = width;
        if (pos.y <= 0) pos.y = 0;else if (pos.y >= height) pos.y = height;
        myCircle.position = pos;
        axisX.position.y = pos.y;
        axisY.position.x = pos.x;
        var x = pos.x / width - 0.5;
        var y = 0.5 - pos.y / height;
        if (_this.props.onChange) _this.props.onChange({
          x: x,
          y: y,
          point: pos
        });

        _this.setState({
          x: x,
          y: y
        });
      };

      _paper.default.view.draw();
    });
    _this.state = {
      x: 0,
      y: 0
    };
    _this.canvas = _react.default.createRef(); // this.draw();

    return _this;
  }

  (0, _createClass2.default)(Slider2D, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // window.addEventListener('mousemove', this.onMouseMove);
      if (this.canvas.current) this.draw(this.canvas.current);
    } // Create a Paper.js Path to draw a line into it:

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      return _react.default.createElement("div", {
        className: "slider-2d-container"
      }, _react.default.createElement("canvas", {
        className: "slider-2d-canvas",
        ref: this.canvas
      }), _react.default.createElement("div", {
        className: "slider-2d-values"
      }, _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "label"
      }, "x"), _react.default.createElement("div", null, x.toFixed(2))), _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "label"
      }, "y"), _react.default.createElement("div", null, y.toFixed(2)))));
    }
  }]);
  return Slider2D;
}(_react.Component);

exports.default = Slider2D;
},{"./index":"controls/index.js"}],"controls/LineEditor.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _paper = _interopRequireDefault(require("paper"));

var _index = require("./index");

var LineEditor =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LineEditor, _Component);

  function LineEditor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, LineEditor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LineEditor).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "draw", function (canvas) {
      _paper.default.setup(canvas);

      var colorLines = 'rgba(0,0,0,0.1)';

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          width = _canvas$getBoundingCl.width,
          height = _canvas$getBoundingCl.height;

      var center = new _paper.default.Point(width / 2, height / 2);
      var myPath = new _paper.default.Path({
        strokeWidth: 2,
        strokeCap: 'round'
      });
      myPath.strokeColor = _index.Colors.blue_base;
      myPath.fillColor = _index.Colors.blue_light;
      var points = _this.props.points || [];
      var step = (width - 10) / (points.length - 1);
      var circles = [];

      var _loop = function _loop() {
        var point = new _paper.default.Point(5 + i * step, height - points[i]);
        myPath.add(point);
        var segment = myPath.segments[i];
        var circle = new _paper.default.Path.Circle(point, 3);
        circle.fillColor = _index.Colors.blue_base;

        circle.onMouseEnter = function (event) {
          event.target.fillColor = _index.config.colorHigh;
        };

        circle.onMouseLeave = function (event) {
          event.target.fillColor = _index.Colors.blue_base;
        };

        circle.onMouseUp = function (event) {
          event.target.fillColor = _index.Colors.blue_base;
        };

        circle.onMouseDrag = function (event) {
          event.target.fillColor = _index.config.colorHigh;
          pos = event.point;
          if (pos.y <= 0) pos.y = 0;else if (pos.y >= height) pos.y = height;
          event.target.position.y = pos.y;
          segment.point.y = pos.y;
          var x = pos.x / width - 0.5;
          var y = 0.5 - pos.y / height;
          if (_this.props.onChange) _this.props.onChange({
            x: x,
            y: y,
            point: pos,
            segments: myPath.segments
          });

          _this.setState({
            x: x,
            y: y
          });
        };

        circles.push(circle);
      };

      for (var i = 0; i < points.length; i++) {
        _loop();
      }

      myPath.smooth();
      var tool1 = new _paper.default.Tool();
      var pos = center;

      _paper.default.view.draw();
    });
    _this.state = {
      x: 0,
      y: 0
    };
    _this.canvas = _react.default.createRef(); // this.draw();

    return _this;
  }

  (0, _createClass2.default)(LineEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // window.addEventListener('mousemove', this.onMouseMove);
      if (this.canvas.current) this.draw(this.canvas.current);
    } // Create a Paper.js Path to draw a line into it:

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      return _react.default.createElement("div", {
        className: "line-editor"
      }, _react.default.createElement("canvas", {
        className: "line-editor-canvas",
        ref: this.canvas,
        width: 100
      }));
    }
  }]);
  return LineEditor;
}(_react.Component);

exports.default = LineEditor;
},{"./index":"controls/index.js"}],"controls/CircularSlider.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _paper = _interopRequireDefault(require("paper"));

var _index = require("./index");

var _repl = require("repl");

var CircularSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CircularSlider, _Component);

  function CircularSlider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CircularSlider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CircularSlider).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "draw", function (canvas) {
      _paper.default.setup(canvas);

      var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          width = _canvas$getBoundingCl.width,
          height = _canvas$getBoundingCl.height;

      var center = new _paper.default.Point(width / 2, height / 2);
      var radius = _this.props.radius || height / 2 - 20;
      var bgcircle = new _paper.default.Path.Circle(center, radius);
      bgcircle.strokeWidth = 2;
      bgcircle.strokeColor = _index.Colors.blue_light;
      bgcircle.fillColor = _index.Colors.blue_lightest;
      var circleSize = 5;
      var startPos = new _paper.default.Point(center.x, 15 + circleSize);
      var line = new _paper.default.Path.Line(center, startPos);
      line.strokeColor = _index.Colors.blue_base;
      line.strokeCap = 'round';
      line.strokeWidth = 2;
      var circle = new _paper.default.Path.Circle(startPos, circleSize);
      circle.fillColor = _index.Colors.blue_base;
      var through = new _paper.default.Point(60, 20);
      var to = new _paper.default.Point(80, 80);
      var arc = new _paper.default.Path.Arc(startPos, startPos, startPos); //arc.add(startPos);

      arc.strokeColor = 'black';

      circle.onMouseEnter = function (event) {
        event.target.fillColor = _index.Colors.blue_dark;
      };

      circle.onMouseLeave = function (event) {
        event.target.fillColor = _index.Colors.blue_base;
      };

      circle.onMouseUp = function (event) {
        event.target.fillColor = _index.Colors.blue_base;
      };

      circle.onMouseDrag = function (event) {
        event.target.fillColor = _index.Colors.blue_dark;
        var point = event.point;
        var atan = Math.atan2(point.x - width / 2, point.y - height / 2);
        var deg = -atan / (Math.PI / 180) + 180; // final (0-360 positive) degrees from mouse position 

        var X = Math.round(radius * Math.sin(deg * Math.PI / 180));
        var Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));
        circle.position.x = X + center.x;
        circle.position.y = Y + center.y;
        var halfX = Math.round(radius * Math.sin(deg * 0.5 * Math.PI / 180));
        var halfY = Math.round(radius * -Math.cos(deg * 0.5 * Math.PI / 180)); //arc

        var throughPoint = new _paper.default.Point(halfX + center.x, halfY + center.y);
        var toPoint = new _paper.default.Point(X + center.x, Y + center.y);
        line.lastSegment.point = new _paper.default.Point(circle.position.x, circle.position.y);

        _this.setState({
          angle: deg
        });

        if (_this.props.onChange) _this.props.onChange(deg);
      };

      _paper.default.view.draw();
    });
    _this.state = {
      angle: 0
    };
    _this.canvas = _react.default.createRef(); // this.draw();

    return _this;
  }

  (0, _createClass2.default)(CircularSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // window.addEventListener('mousemove', this.onMouseMove);
      if (this.canvas.current) this.draw(this.canvas.current);
    }
    /*
    var mPos = {x: e.clientX-elPos.x, y: e.clientY-elPos.y};
               var atan = Math.atan2(mPos.x-radius, mPos.y-radius);
               deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
                
               X = Math.round(radius* Math.sin(deg*Math.PI/180));    
               Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));
    */
    // Create a Paper.js Path to draw a line into it:

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      return _react.default.createElement("div", {
        className: "circular-slider"
      }, _react.default.createElement("canvas", {
        className: "circular-slider-canvas",
        ref: this.canvas
      }), _react.default.createElement("div", {
        className: "angle"
      }, this.state.angle.toFixed(2)));
    }
  }]);
  return CircularSlider;
}(_react.Component);

exports.default = CircularSlider;
},{"./index":"controls/index.js"}],"controls/Collapsible.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("./index");

var Collapsible =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Collapsible, _Component);

  function Collapsible(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Collapsible);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Collapsible).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClickContainer", function () {
      _this.setState({
        open: !_this.state.open
      });
    });
    _this.state = {
      open: false
    };
    _this.container = _react.default.createRef();
    _this.content = _react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(Collapsible, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var open = this.state.open;
      return _react.default.createElement("div", {
        className: "collapsible",
        ref: this.container
      }, _react.default.createElement("div", {
        className: "top"
      }, _react.default.createElement("div", {
        className: "label",
        onClick: this.onClickContainer
      }, this.props.label || "collapsible"), _react.default.createElement("div", {
        className: open ? "arrow arrow-up" : "arrow"
      }, _react.default.createElement("svg", {
        width: "12",
        viewBox: "0 0 79 40",
        xmlns: "http://www.w3.org/2000/svg"
      }, _react.default.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
      }, _react.default.createElement("polygon", {
        fill: _index.config.colorText,
        points: "0 0 79 0 39.5 39.5"
      }))))), _react.default.createElement("div", {
        className: open ? "content content-open" : "content content-closed",
        ref: this.container
      }, this.props.children));
    }
  }]);
  return Collapsible;
}(_react.Component);

exports.default = Collapsible;
},{"./index":"controls/index.js"}],"controls/controls.less":[function(require,module,exports) {
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"controls/index.js":[function(require,module,exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Slider2D", {
  enumerable: true,
  get: function get() {
    return _Slider2D.default;
  }
});
Object.defineProperty(exports, "LineEditor", {
  enumerable: true,
  get: function get() {
    return _LineEditor.default;
  }
});
Object.defineProperty(exports, "CircularSlider", {
  enumerable: true,
  get: function get() {
    return _CircularSlider.default;
  }
});
Object.defineProperty(exports, "Collapsible", {
  enumerable: true,
  get: function get() {
    return _Collapsible.default;
  }
});
exports.config = exports.Colors = void 0;

var _Slider2D = _interopRequireDefault(require("./Slider2D"));

var _LineEditor = _interopRequireDefault(require("./LineEditor"));

var _CircularSlider = _interopRequireDefault(require("./CircularSlider"));

var _Collapsible = _interopRequireDefault(require("./Collapsible"));

require("./controls.less");

var Colors = {
  text_default: '#425A70',
  text_selected: '#1070CA',
  text_sucess: '#00783E',
  text_muted: '#66788A',
  neutral_lightest: '#F9F9FB',
  neutral_light: '#E4E7EB',
  neutral_base: '#425A70',
  neutral_dark: '#234361',
  blue_lightest: '#F7F9FD',
  blue_light: '#DDEBF7',
  blue_base: '#1070CA',
  blue_dark: '#084B8A',
  red_lightest: '#FEF6F6',
  red_light: '#FAE2E2',
  red_base: '#EC4C47',
  red_dark: '#BF0E08'
};
exports.Colors = Colors;
var config = {
  color0: '#FFFFFF',
  color1: '#eeeeee',
  color2: '#888888',
  color3: '#222222',
  colorText: '#333',
  colorHigh: '#333'
};
exports.config = config;
},{"./Slider2D":"controls/Slider2D.js","./LineEditor":"controls/LineEditor.js","./CircularSlider":"controls/CircularSlider.js","./Collapsible":"controls/Collapsible.js","./controls.less":"controls/controls.less"}],"components/menu.less":[function(require,module,exports) {
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Menu.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _store = require("../store");

var _reactRedux = require("react-redux");

require("./menu.less");

var Menu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Menu, _Component);

  function Menu() {
    (0, _classCallCheck2.default)(this, Menu);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Menu).apply(this, arguments));
  }

  (0, _createClass2.default)(Menu, [{
    key: "render",
    value: function render() {
      var menuClass = this.props.open ? "menu" : "menu-hidden";
      var environment = this.props.environment;
      console.log("env", environment);
      var selectedObject = "select a object...";
      if (environment.selectedObject) selectedObject = this.props.environment.selectedObject;
      return _react.default.createElement("div", {
        className: "side-menu"
      }, _react.default.createElement("div", {
        className: "btn"
      }, "A"));
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
      dispatch({
        type: 'TOGGLE_MENU',
        open: null
      });
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Menu);

exports.default = _default;
},{"../store":"store/index.js","./menu.less":"components/menu.less"}],"App.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactHotLoader = require("react-hot-loader");

var _logo = _interopRequireDefault(require("./icons/logo.svg"));

var _github = _interopRequireDefault(require("./icons/github.svg"));

var _electron = require("electron");

require("./app.css");

var _reactRedux = require("react-redux");

var _store = require("./store");

var _controls = require("./controls");

var _Menu = _interopRequireDefault(require("./components/Menu"));

//import Menu from "./components/Menu";
//import "./controls/controls.less";
var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onChange", function (event) {
      //console.log("chage", event);
      window.pos3d = {
        x: event.x,
        y: event.y
      };
    });
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      var menu = _react.default.createElement("div", {
        className: "controls-menu"
      }, _react.default.createElement("div", {
        className: "panel"
      }, _react.default.createElement(_controls.Slider2D, {
        onChange: this.onChange
      }), _react.default.createElement(_controls.LineEditor, {
        points: [0, 1, 2, 2, 5, 2]
      }), _react.default.createElement(_controls.Collapsible, {
        label: "Circular Slider"
      }, _react.default.createElement(_controls.CircularSlider, null))));

      console.log('props', this.props);
      return _react.default.createElement("div", null, _react.default.createElement(_Menu.default, null));
    }
  }]);
  return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    menu: state.menuIsOpen
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: function toggleMenu() {
      dispatch({
        type: 'TOGGLE_MENU',
        open: null
      });
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = _default;
},{"./icons/logo.svg":"icons/logo.svg","./icons/github.svg":"icons/github.svg","./app.css":"app.css","./store":"store/index.js","./controls":"controls/index.js","./components/Menu":"components/Menu.js"}],"index.css":[function(require,module,exports) {
"use strict";

var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"viewer/sky.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var THREE = _interopRequireWildcard(require("three"));

var Sky =
/*#__PURE__*/
function () {
  function Sky() {
    (0, _classCallCheck2.default)(this, Sky);
  }

  (0, _createClass2.default)(Sky, [{
    key: "getObject",
    value: function getObject() {
      // SKYDOME
      var vertexShader = "\n        varying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\t\tvWorldPosition = worldPosition.xyz;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n            ";
      var fragmentShader = "\n        uniform vec3 topColor;\n\t\t\tuniform vec3 bottomColor;\n\t\t\tuniform float offset;\n\t\t\tuniform float exponent;\n\t\t\tvarying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tfloat h = normalize( vWorldPosition + offset ).y;\n\t\t\t\tgl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );\n            }\n            ";
      var uniforms = {
        topColor: {
          type: "c",
          value: new THREE.Color(0x606060)
        },
        bottomColor: {
          type: "c",
          value: new THREE.Color(0x212121)
        },
        offset: {
          type: "f",
          value: 400
        },
        exponent: {
          type: "f",
          value: 1.0
        }
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
  }]);
  return Sky;
}();

exports.default = Sky;
},{}],"viewer/grid.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var THREE = _interopRequireWildcard(require("three"));

// Source: https://github.com/usco/glView-helpers/blob/master/src/grids/LabeledGrid.js

/*TODO:
 - refactor
 - use label helper
*/
var LabeledGrid =
/*#__PURE__*/
function (_THREE$Object3D) {
  (0, _inherits2.default)(LabeledGrid, _THREE$Object3D);

  function LabeledGrid() {
    var _this;

    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    var upVector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [0, 1, 0];
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0x00baff;
    var opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.2;
    var text = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var textColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "#ffffff";
    var textLocation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "left";
    (0, _classCallCheck2.default)(this, LabeledGrid);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LabeledGrid).call(this));
    _this.width = width;
    _this.length = length;
    _this.step = step;
    _this.color = color;
    _this.opacity = opacity;
    _this.text = text;
    _this.textColor = textColor;
    _this.textLocation = textLocation;
    _this.upVector = new THREE.Vector3().fromArray(upVector);
    _this.name = "grid"; //TODO: clean this up

    _this.marginSize = 10;
    _this.stepSubDivisions = 10;

    _this._drawGrid(); //default grid orientation is z up, rotate if not the case
    //var upVector = this.upVector;


    _this.up = _this.upVector;

    _this.lookAt(_this.upVector);

    return _this;
  }

  (0, _createClass2.default)(LabeledGrid, [{
    key: "_drawGrid",
    value: function _drawGrid() {
      var gridGeometry, gridMaterial, mainGridZ, planeFragmentShader, planeGeometry, planeMaterial, subGridGeometry, subGridMaterial, subGridZ; //offset to avoid z fighting

      mainGridZ = -0.05;
      gridGeometry = new THREE.Geometry();
      gridMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHex(this.color),
        opacity: this.opacity,
        linewidth: 2,
        transparent: true
      });
      subGridZ = -0.05;
      subGridGeometry = new THREE.Geometry();
      subGridMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHex(this.color),
        opacity: this.opacity / 2,
        transparent: true
      });
      var step = this.step;
      var stepSubDivisions = this.stepSubDivisions;
      var width = this.width;
      var length = this.length;
      var centerBased = true;

      if (centerBased) {
        for (var i = 0; i <= width / 2; i += step / stepSubDivisions) {
          subGridGeometry.vertices.push(new THREE.Vector3(-length / 2, i, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(length / 2, i, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(-length / 2, -i, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(length / 2, -i, subGridZ));

          if (i % step == 0) {
            gridGeometry.vertices.push(new THREE.Vector3(-length / 2, i, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(length / 2, i, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(-length / 2, -i, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(length / 2, -i, mainGridZ));
          }
        }

        for (var i = 0; i <= length / 2; i += step / stepSubDivisions) {
          subGridGeometry.vertices.push(new THREE.Vector3(i, -width / 2, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(i, width / 2, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(-i, -width / 2, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(-i, width / 2, subGridZ));

          if (i % step == 0) {
            gridGeometry.vertices.push(new THREE.Vector3(i, -width / 2, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(i, width / 2, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(-i, -width / 2, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(-i, width / 2, mainGridZ));
          }
        }
      } else {
        for (var i = -width / 2; i <= width / 2; i += step / stepSubDivisions) {
          subGridGeometry.vertices.push(new THREE.Vector3(-length / 2, i, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(length / 2, i, subGridZ));

          if (i % step == 0) {
            gridGeometry.vertices.push(new THREE.Vector3(-length / 2, i, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(length / 2, i, mainGridZ));
          }
        }

        for (var i = -length / 2; i <= length / 2; i += step / stepSubDivisions) {
          subGridGeometry.vertices.push(new THREE.Vector3(i, -width / 2, subGridZ));
          subGridGeometry.vertices.push(new THREE.Vector3(i, width / 2, subGridZ));

          if (i % step == 0) {
            gridGeometry.vertices.push(new THREE.Vector3(i, -width / 2, mainGridZ));
            gridGeometry.vertices.push(new THREE.Vector3(i, width / 2, mainGridZ));
          }
        }
      }

      this.mainGrid = new THREE.LineSegments(gridGeometry, gridMaterial); //create sub grid geometry object

      this.subGrid = new THREE.LineSegments(subGridGeometry, subGridMaterial); //create margin

      var offsetWidth = width + this.marginSize;
      var offsetLength = length + this.marginSize;
      var marginGeometry = new THREE.Geometry();
      marginGeometry.vertices.push(new THREE.Vector3(-length / 2, -width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(length / 2, -width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(length / 2, -width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(length / 2, width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(length / 2, width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-length / 2, width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-length / 2, width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-length / 2, -width / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-offsetLength / 2, -offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(offsetLength / 2, -offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(offsetLength / 2, -offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(offsetLength / 2, offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(offsetLength / 2, offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-offsetLength / 2, offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-offsetLength / 2, offsetWidth / 2, subGridZ));
      marginGeometry.vertices.push(new THREE.Vector3(-offsetLength / 2, -offsetWidth / 2, subGridZ));
      var strongGridMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHex(this.color),
        opacity: this.opacity * 2,
        linewidth: 2,
        transparent: true
      });
      this.margin = new THREE.LineSegments(marginGeometry, strongGridMaterial); //add all grids, subgrids, margins etc

      this.add(this.mainGrid);
      this.add(this.subGrid);
      this.add(this.margin);

      this._drawNumbering();
    }
  }, {
    key: "toggle",
    value: function toggle(_toggle) {
      //apply visibility settings to all children 
      this.traverse(function (child) {
        child.visible = _toggle;
      });
    }
  }, {
    key: "setOpacity",
    value: function setOpacity(opacity) {
      this.opacity = opacity;
      this.mainGrid.material.opacity = opacity;
      this.subGrid.material.opacity = opacity / 2;
      this.margin.material.opacity = opacity * 2;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
      this.mainGrid.material.color = new THREE.Color().setHex(this.color);
      this.subGrid.material.color = new THREE.Color().setHex(this.color);
      this.margin.material.color = new THREE.Color().setHex(this.color);
    }
  }, {
    key: "toggleText",
    value: function toggleText(toggle) {
      this.text = toggle;
      var labels = this.labels.children;

      for (var i = 0; i < this.labels.children.length; i++) {
        var label = labels[i];
        label.visible = toggle;
      }
    }
  }, {
    key: "setTextColor",
    value: function setTextColor(color) {
      this.textColor = color;

      this._drawNumbering();
    }
  }, {
    key: "setTextLocation",
    value: function setTextLocation(location) {
      this.textLocation = location;
      return this._drawNumbering();
    }
  }, {
    key: "setUp",
    value: function setUp(upVector) {
      this.upVector = upVector;
      this.up = upVector;
      this.lookAt(upVector);
    }
  }, {
    key: "resize",
    value: function resize(width, length) {
      if (width && length) {
        var width = Math.max(width, 10);
        this.width = width;
        var length = Math.max(length, 10);
        this.length = length;
        this.step = Math.max(this.step, 5);
        this.remove(this.mainGrid);
        this.remove(this.subGrid);
        this.remove(this.margin); //this.remove(this.plane);

        return this._drawGrid();
      }
    }
  }, {
    key: "_drawNumbering",
    value: function _drawNumbering() {
      var label, sizeLabel, sizeLabel2, xLabelsLeft, xLabelsRight, yLabelsBack, yLabelsFront;
      var step = this.step;
      this._labelStore = {};

      if (this.labels != null) {
        this.mainGrid.remove(this.labels);
      }

      this.labels = new THREE.Object3D();
      var width = this.width;
      var length = this.length;
      var numbering = this.numbering = "centerBased";
      var labelsFront = new THREE.Object3D();
      var labelsSideRight = new THREE.Object3D();

      if (numbering == "centerBased") {
        for (var i = 0; i <= width / 2; i += step) {
          var sizeLabel = this.drawTextOnPlane("" + i, 32);
          var sizeLabel2 = sizeLabel.clone();
          sizeLabel.position.set(length / 2, -i, 0.1);
          sizeLabel.rotation.z = -Math.PI / 2;
          labelsFront.add(sizeLabel);
          sizeLabel2.position.set(length / 2, i, 0.1);
          sizeLabel2.rotation.z = -Math.PI / 2;
          labelsFront.add(sizeLabel2);
        }

        for (var i = 0; i <= length / 2; i += step) {
          var sizeLabel = this.drawTextOnPlane("" + i, 32);
          var sizeLabel2 = sizeLabel.clone();
          sizeLabel.position.set(-i, width / 2, 0.1); //sizeLabel.rotation.z = -Math.PI / 2;

          labelsSideRight.add(sizeLabel);
          sizeLabel2.position.set(i, width / 2, 0.1); //sizeLabel2.rotation.z = -Math.PI / 2;

          labelsSideRight.add(sizeLabel2);
        }

        var labelsSideLeft = labelsSideRight.clone();
        labelsSideLeft.rotation.z = -Math.PI; //labelsSideLeft = labelsSideRight.clone().translateY(- width );

        var labelsBack = labelsFront.clone();
        labelsBack.rotation.z = -Math.PI;
      }
      /*if (this.textLocation === "center") {
        yLabelsRight.translateY(- length/ 2);
        xLabelsFront.translateX(- width / 2);
      } else {
        yLabelsLeft = yLabelsRight.clone().translateY( -width );
        xLabelsBack = xLabelsFront.clone().translateX( -length );
        
        this.labels.add( yLabelsLeft );
        this.labels.add( xLabelsBack) ;
      }*/
      //this.labels.add( yLabelsRight );


      this.labels.add(labelsFront);
      this.labels.add(labelsBack);
      this.labels.add(labelsSideRight);
      this.labels.add(labelsSideLeft); //apply visibility settings to all labels

      var textVisible = this.text;
      this.labels.traverse(function (child) {
        child.visible = textVisible;
      });
      this.mainGrid.add(this.labels);
    }
  }, {
    key: "drawTextOnPlane",
    value: function drawTextOnPlane(text, size) {
      var canvas, context, material, plane, texture;

      if (size == null) {
        size = 256;
      }

      canvas = document.createElement('canvas');
      var size = 128;
      canvas.width = size;
      canvas.height = size;
      context = canvas.getContext('2d');
      context.font = "18px sans-serif";
      context.textAlign = 'center';
      context.fillStyle = this.textColor;
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      context.strokeStyle = this.textColor;
      context.strokeText(text, canvas.width / 2, canvas.height / 2);
      texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      texture.generateMipmaps = true;
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xffffff,
        alphaTest: 0.3
      });
      plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(size / 8, size / 8), material);
      plane.doubleSided = true;
      plane.overdraw = true;
      return plane;
    }
  }]);
  return LabeledGrid;
}(THREE.Object3D); //export { LabeledGrid };
//module.exports = LabeledGrid;
//autoresize, disabled for now

/*
updateGridSize() {
      var max, maxX, maxY, min, minX, minY, size, subchild, _getBounds, _i, _len, _ref,
        _this = this;
      minX = 99999;
      maxX = -99999;
      minY = 99999;
      maxY = -99999;
      _getBounds = function(mesh) {
        var bBox, subchild, _i, _len, _ref, _results;
        if (mesh instanceof THREE.Mesh) {
          mesh.geometry.computeBoundingBox();
          bBox = mesh.geometry.boundingBox;
          minX = Math.min(minX, bBox.min.x);
          maxX = Math.max(maxX, bBox.max.x);
          minY = Math.min(minY, bBox.min.y);
          maxY = Math.max(maxY, bBox.max.y);
          _ref = mesh.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subchild = _ref[_i];
            _results.push(_getBounds(subchild));
          }
          return _results;
        }
      };
      if (this.rootAssembly != null) {
        _ref = this.rootAssembly.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subchild = _ref[_i];
          if (subchild.name !== "renderSubs" && subchild.name !== "connectors") {
            _getBounds(subchild);
          }
        }
      }
      max = Math.max(Math.max(maxX, maxY), 100);
      min = Math.min(Math.min(minX, minY), -100);
      size = (Math.max(max, Math.abs(min))) * 2;
      size = Math.ceil(size / 10) * 10;
      if (size >= 200) {
        return this.resize(size);
      }
};
*/


exports.default = LabeledGrid;
},{}],"viewer/utils/OrbitControls.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
  /**
   * @author qiao / https://github.com/qiao
   * @author mrdoob / http://mrdoob.com
   * @author alteredq / http://alteredqualia.com/
   * @author WestLangley / http://github.com/WestLangley
   * @author erich666 / http://erichaines.com
   * @author lucascassiano / http://github.com/lucascassiano
   */
  // This set of controls performs orbiting, dollying (zooming), and panning.
  // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by
  // default).
  //
  //    Orbit - left mouse / touch: one finger move    Zoom - middle mouse, or
  // mousewheel / touch: two finger spread or squish    Pan - right mouse, or
  // arrow keys / touch: three finter swipe

  /* -- last edit comments
  this script was changed to support better gets and sets of angles
  */
  var THREE = require("three");

  function OrbitControls(object, domElement, updateExternal) {
    this.object = object;
    this.domElement = domElement !== undefined ? domElement : document; // Set to false to disable this control

    this.enabled = true; // "target" sets the location of focus, where the object orbits around

    this.target = new THREE.Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

    this.minDistance = 0;
    this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

    this.minZoom = 0;
    this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits. Range is 0 to
    // Math.PI radians.

    this.minPolarAngle = 0; // radians

    this.maxPolarAngle = Math.PI; // radians
    // How far you can orbit horizontally, upper and lower limits. If set, must be a
    // sub-interval of the interval [ - Math.PI, Math.PI ].

    this.minAzimuthAngle = -Infinity; // radians

    this.maxAzimuthAngle = Infinity; // radians
    // Set to true to enable damping (inertia) If damping is enabled, you must call
    // controls.update() in your animation loop

    this.enableDamping = false;
    this.dampingFactor = 0.25; // This option actually enables dollying in and out; left as "zoom" for
    // backwards compatibility. Set to false to disable zooming

    this.enableZoom = true;
    this.zoomSpeed = 1.0; // Set to false to disable rotating

    this.enableRotate = true;
    this.rotateSpeed = 1.0; // Set to false to disable panning

    this.enablePan = true;
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push
    // Set to true to automatically rotate around the target If auto-rotate is
    // enabled, you must call controls.update() in your animation loop

    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
    // Set to false to disable use of the keys

    this.enableKeys = true; // The four arrow keys

    this.keys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      BOTTOM: 40
    }; // Mouse buttons

    this.mouseButtons = {
      ORBIT: THREE.MOUSE.LEFT,
      ZOOM: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.RIGHT
    }; // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.updateExternal = updateExternal;
    this.isExternallyControlled = false;

    this.setExternalControl = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.isExternallyControlled = value;
    }; //
    // internals
    //


    var scope = this;
    var changeEvent = {
      type: 'change'
    };
    var startEvent = {
      type: 'start'
    };
    var endEvent = {
      type: 'end'
    };
    var STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_DOLLY: 4,
      TOUCH_PAN: 5
    };
    var state = STATE.NONE;
    var EPS = 0.000001; // current position in spherical coordinates

    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();
    var scale = 1;
    var panOffset = new THREE.Vector3();
    var zoomChanged = false; // Current position in spherical coordinate system.

    var theta = 0;
    var phi = 0; // Pending changes

    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var panOffset = new THREE.Vector3();
    var zoomChanged = false; //---
    //
    // public methods
    //

    this.setEnable = function (enable) {
      this.enabled = enable;
    };

    this.getAngles = function () {
      return {
        phi: spherical.phi,
        theta: spherical.theta
      };
    };

    this.getPolarAngle = function () {
      return spherical.phi;
    };

    this.getAzimuthalAngle = function () {
      return spherical.theta;
    };

    this.setPolarAngle = function (angle) {
      phi = angle;
      this.forceUpdate();
    };

    this.setAzimuthalAngle = function (angle) {
      theta = angle;
      this.forceUpdate();
    };

    this.setPolarAngleNoForcing = function (angle) {
      phi = angle;
      this.update(); //this.forceUpdate();
    };

    this.setAzimuthalAngleNoForcing = function (angle) {
      theta = angle;
      this.update(); //this.forceUpdate();
    };

    this.setSyncRotationObject = function (syncObject) {
      this.syncObject;

      if (this.syncObject.syncRotation) {
        this.syncObject.syncRotation(this.setAngles);
      }
    };
    /**
     * update Orbit Controls
     * @param {*} force 
     */


    this.updateControls = function () {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (force) this.forceUpdate();else this.update();
    };

    this.setAngles = function (_phi, _theta) {
      phi = _phi;
      theta = _theta;
      this.forceUpdate();
    };

    this.rotateLeft = function (angle) {
      thetaDelta -= angle;
    };

    this.rotateUp = function (angle) {
      phiDelta = angle;
    };

    this.setPhiDelta = function (angle) {
      phiDelta = angle; //this.forceUpdate();
    };

    this.setThetaDelta = function (angle) {
      thetaDelta -= angle; //this.forceUpdate();
    }; // pass in distance in world space to move left


    this.panLeft = function () {
      var v = new THREE.Vector3();
      return function panLeft(distance) {
        var te = this.object.matrix.elements; // get X column of matrix

        v.set(te[0], te[1], te[2]);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }(); // pass in distance in world space to move up


    this.panUp = function () {
      var v = new THREE.Vector3();
      return function panUp(distance) {
        var te = this.object.matrix.elements; // get Y column of matrix

        v.set(te[4], te[5], te[6]);
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    }(); // pass in x,y of change desired in pixel space, right and down are positive


    this.pan = function (deltaX, deltaY, screenWidth, screenHeight) {
      if (scope.object instanceof THREE.PerspectiveCamera) {
        // perspective
        var position = scope.object.position;
        var offset = position.clone().sub(scope.target);
        var targetDistance = offset.length(); // half of the fov is center to top of screen

        targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we actually don't use screenWidth, since perspective camera is fixed to
        // screen height

        scope.panLeft(2 * deltaX * targetDistance / screenHeight);
        scope.panUp(2 * deltaY * targetDistance / screenHeight);
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        // orthographic
        scope.panLeft(deltaX * (scope.object.right - scope.object.left) / screenWidth);
        scope.panUp(deltaY * (scope.object.top - scope.object.bottom) / screenHeight);
      } else {
        // camera neither orthographic or perspective
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
      }
    };

    this.dollyIn = function (dollyScale) {
      if (scope.object instanceof THREE.PerspectiveCamera) {
        scale /= dollyScale;
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabl' + 'ed.');
      }
    };

    this.dollyOut = function (dollyScale) {
      if (scope.object instanceof THREE.PerspectiveCamera) {
        scale *= dollyScale;
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        scope.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabl' + 'ed.');
      }
    };

    this.reset = function () {
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);
      scope.object.zoom = scope.zoom0;
      scope.object.updateProjectionMatrix();
      scope.dispatchEvent(changeEvent);
      scope.update();
      state = STATE.NONE;
    };

    this.forceUpdate = function () {
      var offset = new THREE.Vector3(); // so camera.up is the orbit axis

      var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
      var quatInverse = quat.clone().inverse();
      var lastPosition = new THREE.Vector3();
      var lastQuaternion = new THREE.Quaternion();
      return function () {
        var position = this.object.position;
        offset.copy(position).sub(this.target); // rotate offset to "y-axis-is-up" space

        offset.applyQuaternion(quat); // restrict theta to be between desired limits

        theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, theta)); // restrict phi to be between desired limits

        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi)); // restrict phi to be betwee EPS and PI-EPS

        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
        var radius = offset.length() * scale; // restrict radius to be between desired limits

        radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius)); // move target to panned location

        this.target.add(panOffset);
        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta); // rotate offset back to "camera-up-vector-is-up" space

        offset.applyQuaternion(quatInverse);
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);

        if (this.enableDamping === true) {
          thetaDelta *= 1 - this.dampingFactor;
          phiDelta *= 1 - this.dampingFactor;
        } else {
          thetaDelta = 0;
          phiDelta = 0;
        }

        scale = 1;
        panOffset.set(0, 0, 0); //new

        if (scope.updateExternal && !scope.isExternallyControlled) {
          scope.updateExternal(phi, theta);
        } // update condition is: min(camera displacement, camera rotation in radians)^2 >
        // EPS using small-angle approximation cos(x/2) = 1 - x^2 / 8


        if (zoomChanged || lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
          lastPosition.copy(this.object.position);
          lastQuaternion.copy(this.object.quaternion);
          zoomChanged = false;
          return true;
        }

        return false;
      };
    }(); // this method is exposed, but perhaps it would be better if we can make it
    // private...


    this.update = function () {
      var offset = new THREE.Vector3(); // so camera.up is the orbit axis

      var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
      var quatInverse = quat.clone().inverse();
      var lastPosition = new THREE.Vector3();
      var lastQuaternion = new THREE.Quaternion();
      return function update() {
        var position = scope.object.position;
        offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

        offset.applyQuaternion(quat); // angle from z-axis around y-axis

        spherical.setFromVector3(offset);

        if (scope.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }

        spherical.theta += sphericalDelta.theta;
        spherical.phi += sphericalDelta.phi; // restrict theta to be between desired limits

        spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta)); // restrict phi to be between desired limits

        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        spherical.radius *= scale; // restrict radius to be between desired limits

        spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location

        scope.target.add(panOffset);
        offset.setFromSpherical(spherical); // rotate offset back to "camera-up-vector-is-up" space

        offset.applyQuaternion(quatInverse);
        position.copy(scope.target).add(offset);
        scope.object.lookAt(scope.target);

        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
        } else {
          sphericalDelta.set(0, 0, 0);
        }

        scale = 1;
        panOffset.set(0, 0, 0); //new

        if (scope.updateExternal && !scope.isExternallyControlled) {
          scope.updateExternal(spherical.phi, spherical.theta);
        } // update condition is: min(camera displacement, camera rotation in radians)^2 >
        // EPS using small-angle approximation cos(x/2) = 1 - x^2 / 8


        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
          scope.dispatchEvent(changeEvent);
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          zoomChanged = false;
          return true;
        }

        return false;
      };
    }();

    this.dispose = function () {
      scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
      scope.domElement.removeEventListener('mousedown', onMouseDown, false);
      scope.domElement.removeEventListener('wheel', onMouseWheel, false);
      scope.domElement.removeEventListener('touchstart', onTouchStart, false);
      scope.domElement.removeEventListener('touchend', onTouchEnd, false);
      scope.domElement.removeEventListener('touchmove', onTouchMove, false);
      scope.domElement.removeEventListener('mousemove', onMouseMove, false);
      scope.domElement.removeEventListener('mouseup', onMouseUp, false);
      scope.domElement.removeEventListener('keydown', onKeyDown, false); //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    };

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();
    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();
    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();

    function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }

    function getZoomScale() {
      return Math.pow(0.95, scope.zoomSpeed);
    }

    function rotateLeft(angle) {
      sphericalDelta.theta -= angle; //new

      if (scope.updateExternal && !scope.isExternallyControlled) {
        scope.updateExternal(phi, theta);
      }
    }

    function rotateUp(angle) {
      sphericalDelta.phi -= angle; //new

      if (scope.updateExternal && !scope.isExternallyControlled) {
        scope.updateExternal(phi, theta);
      }
    }

    var panLeft = function () {
      var v = new THREE.Vector3();
      return function panLeft(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();

    var panUp = function () {
      var v = new THREE.Vector3();
      return function panUp(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix

        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    }(); // deltaX and deltaY are in pixels; right and down are positive


    var pan = function () {
      var offset = new THREE.Vector3();
      return function pan(deltaX, deltaY) {
        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (scope.object instanceof THREE.PerspectiveCamera) {
          // perspective
          var position = scope.object.position;
          offset.copy(position).sub(scope.target);
          var targetDistance = offset.length(); // half of the fov is center to top of screen

          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we actually don't use screenWidth, since perspective camera is fixed to
          // screen height

          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
        } else if (scope.object instanceof THREE.OrthographicCamera) {
          // orthographic
          panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
          panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
        } else {
          // camera neither orthographic nor perspective
          console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
          scope.enablePan = false;
        }
      };
    }();

    function dollyIn(dollyScale) {
      if (scope.object instanceof THREE.PerspectiveCamera) {
        scale /= dollyScale;
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabl' + 'ed.');
        scope.enableZoom = false;
      }
    }

    function dollyOut(dollyScale) {
      if (scope.object instanceof THREE.PerspectiveCamera) {
        scale *= dollyScale;
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
        scope.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabl' + 'ed.');
        scope.enableZoom = false;
      }
    } //
    // event callbacks - update the object state
    //


    function handleMouseDownRotate(event) {
      console.log('handleMouseDownRotate');
      rotateStart.set(event.clientX, event.clientY);
    }

    function handleMouseDownDolly(event) {
      //console.log( 'handleMouseDownDolly' );
      dollyStart.set(event.clientX, event.clientY);
    }

    function handleMouseDownPan(event) {
      //console.log( 'handleMouseDownPan' );
      panStart.set(event.clientX, event.clientY);
    }

    function handleMouseMoveRotate(event) {
      //console.log('handleMouseMoveRotate');
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart);
      var element = scope.domElement === document ? scope.domElement.body : scope.domElement; // rotating across whole screen goes 360 degrees around

      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed); // rotating up and down along whole screen attempts to go 360, but limited to
      // 180

      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
      rotateStart.copy(rotateEnd);
      scope.update();
    }

    function handleMouseMoveDolly(event) {
      //console.log( 'handleMouseMoveDolly' );
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) {
        dollyIn(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyOut(getZoomScale());
      }

      dollyStart.copy(dollyEnd);
      scope.update();
    }

    function handleMouseMovePan(event) {
      //console.log( 'handleMouseMovePan' );
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }

    function handleMouseUp(event) {//console.log( 'handleMouseUp' );
    }

    function handleMouseWheel(event) {
      //console.log( 'handleMouseWheel' );
      if (event.deltaY < 0) {
        dollyOut(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyIn(getZoomScale());
      }

      scope.update();
    }

    function handleKeyDown(event) {
      //console.log( 'handleKeyDown' );
      switch (event.keyCode) {
        case scope.keys.UP:
          pan(0, scope.keyPanSpeed);
          scope.update();
          break;

        case scope.keys.BOTTOM:
          pan(0, -scope.keyPanSpeed);
          scope.update();
          break;

        case scope.keys.LEFT:
          pan(scope.keyPanSpeed, 0);
          scope.update();
          break;

        case scope.keys.RIGHT:
          pan(-scope.keyPanSpeed, 0);
          scope.update();
          break;
      }
    }

    function handleTouchStartRotate(event) {
      //console.log( 'handleTouchStartRotate' );
      rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    }

    function handleTouchStartDolly(event) {
      //console.log( 'handleTouchStartDolly' );
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }

    function handleTouchStartPan(event) {
      //console.log( 'handleTouchStartPan' );
      panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    }

    function handleTouchMoveRotate(event) {
      //console.log( 'handleTouchMoveRotate' );
      rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
      rotateDelta.subVectors(rotateEnd, rotateStart);
      var element = scope.domElement === document ? scope.domElement.body : scope.domElement; // rotating across whole screen goes 360 degrees around

      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed); // rotating up and down along whole screen attempts to go 360, but limited to
      // 180

      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
      rotateStart.copy(rotateEnd);
      scope.update();
    }

    function handleTouchMoveDolly(event) {
      //console.log( 'handleTouchMoveDolly' );
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.subVectors(dollyEnd, dollyStart);

      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }

      dollyStart.copy(dollyEnd);
      scope.update();
    }

    function handleTouchMovePan(event) {
      //console.log( 'handleTouchMovePan' );
      panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
      panDelta.subVectors(panEnd, panStart);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }

    function handleTouchEnd(event) {} //console.log( 'handleTouchEnd' );
    //
    // event handlers - FSM: listen for events and reset state
    //


    function onMouseDown(event) {
      if (scope.enabled == false) return;
      event.preventDefault();

      if (event.button === scope.mouseButtons.ORBIT) {
        if (scope.enableRotate === false) return;
        handleMouseDownRotate(event);
        state = STATE.ROTATE;
      } else if (event.button === scope.mouseButtons.ZOOM) {
        if (scope.enableZoom === false) return;
        handleMouseDownDolly(event);
        state = STATE.DOLLY;
      } else if (event.button === scope.mouseButtons.PAN) {
        if (scope.enablePan === false) return;
        handleMouseDownPan(event);
        state = STATE.PAN;
      }

      if (state !== STATE.NONE) {
        scope.domElement.addEventListener('mousemove', onMouseMove, false);
        scope.domElement.addEventListener('mouseup', onMouseUp, false);
        scope.dispatchEvent(startEvent);
      }
    }

    function onMouseMove(event) {
      if (scope.enabled == false) return;
      event.preventDefault();

      if (state === STATE.ROTATE) {
        if (scope.enableRotate === false) return;
        handleMouseMoveRotate(event);
      } else if (state === STATE.DOLLY) {
        if (scope.enableZoom === false) return;
        handleMouseMoveDolly(event);
      } else if (state === STATE.PAN) {
        if (scope.enablePan === false) return;
        handleMouseMovePan(event);
      }
    }

    function onMouseUp(event) {
      if (scope.enabled == false) return;
      handleMouseUp(event);
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }

    function onMouseWheel(event) {
      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;
      event.preventDefault();
      event.stopPropagation();
      handleMouseWheel(event);
      scope.dispatchEvent(startEvent); // not sure why these are here...

      scope.dispatchEvent(endEvent);
    }

    function onKeyDown(event) {
      if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
      handleKeyDown(event);
    }

    function onTouchStart(event) {
      if (scope.enabled === false) return;

      switch (event.touches.length) {
        case 1:
          // one-fingered touch: rotate
          if (scope.enableRotate === false) return;
          handleTouchStartRotate(event);
          state = STATE.TOUCH_ROTATE;
          break;

        case 2:
          // two-fingered touch: dolly
          if (scope.enableZoom === false) return;
          handleTouchStartDolly(event);
          state = STATE.TOUCH_DOLLY;
          break;

        case 3:
          // three-fingered touch: pan
          if (scope.enablePan === false) return;
          handleTouchStartPan(event);
          state = STATE.TOUCH_PAN;
          break;

        default:
          state = STATE.NONE;
      }

      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }

    function onTouchMove(event) {
      if (scope.enabled === false) return;
      event.preventDefault();
      event.stopPropagation();

      switch (event.touches.length) {
        case 1:
          // one-fingered touch: rotate
          if (scope.enableRotate === false) return;
          if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

          handleTouchMoveRotate(event);
          break;

        case 2:
          // two-fingered touch: dolly
          if (scope.enableZoom === false) return;
          if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

          handleTouchMoveDolly(event);
          break;

        case 3:
          // three-fingered touch: pan
          if (scope.enablePan === false) return;
          if (state !== STATE.TOUCH_PAN) return; // is this needed?...

          handleTouchMovePan(event);
          break;

        default:
          state = STATE.NONE;
      }
    }

    function onTouchEnd(event) {
      if (scope.enabled === false) return;
      handleTouchEnd(event);
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }

    function onContextMenu(event) {
      event.preventDefault();
    } //


    scope.domElement.addEventListener('contextmenu', onContextMenu, false);
    scope.domElement.addEventListener('mousedown', onMouseDown, false);
    scope.domElement.addEventListener('wheel', onMouseWheel, false);
    scope.domElement.addEventListener('touchstart', onTouchStart, false);
    scope.domElement.addEventListener('touchend', onTouchEnd, false);
    scope.domElement.addEventListener('touchmove', onTouchMove, false);
    scope.domElement.addEventListener('keydown', onKeyDown, false);
    this.update();
  }

  ;
  OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
  OrbitControls.prototype.constructor = OrbitControls;
  Object.defineProperties(OrbitControls.prototype, {
    center: {
      get: function get() {
        console.warn('THREE.OrbitControls: .center has been renamed to .target');
        return this.target;
      }
    },
    // backward compatibility
    noZoom: {
      get: function get() {
        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
        return !this.enableZoom;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
        this.enableZoom = !value;
      }
    },
    noRotate: {
      get: function get() {
        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
        return !this.enableRotate;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
        this.enableRotate = !value;
      }
    },
    noPan: {
      get: function get() {
        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
        return !this.enablePan;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
        this.enablePan = !value;
      }
    },
    noKeys: {
      get: function get() {
        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
        return !this.enableKeys;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
        this.enableKeys = !value;
      }
    },
    staticMoving: {
      get: function get() {
        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping inste' + 'ad.');
        return !this.enableDamping;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping inste' + 'ad.');
        this.enableDamping = !value;
      }
    },
    dynamicDampingFactor: {
      get: function get() {
        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor ' + 'instead.');
        return this.dampingFactor;
      },
      set: function set(value) {
        console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor ' + 'instead.');
        this.dampingFactor = value;
      }
    }
  });
  return OrbitControls;
};
},{}],"viewer/viewerHelper.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

/*************************************************************************************************************
@lucascassiano
Similar to CubeView from R1
implements the new version of a handler that helps rotate the camere to specific locations, e.g. TOP or Front
**************************************************************************************************************/
var OrbitControls = require('./utils/OrbitControls.js')(THREE);

var TWEEN = require('@tweenjs/tween.js'); //Base64 images converted @ https://www.base64-image.de


var texture_top = 'data:image/png;base64,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';
var texture_right = 'data:image/png;base64,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';
var texture_left = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABGZJREFUeAHtnb1KK1EUhU/MFQURRAux8yHS+VNoJYqthfgMsUjvM+QptLURfAB9BUUbC8FKtBAb0VwmkMCWYTkh15m5Wd9AMHv2yTlnrfU5ZEIgjU6n00sctg5M2SpHeN+BPwMf2u324Cl/DRzodrt9lVwBDMJWEgFAuWPQAwCDkJVEAFDuGPQAwCBkJREAlDsGPQAwCFlJBADljkEPAAxCVhIBQLlj0AMAg5CVRABQ7hj0AMAgZCURAJQ7Bj0AMAhZSQQA5Y5BDwAMQlYSAUC5Y9ADAIOQlUQAUO4Y9ADAIGQlEQCUOwY9ADAIWUkEAOWOQQ8ADEJWEgFAuWPQAwCDkJVEAFDuGPQAwCBkJREAlDsGPQAwCFlJBADljkEPAAxCVhIBQLlj0AMAg5CVRABQ7hj0AMAgZCURAJQ7Bj0AMAhZSQQA5Y5BDwAMQlYSAUC5Y9ADAIOQlUQAUO4Y9ADAIGQlEQCUOwY9ADAIWUkEAOWOQQ8ADEJWEgFAuWPQAwCDkJXE4W8GqUFl9M7OztL7+3s6OjpK09PTIy15e3ubrq+vR3pNNnhubi4dHBwMXzfYw/BEgScrKyvp6empwMj8IcvLy2l3dze/WcLZ2gBwd3eX3t7e0ufn58gAvLy8pAyCRqORpqaKX9QWFhaCxYM9NJvNcF4V2dj7+/vcIV9fX6nX68l9fXx85L62rJO1AeBfCF5bW0v7+/tjT3VycpJmZ2fHnufq6iqdn5+njY2NtLe3N/Z8vzFB8X+X31idOSt3AAAqj6DaDQBAtf5XvjoAVB5BtRsAgGr9r3x1AKg8gmo3MFG3gQ8PD+ni4qKwo1tbW7m3e5eXlz9+FpF95rCzs1N4rboOnCgAHh8fU/Yoeqyvr+cCkN2//3RkHwABwE8uldxvtVppe3u78Krz8/O5Y4+Pj9PMzExub9JOTtQVIPv0bmlpaeyMFhcXc68MY09cwwl4E1jDUMrcEgCU6XYN1wKAGoZS5pYAoEy3a7gWANQwlDK3BABlul3DtWp3G3h6epqKfiNndXU1bW5uDm29ublJr6+vw7rIk8PDw8LrFZnvfxtTOwCyEIse30F5fn5O2WOUI/vKlvPR6HQ6fQfa7bazD3bau91uXzPvAeyij4IBIPphVwGAXeRRMABEP+wqALCLPAoGgOiHXQUAdpFHwQAQ/bCrAMAu8igYAKIfdhUA2EUeBQNA9MOuAgC7yKNgAIh+2FUAYBd5FAwA0Q+7CgDsIo+CASD6YVcBgF3kUTAARD/sKgCwizwKBoDoh10FAHaRR8EAEP2wqwDALvIoGACiH3YVANhFHgUDQPTDrgIAu8ijYACIfthVAGAXeRQMANEPuwoA7CKPggEg+mFXAYBd5FEwAEQ/7CoAsIs8CgaA6IddBQB2kUfBABD9sKsAwC7yKBgAoh92FQDYRR4FA0D0w64CALvIo2AAiH7YVQBgF3kUDADRD7sKAOwij4IBIPphVw1/M2jwEyJ2DpgL5gpgDsBfeI905rJ3A+AAAAAASUVORK5CYII=';
var texture_front = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAACRxJREFUeAHtXVeLVE0QrdU1hzVHjJhRMQfEnHANmAPoqw8iruC++xNkQR8EHwRFxYDog5gDqJgxK4qKGbOimHU/TkMPd3fn1s6MU/vVbFeBzp2u7rpdp053V3cPbF5xcXEpmQSLQI1gPTfHHQL5HoeioiL/aJ8BIFBSUuK8tBkggGBzLhoBOHQC0BkBAggy56IRgEMnAJ0RIIAgcy4aATh0AtAZAQIIMueiEYBDJwCdESCAIHMuGgE4dALQGQECCDLnohGAQycAnREggCBzLhoBOHQC0BkBAggy56IRgEMnAJ0RIIAgcy4aATh0AtAZAQIIMueiEYBDJwCdESCAIHMuGgE4dALQGQECCDLnohGAQycAnREggCBzLhoBOHQC0BkBAggy56IRgEMnAJ0RIIAgcy4aATh0AtAZAQIIMueiEYBDJwCdESCAIHMuGgE4dALQGQECCDLnohGAQycAnREggCBzLhoBOHQC0BkBAggy56IRgEMnAJ0RIIAgcy4aATh0AtAZAQIIMueiEYBDJwCdESCAIHMuGgE4dALQGQECCDLnohGAQycAnREggCBzLhoBOHQC0AVLgK9fv9KnT5/oz58/AYQ53sXE3wyKr5KeZseOHQRw05EZM2ZQq1at6O7du3T27NlKm9atW5eaN29Obdq0ob59+1LNmjUrbfPz50+6ePEiXb9+nZ4+fUq/f/9OtGncuDH17t2bhg4dSh07dkyUJ3vYunUrwdaAAQNo0KBByaokLTt9+jTdu3ePxo0bR127diX/PWnlFApbt25N06dPT6EmXyXrBICTX758SSkovmvfv393jx8+fHAkyMvLoxo14ien6Kht2rSpA6J///7eXIXP169f05YtW+jVq1dOV79+ferWrRsh8E+ePHHl58+fpwsXLtCkSZNo8uTJFWz4AviH/j58+JA6derkiOh13OfLly+dbyAOBH25f/9+0iZ///6l0tJS4nD49etX0rbpFmadAL4Da9euJYzUTGTUqFE0a9as2KYIwLt37+jcuXOEwG3bto0aNmzoRlb5Rjdu3KCdO3fSjx8/3OgbNmwYtWjRokw16B4/fkx79+6lI0eOuBliyZIlVK9evTL1ol8wC2C2W7FihQtUVJfK87x5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';
var texture_back = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAACoVJREFUeAHtXddrlFsQn8TYsfeGvfcuWFAU+4OIXURRsYJ5Cb74IP4J0ScRFbsgNlAUUcTeC/aCvffeldz7Gzi5X5L9Tr7djTsn98zAZne/06b8zsycOQtJy8rKyiElbzWQ7q3kKjhrIMPoITMz03zUdw80kJ2dzVKqB/DA2DYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgDwwMg2ERUANu140KYA8MDINhEVADbteNCmAPDAyDYRFQA27XjQpgCIYOTv37/Tx48fI/Qsfl1y/2dQqljfvHkzff361bpcuXLlqEKFClSzZk3q0KEDlS5d2to/2Pjnzx/asGED/f79m7p06UKdOnUKNkf6jDnOnTtHly5donv37tGvX794XMmSJal69erUpEkT6t+/P1WqVCl0PiPnlClTCOOi0KNHj2j//v2Uk5NDffv2pebNm0cZllSflAPg1q1b9PnzZypRokQo4zCAoZ07d7IyhgwZYh5Z369evUpXrlzhPu/fv48bANjp69atowcPHvAcAF+zZs2oRo0a9PbtW3r27BkdO3aMTp06Rb169aIRI0bElMXICVmiAODOnTu0evVq+vnzJw0fPjwlxoeAKQcAa/XfP4sXL6YyZcqYr3nef/z4Qe/evaMLFy6wsg8cOMDtUUBw4sQJSk9Pp9q1a9PTp08Ju6pBgwZ55g/7cvfuXVq/fj0DtHv37tSnTx+eJy0tLXcIduf58+dp3759dPToUfry5QtNnDgxtz2RDwDsxo0bCWAZM2YM9ejRI5FpEhrjZA6AXQcD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';
var texture_bottom = 'data:image/png;base64,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';
var texture_shadow = 'data:image/png;base64,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';

var viewerHelper =
/*#__PURE__*/
function () {
  function viewerHelper(_canvas_id, _controls, callback) {
    var _this = this;

    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0x0078A4;
    (0, _classCallCheck2.default)(this, viewerHelper);
    (0, _defineProperty2.default)(this, "onMouseDown", function (event) {
      if (!_this.enabled) return;
      _this.mouseMoving = false;
      _this.listenExternal = false;
    });
    (0, _defineProperty2.default)(this, "onMouseMove", function (event) {
      if (!_this.enabled) return;
      _this.mouseMoving = true;

      var rect = _this.canvas.getBoundingClientRect();

      _this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      _this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });
    (0, _defineProperty2.default)(this, "onMouseUp", function (event) {
      if (!_this.enabled) return;

      if (_this.mouseMoving == false) {
        if (_this.INTERSECTED) {
          _this.setViewAngle(_this.INTERSECTED.name);
        }
      } else if (_this.mouseMoving = true) {
        console.log('drag');
      }

      _this.listenExternal = true;
    });
    (0, _defineProperty2.default)(this, "createCube", function (size) {
      var top = _this.createTexturedPlane(size, texture_top);

      top.position.y = size / 2;
      top.rotation.x = -Math.PI / 2;

      _this.scene.add(top);

      var front = _this.createTexturedPlane(size, texture_front);

      front.position.z = size / 2;

      _this.scene.add(front);

      var right = _this.createTexturedPlane(size, texture_right);

      right.position.x = size / 2;
      right.rotation.y = Math.PI / 2;

      _this.scene.add(right);

      var left = _this.createTexturedPlane(size, texture_left);

      left.position.x = -size / 2;
      left.rotation.y = -Math.PI / 2;

      _this.scene.add(left);

      var back = _this.createTexturedPlane(size, texture_back);

      back.position.z = -size / 2;
      back.rotation.y = Math.PI;

      _this.scene.add(back);

      var bottom = _this.createTexturedPlane(size, texture_bottom);

      bottom.position.y = -size / 2;
      bottom.rotation.x = Math.PI / 2;

      _this.scene.add(bottom);

      var shadow = _this.createTexturedPlane(size + 4, texture_shadow, false);

      shadow.position.y = -size / 2 - 1;
      shadow.rotation.x = -Math.PI / 2;

      _this.scene.add(shadow);

      _this.controllers = new THREE.Object3D(); //FRONT,TOP,RIGHT

      var c0 = _this.createCornerCube(size, 1, 1, 1);

      c0.name = 'c0';

      _this.controllers.add(c0); //FRONT,BOTTOM,RIGHT


      var c1 = _this.createCornerCube(size, 1, -1, 1);

      c1.name = 'c1';

      _this.controllers.add(c1); //FRONT,BOTTOM,lEFT


      var c2 = _this.createCornerCube(size, -1, -1, 1);

      c2.name = 'c2';

      _this.controllers.add(c2); //FRONT,TOP,lEFT


      var c3 = _this.createCornerCube(size, -1, 1, 1);

      c3.name = 'c3';

      _this.controllers.add(c3); //BACK,TOP,RIGHT


      var c4 = _this.createCornerCube(size, 1, 1, -1);

      c4.name = 'c4';

      _this.controllers.add(c4); //BACK,BOTTOM,RIGHT


      var c5 = _this.createCornerCube(size, 1, -1, -1);

      c5.name = 'c5';

      _this.controllers.add(c5); //BACK,BOTTOM,LEFT


      var c6 = _this.createCornerCube(size, -1, -1, -1);

      c6.name = 'c6';

      _this.controllers.add(c6); //BACK,TOP,LEFT


      var c7 = _this.createCornerCube(size, -1, 1, -1);

      c7.name = 'c7';

      _this.controllers.add(c7); //TOP,FRONT


      var e0 = _this.createEdgeCube(size, 0, 1, 1);

      e0.name = 'e0';

      _this.controllers.add(e0); //TOP,BOTTOM


      var e1 = _this.createEdgeCube(size, 0, -1, 1);

      e1.name = 'e1';

      _this.controllers.add(e1); //TOP,BACK


      var e2 = _this.createEdgeCube(size, 0, 1, -1);

      e2.name = 'e2';

      _this.controllers.add(e2); //BOTTOM,BACK


      var e3 = _this.createEdgeCube(size, 0, -1, -1);

      e3.name = 'e3';

      _this.controllers.add(e3); //FRONT,RIGHT


      var e4 = _this.createEdgeCube(size, 1, 0, 1);

      e4.name = 'e4';

      _this.controllers.add(e4); //FRONT,LEFT


      var e5 = _this.createEdgeCube(size, -1, 0, 1);

      e5.name = 'e5';

      _this.controllers.add(e5); //BACK,LEFT


      var e6 = _this.createEdgeCube(size, 1, 0, -1);

      e6.name = 'e6';

      _this.controllers.add(e6); //BACK,LEFT


      var e7 = _this.createEdgeCube(size, -1, 0, -1);

      e7.name = 'e7';

      _this.controllers.add(e7); //BACK,LEFT


      var e8 = _this.createEdgeCube(size, 1, 1, 0);

      e8.name = 'e8';

      _this.controllers.add(e8); //TOP,RIGHT


      var e9 = _this.createEdgeCube(size, -1, 1, 0);

      e9.name = 'e9';

      _this.controllers.add(e9); //BOTTOM,RIGHT


      var e10 = _this.createEdgeCube(size, 1, -1, 0);

      e10.name = 'e10';

      _this.controllers.add(e10); //BOTTOM,LEFT


      var e11 = _this.createEdgeCube(size, -1, -1, 0);

      e11.name = 'e11';

      _this.controllers.add(e11); //RIGHT


      var f0 = _this.createFaceCube(size, 1, 0, 0);

      f0.name = 'f0';

      _this.controllers.add(f0); //TOP


      var f1 = _this.createFaceCube(size, 0, 1, 0);

      f1.name = 'f1';

      _this.controllers.add(f1); //FRONT


      var f2 = _this.createFaceCube(size, 0, 0, 1);

      f2.name = 'f2';

      _this.controllers.add(f2); //LEFT


      var f3 = _this.createFaceCube(size, -1, 0, 0);

      f3.name = 'f3';

      _this.controllers.add(f3); //BOTTOM


      var f4 = _this.createFaceCube(size, 0, -1, 0);

      f4.name = 'f4';

      _this.controllers.add(f4); //BACK


      var f5 = _this.createFaceCube(size, 0, 0, -1);

      f5.name = 'f5';

      _this.controllers.add(f5);

      _this.scene.add(_this.controllers);
    });
    (0, _defineProperty2.default)(this, "createTexturedPlane", function (size, texturePath) {
      var side = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : THREE.DoubleSide;
      var texture = new THREE.TextureLoader().load(texturePath);
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: false,
        visible: true,
        side: side
      });
      var geometry = new THREE.PlaneGeometry(size, size);
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
    });
    (0, _defineProperty2.default)(this, "setViewAngle", function (name) {
      var phi, theta;

      switch (name) {
        //Faces
        case 'f0':
          //RIGHT
          phi = Math.PI * 0.5;
          theta = Math.PI * 0.5;
          break;

        case 'f1':
          //TOP
          phi = 0;
          theta = 0;
          break;

        case 'f2':
          //FRONT
          phi = Math.PI * 0.5;
          theta = 0;
          break;

        case 'f3':
          //LEFT
          phi = Math.PI * 0.5;
          theta = -Math.PI * 0.5;
          break;

        case 'f4':
          //BOTTOM
          phi = Math.PI;
          theta = 0;
          break;

        case 'f5':
          //BACK
          phi = Math.PI * 0.5;
          theta = Math.PI;
          break;
        //corners

        case 'c0':
          //FRONT,TOP,RIGHT
          phi = Math.PI * 0.25;
          theta = Math.PI * 0.25;
          break;

        case 'c1':
          //FRONT,BOTTOM, RIGHT
          phi = Math.PI * 0.75;
          theta = Math.PI * 0.25;
          break;

        case 'c2':
          //FRONT,BOTTOM,lEFT
          phi = Math.PI * 0.75;
          theta = -Math.PI * 0.25;
          break;

        case 'c3':
          //FRONT,TOP,lEFT
          phi = Math.PI * 0.25;
          theta = -Math.PI * 0.25;
          break;

        case 'c4':
          //BACK,TOP,RIGHT
          phi = Math.PI * 0.25;
          theta = Math.PI * 0.75;
          break;

        case 'c5':
          //BACK,BOTTOM,RIGHT
          phi = Math.PI * 0.75;
          theta = Math.PI * 0.75;
          break;

        case 'c6':
          //BACK,BOTTOM,LEFT
          phi = Math.PI * 0.75;
          theta = -Math.PI * 0.75;
          break;

        case 'c7':
          //BACK,TOP,LEFT
          phi = Math.PI * 0.25;
          theta = -Math.PI * 0.75;
          break;
        //Edges

        case 'e0':
          //TOP,FRONT
          phi = Math.PI * 0.25;
          theta = 0;
          break;

        case 'e1':
          //TOP,BOTTOM
          phi = Math.PI * 0.75;
          theta = 0;
          break;

        case 'e2':
          //TOP,BACK
          phi = Math.PI * 0.25;
          theta = Math.PI;
          break;

        case 'e3':
          //BOTTOM,BACK
          phi = Math.PI * 0.75;
          theta = Math.PI;
          break;

        case 'e4':
          //FRONT,RIGHT
          phi = Math.PI * 0.5;
          theta = Math.PI * 0.25;
          break;

        case 'e5':
          //FRONT,LEFT
          phi = Math.PI * 0.5;
          theta = -Math.PI * 0.25;
          break;

        case 'e6':
          //BACK,RIGHT
          phi = Math.PI * 0.5;
          theta = Math.PI * 0.75;
          break;

        case 'e7':
          //BACK,LEFT
          phi = Math.PI * 0.5;
          theta = -Math.PI * 0.75;
          break;

        case 'e8':
          //BACK,LEFT
          phi = Math.PI * 0.25;
          theta = Math.PI * 0.5;
          break;

        case 'e9':
          //TOP,RIGHT
          phi = Math.PI * 0.25;
          theta = -Math.PI * 0.5;
          break;

        case 'e10':
          //BOTTOM,RIGHT
          phi = Math.PI * 0.75;
          theta = Math.PI * 0.5;
          break;

        case 'e11':
          //BOTTOM,LEFT
          phi = Math.PI * 0.75;
          theta = -Math.PI * 0.5;
          break;

        default:
      }

      if (_this.externalControls) {
        var original = _this.externalControls.getAngles();

        var coords = {
          x: original.phi,
          y: original.theta
        };
        var update = _this.UpdateAngles; // console.log("coords---", coords);

        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({
          x: phi,
          y: theta
        }, 500) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function () {
          //console.log("coords", coords);
          update(coords.x, coords.y);
        }).start(); // Start the tween immediately.
        // this.externalControls.setPolarAngle(phi);
        // this.externalControls.setAzimuthalAngle(theta);
        // this.externalControls.update();
      }
    });
    (0, _defineProperty2.default)(this, "UpdateAngles", function (phi, theta) {
      _this.externalControls.setPolarAngle(phi);

      _this.externalControls.setAzimuthalAngle(theta);

      _this.externalControls.update();
    });
    this.hoverColor = color;
    this.canvas = document.getElementById(_canvas_id);
    this.externalControls = _controls;
    this.listenExternal = true;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 10000);
    this.camera.position.set(0, 10, -30);
    this.camera.lookAt(new THREE.Vector3());
    this.enabled = true;
    var renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      //performance improvements
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true
    });
    renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer = renderer;
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    var cubeScale = 12;

    var _geometry = new THREE.BoxGeometry(cubeScale, cubeScale, cubeScale);

    var _material = new THREE.MeshBasicMaterial({
      color: 0x0000FF
    });

    var cube = new THREE.Mesh(_geometry, _material);
    cube.name = "cube1";
    var _size = 12;
    var AxisSize = _size + 4;
    var axisHelper = new THREE.AxesHelper(AxisSize);
    axisHelper.position.set(-_size / 2 - 0.25, -_size / 2 - 0.25, -_size / 2 - 0.25);
    this.scene.add(axisHelper); //creates the main cube

    this.createCube(_size); //User Interactions

    this.mouseMoving = false;
    this.mouse = new THREE.Vector2(-100000, -100000);
    this.raycaster = new THREE.Raycaster();
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.animate = this.animate.bind(this);
    this.animate();
  }

  (0, _createClass2.default)(viewerHelper, [{
    key: "animate",
    value: function animate(time) {
      requestAnimationFrame(this.animate);
      TWEEN.update(time);
      this.camera.updateMatrixWorld();
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.controllers.children);

      if (intersects.length > 0) {
        if (this.INTERSECTED != intersects[0].object) {
          if (this.INTERSECTED) {
            this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex); //<--putback

            this.INTERSECTED.material.visible = this.INTERSECTED.currVisible;
          }

          this.INTERSECTED = intersects[0].object;
          this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex(); //<-putback

          this.INTERSECTED.currVisible = this.INTERSECTED.material.visible; //INTERSECTED.material.color.setHex(hoverColor);

          this.INTERSECTED.material.visible = true;
        }
      } else {
        if (this.INTERSECTED) {
          this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex); //<-putback

          this.INTERSECTED.material.visible = this.INTERSECTED.currVisible;
        }

        this.INTERSECTED = null;
        this.controls.update();
      } //console.log("angles", this.externalControls.getAngles());


      if (this.listenExternal) {
        var _this$externalControl = this.externalControls.getAngles(),
            phi = _this$externalControl.phi,
            theta = _this$externalControl.theta;

        this.controls.setAngles(phi, theta);
      } else {
        var _this$controls$getAng = this.controls.getAngles(),
            _phi = _this$controls$getAng.phi,
            _theta = _this$controls$getAng.theta;

        this.externalControls.setPolarAngle(_phi);
        this.externalControls.setAzimuthalAngle(_theta);
        this.externalControls.update();
      }

      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "createFaceCube",
    value: function createFaceCube(size, x, y, z) {
      var c_cube = size / 4; //corner cubes

      var sizex = c_cube;
      var sizey = c_cube;
      var sizez = c_cube;

      if (x == 0) {
        sizey = size / 2;
        sizez = size / 2;
      }

      if (y == 0) {
        sizex = size / 2;
        sizez = size / 2;
      }

      if (z == 0) {
        sizex = size / 2;
        sizey = size / 2;
      }

      var _x = x * 1.01;

      var _y = y * 1.01;

      var _z = z * 1.01;

      var material = new THREE.MeshBasicMaterial({
        color: this.hoverColor,
        transparent: true,
        opacity: 0.5,
        visible: false
      }); //change to false later

      var geometry = new THREE.BoxGeometry(sizex, sizey, sizez);
      var edgeCube = new THREE.Mesh(geometry, material);

      if (x > 0) {
        edgeCube.position.x = size / 2 * _x - sizex / 2;
      } else {
        edgeCube.position.x = x == 0 ? 0 : size / 2 * _x + sizex / 2;
      }

      if (y > 0) {
        edgeCube.position.y = size / 2 * _y - sizey / 2;
      } else {
        edgeCube.position.y = y == 0 ? 0 : size / 2 * _y + sizey / 2;
      }

      if (z > 0) {
        edgeCube.position.z = size / 2 * _z - sizez / 2;
      } else {
        edgeCube.position.z = z == 0 ? 0 : size / 2 * _z + sizez / 2;
      }

      return edgeCube;
    }
  }, {
    key: "createEdgeCube",
    value: function createEdgeCube(size, x, y, z) {
      var c_cube = size / 4; //corner cubes

      var sizex = c_cube;
      var sizey = c_cube;
      var sizez = c_cube;

      if (x == 0) {
        sizex = size / 2;
      }

      if (y == 0) {
        sizey = size / 2;
      }

      if (z == 0) {
        sizez = size / 2;
      }

      var _x = x * 1.01;

      var _y = y * 1.01;

      var _z = z * 1.01;

      var c_cube = size / 4; //corner cubes
      //*creating small cubs

      var material = new THREE.MeshBasicMaterial({
        color: this.hoverColor,
        transparent: true,
        opacity: 0.5,
        visible: false
      }); //change to false later

      var geometry = new THREE.BoxGeometry(sizex, sizey, sizez); //this._createdOutlineCube(edgeCube);

      var edgeCube = new THREE.Mesh(geometry, material);

      if (x > 0) {
        edgeCube.position.x = size / 2 * _x - sizex / 2;
      } else {
        edgeCube.position.x = x == 0 ? 0 : size / 2 * _x + sizex / 2;
      }

      if (y > 0) {
        edgeCube.position.y = size / 2 * _y - sizey / 2;
      } else {
        edgeCube.position.y = y == 0 ? 0 : size / 2 * _y + sizey / 2;
      }

      if (z > 0) {
        edgeCube.position.z = size / 2 * _z - sizez / 2;
      } else {
        edgeCube.position.z = z == 0 ? 0 : size / 2 * _z + sizez / 2;
      }

      return edgeCube;
    }
  }, {
    key: "createCornerCube",
    value: function createCornerCube(size, x, y, z) {
      var _x = x * 1.01;

      var _y = y * 1.01;

      var _z = z * 1.01;

      var c_cube = size / 4; //corner cubes
      //*creating small cubs

      var material = new THREE.MeshBasicMaterial({
        color: this.hoverColor,
        transparent: true,
        opacity: 0.5,
        visible: false
      });
      var geometry = new THREE.BoxGeometry(c_cube, c_cube, c_cube);
      var cornerCube = new THREE.Mesh(geometry, material);

      if (x > 0) {
        cornerCube.position.x = size / 2 * _x - c_cube / 2;
      } else {
        cornerCube.position.x = size / 2 * _x + c_cube / 2;
      }

      if (y > 0) {
        cornerCube.position.y = size / 2 * _y - c_cube / 2;
      } else {
        cornerCube.position.y = size / 2 * _y + c_cube / 2;
      }

      if (z > 0) {
        cornerCube.position.z = size / 2 * _z - c_cube / 2;
      } else {
        cornerCube.position.z = size / 2 * _z + c_cube / 2;
      }

      return cornerCube;
    }
  }]);
  return viewerHelper;
}();

exports.default = viewerHelper;
},{"./utils/OrbitControls.js":"viewer/utils/OrbitControls.js"}],"viewer/utils/TransformControls.js":[function(require,module,exports) {
"use strict";

/**
 * @author arodic / https://github.com/arodic
 * @author lucascassiano / https://github.com/lucascassiano 
 * --added custom styled gizmos
 */
module.exports = function () {
  var THREE = require("three");

  var TransformControls = function TransformControls(camera, domElement) {
    THREE.Object3D.call(this);
    domElement = domElement !== undefined ? domElement : document;
    this.visible = false;

    var _gizmo = new TransformControlsGizmo();

    this.add(_gizmo);

    var _plane = new TransformControlsPlane();

    this.add(_plane);
    var scope = this; // Define properties with getters/setter
    // Setting the defined property will automatically trigger change event
    // Defined properties are passed down to gizmo and plane

    defineProperty("camera", camera);
    defineProperty("object", undefined);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "translate");
    defineProperty("translationSnap", null);
    defineProperty("rotationSnap", null);
    defineProperty("space", "world");
    defineProperty("size", 1);
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);
    var changeEvent = {
      type: "change"
    };
    var mouseDownEvent = {
      type: "mouseDown"
    };
    var mouseUpEvent = {
      type: "mouseUp",
      mode: scope.mode
    };
    var objectChangeEvent = {
      type: "objectChange"
    }; // Reusable utility variables

    var ray = new THREE.Raycaster();

    var _tempVector = new THREE.Vector3();

    var _tempVector2 = new THREE.Vector3();

    var _tempQuaternion = new THREE.Quaternion();

    var _unit = {
      X: new THREE.Vector3(1, 0, 0),
      Y: new THREE.Vector3(0, 1, 0),
      Z: new THREE.Vector3(0, 0, 1)
    };

    var _identityQuaternion = new THREE.Quaternion();

    var _alignVector = new THREE.Vector3();

    var pointStart = new THREE.Vector3();
    var pointEnd = new THREE.Vector3();
    var rotationAxis = new THREE.Vector3();
    var rotationAngle = 0;
    var cameraPosition = new THREE.Vector3();
    var cameraQuaternion = new THREE.Quaternion();
    var cameraScale = new THREE.Vector3();
    var parentPosition = new THREE.Vector3();
    var parentQuaternion = new THREE.Quaternion();
    var parentScale = new THREE.Vector3();
    var worldPositionStart = new THREE.Vector3();
    var worldQuaternionStart = new THREE.Quaternion();
    var worldScaleStart = new THREE.Vector3();
    var worldPosition = new THREE.Vector3();
    var worldQuaternion = new THREE.Quaternion();
    var worldScale = new THREE.Vector3();
    var eye = new THREE.Vector3();

    var _positionStart = new THREE.Vector3();

    var _quaternionStart = new THREE.Quaternion();

    var _scaleStart = new THREE.Vector3(); // TODO: remove properties unused in plane and gizmo


    defineProperty("parentQuaternion", parentQuaternion);
    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);
    {
      domElement.addEventListener("mousedown", onPointerDown, false);
      domElement.addEventListener("touchstart", onPointerDown, false);
      domElement.addEventListener("mousemove", onPointerHover, false);
      domElement.addEventListener("touchmove", onPointerHover, false);
      document.addEventListener("mousemove", onPointerMove, false);
      domElement.addEventListener("touchmove", onPointerMove, false);
      document.addEventListener("mouseup", onPointerUp, false);
      domElement.addEventListener("touchend", onPointerUp, false);
      domElement.addEventListener("touchcancel", onPointerUp, false);
      domElement.addEventListener("touchleave", onPointerUp, false);
      domElement.addEventListener("contextmenu", onContext, false);
    }

    this.dispose = function () {
      domElement.removeEventListener("mousedown", onPointerDown);
      domElement.removeEventListener("touchstart", onPointerDown);
      domElement.removeEventListener("mousemove", onPointerHover);
      domElement.removeEventListener("touchmove", onPointerHover);
      document.removeEventListener("mousemove", onPointerMove);
      domElement.removeEventListener("touchmove", onPointerMove);
      document.removeEventListener("mouseup", onPointerUp);
      domElement.removeEventListener("touchend", onPointerUp);
      domElement.removeEventListener("touchcancel", onPointerUp);
      domElement.removeEventListener("touchleave", onPointerUp);
      domElement.removeEventListener("contextmenu", onContext);
    }; // Set current object


    this.attach = function (object) {
      this.object = object;
      this.visible = true;
    }; // Detatch from object


    this.detach = function () {
      this.object = undefined;
      this.visible = false;
      this.axis = null;
    }; // Defined getter, setter and store for a property


    function defineProperty(propName, defaultValue) {
      var propValue = defaultValue;
      Object.defineProperty(scope, propName, {
        get: function get() {
          return propValue !== undefined ? propValue : defaultValue;
        },
        set: function set(value) {
          if (propValue !== value) {
            propValue = value;
            _plane[propName] = value;
            _gizmo[propName] = value;
            scope.dispatchEvent({
              type: propName + "-changed",
              value: value
            });
            scope.dispatchEvent(changeEvent);
          }
        }
      });
      scope[propName] = defaultValue;
      _plane[propName] = defaultValue;
      _gizmo[propName] = defaultValue;
    } // updateMatrixWorld  updates key transformation variables


    this.updateMatrixWorld = function () {
      if (this.object !== undefined) {
        this.object.updateMatrixWorld();
        this.object.parent.matrixWorld.decompose(parentPosition, parentQuaternion, parentScale);
        this.object.matrixWorld.decompose(worldPosition, worldQuaternion, worldScale);
      }

      this.camera.updateMatrixWorld();
      this.camera.matrixWorld.decompose(cameraPosition, cameraQuaternion, cameraScale);

      if (this.camera instanceof THREE.PerspectiveCamera) {
        eye.copy(cameraPosition).sub(worldPosition).normalize();
      } else if (this.camera instanceof THREE.OrthographicCamera) {
        eye.copy(cameraPosition).normalize();
      }

      THREE.Object3D.prototype.updateMatrixWorld.call(this);
    };

    this.pointerHover = function (pointer) {
      if (this.object === undefined || this.dragging === true || pointer.button !== undefined && pointer.button !== 0) return;
      ray.setFromCamera(pointer, this.camera);
      var intersect = ray.intersectObjects(_gizmo.picker[this.mode].children, true)[0] || false;

      if (intersect) {
        this.axis = intersect.object.name;
      } else {
        this.axis = null;
      }
    };

    this.pointerDown = function (pointer) {
      if (this.object === undefined || this.dragging === true || pointer.button !== undefined && pointer.button !== 0) return;

      if ((pointer.button === 0 || pointer.button === undefined) && this.axis !== null) {
        ray.setFromCamera(pointer, this.camera);
        var planeIntersect = ray.intersectObjects([_plane], true)[0] || false;

        if (planeIntersect) {
          var space = this.space;

          if (this.mode === 'scale') {
            space = 'local';
          } else if (this.axis === 'E' || this.axis === 'XYZE' || this.axis === 'XYZ') {
            space = 'world';
          }

          if (space === 'local' && this.mode === 'rotate') {
            var snap = this.rotationSnap;
            if (this.axis === 'X' && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
            if (this.axis === 'Y' && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
            if (this.axis === 'Z' && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
          }

          this.object.updateMatrixWorld();
          this.object.parent.updateMatrixWorld();

          _positionStart.copy(this.object.position);

          _quaternionStart.copy(this.object.quaternion);

          _scaleStart.copy(this.object.scale);

          this.object.matrixWorld.decompose(worldPositionStart, worldQuaternionStart, worldScaleStart);
          pointStart.copy(planeIntersect.point).sub(worldPositionStart);
          if (space === 'local') pointStart.applyQuaternion(worldQuaternionStart.clone().inverse());
        }

        this.dragging = true;
        mouseDownEvent.mode = this.mode;
        this.dispatchEvent(mouseDownEvent);
      }
    };

    this.pointerMove = function (pointer) {
      var axis = this.axis;
      var mode = this.mode;
      var object = this.object;
      var space = this.space;

      if (mode === 'scale') {
        space = 'local';
      } else if (axis === 'E' || axis === 'XYZE' || axis === 'XYZ') {
        space = 'world';
      }

      if (object === undefined || axis === null || this.dragging === false || pointer.button !== undefined && pointer.button !== 0) return;
      ray.setFromCamera(pointer, this.camera);
      var planeIntersect = ray.intersectObjects([_plane], true)[0] || false;
      if (planeIntersect === false) return;
      pointEnd.copy(planeIntersect.point).sub(worldPositionStart);
      if (space === 'local') pointEnd.applyQuaternion(worldQuaternionStart.clone().inverse());

      if (mode === 'translate') {
        if (axis.search('X') === -1) {
          pointEnd.x = pointStart.x;
        }

        if (axis.search('Y') === -1) {
          pointEnd.y = pointStart.y;
        }

        if (axis.search('Z') === -1) {
          pointEnd.z = pointStart.z;
        } // Apply translate


        if (space === 'local') {
          object.position.copy(pointEnd).sub(pointStart).applyQuaternion(_quaternionStart);
        } else {
          object.position.copy(pointEnd).sub(pointStart);
        }

        object.position.add(_positionStart); // Apply translation snap

        if (this.translationSnap) {
          if (space === 'local') {
            object.position.applyQuaternion(_tempQuaternion.copy(_quaternionStart).inverse());

            if (axis.search('X') !== -1) {
              object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
            }

            if (axis.search('Y') !== -1) {
              object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
            }

            if (axis.search('Z') !== -1) {
              object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
            }

            object.position.applyQuaternion(_quaternionStart);
          }

          if (space === 'world') {
            if (object.parent) {
              object.position.add(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
            }

            if (axis.search('X') !== -1) {
              object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
            }

            if (axis.search('Y') !== -1) {
              object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
            }

            if (axis.search('Z') !== -1) {
              object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
            }

            if (object.parent) {
              object.position.sub(_tempVector.setFromMatrixPosition(object.parent.matrixWorld));
            }
          }
        }
      } else if (mode === 'scale') {
        if (axis.search('XYZ') !== -1) {
          var d = pointEnd.length() / pointStart.length();
          if (pointEnd.dot(pointStart) < 0) d *= -1;

          _tempVector.set(d, d, d);
        } else {
          _tempVector.copy(pointEnd).divide(pointStart);

          if (axis.search('X') === -1) {
            _tempVector.x = 1;
          }

          if (axis.search('Y') === -1) {
            _tempVector.y = 1;
          }

          if (axis.search('Z') === -1) {
            _tempVector.z = 1;
          }
        } // Apply scale


        object.scale.copy(_scaleStart).multiply(_tempVector);
      } else if (mode === 'rotate') {
        var ROTATION_SPEED = 20 / worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));
        var quaternion = this.space === "local" ? worldQuaternion : _identityQuaternion;
        var unit = _unit[axis];

        if (axis === 'E') {
          _tempVector.copy(pointEnd).cross(pointStart);

          rotationAxis.copy(eye);
          rotationAngle = pointEnd.angleTo(pointStart) * (_tempVector.dot(eye) < 0 ? 1 : -1);
        } else if (axis === 'XYZE') {
          _tempVector.copy(pointEnd).sub(pointStart).cross(eye).normalize();

          rotationAxis.copy(_tempVector);
          rotationAngle = pointEnd.sub(pointStart).dot(_tempVector.cross(eye)) * ROTATION_SPEED;
        } else if (axis === 'X' || axis === 'Y' || axis === 'Z') {
          _alignVector.copy(unit).applyQuaternion(quaternion);

          rotationAxis.copy(unit);
          _tempVector = unit.clone();
          _tempVector2 = pointEnd.clone().sub(pointStart);

          if (space === 'local') {
            _tempVector.applyQuaternion(quaternion);

            _tempVector2.applyQuaternion(worldQuaternionStart);
          }

          rotationAngle = _tempVector2.dot(_tempVector.cross(eye).normalize()) * ROTATION_SPEED;
        } // Apply rotation snap


        if (this.rotationSnap) rotationAngle = Math.round(rotationAngle / this.rotationSnap) * this.rotationSnap;
        this.rotationAngle = rotationAngle; // Apply rotate

        if (space === 'local') {
          object.quaternion.copy(_quaternionStart);
          object.quaternion.multiply(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle));
        } else {
          object.quaternion.copy(_tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle));
          object.quaternion.multiply(_quaternionStart);
        }
      }

      this.dispatchEvent(changeEvent);
      this.dispatchEvent(objectChangeEvent);
    };

    this.pointerUp = function (pointer) {
      if (pointer.button !== undefined && pointer.button !== 0) return;

      if (this.dragging && this.axis !== null) {
        mouseUpEvent.mode = this.mode;
        this.dispatchEvent(mouseUpEvent);
      }

      this.dragging = false;
      if (pointer.button === undefined) this.axis = null;
    }; // normalize mouse / touch pointer and remap {x,y} to view space.


    function getPointer(event) {
      var pointer = event.changedTouches ? event.changedTouches[0] : event;
      var rect = domElement.getBoundingClientRect();
      return {
        x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
        y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
        button: event.button
      };
    } // mouse / touch event handlers


    function onContext(event) {
      event.preventDefault();
    }

    function onPointerHover(event) {
      if (!scope.enabled) return;
      scope.pointerHover(getPointer(event));
    }

    function onPointerDown(event) {
      if (!scope.enabled) return;
      event.preventDefault();
      scope.pointerHover(getPointer(event));
      scope.pointerDown(getPointer(event)); //scope.dispatchEvent(mouseDownEvent);
    }

    function onPointerMove(event) {
      if (!scope.enabled) return;
      event.preventDefault();
      scope.pointerMove(getPointer(event));
    }

    function onPointerUp(event) {
      if (!scope.enabled) return;
      event.preventDefault(); // Prevent MouseEvent on mobile

      scope.pointerUp(getPointer(event));
    } // TODO: depricate


    this.getMode = function () {
      return scope.mode;
    };

    this.setMode = function (mode) {
      scope.mode = mode;
    };

    this.setTranslationSnap = function (translationSnap) {
      scope.translationSnap = translationSnap;
    };

    this.setRotationSnap = function (rotationSnap) {
      scope.rotationSnap = rotationSnap;
    };

    this.setSize = function (size) {
      scope.size = size;
    };

    this.setSpace = function (space) {
      scope.space = space;
    };

    this.update = function () {
      console.warn('THREE.TransformControls: update function has been depricated.');
    };
  };

  TransformControls.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: TransformControls,
    isTransformControls: true
  });

  var TransformControlsGizmo = function TransformControlsGizmo() {
    'use strict';

    THREE.Object3D.call(this);
    this.type = 'TransformControlsGizmo'; // shared materials

    var gizmoMaterial = new THREE.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
      fog: false
    });
    var gizmoLineMaterial = new THREE.LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      fog: false
    }); // Make unique material for each axis/color

    var matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;
    var matHelper = gizmoMaterial.clone();
    matHelper.opacity = 0.33;
    var matRed = gizmoMaterial.clone();
    matRed.color.set(0xff0000);
    var matGreen = gizmoMaterial.clone();
    matGreen.color.set(0x00ff00);
    var matBlue = gizmoMaterial.clone();
    matBlue.color.set(0x0000ff);
    var matWhiteTransperent = gizmoMaterial.clone();
    matWhiteTransperent.opacity = 0.25;
    var matYellowTransparent = matWhiteTransperent.clone();
    matYellowTransparent.color.set(0xffff00);
    var matCyanTransparent = matWhiteTransperent.clone();
    matCyanTransparent.color.set(0x00ffff);
    var matMagentaTransparent = matWhiteTransperent.clone();
    matMagentaTransparent.color.set(0xff00ff);
    var matYellow = gizmoMaterial.clone();
    matYellow.color.set(0xffff00);
    var matLineRed = gizmoLineMaterial.clone();
    matLineRed.color.set(0xff0000);
    var matLineGreen = gizmoLineMaterial.clone();
    matLineGreen.color.set(0x00ff00);
    var matLineBlue = gizmoLineMaterial.clone();
    matLineBlue.color.set(0x0000ff);
    var matLineCyan = gizmoLineMaterial.clone();
    matLineCyan.color.set(0x00ffff);
    var matLineMagenta = gizmoLineMaterial.clone();
    matLineMagenta.color.set(0xff00ff);
    var matLineYellow = gizmoLineMaterial.clone();
    matLineYellow.color.set(0xffff00);
    var matLineGray = gizmoLineMaterial.clone();
    matLineGray.color.set(0x787878);
    var matLineYellowTransparent = matLineYellow.clone();
    matLineYellowTransparent.opacity = 0.25; // reusable geometry

    var arrowGeometry = new THREE.CylinderBufferGeometry(0, 0.05, 0.2, 12, 1, false);
    var scaleHandleGeometry = new THREE.BoxBufferGeometry(0.125, 0.125, 0.125);
    var lineGeometry = new THREE.BufferGeometry();
    lineGeometry.addAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));

    var CircleGeometry = function CircleGeometry(radius, arc) {
      var geometry = new THREE.BufferGeometry();
      var vertices = [];

      for (var i = 0; i <= 64 * arc; ++i) {
        vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);
      }

      geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      return geometry;
    }; // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position


    var TranslateHelperGeometry = function TranslateHelperGeometry(radius, arc) {
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));
      return geometry;
    }; // Gizmo definitions - custom hierarchy definitions for setupGizmo() function


    var gizmoTranslate = {
      X: [[new THREE.Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, -Math.PI / 2], null, 'fwd'], [new THREE.Mesh(arrowGeometry, matRed), [1, 0, 0], [0, 0, Math.PI / 2], null, 'bwd'], [new THREE.Line(lineGeometry, matLineRed)]],
      Y: [[new THREE.Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, 'fwd'], [new THREE.Mesh(arrowGeometry, matGreen), [0, 1, 0], [Math.PI, 0, 0], null, 'bwd'], [new THREE.Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]]],
      Z: [[new THREE.Mesh(arrowGeometry, matBlue), [0, 0, 1], [Math.PI / 2, 0, 0], null, 'fwd'], [new THREE.Mesh(arrowGeometry, matBlue), [0, 0, 1], [-Math.PI / 2, 0, 0], null, 'bwd'], [new THREE.Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]]],
      XYZ: [[new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.1, 0), matWhiteTransperent), [0, 0, 0], [0, 0, 0]]],
      XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.295, 0.295), matYellowTransparent), [0.15, 0.15, 0]], [new THREE.Line(lineGeometry, matLineYellow), [0.18, 0.3, 0], null, [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineYellow), [0.3, 0.18, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.295, 0.295), matCyanTransparent), [0, 0.15, 0.15], [0, Math.PI / 2, 0]], [new THREE.Line(lineGeometry, matLineCyan), [0, 0.18, 0.3], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineCyan), [0, 0.3, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.295, 0.295), matMagentaTransparent), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]], [new THREE.Line(lineGeometry, matLineMagenta), [0.18, 0, 0.3], null, [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineMagenta), [0.3, 0, 0.18], [0, -Math.PI / 2, 0], [0.125, 1, 1]]]
    };
    var pickerTranslate = {
      X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0.6, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0.6, 0]]],
      Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false), matInvisible), [0, 0, 0.6], [Math.PI / 2, 0, 0]]],
      XYZ: [[new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.2, 0), matInvisible)]],
      XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]]],
      YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), matInvisible), [0, 0.2, 0.2], [0, Math.PI / 2, 0]]],
      XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(0.4, 0.4), matInvisible), [0.2, 0, 0.2], [-Math.PI / 2, 0, 0]]]
    };
    var helperTranslate = {
      START: [[new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.01, 2), matHelper), null, null, null, 'helper']],
      END: [[new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.01, 2), matHelper), null, null, null, 'helper']],
      DELTA: [[new THREE.Line(TranslateHelperGeometry(), matHelper), null, null, null, 'helper']],
      X: [[new THREE.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
      Y: [[new THREE.Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']],
      Z: [[new THREE.Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']]
    };
    var gizmoRotate = {
      X: [[new THREE.Line(CircleGeometry(1, 0.5), matLineRed)], [new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.04, 0), matRed), [0, 0, 0.99], null, [1, 3, 1]]],
      Y: [[new THREE.Line(CircleGeometry(1, 0.5), matLineGreen), null, [0, 0, -Math.PI / 2]], [new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.04, 0), matGreen), [0, 0, 0.99], null, [3, 1, 1]]],
      Z: [[new THREE.Line(CircleGeometry(1, 0.5), matLineBlue), null, [0, Math.PI / 2, 0]], [new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.04, 0), matBlue), [0.99, 0, 0], null, [1, 3, 1]]],
      E: [[new THREE.Line(CircleGeometry(1.25, 1), matLineYellowTransparent), null, [0, Math.PI / 2, 0]], [new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [1.17, 0, 0], [0, 0, -Math.PI / 2], [1, 1, 0.001]], [new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [-1.17, 0, 0], [0, 0, Math.PI / 2], [1, 1, 0.001]], [new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, -1.17, 0], [Math.PI, 0, 0], [1, 1, 0.001]], [new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent), [0, 1.17, 0], [0, 0, 0], [1, 1, 0.001]]],
      XYZE: [[new THREE.Line(CircleGeometry(1, 1), matLineGray), null, [0, Math.PI / 2, 0]]]
    };
    var helperRotate = {
      AXIS: [[new THREE.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']]
    };
    var pickerRotate = {
      X: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
      Y: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [Math.PI / 2, 0, 0]]],
      Z: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, 0, -Math.PI / 2]]],
      E: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1.25, 0.1, 2, 24), matInvisible)]],
      XYZE: [[new THREE.Mesh(new THREE.SphereBufferGeometry(0.7, 10, 8), matInvisible)]]
    };
    var gizmoScale = {
      X: [[new THREE.Mesh(scaleHandleGeometry, matRed), [0.8, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]],
      Y: [[new THREE.Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]], [new THREE.Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2], [0.8, 1, 1]]],
      Z: [[new THREE.Mesh(scaleHandleGeometry, matBlue), [0, 0, 0.8], [Math.PI / 2, 0, 0]], [new THREE.Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0], [0.8, 1, 1]]],
      XY: [[new THREE.Mesh(scaleHandleGeometry, matYellowTransparent), [0.85, 0.85, 0], null, [2, 2, 0.2]], [new THREE.Line(lineGeometry, matLineYellow), [0.855, 0.98, 0], null, [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineYellow), [0.98, 0.855, 0], [0, 0, Math.PI / 2], [0.125, 1, 1]]],
      YZ: [[new THREE.Mesh(scaleHandleGeometry, matCyanTransparent), [0, 0.85, 0.85], null, [0.2, 2, 2]], [new THREE.Line(lineGeometry, matLineCyan), [0, 0.855, 0.98], [0, 0, Math.PI / 2], [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineCyan), [0, 0.98, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XZ: [[new THREE.Mesh(scaleHandleGeometry, matMagentaTransparent), [0.85, 0, 0.85], null, [2, 0.2, 2]], [new THREE.Line(lineGeometry, matLineMagenta), [0.855, 0, 0.98], null, [0.125, 1, 1]], [new THREE.Line(lineGeometry, matLineMagenta), [0.98, 0, 0.855], [0, -Math.PI / 2, 0], [0.125, 1, 1]]],
      XYZX: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [1.1, 0, 0]]],
      XYZY: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [0, 1.1, 0]]],
      XYZZ: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.125, 0.125, 0.125), matWhiteTransperent), [0, 0, 1.1]]]
    };
    var pickerScale = {
      X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0.5, 0, 0], [0, 0, -Math.PI / 2]]],
      Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0.5, 0]]],
      Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false), matInvisible), [0, 0, 0.5], [Math.PI / 2, 0, 0]]],
      XY: [[new THREE.Mesh(scaleHandleGeometry, matInvisible), [0.85, 0.85, 0], null, [3, 3, 0.2]]],
      YZ: [[new THREE.Mesh(scaleHandleGeometry, matInvisible), [0, 0.85, 0.85], null, [0.2, 3, 3]]],
      XZ: [[new THREE.Mesh(scaleHandleGeometry, matInvisible), [0.85, 0, 0.85], null, [3, 0.2, 3]]],
      XYZX: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]]],
      XYZY: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]]],
      XYZZ: [[new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]]]
    };
    var helperScale = {
      X: [[new THREE.Line(lineGeometry, matHelper.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], 'helper']],
      Y: [[new THREE.Line(lineGeometry, matHelper.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], 'helper']],
      Z: [[new THREE.Line(lineGeometry, matHelper.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], 'helper']]
    }; // Creates an Object3D with gizmos described in custom hierarchy definition.

    var setupGizmo = function setupGizmo(gizmoMap) {
      var gizmo = new THREE.Object3D();

      for (var name in gizmoMap) {
        for (var i = gizmoMap[name].length; i--;) {
          var object = gizmoMap[name][i][0].clone();
          var position = gizmoMap[name][i][1];
          var rotation = gizmoMap[name][i][2];
          var scale = gizmoMap[name][i][3];
          var tag = gizmoMap[name][i][4]; // name and tag properties are essential for picking and updating logic.

          object.name = name;
          object.tag = tag;

          if (position) {
            object.position.set(position[0], position[1], position[2]);
          }

          if (rotation) {
            object.rotation.set(rotation[0], rotation[1], rotation[2]);
          }

          if (scale) {
            object.scale.set(scale[0], scale[1], scale[2]);
          }

          object.updateMatrix();
          var tempGeometry = object.geometry.clone();
          tempGeometry.applyMatrix(object.matrix);
          object.geometry = tempGeometry;
          object.position.set(0, 0, 0);
          object.rotation.set(0, 0, 0);
          object.scale.set(1, 1, 1);
          gizmo.add(object);
        }
      }

      return gizmo;
    }; // Reusable utility variables


    var tempVector = new THREE.Vector3(0, 0, 0);
    var tempEuler = new THREE.Euler();
    var alignVector = new THREE.Vector3(0, 1, 0);
    var zeroVector = new THREE.Vector3(0, 0, 0);
    var lookAtMatrix = new THREE.Matrix4();
    var tempQuaternion = new THREE.Quaternion();
    var tempQuaternion2 = new THREE.Quaternion();
    var identityQuaternion = new THREE.Quaternion();
    var unitX = new THREE.Vector3(1, 0, 0);
    var unitY = new THREE.Vector3(0, 1, 0);
    var unitZ = new THREE.Vector3(0, 0, 1); // Gizmo creation

    this.gizmo = {};
    this.picker = {};
    this.helper = {};
    this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
    this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
    this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
    this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
    this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
    this.add(this.picker["scale"] = setupGizmo(pickerScale));
    this.add(this.helper["translate"] = setupGizmo(helperTranslate));
    this.add(this.helper["rotate"] = setupGizmo(helperRotate));
    this.add(this.helper["scale"] = setupGizmo(helperScale)); // Pickers should be hidden always

    this.picker["translate"].visible = false;
    this.picker["rotate"].visible = false;
    this.picker["scale"].visible = false; // updateMatrixWorld will update transformations and appearance of individual handles

    this.updateMatrixWorld = function () {
      var space = this.space;
      if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

      var quaternion = space === "local" ? this.worldQuaternion : identityQuaternion; // Show only gizmos for current transform mode

      this.gizmo["translate"].visible = this.mode === "translate";
      this.gizmo["rotate"].visible = this.mode === "rotate";
      this.gizmo["scale"].visible = this.mode === "scale";
      this.helper["translate"].visible = this.mode === "translate";
      this.helper["rotate"].visible = this.mode === "rotate";
      this.helper["scale"].visible = this.mode === "scale";
      var handles = [];
      handles = handles.concat(this.picker[this.mode].children);
      handles = handles.concat(this.gizmo[this.mode].children);
      handles = handles.concat(this.helper[this.mode].children);

      for (var i = 0; i < handles.length; i++) {
        var handle = handles[i]; // hide aligned to camera

        handle.visible = true;
        handle.rotation.set(0, 0, 0);
        handle.position.copy(this.worldPosition);
        var eyeDistance = this.worldPosition.distanceTo(this.cameraPosition);
        handle.scale.set(1, 1, 1).multiplyScalar(eyeDistance * this.size / 7); // TODO: simplify helpers and consider decoupling from gizmo

        if (handle.tag === 'helper') {
          handle.visible = false;

          if (handle.name === 'AXIS') {
            handle.position.copy(this.worldPositionStart);
            handle.visible = !!this.axis;

            if (this.axis === 'X') {
              tempQuaternion.setFromEuler(tempEuler.set(0, 0, 0));
              handle.quaternion.copy(quaternion).multiply(tempQuaternion);

              if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }

            if (this.axis === 'Y') {
              tempQuaternion.setFromEuler(tempEuler.set(0, 0, Math.PI / 2));
              handle.quaternion.copy(quaternion).multiply(tempQuaternion);

              if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }

            if (this.axis === 'Z') {
              tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
              handle.quaternion.copy(quaternion).multiply(tempQuaternion);

              if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                handle.visible = false;
              }
            }

            if (this.axis === 'XYZE') {
              tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0));
              alignVector.copy(this.rotationAxis);
              handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(zeroVector, alignVector, unitY));
              handle.quaternion.multiply(tempQuaternion);
              handle.visible = this.dragging;
            }

            if (this.axis === 'E') {
              handle.visible = false;
            }
          } else if (handle.name === 'START') {
            handle.position.copy(this.worldPositionStart);
            handle.visible = this.dragging;
          } else if (handle.name === 'END') {
            handle.position.copy(this.worldPosition);
            handle.visible = this.dragging;
          } else if (handle.name === 'DELTA') {
            handle.position.copy(this.worldPositionStart);
            handle.quaternion.copy(this.worldQuaternionStart);
            tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
            tempVector.applyQuaternion(this.worldQuaternionStart.clone().inverse());
            handle.scale.copy(tempVector);
            handle.visible = this.dragging;
          } else {
            handle.quaternion.copy(quaternion);

            if (this.dragging) {
              handle.position.copy(this.worldPositionStart);
            } else {
              handle.position.copy(this.worldPosition);
            }

            if (this.axis) {
              handle.visible = this.axis.search(handle.name) !== -1;
            }
          } // If updating helper, skip rest of the loop


          continue;
        } // Align handles to current local or world rotation


        handle.quaternion.copy(quaternion);

        if (this.mode === 'translate' || this.mode === 'scale') {
          // Hide translate and scale axis facing the camera
          var AXIS_HIDE_TRESHOLD = 0.99;
          var PLANE_HIDE_TRESHOLD = 0.2;
          var AXIS_FLIP_TRESHOLD = -0.4;

          if (handle.name === 'X' || handle.name === 'XYZX') {
            if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }

          if (handle.name === 'Y' || handle.name === 'XYZY') {
            if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }

          if (handle.name === 'Z' || handle.name === 'XYZZ') {
            if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }

          if (handle.name === 'XY') {
            if (Math.abs(alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }

          if (handle.name === 'YZ') {
            if (Math.abs(alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          }

          if (handle.name === 'XZ') {
            if (Math.abs(alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
              handle.scale.set(1e-10, 1e-10, 1e-10);
              handle.visible = false;
            }
          } // Flip translate and scale axis ocluded behind another axis


          if (handle.name.search('X') !== -1) {
            if (alignVector.copy(unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === 'fwd') {
                handle.visible = false;
              } else {
                handle.scale.x *= -1;
              }
            } else if (handle.tag === 'bwd') {
              handle.visible = false;
            }
          }

          if (handle.name.search('Y') !== -1) {
            if (alignVector.copy(unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === 'fwd') {
                handle.visible = false;
              } else {
                handle.scale.y *= -1;
              }
            } else if (handle.tag === 'bwd') {
              handle.visible = false;
            }
          }

          if (handle.name.search('Z') !== -1) {
            if (alignVector.copy(unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
              if (handle.tag === 'fwd') {
                handle.visible = false;
              } else {
                handle.scale.z *= -1;
              }
            } else if (handle.tag === 'bwd') {
              handle.visible = false;
            }
          }
        } else if (this.mode === 'rotate') {
          // Align handles to current local or world rotation
          tempQuaternion2.copy(quaternion);
          alignVector.copy(this.eye).applyQuaternion(tempQuaternion.copy(quaternion).inverse());

          if (handle.name.search("E") !== -1) {
            handle.quaternion.setFromRotationMatrix(lookAtMatrix.lookAt(this.eye, zeroVector, unitY));
          }

          if (handle.name === 'X') {
            tempQuaternion.setFromAxisAngle(unitX, Math.atan2(-alignVector.y, alignVector.z));
            tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
            handle.quaternion.copy(tempQuaternion);
          }

          if (handle.name === 'Y') {
            tempQuaternion.setFromAxisAngle(unitY, Math.atan2(alignVector.x, alignVector.z));
            tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
            handle.quaternion.copy(tempQuaternion);
          }

          if (handle.name === 'Z') {
            tempQuaternion.setFromAxisAngle(unitZ, Math.atan2(alignVector.y, alignVector.x));
            tempQuaternion.multiplyQuaternions(tempQuaternion2, tempQuaternion);
            handle.quaternion.copy(tempQuaternion);
          }
        } // Hide disabled axes


        handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
        handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
        handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
        handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ); // highlight selected axis

        handle.material._opacity = handle.material._opacity || handle.material.opacity;
        handle.material._color = handle.material._color || handle.material.color.clone();
        handle.material.color.copy(handle.material._color);
        handle.material.opacity = handle.material._opacity;

        if (!this.enabled) {
          handle.material.opacity *= 0.5;
          handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5);
        } else if (this.axis) {
          if (handle.name === this.axis) {
            handle.material.opacity = 1.0;
            handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5);
          } else if (this.axis.split('').some(function (a) {
            return handle.name === a;
          })) {
            handle.material.opacity = 1.0;
            handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5);
          } else {
            handle.material.opacity *= 0.25;
            handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5);
          }
        }
      }

      THREE.Object3D.prototype.updateMatrixWorld.call(this);
    };
  };

  TransformControlsGizmo.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
    constructor: TransformControlsGizmo,
    isTransformControlsGizmo: true
  });

  var TransformControlsPlane = function TransformControlsPlane() {
    'use strict';

    THREE.Mesh.call(this, new THREE.PlaneBufferGeometry(100000, 100000, 2, 2), new THREE.MeshBasicMaterial({
      visible: false,
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1
    }));
    this.type = 'TransformControlsPlane';
    var unitX = new THREE.Vector3(1, 0, 0);
    var unitY = new THREE.Vector3(0, 1, 0);
    var unitZ = new THREE.Vector3(0, 0, 1);
    var tempVector = new THREE.Vector3();
    var dirVector = new THREE.Vector3();
    var alignVector = new THREE.Vector3();
    var tempMatrix = new THREE.Matrix4();
    var identityQuaternion = new THREE.Quaternion();

    this.updateMatrixWorld = function () {
      var space = this.space;
      this.position.copy(this.worldPosition);
      if (this.mode === 'scale') space = 'local'; // scale always oriented to local rotation

      unitX.set(1, 0, 0).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion);
      unitY.set(0, 1, 0).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion);
      unitZ.set(0, 0, 1).applyQuaternion(space === "local" ? this.worldQuaternion : identityQuaternion); // Align the plane for current transform mode, axis and space.

      alignVector.copy(unitY);

      switch (this.mode) {
        case 'translate':
        case 'scale':
          switch (this.axis) {
            case 'X':
              alignVector.copy(this.eye).cross(unitX);
              dirVector.copy(unitX).cross(alignVector);
              break;

            case 'Y':
              alignVector.copy(this.eye).cross(unitY);
              dirVector.copy(unitY).cross(alignVector);
              break;

            case 'Z':
              alignVector.copy(this.eye).cross(unitZ);
              dirVector.copy(unitZ).cross(alignVector);
              break;

            case 'XY':
              dirVector.copy(unitZ);
              break;

            case 'YZ':
              dirVector.copy(unitX);
              break;

            case 'XZ':
              alignVector.copy(unitZ);
              dirVector.copy(unitY);
              break;

            case 'XYZ':
            case 'E':
              dirVector.set(0, 0, 0);
              break;
          }

          break;

        case 'rotate':
        default:
          // special case for rotate
          dirVector.set(0, 0, 0);
      }

      if (dirVector.length() === 0) {
        // If in rotate mode, make the plane parallel to camera
        this.quaternion.copy(this.cameraQuaternion);
      } else {
        tempMatrix.lookAt(tempVector.set(0, 0, 0), dirVector, alignVector);
        this.quaternion.setFromRotationMatrix(tempMatrix);
      }

      THREE.Object3D.prototype.updateMatrixWorld.call(this);
    };
  };

  TransformControlsPlane.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: TransformControlsPlane,
    isTransformControlsPlane: true
  });
  return TransformControls;
};
},{}],"viewer/viewer.js":[function(require,module,exports) {
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _statsJs = _interopRequireDefault(require("stats-js"));

var _sky = _interopRequireDefault(require("./sky"));

var _grid = _interopRequireDefault(require("./grid"));

var _viewerHelper = _interopRequireDefault(require("./viewerHelper"));

var _store = _interopRequireWildcard(require("../store"));

var OrbitControls = require('./utils/OrbitControls.js')(THREE);

var OBJLoader = require('three-obj-loader');

OBJLoader(THREE);

var TransformControls = require("./utils/TransformControls")(THREE);

var Viewer =
/*#__PURE__*/
function () {
  function Viewer() {
    var _this = this;

    var antialias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (0, _classCallCheck2.default)(this, Viewer);
    (0, _defineProperty2.default)(this, "onMouseMove", function (event) {
      _this.mouse.x = event.clientX / _this.renderer.domElement.clientWidth * 2 - 1;
      _this.mouse.y = -(event.clientY / _this.renderer.domElement.clientHeight) * 2 + 1;
    });
    (0, _defineProperty2.default)(this, "onMouseDown", function (event) {
      if (_this.INTERSECTED && event.button == 2) {
        console.log(event);
        console.log(_this.INTERSECTED.name);
      }

      if (_this.INTERSECTED && event.button == 0) {
        _this.updateSelectedObject(_this.INTERSECTED);

        console.log(_store.default.getState().environment);
        console.log(_this.INTERSECTED.name);
        _this.INTERSECTED_selected = _this.INTERSECTED;
        if (_this.INTERSECTED_box) _this.scene.remove(_this.INTERSECTED_box);
        _this.INTERSECTED_box = new THREE.BoxHelper(_this.INTERSECTED, 0x55ddff);

        _this.scene.add(_this.INTERSECTED_box);
      }
    });
    (0, _defineProperty2.default)(this, "animate", function () {
      requestAnimationFrame(_this.animate); // update the picking ray with the camera and mouse position

      _this.raycaster.setFromCamera(_this.mouse, _this.camera); // calculate objects intersecting the picking ray


      var intersects = _this.raycaster.intersectObjects(_this.interactiveObjects.children); // if there is one (or more) intersections


      if (intersects.length) {
        if (intersects[0].object != _this.INTERSECTED) {
          _this.INTERSECTED = intersects[0].object;

          if (_this.INTERSECTED) {//INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            //INTERSECTED.material.color.setHex(0xffff00);
          } else _this.INTERSECTED = null;
        }
      } else {
        if (_this.INTERSECTED) _this.INTERSECTED = null;
      }

      if (_this.INTERSECTED_box) {
        _this.INTERSECTED_box.update();
      }

      if (_this.controls.enabled) _this.controls.update(); //stats.begin();

      _this.cube.rotation.x = window.pos3d.x * 5;
      _this.cube.rotation.y = window.pos3d.y * 5; // your code goes here

      _this.renderer.render(_this.scene, _this.camera); //stats.end();

    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(0, 10, -30);
    this.camera.lookAt(new THREE.Vector3());
    this.canvas = document.getElementById("3d-env");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: antialias,
      alpha: false,
      //performance improvements
      preserveDrawingBuffer: true,
      failIfMajorPerformanceCaveat: true
    });
    this.renderer.sortObjects = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.interactiveObjects = new THREE.Group();
    this.scene.add(this.interactiveObjects);
    /* 
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
    */
    //scene.add(cube);

    var tControl = new TransformControls(this.camera, this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.canvas);
    var sky = new _sky.default();
    this.scene.add(sky.getObject(THREE)); //cubeview

    var viewerHelper = new _viewerHelper.default("viewer-helper", this.controls);
    this.controls.setPolarAngle(Math.PI * 0.25);
    this.controls.setAzimuthalAngle(Math.PI * 0.25);
    this.controls.update();
    var gridHelper = new _grid.default(); //new THREE.GridHelper(100, 100, 0xaaaaaa, 0x666666);

    this.scene.add(gridHelper); //raycast

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.INTERSECTED;
    this.INTERSECTED_box;
    this.INTERSECTED_selected;
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mousedown', this.onMouseDown, false);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    this.cube = new THREE.Mesh(geometry, material); //tControl.addEventListener('change', this.animate);

    tControl.addEventListener('mouseDown', function (event) {
      _this.controls.enabled = false;
      viewerHelper.enabled = false;
    });
    tControl.addEventListener('mouseUp', function (event) {
      _this.controls.enabled = true;
      viewerHelper.enabled = true;
    });
    tControl.attach(this.cube);
    this.scene.add(tControl);
    this.scene.add(this.cube);
  }

  (0, _createClass2.default)(Viewer, [{
    key: "getObjectByName",
    value: function getObjectByName(name) {}
  }]);
  return Viewer;
}();

window.onload = function () {
  var viewer = new Viewer();
  viewer.animate();
  window.viewer = viewer;
}; //load obj
// instantiate a loader
//var loader = new THREE.OBJLoader();

/*
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

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);
*/
},{"./sky":"viewer/sky.js","./grid":"viewer/grid.js","./viewerHelper":"viewer/viewerHelper.js","../store":"store/index.js","./utils/OrbitControls.js":"viewer/utils/OrbitControls.js","./utils/TransformControls":"viewer/utils/TransformControls.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactHotLoader = require("react-hot-loader");

var _reactRedux = require("react-redux");

var _App = _interopRequireDefault(require("./App.js"));

require("./index.css");

var _store = _interopRequireDefault(require("./store"));

require("./viewer/viewer.js");

//export let actions = new Actions(store);
window.store = _store.default;
window.pos3d = {
  x: 0,
  y: 0
};

var render = function render() {
  _reactDom.default.render(_react.default.createElement(_reactHotLoader.AppContainer, null, _react.default.createElement(_reactRedux.Provider, {
    store: _store.default
  }, _react.default.createElement(_App.default, null))), window.document.getElementById('app'));
};

if (typeof window !== 'undefined') {
  render();
}

if (module.hot) {
  module.hot.accept(render);
}

window.focus(); //execute the viewer

//let viewer = new Viewer(store);
//Menu
var _require = require('electron'),
    remote = _require.remote;

var Menu = remote.Menu,
    MenuItem = remote.MenuItem;
/*
const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup({ window: remote.getCurrentWindow() })
}, false);
*/
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
//# sourceMappingURL=src.e31bb0bc.map