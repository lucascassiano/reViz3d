process.env.HMR_PORT=63074;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
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
},{}],"App.js":[function(require,module,exports) {
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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactHotLoader = require("react-hot-loader");

var _logo = _interopRequireDefault(require("./icons/logo.svg"));

var _github = _interopRequireDefault(require("./icons/github.svg"));

var _electron = require("electron");

require("./app.css");

var _reactRedux = require("react-redux");

var _store = require("./store");

//import Menu from "./components/Menu";
var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "render",

    /*
    onClick = () => {
        toggleMenu();
    }*/
    value: function render() {
      console.log('props', this.props);
      return _react.default.createElement("div", null);
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
},{"./icons/logo.svg":"icons/logo.svg","./icons/github.svg":"icons/github.svg","./app.css":"app.css","./store":"store/index.js"}],"index.css":[function(require,module,exports) {
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
      //console.log( 'handleMouseDownRotate' );
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
      //console.log( 'handleMouseMoveRotate' );
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
      if (scope.enabled === false) return;
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
      if (scope.enabled === false) return;
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
      if (scope.enabled === false) return;
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

var THREE = _interopRequireWildcard(require("three"));

/*implements the new version of view cube*/
var OrbitControls = require('./utils/OrbitControls.js')(THREE);

var viewerHelper =
/*#__PURE__*/
function () {
  function viewerHelper(_canvas_id, _controls) {
    (0, _classCallCheck2.default)(this, viewerHelper);
    this.canvas = document.getElementById(_canvas_id);
    this.externalControls = _controls;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 10000);
    this.camera.position.set(0, 10, -30);
    this.camera.lookAt(new THREE.Vector3());
    var renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true
    });
    renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer = renderer;
    this.controls = new OrbitControls(this.camera);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    var cubeScale = 12;
    var geometry = new THREE.BoxGeometry(cubeScale, cubeScale, cubeScale);
    var material = new THREE.MeshBasicMaterial({
      color: 0x0000FF
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.name = "cube1"; //this.scene.add(cube);

    var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    var cylinder = new THREE.Mesh(geometry, material);
    this.scene.add(cylinder);
    var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
    var material = new THREE.MeshBasicMaterial({
      color: 0xFF0000
    });
    var cylinder = new THREE.Mesh(geometry, material);
    this.scene.add(cylinder);
    var geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 6);
    var material = new THREE.MeshBasicMaterial({
      color: 0x0000FF
    });
    var cylinder = new THREE.Mesh(geometry, material);
    this.scene.add(cylinder);
    this.animate = this.animate.bind(this);
    this.animate();
  }

  (0, _createClass2.default)(viewerHelper, [{
    key: "animate",
    value: function animate() {
      requestAnimationFrame(this.animate); // update the picking ray with the camera and mouse position
      //raycaster.setFromCamera(mouse, camera);
      // calculate objects intersecting the picking ray
      //var intersects = raycaster.intersectObjects(interactiveObjects.children);

      /*
              // if there is one (or more) intersections
              if (intersects.length) {
                  if (intersects[0].object != INTERSECTED) {
                      INTERSECTED = intersects[0].object;
                      if (INTERSECTED) {
                          //INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                          //INTERSECTED.material.color.setHex(0xffff00);
                      }
                      else
                          INTERSECTED = null;
                  }
              }
              else {
                  if (INTERSECTED)
                      INTERSECTED = null;
              }
      
              if (INTERSECTED_box) {
                  INTERSECTED_box.update();
              }
      */
      //console.log("angles", this.externalControls.getAngles());

      var _this$externalControl = this.externalControls.getAngles(),
          phi = _this$externalControl.phi,
          theta = _this$externalControl.theta;

      this.controls.setAngles(phi, theta);
      this.renderer.render(this.scene, this.camera);
    }
  }]);
  return viewerHelper;
}();

exports.default = viewerHelper;
},{"./utils/OrbitControls.js":"viewer/utils/OrbitControls.js"}],"viewer/viewer.js":[function(require,module,exports) {
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var THREE = _interopRequireWildcard(require("three"));

var _sky = _interopRequireDefault(require("./sky"));

var _viewerHelper = _interopRequireDefault(require("./viewerHelper"));

var _store = _interopRequireWildcard(require("../store"));

var OrbitControls = require('./utils/OrbitControls.js')(THREE);

var OBJLoader = require('three-obj-loader');

OBJLoader(THREE);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 10, -30);
camera.lookAt(new THREE.Vector3());
var canvas = document.getElementById("3d-env");
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.0);
renderer.setPixelRatio(window.devicePixelRatio);
/* --- for ambiente occlusions
composer = new THREE.EffectComposer( renderer );
				renderPass = new THREE.RenderPass( scene, camera );
				composer.addPass( renderPass );
				saoPass = new THREE.SAOPass( scene, camera, false, true );
				saoPass.renderToScreen = true;
				composer.addPass( saoPass );
*/

var interactiveObjects = new THREE.Group();
scene.add(interactiveObjects);
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({
  color: 0x000000
});
var cube = new THREE.Mesh(geometry, material);
cube.name = "cube1";
interactiveObjects.add(cube);
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ffFF
});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 7.5;
cube.name = "cube2";
interactiveObjects.add(cube);
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ffFF
});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 15;
cube.name = "cube3";
interactiveObjects.add(cube); //scene.add(cube);

var controls = new OrbitControls(camera);
var sky = new _sky.default();
scene.add(sky.getObject(THREE)); //cubeview

var viewerHelper = new _viewerHelper.default("viewer-helper", controls);
var gridHelper = new THREE.GridHelper(100, 100, 0xaaaaaa, 0x666666);
scene.add(gridHelper); //raycast

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
    console.log(_store.default.getState().environment);
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
  requestAnimationFrame(animate); // update the picking ray with the camera and mouse position

  raycaster.setFromCamera(mouse, camera); // calculate objects intersecting the picking ray

  var intersects = raycaster.intersectObjects(interactiveObjects.children); // if there is one (or more) intersections

  if (intersects.length) {
    if (intersects[0].object != INTERSECTED) {
      INTERSECTED = intersects[0].object;

      if (INTERSECTED) {//INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
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
} //load obj
// instantiate a loader


var loader = new THREE.OBJLoader();
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

animate();
},{"./sky":"viewer/sky.js","./viewerHelper":"viewer/viewerHelper.js","../store":"store/index.js","./utils/OrbitControls.js":"viewer/utils/OrbitControls.js"}],"index.js":[function(require,module,exports) {
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
var menu = new Menu();
menu.append(new MenuItem({
  label: 'MenuItem1',
  click: function click() {
    console.log('item 1 clicked');
  }
}));
menu.append(new MenuItem({
  type: 'separator'
}));
menu.append(new MenuItem({
  label: 'MenuItem2',
  type: 'checkbox',
  checked: true
}));
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup({
    window: remote.getCurrentWindow()
  });
}, false);
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