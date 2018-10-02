"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    var c = u(n[n.length - 1]);"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }return u;
}({ "NyPj": [function (require, module, exports) {
    "use strict";
    module.exports = "logo.91054b55.svg";
  }, {}], "lY9v": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });var e = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        t = require("react"),
        r = c(t),
        n = require("react-dom"),
        o = c(n),
        u = require("react-hot-loader"),
        i = require("./icons/logo.svg"),
        a = c(i);function c(e) {
      return e && e.__esModule ? e : { default: e };
    }function l(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }function f(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
    }function p(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }var s = function (n) {
      function o() {
        return l(this, o), f(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments));
      }return p(o, t.Component), e(o, [{ key: "render", value: function value() {
          return r.default.createElement("div", null, "Hello from React ", r.default.createElement("img", { src: a.default }));
        } }]), o;
    }();exports.default = s;
  }, { "./icons/logo.svg": "NyPj" }], "Focm": [function (require, module, exports) {
    "use strict";
    var e = require("react"),
        t = l(e),
        r = require("react-dom"),
        u = l(r),
        n = require("react-hot-loader"),
        d = require("./App.js"),
        a = l(d);function l(e) {
      return e && e.__esModule ? e : { default: e };
    }var o = function o() {
      u.default.render(t.default.createElement(n.AppContainer, null, t.default.createElement(a.default, null)), window.document.getElementById("app"));
    };"undefined" != typeof window && o(), module.hot && module.hot.accept(o);
  }, { "./App.js": "lY9v" }] }, {}, ["Focm"], null);
//# sourceMappingURL=index.map