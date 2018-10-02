"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.HMR_PORT = 0;process.env.HMR_HOSTNAME = "localhost";parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;if (!t && f) return f(n, !0);if (i) return i(n, !0);if (o && "string" == typeof n) return o(n);var c = new Error("Cannot find module '" + n + "'");throw c.code = "MODULE_NOT_FOUND", c;
      }p.resolve = function (r) {
        return e[n][1][r] || r;
      };var l = r[n] = new u.Module(n);e[n][0].call(l.exports, p, l, l.exports, this);
    }return r[n].exports;function p(e) {
      return u(p.resolve(e));
    }
  }u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }if (n.length) {
    var c = u(n[n.length - 1]);"object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }return u;
}({ "NyPj": [function (require, module, exports) {
    "use strict";
    module.exports = "logo.ad905280.svg";
  }, {}], "6cnO": [function (require, module, exports) {
    "use strict";
    module.exports = "github.23f3db4f.svg";
  }, {}], "pKEH": [function (require, module, exports) {
    "use strict";
  }, {}], "lY9v": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });var e = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), (0, _defineProperty2.default)(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        t = require("react"),
        r = s(t),
        n = require("react-dom"),
        o = s(n),
        a = require("react-hot-loader"),
        c = require("./icons/logo.svg"),
        u = s(c),
        l = require("./icons/github.svg"),
        i = s(l),
        f = require("electron");function s(e) {
      return e && e.__esModule ? e : { default: e };
    }function p(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function b(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && "function" != typeof t ? e : t;
    }function h(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)));e.prototype = (0, _create2.default)(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(e, t) : e.__proto__ = t);
    }require("./app.css");var d = function (n) {
      function o() {
        var e, t, r;p(this, o);for (var n = arguments.length, a = Array(n), c = 0; c < n; c++) {
          a[c] = arguments[c];
        }return t = r = b(this, (e = o.__proto__ || (0, _getPrototypeOf2.default)(o)).call.apply(e, [this].concat(a))), r.onClick = function () {
          alert("hey"), f.shell.openExternal("https://github.com/lucascassiano/react-electron-parcel");
        }, b(r, t);
      }return h(o, t.Component), e(o, [{ key: "render", value: function value() {
          return r.default.createElement("div", { className: "content" }, r.default.createElement("img", { className: "logo", src: u.default }), r.default.createElement("h1", null, "React + Electron"), r.default.createElement("button", { onClick: this.onClick }, " ", r.default.createElement("img", { src: i.default }), " Fork me on Github"));
        } }]), o;
    }();exports.default = d;
  }, { "./icons/logo.svg": "NyPj", "./icons/github.svg": "6cnO", "./app.css": "pKEH" }], "Focm": [function (require, module, exports) {
    "use strict";
    var e = require("react"),
        t = l(e),
        r = require("react-dom"),
        u = l(r),
        n = require("react-hot-loader"),
        d = require("./App.js"),
        a = l(d);function l(e) {
      return e && e.__esModule ? e : { default: e };
    }require("./index.css");var o = function o() {
      u.default.render(t.default.createElement(n.AppContainer, null, t.default.createElement(a.default, null)), window.document.getElementById("app"));
    };"undefined" != typeof window && o(), module.hot && module.hot.accept(o);
  }, { "./App.js": "lY9v", "./index.css": "pKEH" }] }, {}, ["Focm"], null);
//# sourceMappingURL=src.aa2a9d30.map