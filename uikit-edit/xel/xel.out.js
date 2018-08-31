"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        box-sizing: border-box;\n        --arrow-width: 24px;\n        --arrow-height: 24px;\n        --arrow-color: currentColor;\n        --arrow-align: flex-end;\n        --arrow-d: path(\"M 29.0 31.4 L 50 52.3 L 70.9 31.4 L 78.5 40.0 L 50 68.5 L 21.2 40.3 L 29.0 31.4 Z\");\n        --arrow-transform: rotate(0deg);\n        --focused-arrow-background: transparent;\n        --focused-arrow-outline: none;\n        --trigger-effect: none; /* ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.05;\n      }\n      :host([expanded]) {\n        --arrow-transform: rotate(-180deg);\n      }\n      :host([animating]) {\n        overflow: hidden;\n      }\n\n      #main {\n        position: relative;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        border-radius: inherit;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow-container {\n        position: absolute;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: var(--arrow-align);\n        pointer-events: none;\n      }\n\n      #arrow {\n        margin: 0 14px 0 0;\n        display: flex;\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-width);\n        color: var(--arrow-color);\n        d: var(--arrow-d);\n        transform: var(--arrow-transform);\n        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      #arrow:focus {\n        background: var(--focused-arrow-background);\n        outline: var(--focused-arrow-outline);\n      }\n\n      #arrow path {\n        fill: currentColor;\n        d: inherit;\n}\n    </style>\n\n    <main id=\"main\">\n      <div id=\"ripples\"></div>\n\n      <div id=\"arrow-container\">\n        <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" tabindex=\"1\">\n          <path></path>\n        </svg>\n      </div>\n\n      <slot></slot>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        box-sizing: border-box;\n        --arrow-width: 24px;\n        --arrow-height: 24px;\n        --arrow-color: currentColor;\n        --arrow-align: flex-end;\n        --arrow-d: path(\"M 29.0 31.4 L 50 52.3 L 70.9 31.4 L 78.5 40.0 L 50 68.5 L 21.2 40.3 L 29.0 31.4 Z\");\n        --arrow-transform: rotate(0deg);\n        --focused-arrow-background: transparent;\n        --focused-arrow-outline: none;\n        --trigger-effect: none; /* ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.05;\n      }\n      :host([expanded]) {\n        --arrow-transform: rotate(-180deg);\n      }\n      :host([animating]) {\n        overflow: hidden;\n      }\n\n      #main {\n        position: relative;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        border-radius: inherit;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow-container {\n        position: absolute;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: var(--arrow-align);\n        pointer-events: none;\n      }\n\n      #arrow {\n        margin: 0 14px 0 0;\n        display: flex;\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-width);\n        color: var(--arrow-color);\n        d: var(--arrow-d);\n        transform: var(--arrow-transform);\n        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      #arrow:focus {\n        background: var(--focused-arrow-background);\n        outline: var(--focused-arrow-outline);\n      }\n\n      #arrow path {\n        fill: currentColor;\n        d: inherit;\n}\n    </style>\n\n    <main id=\"main\">\n      <div id=\"ripples\"></div>\n\n      <div id=\"arrow-container\">\n        <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" tabindex=\"1\">\n          <path></path>\n        </svg>\n      </div>\n\n      <slot></slot>\n    </main>\n  </template>\n"]),
    _templateObject2 = _taggedTemplateLiteral(["<div></div>"], ["<div></div>"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: fixed;\n        z-index: 1000;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        touch-action: none;\n        will-change: opacity;\n        cursor: default;\n        background: rgba(0, 0, 0, 0.5);\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: fixed;\n        z-index: 1000;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        touch-action: none;\n        will-change: opacity;\n        cursor: default;\n        background: rgba(0, 0, 0, 0.5);\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n  </template>\n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        box-sizing: border-box;\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n      }\n      :host([vertical]) {\n        flex-flow: column;\n        align-items: flex-start;\n        justify-content: center;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        box-sizing: border-box;\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n      }\n      :host([vertical]) {\n        flex-flow: column;\n        align-items: flex-start;\n        justify-content: center;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: fit-content;\n        height: fit-content;\n        box-sizing: border-box;\n        opacity: 1;\n        position: relative;\n        --trigger-effect: none; /* ripple, unbounded-ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --arrow-width: 8px;\n        --arrow-height: 8px;\n        --arrow-margin: 0 0 0 3px;\n        --arrow-d: path(\"M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.0 31.6 Z\");\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([mixed]) {\n        opacity: 0.75;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow {\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-width);\n        margin: var(--arrow-margin);\n        color: currentColor;\n        d: var(--arrow-d);\n      }\n\n      #arrow path {\n        fill: currentColor;\n        d: inherit;\n      }\n      #arrow[hidden] {\n        display: none;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        border-radius: inherit;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <slot></slot>\n\n    <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"arrow-path\"></path>\n    </svg>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: fit-content;\n        height: fit-content;\n        box-sizing: border-box;\n        opacity: 1;\n        position: relative;\n        --trigger-effect: none; /* ripple, unbounded-ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --arrow-width: 8px;\n        --arrow-height: 8px;\n        --arrow-margin: 0 0 0 3px;\n        --arrow-d: path(\"M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.0 31.6 Z\");\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([mixed]) {\n        opacity: 0.75;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow {\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-width);\n        margin: var(--arrow-margin);\n        color: currentColor;\n        d: var(--arrow-d);\n      }\n\n      #arrow path {\n        fill: currentColor;\n        d: inherit;\n      }\n      #arrow[hidden] {\n        display: none;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        border-radius: inherit;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <slot></slot>\n\n    <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"arrow-path\"></path>\n    </svg>\n  </template>\n"]),
    _templateObject6 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: flex-start;\n        box-sizing: border-box;\n        width: fit-content;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: flex-start;\n        box-sizing: border-box;\n        width: fit-content;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n    <slot></slot>\n  </template>\n"]),
    _templateObject7 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        min-width: 20px;\n        min-height: 48px;\n        box-sizing: border-box;\n        margin: 30px 0;\n      }\n    </style>\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        min-width: 20px;\n        min-height: 48px;\n        box-sizing: border-box;\n        margin: 30px 0;\n      }\n    </style>\n    <slot></slot>\n  </template>\n"]),
    _templateObject8 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        margin: 0 8px 0 0;\n        width: 24px;\n        height: 24px;\n        box-sizing: border-box;\n        border: 2px solid currentColor;\n        --checkmark-width: 100%;\n        --checkmark-height: 100%;\n        --checkmark-opacity: 0;\n        --checkmark-d: path(\n          \"M 0 0 L 100 0 L 100 100 L 0 100 L 0 0 Z M 95 23 L 86 13 L 37 66 L 13.6 41 L 4.5 51 L 37 85 L 95 23 Z\"\n        );\n        --ripple-type: none; /* unbounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.15;\n      }\n      :host([toggled]) {\n        --checkmark-opacity: 1;\n      }\n      :host([mixed]) {\n        --checkmark-opacity: 1;\n        --checkmark-d: path(\"M 0 0 L 100 0 L 100 100 L 0 100 Z M 87 42.6 L 13 42.6 L 13 57.4 L 87 57.4 Z\");\n      }\n      :host([disabled]) {\n        opacity: 0.4;\n        pointer-events: none;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      /**\n       * Icons\n       */\n\n      #checkmark {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: var(--checkmark-width);\n        height: var(--checkmark-height);\n        opacity: var(--checkmark-opacity);\n        d: var(--checkmark-d);\n        transition-property: opacity;\n        transition-timing-function: inherit;\n        transition-duration: inherit;\n      }\n\n      #checkmark path {\n        fill: currentColor;\n        d: inherit;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        z-index: -1;\n        will-change: opacity, transform;\n        border-radius: 999px;\n        transform: scale(2.6);\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n\n    <svg id=\"checkmark\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path></path>\n    </svg>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        margin: 0 8px 0 0;\n        width: 24px;\n        height: 24px;\n        box-sizing: border-box;\n        border: 2px solid currentColor;\n        --checkmark-width: 100%;\n        --checkmark-height: 100%;\n        --checkmark-opacity: 0;\n        --checkmark-d: path(\n          \"M 0 0 L 100 0 L 100 100 L 0 100 L 0 0 Z M 95 23 L 86 13 L 37 66 L 13.6 41 L 4.5 51 L 37 85 L 95 23 Z\"\n        );\n        --ripple-type: none; /* unbounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.15;\n      }\n      :host([toggled]) {\n        --checkmark-opacity: 1;\n      }\n      :host([mixed]) {\n        --checkmark-opacity: 1;\n        --checkmark-d: path(\"M 0 0 L 100 0 L 100 100 L 0 100 Z M 87 42.6 L 13 42.6 L 13 57.4 L 87 57.4 Z\");\n      }\n      :host([disabled]) {\n        opacity: 0.4;\n        pointer-events: none;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      /**\n       * Icons\n       */\n\n      #checkmark {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: var(--checkmark-width);\n        height: var(--checkmark-height);\n        opacity: var(--checkmark-opacity);\n        d: var(--checkmark-d);\n        transition-property: opacity;\n        transition-timing-function: inherit;\n        transition-duration: inherit;\n      }\n\n      #checkmark path {\n        fill: currentColor;\n        d: inherit;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        z-index: -1;\n        will-change: opacity, transform;\n        border-radius: 999px;\n        transform: scale(2.6);\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n\n    <svg id=\"checkmark\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path></path>\n    </svg>\n  </template>\n"]),
    _templateObject9 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: fixed;\n        width: 0px;\n        height: 0px;\n        z-index: 1001;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: fixed;\n        width: 0px;\n        height: 0px;\n        z-index: 1001;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject10 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        max-width: 140px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        background: white;\n        --inner-padding: 0;\n      }\n      :host(:focus) {\n        z-index: 10;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Input\n       */\n\n      #input {\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        text-align: inherit;\n        cursor: inherit;\n      }\n      #input::-webkit-clear-button {\n        display: none;\n      }\n      #input::-webkit-inner-spin-button {\n        display: none;\n      }\n      #input::-webkit-calendar-picker-indicator {\n        opacity: 0;\n        margin: 0;\n        padding: 0;\n        width: 16px;\n        height: 16px;\n      }\n      :host([empty]) #input::-webkit-datetime-edit-fields-wrapper {\n        display: none;\n      }\n      :host(:active) #input::-webkit-datetime-edit-fields-wrapper,\n      :host(:focus) #input::-webkit-datetime-edit-fields-wrapper {\n        display: initial;\n      }\n\n      /**\n       * Expand icon\n       */\n\n      #expand-icon {\n        display: block;\n        position: absolute;\n        right: 5px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.7;\n        color: inherit;\n        background-color: inherit;\n        pointer-events: none;\n      }\n\n      /**\n       * Error message\n       */\n\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        top: 26px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error);\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <x-icon id=\"expand-icon\" name=\"date-range\"></x-icon>\n      <input id=\"input\" type=\"date\"></input>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        max-width: 140px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        background: white;\n        --inner-padding: 0;\n      }\n      :host(:focus) {\n        z-index: 10;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Input\n       */\n\n      #input {\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        text-align: inherit;\n        cursor: inherit;\n      }\n      #input::-webkit-clear-button {\n        display: none;\n      }\n      #input::-webkit-inner-spin-button {\n        display: none;\n      }\n      #input::-webkit-calendar-picker-indicator {\n        opacity: 0;\n        margin: 0;\n        padding: 0;\n        width: 16px;\n        height: 16px;\n      }\n      :host([empty]) #input::-webkit-datetime-edit-fields-wrapper {\n        display: none;\n      }\n      :host(:active) #input::-webkit-datetime-edit-fields-wrapper,\n      :host(:focus) #input::-webkit-datetime-edit-fields-wrapper {\n        display: initial;\n      }\n\n      /**\n       * Expand icon\n       */\n\n      #expand-icon {\n        display: block;\n        position: absolute;\n        right: 5px;\n        width: 16px;\n        height: 16px;\n        opacity: 0.7;\n        color: inherit;\n        background-color: inherit;\n        pointer-events: none;\n      }\n\n      /**\n       * Error message\n       */\n\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        top: 26px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error);\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <x-icon id=\"expand-icon\" name=\"date-range\"></x-icon>\n      <input id=\"input\" type=\"date\"></input>\n    </main>\n  </template>\n"]),
    _templateObject11 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        position: relative;\n        width: 100%;\n        height: 100%;\n        max-width: 200px;\n        flex: 1 0 0;\n        transition-property: max-width, padding, order;\n        transition-duration: 0.15s;\n        transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        cursor: default;\n        padding: 0 4px 0 16px;\n        user-select: none;\n        touch-action: pan-y;\n        box-sizing: border-box;\n        overflow: hidden;\n        contain: strict;\n        will-change: max-width;\n        z-index: 0;\n        -webkit-app-region: no-drag;\n        --ripple-type: none; /* bounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --selection-indicator-height: 3px;\n        --selection-indicator-color: var(--accent-color);\n        --close-button-position: static;\n        --close-button-left: 0;\n        --close-button-right: initial;\n        --close-button-width: 18px;\n        --close-button-height: 18px;\n        --close-button-margin: 0 0 0 auto;\n        --close-button-opacity: 0.8;\n        --close-button-path-d: path(\n          \"M 74 31 L 69 26 L 50 45 L 31 26 L 26 31 L 45 50 L 26 69 L 31 74 L 50 55 L 69 74 L 74 69 L 55 50 Z\"\n        );\n      }\n      :host([edited]) {\n        --close-button-path-d: path(\n          \"M 68 50 C 68 60 60 68 50 68 C 40 68 32 60 32 50 C 32 40 40 32 50 32 C 60 32 68 40 68 50 Z\"\n        );\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([closing]) {\n        pointer-events: none;\n      }\n      :host([selected]) {\n        z-index: 1;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n\n      /**\n       * Close button\n       */\n\n      #close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: var(--close-button-position);\n        left: var(--close-button-left);\n        right: var(--close-button-right);\n        width: var(--close-button-width);\n        height: var(--close-button-height);\n        margin: var(--close-button-margin);\n        opacity: var(--close-button-opacity);\n        padding: 1px;\n      }\n      #close-button:hover {\n        background: rgba(0, 0, 0, 0.08);\n        opacity: 1;\n      }\n\n      #close-button-path {\n        pointer-events: none;\n        d: var(--close-button-path-d);\n        fill: currentColor;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        z-index: -1;\n        contain: strict;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Selection indicator\n       */\n\n      #selection-indicator {\n        display: none;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: var(--selection-indicator-height);\n        background: var(--selection-indicator-color);\n        pointer-events: none;\n      }\n      :host([selected]) #selection-indicator {\n        display: block;\n      }\n      :host-context(x-doctabs[animatingindicator]) #selection-indicator {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <div id=\"selection-indicator\"></div>\n\n    <slot></slot>\n\n    <svg id=\"close-button\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"close-button-path\"></path>\n    </svg>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        position: relative;\n        width: 100%;\n        height: 100%;\n        max-width: 200px;\n        flex: 1 0 0;\n        transition-property: max-width, padding, order;\n        transition-duration: 0.15s;\n        transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        cursor: default;\n        padding: 0 4px 0 16px;\n        user-select: none;\n        touch-action: pan-y;\n        box-sizing: border-box;\n        overflow: hidden;\n        contain: strict;\n        will-change: max-width;\n        z-index: 0;\n        -webkit-app-region: no-drag;\n        --ripple-type: none; /* bounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --selection-indicator-height: 3px;\n        --selection-indicator-color: var(--accent-color);\n        --close-button-position: static;\n        --close-button-left: 0;\n        --close-button-right: initial;\n        --close-button-width: 18px;\n        --close-button-height: 18px;\n        --close-button-margin: 0 0 0 auto;\n        --close-button-opacity: 0.8;\n        --close-button-path-d: path(\n          \"M 74 31 L 69 26 L 50 45 L 31 26 L 26 31 L 45 50 L 26 69 L 31 74 L 50 55 L 69 74 L 74 69 L 55 50 Z\"\n        );\n      }\n      :host([edited]) {\n        --close-button-path-d: path(\n          \"M 68 50 C 68 60 60 68 50 68 C 40 68 32 60 32 50 C 32 40 40 32 50 32 C 60 32 68 40 68 50 Z\"\n        );\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([closing]) {\n        pointer-events: none;\n      }\n      :host([selected]) {\n        z-index: 1;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n\n      /**\n       * Close button\n       */\n\n      #close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: var(--close-button-position);\n        left: var(--close-button-left);\n        right: var(--close-button-right);\n        width: var(--close-button-width);\n        height: var(--close-button-height);\n        margin: var(--close-button-margin);\n        opacity: var(--close-button-opacity);\n        padding: 1px;\n      }\n      #close-button:hover {\n        background: rgba(0, 0, 0, 0.08);\n        opacity: 1;\n      }\n\n      #close-button-path {\n        pointer-events: none;\n        d: var(--close-button-path-d);\n        fill: currentColor;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        z-index: -1;\n        contain: strict;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Selection indicator\n       */\n\n      #selection-indicator {\n        display: none;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: var(--selection-indicator-height);\n        background: var(--selection-indicator-color);\n        pointer-events: none;\n      }\n      :host([selected]) #selection-indicator {\n        display: block;\n      }\n      :host-context(x-doctabs[animatingindicator]) #selection-indicator {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <div id=\"selection-indicator\"></div>\n\n    <slot></slot>\n\n    <svg id=\"close-button\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"close-button-path\"></path>\n    </svg>\n  </template>\n"]),
    _templateObject12 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        position: relative;\n        --open-button-width: 24px;\n        --open-button-height: 24px;\n        --open-button-margin: 0 10px;\n        --open-button-path-d: path(\n          \"M 79 54 L 54 54 L 54 79 L 46 79 L 46 54 L 21 54 L 21 46 L 46 46 L 46 21 L 54 21 L 54 46 L 79 46 L 79 54 Z\"\n        );\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n\n      #open-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: var(--open-button-width);\n        height: var(--open-button-height);\n        margin: var(--open-button-margin);\n        order: 9999;\n        opacity: 0.7;\n        color: inherit;\n        -webkit-app-region: no-drag;\n      }\n      #open-button:hover {\n        opacity: 1;\n      }\n\n      #open-button-path {\n        d: var(--open-button-path-d);\n        fill: currentColor;\n      }\n\n      #selection-indicator-container {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        pointer-events: none;\n      }\n\n      #selection-indicator {\n        position: absolute;\n        width: 100%;\n        bottom: 0;\n        left: 0;\n      }\n    </style>\n\n    <slot></slot>\n\n    <div id=\"selection-indicator-container\">\n      <div id=\"selection-indicator\" hidden></div>\n    </div>\n\n    <svg id=\"open-button\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"open-button-path\"></path>\n    </svg>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        position: relative;\n        --open-button-width: 24px;\n        --open-button-height: 24px;\n        --open-button-margin: 0 10px;\n        --open-button-path-d: path(\n          \"M 79 54 L 54 54 L 54 79 L 46 79 L 46 54 L 21 54 L 21 46 L 46 46 L 46 21 L 54 21 L 54 46 L 79 46 L 79 54 Z\"\n        );\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n\n      #open-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: var(--open-button-width);\n        height: var(--open-button-height);\n        margin: var(--open-button-margin);\n        order: 9999;\n        opacity: 0.7;\n        color: inherit;\n        -webkit-app-region: no-drag;\n      }\n      #open-button:hover {\n        opacity: 1;\n      }\n\n      #open-button-path {\n        d: var(--open-button-path-d);\n        fill: currentColor;\n      }\n\n      #selection-indicator-container {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        pointer-events: none;\n      }\n\n      #selection-indicator {\n        position: absolute;\n        width: 100%;\n        bottom: 0;\n        left: 0;\n      }\n    </style>\n\n    <slot></slot>\n\n    <div id=\"selection-indicator-container\">\n      <div id=\"selection-indicator\" hidden></div>\n    </div>\n\n    <svg id=\"open-button\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"open-button-path\"></path>\n    </svg>\n  </template>\n"]),
    _templateObject13 = _taggedTemplateLiteral(["<x-doctab><x-label>Untitled</x-label></x-doctab>"], ["<x-doctab><x-label>Untitled</x-label></x-doctab>"]),
    _templateObject14 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        color: currentColor;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 24px;\n        height: 24px;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #svg {\n        width: 100%;\n        height: 100%;\n        fill: currentColor;\n        stroke: none;\n        /* @bugfix: pointerOverEvent.relatedTarget leaks shadow DOM of <x-icon> */\n        pointer-events: none;\n      }\n    </style>\n\n    <svg id=\"svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 100 100\" width=\"0px\" height=\"0px\"></svg>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        color: currentColor;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 24px;\n        height: 24px;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #svg {\n        width: 100%;\n        height: 100%;\n        fill: currentColor;\n        stroke: none;\n        /* @bugfix: pointerOverEvent.relatedTarget leaks shadow DOM of <x-icon> */\n        pointer-events: none;\n      }\n    </style>\n\n    <svg id=\"svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 100 100\" width=\"0px\" height=\"0px\"></svg>\n  </template>\n"]),
    _templateObject15 = _taggedTemplateLiteral(["", ""], ["", ""]),
    _templateObject16 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        max-width: 140px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        background: white;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:focus) {\n        z-index: 10;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([readonly]) {\n        color: rgba(0, 0, 0, 0.75);\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n      }\n\n      #input {\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        text-align: inherit;\n        cursor: inherit;\n      }\n      #input:-webkit-autofill {\n        /* Hide the placehodler text when the input is autofilled */\n        z-index: 1;\n      }\n\n      /* Selection rect */\n      :host(:not(:focus)) ::selection {\n        color: inherit;\n        background: transparent;\n      }\n\n      /* Error */\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        top: 26px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error);\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <input id=\"input\" spellcheck=\"false\"></input>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        max-width: 140px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        background: white;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:focus) {\n        z-index: 10;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([readonly]) {\n        color: rgba(0, 0, 0, 0.75);\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n      }\n\n      #input {\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        font-weight: inherit;\n        text-align: inherit;\n        cursor: inherit;\n      }\n      #input:-webkit-autofill {\n        /* Hide the placehodler text when the input is autofilled */\n        z-index: 1;\n      }\n\n      /* Selection rect */\n      :host(:not(:focus)) ::selection {\n        color: inherit;\n        background: transparent;\n      }\n\n      /* Error */\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        top: 26px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error);\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <input id=\"input\" spellcheck=\"false\"></input>\n    </main>\n  </template>\n"]),
    _templateObject17 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        line-height: 1.2;\n        user-select: none;\n        box-sizing: border-box;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        line-height: 1.2;\n        user-select: none;\n        box-sizing: border-box;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject18 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: none;\n        top: 0;\n        left: 0;\n        width: fit-content;\n        z-index: 1001;\n        box-sizing: border-box;\n        background: white;\n        cursor: default;\n        -webkit-app-region: no-drag;\n        --scrollbar-background: rgba(0, 0, 0, 0.2);\n        --scrollbar-width: 6px;\n        --open-transition: 100 transform cubic-bezier(0.4, 0, 0.2, 1);\n        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: block;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host-context([debug]):host(:focus) {\n        outline: 2px solid red;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        overflow: auto;\n        display: flex;\n        flex-direction: column;\n      }\n\n      ::-webkit-scrollbar {\n        max-width: var(--scrollbar-width);\n        background: none;\n      }\n      ::-webkit-scrollbar-thumb {\n        background-color: var(--scrollbar-background);\n      }\n      ::-webkit-scrollbar-corner {\n        display: none\n      }\n    </style>\n\n    <main id=\"main\" role=\"presentation\">\n      <slot id=\"slot\"></slot>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: none;\n        top: 0;\n        left: 0;\n        width: fit-content;\n        z-index: 1001;\n        box-sizing: border-box;\n        background: white;\n        cursor: default;\n        -webkit-app-region: no-drag;\n        --scrollbar-background: rgba(0, 0, 0, 0.2);\n        --scrollbar-width: 6px;\n        --open-transition: 100 transform cubic-bezier(0.4, 0, 0.2, 1);\n        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: block;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host-context([debug]):host(:focus) {\n        outline: 2px solid red;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        overflow: auto;\n        display: flex;\n        flex-direction: column;\n      }\n\n      ::-webkit-scrollbar {\n        max-width: var(--scrollbar-width);\n        background: none;\n      }\n      ::-webkit-scrollbar-thumb {\n        background-color: var(--scrollbar-background);\n      }\n      ::-webkit-scrollbar-corner {\n        display: none\n      }\n    </style>\n\n    <main id=\"main\" role=\"presentation\">\n      <slot id=\"slot\"></slot>\n    </main>\n  </template>\n"]),
    _templateObject19 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: fit-content;\n        overflow: auto;\n        box-sizing: border-box;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.6;\n      }\n\n      #backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 1000;\n        pointer-events: none;\n        touch-action: none;\n      }\n      #backdrop[hidden] {\n        display: none;\n      }\n\n      #backdrop path {\n        fill: red;\n        fill-rule: evenodd;\n        opacity: 0;\n        pointer-events: all;\n      }\n    </style>\n\n    <svg id=\"backdrop\" hidden>\n      <path id=\"backdrop-path\"></path>\n    </svg>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: fit-content;\n        overflow: auto;\n        box-sizing: border-box;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.6;\n      }\n\n      #backdrop {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 1000;\n        pointer-events: none;\n        touch-action: none;\n      }\n      #backdrop[hidden] {\n        display: none;\n      }\n\n      #backdrop path {\n        fill: red;\n        fill-rule: evenodd;\n        opacity: 0;\n        pointer-events: all;\n      }\n    </style>\n\n    <svg id=\"backdrop\" hidden>\n      <path id=\"backdrop-path\"></path>\n    </svg>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject20 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        position: relative;\n        box-sizing: border-box;\n        cursor: default;\n        user-select: none;\n        contain: layout style;\n        --trigger-effect: ripple; /* ripple, blink, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.1;\n        --checkmark-d: path(\"M 37.5 65 L 21 48.9 L 15.7 54.35 L 37.5 76.1 L 84.3 29.3 L 78.8 23.8 Z\");\n        --checkmark-width: 24px;\n        --checkmark-height: 24px;\n        --checkmark-margin: 0 12px 0 0;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.6;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host-context([debug]):host(:focus) {\n        outline: 2px solid red;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        z-index: 0;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        contain: strict;\n        overflow: hidden;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Checkmark\n       */\n\n      #checkmark {\n        color: inherit;\n        display: none;\n        transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);\n        align-self: center;\n        width: var(--checkmark-width);\n        height: var(--checkmark-height);\n        margin: var(--checkmark-margin);\n        d: var(--checkmark-d);\n      }\n      :host([togglable]) #checkmark {\n        display: flex;\n        transform: scale(0);\n        transform-origin: 50% 50%;\n      }\n      :host([toggled]) #checkmark {\n        display: flex;\n        transform: scale(1);\n      }\n\n      #checkmark path {\n        d: inherit;\n        fill: currentColor;\n      }\n\n      /**\n       * \"Expand\" arrow icon\n       */\n\n      #arrow-icon {\n        display: flex;\n        width: 16px;\n        height: 16px;\n        transform: scale(1.1);\n        align-self: center;\n        margin-left: 8px;\n        color: inherit;\n      }\n      #arrow-icon[hidden] {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n\n    <svg id=\"checkmark\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path></path>\n    </svg>\n\n    <slot></slot>\n    <x-icon id=\"arrow-icon\" name=\"play-arrow\" hidden></x-icon>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        position: relative;\n        box-sizing: border-box;\n        cursor: default;\n        user-select: none;\n        contain: layout style;\n        --trigger-effect: ripple; /* ripple, blink, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.1;\n        --checkmark-d: path(\"M 37.5 65 L 21 48.9 L 15.7 54.35 L 37.5 76.1 L 84.3 29.3 L 78.8 23.8 Z\");\n        --checkmark-width: 24px;\n        --checkmark-height: 24px;\n        --checkmark-margin: 0 12px 0 0;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.6;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host-context([debug]):host(:focus) {\n        outline: 2px solid red;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        z-index: 0;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n        contain: strict;\n        overflow: hidden;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Checkmark\n       */\n\n      #checkmark {\n        color: inherit;\n        display: none;\n        transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);\n        align-self: center;\n        width: var(--checkmark-width);\n        height: var(--checkmark-height);\n        margin: var(--checkmark-margin);\n        d: var(--checkmark-d);\n      }\n      :host([togglable]) #checkmark {\n        display: flex;\n        transform: scale(0);\n        transform-origin: 50% 50%;\n      }\n      :host([toggled]) #checkmark {\n        display: flex;\n        transform: scale(1);\n      }\n\n      #checkmark path {\n        d: inherit;\n        fill: currentColor;\n      }\n\n      /**\n       * \"Expand\" arrow icon\n       */\n\n      #arrow-icon {\n        display: flex;\n        width: 16px;\n        height: 16px;\n        transform: scale(1.1);\n        align-self: center;\n        margin-left: 8px;\n        color: inherit;\n      }\n      #arrow-icon[hidden] {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n\n    <svg id=\"checkmark\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path></path>\n    </svg>\n\n    <slot></slot>\n    <x-icon id=\"arrow-icon\" name=\"play-arrow\" hidden></x-icon>\n  </template>\n"]),
    _templateObject21 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: none;\n        position: fixed;\n        min-width: 15px;\n        min-height: 15px;\n        bottom: 15px;\n        left: 50%;\n        transform: translateX(-50%);\n        padding: 5px 12px;\n        box-sizing: border-box;\n        color: rgba(255, 255, 255, 0.9);\n        background: #434343;\n        z-index: 9999;\n        font-size: 12px;\n        user-select: text;\n        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: block;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: none;\n        position: fixed;\n        min-width: 15px;\n        min-height: 15px;\n        bottom: 15px;\n        left: 50%;\n        transform: translateX(-50%);\n        padding: 5px 12px;\n        box-sizing: border-box;\n        color: rgba(255, 255, 255, 0.9);\n        background: #434343;\n        z-index: 9999;\n        font-size: 12px;\n        user-select: text;\n        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: block;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n    </style>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject22 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        width: 100px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        height: 100%;\n      }\n\n      #editor-container {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n\n      #editor {\n        width: 100%;\n        overflow: auto;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        line-height: 10;\n        white-space: nowrap;\n      }\n      #editor::-webkit-scrollbar {\n        display: none;\n      }\n      #editor::before {\n        content: attr(data-prefix);\n        pointer-events: none;\n      }\n      #editor::after {\n        content: attr(data-suffix);\n        pointer-events: none;\n      }\n      :host([empty]) #editor::before,\n      :host([empty]) #editor::after,\n      :host(:focus) #editor::before,\n      :host(:focus) #editor::after {\n        content: \"\";\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"editor-container\">\n        <div id=\"editor\" contenteditable=\"plaintext-only\" spellcheck=\"false\"></div>\n      </div>\n\n      <slot></slot>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        width: 100px;\n        height: 24px;\n        box-sizing: border-box;\n        color: #000000;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        display: flex;\n        align-items: center;\n        height: 100%;\n      }\n\n      #editor-container {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n\n      #editor {\n        width: 100%;\n        overflow: auto;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        line-height: 10;\n        white-space: nowrap;\n      }\n      #editor::-webkit-scrollbar {\n        display: none;\n      }\n      #editor::before {\n        content: attr(data-prefix);\n        pointer-events: none;\n      }\n      #editor::after {\n        content: attr(data-suffix);\n        pointer-events: none;\n      }\n      :host([empty]) #editor::before,\n      :host([empty]) #editor::after,\n      :host(:focus) #editor::before,\n      :host(:focus) #editor::after {\n        content: \"\";\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"editor-container\">\n        <div id=\"editor\" contenteditable=\"plaintext-only\" spellcheck=\"false\"></div>\n      </div>\n\n      <slot></slot>\n    </main>\n  </template>\n"]),
    _templateObject23 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        position: fixed;\n        display: none;\n        top: 0;\n        left: 0;\n        min-height: 30px;\n        z-index: 1001;\n        box-sizing: border-box;\n        background: white;\n        -webkit-app-region: no-drag;\n        --orientation: vertical; /* horizontal, vertical */\n        --align: bottom;\n        --arrow-size: 20px;\n        --open-transition: 900 transform cubic-bezier(0.4, 0, 0.2, 1);\n        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: flex;\n      }\n\n      #arrow {\n        position: fixed;\n        box-sizing: border-box;\n        content: \"\";\n      }\n      #arrow[data-align=\"top\"],\n      #arrow[data-align=\"bottom\"] {\n        width: var(--arrow-size);\n        height: calc(var(--arrow-size) * 0.6);\n        transform: translate(-50%, 0);\n      }\n      #arrow[data-align=\"left\"],\n      #arrow[data-align=\"right\"] {\n        width: calc(var(--arrow-size) * 0.6);\n        height: var(--arrow-size);\n        transform: translate(0, -50%);\n      }\n\n      #arrow path {\n        fill: pink;\n        vector-effect: non-scaling-stroke;\n        stroke-width: 1;\n      }\n    </style>\n\n    <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"arrow-path\"></path>\n    </svg>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        position: fixed;\n        display: none;\n        top: 0;\n        left: 0;\n        min-height: 30px;\n        z-index: 1001;\n        box-sizing: border-box;\n        background: white;\n        -webkit-app-region: no-drag;\n        --orientation: vertical; /* horizontal, vertical */\n        --align: bottom;\n        --arrow-size: 20px;\n        --open-transition: 900 transform cubic-bezier(0.4, 0, 0.2, 1);\n        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([opened]),\n      :host([animating]) {\n        display: flex;\n      }\n\n      #arrow {\n        position: fixed;\n        box-sizing: border-box;\n        content: \"\";\n      }\n      #arrow[data-align=\"top\"],\n      #arrow[data-align=\"bottom\"] {\n        width: var(--arrow-size);\n        height: calc(var(--arrow-size) * 0.6);\n        transform: translate(-50%, 0);\n      }\n      #arrow[data-align=\"left\"],\n      #arrow[data-align=\"right\"] {\n        width: calc(var(--arrow-size) * 0.6);\n        height: var(--arrow-size);\n        transform: translate(0, -50%);\n      }\n\n      #arrow path {\n        fill: pink;\n        vector-effect: non-scaling-stroke;\n        stroke-width: 1;\n      }\n    </style>\n\n    <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n      <path id=\"arrow-path\"></path>\n    </svg>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject24 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        box-sizing: border-box;\n        height: 4px;\n        width: 100%;\n        position: relative;\n        contain: strict;\n        overflow: hidden;\n        background: #acece6;\n        cursor: default;\n        --bar-background: #3B99FB;\n        --bar-box-shadow: 0px 0px 0px 1px #3385DB;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #indeterminate-bars {\n        width: 100%;\n        height: 100%;\n      }\n\n      #determinate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        width: 0%;\n        height: 100%;\n        background: var(--bar-background);\n        box-shadow: var(--bar-box-shadow);\n        transition: width 0.4s ease-in-out;\n        will-change: left, right;\n      }\n\n      #primary-indeterminate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        height: 100%;\n        background: var(--bar-background);\n        will-change: left, right;\n      }\n\n      #secondary-indeterminate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        height: 100%;\n        background: var(--bar-background);\n        will-change: left, right;\n      }\n    </style>\n\n    <div id=\"determinate-bar\"></div>\n\n    <div id=\"indeterminate-bars\">\n      <div id=\"primary-indeterminate-bar\"></div>\n      <div id=\"secondary-indeterminate-bar\"></div>\n    </div>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        box-sizing: border-box;\n        height: 4px;\n        width: 100%;\n        position: relative;\n        contain: strict;\n        overflow: hidden;\n        background: #acece6;\n        cursor: default;\n        --bar-background: #3B99FB;\n        --bar-box-shadow: 0px 0px 0px 1px #3385DB;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #indeterminate-bars {\n        width: 100%;\n        height: 100%;\n      }\n\n      #determinate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        width: 0%;\n        height: 100%;\n        background: var(--bar-background);\n        box-shadow: var(--bar-box-shadow);\n        transition: width 0.4s ease-in-out;\n        will-change: left, right;\n      }\n\n      #primary-indeterminate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        height: 100%;\n        background: var(--bar-background);\n        will-change: left, right;\n      }\n\n      #secondary-indeterminate-bar {\n        position: absolute;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        height: 100%;\n        background: var(--bar-background);\n        will-change: left, right;\n      }\n    </style>\n\n    <div id=\"determinate-bar\"></div>\n\n    <div id=\"indeterminate-bars\">\n      <div id=\"primary-indeterminate-bar\"></div>\n      <div id=\"secondary-indeterminate-bar\"></div>\n    </div>\n  </template>\n"]),
    _templateObject25 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        border: 3px solid black;\n        width: 20px;\n        height: 20px;\n        border-radius: 99px;\n        --dot-color: black;\n        --dot-transform: scale(0);\n        --dot-box-shadow: none;\n      }\n      :host([toggled]) {\n        --dot-transform: scale(0.6);\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([disabled]) {\n        opacity: 0.4;\n        pointer-events: none;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #main {\n        border-radius: 99px;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      #dot {\n        width: 100%;\n        height: 100%;\n        background: var(--dot-color);\n        border-radius: 99px;\n        box-shadow: var(--dot-box-shadow);\n        transform: var(--dot-transform);\n        transition: all 0.15s ease-in-out;\n      }\n      :host([mixed][toggled]) #dot {\n        height: 33%;\n        border-radius: 0;\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"dot\"></div>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        border: 3px solid black;\n        width: 20px;\n        height: 20px;\n        border-radius: 99px;\n        --dot-color: black;\n        --dot-transform: scale(0);\n        --dot-box-shadow: none;\n      }\n      :host([toggled]) {\n        --dot-transform: scale(0.6);\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host([disabled]) {\n        opacity: 0.4;\n        pointer-events: none;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      #main {\n        border-radius: 99px;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      #dot {\n        width: 100%;\n        height: 100%;\n        background: var(--dot-color);\n        border-radius: 99px;\n        box-shadow: var(--dot-box-shadow);\n        transform: var(--dot-transform);\n        transition: all 0.15s ease-in-out;\n      }\n      :host([mixed][toggled]) #dot {\n        height: 33%;\n        border-radius: 0;\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"dot\"></div>\n    </main>\n  </template>\n"]),
    _templateObject26 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: fit-content;\n        height: fit-content;\n        max-width: 100%;\n        box-sizing: border-box;\n        outline: none;\n        font-size: 15px;\n        user-select: none;\n        --arrow-width: 13px;\n        --arrow-height: 13px;\n        --arrow-min-width: 13px;\n        --arrow-margin: 0 2px 0 11px;\n        --arrow-color: currentColor;\n        --arrow-d: path(\n          \"M 25 41 L 50 16 L 75 41 L 83 34 L 50 1 L 17 34 Z M 17 66 L 50 100 L 83 66 L 75 59 L 50 84 L 25 59 Z\"\n        );\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n\n      #button {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: flex-start;\n        flex: 1;\n        width: 100%;\n        height: 100%;\n      }\n\n      :host([mixed]) #button > * {\n        opacity: 0.7;\n      }\n\n      #button > x-label {\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;\n      }\n\n      #button > #arrow-container {\n        margin: 0 0 0 auto;\n        z-index: 999;\n      }\n\n      #button > #arrow-container #arrow {\n        display: flex;\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-min-width);\n        margin: var(--arrow-margin);\n        color: var(--arrow-color);\n        d: var(--arrow-d);\n      }\n\n      #button > #arrow-container #arrow path {\n        fill: currentColor;\n        d: inherit;\n      }\n    </style>\n\n    <div id=\"button\">\n      <div id=\"arrow-container\">\n        <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n          <path></path>\n        </svg>\n      </div>\n    </div>\n\n    <slot></slot>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: fit-content;\n        height: fit-content;\n        max-width: 100%;\n        box-sizing: border-box;\n        outline: none;\n        font-size: 15px;\n        user-select: none;\n        --arrow-width: 13px;\n        --arrow-height: 13px;\n        --arrow-min-width: 13px;\n        --arrow-margin: 0 2px 0 11px;\n        --arrow-color: currentColor;\n        --arrow-d: path(\n          \"M 25 41 L 50 16 L 75 41 L 83 34 L 50 1 L 17 34 Z M 17 66 L 50 100 L 83 66 L 75 59 L 50 84 L 25 59 Z\"\n        );\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n\n      #button {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: flex-start;\n        flex: 1;\n        width: 100%;\n        height: 100%;\n      }\n\n      :host([mixed]) #button > * {\n        opacity: 0.7;\n      }\n\n      #button > x-label {\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;\n      }\n\n      #button > #arrow-container {\n        margin: 0 0 0 auto;\n        z-index: 999;\n      }\n\n      #button > #arrow-container #arrow {\n        display: flex;\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        min-width: var(--arrow-min-width);\n        margin: var(--arrow-margin);\n        color: var(--arrow-color);\n        d: var(--arrow-d);\n      }\n\n      #button > #arrow-container #arrow path {\n        fill: currentColor;\n        d: inherit;\n      }\n    </style>\n\n    <div id=\"button\">\n      <div id=\"arrow-container\">\n        <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n          <path></path>\n        </svg>\n      </div>\n    </div>\n\n    <slot></slot>\n  </template>\n"]),
    _templateObject27 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        box-sizing: border-box;\n        font-size: 14px;\n        line-height: 1;\n      }\n    </style>\n\n    <main id=\"main\"></main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        box-sizing: border-box;\n        font-size: 14px;\n        line-height: 1;\n      }\n    </style>\n\n    <main id=\"main\"></main>\n  </template>\n"]),
    _templateObject28 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        position: relative;\n        box-sizing: border-box;\n        touch-action: pan-y;\n        --focus-ring-color: currentColor;\n        --focus-ring-opacity: 1;\n        --focus-ring-width: 10px;\n        --focus-ring-transition-duration: 0.15s;\n        --thumb-width: 20px;\n        --thumb-height: 20px;\n        --thumb-d: path(\"M 50 50 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0\");\n        --thumb-transform: none;\n        --thumb-color: gray;\n        --thumb-border-width: 1px;\n        --thumb-border-color: rgba(0, 0, 0, 0.2);\n        --tick-color: rgba(0, 0, 0, 0.4);\n        --track-height: 2px;\n        --track-color: gray;\n        --track-tint-color: black;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.4;\n      }\n\n      /**\n       * Tracks\n       */\n\n      #tracks {\n        position: absolute;\n        width: 100%;\n        height: var(--track-height);\n        top: calc((var(--thumb-height) / 2) - var(--track-height)/2);\n      }\n\n      #tracks #normal-track {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        background: var(--track-color);\n        border-radius: 10px;\n      }\n\n      #tracks #tint-track {\n        position: absolute;\n        width: 0%;\n        height: 100%;\n        background: var(--track-tint-color);\n      }\n\n      /**\n       * Thumbs\n       */\n\n      #thumbs {\n        position: relative;\n        width: calc(100% - var(--thumb-width));\n        height: 100%;\n      }\n\n      #thumbs .thumb {\n        position: relative;\n        left: 0;\n        width: var(--thumb-width);\n        height: var(--thumb-height);\n        display: block;\n        box-sizing: border-box;\n        overflow: visible;\n        transform: var(--thumb-transform);\n        transition: transform 0.2s ease-in-out;\n        will-change: transform;\n        d: var(--thumb-d);\n      }\n\n      #thumbs .thumb .shape {\n        d: inherit;\n        fill: var(--thumb-color);\n        stroke: var(--thumb-border-color);\n        stroke-width: var(--thumb-border-width);\n        vector-effect: non-scaling-stroke;\n      }\n\n      #thumbs .thumb .focus-ring {\n        d: inherit;\n        fill: none;\n        stroke: var(--focus-ring-color);\n        stroke-width: 0;\n        opacity: var(--focus-ring-opacity);\n        vector-effect: non-scaling-stroke;\n        transition: stroke-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) #thumbs .thumb .focus-ring {\n        stroke-width: var(--focus-ring-width);\n      }\n\n      /**\n       * Ticks\n       */\n\n      #ticks {\n        width: calc(100% - var(--thumb-width));\n        height: 5px;\n        margin: 0 0 3px 0;\n        position: relative;\n        margin-left: calc(var(--thumb-width) / 2);\n      }\n      #ticks:empty {\n        display: none;\n      }\n\n      #ticks .tick {\n        position: absolute;\n        width: 1px;\n        height: 100%;\n        background: var(--tick-color);\n      }\n\n      /**\n       * Labels\n       */\n\n      #labels {\n        position: relative;\n        width: calc(100% - var(--thumb-width));\n        height: 14px;\n        margin-left: calc(var(--thumb-width) / 2);\n        font-size: 12px;\n      }\n      :host(:empty) #labels {\n        display: none;\n      }\n\n      ::slotted(x-label) {\n        position: absolute;\n        transform: translateX(-50%);\n      }\n    </style>\n\n    <div id=\"tracks\">\n      <div id=\"normal-track\"></div>\n      <div id=\"tint-track\"></div>\n    </div>\n\n    <div id=\"thumbs\">\n      <svg id=\"start-thumb\" class=\"thumb\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" style=\"left: 0%;\">\n        <path class=\"focus-ring\"></path>\n        <path class=\"shape\"></path>\n      </svg>\n    </div>\n\n    <div id=\"ticks\"></div>\n\n    <div id=\"labels\">\n      <slot></slot>\n    </div>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        position: relative;\n        box-sizing: border-box;\n        touch-action: pan-y;\n        --focus-ring-color: currentColor;\n        --focus-ring-opacity: 1;\n        --focus-ring-width: 10px;\n        --focus-ring-transition-duration: 0.15s;\n        --thumb-width: 20px;\n        --thumb-height: 20px;\n        --thumb-d: path(\"M 50 50 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0\");\n        --thumb-transform: none;\n        --thumb-color: gray;\n        --thumb-border-width: 1px;\n        --thumb-border-color: rgba(0, 0, 0, 0.2);\n        --tick-color: rgba(0, 0, 0, 0.4);\n        --track-height: 2px;\n        --track-color: gray;\n        --track-tint-color: black;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.4;\n      }\n\n      /**\n       * Tracks\n       */\n\n      #tracks {\n        position: absolute;\n        width: 100%;\n        height: var(--track-height);\n        top: calc((var(--thumb-height) / 2) - var(--track-height)/2);\n      }\n\n      #tracks #normal-track {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        background: var(--track-color);\n        border-radius: 10px;\n      }\n\n      #tracks #tint-track {\n        position: absolute;\n        width: 0%;\n        height: 100%;\n        background: var(--track-tint-color);\n      }\n\n      /**\n       * Thumbs\n       */\n\n      #thumbs {\n        position: relative;\n        width: calc(100% - var(--thumb-width));\n        height: 100%;\n      }\n\n      #thumbs .thumb {\n        position: relative;\n        left: 0;\n        width: var(--thumb-width);\n        height: var(--thumb-height);\n        display: block;\n        box-sizing: border-box;\n        overflow: visible;\n        transform: var(--thumb-transform);\n        transition: transform 0.2s ease-in-out;\n        will-change: transform;\n        d: var(--thumb-d);\n      }\n\n      #thumbs .thumb .shape {\n        d: inherit;\n        fill: var(--thumb-color);\n        stroke: var(--thumb-border-color);\n        stroke-width: var(--thumb-border-width);\n        vector-effect: non-scaling-stroke;\n      }\n\n      #thumbs .thumb .focus-ring {\n        d: inherit;\n        fill: none;\n        stroke: var(--focus-ring-color);\n        stroke-width: 0;\n        opacity: var(--focus-ring-opacity);\n        vector-effect: non-scaling-stroke;\n        transition: stroke-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) #thumbs .thumb .focus-ring {\n        stroke-width: var(--focus-ring-width);\n      }\n\n      /**\n       * Ticks\n       */\n\n      #ticks {\n        width: calc(100% - var(--thumb-width));\n        height: 5px;\n        margin: 0 0 3px 0;\n        position: relative;\n        margin-left: calc(var(--thumb-width) / 2);\n      }\n      #ticks:empty {\n        display: none;\n      }\n\n      #ticks .tick {\n        position: absolute;\n        width: 1px;\n        height: 100%;\n        background: var(--tick-color);\n      }\n\n      /**\n       * Labels\n       */\n\n      #labels {\n        position: relative;\n        width: calc(100% - var(--thumb-width));\n        height: 14px;\n        margin-left: calc(var(--thumb-width) / 2);\n        font-size: 12px;\n      }\n      :host(:empty) #labels {\n        display: none;\n      }\n\n      ::slotted(x-label) {\n        position: absolute;\n        transform: translateX(-50%);\n      }\n    </style>\n\n    <div id=\"tracks\">\n      <div id=\"normal-track\"></div>\n      <div id=\"tint-track\"></div>\n    </div>\n\n    <div id=\"thumbs\">\n      <svg id=\"start-thumb\" class=\"thumb\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" style=\"left: 0%;\">\n        <path class=\"focus-ring\"></path>\n        <path class=\"shape\"></path>\n      </svg>\n    </div>\n\n    <div id=\"ticks\"></div>\n\n    <div id=\"labels\">\n      <slot></slot>\n    </div>\n  </template>\n"]),
    _templateObject29 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        width: fit-content;\n        --button-color: rgba(0, 0, 0, 0.6);\n        --button-border-left: none;\n        --pressed-button-color: white;\n        --pressed-button-background: rgba(0, 0, 0, 0.3);\n        --increment-arrow-width: 11px;\n        --increment-arrow-height: 11px;\n        --increment-arrow-path-d: path(\"M 24 69 L 50 43 L 76 69 L 69 76 L 50 58 L 31 76 L 24 69 Z\" );\n        --decrement-arrow-width: 11px;\n        --decrement-arrow-height: 11px;\n        --decrement-arrow-path-d: path(\"M 24 32 L 50 58 L 76 32 L 69 25 L 50 44 L 31 25 L 24 32 Z\" );\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n\n      #increment-button,\n      #decrement-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n        height: 100%;\n        user-select: none;\n        box-sizing: border-box;\n        color: var(--button-color);\n        border-left: var(--button-border-left);\n      }\n      #increment-button[data-pressed],\n      #decrement-button[data-pressed] {\n        color: var(--pressed-button-color);\n        background: var(--pressed-button-background);\n      }\n      :host([disabled=\"increment\"]) #increment-button,\n      :host([disabled=\"decrement\"]) #decrement-button,\n      :host([disabled=\"\"]) #increment-button,\n      :host([disabled=\"\"]) #decrement-button {\n        opacity: 0.3;\n        pointer-events: none;\n      }\n\n      #increment-arrow {\n        width: var(--increment-arrow-width);\n        height: var(--increment-arrow-height);\n        pointer-events: none;\n      }\n      #decrement-arrow {\n        width: var(--decrement-arrow-width);\n        height: var(--decrement-arrow-height);\n        pointer-events: none;\n      }\n\n      #increment-arrow-path {\n        d: var(--increment-arrow-path-d);\n        fill: currentColor;\n      }\n      #decrement-arrow-path {\n        d: var(--decrement-arrow-path-d);\n        fill: currentColor;\n      }\n    </style>\n\n    <div id=\"decrement-button\" class=\"button\">\n      <svg id=\"decrement-arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n        <path id=\"decrement-arrow-path\"></path>\n      </svg>\n    </div>\n\n    <div id=\"increment-button\" class=\"button\">\n      <svg id=\"increment-arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n        <path id=\"increment-arrow-path\"></path>\n      </svg>\n    </div>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        flex-flow: row;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        width: fit-content;\n        --button-color: rgba(0, 0, 0, 0.6);\n        --button-border-left: none;\n        --pressed-button-color: white;\n        --pressed-button-background: rgba(0, 0, 0, 0.3);\n        --increment-arrow-width: 11px;\n        --increment-arrow-height: 11px;\n        --increment-arrow-path-d: path(\"M 24 69 L 50 43 L 76 69 L 69 76 L 50 58 L 31 76 L 24 69 Z\" );\n        --decrement-arrow-width: 11px;\n        --decrement-arrow-height: 11px;\n        --decrement-arrow-path-d: path(\"M 24 32 L 50 58 L 76 32 L 69 25 L 50 44 L 31 25 L 24 32 Z\" );\n      }\n      :host(:hover) {\n        cursor: default;\n      }\n\n      #increment-button,\n      #decrement-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n        height: 100%;\n        user-select: none;\n        box-sizing: border-box;\n        color: var(--button-color);\n        border-left: var(--button-border-left);\n      }\n      #increment-button[data-pressed],\n      #decrement-button[data-pressed] {\n        color: var(--pressed-button-color);\n        background: var(--pressed-button-background);\n      }\n      :host([disabled=\"increment\"]) #increment-button,\n      :host([disabled=\"decrement\"]) #decrement-button,\n      :host([disabled=\"\"]) #increment-button,\n      :host([disabled=\"\"]) #decrement-button {\n        opacity: 0.3;\n        pointer-events: none;\n      }\n\n      #increment-arrow {\n        width: var(--increment-arrow-width);\n        height: var(--increment-arrow-height);\n        pointer-events: none;\n      }\n      #decrement-arrow {\n        width: var(--decrement-arrow-width);\n        height: var(--decrement-arrow-height);\n        pointer-events: none;\n      }\n\n      #increment-arrow-path {\n        d: var(--increment-arrow-path-d);\n        fill: currentColor;\n      }\n      #decrement-arrow-path {\n        d: var(--decrement-arrow-path-d);\n        fill: currentColor;\n      }\n    </style>\n\n    <div id=\"decrement-button\" class=\"button\">\n      <svg id=\"decrement-arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n        <path id=\"decrement-arrow-path\"></path>\n      </svg>\n    </div>\n\n    <div id=\"increment-button\" class=\"button\">\n      <svg id=\"increment-arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n        <path id=\"increment-arrow-path\"></path>\n      </svg>\n    </div>\n  </template>\n"]),
    _templateObject30 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 22px;\n        height: 22px;\n        cursor: default;\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n\n      #selected-icon {\n        display: none;\n        position: absolute;\n        left: calc(50% - 8px);\n        top: calc(50% - 8px);\n        width: 16px;\n        height: 16px;\n        color: white;\n      }\n      :host([showicon]:hover) #selected-icon {\n        display: block;\n        opacity: 0.6;\n      }\n      :host([showicon][selected]) #selected-icon {\n        display: block;\n        opacity: 1;\n      }\n      :host([showicon][value=\"#FFFFFF\"]) #selected-icon {\n        fill: gray;\n      }\n    </style>\n\n    <main id=\"main\">\n      <x-icon id=\"selected-icon\" name=\"send\"></x-icon>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 22px;\n        height: 22px;\n        cursor: default;\n        box-sizing: border-box;\n        overflow: hidden;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n\n      #selected-icon {\n        display: none;\n        position: absolute;\n        left: calc(50% - 8px);\n        top: calc(50% - 8px);\n        width: 16px;\n        height: 16px;\n        color: white;\n      }\n      :host([showicon]:hover) #selected-icon {\n        display: block;\n        opacity: 0.6;\n      }\n      :host([showicon][selected]) #selected-icon {\n        display: block;\n        opacity: 1;\n      }\n      :host([showicon][value=\"#FFFFFF\"]) #selected-icon {\n        fill: gray;\n      }\n    </style>\n\n    <main id=\"main\">\n      <x-icon id=\"selected-icon\" name=\"send\"></x-icon>\n    </main>\n  </template>\n"]),
    _templateObject31 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 30px;\n        height: 18px;\n        margin: 0 8px 0 0;\n        box-sizing: border-box;\n        display: flex;\n        --focus-ring-color: currentColor;\n        --focus-ring-opacity: 0.2;\n        --focus-ring-width: 10px;\n        --focus-ring-transition-duration: 0.15s;\n        --ripple-type: none; /* unbounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --thumb-color: currentColor;\n        --thumb-size: 20px;\n        --thumb-border-radius: 999px;\n        --track-height: 65%;\n        --track-color: currentColor;\n        --track-opacity: 0.5;\n        --track-border-radius: 999px;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n\n      /**\n       * Track\n       */\n\n      #track {\n        width: 100%;\n        height: var(--track-height);\n        background: var(--track-color);\n        opacity: var(--track-opacity);\n        border-radius: var(--track-border-radius);\n      }\n\n      /**\n       * Thumb\n       */\n\n      #thumb {\n        position: absolute;\n        left: 0px;\n        width: var(--thumb-size);\n        height: var(--thumb-size);\n        background: var(--thumb-color);\n        border-radius: var(--thumb-border-radius);\n        transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([toggled]) #thumb {\n        left: calc(100% - var(--thumb-size));\n      }\n      :host([mixed]) #thumb {\n        left: calc(50% - var(--thumb-size) / 2);\n      }\n\n      /**\n       * Focus ring\n       */\n\n      #focus-ring {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: var(--thumb-size);\n        height: var(--thumb-size);\n        transform: translate(-50%, -50%);\n        background: transparent;\n        border: 0px solid var(--focus-ring-color);\n        border-radius: 999px;\n        opacity: var(--focus-ring-opacity);\n        transition: border-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) #thumb #focus-ring {\n        border-width: var(--focus-ring-width);\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples .ripple {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: calc(var(--thumb-size) + 22px);\n        height: calc(var(--thumb-size) + 22px);\n        transform: translate(-50%, -50%);\n        background: var(--ripple-background);\n        border-radius: 999px;\n        opacity: var(--ripple-opacity);\n      }\n    </style>\n\n    <x-box id=\"main\">\n      <div id=\"track\"></div>\n\n      <div id=\"thumb\">\n        <div id=\"focus-ring\"></div>\n        <div id=\"ripples\"></div>\n      </div>\n    </x-box>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 30px;\n        height: 18px;\n        margin: 0 8px 0 0;\n        box-sizing: border-box;\n        display: flex;\n        --focus-ring-color: currentColor;\n        --focus-ring-opacity: 0.2;\n        --focus-ring-width: 10px;\n        --focus-ring-transition-duration: 0.15s;\n        --ripple-type: none; /* unbounded, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --thumb-color: currentColor;\n        --thumb-size: 20px;\n        --thumb-border-radius: 999px;\n        --track-height: 65%;\n        --track-color: currentColor;\n        --track-opacity: 0.5;\n        --track-border-radius: 999px;\n      }\n      :host([disabled]) {\n        opacity: 0.5;\n        pointer-events: none;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n\n      /**\n       * Track\n       */\n\n      #track {\n        width: 100%;\n        height: var(--track-height);\n        background: var(--track-color);\n        opacity: var(--track-opacity);\n        border-radius: var(--track-border-radius);\n      }\n\n      /**\n       * Thumb\n       */\n\n      #thumb {\n        position: absolute;\n        left: 0px;\n        width: var(--thumb-size);\n        height: var(--thumb-size);\n        background: var(--thumb-color);\n        border-radius: var(--thumb-border-radius);\n        transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host([toggled]) #thumb {\n        left: calc(100% - var(--thumb-size));\n      }\n      :host([mixed]) #thumb {\n        left: calc(50% - var(--thumb-size) / 2);\n      }\n\n      /**\n       * Focus ring\n       */\n\n      #focus-ring {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: var(--thumb-size);\n        height: var(--thumb-size);\n        transform: translate(-50%, -50%);\n        background: transparent;\n        border: 0px solid var(--focus-ring-color);\n        border-radius: 999px;\n        opacity: var(--focus-ring-opacity);\n        transition: border-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);\n      }\n      :host(:focus) #thumb #focus-ring {\n        border-width: var(--focus-ring-width);\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples .ripple {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: calc(var(--thumb-size) + 22px);\n        height: calc(var(--thumb-size) + 22px);\n        transform: translate(-50%, -50%);\n        background: var(--ripple-background);\n        border-radius: 999px;\n        opacity: var(--ripple-opacity);\n      }\n    </style>\n\n    <x-box id=\"main\">\n      <div id=\"track\"></div>\n\n      <div id=\"thumb\">\n        <div id=\"focus-ring\"></div>\n        <div id=\"ripples\"></div>\n      </div>\n    </x-box>\n  </template>\n"]),
    _templateObject32 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        box-sizing: border-box;\n        cursor: default;\n        user-select: none;\n        --menu-position: below; /* over, below */\n        --trigger-effect: none; /* ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --arrow-width: 9px;\n        --arrow-height: 9px;\n        --arrow-margin: 1px 0 0 3px;\n        --arrow-d: path(\"M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.01 31.6 Z\");\n        --selection-indicator-height: 3px;\n        --selection-indicator-background: white;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      #content {\n        display: inherit;\n        flex-flow:inherit;\n        align-items: inherit;\n        z-index: 100;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow {\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        margin: var(--arrow-margin);\n        color: currentColor;\n        d: var(--arrow-d);\n      }\n\n      #arrow-path {\n        fill: currentColor;\n        d: inherit;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        z-index: 0;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        pointer-events: none;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Selection indicator\n       */\n\n      #selection-indicator {\n        display: none;\n        width: 100%;\n        height: var(--selection-indicator-height);\n        background: var(--selection-indicator-background);\n        position: absolute;\n        bottom: 0;\n        left: 0;\n      }\n      :host([selected]) #selection-indicator {\n        display: block;\n      }\n      :host-context([animatingindicator]) #selection-indicator {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <div id=\"selection-indicator\"></div>\n\n    <div id=\"content\">\n      <slot></slot>\n\n      <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" hidden>\n        <path id=\"arrow-path\"></path>\n      </svg>\n    </div>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        height: 100%;\n        box-sizing: border-box;\n        cursor: default;\n        user-select: none;\n        --menu-position: below; /* over, below */\n        --trigger-effect: none; /* ripple, none */\n        --ripple-background: currentColor;\n        --ripple-opacity: 0.2;\n        --arrow-width: 9px;\n        --arrow-height: 9px;\n        --arrow-margin: 1px 0 0 3px;\n        --arrow-d: path(\"M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.01 31.6 Z\");\n        --selection-indicator-height: 3px;\n        --selection-indicator-background: white;\n      }\n      :host(:focus) {\n        outline: none;\n      }\n\n      #content {\n        display: inherit;\n        flex-flow:inherit;\n        align-items: inherit;\n        z-index: 100;\n      }\n\n      /**\n       * Arrow\n       */\n\n      #arrow {\n        width: var(--arrow-width);\n        height: var(--arrow-height);\n        margin: var(--arrow-margin);\n        color: currentColor;\n        d: var(--arrow-d);\n      }\n\n      #arrow-path {\n        fill: currentColor;\n        d: inherit;\n      }\n\n      /**\n       * Ripples\n       */\n\n      #ripples {\n        position: absolute;\n        z-index: 0;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        pointer-events: none;\n      }\n\n      #ripples .ripple {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 200px;\n        height: 200px;\n        background: var(--ripple-background);\n        opacity: var(--ripple-opacity);\n        border-radius: 999px;\n        transform: none;\n        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);\n        will-change: opacity, transform;\n        pointer-events: none;\n      }\n\n      /**\n       * Selection indicator\n       */\n\n      #selection-indicator {\n        display: none;\n        width: 100%;\n        height: var(--selection-indicator-height);\n        background: var(--selection-indicator-background);\n        position: absolute;\n        bottom: 0;\n        left: 0;\n      }\n      :host([selected]) #selection-indicator {\n        display: block;\n      }\n      :host-context([animatingindicator]) #selection-indicator {\n        display: none;\n      }\n    </style>\n\n    <div id=\"ripples\"></div>\n    <div id=\"selection-indicator\"></div>\n\n    <div id=\"content\">\n      <slot></slot>\n\n      <svg id=\"arrow\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" hidden>\n        <path id=\"arrow-path\"></path>\n      </svg>\n    </div>\n  </template>\n"]),
    _templateObject33 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        position: relative;\n        display: flex;\n        width: 100%;\n        height: 100%;\n        box-sizing: border-box;\n        justify-content: flex-start;\n      }\n      :host([centered]) {\n        margin: 0 auto;\n        justify-content: center;\n      }\n\n      :host([centered]) ::slotted(x-tab) {\n        flex: 0;\n      }\n\n      #selection-indicator {\n        position: absolute;\n        width: 100%;\n        height: fit-content;\n        bottom: 0;\n        left: 0;\n        pointer-events: none;\n      }\n    </style>\n\n    <slot></slot>\n    <div id=\"selection-indicator\" hidden></div>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        position: relative;\n        display: flex;\n        width: 100%;\n        height: 100%;\n        box-sizing: border-box;\n        justify-content: flex-start;\n      }\n      :host([centered]) {\n        margin: 0 auto;\n        justify-content: center;\n      }\n\n      :host([centered]) ::slotted(x-tab) {\n        flex: 0;\n      }\n\n      #selection-indicator {\n        position: absolute;\n        width: 100%;\n        height: fit-content;\n        bottom: 0;\n        left: 0;\n        pointer-events: none;\n      }\n    </style>\n\n    <slot></slot>\n    <div id=\"selection-indicator\" hidden></div>\n  </template>\n"]),
    _templateObject34 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        position: relative;\n        box-sizing: border-box;\n        min-height: 24px;\n        background: white;\n        border: 1px solid #BFBFBF;\n        font-size: 12px;\n        --close-button-path-d: path(\n          \"M 25 16 L 50 41 L 75 16 L 84 25 L 59 50 L 84 75 L 75 84 L 50 59 L 25 84 L 16 75 L 41 50 L 16 25 Z\"\n        );\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --tag-background: rgba(0, 0, 0, 0.04);\n        --tag-border: 1px solid #cccccc;\n        --tag-color: currentColor;\n      }\n      :host(:focus) {\n        outline: 1px solid blue;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        min-height: inherit;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: flex-start;\n        align-items: center;\n        align-content: flex-start;\n        cursor: text;\n      }\n\n      #items {\n        display: flex;\n        flex-wrap: wrap;\n        padding: 2px;\n      }\n      :host([mixed]) #items {\n        opacity: 0.7;\n      }\n\n      .item {\n        height: 100%;\n        margin: 2px;\n        padding: 0px 3px 0 6px;\n        display: flex;\n        line-height: 1.2;\n        align-items: center;\n        justify-content: center;\n        background: var(--tag-background);\n        border: var(--tag-border);\n        color: var(--tag-color);\n        font-size: inherit;\n        cursor: default;\n        user-select: none;\n      }\n      .item#editable-item {\n        color: inherit;\n        outline: none;\n        background: none;\n        border: 1px solid transparent;\n        flex-grow: 1;\n        align-items: center;\n        justify-content: flex-start;\n        white-space: pre;\n        cursor: text;\n        user-select: text;\n      }\n\n      .item .close-button {\n        color: inherit;\n        opacity: 0.8;\n        width: 11px;\n        height: 11px;\n        vertical-align: middle;\n        margin-left: 4px;\n      }\n      .item .close-button:hover {\n        background: rgba(0, 0, 0, 0.1);\n        opacity: 1;\n      }\n\n      .item .close-button-path {\n        fill: currentColor;\n        d: var(--close-button-path-d);\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"items\">\n        <span id=\"editable-item\" class=\"item\" spellcheck=\"false\"></span>\n      </div>\n      <slot></slot>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: flex;\n        align-items: center;\n        position: relative;\n        box-sizing: border-box;\n        min-height: 24px;\n        background: white;\n        border: 1px solid #BFBFBF;\n        font-size: 12px;\n        --close-button-path-d: path(\n          \"M 25 16 L 50 41 L 75 16 L 84 25 L 59 50 L 84 75 L 75 84 L 50 59 L 25 84 L 16 75 L 41 50 L 16 25 Z\"\n        );\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --tag-background: rgba(0, 0, 0, 0.04);\n        --tag-border: 1px solid #cccccc;\n        --tag-color: currentColor;\n      }\n      :host(:focus) {\n        outline: 1px solid blue;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n        min-height: inherit;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: flex-start;\n        align-items: center;\n        align-content: flex-start;\n        cursor: text;\n      }\n\n      #items {\n        display: flex;\n        flex-wrap: wrap;\n        padding: 2px;\n      }\n      :host([mixed]) #items {\n        opacity: 0.7;\n      }\n\n      .item {\n        height: 100%;\n        margin: 2px;\n        padding: 0px 3px 0 6px;\n        display: flex;\n        line-height: 1.2;\n        align-items: center;\n        justify-content: center;\n        background: var(--tag-background);\n        border: var(--tag-border);\n        color: var(--tag-color);\n        font-size: inherit;\n        cursor: default;\n        user-select: none;\n      }\n      .item#editable-item {\n        color: inherit;\n        outline: none;\n        background: none;\n        border: 1px solid transparent;\n        flex-grow: 1;\n        align-items: center;\n        justify-content: flex-start;\n        white-space: pre;\n        cursor: text;\n        user-select: text;\n      }\n\n      .item .close-button {\n        color: inherit;\n        opacity: 0.8;\n        width: 11px;\n        height: 11px;\n        vertical-align: middle;\n        margin-left: 4px;\n      }\n      .item .close-button:hover {\n        background: rgba(0, 0, 0, 0.1);\n        opacity: 1;\n      }\n\n      .item .close-button-path {\n        fill: currentColor;\n        d: var(--close-button-path-d);\n      }\n    </style>\n\n    <main id=\"main\">\n      <div id=\"items\">\n        <span id=\"editable-item\" class=\"item\" spellcheck=\"false\"></span>\n      </div>\n      <slot></slot>\n    </main>\n  </template>\n"]),
    _templateObject35 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        width: 100%;\n        min-height: 100px;\n        box-sizing: border-box;\n        background: white;\n        color: #000000;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      ::-webkit-scrollbar {\n        max-width: 6px;\n        max-height: 6px;\n        background: none;\n      }\n      ::-webkit-scrollbar-track {\n        border-radius: 25px;\n      }\n      ::-webkit-scrollbar-thumb {\n        background-color: rgba(0, 0, 0, 0.2);\n        border-radius: 25px;\n      }\n      ::-webkit-scrollbar-corner {\n        display: none\n      }\n\n      #main {\n        display: flex;\n        flex-flow: column;\n        height: 100%;\n        min-height: inherit;\n        max-height: inherit;\n        overflow-y: auto;\n      }\n\n      #editor {\n        flex: 1;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        overflow: auto;\n      }\n\n      /* Error text */\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        bottom: -20px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error) \" \";\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <div id=\"editor\" contenteditable=\"plaintext-only\" spellcheck=\"false\"></div>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        width: 100%;\n        min-height: 100px;\n        box-sizing: border-box;\n        background: white;\n        color: #000000;\n        --selection-color: currentColor;\n        --selection-background: #B2D7FD;\n        --inner-padding: 0;\n      }\n      :host(:hover) {\n        cursor: text;\n      }\n      :host([error]) {\n        --selection-color: white;\n        --selection-background: #d50000;\n      }\n      :host([mixed]) {\n        color: rgba(0, 0, 0, 0.7);\n      }\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.5;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n\n      ::selection {\n        color: var(--selection-color);\n        background: var(--selection-background);\n      }\n\n      ::-webkit-scrollbar {\n        max-width: 6px;\n        max-height: 6px;\n        background: none;\n      }\n      ::-webkit-scrollbar-track {\n        border-radius: 25px;\n      }\n      ::-webkit-scrollbar-thumb {\n        background-color: rgba(0, 0, 0, 0.2);\n        border-radius: 25px;\n      }\n      ::-webkit-scrollbar-corner {\n        display: none\n      }\n\n      #main {\n        display: flex;\n        flex-flow: column;\n        height: 100%;\n        min-height: inherit;\n        max-height: inherit;\n        overflow-y: auto;\n      }\n\n      #editor {\n        flex: 1;\n        padding: var(--inner-padding);\n        box-sizing: border-box;\n        color: inherit;\n        background: none;\n        border: none;\n        outline: none;\n        font-family: inherit;\n        font-size: inherit;\n        overflow: auto;\n      }\n\n      /* Error text */\n      :host([error])::before {\n        position: absolute;\n        left: 0;\n        bottom: -20px;\n        box-sizing: border-box;\n        color: #d50000;\n        font-family: inherit;\n        font-size: 11px;\n        line-height: 1.2;\n        white-space: pre;\n        content: attr(error) \" \";\n      }\n    </style>\n\n    <main id=\"main\">\n      <slot></slot>\n      <div id=\"editor\" contenteditable=\"plaintext-only\" spellcheck=\"false\"></div>\n    </main>\n  </template>\n"]),
    _templateObject36 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 30px;\n        height: 30px;\n        box-sizing: border-box;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host([type=\"ring\"]) {\n        color: #4285f4;\n      }\n      :host([type=\"spin\"]) {\n        color: #404040;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n      }\n\n      svg {\n        color: inherit;\n        width: 100%;\n        height: 100%;\n      }\n    </style>\n\n    <main id=\"main\"></main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 30px;\n        height: 30px;\n        box-sizing: border-box;\n      }\n      :host([hidden]) {\n        display: none;\n      }\n      :host([type=\"ring\"]) {\n        color: #4285f4;\n      }\n      :host([type=\"spin\"]) {\n        color: #404040;\n      }\n\n      #main {\n        width: 100%;\n        height: 100%;\n      }\n\n      svg {\n        color: inherit;\n        width: 100%;\n        height: 100%;\n      }\n    </style>\n\n    <main id=\"main\"></main>\n  </template>\n"]),
    _templateObject37 = _taggedTemplateLiteral(["\n  <template>\n    <link rel=\"stylesheet\" href=\"", "\">\n\n    <style>\n      :host {\n        width: 100%;\n        height: 100%;\n        display: block;\n      }\n\n      #main {\n        position: relative;\n        display: flex;\n        flex-flow: row;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Navigation\n       */\n\n      #sidebar {\n        position: relative;\n        width: 270px;\n        overflow: auto;\n        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),\n                    0px 1px 1px 0px rgba(0,0,0,0.14),\n                    0px 1px 3px 0px rgba(0,0,0,0.12);\n        z-index: 100;\n      }\n\n      #sidebar #header {\n        padding: 20px 0;\n      }\n\n      #sidebar #header + hr {\n        margin-top: -1px;\n      }\n\n      #sidebar h1 {\n        margin: 0px 22px 0px 104px;\n        line-height: 1;\n      }\n\n      #sidebar #nav {\n        margin-bottom: 20px;\n        width: 100%;\n      }\n\n      #sidebar #nav .external-link-icon {\n        margin: 0;\n        width: 20px;\n        height: 20px;\n      }\n\n      #sidebar #nav x-button {\n        width: calc(100% + 60px);\n        margin-left: -30px;\n        padding: 8px 30px;\n        --ripple-background: white;\n      }\n\n      #sidebar #nav x-button x-label {\n        font-size: 15px;\n      }\n\n      #hide-sidebar-button {\n        position: absolute;\n        top: 18px;\n        left: 11px;\n        padding: 0;\n        width: 32px;\n        height: 32px;\n        min-height: 32px;\n      }\n\n      #show-sidebar-button {\n        position: absolute;\n        top: 20px;\n        left: 11px;\n        z-index: 10;\n        padding: 0;\n        width: 32px;\n        height: 32px;\n        min-height: 32px;\n      }\n\n      #theme-section {\n        padding: 10px 0px;\n      }\n\n      #theme-section #theme-heading {\n        margin-top: 0;\n      }\n\n      #theme-section x-select {\n        width: 100%;\n      }\n\n      #theme-section #theme-select {\n        margin-bottom: 14px;\n      }\n\n      /**\n       * Views\n       */\n\n      #views {\n        display: block;\n        width: 100%;\n        height: 100%;\n        min-width: 20px;\n        min-height: 20px;\n        position: relative;\n        flex: 1;\n      }\n\n      #views > .view {\n        display: block;\n        width: 100%;\n        height: 100%;\n        box-sizing: border-box;\n        overflow: auto;\n      }\n      #views > .view:not([selected]) {\n        display: none !important;\n      }\n\n      #views > .view > article {\n        padding: 0 70px;\n        margin: 0 auto;\n        max-width: 780px;\n        box-sizing: border-box;\n      }\n\n      #views section {\n        margin-bottom: 35px;\n      }\n\n      #views section[hidden] + hr,\n      #views section[data-last-visible] + hr {\n        display: none;\n      }\n\n      #views section h3,\n      #views section h4,\n      #views section h5 {\n        position: relative;\n      }\n\n      /* \"About\" view */\n\n      #views #about-view {\n        color: white;\n        width: 100%;\n        height: 100vh;\n        display: flex;\n        align-items: center;\n        padding: 0 100px;\n        margin: 0;\n        max-width: none;\n        box-sizing: border-box;\n      }\n\n      #about-view h1 {\n        font-size: 170px;\n        font-weight: 700;\n        line-height: 1.5;\n        margin: 0 0 50px 0;\n        padding: 0;\n        line-height: 1;\n      }\n      @media screen and (max-width: 880px) {\n        #about-view h1  {\n          font-size: 120px;\n        }\n      }\n\n      #about-view h2 {\n        font-size: 27px;\n        font-weight: 400;\n        line-height: 1.05;\n        color: rgba(255,255,255, 0.8);\n        margin: 0 0 20px 0;\n        text-transform: none;\n      }\n\n      #about-view h2 em {\n        color: rgba(255,255,255, 0.95);\n        font-style: normal;\n        font-weight: 700;\n      }\n\n      /* \"Setup\" view */\n\n      #views #setup-view h3 {\n        margin-bottom: 0;\n      }\n\n      #views #setup-view h3 x-icon {\n        width: 40px;\n        height: auto;\n        display: inline-block;\n        vertical-align: middle;\n      }\n\n      #views #setup-view pre {\n        display: block;\n        white-space: pre;\n        overflow: auto;\n      }\n\n      #views #setup-view dd {\n        margin: 0 0 18px 0;\n      }\n      #views #setup-view dd:last-of-type {\n        margin: 0;\n      }\n\n      /* \"FAQ\" view */\n\n      #views #faq-view h4 {\n        margin-top: 0;\n      }\n\n      /* \"Resources\" view */\n\n      #views #resources-view ul {\n        margin-bottom: 0;\n        padding-left: 20px;\n      }\n    </style>\n\n    <main id=\"main\">\n      <x-button id=\"show-sidebar-button\" icon=\"menu\" skin=\"textured\">\n        <x-icon name=\"menu\"></x-icon>\n      </x-button>\n\n      <sidebar id=\"sidebar\">\n        <header id=\"header\">\n          <h1 id=\"logo\">Xel</h1>\n\n          <x-button id=\"hide-sidebar-button\" skin=\"textured\">\n            <x-icon name=\"chevron-left\"></x-icon>\n          </x-button>\n        </header>\n\n        <hr/>\n\n        <nav id=\"nav\">\n          <section>\n            <a href=\"/\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"info\"></x-icon>\n                <x-label>About</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/setup\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"build\"></x-icon>\n                <x-label>Setup</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/faq\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"question-answer\"></x-icon>\n                <x-label>FAQ</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/resources\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"book\"></x-icon>\n                <x-label>Resources</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <a href=\"https://github.com/jarek-foksa/xel\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"code\"></x-icon>\n                <x-label>Source Code</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n\n            <a href=\"https://github.com/jarek-foksa/xel/issues\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"bug-report\"></x-icon>\n                <x-label>Bugs</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n\n            <a href=\"https://github.com/jarek-foksa/xel/commits\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"event\"></x-icon>\n                <x-label>Changelog</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section id=\"theme-section\">\n            <div id=\"theme-subsection\">\n              <h3 id=\"theme-heading\">Theme</h3>\n\n              <x-select id=\"theme-select\">\n                <x-menu>\n                  <x-menuitem value=\"macos\">\n                    <x-label>MacOS</x-label>\n                  </x-menuitem>\n\n                  <x-menuitem value=\"material\" toggled>\n                    <x-label>Material</x-label>\n                  </x-menuitem>\n\n                  <x-menuitem value=\"vanilla\">\n                    <x-label>Vanilla</x-label>\n                  </x-menuitem>\n                </x-menu>\n              </x-select>\n            </div>\n\n            <div id=\"accent-color-subsection\">\n              <h3>Accent color</h3>\n\n              <x-select id=\"accent-color-select\">\n                <x-menu id=\"accent-color-menu\"></x-menu>\n              </x-select>\n            </div>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Primitives</h3>\n\n            <a href=\"/elements/x-box\">\n              <x-button skin=\"nav\">\n                <x-label>x-box</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-card\">\n              <x-button skin=\"nav\">\n                <x-label>x-card</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-accordion\">\n              <x-button skin=\"nav\">\n                <x-label>x-accordion</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-icon\">\n              <x-button skin=\"nav\">\n                <x-label>x-icon</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-label\">\n              <x-button skin=\"nav\">\n                <x-label>x-label</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-shortcut\">\n              <x-button skin=\"nav\">\n                <x-label>x-shortcut</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-stepper\">\n              <x-button skin=\"nav\">\n                <x-label>x-stepper</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-swatch\">\n              <x-button skin=\"nav\">\n                <x-label>x-swatch</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Buttons</h3>\n\n            <a href=\"/elements/x-button\">\n              <x-button skin=\"nav\">\n                <x-label>x-button</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-buttons\">\n              <x-button skin=\"nav\">\n                <x-label>x-buttons</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Tabs</h3>\n\n            <a href=\"/elements/x-tabs\">\n              <x-button skin=\"nav\">\n                <x-label>x-tabs</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-doctabs\">\n              <x-button skin=\"nav\">\n                <x-label>x-doctabs</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Menus</h3>\n\n            <a href=\"/elements/x-menu\">\n              <x-button skin=\"nav\">\n                <x-label>x-menu</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-menuitem\">\n              <x-button skin=\"nav\">\n                <x-label>x-menuitem</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-menubar\">\n              <x-button skin=\"nav\">\n                <x-label>x-menubar</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-contextmenu\">\n              <x-button skin=\"nav\">\n                <x-label>x-contextmenu</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Popups</h3>\n\n            <a href=\"/elements/dialog\">\n              <x-button skin=\"nav\">\n                <x-label>dialog</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-popover\">\n              <x-button skin=\"nav\">\n                <x-label>x-popover</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-notification\">\n              <x-button skin=\"nav\">\n                <x-label>x-notification</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Forms</h3>\n\n            <a href=\"/elements/x-checkbox\">\n              <x-button skin=\"nav\">\n                <x-label>x-checkbox</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-radio\">\n              <x-button skin=\"nav\">\n                <x-label>x-radio</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-switch\">\n              <x-button skin=\"nav\">\n                <x-label>x-switch</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-select\">\n              <x-button skin=\"nav\">\n                <x-label>x-select</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-colorselect\">\n              <x-button skin=\"nav\">\n                <x-label>x-colorselect</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-dateselect\">\n              <x-button skin=\"nav\">\n                <x-label>x-dateselect</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-input\">\n              <x-button skin=\"nav\">\n                <x-label>x-input</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-numberinput\">\n              <x-button skin=\"nav\">\n                <x-label>x-numberinput</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-taginput\">\n              <x-button skin=\"nav\">\n                <x-label>x-taginput</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-textarea\">\n              <x-button skin=\"nav\">\n                <x-label>x-textarea</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-slider\">\n              <x-button skin=\"nav\">\n                <x-label>x-slider</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Progress</h3>\n\n            <a href=\"/elements/x-progressbar\">\n              <x-button skin=\"nav\">\n                <x-label>x-progressbar</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-throbber\">\n              <x-button skin=\"nav\">\n                <x-label>x-throbber</x-label>\n              </x-button>\n            </a>\n          </section>\n        </nav>\n      </sidebar>\n\n      <div id=\"views\"></div>\n    </main>\n  </template>\n"], ["\n  <template>\n    <link rel=\"stylesheet\" href=\"", "\">\n\n    <style>\n      :host {\n        width: 100%;\n        height: 100%;\n        display: block;\n      }\n\n      #main {\n        position: relative;\n        display: flex;\n        flex-flow: row;\n        width: 100%;\n        height: 100%;\n      }\n\n      /**\n       * Navigation\n       */\n\n      #sidebar {\n        position: relative;\n        width: 270px;\n        overflow: auto;\n        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),\n                    0px 1px 1px 0px rgba(0,0,0,0.14),\n                    0px 1px 3px 0px rgba(0,0,0,0.12);\n        z-index: 100;\n      }\n\n      #sidebar #header {\n        padding: 20px 0;\n      }\n\n      #sidebar #header + hr {\n        margin-top: -1px;\n      }\n\n      #sidebar h1 {\n        margin: 0px 22px 0px 104px;\n        line-height: 1;\n      }\n\n      #sidebar #nav {\n        margin-bottom: 20px;\n        width: 100%;\n      }\n\n      #sidebar #nav .external-link-icon {\n        margin: 0;\n        width: 20px;\n        height: 20px;\n      }\n\n      #sidebar #nav x-button {\n        width: calc(100% + 60px);\n        margin-left: -30px;\n        padding: 8px 30px;\n        --ripple-background: white;\n      }\n\n      #sidebar #nav x-button x-label {\n        font-size: 15px;\n      }\n\n      #hide-sidebar-button {\n        position: absolute;\n        top: 18px;\n        left: 11px;\n        padding: 0;\n        width: 32px;\n        height: 32px;\n        min-height: 32px;\n      }\n\n      #show-sidebar-button {\n        position: absolute;\n        top: 20px;\n        left: 11px;\n        z-index: 10;\n        padding: 0;\n        width: 32px;\n        height: 32px;\n        min-height: 32px;\n      }\n\n      #theme-section {\n        padding: 10px 0px;\n      }\n\n      #theme-section #theme-heading {\n        margin-top: 0;\n      }\n\n      #theme-section x-select {\n        width: 100%;\n      }\n\n      #theme-section #theme-select {\n        margin-bottom: 14px;\n      }\n\n      /**\n       * Views\n       */\n\n      #views {\n        display: block;\n        width: 100%;\n        height: 100%;\n        min-width: 20px;\n        min-height: 20px;\n        position: relative;\n        flex: 1;\n      }\n\n      #views > .view {\n        display: block;\n        width: 100%;\n        height: 100%;\n        box-sizing: border-box;\n        overflow: auto;\n      }\n      #views > .view:not([selected]) {\n        display: none !important;\n      }\n\n      #views > .view > article {\n        padding: 0 70px;\n        margin: 0 auto;\n        max-width: 780px;\n        box-sizing: border-box;\n      }\n\n      #views section {\n        margin-bottom: 35px;\n      }\n\n      #views section[hidden] + hr,\n      #views section[data-last-visible] + hr {\n        display: none;\n      }\n\n      #views section h3,\n      #views section h4,\n      #views section h5 {\n        position: relative;\n      }\n\n      /* \"About\" view */\n\n      #views #about-view {\n        color: white;\n        width: 100%;\n        height: 100vh;\n        display: flex;\n        align-items: center;\n        padding: 0 100px;\n        margin: 0;\n        max-width: none;\n        box-sizing: border-box;\n      }\n\n      #about-view h1 {\n        font-size: 170px;\n        font-weight: 700;\n        line-height: 1.5;\n        margin: 0 0 50px 0;\n        padding: 0;\n        line-height: 1;\n      }\n      @media screen and (max-width: 880px) {\n        #about-view h1  {\n          font-size: 120px;\n        }\n      }\n\n      #about-view h2 {\n        font-size: 27px;\n        font-weight: 400;\n        line-height: 1.05;\n        color: rgba(255,255,255, 0.8);\n        margin: 0 0 20px 0;\n        text-transform: none;\n      }\n\n      #about-view h2 em {\n        color: rgba(255,255,255, 0.95);\n        font-style: normal;\n        font-weight: 700;\n      }\n\n      /* \"Setup\" view */\n\n      #views #setup-view h3 {\n        margin-bottom: 0;\n      }\n\n      #views #setup-view h3 x-icon {\n        width: 40px;\n        height: auto;\n        display: inline-block;\n        vertical-align: middle;\n      }\n\n      #views #setup-view pre {\n        display: block;\n        white-space: pre;\n        overflow: auto;\n      }\n\n      #views #setup-view dd {\n        margin: 0 0 18px 0;\n      }\n      #views #setup-view dd:last-of-type {\n        margin: 0;\n      }\n\n      /* \"FAQ\" view */\n\n      #views #faq-view h4 {\n        margin-top: 0;\n      }\n\n      /* \"Resources\" view */\n\n      #views #resources-view ul {\n        margin-bottom: 0;\n        padding-left: 20px;\n      }\n    </style>\n\n    <main id=\"main\">\n      <x-button id=\"show-sidebar-button\" icon=\"menu\" skin=\"textured\">\n        <x-icon name=\"menu\"></x-icon>\n      </x-button>\n\n      <sidebar id=\"sidebar\">\n        <header id=\"header\">\n          <h1 id=\"logo\">Xel</h1>\n\n          <x-button id=\"hide-sidebar-button\" skin=\"textured\">\n            <x-icon name=\"chevron-left\"></x-icon>\n          </x-button>\n        </header>\n\n        <hr/>\n\n        <nav id=\"nav\">\n          <section>\n            <a href=\"/\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"info\"></x-icon>\n                <x-label>About</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/setup\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"build\"></x-icon>\n                <x-label>Setup</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/faq\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"question-answer\"></x-icon>\n                <x-label>FAQ</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/resources\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"book\"></x-icon>\n                <x-label>Resources</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <a href=\"https://github.com/jarek-foksa/xel\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"code\"></x-icon>\n                <x-label>Source Code</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n\n            <a href=\"https://github.com/jarek-foksa/xel/issues\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"bug-report\"></x-icon>\n                <x-label>Bugs</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n\n            <a href=\"https://github.com/jarek-foksa/xel/commits\" target=\"_blank\">\n              <x-button skin=\"nav\">\n                <x-icon name=\"event\"></x-icon>\n                <x-label>Changelog</x-label>\n                <x-icon class=\"external-link-icon\" name=\"exit-to-app\"></x-icon>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section id=\"theme-section\">\n            <div id=\"theme-subsection\">\n              <h3 id=\"theme-heading\">Theme</h3>\n\n              <x-select id=\"theme-select\">\n                <x-menu>\n                  <x-menuitem value=\"macos\">\n                    <x-label>MacOS</x-label>\n                  </x-menuitem>\n\n                  <x-menuitem value=\"material\" toggled>\n                    <x-label>Material</x-label>\n                  </x-menuitem>\n\n                  <x-menuitem value=\"vanilla\">\n                    <x-label>Vanilla</x-label>\n                  </x-menuitem>\n                </x-menu>\n              </x-select>\n            </div>\n\n            <div id=\"accent-color-subsection\">\n              <h3>Accent color</h3>\n\n              <x-select id=\"accent-color-select\">\n                <x-menu id=\"accent-color-menu\"></x-menu>\n              </x-select>\n            </div>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Primitives</h3>\n\n            <a href=\"/elements/x-box\">\n              <x-button skin=\"nav\">\n                <x-label>x-box</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-card\">\n              <x-button skin=\"nav\">\n                <x-label>x-card</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-accordion\">\n              <x-button skin=\"nav\">\n                <x-label>x-accordion</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-icon\">\n              <x-button skin=\"nav\">\n                <x-label>x-icon</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-label\">\n              <x-button skin=\"nav\">\n                <x-label>x-label</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-shortcut\">\n              <x-button skin=\"nav\">\n                <x-label>x-shortcut</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-stepper\">\n              <x-button skin=\"nav\">\n                <x-label>x-stepper</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-swatch\">\n              <x-button skin=\"nav\">\n                <x-label>x-swatch</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Buttons</h3>\n\n            <a href=\"/elements/x-button\">\n              <x-button skin=\"nav\">\n                <x-label>x-button</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-buttons\">\n              <x-button skin=\"nav\">\n                <x-label>x-buttons</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Tabs</h3>\n\n            <a href=\"/elements/x-tabs\">\n              <x-button skin=\"nav\">\n                <x-label>x-tabs</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-doctabs\">\n              <x-button skin=\"nav\">\n                <x-label>x-doctabs</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Menus</h3>\n\n            <a href=\"/elements/x-menu\">\n              <x-button skin=\"nav\">\n                <x-label>x-menu</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-menuitem\">\n              <x-button skin=\"nav\">\n                <x-label>x-menuitem</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-menubar\">\n              <x-button skin=\"nav\">\n                <x-label>x-menubar</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-contextmenu\">\n              <x-button skin=\"nav\">\n                <x-label>x-contextmenu</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Popups</h3>\n\n            <a href=\"/elements/dialog\">\n              <x-button skin=\"nav\">\n                <x-label>dialog</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-popover\">\n              <x-button skin=\"nav\">\n                <x-label>x-popover</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-notification\">\n              <x-button skin=\"nav\">\n                <x-label>x-notification</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Forms</h3>\n\n            <a href=\"/elements/x-checkbox\">\n              <x-button skin=\"nav\">\n                <x-label>x-checkbox</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-radio\">\n              <x-button skin=\"nav\">\n                <x-label>x-radio</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-switch\">\n              <x-button skin=\"nav\">\n                <x-label>x-switch</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-select\">\n              <x-button skin=\"nav\">\n                <x-label>x-select</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-colorselect\">\n              <x-button skin=\"nav\">\n                <x-label>x-colorselect</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-dateselect\">\n              <x-button skin=\"nav\">\n                <x-label>x-dateselect</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-input\">\n              <x-button skin=\"nav\">\n                <x-label>x-input</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-numberinput\">\n              <x-button skin=\"nav\">\n                <x-label>x-numberinput</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-taginput\">\n              <x-button skin=\"nav\">\n                <x-label>x-taginput</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-textarea\">\n              <x-button skin=\"nav\">\n                <x-label>x-textarea</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-slider\">\n              <x-button skin=\"nav\">\n                <x-label>x-slider</x-label>\n              </x-button>\n            </a>\n          </section>\n\n          <hr/>\n\n          <section>\n            <h3>Progress</h3>\n\n            <a href=\"/elements/x-progressbar\">\n              <x-button skin=\"nav\">\n                <x-label>x-progressbar</x-label>\n              </x-button>\n            </a>\n\n            <a href=\"/elements/x-throbber\">\n              <x-button skin=\"nav\">\n                <x-label>x-throbber</x-label>\n              </x-button>\n            </a>\n          </section>\n        </nav>\n      </sidebar>\n\n      <div id=\"views\"></div>\n    </main>\n  </template>\n"]),
    _templateObject38 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        box-sizing: border-box;\n        background: white;\n        padding: 14px;\n        --selection-background: #B2D7FD;\n      }\n\n      ::selection {\n        background: var(--selection-background);\n      }\n\n      #code {\n        display: block;\n        white-space: pre-wrap;\n        overflow-x: auto;\n        font-size: 13px;\n        line-height: 18px;\n        outline: none;\n        background: none;\n        padding: 0;\n      }\n    </style>\n\n    <link id=\"prism-theme\" rel=\"stylesheet\">\n    <code id=\"code\" class=\"language-html\"></code>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n        width: 100%;\n        box-sizing: border-box;\n        background: white;\n        padding: 14px;\n        --selection-background: #B2D7FD;\n      }\n\n      ::selection {\n        background: var(--selection-background);\n      }\n\n      #code {\n        display: block;\n        white-space: pre-wrap;\n        overflow-x: auto;\n        font-size: 13px;\n        line-height: 18px;\n        outline: none;\n        background: none;\n        padding: 0;\n      }\n    </style>\n\n    <link id=\"prism-theme\" rel=\"stylesheet\">\n    <code id=\"code\" class=\"language-html\"></code>\n  </template>\n"]),
    _templateObject39 = _taggedTemplateLiteral(["\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n\n      #code-view {\n        margin-top: 25px;\n      }\n      :host([compact]) #code-view {\n        max-height: 350px;\n        overflow: scroll;\n      }\n    </style>\n\n    <link rel=\"stylesheet\" href=\"", "\">\n\n    <main>\n      <div id=\"live-view\"></div>\n      <xel-codeview id=\"code-view\"></xel-codeview>\n    </main>\n  </template>\n"], ["\n  <template>\n    <style>\n      :host {\n        display: block;\n      }\n\n      #code-view {\n        margin-top: 25px;\n      }\n      :host([compact]) #code-view {\n        max-height: 350px;\n        overflow: scroll;\n      }\n    </style>\n\n    <link rel=\"stylesheet\" href=\"", "\">\n\n    <main>\n      <div id=\"live-view\"></div>\n      <xel-codeview id=\"code-view\"></xel-codeview>\n    </main>\n  </template>\n"]);

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  //
  // DOMRect polfyill
  //

  // @doc
  //   https://drafts.fxtf.org/geometry/#DOMRect
  //   https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/geometry/dom_rect_read_only.cc

  {
    if (window.DOMRect === undefined) {
      var _DOMRect = function () {
        function _DOMRect(x, y, width, height) {
          _classCallCheck(this, _DOMRect);

          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
        }

        _createClass(_DOMRect, [{
          key: "top",
          get: function get() {
            return this.y;
          }
        }, {
          key: "left",
          get: function get() {
            return this.x;
          }
        }, {
          key: "right",
          get: function get() {
            return this.x + this.width;
          }
        }, {
          key: "bottom",
          get: function get() {
            return this.y + this.height;
          }
        }], [{
          key: "fromRect",
          value: function fromRect(otherRect) {
            return new _DOMRect(otherRect.x, otherRect.y, otherRect.width, otherRect.height);
          }
        }]);

        return _DOMRect;
      }();

      window.DOMRect = _DOMRect;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //
  // ClientRect polyfill
  //

  if (window.ClientRect) {
    if (window.ClientRect.prototype.hasOwnProperty("x") === false) {
      Object.defineProperty(window.ClientRect.prototype, "x", {
        get: function get() {
          return this.left;
        },
        set: function set(value) {
          this.left = value;
        }
      });
    }
    if (window.ClientRect.prototype.hasOwnProperty("y") === false) {
      Object.defineProperty(window.ClientRect.prototype, "y", {
        get: function get() {
          return this.top;
        },
        set: function set(value) {
          this.top = value;
        }
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // HTML dialog polyfill
  //

  {
    var showModal = HTMLDialogElement.prototype.showModal;
    var close = HTMLDialogElement.prototype.close;

    HTMLDialogElement.prototype.showModal = function () {
      var _this = this,
          _arguments = arguments;

      return new Promise(async function (resolve) {
        showModal.apply(_this, _arguments);

        var dialogRect = _this.getBoundingClientRect();
        var transitionDuration = parseFloat(getComputedStyle(_this).getPropertyValue("transition-duration")) * 1000;
        var transitionTimingFunction = getComputedStyle(_this).getPropertyValue("transition-timing-function");
        var animation = void 0;

        // Animate from left
        if (getComputedStyle(_this).left === "0px" && getComputedStyle(_this).right !== "0px") {
          animation = _this.animate({ transform: ["translateX(-" + dialogRect.right + "px)", "translateX(0px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
        }
        // Animate from right
        else if (getComputedStyle(_this).right === "0px" && getComputedStyle(_this).left !== "0px") {
            animation = _this.animate({ transform: ["translateX(" + dialogRect.width + "px)", "translateX(0px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
          }
          // Animate from top
          else {
              animation = _this.animate({ transform: ["translateY(-" + dialogRect.bottom + "px)", "translateY(0px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
            }

        // Close the dialog when backdrop is clicked
        {
          var keyDownListener = void 0;
          var pointerDownListener = void 0;
          var clickListener = void 0;
          var _closeListener = void 0;
          var closeOnClick = true;

          var isPointerInsideDialog = function isPointerInsideDialog(event) {
            var dialogRect = _this.getBoundingClientRect();

            return event.clientX >= dialogRect.x && event.clientX <= dialogRect.x + dialogRect.width && event.clientY >= dialogRect.y && event.clientY <= dialogRect.y + dialogRect.height;
          };

          _this.addEventListener("keydown", keyDownListener = function keyDownListener(event) {
            event.stopPropagation();
          });

          _this.addEventListener("pointerdown", pointerDownListener = function pointerDownListener(event) {
            closeOnClick = isPointerInsideDialog(event) === false;
          });

          _this.addEventListener("click", clickListener = function clickListener(event) {
            if (closeOnClick) {
              if (isPointerInsideDialog(event) === false && _this.hasAttribute("open")) {
                _this.close();
              }
            }
          });

          _this.addEventListener("close", _closeListener = function closeListener(event) {
            _this.removeEventListener("keydown", keyDownListener);
            _this.removeEventListener("pointerdown", pointerDownListener);
            _this.removeEventListener("click", clickListener);
            _this.removeEventListener("close", _closeListener);
          });
        }

        await animation.finished;
        resolve();
      });
    };

    HTMLDialogElement.prototype.close = function () {
      var _this2 = this,
          _arguments2 = arguments;

      return new Promise(async function (resolve) {
        var dialogRect = _this2.getBoundingClientRect();
        var transitionDuration = parseFloat(getComputedStyle(_this2).getPropertyValue("transition-duration")) * 1000;
        var transitionTimingFunction = getComputedStyle(_this2).getPropertyValue("transition-timing-function");
        var animation = void 0;

        // Animate to left
        if (getComputedStyle(_this2).left === "0px" && getComputedStyle(_this2).right !== "0px") {
          animation = _this2.animate({ transform: ["translateX(0px)", "translateX(-" + dialogRect.right + "px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
        }
        // Animate to right
        else if (getComputedStyle(_this2).right === "0px" && getComputedStyle(_this2).left !== "0px") {
            animation = _this2.animate({ transform: ["translateX(0px)", "translateX(" + dialogRect.width + "px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
          }
          // Animate to top
          else {
              animation = _this2.animate({ transform: ["translateY(0px)", "translateY(-" + (dialogRect.bottom + 50) + "px)"] }, { duration: transitionDuration, easing: transitionTimingFunction });
            }

        await animation.finished;

        if (_this2.hasAttribute("open")) {
          close.apply(_this2, _arguments2);
        }

        resolve();
      });
    };

    Object.defineProperty(HTMLDialogElement.prototype, "open", {
      get: function get() {
        return this.hasAttribute("open");
      },
      set: function set(open) {}
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // Pointer events polyfills
  //

  // Make "click", "dblclick" and "contextmenu" look more like pointer events
  // (https://github.com/w3c/pointerevents/issues/100#issuecomment-23118584)
  {
    if (MouseEvent.prototype.hasOwnProperty("pointerType") === false) {
      Object.defineProperty(MouseEvent.prototype, "pointerType", {
        get: function get() {
          return this.sourceCapabilities.firesTouchEvents ? "touch" : "mouse";
        }
      });
    }
  }

  // Make setPointerCapture also capture the cursor image
  {
    var setPointerCapture = Element.prototype.setPointerCapture;

    Element.prototype.setPointerCapture = function (pointerId) {
      var _this3 = this;

      setPointerCapture.call(this, pointerId);

      var cursor = getComputedStyle(this).cursor;
      var styleElements = [];

      {
        for (var node = this.parentNode || this.host; node && node !== document; node = node.parentNode || node.host) {
          if (node.nodeType === document.DOCUMENT_FRAGMENT_NODE) {
            var styleElement = document.createElementNS(node.host.namespaceURI, "style");
            styleElement.textContent = "* { cursor: " + cursor + " !important; user-select: none !important; }";
            node.append(styleElement);
            styleElements.push(styleElement);
          } else if (node.nodeType === document.DOCUMENT_NODE) {
            var _styleElement = document.createElement("style");
            _styleElement.textContent = "* { cursor: " + cursor + " !important; user-select: none !important; }";
            node.head.append(_styleElement);
            styleElements.push(_styleElement);
          }
        }
      }

      var finish = function finish() {
        window.removeEventListener("pointerup", finish, true);
        _this3.removeEventListener("lostpointercapture", finish);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = styleElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _styleElement2 = _step.value;

            _styleElement2.remove();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      window.addEventListener("pointerup", finish, true);
      this.addEventListener("lostpointercapture", finish);
    };
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // Web Animations API polyfills
  //

  {
    var animation = document.createElement("div").animate({});

    if (animation.finished === undefined) {
      Object.defineProperty(animation.constructor.prototype, "finished", {
        get: function get() {
          var _this4 = this;

          return new Promise(function (resolve) {
            _this4.playState === "finished" ? resolve() : _this4.addEventListener("finish", function () {
              return resolve();
            }, { once: true });
          });
        }
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // Node polyfills (http://dom.spec.whatwg.org, https://github.com/whatwg/dom/issues/161)
  //

  if (!Node.prototype.append) {
    Node.prototype.append = function (child) {
      this.appendChild(child);
    };
  }

  if (!Node.prototype.prepend) {
    Node.prototype.prepend = function (child) {
      this.insertBefore(child, this.firstElementChild);
    };
  }

  if (!Node.prototype.before) {
    Node.prototype.before = function (element) {
      this.parentElement.insertBefore(element, this);
    };
  }

  if (!Node.prototype.after) {
    Node.prototype.after = function (element) {
      this.parentElement.insertBefore(element, this.nextElementSibling);
    };
  }

  if (!Node.prototype.replace) {
    Node.prototype.replace = function (element) {
      this.parentNode.replaceChild(element, this);
    };
  }

  if (!Node.prototype.closest) {
    Node.prototype.closest = function (selector) {
      return this.parentNode ? this.parentNode.closest(selector) : null;
    };
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // ResizeObserver API polyfill
  // https://github.com/que-etc/resize-observer-polyfill/blob/master/dist/ResizeObserver.js
  //

  (function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.ResizeObserver = factory();
  })(window, function () {
    /**
     * A collection of shims that provide minimal functionality of the ES6 collections.
     *
     * These implementations are not meant to be used outside of the ResizeObserver
     * modules as they cover only a limited range of use cases.
     */
    /* eslint-disable require-jsdoc, valid-jsdoc */
    var MapShim = function () {
      if (typeof Map !== 'undefined') {
        return Map;
      }

      /**
       * Returns index in provided array that matches the specified key.
       *
       * @param {Array<Array>} arr
       * @param {*} key
       * @returns {number}
       */
      function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
          if (entry[0] === key) {
            result = index;

            return true;
          }

          return false;
        });

        return result;
      }

      return function () {
        function anonymous() {
          this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
          return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
          var index = getIndex(this.__entries__, key);
          var entry = this.__entries__[index];

          return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
          var index = getIndex(this.__entries__, key);

          if (~index) {
            this.__entries__[index][1] = value;
          } else {
            this.__entries__.push([key, value]);
          }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
          var entries = this.__entries__;
          var index = getIndex(entries, key);

          if (~index) {
            entries.splice(index, 1);
          }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
          return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
          this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
          var this$1 = this;
          if (ctx === void 0) ctx = null;

          for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
            var entry = list[i];

            callback.call(ctx, entry[1], entry[0]);
          }
        };

        Object.defineProperties(anonymous.prototype, prototypeAccessors);

        return anonymous;
      }();
    }();

    /**
     * Detects whether window and document objects are available in current environment.
     */
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

    // Returns global object of a current environment.
    var global$1 = function () {
      if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
      }

      if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
      }

      if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
      }

      // eslint-disable-next-line no-new-func
      return Function('return this')();
    }();

    /**
     * A shim for the requestAnimationFrame which falls back to the setTimeout if
     * first one is not supported.
     *
     * @returns {number} Requests' identifier.
     */
    var requestAnimationFrame$1 = function () {
      if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
      }

      return function (callback) {
        return setTimeout(function () {
          return callback(Date.now());
        }, 1000 / 60);
      };
    }();

    // Defines minimum timeout before adding a trailing call.
    var trailingTimeout = 2;

    /**
     * Creates a wrapper function which ensures that provided callback will be
     * invoked only once during the specified delay period.
     *
     * @param {Function} callback - Function to be invoked after the delay period.
     * @param {number} delay - Delay after which to invoke callback.
     * @returns {Function}
     */
    var throttle = function throttle(callback, delay) {
      var leadingCall = false,
          trailingCall = false,
          lastCallTime = 0;

      /**
       * Invokes the original callback function and schedules new invocation if
       * the "proxy" was called during current request.
       *
       * @returns {void}
       */
      function resolvePending() {
        if (leadingCall) {
          leadingCall = false;

          callback();
        }

        if (trailingCall) {
          proxy();
        }
      }

      /**
       * Callback invoked after the specified delay. It will further postpone
       * invocation of the original function delegating it to the
       * requestAnimationFrame.
       *
       * @returns {void}
       */
      function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
      }

      /**
       * Schedules invocation of the original function.
       *
       * @returns {void}
       */
      function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
          // Reject immediately following calls.
          if (timeStamp - lastCallTime < trailingTimeout) {
            return;
          }

          // Schedule new call to be in invoked when the pending one is resolved.
          // This is important for "transitions" which never actually start
          // immediately so there is a chance that we might miss one if change
          // happens amids the pending invocation.
          trailingCall = true;
        } else {
          leadingCall = true;
          trailingCall = false;

          setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
      }

      return proxy;
    };

    // Minimum delay before invoking the update of observers.
    var REFRESH_DELAY = 20;

    // A list of substrings of CSS properties used to find transition events that
    // might affect dimensions of observed elements.
    var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

    // Check if MutationObserver is available.
    var mutationObserverSupported = typeof MutationObserver !== 'undefined';

    /**
     * Singleton controller class which handles updates of ResizeObserver instances.
     */
    var ResizeObserverController = function ResizeObserverController() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];

      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    };

    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */

    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */

    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }

      // Add listeners if they haven't been added yet.
      if (!this.connected_) {
        this.connect_();
      }
    };

    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
      var observers = this.observers_;
      var index = observers.indexOf(observer);

      // Remove observer if it's present in registry.
      if (~index) {
        observers.splice(index, 1);
      }

      // Remove listeners if controller has no connected observers.
      if (!observers.length && this.connected_) {
        this.disconnect_();
      }
    };

    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
      var changesDetected = this.updateObservers_();

      // Continue running updates if changes have been detected as there might
      // be future ones caused by CSS transitions.
      if (changesDetected) {
        this.refresh();
      }
    };

    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *  dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
      // Collect observers that have active observations.
      var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
      });

      // Deliver notifications in a separate cycle in order to avoid any
      // collisions between observers, e.g. when multiple instances of
      // ResizeObserver are tracking the same element and the callback of one
      // of them changes content dimensions of the observed target. Sometimes
      // this may result in notifications being blocked for the rest of observers.
      activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
      });

      return activeObservers.length > 0;
    };

    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already added.
      if (!isBrowser || this.connected_) {
        return;
      }

      // Subscription to the "Transitionend" event is used as a workaround for
      // delayed transitions. This way it's possible to capture at least the
      // final state of an element.
      document.addEventListener('transitionend', this.onTransitionEnd_);

      window.addEventListener('resize', this.refresh);

      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
      }

      this.connected_ = true;
    };

    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already removed.
      if (!isBrowser || !this.connected_) {
        return;
      }

      document.removeEventListener('transitionend', this.onTransitionEnd_);
      window.removeEventListener('resize', this.refresh);

      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }

      if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
      }

      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };

    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
      var propertyName = ref.propertyName;if (propertyName === void 0) propertyName = '';

      // Detect whether transition may affect dimensions of an element.
      var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
      });

      if (isReflowProperty) {
        this.refresh();
      }
    };

    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
      }

      return this.instance_;
    };

    ResizeObserverController.instance_ = null;

    /**
     * Defines non-writable/enumerable properties of the provided target object.
     *
     * @param {Object} target - Object for which to define properties.
     * @param {Object} props - Properties to be defined.
     * @returns {Object} Target object.
     */
    var defineConfigurable = function defineConfigurable(target, props) {
      for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
          value: props[key],
          enumerable: false,
          writable: false,
          configurable: true
        });
      }

      return target;
    };

    /**
     * Returns the global object associated with provided element.
     *
     * @param {Object} target
     * @returns {Object}
     */
    var getWindowOf = function getWindowOf(target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
    };

    // Placeholder of an empty content rectangle.
    var emptyRect = createRectInit(0, 0, 0, 0);

    /**
     * Converts provided string to a number.
     *
     * @param {number|string} value
     * @returns {number}
     */
    function toFloat(value) {
      return parseFloat(value) || 0;
    }

    /**
     * Extracts borders size from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @param {...string} positions - Borders positions (top, right, ...)
     * @returns {number}
     */
    function getBordersSize(styles) {
      var positions = [],
          len = arguments.length - 1;
      while (len-- > 0) {
        positions[len] = arguments[len + 1];
      }return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
      }, 0);
    }

    /**
     * Extracts paddings sizes from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @returns {Object} Paddings box.
     */
    function getPaddings(styles) {
      var positions = ['top', 'right', 'bottom', 'left'];
      var paddings = {};

      for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
      }

      return paddings;
    }

    /**
     * Calculates content rectangle of provided SVG element.
     *
     * @param {SVGGraphicsElement} target - Element content rectangle of which needs
     *      to be calculated.
     * @returns {DOMRectInit}
     */
    function getSVGContentRect(target) {
      var bbox = target.getBBox();

      return createRectInit(0, 0, bbox.width, bbox.height);
    }

    /**
     * Calculates content rectangle of provided HTMLElement.
     *
     * @param {HTMLElement} target - Element for which to calculate the content rectangle.
     * @returns {DOMRectInit}
     */
    function getHTMLElementContentRect(target) {
      // Client width & height properties can't be
      // used exclusively as they provide rounded values.
      var clientWidth = target.clientWidth;
      var clientHeight = target.clientHeight;

      // By this condition we can catch all non-replaced inline, hidden and
      // detached elements. Though elements with width & height properties less
      // than 0.5 will be discarded as well.
      //
      // Without it we would need to implement separate methods for each of
      // those cases and it's not possible to perform a precise and performance
      // effective test for hidden elements. E.g. even jQuery's ':visible' filter
      // gives wrong results for elements with width & height less than 0.5.
      if (!clientWidth && !clientHeight) {
        return emptyRect;
      }

      var styles = getWindowOf(target).getComputedStyle(target);
      var paddings = getPaddings(styles);
      var horizPad = paddings.left + paddings.right;
      var vertPad = paddings.top + paddings.bottom;

      // Computed styles of width & height are being used because they are the
      // only dimensions available to JS that contain non-rounded values. It could
      // be possible to utilize the getBoundingClientRect if only it's data wasn't
      // affected by CSS transformations let alone paddings, borders and scroll bars.
      var width = toFloat(styles.width),
          height = toFloat(styles.height);

      // Width & height include paddings and borders when the 'border-box' box
      // model is applied (except for IE).
      if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
          width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
          height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
      }

      // Following steps can't be applied to the document's root element as its
      // client[Width/Height] properties represent viewport area of the window.
      // Besides, it's as well not necessary as the <html> itself neither has
      // rendered scroll bars nor it can be clipped.
      if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
          width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
          height -= horizScrollbar;
        }
      }

      return createRectInit(paddings.left, paddings.top, width, height);
    }

    /**
     * Checks whether provided element is an instance of the SVGGraphicsElement.
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    var isSVGGraphicsElement = function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) {
          return target instanceof getWindowOf(target).SVGGraphicsElement;
        };
      }

      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) {
        return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
      };
    }();

    /**
     * Checks whether provided element is a document element (<html>).
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    function isDocumentElement(target) {
      return target === getWindowOf(target).document.documentElement;
    }

    /**
     * Calculates an appropriate content rectangle for provided html or svg element.
     *
     * @param {Element} target - Element content rectangle of which needs to be calculated.
     * @returns {DOMRectInit}
     */
    function getContentRect(target) {
      if (!isBrowser) {
        return emptyRect;
      }

      if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
      }

      return getHTMLElementContentRect(target);
    }

    /**
     * Creates rectangle with an interface of the DOMRectReadOnly.
     * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
     *
     * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
     * @returns {DOMRectReadOnly}
     */
    function createReadOnlyRect(ref) {
      var x = ref.x;
      var y = ref.y;
      var width = ref.width;
      var height = ref.height;

      // If DOMRectReadOnly is available use it as a prototype for the rectangle.
      var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
      var rect = Object.create(Constr.prototype);

      // Rectangle's properties are not writable and non-enumerable.
      defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
      });

      return rect;
    }

    /**
     * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
     * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
     *
     * @param {number} x - X coordinate.
     * @param {number} y - Y coordinate.
     * @param {number} width - Rectangle's width.
     * @param {number} height - Rectangle's height.
     * @returns {DOMRectInit}
     */
    function createRectInit(x, y, width, height) {
      return { x: x, y: y, width: width, height: height };
    }

    /**
     * Class that is responsible for computations of the content rectangle of
     * provided DOM element and for keeping track of it's changes.
     */
    var ResizeObservation = function ResizeObservation(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);

      this.target = target;
    };

    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */

    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    ResizeObservation.prototype.isActive = function () {
      var rect = getContentRect(this.target);

      this.contentRect_ = rect;

      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };

    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
      var rect = this.contentRect_;

      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;

      return rect;
    };

    var ResizeObserverEntry = function ResizeObserverEntry(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);

      // According to the specification following properties are not writable
      // and are also not enumerable in the native implementation.
      //
      // Property accessors are not being used as they'd require to define a
      // private WeakMap storage which may cause memory leaks in browsers that
      // don't support this type of collections.
      defineConfigurable(this, { target: target, contentRect: contentRect });
    };

    var ResizeObserverSPI = function ResizeObserverSPI(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();

      if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
      }

      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    };

    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */

    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    /**
     * Public ResizeObserver instance which will be passed to the callback
     * function and used as a value of it's "this" binding.
     *
     * @private {ResizeObserver}
     */

    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }

      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
      }

      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }

      var observations = this.observations_;

      // Do nothing if element is already being observed.
      if (observations.has(target)) {
        return;
      }

      observations.set(target, new ResizeObservation(target));

      this.controller_.addObserver(this);

      // Force the update of observations.
      this.controller_.refresh();
    };

    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }

      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
      }

      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }

      var observations = this.observations_;

      // Do nothing if element is not being observed.
      if (!observations.has(target)) {
        return;
      }

      observations.delete(target);

      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };

    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };

    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
      var this$1 = this;

      this.clearActive();

      this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
          this$1.activeObservations_.push(observation);
        }
      });
    };

    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
      // Do nothing if observer doesn't have active observations.
      if (!this.hasActive()) {
        return;
      }

      var ctx = this.callbackCtx_;

      // Create ResizeObserverEntry instance for every active observation.
      var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });

      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };

    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
      this.activeObservations_.splice(0);
    };

    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
      return this.activeObservations_.length > 0;
    };

    // Registry of internal observers. If WeakMap is not available use current shim
    // for the Map collection as it has all required methods and because WeakMap
    // can't be fully polyfilled anyway.
    var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

    /**
     * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
     * exposing only those methods and properties that are defined in the spec.
     */
    var ResizeObserver = function ResizeObserver(callback) {
      if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
      }
      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }

      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);

      observers.set(this, observer);
    };

    // Expose public methods of ResizeObserver.
    ['observe', 'unobserve', 'disconnect'].forEach(function (method) {
      ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
      };
    });

    var index = function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
      }

      return ResizeObserver;
    }();

    return index;
  });

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  var templateElement = document.createElement("template");

  // @info
  //   Template string tag used to parse HTML strings.
  // @type
  //   () => HTMLElement || DocumentFragment
  var html = function html(strings) {
    var parts = [];

    for (var i = 0; i < strings.length; i += 1) {
      parts.push(strings[i]);
      if ((arguments.length <= i + 1 ? undefined : arguments[i + 1]) !== undefined) parts.push(arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }

    var innerHTML = parts.join("");
    templateElement.innerHTML = innerHTML;
    var fragment = document.importNode(templateElement.content, true);

    if (fragment.children.length === 1) {
      return fragment.firstElementChild;
    } else {
      return fragment;
    }
  };

  // @info
  //   Template string tag used to parse SVG strings.
  // @type
  //   () => SVGElement || DocumentFragment
  var svg = function svg(strings) {
    var parts = [];

    for (var i = 0; i < strings.length; i += 1) {
      parts.push(strings[i]);
      if ((arguments.length <= i + 1 ? undefined : arguments[i + 1]) !== undefined) parts.push(arguments.length <= i + 1 ? undefined : arguments[i + 1]);
    }

    var innerHTML = "<svg id=\"x-stub\" xmlns=\"http://www.w3.org/2000/svg\">" + parts.join("") + "</svg>";

    templateElement.innerHTML = innerHTML;

    var fragment = document.importNode(templateElement.content, true);
    var stub = fragment.querySelector("svg#x-stub");

    if (stub.children.length === 1) {
      return stub.firstElementChild;
    } else {
      var _arr = [].concat(_toConsumableArray(stub.childNodes));

      for (var _i = 0; _i < _arr.length; _i++) {
        var child = _arr[_i];
        fragment.appendChild(child);
      }

      stub.remove();
      return fragment;
    }
  };

  // @info
  //   Same as document.createElement(), but you can also create SVG elements.
  // @type
  //   (string) => Element?
  var createElement = function createElement(name) {
    var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var parts = name.split(":");
    var element = null;

    if (parts.length === 1) {
      var _parts = _slicedToArray(parts, 1),
          localName = _parts[0];

      if (is === null) {
        element = document.createElement(localName);
      } else {
        element = document.createElement(localName, is);
      }
    } else if (parts.length === 2) {
      var _parts2 = _slicedToArray(parts, 2),
          namespace = _parts2[0],
          _localName = _parts2[1];

      if (namespace === "svg") {
        element = document.createElementNS("http://www.w3.org/2000/svg", _localName);
      }
    }

    return element;
  };

  // @info
  //   Same as standard element.closest() method but can also walk shadow DOM.
  // @type
  //   (Element, string, boolean) => Element?
  var closest = function closest(element, selector) {
    var walkShadowDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var matched = element.closest(selector);

    if (walkShadowDOM && !matched && element.getRootNode().host) {
      return closest(element.getRootNode().host, selector);
    } else {
      return matched;
    }
  };

  // @info
  //   Generate element ID that is unique in the given document fragment.
  // @type
  //   (DocumentFragment, string) => string
  var generateUniqueID = function generateUniqueID(fragment) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    var counter = 1;

    while (true) {
      var id = prefix + counter;

      if (fragment.querySelector("#" + CSS.escape(id)) === null) {
        return id;
      } else {
        counter += 1;
      }
    }
  };

  var max = Math.max;

  var easing = "cubic-bezier(0.4, 0, 0.2, 1)";

  var shadowTemplate = html(_templateObject);

  var XAccordionElement = function (_HTMLElement) {
    _inherits(XAccordionElement, _HTMLElement);

    _createClass(XAccordionElement, [{
      key: "expanded",
      get: function get() {
        return this.hasAttribute("expanded");
      },
      set: function set(expanded) {
        expanded ? this.setAttribute("expanded", "") : this.removeAttribute("expanded");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["expanded"];
      }
    }]);

    function XAccordionElement() {
      _classCallCheck(this, XAccordionElement);

      var _this5 = _possibleConstructorReturn(this, (XAccordionElement.__proto__ || Object.getPrototypeOf(XAccordionElement)).call(this));

      _this5._shadowRoot = _this5.attachShadow({ mode: "closed" });
      _this5._shadowRoot.append(document.importNode(shadowTemplate.content, true));

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this5._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          _this5["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      _this5._resizeObserver = new ResizeObserver(function () {
        return _this5._updateArrowPosition();
      });

      _this5.addEventListener("click", function (event) {
        return _this5._onClick(event);
      });
      _this5.addEventListener("pointerdown", function (event) {
        return _this5._onPointerDown(event);
      });
      _this5["#arrow"].addEventListener("keydown", function (event) {
        return _this5._onArrowKeyDown(event);
      });
      return _this5;
    }

    _createClass(XAccordionElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "expanded") {
          this._updateArrowPosition();
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this._resizeObserver.observe(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._resizeObserver.unobserve(this);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateArrowPosition",
      value: function _updateArrowPosition() {
        var header = this.querySelector(":scope > header");

        if (header) {
          this["#arrow-container"].style.height = header.getBoundingClientRect().height + "px";
        } else {
          this["#arrow-container"].style.height = null;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onArrowKeyDown",
      value: function _onArrowKeyDown(event) {
        if (event.key === "Enter") {
          this.querySelector("header").click();
        }
      }
    }, {
      key: "_onPointerDown",
      value: async function _onPointerDown(pointerDownEvent) {
        var _this6 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var header = this.querySelector("header");
        var closestFocusableElement = pointerDownEvent.target.closest("[tabindex]");

        if (header.contains(pointerDownEvent.target) && this.contains(closestFocusableElement) === false) {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          // Ripple
          if (triggerEffect === "ripple") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max(rect.width, rect.height) * 1.5;
            var top = pointerDownEvent.clientY - rect.y - size / 2;
            var left = pointerDownEvent.clientX - rect.x - size / 2;
            var whenLostPointerCapture = new Promise(function (r) {
              return _this6.addEventListener("lostpointercapture", r, { once: true });
            });

            this.setPointerCapture(pointerDownEvent.pointerId);

            var ripple = html(_templateObject2);
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");

            this["#ripples"].append(ripple);
            this["#ripples"].style.contain = "strict";

            var inAnimation = ripple.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing });

            await whenLostPointerCapture;
            await inAnimation.finished;

            var outAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 300, easing: easing });

            await outAnimation.finished;
            ripple.remove();
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        var header = this.querySelector("header");
        var closestFocusableElement = event.target.closest("[tabindex]");

        if (header.contains(event.target) && this.contains(closestFocusableElement) === false) {
          // Collapse
          if (this.expanded) {
            var startBBox = this.getBoundingClientRect();

            if (this._animation) {
              this._animation.finish();
            }

            this.expanded = false;
            this.removeAttribute("animating");
            var endBBox = this.getBoundingClientRect();
            this.setAttribute("animating", "");

            var _animation = this.animate({
              height: [startBBox.height + "px", endBBox.height + "px"]
            }, {
              duration: 300,
              easing: easing
            });

            this._animation = _animation;
            await _animation.finished;

            if (this._animation === _animation) {
              this.removeAttribute("animating");
            }
          }

          // Expand
          else {
              var _startBBox = this.getBoundingClientRect();

              if (this._animation) {
                this._animation.finish();
              }

              this.expanded = true;
              this.removeAttribute("animating");
              var _endBBox = this.getBoundingClientRect();
              this.setAttribute("animating", "");

              var _animation2 = this.animate({
                height: [_startBBox.height + "px", _endBBox.height + "px"]
              }, {
                duration: 300,
                easing: easing
              });

              this._animation = _animation2;
              await _animation2.finished;

              if (this._animation === _animation2) {
                this.removeAttribute("animating");
              }
            }
        }
      }
    }]);

    return XAccordionElement;
  }(HTMLElement);

  customElements.define("x-accordion", XAccordionElement);

  var shadowTemplate$1 = html(_templateObject3);

  var XBackdropElement = function (_HTMLElement2) {
    _inherits(XBackdropElement, _HTMLElement2);

    _createClass(XBackdropElement, [{
      key: "ownerElement",

      // @info
      //   Element below which the backdrop should be placed.
      // @type
      //   HTMLElement
      get: function get() {
        return this._ownerElement ? this._ownerElement : document.body.firstElementChild;
      },
      set: function set(ownerElement) {
        this._ownerElement = ownerElement;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XBackdropElement() {
      _classCallCheck(this, XBackdropElement);

      var _this7 = _possibleConstructorReturn(this, (XBackdropElement.__proto__ || Object.getPrototypeOf(XBackdropElement)).call(this));

      _this7._ownerElement = null;
      _this7._shadowRoot = _this7.attachShadow({ mode: "closed" });
      _this7._shadowRoot.append(document.importNode(shadowTemplate$1.content, true));

      _this7.addEventListener("wheel", function (event) {
        return event.preventDefault();
      });
      _this7.addEventListener("pointerdown", function (event) {
        return event.preventDefault();
      }); // Don't steal the focus
      return _this7;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _createClass(XBackdropElement, [{
      key: "show",
      value: function show() {
        var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.style.top = "0px";
        this.style.left = "0px";
        this.ownerElement.before(this);
        this.hidden = false;

        var bounds = this.getBoundingClientRect();
        var extraTop = 0;
        var extraLeft = 0;

        // Determine extraLeft and extraTop which represent the extra offset needed when the backdrop is inside another
        // fixed-positioned element such as a popover
        {
          if (bounds.top !== 0 || bounds.left !== 0) {
            extraTop = -bounds.top;
            extraLeft = -bounds.left;
          }
        }

        // Prevent the document body from being scrolled
        {
          if (document.body.scrollHeight > document.body.clientHeight) {
            document.body.style.overflow = "hidden";
          }
        }

        // Ensure the backdrop is stacked directly below the ref element
        {
          var zIndex = parseFloat(getComputedStyle(this.ownerElement).zIndex);
          this.style.zIndex = zIndex - 1;
        }

        this.style.top = extraTop + "px";
        this.style.left = extraLeft + "px";

        // Animate the backdrop
        if (animate) {
          var backdropAnimation = this.animate({
            opacity: ["0", "1"]
          }, {
            duration: 100,
            easing: "ease-out"
          });

          return backdropAnimation.finished;
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this8 = this;

        var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (animate) {
          var backdropAnimation = this.animate({
            opacity: ["1", "0"]
          }, {
            duration: 100,
            easing: "ease-in"
          });

          backdropAnimation.finished.then(function () {
            document.body.style.overflow = null;
            _this8.remove();
          });

          return backdropAnimation.finished;
        } else {
          document.body.style.overflow = null;
          this.remove();
        }
      }
    }]);

    return XBackdropElement;
  }(HTMLElement);

  customElements.define("x-backdrop", XBackdropElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  var max$1 = Math.max,
      pow$1 = Math.pow,
      sqrt$1 = Math.sqrt,
      PI$1 = Math.PI;

  // @info
  //   Round given number to the fixed number of decimal places.
  // @type
  //   (number, number) => number

  var round = function round(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var coefficient = pow$1(10, precision);
    return Math.round(number * coefficient) / coefficient;
  };

  // @type
  //   (DOMRect, number) => DOMRect
  var roundRect = function roundRect(rect) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return new DOMRect(round(rect.x, precision), round(rect.y, precision), round(rect.width, precision), round(rect.height, precision));
  };

  // @type
  //   (number, number, number, number?) => number
  var normalize = function normalize(number, min) {
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (precision !== null) {
      number = round(number, precision);
    }

    if (number < min) {
      number = min;
    } else if (number > max) {
      number = max;
    }

    return number;
  };

  // @type
  //   (number) => number
  var getPrecision = function getPrecision(number) {
    if (!isFinite(number)) {
      return 0;
    } else {
      var e = 1;
      var p = 0;

      while (Math.round(number * e) / e !== number) {
        e *= 10;
        p += 1;
      }

      return p;
    }
  };

  // @info
  //   Get distance between two points.
  // @type
  //   (DOMPoint, DOMPoint) => number
  var getDistanceBetweenPoints = function getDistanceBetweenPoints(point1, point2) {
    var x = point2.x - point1.x;
    x = x * x;

    var y = point2.y - point1.y;
    y = y * y;

    var distance = sqrt$1(x + y);
    return distance;
  };

  // @type
  //   (DOMRect, DOMPoint) => boolean
  var rectContainsPoint = function rectContainsPoint(rect, point) {
    if (point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height) {
      return true;
    } else {
      return false;
    }
  };

  // @type
  //   (number) => number
  var degToRad = function degToRad(degrees) {
    var radians = PI$1 * degrees / 180;
    return radians;
  };

  var min = Math.min,
      max$2 = Math.max,
      floor = Math.floor;
  var parseFloat$1 = Number.parseFloat,
      parseInt$1 = Number.parseInt;

  // @info
  //   A list of named colors and their corresponding RGB values.
  // @doc
  //   http://www.w3.org/TR/css3-color/#svg-color

  var namedColors = {
    // R,   G,   B
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var StringScanner = function () {
    // @type
    //   (string) => void
    function StringScanner(text) {
      _classCallCheck(this, StringScanner);

      this.text = text;

      this.cursor = 0;
      this.line = 1;
      this.column = 1;

      this._storedPosition = { cursor: 0, line: 1, column: 1 };
    }

    // @info
    //   Read given number of chars.
    // @type
    //   (number) => string?


    _createClass(StringScanner, [{
      key: "read",
      value: function read() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var string = "";
        var initialCursor = this.cursor;

        for (var j = 0; j < i; j += 1) {
          var c = this.text[initialCursor + j];

          if (c === undefined) {
            break;
          } else {
            string += c;
            this.cursor += 1;

            if (c === "\n") {
              this.line += 1;
              this.column = 1;
            } else {
              this.column += 1;
            }
          }
        }

        return string === "" ? null : string;
      }

      // @info
      //   Read given number of chars without advancing the cursor.
      // @type
      //   (number) => string?

    }, {
      key: "peek",
      value: function peek() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var string = "";

        for (var j = 0; j < i; j += 1) {
          var c = this.text[this.cursor + j];

          if (c === undefined) {
            break;
          } else {
            string += c;
          }
        }

        return string === "" ? null : string;
      }

      // @type
      //   () => void

    }, {
      key: "storePosition",
      value: function storePosition() {
        var cursor = this.cursor,
            line = this.line,
            column = this.column;

        this._storedPosition = { cursor: cursor, line: line, column: column };
      }

      // @type
      //   () => void

    }, {
      key: "restorePosition",
      value: function restorePosition() {
        var _storedPosition = this._storedPosition,
            cursor = _storedPosition.cursor,
            line = _storedPosition.line,
            column = _storedPosition.column;


        this.cursor = cursor;
        this.line = line;
        this.column = column;
      }
    }]);

    return StringScanner;
  }();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // @info
  //   Convert color from RGB to HSL space. R, G and B components on input must be in 0-255 range.
  // @src
  //   http://goo.gl/J9ra3
  // @type
  //   (number, number, number) => [number, number, number]


  var rgbToHsl = function rgbToHsl(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    var maxValue = max$2(r, g, b);
    var minValue = min(r, g, b);

    var h = void 0;
    var s = void 0;
    var l = void 0;

    h = s = l = (maxValue + minValue) / 2;

    if (maxValue === minValue) {
      h = s = 0;
    } else {
      var d = maxValue - minValue;

      if (l > 0.5) {
        s = d / (2 - maxValue - minValue);
      } else {
        s = d / (maxValue + minValue);
      }

      if (maxValue === r) {
        var z = void 0;

        if (g < b) {
          z = 6;
        } else {
          z = 0;
        }

        h = (g - b) / d + z;
      } else if (maxValue === g) {
        h = (b - r) / d + 2;
      } else if (maxValue === b) {
        h = (r - g) / d + 4;
      }
    }

    h = normalize(h / 6 * 360, 0, 360, 0);
    s = normalize(s * 100, 0, 100, 1);
    l = normalize(l * 100, 0, 100, 1);

    return [h, s, l];
  };

  // @info
  //   Convert color from HSL to RGB space. Input H must be in 0-360 range, S and L must be in
  //   0-100 range.
  // @src
  //   http://goo.gl/J9ra3
  // @type
  //   (number, number, number) => [number, number, number]
  var hslToRgb = function hslToRgb(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    var r = void 0;
    var g = void 0;
    var b = void 0;

    if (s === 0) {
      r = g = b = l;
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
          return q;
        }
        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }

        return p;
      };

      var q = void 0;
      var p = void 0;

      if (l < 0.5) {
        q = l * (1 + s);
      } else {
        q = l + s - l * s;
      }

      p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    r = normalize(255 * r, 0, 255, 0);
    g = normalize(255 * g, 0, 255, 0);
    b = normalize(255 * b, 0, 255, 0);

    return [r, g, b];
  };

  // @info
  //   Convert color from RGB to HSV space.
  // @src
  //   http://goo.gl/J9ra3
  // @type
  //   (number, number, number) => [number, number, number]
  var rgbToHsv = function rgbToHsv(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    var maxValue = max$2(r, g, b);
    var minValue = min(r, g, b);

    var h = 0;
    var s = 0;
    var v = maxValue;
    var d = maxValue - minValue;

    if (maxValue === 0) {
      s = 0;
    } else {
      s = d / maxValue;
    }

    if (maxValue === minValue) {
      h = 0;
    } else {
      if (maxValue === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (maxValue === g) {
        h = (b - r) / d + 2;
      } else if (maxValue === b) {
        h = (r - g) / d + 4;
      }

      h = h / 6;
    }

    h = h * 360;
    s = s * 100;
    v = v * 100;

    return [h, s, v];
  };

  // @info
  //   Convert color from HSV to RGB space.
  // @src
  //   http://goo.gl/J9ra3
  // @type
  //   (number, number, number) => [number, number, number]
  var hsvToRgb = function hsvToRgb(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    var i = floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    var r = 0;
    var g = 0;
    var b = 0;

    if (i % 6 === 0) {
      r = v;
      g = t;
      b = p;
    } else if (i % 6 === 1) {
      r = q;
      g = v;
      b = p;
    } else if (i % 6 === 2) {
      r = p;
      g = v;
      b = t;
    } else if (i % 6 === 3) {
      r = p;
      g = q;
      b = v;
    } else if (i % 6 === 4) {
      r = t;
      g = p;
      b = v;
    } else if (i % 6 === 5) {
      r = v;
      g = p;
      b = q;
    }

    r = r * 255;
    g = g * 255;
    b = b * 255;

    return [r, g, b];
  };

  // @info
  //   Convert color from HSL to HSV space.
  // @src
  //   http://ariya.blogspot.com/2008/07/converting-between-hsl-and-hsv.html
  // @type
  //   (number, number, number) => [number, number, number]
  var hslToHsv = function hslToHsv(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100 * 2;

    if (l <= 1) {
      s = s * l;
    } else {
      s = s * (2 - l);
    }

    var hh = h;
    var ss = void 0;
    var vv = void 0;

    if (l + s === 0) {
      ss = 0;
    } else {
      ss = 2 * s / (l + s);
    }

    vv = (l + s) / 2;

    hh = 360 * hh;
    ss = max$2(0, min(1, ss)) * 100;
    vv = max$2(0, min(1, vv)) * 100;

    return [hh, ss, vv];
  };

  // @info
  //   Convert color from HSV to HSL space.
  // @src
  //   http://ariya.blogspot.com/2008/07/converting-between-hsl-and-hsv.html
  // @type
  //   (number, number, number) => [number, number, number]
  var hsvToHsl = function hsvToHsl(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    var hh = h;
    var ll = (2 - s) * v;
    var ss = s * v;

    if (ll <= 1) {
      if (ll === 0) {
        ss = 0;
      } else {
        ss = ss / ll;
      }
    } else if (ll === 2) {
      ss = 0;
    } else {
      ss = ss / (2 - ll);
    }

    ll = ll / 2;

    hh = 360 * hh;
    ss = max$2(0, min(1, ss)) * 100;
    ll = max$2(0, min(1, ll)) * 100;

    return [hh, ss, ll];
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // @info
  //   Parse given CSS color string into corresponding RGBA, HSLA or HSVA components.
  // @type
  //   outputModel = "rgba" || "hsla" || "hsva"
  //   components = Array<number, number, number, number>
  //   (string, outputModel) => components
  var parseColor = function parseColor(colorString) {
    var outputModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "rgba";

    colorString = colorString.trim();

    var tokens = tokenizeColor(colorString);
    var rgbaComponents = null;
    var hslaComponents = null;

    // RGB, e.g. rgb(100, 100, 100)

    if (tokens.length === 7 && tokens[0].text === "rgb(" && tokens[1].type === "NUM" && tokens[2].text === "," && tokens[3].type === "NUM" && tokens[4].text === "," && tokens[5].type === "NUM" && tokens[6].text === ")") {
      rgbaComponents = [parseFloat$1(tokens[1].text), parseFloat$1(tokens[3].text), parseFloat$1(tokens[5].text), 1];
    }

    // RGB with percentages, e.g. rgb(50%, 50%, 50%)

    else if (tokens.length === 7 && tokens[0].text === "rgb(" && tokens[1].type === "PERCENTAGE" && tokens[2].text === "," && tokens[3].type === "PERCENTAGE" && tokens[4].text === "," && tokens[5].type === "PERCENTAGE" && tokens[6].text === ")") {
        rgbaComponents = [parseFloat$1(tokens[1].text) / 100 * 255, parseFloat$1(tokens[3].text) / 100 * 255, parseFloat$1(tokens[5].text) / 100 * 255, 1];
      }

      // RGBA, e.g. rgba(100, 100, 100, 0.5)

      else if (tokens.length === 9 && tokens[0].text === "rgba(" && tokens[1].type === "NUM" && tokens[2].text === "," && tokens[3].type === "NUM" && tokens[4].text === "," && tokens[5].type === "NUM" && tokens[6].text === "," && tokens[7].type === "NUM" && tokens[8].text === ")") {
          rgbaComponents = [parseFloat$1(tokens[1].text), parseFloat$1(tokens[3].text), parseFloat$1(tokens[5].text), parseFloat$1(tokens[7].text)];
        }

        // RGBA with percentages, e.g. rgba(50%, 50%, 50%, 0.5)

        else if (tokens.length === 9 && tokens[0].text === "rgb(" && tokens[1].type === "PERCENTAGE" && tokens[2].text === "," && tokens[3].type === "PERCENTAGE" && tokens[4].text === "," && tokens[5].type === "PERCENTAGE" && tokens[6].text === "," && tokens[7].type === "NUM" && tokens[8].text === ")") {
            rgbaComponents = [parseFloat$1(tokens[1].text) / 100 * 255, parseFloat$1(tokens[3].text) / 100 * 255, parseFloat$1(tokens[5].text) / 100 * 255, parseFloat$1(tokens[7].text)];
          }

          // HSL, e.g. hsl(360, 100%, 100%)

          else if (tokens.length === 7 && tokens[0].text === "hsl(" && tokens[1].type === "NUM" && tokens[2].text === "," && tokens[3].type === "PERCENTAGE" && tokens[4].text === "," && tokens[5].type === "PERCENTAGE" && tokens[6].text === ")") {
              hslaComponents = [parseFloat$1(tokens[1].text), parseFloat$1(tokens[3].text), parseFloat$1(tokens[5].text), 1];
            }

            // HSLA, e.g. hsla(360, 100%, 100%, 1)

            else if (tokens.length === 9 && tokens[0].text === "hsla(" && tokens[1].type === "NUM" && tokens[2].text === "," && tokens[3].type === "PERCENTAGE" && tokens[4].text === "," && tokens[5].type === "PERCENTAGE" && tokens[6].text === "," && tokens[7].type === "NUM" && tokens[8].text === ")") {
                hslaComponents = [parseFloat$1(tokens[1].text), parseFloat$1(tokens[3].text), parseFloat$1(tokens[5].text), parseFloat$1(tokens[7].text)];
              }

              // HEX, e.g. "#fff"

              else if (tokens[0].type === "HEX" && tokens[1] === undefined) {
                  var hexString = tokens[0].text.substring(1); // get rid of leading "#"

                  var hexRed = void 0;
                  var hexGreen = void 0;
                  var hexBlue = void 0;

                  if (hexString.length === 3) {
                    hexRed = hexString[0] + hexString[0];
                    hexGreen = hexString[1] + hexString[1];
                    hexBlue = hexString[2] + hexString[2];
                  } else {
                    hexRed = hexString[0] + hexString[1];
                    hexGreen = hexString[2] + hexString[3];
                    hexBlue = hexString[4] + hexString[5];
                  }

                  rgbaComponents = [parseInt$1(hexRed, 16), parseInt$1(hexGreen, 16), parseInt$1(hexBlue, 16), 1];
                }

                // Named color, e.g. "white"

                else if (namedColors[colorString]) {
                    rgbaComponents = [namedColors[colorString][0], namedColors[colorString][1], namedColors[colorString][2], 1];
                  }

    // Finalize

    if (rgbaComponents) {
      var _rgbaComponents = rgbaComponents,
          _rgbaComponents2 = _slicedToArray(_rgbaComponents, 4),
          r = _rgbaComponents2[0],
          g = _rgbaComponents2[1],
          b = _rgbaComponents2[2],
          a = _rgbaComponents2[3];

      r = normalize(r, 0, 255, 0);
      g = normalize(g, 0, 255, 0);
      b = normalize(b, 0, 255, 0);
      a = normalize(a, 0, 1, 2);

      if (outputModel === "hsla") {
        var _rgbToHsl = rgbToHsl(r, g, b),
            _rgbToHsl2 = _slicedToArray(_rgbToHsl, 3),
            h = _rgbToHsl2[0],
            s = _rgbToHsl2[1],
            l = _rgbToHsl2[2];

        return [h, s, l, a];
      } else if (outputModel === "hsva") {
        var _rgbToHsv = rgbToHsv(r, g, b),
            _rgbToHsv2 = _slicedToArray(_rgbToHsv, 3),
            _h = _rgbToHsv2[0],
            _s = _rgbToHsv2[1],
            v = _rgbToHsv2[2];

        return [_h, _s, v, a];
      } else {
        return [r, g, b, a];
      }
    } else if (hslaComponents) {
      var _hslaComponents = hslaComponents,
          _hslaComponents2 = _slicedToArray(_hslaComponents, 4),
          _h2 = _hslaComponents2[0],
          _s2 = _hslaComponents2[1],
          _l = _hslaComponents2[2],
          _a = _hslaComponents2[3];

      _h2 = normalize(_h2, 0, 360, 0);
      _s2 = normalize(_s2, 0, 100, 1);
      _l = normalize(_l, 0, 100, 1);
      _a = normalize(_a, 0, 1, 2);

      if (outputModel === "hsla") {
        return [_h2, _s2, _l, _a];
      } else if (outputModel === "hsva") {
        var _hslToHsv = hslToHsv(_h2, _s2, _l),
            _hslToHsv2 = _slicedToArray(_hslToHsv, 3),
            hh = _hslToHsv2[0],
            ss = _hslToHsv2[1],
            vv = _hslToHsv2[2];

        return [hh, ss, vv, _a];
      } else {
        var _hslToRgb = hslToRgb(_h2, _s2, _l),
            _hslToRgb2 = _slicedToArray(_hslToRgb, 3),
            _r = _hslToRgb2[0],
            _g = _hslToRgb2[1],
            _b = _hslToRgb2[2];

        return [_r, _g, _b, _a];
      }
    } else {
      throw new Error("Invalid color string: \"" + colorString + "\"");
      return null;
    }
  };

  // @type
  //   components = Array<number, number, number, number>
  //   inputModel = "rgba" || "hsla" || "hsva"
  //   outputFormat = "rgb" || "rgba" || "rgb%" || "rgba%" || "hex" || "hsl" || "hsla"
  //   (components, inputModel, outputFormat) => string
  var serializeColor = function serializeColor(components) {
    var inputModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "rgba";
    var outputFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "hex";

    var string = null;

    // RGB(A) output
    if (["rgb", "rgba", "rgb%", "rgba%", "hex"].includes(outputFormat)) {
      var r = void 0;
      var g = void 0;
      var b = void 0;
      var a = void 0;

      if (inputModel === "rgba") {
        var _components = _slicedToArray(components, 4);

        r = _components[0];
        g = _components[1];
        b = _components[2];
        a = _components[3];
      } else if (inputModel === "hsla") {
        var _hslToRgb3 = hslToRgb.apply(undefined, _toConsumableArray(components));

        var _hslToRgb4 = _slicedToArray(_hslToRgb3, 3);

        r = _hslToRgb4[0];
        g = _hslToRgb4[1];
        b = _hslToRgb4[2];

        a = components[3];
      } else if (inputModel === "hsva") {
        var _hsvToRgb = hsvToRgb.apply(undefined, _toConsumableArray(components));

        var _hsvToRgb2 = _slicedToArray(_hsvToRgb, 3);

        r = _hsvToRgb2[0];
        g = _hsvToRgb2[1];
        b = _hsvToRgb2[2];

        a = components[3];
      }

      if (outputFormat === "rgb%" || outputFormat === "rgba%") {
        r = normalize(r / 255 * 100, 0, 100, 1);
        g = normalize(g / 255 * 100, 0, 100, 1);
        b = normalize(b / 255 * 100, 0, 100, 1);
        a = normalize(a, 0, 1, 2);
      } else {
        r = normalize(r, 0, 255, 0);
        g = normalize(g, 0, 255, 0);
        b = normalize(b, 0, 255, 0);
        a = normalize(a, 0, 1, 2);
      }

      if (outputFormat === "rgb") {
        string = "rgb(" + r + ", " + g + ", " + b + ")";
      } else if (outputFormat === "rgba") {
        string = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
      } else if (outputFormat === "rgb%") {
        string = "rgb(" + r + "%, " + g + "%, " + b + "%)";
      } else if (outputFormat === "rgba%") {
        string = "rgb(" + r + "%, " + g + "%, " + b + "%, " + a + ")";
      } else if (outputFormat === "hex") {
        var hexRed = r.toString(16);
        var hexGreen = g.toString(16);
        var hexBlue = b.toString(16);

        if (hexRed.length === 1) {
          hexRed = "0" + hexRed;
        }
        if (hexGreen.length === 1) {
          hexGreen = "0" + hexGreen;
        }
        if (hexBlue.length === 1) {
          hexBlue = "0" + hexBlue;
        }

        string = "#" + hexRed + hexGreen + hexBlue;
      }
    }

    // HSL(A) space
    else if (outputFormat === "hsl" || outputFormat === "hsla") {
        var h = void 0;
        var s = void 0;
        var l = void 0;
        var _a2 = void 0;

        if (inputModel === "hsla") {
          var _components2 = _slicedToArray(components, 4);

          h = _components2[0];
          s = _components2[1];
          l = _components2[2];
          _a2 = _components2[3];
        } else if (inputModel === "hsva") {
          var _hsvToHsl = hsvToHsl.apply(undefined, _toConsumableArray(components));

          var _hsvToHsl2 = _slicedToArray(_hsvToHsl, 3);

          h = _hsvToHsl2[0];
          s = _hsvToHsl2[1];
          l = _hsvToHsl2[2];

          _a2 = components[3];
        } else if (inputModel === "rgba") {
          var _rgbToHsl3 = rgbToHsl.apply(undefined, _toConsumableArray(components));

          var _rgbToHsl4 = _slicedToArray(_rgbToHsl3, 3);

          h = _rgbToHsl4[0];
          s = _rgbToHsl4[1];
          l = _rgbToHsl4[2];

          _a2 = components[3];
        }

        h = normalize(h, 0, 360, 0);
        s = normalize(s, 0, 100, 1);
        l = normalize(l, 0, 100, 1);
        _a2 = normalize(_a2, 0, 1, 2);

        if (outputFormat === "hsl") {
          string = "hsl(" + h + ", " + s + "%, " + l + "%)";
        } else if (outputFormat === "hsla") {
          string = "hsla(" + h + ", " + s + "%, " + l + "%, " + _a2 + ")";
        }
      }

    return string;
  };

  // @info
  //   Convert CSS color string into an array of tokens.
  //   -----------------------------------
  //   Token type    Sample token text
  //   -----------------------------------
  //   "FUNCTION"    "rgb(", "hsla("
  //   "HEX"         "#000", "#bada55"
  //   "NUMBER"      "100", ".2", "10.3234"
  //   "PERCENTAGE"  "100%", "0.2%"
  //   "CHAR"        ")", ","
  // @type
  //   type Token = {type: string, text: string}
  //   (string) => Array<Token>
  var tokenizeColor = function tokenizeColor(cssText) {
    var tokens = [];
    var scanner = new StringScanner(cssText.toLowerCase());

    var _loop = function _loop() {
      var char = scanner.read();

      (function () {
        // FUNCTION
        if (char === "r" || char === "h") {
          var _text = char;

          if (char + scanner.peek(3) === "rgb(") {
            _text += scanner.read(3);
          } else if (char + scanner.peek(4) === "rgba(") {
            _text += scanner.read(4);
          } else if (char + scanner.peek(3) === "hsl(") {
            _text += scanner.read(3);
          } else if (char + scanner.peek(4) === "hsla(") {
            _text += scanner.read(4);
          }

          if (_text !== char) {
            tokens.push({ type: "FUNCTION", text: _text });
            return;
          }
        }

        // HEX
        if (char === "#") {
          if (isHexColorString(char + scanner.peek(6))) {
            var _text2 = char + scanner.read(6);
            tokens.push({ type: "HEX", text: _text2 });
            return;
          } else if (isHexColorString(char + scanner.peek(3))) {
            text = char + scanner.read(3);
            tokens.push({ type: "HEX", text: text });
            return;
          }
        }

        // NUMBER
        // PERCENTAGE
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"].includes(char)) {
          var _text3 = char;

          while (true) {
            if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(scanner.peek())) {
              _text3 += scanner.read();
            } else {
              break;
            }
          }

          if (scanner.peek() === "%") {
            _text3 += scanner.read();
            tokens.push({ type: "PERCENTAGE", text: _text3 });
          } else {
            tokens.push({ type: "NUM", text: _text3 });
          }

          return;
        }

        // S
        if (/\u0009|\u000a|\u000c|\u000d|\u0020/.test(char)) {
          // Don't tokenize whitespace as it's meaningless
          return;
        }

        // CHAR
        tokens.push({ type: "CHAR", text: char });
        return;
      })();
    };

    while (scanner.peek() !== null) {
      _loop();
    }

    return tokens;
  };

  // @type
  //   format = "rgb" || "rgba" || "rgb%" || "rgba%" || "hex" || "hsl" || "hsla"
  //   (string, format) => string
  var formatColorString = function formatColorString(colorString, format) {
    var model = format.startsWith("hsl") ? "hsla" : "rgba";
    var components = parseColor(colorString, model);
    var formattedColorString = serializeColor(components, model, format);
    return formattedColorString;
  };

  // @info
  //   Check if string represents a valid hex color, e.g. "#fff", "#bada55".
  // @type
  //   (string) => boolean
  var isHexColorString = function isHexColorString(string) {
    string = string.toLowerCase();

    if (string[0] !== "#") {
      return false;
    } else if (string.length !== 4 && string.length !== 7) {
      return false;
    } else {
      string = string.substring(1); // get rid of "#"
    }

    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = string[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var digit = _step3.value;

        if (!hexDigits.includes(digit)) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return true;
  };

  // @info
  //   Check if string contains valid CSS3 color, e.g. "blue", "#fff", "rgb(50, 50, 100)".
  // @type
  //   (string) => boolean
  var isValidColorString = function isValidColorString(string) {
    try {
      parseColor(string);
    } catch (error) {
      return false;
    }

    return true;
  };

  var shadowHTML = "\n  <style>\n    :host {\n      display: block;\n      width: 100%;\n      user-select: none;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n\n    /**\n     * Hue slider\n     */\n\n    #hue-slider {\n      width: 100%;\n      height: 28px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border-radius: 2px;\n      touch-action: pan-y;\n      background: red;\n      --marker-width: 18px;\n    }\n\n    #hue-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n      background: linear-gradient(to right,\n        rgba(255, 0, 0, 1),\n        rgba(255, 255, 0, 1),\n        rgba(0, 255, 0, 1),\n        rgba(0, 255, 255, 1),\n        rgba(0, 0, 255, 1),\n        rgba(255, 0, 255, 1),\n        rgba(255, 0, 0, 1)\n      );\n    }\n\n    #hue-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n\n    /**\n     * Saturation slider\n     */\n\n    #saturation-slider {\n      width: 100%;\n      height: 28px;\n      margin-top: 20px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n\n    #saturation-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #saturation-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n\n    /**\n     * Lightness slider\n     */\n\n    #lightness-slider {\n      width: 100%;\n      height: 28px;\n      margin-top: 20px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n\n    #lightness-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #lightness-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n\n    /**\n     * Alpha slider\n     */\n\n    #alpha-slider {\n      display: none;\n      width: 100%;\n      height: 28px;\n      margin-top: 20px;\n      margin-bottom: 8px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border: 1px solid #cecece;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n    :host([alphaslider]) #alpha-slider {\n      display: block;\n    }\n\n    #alpha-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #alpha-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n  </style>\n\n  <x-box vertical>\n    <div id=\"hue-slider\">\n      <div id=\"hue-slider-track\">\n        <div id=\"hue-slider-marker\"></div>\n      </div>\n    </div>\n\n    <div id=\"saturation-slider\">\n      <div id=\"saturation-slider-track\">\n        <div id=\"saturation-slider-marker\"></div>\n      </div>\n    </div>\n\n    <div id=\"lightness-slider\">\n      <div id=\"lightness-slider-track\">\n        <div id=\"lightness-slider-marker\"></div>\n      </div>\n    </div>\n\n    <div id=\"alpha-slider\">\n      <div id=\"alpha-slider-track\">\n        <div id=\"alpha-slider-marker\"></div>\n      </div>\n    </div>\n  </x-box>\n";

  // @events
  //   change
  //   changestart
  //   changeend

  var XBarsColorPickerElement = function (_HTMLElement3) {
    _inherits(XBarsColorPickerElement, _HTMLElement3);

    _createClass(XBarsColorPickerElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   "hsla(0, 0%, 100%, 1)"
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value"];
      }
    }]);

    function XBarsColorPickerElement() {
      _classCallCheck(this, XBarsColorPickerElement);

      var _this9 = _possibleConstructorReturn(this, (XBarsColorPickerElement.__proto__ || Object.getPrototypeOf(XBarsColorPickerElement)).call(this));

      _this9._h = 0; // Hue (0 ~ 360)
      _this9._s = 0; // Saturation (0 ~ 100)
      _this9._l = 80; // Lightness (0 ~ 100)
      _this9._a = 1; // Alpha (0 ~ 1)

      _this9._isDraggingHueSliderMarker = false;
      _this9._isDraggingSaturationSliderMarker = false;
      _this9._isDraggingLightnessSliderMarker = false;
      _this9._isDraggingAlphaSliderMarker = false;

      _this9._shadowRoot = _this9.attachShadow({ mode: "closed" });
      _this9._shadowRoot.innerHTML = shadowHTML;

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _this9._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var element = _step4.value;

          _this9["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      _this9["#hue-slider"].addEventListener("pointerdown", function (event) {
        return _this9._onHueSliderPointerDown(event);
      });
      _this9["#saturation-slider"].addEventListener("pointerdown", function (event) {
        return _this9._onSaturationSliderPointerDown(event);
      });
      _this9["#lightness-slider"].addEventListener("pointerdown", function (event) {
        return _this9._onLightnessSliderPointerDown(event);
      });
      _this9["#alpha-slider"].addEventListener("pointerdown", function (event) {
        return _this9._onAlphaSliderPointerDown(event);
      });
      return _this9;
    }

    _createClass(XBarsColorPickerElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._onValueAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this._updateHueSliderMarker();

        this._udpateSaturationSliderMarker();
        this._udpateSaturationSliderBackground();

        this._udpateLightnessSliderMarker();
        this._udpateLightnessSliderBackground();

        this._updateAlphaSliderMarker();
        this._updateAlphaSliderBackground();
      }
    }, {
      key: "_updateHueSliderMarker",
      value: function _updateHueSliderMarker() {
        this["#hue-slider-marker"].style.left = normalize(this._h, 0, 360, 0) / 360 * 100 + "%";
      }
    }, {
      key: "_udpateSaturationSliderMarker",
      value: function _udpateSaturationSliderMarker() {
        this["#saturation-slider-marker"].style.left = normalize(this._s, 0, 100, 2) + "%";
      }
    }, {
      key: "_udpateLightnessSliderMarker",
      value: function _udpateLightnessSliderMarker() {
        this["#lightness-slider-marker"].style.left = normalize(this._l, 0, 100, 2) + "%";
      }
    }, {
      key: "_updateAlphaSliderMarker",
      value: function _updateAlphaSliderMarker() {
        this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
      }
    }, {
      key: "_udpateSaturationSliderBackground",
      value: function _udpateSaturationSliderBackground() {
        var h = this._h;

        this["#saturation-slider"].style.background = "linear-gradient(\n      to right, hsl(" + h + ", 0%, 50%), hsl(" + h + ", 100%, 50%)\n    )";
      }
    }, {
      key: "_udpateLightnessSliderBackground",
      value: function _udpateLightnessSliderBackground() {
        var h = this._h;
        var s = this._s;

        this["#lightness-slider"].style.background = "linear-gradient(\n      to right, hsl(" + h + ", " + s + "%, 0%), hsl(" + h + ", " + s + "%, 50%), hsl(" + h + ", " + s + "%, 100%)\n    )";
      }
    }, {
      key: "_updateAlphaSliderBackground",
      value: function _updateAlphaSliderBackground() {
        var h = this._h;
        var s = this._s;
        var l = this._l;

        this["#alpha-slider"].style.background = "\n      linear-gradient(to right, hsla(" + h + ", " + s + "%, " + l + "%, 1), hsla(" + h + ", " + s + "%, " + l + "%, 0)),\n      url(node_modules/xel/images/checkboard.png) repeat 0 0\n    ";
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        if (this._isDraggingHueSliderMarker === false && this._isDraggingSaturationSliderMarker === false && this._isDraggingLightnessSliderMarker === false && this._isDraggingAlphaSliderMarker === false) {
          var _parseColor = parseColor(this.value, "hsla"),
              _parseColor2 = _slicedToArray(_parseColor, 4),
              h = _parseColor2[0],
              s = _parseColor2[1],
              l = _parseColor2[2],
              a = _parseColor2[3];

          this._h = h;
          this._s = s;
          this._l = l;
          this._a = a;

          this._update();
        }
      }
    }, {
      key: "_onHueSliderPointerDown",
      value: function _onHueSliderPointerDown(pointerDownEvent) {
        var _this10 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#hue-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener = void 0;

        this._isDraggingHueSliderMarker = true;
        this["#hue-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var h = (clientX - trackBounds.x) / trackBounds.width * 360;
          h = normalize(h, 0, 360, 0);

          if (h !== _this10._h) {
            _this10._h = h;
            _this10.value = serializeColor([_this10._h, _this10._s, _this10._l, _this10._a], "hsla", "hsla");

            _this10._updateHueSliderMarker();
            _this10._udpateSaturationSliderBackground();
            _this10._udpateLightnessSliderBackground();
            _this10._updateAlphaSliderBackground();

            _this10.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#hue-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#hue-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener = function lostPointerCaptureListener() {
          _this10["#hue-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this10["#hue-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener);
          _this10.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this10._isDraggingHueSliderMarker = false;
        });
      }
    }, {
      key: "_onSaturationSliderPointerDown",
      value: function _onSaturationSliderPointerDown(pointerDownEvent) {
        var _this11 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#saturation-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener2 = void 0;

        this._isDraggingSaturationSliderMarker = true;
        this["#saturation-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var s = (clientX - trackBounds.x) / trackBounds.width * 100;
          s = normalize(s, 0, 100, 0);

          if (s !== _this11._s) {
            _this11._s = s;
            _this11.value = serializeColor([_this11._h, _this11._s, _this11._l, _this11._a], "hsla", "hsla");

            _this11._udpateSaturationSliderMarker();
            _this11._udpateSaturationSliderBackground();
            _this11._udpateLightnessSliderBackground();
            _this11._updateAlphaSliderBackground();

            _this11.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#saturation-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#saturation-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener2 = function lostPointerCaptureListener() {
          _this11["#saturation-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this11["#saturation-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener2);
          _this11.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this11._isDraggingSaturationSliderMarker = false;
        });
      }
    }, {
      key: "_onLightnessSliderPointerDown",
      value: function _onLightnessSliderPointerDown(pointerDownEvent) {
        var _this12 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#lightness-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener3 = void 0;

        this._isDraggingLightnessSliderMarker = true;
        this["#lightness-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var l = (clientX - trackBounds.x) / trackBounds.width * 100;
          l = normalize(l, 0, 100, 0);

          if (l !== _this12._l) {
            _this12._l = l;
            _this12.value = serializeColor([_this12._h, _this12._s, _this12._l, _this12._a], "hsla", "hsla");

            _this12._udpateLightnessSliderMarker();
            _this12._udpateSaturationSliderBackground();
            _this12._udpateLightnessSliderBackground();
            _this12._updateAlphaSliderBackground();

            _this12.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#lightness-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#lightness-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener3 = function lostPointerCaptureListener() {
          _this12["#lightness-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this12["#lightness-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener3);
          _this12.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this12._isDraggingLightnessSliderMarker = false;
        });
      }
    }, {
      key: "_onAlphaSliderPointerDown",
      value: function _onAlphaSliderPointerDown(pointerDownEvent) {
        var _this13 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener4 = void 0;

        this._isDraggingAlphaSliderMarker = true;
        this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var a = 1 - (clientX - trackBounds.x) / trackBounds.width;
          a = normalize(a, 0, 1, 2);

          if (a !== _this13._a) {
            _this13._a = a;
            _this13.value = serializeColor([_this13._h, _this13._s, _this13._l, _this13._a], "hsla", "hsla");
            _this13._updateAlphaSliderMarker();
            _this13.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#alpha-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener4 = function lostPointerCaptureListener() {
          _this13["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this13["#alpha-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener4);
          _this13.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this13._isDraggingAlphaSliderMarker = false;
        });
      }
    }]);

    return XBarsColorPickerElement;
  }(HTMLElement);

  customElements.define("x-barscolorpicker", XBarsColorPickerElement);

  var shadowTemplate$2 = html(_templateObject4);

  var XBoxElement = function (_HTMLElement4) {
    _inherits(XBoxElement, _HTMLElement4);

    _createClass(XBoxElement, [{
      key: "vertical",

      // @info
      //   Whether to use vertical (rather than horizontal) layout.
      // @type
      //   boolean
      // @default
      //   false
      get: function get() {
        return this.hasAttribute("vertical");
      },
      set: function set(vertical) {
        vertical ? this.setAttribute("vertical", "") : this.removeAttribute("vertical");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XBoxElement() {
      _classCallCheck(this, XBoxElement);

      var _this14 = _possibleConstructorReturn(this, (XBoxElement.__proto__ || Object.getPrototypeOf(XBoxElement)).call(this));

      _this14._shadowRoot = _this14.attachShadow({ mode: "closed" });
      _this14._shadowRoot.append(document.importNode(shadowTemplate$2.content, true));
      return _this14;
    }

    return XBoxElement;
  }(HTMLElement);

  customElements.define("x-box", XBoxElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  // @info
  //   Sleep for given period of time (in miliseconds).
  // @type
  //   (number) => Promise
  var sleep = function sleep(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        return resolve();
      }, time);
    });
  };

  // @info
  //   Get timestamp in Unix format, e.g. 1348271383119 [http://en.wikipedia.org/wiki/Unix_time]
  // @type
  //   () => number
  var getTimeStamp = function getTimeStamp() {
    return Date.now();
  };

  // @info
  //   Returns a function, that, when invoked, will only be triggered at most once during a given window of time.
  // @src
  //   [https://github.com/documentcloud/underscore/blob/master/underscore.js#L627]
  // @license
  //   MIT License [https://github.com/documentcloud/underscore/blob/master/LICENSE]
  // @type
  //   (Function, number, Object) => Function
  var throttle = function throttle(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var context = arguments[2];

    var args = null;
    var timeout = null;
    var result = null;
    var previous = 0;

    var later = function later() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
    };

    var wrapper = function wrapper() {
      for (var _len = arguments.length, _args = Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      var now = new Date();
      var remaining = wait - (now - previous);
      args = _args;

      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };

    return wrapper;
  };

  // @info
  //   Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be
  //   called after it stops being called for N milliseconds. If `immediate` is passed, trigger the function on the
  //   leading edge, instead of the trailing.
  //   Check [http://drupalmotion.com/article/debounce-and-throttle-visual-explanation] for a nice explanation of how
  //   this is different from throttle.
  // @src
  //   [https://github.com/documentcloud/underscore/blob/master/underscore.js#L656]
  // @license
  //   MIT License [https://github.com/documentcloud/underscore/blob/master/LICENSE]
  // @type
  //   (Function, number, Object, boolean) => Function
  var debounce = function debounce(func, wait, context) {
    var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var timeout = null;
    var result = null;

    var wrapper = function wrapper() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var later = function later() {
        timeout = null;

        if (!immediate) {
          result = func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        result = func.apply(context, args);
      }

      return result;
    };

    return wrapper;
  };

  var max$3 = Math.max;

  var easing$1 = "cubic-bezier(0.4, 0, 0.2, 1)";
  var $oldTabIndex = Symbol();

  var shadowTemplate$3 = html(_templateObject5);

  // @events
  //   toggle

  var XButtonElement = function (_HTMLElement5) {
    _inherits(XButtonElement, _HTMLElement5);

    _createClass(XButtonElement, [{
      key: "value",


      // @info
      //   Values associated with this button.
      // @type
      //   string
      // @default
      //   null
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @info
      //   Whether this button is toggled.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "toggled",
      get: function get() {
        return this.hasAttribute("toggled");
      },
      set: function set(toggled) {
        toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
      }

      // @info
      //   Whether this button can be toggled on/off by the user (e.g. by clicking the button).
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "togglable",
      get: function get() {
        return this.hasAttribute("togglable");
      },
      set: function set(togglable) {
        togglable ? this.setAttribute("togglable", "") : this.removeAttribute("togglable");
      }

      // @info
      //   CSS skin to be used by this button.
      // @type
      //   string
      // @default
      //   ""
      // @attribute

    }, {
      key: "skin",
      get: function get() {
        return this.getAttribute("skin");
      },
      set: function set(skin) {
        skin === null ? this.removeAttribute("skin") : this.setAttribute("skin", skin);
      }

      // @info
      //   Whether the this button has "mixed" state.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @info
      //   Whether this button is disabled.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   Whether the menu or popover associated with this button is opened.
      // @type
      //   boolean
      // @attribute
      //   read-only

    }, {
      key: "expanded",
      get: function get() {
        return this.hasAttribute("expanded");
      }

      // @info
      //   Whether clicking this button will cause a menu or popover to show up.
      // @type
      //   boolean

    }, {
      key: "expandable",
      get: function get() {
        return this._canOpenMenu() || this._canOpenPopover();
      }

      // @info
      //   Direct ancestor <x-buttons> element.
      // @type
      //   XButtonsElement?

    }, {
      key: "ownerButtons",
      get: function get() {
        if (this.parentElement) {
          if (this.parentElement.localName === "x-buttons") {
            return this.parentElement;
          } else if (this.parentElement.localName === "x-box" && this.parentElement.parentElement) {
            if (this.parentElement.parentElement.localName === "x-buttons") {
              return this.parentElement.parentElement;
            }
          }
        }

        return null;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XButtonElement() {
      _classCallCheck(this, XButtonElement);

      var _this15 = _possibleConstructorReturn(this, (XButtonElement.__proto__ || Object.getPrototypeOf(XButtonElement)).call(this));

      _this15._shadowRoot = _this15.attachShadow({ mode: "closed" });
      _this15._shadowRoot.append(document.importNode(shadowTemplate$3.content, true));

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _this15._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var element = _step5.value;

          _this15["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      _this15.addEventListener("pointerdown", function (event) {
        return _this15._onPointerDown(event);
      });
      _this15.addEventListener("click", function (event) {
        return _this15._onClick(event);
      });
      _this15.addEventListener("keydown", function (event) {
        return _this15._onKeyDown(event);
      });

      (async function () {
        await customElements.whenDefined("x-backdrop");
        _this15["#backdrop"] = createElement("x-backdrop");
        _this15["#backdrop"].style.background = "rgba(0, 0, 0, 0)";
      })();

      return _this15;
    }

    _createClass(XButtonElement, [{
      key: "connectedCallback",
      value: async function connectedCallback() {
        // Make the parent anchor element non-focusable (button should be focused instead)
        if (this.parentElement && this.parentElement.localName === "a" && this.parentElement.tabIndex !== -1) {
          this.parentElement.tabIndex = -1;
        }

        this._updateAccessabilityAttributes();
        this._updateArrowVisibility();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Open the child menu or overlay.

    }, {
      key: "expand",
      value: function expand() {
        var _this16 = this;

        return new Promise(async function (resolve) {
          if (_this16._canOpenMenu()) {
            await _this16._openMenu();
          } else if (_this16._canOpenPopover()) {
            await _this16._openPopover();
          }

          resolve();
        });
      }

      // @info
      //   Close the child menu or overlay.

    }, {
      key: "collapse",
      value: function collapse() {
        var _this17 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return new Promise(async function (resolve) {

          if (_this17._canCloseMenu()) {
            await _this17._closeMenu(delay);
          } else if (_this17._canClosePopover()) {
            await _this17._closePopover(delay);
          }

          resolve();
        });
      }
    }, {
      key: "_openMenu",
      value: function _openMenu() {
        var _this18 = this;

        return new Promise(async function (resolve) {
          if (_this18._canOpenMenu()) {
            var menu = _this18.querySelector(":scope > x-menu");

            _this18._wasFocusedBeforeExpanding = _this18.matches(":focus");
            _this18.setAttribute("expanded", "");

            _this18["#backdrop"].ownerElement = menu;
            _this18["#backdrop"].show(false);

            await menu.openNextToElement(_this18, "vertical", 3);
            menu.focus();
          }

          resolve();
        });
      }
    }, {
      key: "_closeMenu",
      value: function _closeMenu() {
        var _this19 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return new Promise(async function (resolve) {
          if (_this19._canCloseMenu()) {
            var menu = _this19.querySelector(":scope > x-menu");
            menu.setAttribute("closing", "");

            await delay;
            await menu.close();

            _this19["#backdrop"].hide(false);
            _this19.removeAttribute("expanded");

            if (_this19._wasFocusedBeforeExpanding) {
              _this19.focus();
            } else {
              var ancestorFocusableElement = closest(_this19.parentNode, "[tabindex]");

              if (ancestorFocusableElement) {
                ancestorFocusableElement.focus();
              }
            }

            menu.removeAttribute("closing");
          }

          resolve();
        });
      }
    }, {
      key: "_canOpenMenu",
      value: function _canOpenMenu() {
        var result = false;

        if (this.disabled === false) {
          var menu = this.querySelector(":scope > x-menu");

          if (menu && menu.hasAttribute("opened") === false && menu.hasAttribute("closing") === false) {
            var item = menu.querySelector("x-menuitem");

            if (item !== null) {
              result = true;
            }
          }
        }

        return result;
      }
    }, {
      key: "_canCloseMenu",
      value: function _canCloseMenu() {
        var result = false;

        if (this.disabled === false) {
          var menu = this.querySelector(":scope > x-menu");

          if (menu && menu.opened) {
            result = true;
          }
        }

        return result;
      }
    }, {
      key: "_openPopover",
      value: function _openPopover() {
        var _this20 = this;

        return new Promise(async function (resolve) {
          if (_this20._canOpenPopover()) {
            var popover = _this20.querySelector(":scope > x-popover");

            _this20._wasFocusedBeforeExpanding = _this20.matches(":focus");
            _this20.setAttribute("expanded", "");

            await popover.open(_this20);
            popover.focus();
          }

          resolve();
        });
      }
    }, {
      key: "_closePopover",
      value: function _closePopover() {
        var _this21 = this;

        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return new Promise(async function (resolve) {
          if (_this21._canClosePopover()) {
            var popover = _this21.querySelector(":scope > x-popover");
            popover.setAttribute("closing", "");

            await delay;
            await popover.close();

            _this21.removeAttribute("expanded");

            if (_this21._wasFocusedBeforeExpanding) {
              _this21.focus();
            } else {
              var ancestorFocusableElement = closest(_this21.parentNode, "[tabindex]");

              if (ancestorFocusableElement) {
                ancestorFocusableElement.focus();
              }
            }

            popover.removeAttribute("closing");
          }

          resolve();
        });
      }
    }, {
      key: "_canOpenPopover",
      value: function _canOpenPopover() {
        var result = false;

        if (this.disabled === false) {
          var popover = this.querySelector(":scope > x-popover");

          if (popover && popover.hasAttribute("opened") === false) {
            result = true;
          }
        }

        return result;
      }
    }, {
      key: "_canClosePopover",
      value: function _canClosePopover() {
        var result = false;

        if (this.disabled === false) {
          var popover = this.querySelector(":scope > x-popover");

          if (popover && popover.opened) {
            result = true;
          }
        }

        return result;
      }
    }, {
      key: "_openDialog",
      value: function _openDialog() {
        var _this22 = this;

        return new Promise(function (resolve) {
          if (_this22._canOpenDialog()) {
            var dialog = _this22.querySelector(":scope > dialog");
            dialog.showModal();
          }

          resolve();
        });
      }
    }, {
      key: "_canOpenDialog",
      value: function _canOpenDialog() {
        var result = false;

        if (this.disabled === false) {
          var dialog = this.querySelector(":scope > dialog");

          if (dialog && dialog.hasAttribute("open") === false && dialog.hasAttribute("closing") === false) {
            result = true;
          }
        }

        return result;
      }
    }, {
      key: "_openNotification",
      value: function _openNotification() {
        var _this23 = this;

        return new Promise(function (resolve) {
          if (_this23._canOpenNotification()) {
            var notification = _this23.querySelector(":scope > x-notification");
            notification.opened = true;
          }

          resolve();
        });
      }
    }, {
      key: "_canOpenNotification",
      value: function _canOpenNotification() {
        var result = false;

        if (this.disabled === false) {
          var notification = this.querySelector(":scope > x-notification");

          if (notification && !notification.hasAttribute("opened") && !notification.hasAttribute("closing")) {
            result = true;
          }
        }

        return result;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateArrowVisibility",
      value: function _updateArrowVisibility() {
        var popup = this.querySelector(":scope > x-menu, :scope > x-popover");
        this["#arrow"].style.display = popup ? null : "none";
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "button");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex] > 0 ? this[$oldTabIndex] : 0;
          }

          delete this[$oldTabIndex];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        var openedMenu = this.querySelector(":scope > x-menu[opened]");
        var openedPopover = this.querySelector(":scope > x-popover[opened]");
        var openedDialog = this.querySelector(":scope > dialog[open]");
        var openedNotification = this.querySelector(":scope > x-notification[opened]");

        if (event.target === this["#backdrop"]) {
          this._onBackdropPointerDown(event);
        } else if (openedMenu && openedMenu.contains(event.target)) {
          return;
        } else if (openedPopover && openedPopover.contains(event.target)) {
          return;
        } else if (openedDialog && openedDialog.contains(event.target)) {
          return;
        } else if (openedNotification && openedNotification.contains(event.target)) {
          return;
        } else {
          this._onButtonPointerDown(event);
        }
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        var openedMenu = this.querySelector(":scope > x-menu[opened]");
        var openedPopover = this.querySelector(":scope > x-popover[opened]");
        var openedDialog = this.querySelector(":scope > dialog[open]");
        var openedNotification = this.querySelector(":scope > x-notification[opened]");

        if (event.target === this["#backdrop"]) {
          return;
        } else if (openedMenu && openedMenu.contains(event.target)) {
          if (openedMenu.hasAttribute("closing") === false && event.target.closest("x-menuitem")) {
            this._onMenuItemClick(event);
          }
        } else if (openedPopover && openedPopover.contains(event.target)) {
          return;
        } else if (openedDialog && openedDialog.contains(event.target)) {
          return;
        } else if (openedNotification && openedNotification.contains(event.target)) {
          return;
        } else {
          this._onButtonClick(event);
        }
      }
    }, {
      key: "_onBackdropPointerDown",
      value: function _onBackdropPointerDown(pointerDownEvent) {
        this.collapse();
      }
    }, {
      key: "_onButtonPointerDown",
      value: async function _onButtonPointerDown(pointerDownEvent) {
        var _this24 = this;

        if (pointerDownEvent.buttons !== 1) {
          pointerDownEvent.preventDefault();
          return;
        }

        if (this.querySelector(":scope > dialog[open]")) {
          pointerDownEvent.preventDefault();
          return;
        }

        this.setPointerCapture(pointerDownEvent.pointerId);

        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element as soon as
        // the button is released.
        if (this.matches(":focus") === false) {
          var ancestorFocusableElement = closest(this.parentNode, "*[tabindex]:not(a)");

          this.addEventListener("lostpointercapture", function () {
            if (ancestorFocusableElement) {
              ancestorFocusableElement.focus();
            } else {
              _this24.blur();
            }
          }, { once: true });
        }

        // Provide "pressed" attribute for theming purposes which acts like :active pseudo-class, but is guaranteed
        // to last at least 150ms.
        if (this._canOpenMenu() === false && this._canOpenPopover() === false && this._canClosePopover() === false) {
          var pointerDownTimeStamp = Date.now();
          var isDown = true;

          this.addEventListener("lostpointercapture", async function () {
            isDown = false;
            var pressedTime = Date.now() - pointerDownTimeStamp;
            var minPressedTime = 150;

            if (pressedTime < minPressedTime) {
              await sleep(minPressedTime - pressedTime);
            }

            _this24.removeAttribute("pressed");
          }, { once: true });

          (async function () {
            if (_this24.ownerButtons) {
              if (_this24.ownerButtons.tracking === 0 || _this24.ownerButtons.tracking === 2) {
                await sleep(10);
              } else if (_this24.ownerButtons.tracking === 1 && (_this24.toggled === false || _this24.mixed)) {
                await sleep(10);
              }
            } else if (_this24.togglable) {
              await sleep(10);
            }

            if (isDown) {
              _this24.setAttribute("pressed", "");
            }
          })();
        }

        if (this._canOpenMenu()) {
          this._openMenu();
        } else if (this._canOpenPopover()) {
          this._openPopover();
        } else if (this._canClosePopover()) {
          this._closePopover();
        }

        // Ripple
        {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max$3(rect.width, rect.height) * 1.5;
            var top = pointerDownEvent.clientY - rect.y - size / 2;
            var left = pointerDownEvent.clientX - rect.x - size / 2;
            var whenLostPointerCapture = new Promise(function (r) {
              return _this24.addEventListener("lostpointercapture", r, { once: true });
            });
            var delay = true;

            if (this.expandable === false) {
              if (this.ownerButtons) {
                if (this.ownerButtons.tracking === 0 || this.ownerButtons.tracking === 2) {
                  delay = false;
                } else if (this.ownerButtons.tracking === 1 && this.toggled === false) {
                  delay = false;
                }
              } else if (this.togglable) {
                delay = false;
              }
            }

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");

            this["#ripples"].append(ripple);
            this["#ripples"].style.contain = "strict";

            var inAnimation = ripple.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing$1 });

            await whenLostPointerCapture;

            if (delay) {
              await inAnimation.finished;

              var outAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity || "0", "0"] }, { duration: 300, easing: easing$1 });

              await outAnimation.finished;
            }

            ripple.remove();
          } else if (triggerEffect === "unbounded-ripple") {
            var bounds = this["#ripples"].getBoundingClientRect();
            var _size = bounds.height * 1.25;
            var _top = bounds.y + bounds.height / 2 - bounds.y - _size / 2;
            var _left = bounds.x + bounds.width / 2 - bounds.x - _size / 2;
            var _whenLostPointerCapture = new Promise(function (r) {
              return _this24.addEventListener("lostpointercapture", r, { once: true });
            });

            var _ripple = createElement("div");
            _ripple.setAttribute("class", "ripple pointer-down-ripple");
            _ripple.setAttribute("style", "width: " + _size + "px; height: " + _size + "px; top: " + _top + "px; left: " + _left + "px;");

            this["#ripples"].append(_ripple);
            this["#ripples"].style.contain = "none";

            // Workaround for buttons that change their color when toggled on/off.
            _ripple.hidden = true;
            await sleep(20);
            _ripple.hidden = false;

            var _inAnimation = _ripple.animate({ transform: ["scale(0)", "scale(1)"] }, { duration: 200, easing: easing$1 });

            await _whenLostPointerCapture;
            await _inAnimation.finished;

            var _outAnimation = _ripple.animate({ opacity: [getComputedStyle(_ripple).opacity || "0", "0"] }, { duration: 200, easing: easing$1 });

            await _outAnimation.finished;
            _ripple.remove();
          }
        }
      }
    }, {
      key: "_onButtonClick",
      value: async function _onButtonClick(event) {
        var popup = this.querySelector(":scope > x-menu, :scope > x-popover");

        if (popup && popup.hasAttribute("closing")) {
          return;
        }

        if (this._canClosePopover()) ;else {
          if (this._canOpenDialog()) {
            this._openDialog();
          } else if (this._canOpenNotification()) {
            this._openNotification();
          }
        }

        // Collapse  the button

        /*
        console.log(this.hasAttribute("opening"));
        let popover = this.querySelector(":scope > x-popover");
         if (popover) {
          if (popover.opened) {
            this.collapse();
          }
        }
        */

        // Toggle the button
        if (this.togglable) {
          this.removeAttribute("pressed");
          this.toggled = !this.toggled;
          this.dispatchEvent(new CustomEvent("toggle"));
        }

        // Ripple
        if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max$3(rect.width, rect.height) * 1.5;
            var top = rect.y + rect.height / 2 - rect.y - size / 2;
            var left = rect.x + rect.width / 2 - rect.x - size / 2;
            var delay = true;

            if (this.ownerButtons) {
              if (this.ownerButtons.tracking === 0 || this.ownerButtons.tracking === 2) {
                delay = false;
              } else if (this.ownerButtons.tracking === 1 && this.toggled === true) {
                delay = false;
              }
            } else if (this.togglable) {
              delay = false;
            }

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple click-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");

            this["#ripples"].append(ripple);
            this["#ripples"].style.contain = "strict";

            var inAnimation = ripple.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing$1 });

            if (delay) {
              await inAnimation.finished;

              var outAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity || "0", "0"] }, { duration: 300, easing: easing$1 });

              await outAnimation.finished;
            }

            ripple.remove();
          } else if (triggerEffect === "unbounded-ripple") {
            var _rect = this["#ripples"].getBoundingClientRect();
            var _size2 = _rect.height * 1.35;
            var _top2 = _rect.y + _rect.height / 2 - _rect.y - _size2 / 2;
            var _left2 = _rect.x + _rect.width / 2 - _rect.x - _size2 / 2;

            var _ripple2 = createElement("div");
            _ripple2.setAttribute("class", "ripple");
            _ripple2.setAttribute("style", "width: " + _size2 + "px; height: " + _size2 + "px; top: " + _top2 + "px; left: " + _left2 + "px;");

            this["#ripples"].append(_ripple2);
            this["#ripples"].style.contain = "none";

            await _ripple2.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing$1 }).finished;

            await _ripple2.animate({ opacity: [getComputedStyle(_ripple2).opacity || "0", "0"] }, { duration: 300, easing: easing$1 }).finished;

            _ripple2.remove();
          }
        }
      }
    }, {
      key: "_onMenuItemClick",
      value: function _onMenuItemClick(event) {
        var item = event.target.closest("x-menuitem");
        var menu = this.querySelector(":scope > x-menu");

        if (!menu.hasAttribute("closing")) {
          this.collapse(item.whenTriggerEnd);
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var _this25 = this;

        if (event.code === "Enter" || event.code === "Space") {
          if (this._canOpenMenu()) {
            event.preventDefault();
            this._openMenu().then(function () {
              return _this25.querySelector(":scope > x-menu").focusFirstMenuItem();
            });
          } else if (this._canOpenPopover()) {
            event.preventDefault();
            this._openPopover();
          } else if (this._canOpenDialog()) {
            event.preventDefault();
            this._openDialog();
          } else if (this._canOpenNotification()) {
            event.preventDefault();
            this._openNotification();
          } else {
            if (this.matches(":focus")) {
              if (this._canClosePopover()) {
                this._closePopover();
              } else if (this._canCloseMenu()) {
                this._closeMenu();
              } else {
                event.preventDefault();
                this.click();
              }
            }
          }
        } else if (event.code === "ArrowDown") {
          if (this._canOpenMenu()) {
            var menu = this.querySelector(":scope > x-menu");
            event.preventDefault();
            this._openMenu().then(function () {
              return _this25.querySelector(":scope > x-menu").focusFirstMenuItem();
            });
          } else if (this._canOpenPopover()) {
            event.preventDefault();
            this._openPopover();
          } else {
            event.preventDefault();
            this.click();
          }
        } else if (event.code === "ArrowUp") {
          if (this._canOpenMenu()) {
            event.preventDefault();
            this._openMenu().then(function () {
              return _this25.querySelector(":scope > x-menu").focusLastMenuItem();
            });
          } else if (this._canOpenPopover()) {
            event.preventDefault();
            this._openPopover();
          } else {
            event.preventDefault();
            this.click();
          }
        } else if (event.code === "Escape") {
          if (this._canCloseMenu()) {
            event.preventDefault();
            this.collapse();
          } else if (this._canClosePopover()) {
            event.preventDefault();
            this.collapse();
          }
        }
      }
    }]);

    return XButtonElement;
  }(HTMLElement);

  customElements.define("x-button", XButtonElement);

  var isArray = Array.isArray;


  var shadowTemplate$4 = html(_templateObject6);

  // @events
  //   toggle

  var XButtonsElement = function (_HTMLElement6) {
    _inherits(XButtonsElement, _HTMLElement6);

    _createClass(XButtonsElement, [{
      key: "tracking",

      // @info
      //  Specifies what should happen when user clicks a button:
      //  -1 - Do not toggle any buttons
      //   0 - Toggle the clicked button on/off and other buttons off
      //   1 - Toggle the clicked button on and other buttons off
      //   2 - Toggle the clicked button on/off
      // @type
      //   number
      // @default
      //   -1
      // @attribute
      get: function get() {
        return this.hasAttribute("tracking") ? parseInt(this.getAttribute("tracking")) : -1;
      },
      set: function set(tracking) {
        this.setAttribute("tracking", tracking);
      }

      // @info
      //   Get/set the buttons that should have toggled state.
      // @type
      //   string || Array || null

    }, {
      key: "value",
      get: function get() {
        if (this.tracking === 2) {
          var buttons = this._getButtons().filter(function (button) {
            return button.toggled;
          });
          return buttons.map(function (button) {
            return button.value;
          }).filter(function (value) {
            return value != undefined;
          });
        } else if (this.tracking === 1 || this.tracking === 0) {
          var button = this._getButtons().find(function (button) {
            return button.toggled;
          });
          return button && button.value !== undefined ? button.value : null;
        } else if (this.tracking === -1) {
          return null;
        }
      },
      set: function set(value) {
        if (this.tracking === 2) {
          var buttons = this._getButtons();

          if (isArray(value)) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = buttons[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var button = _step6.value;

                button.toggled = value.includes(button.value);
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
          } else {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = buttons[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _button = _step7.value;

                _button.toggled = _button.value === value;
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }
        } else if (this.tracking === 1 || this.tracking === 0) {
          var _buttons = this._getButtons();
          var matchedButton = _buttons.find(function (button) {
            return button.value === value;
          });

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = _buttons[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _button2 = _step8.value;

              _button2.toggled = _button2 === matchedButton;
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XButtonsElement() {
      _classCallCheck(this, XButtonsElement);

      var _this26 = _possibleConstructorReturn(this, (XButtonsElement.__proto__ || Object.getPrototypeOf(XButtonsElement)).call(this));

      _this26._shadowRoot = _this26.attachShadow({ mode: "closed" });
      _this26._shadowRoot.append(document.importNode(shadowTemplate$4.content, true));

      _this26.addEventListener("click", function (event) {
        return _this26._onClick(event);
      }, true);
      _this26.addEventListener("keydown", function (event) {
        return _this26._onKeyDown(event);
      });
      return _this26;
    }

    _createClass(XButtonsElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var child = _step9.value;

            if (child.localName === "x-button") {
              var boxShadow = getComputedStyle(child).boxShadow;

              if (boxShadow !== "none") {
                this.setAttribute("hasboxshadow", "");
              } else {
                this.removeAttribute("hasboxshadow");
              }

              break;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_getButtons",
      value: function _getButtons() {
        return [].concat(_toConsumableArray(this.querySelectorAll(":scope > x-button, :scope > x-box > x-button")));
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onClick",
      value: function _onClick(event) {
        if (event.button !== 0) {
          return;
        }

        var clickedButton = event.target.closest("x-button");
        var canToggle = clickedButton && clickedButton.disabled === false && clickedButton.expandable === false;

        if (canToggle) {
          var otherButtons = this._getButtons().filter(function (button) {
            return button !== clickedButton;
          });

          if (this.tracking === 0) {
            if (clickedButton.mixed) {
              clickedButton.mixed = false;
            } else {
              clickedButton.toggled = !clickedButton.toggled;
              clickedButton.mixed = false;
            }

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
              for (var _iterator10 = otherButtons[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                var button = _step10.value;

                button.toggled = false;
                button.mixed = false;
              }
            } catch (err) {
              _didIteratorError10 = true;
              _iteratorError10 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }
              } finally {
                if (_didIteratorError10) {
                  throw _iteratorError10;
                }
              }
            }

            this.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: clickedButton }));
          } else if (this.tracking === 1) {
            if (clickedButton.toggled === false || clickedButton.mixed === true) {
              clickedButton.toggled = true;
              clickedButton.mixed = false;

              var _iteratorNormalCompletion11 = true;
              var _didIteratorError11 = false;
              var _iteratorError11 = undefined;

              try {
                for (var _iterator11 = otherButtons[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  var _button3 = _step11.value;

                  _button3.toggled = false;
                  _button3.mixed = false;
                }
              } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion11 && _iterator11.return) {
                    _iterator11.return();
                  }
                } finally {
                  if (_didIteratorError11) {
                    throw _iteratorError11;
                  }
                }
              }

              this.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: clickedButton }));
            }
          } else if (this.tracking === 2) {
            if (clickedButton.mixed) {
              clickedButton.mixed = false;
            } else {
              clickedButton.toggled = !clickedButton.toggled;
            }

            this.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: clickedButton }));
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var key = event.key;


        if (key === "ArrowRight") {
          var element = [].concat(_toConsumableArray(this.children)).find(function (child) {
            return child.matches(":focus");
          });

          if (element.nextElementSibling) {
            element.nextElementSibling.focus();
          } else if (element !== element.parentElement.firstElementChild) {
            element.parentElement.firstElementChild.focus();
          }
        } else if (key === "ArrowLeft") {
          var _element = [].concat(_toConsumableArray(this.children)).find(function (child) {
            return child.matches(":focus");
          });

          if (_element.previousElementSibling) {
            _element.previousElementSibling.focus();
          } else if (_element !== _element.parentElement.lastElementChild) {
            _element.parentElement.lastElementChild.focus();
          }
        }
      }
    }]);

    return XButtonsElement;
  }(HTMLElement);

  customElements.define("x-buttons", XButtonsElement);

  var shadowTemplate$5 = html(_templateObject7);

  var XCardElement = function (_HTMLElement7) {
    _inherits(XCardElement, _HTMLElement7);

    function XCardElement() {
      _classCallCheck(this, XCardElement);

      var _this27 = _possibleConstructorReturn(this, (XCardElement.__proto__ || Object.getPrototypeOf(XCardElement)).call(this));

      _this27._shadowRoot = _this27.attachShadow({ mode: "closed" });
      _this27._shadowRoot.append(document.importNode(shadowTemplate$5.content, true));

      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = _this27._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var element = _step12.value;

          _this27["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      return _this27;
    }

    return XCardElement;
  }(HTMLElement);

  customElements.define("x-card", XCardElement);

  var easing$2 = "cubic-bezier(0.4, 0, 0.2, 1)";
  var $oldTabIndex$1 = Symbol();

  var shadowTemplate$6 = html(_templateObject8);

  // @events
  //   toggle

  var XCheckboxElement = function (_HTMLElement8) {
    _inherits(XCheckboxElement, _HTMLElement8);

    _createClass(XCheckboxElement, [{
      key: "value",


      // @info
      //   Values associated with this checkbox.
      // @type
      //   string
      // @default
      //   null
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "toggled",
      get: function get() {
        return this.hasAttribute("toggled");
      },
      set: function set(toggled) {
        toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["toggled", "disabled"];
      }
    }]);

    function XCheckboxElement() {
      _classCallCheck(this, XCheckboxElement);

      var _this28 = _possibleConstructorReturn(this, (XCheckboxElement.__proto__ || Object.getPrototypeOf(XCheckboxElement)).call(this));

      _this28._shadowRoot = _this28.attachShadow({ mode: "closed" });
      _this28._shadowRoot.append(document.importNode(shadowTemplate$6.content, true));

      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = _this28._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var element = _step13.value;

          _this28["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }

      _this28.addEventListener("pointerdown", function (event) {
        return _this28._onPointerDown(event);
      });
      _this28.addEventListener("click", function (event) {
        return _this28._onClick(event);
      });
      _this28.addEventListener("keydown", function (event) {
        return _this28._onKeyDown(event);
      });
      return _this28;
    }

    _createClass(XCheckboxElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "toggled") {
          this._onToggledAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "checkbox");
        this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$1] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$1] > 0 ? this[$oldTabIndex$1] : 0;
          }

          delete this[$oldTabIndex$1];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onToggledAttributeChange",
      value: function _onToggledAttributeChange() {
        this.setAttribute("aria-toggled", this.mixed ? "mixed" : this.toggled);
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        if (event.buttons !== 1) {
          event.preventDefault();
          return;
        }

        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
        if (this.matches(":focus") === false) {
          event.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }

        // Ripple
        {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "unbounded") {
            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            this["#ripples"].append(ripple);

            var transformAnimation = ripple.animate({ transform: ["scale(0)", "scale(2.6)"] }, { duration: 200, easing: easing$2 });

            this.setPointerCapture(event.pointerId);

            this.addEventListener("lostpointercapture", async function () {
              await transformAnimation.finished;

              var opacityAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 200, easing: easing$2 });

              await opacityAnimation.finished;

              ripple.remove();
            }, { once: true });
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        // Update state
        {
          if (this.mixed) {
            this.mixed = false;
          } else {
            this.toggled = !this.toggled;
          }

          this.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));
        }

        // Ripple
        if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "unbounded") {
            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple");
            this["#ripples"].append(ripple);

            await ripple.animate({ transform: ["scale(0)", "scale(2.6)"] }, { duration: 300, easing: easing$2 }).finished;

            await ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 300, easing: easing$2 }).finished;

            ripple.remove();
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();
          this.click();
        }
      }
    }]);

    return XCheckboxElement;
  }(HTMLElement);

  customElements.define("x-checkbox", XCheckboxElement);

  var $oldTabIndex$2 = Symbol();

  var shadowHTML$1 = "\n  <style>\n    :host {\n      display: block;\n      height: 24px;\n      width: 40px;\n      box-sizing: border-box;\n      background: url(node_modules/xel/images/checkboard.png) repeat 0 0;\n      border: 1px solid rgb(150, 150, 150);\n      position: relative;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n    :host([disabled]) {\n      pointer-events: none;\n      opacity: 0.4;\n    }\n\n    ::slotted(x-popover) {\n      width: 190px;\n      height: auto;\n      padding: 12px 12px;\n    }\n\n    #input {\n      display: flex;\n      width: 100%;\n      height: 100%;\n      box-sizing: border-box;\n      border: none;\n      background: none;\n      padding: 0;\n      opacity: 0;\n      -webkit-appearance: none;\n    }\n    #input::-webkit-color-swatch-wrapper {\n      padding: 0;\n    }\n    #input::-webkit-color-swatch {\n      border: none;\n    }\n  </style>\n\n  <input tabindex=\"-1\" id=\"input\" type=\"color\" value=\"#ffffff\">\n  <slot></slot>\n";

  // @events
  //   change
  //   changestart
  //   changeend

  var XColorSelectElement = function (_HTMLElement9) {
    _inherits(XColorSelectElement, _HTMLElement9);

    _createClass(XColorSelectElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   #000000
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "#ffffff";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "disabled"];
      }
    }]);

    function XColorSelectElement() {
      _classCallCheck(this, XColorSelectElement);

      var _this29 = _possibleConstructorReturn(this, (XColorSelectElement.__proto__ || Object.getPrototypeOf(XColorSelectElement)).call(this));

      _this29._inputChangeStarted = false;
      _this29._onInputChangeDebouonced = debounce(_this29._onInputChangeDebouonced, 400, _this29);

      _this29._shadowRoot = _this29.attachShadow({ mode: "closed" });
      _this29._shadowRoot.innerHTML = shadowHTML$1;

      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = _this29._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var element = _step14.value;

          _this29["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14.return) {
            _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }

      _this29.addEventListener("click", function (event) {
        return _this29._onClick(event);
      });
      _this29.addEventListener("keydown", function (event) {
        return _this29._onKeyDown(event);
      });
      _this29.addEventListener("pointerdown", function (event) {
        return _this29._onPointerDown(event);
      });
      _this29.addEventListener("change", function (event) {
        return _this29._onChange(event);
      });
      _this29["#input"].addEventListener("change", function (event) {
        return _this29._onInputChange(event);
      });
      return _this29;
    }

    _createClass(XColorSelectElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var picker = this.querySelector("x-wheelcolorpicker, x-rectcolorpicker, x-barscolorpicker");

        if (picker) {
          picker.setAttribute("value", formatColorString(this.value, "rgba"));
        }

        this._updateAccessabilityAttributes();
        this._updateInput();
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_expand",
      value: async function _expand() {
        if (this.hasAttribute("expanded") === false) {
          var popover = this.querySelector("x-popover");

          if (popover) {
            this._wasFocusedBeforeExpanding = this.matches(":focus");
            this.setAttribute("expanded", "");
            await popover.open(this);
            popover.focus();
          }
        }
      }
    }, {
      key: "_collapse",
      value: async function _collapse() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (this.hasAttribute("expanded")) {
          var popover = this.querySelector("x-popover");

          if (popover) {
            popover.setAttribute("closing", "");

            await popover.close();
            this.removeAttribute("expanded");

            if (this._wasFocusedBeforeExpanding) {
              this.focus();
            } else {
              var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

              if (ancestorFocusableElement) {
                ancestorFocusableElement.focus();
              }
            }

            popover.removeAttribute("closing");
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateInput",
      value: function _updateInput() {
        var _parseColor3 = parseColor(this.value, "rgba"),
            _parseColor4 = _slicedToArray(_parseColor3, 4),
            r = _parseColor4[0],
            g = _parseColor4[1],
            b = _parseColor4[2],
            a = _parseColor4[3];

        this["#input"].value = serializeColor([r, g, b, a], "rgba", "hex");
        this["#input"].style.opacity = a;
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$2] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$2] > 0 ? this[$oldTabIndex$2] : 0;
          }

          delete this[$oldTabIndex$2];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        if (!this._inputChangeStarted) {
          this._updateInput();
        }

        var picker = [].concat(_toConsumableArray(this.querySelectorAll("*"))).find(function (element) {
          return element.localName.endsWith("colorpicker");
        });

        if (picker && picker.getAttribute("value") !== this.getAttribute("value")) {
          picker.setAttribute("value", this.getAttribute("value"));
        }
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onChange",
      value: function _onChange(event) {
        if (event.target !== this) {
          this.value = formatColorString(event.target.value, "rgba");
          this._updateInput();
        }
      }
    }, {
      key: "_onInputChange",
      value: function _onInputChange() {
        if (this._inputChangeStarted === false) {
          this._inputChangeStarted = true;
          this.dispatchEvent(new CustomEvent("changestart"));
        }

        this.dispatchEvent(new CustomEvent("change"));
        this._onInputChangeDebouonced();
      }
    }, {
      key: "_onInputChangeDebouonced",
      value: function _onInputChangeDebouonced() {
        if (this._inputChangeStarted) {
          this.value = this["#input"].value;
          this._inputChangeStarted = false;
          this.dispatchEvent(new CustomEvent("changeend"));
        }
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        if (event.target === this) {
          event.preventDefault();
        }
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        var popover = this.querySelector(":scope > x-popover");

        if (popover) {
          if (popover.opened) {
            if (popover.modal === false && event.target === this) {
              event.preventDefault();
              this._collapse();
            } else if (popover.modal === true && event.target.localName === "x-backdrop") {
              event.preventDefault();
              this._collapse();
            }
          } else {
            event.preventDefault();
            this._expand();
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          var popover = this.querySelector("x-popover");

          event.preventDefault();
          event.stopPropagation();

          if (popover) {
            if (this.hasAttribute("expanded")) {
              this._collapse();
            } else {
              this._expand();
            }
          } else {
            this["#input"].click();
          }
        } else if (event.code === "Escape") {
          var _popover = this.querySelector("x-popover");

          if (_popover) {
            if (this.hasAttribute("expanded")) {
              this._collapse();
            }
          }
        } else if (event.code === "Tab") {
          if (this.hasAttribute("expanded")) {
            event.preventDefault();
          }
        }
      }
    }]);

    return XColorSelectElement;
  }(HTMLElement);

  customElements.define("x-colorselect", XColorSelectElement);

  var shadowTemplate$7 = html(_templateObject9);

  var XContextMenuElement = function (_HTMLElement10) {
    _inherits(XContextMenuElement, _HTMLElement10);

    _createClass(XContextMenuElement, [{
      key: "disabled",

      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XContextMenuElement() {
      _classCallCheck(this, XContextMenuElement);

      var _this30 = _possibleConstructorReturn(this, (XContextMenuElement.__proto__ || Object.getPrototypeOf(XContextMenuElement)).call(this));

      _this30._parentElement = null;

      _this30._shadowRoot = _this30.attachShadow({ mode: "closed" });
      _this30._shadowRoot.append(document.importNode(shadowTemplate$7.content, true));

      _this30["#backdrop"] = createElement("x-backdrop");
      _this30["#backdrop"].style.background = "rgba(0, 0, 0, 0)";
      _this30["#backdrop"].addEventListener("contextmenu", function (event) {
        return _this30._onBackdropContextMenu(event);
      });
      _this30["#backdrop"].addEventListener("pointerdown", function (event) {
        return _this30._onBackdropPointerDown(event);
      });

      window.addEventListener("blur", function (event) {
        return _this30._onBlur(event);
      });
      _this30.addEventListener("blur", function (event) {
        return _this30._onBlur(event);
      });
      _this30.addEventListener("keydown", function (event) {
        return _this30._onKeyDown(event);
      }, true);
      _this30.addEventListener("click", function (event) {
        return _this30._onClick(event);
      });
      return _this30;
    }

    _createClass(XContextMenuElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this31 = this;

        this._parentElement = this.parentElement || this.parentNode.host;

        this._parentElement.addEventListener("contextmenu", this._parentContextMenuListener = function (event) {
          _this31._onParentContextMenu(event);
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._parentElement.removeEventListener("contextmenu", this._parentContextMenuListener);
        this._parentElement = null;
      }

      ///////////////////////////////////'/////////////////////////////////////////////////////////////////////////////

    }, {
      key: "open",
      value: function open(clientX, clientY) {
        var menu = this.querySelector("x-menu");

        if (menu.opened === false) {
          menu.openAtPoint(clientX, clientY);

          this["#backdrop"].ownerElement = menu;
          this["#backdrop"].show(false);

          menu.focus();
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _this32 = this;

        return new Promise(async function (resolve) {
          var menu = _this32.querySelector("x-menu");
          await menu.close();
          _this32["#backdrop"].hide(false);

          var ancestorFocusableElement = closest(_this32.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }

          resolve();
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onBlur",
      value: function _onBlur() {}
    }, {
      key: "_onParentContextMenu",
      value: function _onParentContextMenu(event) {
        if (this.disabled === false) {
          event.preventDefault();
          this.open(event.clientX, event.clientY);
        }
      }
    }, {
      key: "_onBackdropContextMenu",
      value: function _onBackdropContextMenu(event) {
        var _this33 = this;

        event.preventDefault();
        event.stopImmediatePropagation();

        this.close().then(function () {
          var target = _this33.parentElement.getRootNode().elementFromPoint(event.clientX, event.clientY);

          if (target && _this33.parentElement.contains(target)) {
            _this33.open(event.clientX, event.clientY);
          }
        });
      }
    }, {
      key: "_onBackdropPointerDown",
      value: function _onBackdropPointerDown(event) {
        if (event.buttons === 1) {
          event.preventDefault();
          this.close();
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        var item = event.target.closest("x-menuitem");

        if (item && item.disabled === false) {
          var submenu = item.querySelector("x-menu");

          if (submenu) {
            if (submenu.opened) {
              submenu.close();
            } else {
              submenu.openNextToElement(item, "horizontal");
            }
          } else {
            this.setAttribute("closing", "");

            await item.whenTriggerEnd;
            await this.close();

            this.removeAttribute("closing");
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.key === "Escape") {
          var menu = this.querySelector("x-menu");

          if (menu.opened) {
            event.preventDefault();
            this.close();
          }
        } else if (event.key === "Tab") {
          event.preventDefault();
          event.stopPropagation();

          var _menu = this.querySelector("x-menu");
          _menu.focusNextMenuItem();
        }
      }
    }]);

    return XContextMenuElement;
  }(HTMLElement);

  customElements.define("x-contextmenu", XContextMenuElement);

  var $oldTabIndex$3 = Symbol();

  var shadowTemplate$8 = html(_templateObject10);

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend

  var XDateSelectElement = function (_HTMLElement11) {
    _inherits(XDateSelectElement, _HTMLElement11);

    _createClass(XDateSelectElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   ""
      // @attribute
      //   partial
      get: function get() {
        return this["#input"].value;
      },
      set: function set(value) {
        if (this["#input"].value !== value) {
          this["#input"].value = value;

          if (this.validation === "instant") {
            this.validate();
          } else if (this.validation === "auto" || this.validation === "manual") {
            if (this.error !== null) {
              this.validate();
            }
          }

          this._updateEmptyState();
        }
      }

      // @type
      //   string
      // @default
      //   null
      // @attribute

    }, {
      key: "min",
      get: function get() {
        return this.hasAttribute("min") ? this.getAttribute("min") : null;
      },
      set: function set(date) {
        this.setAttribute("min", date);
      }

      // @type
      //   string
      // @default
      //   null
      // @attribute

    }, {
      key: "max",
      get: function get() {
        return this.hasAttribute("max") ? this.getAttribute("max") : null;
      },
      set: function set(date) {
        this.setAttribute("max", date);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "required",
      get: function get() {
        return this.hasAttribute("required");
      },
      set: function set(required) {
        required ? this.setAttribute("required", "") : this.removeAttribute("required");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   "auto"    - validate() is called when input loses focus and when user presses "Enter"
      //   "instant" - validate() is called on each key press
      //   "manual"  - you will call validate() manually when user submits the form
      // @type
      //   "auto" || "instant" || "manual"
      // @default
      //   "auto"

    }, {
      key: "validation",
      get: function get() {
        return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
      },
      set: function set(validation) {
        this.setAttribute("validation", validation);
      }

      // @type
      //   string?
      // @default
      //   null
      // @attribute

    }, {
      key: "error",
      get: function get() {
        return this.getAttribute("error");
      },
      set: function set(error) {
        error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "min", "max", "disabled", "validation"];
      }
    }]);

    function XDateSelectElement() {
      _classCallCheck(this, XDateSelectElement);

      var _this34 = _possibleConstructorReturn(this, (XDateSelectElement.__proto__ || Object.getPrototypeOf(XDateSelectElement)).call(this));

      _this34._shadowRoot = _this34.attachShadow({ mode: "closed", delegatesFocus: true });
      _this34._shadowRoot.append(document.importNode(shadowTemplate$8.content, true));

      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = _this34._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var element = _step15.value;

          _this34["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15.return) {
            _iterator15.return();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      _this34.addEventListener("focusin", function (event) {
        return _this34._onFocusIn(event);
      });
      _this34.addEventListener("focusout", function (event) {
        return _this34._onFocusOut(event);
      });
      _this34.addEventListener("keydown", function (event) {
        return _this34._onKeyDown(event);
      });

      _this34["#input"].addEventListener("change", function (event) {
        return _this34._onInputChange(event);
      });
      _this34["#input"].addEventListener("input", function (event) {
        return _this34._onInputInput(event);
      });
      return _this34;
    }

    _createClass(XDateSelectElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();
        this._updateEmptyState();

        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "min") {
          this._onMinAttributeChange();
        } else if (name === "max") {
          this._onMaxAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        } else if (name === "validation") {
          this._onValidationAttributeChnage();
        }
      }

      // @info
      //   Override this method to validate the input value manually.
      // @type
      //   () => void

    }, {
      key: "validate",
      value: function validate() {
        if (this.value && this.min && this.value < this.min) {
          this.error = "Entered date is before the minimum date";
        } else if (this.value && this.max && this.value > this.max) {
          this.error = "Entered date is after the maximum date";
        } else if (this.required && this.value.length === 0) {
          this.error = "This field is required";
        } else {
          this.error = null;
        }
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this["#input"].select();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.value = "";
        this.error = null;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateEmptyState",
      value: function _updateEmptyState() {
        if (this.value.length === 0) {
          this.setAttribute("empty", "");
        } else {
          this.removeAttribute("empty");
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "input");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$3] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$3] > 0 ? this[$oldTabIndex$3] : 0;
          }

          delete this[$oldTabIndex$3];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

        if (this.matches(":focus")) {
          this.selectAll();
        }
      }
    }, {
      key: "_onMinAttributeChange",
      value: function _onMinAttributeChange() {
        this["#input"].min = this.min;
      }
    }, {
      key: "_onMaxAttributeChange",
      value: function _onMaxAttributeChange() {
        this["#input"].max = this.max;
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this["#input"].disabled = this.disabled;
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onValidationAttributeChnage",
      value: function _onValidationAttributeChnage() {
        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "_onFocusIn",
      value: function _onFocusIn() {
        this.dispatchEvent(new CustomEvent("textinputmodestart", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut() {
        this.dispatchEvent(new CustomEvent("textinputmodeend", { bubbles: true, composed: true }));

        if (this.validation === "auto") {
          this.validate();
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.key === "Enter") {
          document.execCommand("selectAll");

          if (this.validation === "instant") {
            this.validate();
          } else if (this.validation === "auto" || this.validation === "manual") {
            if (this.error !== null) {
              this.validate();
            }
          }
        }
      }
    }, {
      key: "_onInputInput",
      value: function _onInputInput(event) {
        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }

        event.stopPropagation();
        this._updateEmptyState();
        this.dispatchEvent(new CustomEvent("input", { bubbles: true }));
      }
    }, {
      key: "_onInputChange",
      value: function _onInputChange() {
        this.validate();
        this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
      }
    }]);

    return XDateSelectElement;
  }(HTMLElement);

  customElements.define("x-dateselect", XDateSelectElement);

  var max$4 = Math.max;


  var easing$3 = "cubic-bezier(0.4, 0, 0.2, 1)";

  var shadowTemplate$9 = html(_templateObject11);

  // @events
  //   close

  var XDocTabElement = function (_HTMLElement12) {
    _inherits(XDocTabElement, _HTMLElement12);

    _createClass(XDocTabElement, [{
      key: "ownerTabs",


      // @type
      //   XDocTabsElement
      // @readOnly
      get: function get() {
        return this.closest("x-doctabs");
      }

      // @info
      //   Value associated with this tab.
      // @type
      //   string
      // @default
      //   ""

    }, {
      key: "value",
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      // @property
      //   reflected
      // @type
      //   boolean
      // @default
      //   false

    }, {
      key: "selected",
      get: function get() {
        return this.hasAttribute("selected");
      },
      set: function set(selected) {
        selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
      }

      // @property
      //   reflected
      // @type
      //   boolean
      // @default
      //   false

    }, {
      key: "edited",
      get: function get() {
        return this.hasAttribute("edited");
      },
      set: function set(edited) {
        edited ? this.setAttribute("edited", "") : this.removeAttribute("edited");
      }

      // @property
      //   reflected
      // @type
      //   boolean
      // @default
      //   false

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled === true ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["selected", "disabled"];
      }
    }]);

    function XDocTabElement() {
      _classCallCheck(this, XDocTabElement);

      var _this35 = _possibleConstructorReturn(this, (XDocTabElement.__proto__ || Object.getPrototypeOf(XDocTabElement)).call(this));

      _this35._shadowRoot = _this35.attachShadow({ mode: "closed" });
      _this35._shadowRoot.append(document.importNode(shadowTemplate$9.content, true));

      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = _this35._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var element = _step16.value;

          _this35["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      _this35["#close-button"].addEventListener("pointerdown", function (event) {
        return _this35._onCloseButtonPointerDown(event);
      });
      _this35["#close-button"].addEventListener("click", function (event) {
        return _this35._onCloseButtonClick(event);
      });
      _this35.addEventListener("pointerdown", function (event) {
        return _this35._onPointerDown(event);
      });
      _this35.addEventListener("click", function (event) {
        return _this35._onClick(event);
      });
      return _this35;
    }

    _createClass(XDocTabElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
        this.setAttribute("role", "tab");
        this.setAttribute("aria-selected", this.selected);
        this.setAttribute("aria-disabled", this.disabled);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "selected") {
          this._onSelectedAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onSelectedAttributeChange",
      value: function _onSelectedAttributeChange() {
        this.setAttribute("aria-selected", this.selected);
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this.setAttribute("aria-disabled", this.disabled);
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(pointerDownEvent) {
        var _this36 = this;

        if (pointerDownEvent.buttons !== 1) {
          pointerDownEvent.preventDefault();
          return;
        }

        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
        if (this.matches(":focus") === false) {
          pointerDownEvent.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }

        // Provide "pressed" attribute for theming purposes
        {
          var pointerDownTimeStamp = Date.now();

          this.setAttribute("pressed", "");
          this.setPointerCapture(pointerDownEvent.pointerId);

          this.addEventListener("lostpointercapture", async function (event) {
            if (_this36.selected === true) {
              var pressedTime = Date.now() - pointerDownTimeStamp;
              var minPressedTime = 100;

              if (pressedTime < minPressedTime) {
                await sleep(minPressedTime - pressedTime);
              }
            }

            _this36.removeAttribute("pressed");
          }, { once: true });
        }

        // Ripple
        {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "bounded") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max$4(rect.width, rect.height) * 1.5;
            var top = pointerDownEvent.clientY - rect.y - size / 2;
            var left = pointerDownEvent.clientX - rect.x - size / 2;

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
            this["#ripples"].append(ripple);

            var inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"] }, { duration: 300, easing: easing$3 });

            // Pointer capture is set on the owner tabs rather than this tab intentionally. Owner tabs might be
            // already capturing the pointer and hijacking it would disrupt the currently performed tab move
            // operation.
            this.ownerTabs.setPointerCapture(pointerDownEvent.pointerId);

            this.ownerTabs.addEventListener("lostpointercapture", async function () {
              await inAnimation.finished;

              var fromOpacity = getComputedStyle(ripple).opacity;
              var outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$3 });
              await outAnimation.finished;

              ripple.remove();
            }, { once: true });
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        if (event.button !== 0) {
          return;
        }

        // Ripple
        if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "bounded") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max$4(rect.width, rect.height) * 1.5;
            var top = rect.y + rect.height / 2 - rect.y - size / 2;
            var left = rect.x + rect.width / 2 - rect.x - size / 2;

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple click-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
            this["#ripples"].append(ripple);

            var inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"] }, { duration: 300, easing: easing$3 });
            await inAnimation.finished;

            var fromOpacity = getComputedStyle(ripple).opacity;
            var outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$3 });
            await outAnimation.finished;

            ripple.remove();
          }
        }
      }
    }, {
      key: "_onCloseButtonPointerDown",
      value: function _onCloseButtonPointerDown(event) {
        if (event.buttons !== 1) {
          return;
        }

        event.stopPropagation();
      }
    }, {
      key: "_onCloseButtonClick",
      value: function _onCloseButtonClick(event) {
        if (event.button !== 0) {
          return;
        }

        event.stopPropagation();

        var customEvent = new CustomEvent("close", { bubbles: true, cancelable: true, detail: this });
        this.dispatchEvent(customEvent);

        if (customEvent.defaultPrevented === false) {
          this.ownerTabs.closeTab(this);
        }
      }
    }]);

    return XDocTabElement;
  }(HTMLElement);

  customElements.define("x-doctab", XDocTabElement);

  var abs = Math.abs;
  var parseInt$2 = Number.parseInt;


  var shadowTemplate$a = html(_templateObject12);

  // @events
  //   open
  //   close
  //   select
  //   rearrange

  var XDocTabsElement = function (_HTMLElement13) {
    _inherits(XDocTabsElement, _HTMLElement13);

    _createClass(XDocTabsElement, [{
      key: "disabled",

      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled === true ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   Maximal number of tambs that can be opened
      // @type
      //   number
      // @default
      //   20
      // @attribute

    }, {
      key: "maxTabs",
      get: function get() {
        return this.hasAttribute("maxtabs") ? parseInt$2(this.getAttribute("maxtabs")) : 20;
      },
      set: function set(maxTabs) {
        this.setAttribute("maxtabs", maxTabs);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XDocTabsElement() {
      _classCallCheck(this, XDocTabsElement);

      var _this37 = _possibleConstructorReturn(this, (XDocTabsElement.__proto__ || Object.getPrototypeOf(XDocTabsElement)).call(this));

      _this37._waitingForTabToClose = false;
      _this37._waitingForPointerMoveAfterClosingTab = false;

      _this37._shadowRoot = _this37.attachShadow({ mode: "closed", delegatesFocus: true });
      _this37._shadowRoot.append(document.importNode(shadowTemplate$a.content, true));

      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = _this37._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var element = _step17.value;

          _this37["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      _this37.addEventListener("pointerdown", function (event) {
        return _this37._onPointerDown(event);
      });
      _this37["#open-button"].addEventListener("click", function (event) {
        return _this37._onOpenButtonClick(event);
      });
      _this37.addEventListener("keydown", function (event) {
        return _this37._onKeyDown(event);
      });
      return _this37;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _createClass(XDocTabsElement, [{
      key: "openTab",
      value: function openTab(tab) {
        var _this38 = this;

        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        return new Promise(async function (resolve, reject) {
          var tabs = _this38.querySelectorAll("x-doctab");

          if (tabs.length >= _this38.maxTabs) {
            reject("Can't open more than " + _this38.maxTabs + " tabs.");
          } else {
            var maxOrder = 0;

            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
              for (var _iterator18 = _this38.children[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var _tab = _step18.value;

                var order = parseInt$2(_tab.style.order);

                if (!Number.isNaN(order) && order > maxOrder) {
                  maxOrder = order;
                }
              }
            } catch (err) {
              _didIteratorError18 = true;
              _iteratorError18 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                  _iterator18.return();
                }
              } finally {
                if (_didIteratorError18) {
                  throw _iteratorError18;
                }
              }
            }

            tab.style.order = maxOrder;

            if (animate === false) {
              tab.style.transition = "none";
              tab.style.maxWidth = null;
              tab.style.padding = null;

              _this38.append(tab);
              tab.focus();
              resolve(tab);
            } else if (animate === true) {
              tab.style.transition = null;
              tab.style.maxWidth = "0px";
              tab.style.padding = "0px";

              tab.setAttribute("opening", "");
              _this38.append(tab);
              await sleep(30);

              tab.addEventListener("transitionend", function () {
                tab.removeAttribute("opening");
                resolve(tab);
              }, { once: true });

              tab.style.maxWidth = null;
              tab.style.padding = null;
              tab.focus();
            }
          }
        });
      }
    }, {
      key: "closeTab",
      value: function closeTab(tab) {
        var _this39 = this;

        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        return new Promise(async function (resolve) {
          var tabs = _this39.getTabsByScreenIndex().filter(function (tab) {
            return tab.hasAttribute("closing") === false;
          });
          var tabWidth = tab.getBoundingClientRect().width;
          var tabScreenIndex = _this39._getTabScreenIndex(tab);

          tab.setAttribute("closing", "");

          if (tabScreenIndex < tabs.length - 1) {
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
              for (var _iterator19 = _this39.children[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var _tab2 = _step19.value;

                if (_tab2.hasAttribute("closing") === false) {
                  _tab2.style.transition = "none";
                  _tab2.style.maxWidth = tabWidth + "px";
                }
              }
            } catch (err) {
              _didIteratorError19 = true;
              _iteratorError19 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                  _iterator19.return();
                }
              } finally {
                if (_didIteratorError19) {
                  throw _iteratorError19;
                }
              }
            }
          }

          if (animate) {
            tab.style.transition = null;
          } else {
            tab.style.transition = "none";
          }

          tab.style.maxWidth = "0px";
          tab.style.pointerEvents = "none";

          _this39._waitingForTabToClose = true;

          if (tab.selected) {
            var previousTab = tabs[tabs.indexOf(tab) - 1];
            var nextTab = tabs[tabs.indexOf(tab) + 1];

            tab.selected = false;

            if (nextTab) {
              nextTab.selected = true;
            } else if (previousTab) {
              previousTab.selected = true;
            }
          }

          if (tab.matches(":focus")) {
            var selectedTab = _this39.querySelector("x-doctab[selected]");

            if (selectedTab) {
              selectedTab.focus();
            } else {
              _this39.focus();
            }
          }

          tab.style.maxWidth = "0px";
          tab.style.padding = "0px";

          if (animate) {
            await sleep(150);
          }

          tab.remove();
          _this39._waitingForTabToClose = false;
          tab.removeAttribute("closing");

          resolve();

          if (!_this39._waitingForPointerMoveAfterClosingTab) {
            _this39._waitingForPointerMoveAfterClosingTab = true;
            await _this39._whenPointerMoved(3);
            _this39._waitingForPointerMoveAfterClosingTab = false;

            var _iteratorNormalCompletion20 = true;
            var _didIteratorError20 = false;
            var _iteratorError20 = undefined;

            try {
              for (var _iterator20 = _this39.children[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                var _tab3 = _step20.value;

                _tab3.style.transition = null;
                _tab3.style.maxWidth = null;
                _tab3.style.order = _this39._getTabScreenIndex(_tab3);
              }
            } catch (err) {
              _didIteratorError20 = true;
              _iteratorError20 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion20 && _iterator20.return) {
                  _iterator20.return();
                }
              } finally {
                if (_didIteratorError20) {
                  throw _iteratorError20;
                }
              }
            }
          }
        });
      }
    }, {
      key: "selectPreviousTab",
      value: function selectPreviousTab() {
        var tabs = this.getTabsByScreenIndex();
        var currentTab = this.querySelector("x-doctab[selected]") || this.querySelector("x-doctab");
        var previousTab = this._getPreviousTabOnScreen(currentTab);

        if (currentTab && previousTab) {
          this.selectTab(previousTab);

          return previousTab;
        }

        return null;
      }
    }, {
      key: "selectNextTab",
      value: function selectNextTab() {
        var tabs = this.getTabsByScreenIndex();
        var currentTab = this.querySelector("x-doctab[selected]") || this.querySelector("x-doctab:last-of-type");
        var nextTab = this._getNextTabOnScreen(currentTab);

        if (currentTab && nextTab) {
          this.selectTab(nextTab);

          return nextTab;
        }

        return null;
      }
    }, {
      key: "selectTab",
      value: function selectTab(nextTab) {
        var currentTab = this.querySelector("x-doctab[selected]") || this.querySelector("x-doctab:last-of-type");

        if (currentTab) {
          currentTab.tabIndex = -1;
          currentTab.selected = false;
        }

        nextTab.tabIndex = 0;
        nextTab.selected = true;
      }
    }, {
      key: "moveSelectedTabLeft",
      value: function moveSelectedTabLeft() {
        var selectedTab = this.querySelector("x-doctab[selected]");
        var selectedTabScreenIndex = this._getTabScreenIndex(selectedTab);

        var _iteratorNormalCompletion21 = true;
        var _didIteratorError21 = false;
        var _iteratorError21 = undefined;

        try {
          for (var _iterator21 = this.children[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
            var _tab4 = _step21.value;

            _tab4.style.order = this._getTabScreenIndex(_tab4);
          }
        } catch (err) {
          _didIteratorError21 = true;
          _iteratorError21 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion21 && _iterator21.return) {
              _iterator21.return();
            }
          } finally {
            if (_didIteratorError21) {
              throw _iteratorError21;
            }
          }
        }

        if (parseInt$2(selectedTab.style.order) === 0) {
          var _iteratorNormalCompletion22 = true;
          var _didIteratorError22 = false;
          var _iteratorError22 = undefined;

          try {
            for (var _iterator22 = this.children[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
              var tab = _step22.value;

              if (tab === selectedTab) {
                tab.style.order = this.childElementCount - 1;
              } else {
                tab.style.order = parseInt$2(tab.style.order) - 1;
              }
            }
          } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion22 && _iterator22.return) {
                _iterator22.return();
              }
            } finally {
              if (_didIteratorError22) {
                throw _iteratorError22;
              }
            }
          }
        } else {
          var otherTab = this._getTabWithScreenIndex(selectedTabScreenIndex - 1);
          otherTab.style.order = parseInt$2(otherTab.style.order) + 1;
          selectedTab.style.order = parseInt$2(selectedTab.style.order) - 1;
        }
      }
    }, {
      key: "moveSelectedTabRight",
      value: function moveSelectedTabRight() {
        var selectedTab = this.querySelector("x-doctab[selected]");
        var selectedTabScreenIndex = this._getTabScreenIndex(selectedTab);

        var _iteratorNormalCompletion23 = true;
        var _didIteratorError23 = false;
        var _iteratorError23 = undefined;

        try {
          for (var _iterator23 = this.children[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
            var _tab5 = _step23.value;

            _tab5.style.order = this._getTabScreenIndex(_tab5);
          }
        } catch (err) {
          _didIteratorError23 = true;
          _iteratorError23 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion23 && _iterator23.return) {
              _iterator23.return();
            }
          } finally {
            if (_didIteratorError23) {
              throw _iteratorError23;
            }
          }
        }

        if (parseInt$2(selectedTab.style.order) === this.childElementCount - 1) {
          var _iteratorNormalCompletion24 = true;
          var _didIteratorError24 = false;
          var _iteratorError24 = undefined;

          try {
            for (var _iterator24 = this.children[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
              var tab = _step24.value;

              if (tab === selectedTab) {
                tab.style.order = 0;
              } else {
                tab.style.order = parseInt$2(tab.style.order) + 1;
              }
            }
          } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion24 && _iterator24.return) {
                _iterator24.return();
              }
            } finally {
              if (_didIteratorError24) {
                throw _iteratorError24;
              }
            }
          }
        } else {
          var otherTab = this._getTabWithScreenIndex(selectedTabScreenIndex + 1);
          otherTab.style.order = parseInt$2(otherTab.style.order) - 1;
          selectedTab.style.order = parseInt$2(selectedTab.style.order) + 1;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Returns a promise that is resolved when the pointer is moved by at least the given distance.
      // @type
      //   (number) => Promise

    }, {
      key: "_whenPointerMoved",
      value: function _whenPointerMoved() {
        var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

        return new Promise(function (resolve) {
          var pointerMoveListener = void 0,
              pointerOutListener = void 0,
              blurListener = void 0;
          var fromPoint = null;

          var removeListeners = function removeListeners() {
            window.removeEventListener("pointermove", pointerMoveListener);
            window.removeEventListener("pointerout", pointerOutListener);
            window.removeEventListener("blur", blurListener);
          };

          window.addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(event) {
            if (fromPoint === null) {
              fromPoint = { x: event.clientX, y: event.clientY };
            } else {
              var toPoint = { x: event.clientX, y: event.clientY };

              if (getDistanceBetweenPoints(fromPoint, toPoint) >= distance) {
                removeListeners();
                resolve();
              }
            }
          });

          window.addEventListener("pointerout", pointerOutListener = function pointerOutListener(event) {
            if (event.toElement === null) {
              removeListeners();
              resolve();
            }
          });

          window.addEventListener("blur", blurListener = function blurListener() {
            removeListeners();
            resolve();
          });
        });
      }
    }, {
      key: "_animateSelectionIndicator",
      value: function _animateSelectionIndicator(fromTab, toTab) {
        var _this40 = this;

        var mainBBox = this.getBoundingClientRect();
        var startBBox = fromTab ? fromTab.getBoundingClientRect() : null;
        var endBBox = toTab.getBoundingClientRect();
        var computedStyle = getComputedStyle(toTab);

        if (startBBox === null) {
          startBBox = DOMRect.fromRect(endBBox);
          startBBox.x += startBBox.width / 2;
          startBBox.width = 0;
        }

        this["#selection-indicator"].style.height = computedStyle.getPropertyValue("--selection-indicator-height");
        this["#selection-indicator"].style.background = computedStyle.getPropertyValue("--selection-indicator-color");
        this["#selection-indicator"].hidden = false;

        this.setAttribute("animatingindicator", "");

        var animation = this["#selection-indicator"].animate([{
          bottom: startBBox.bottom - mainBBox.bottom + "px",
          left: startBBox.left - mainBBox.left + "px",
          width: startBBox.width + "px"
        }, {
          bottom: endBBox.bottom - mainBBox.bottom + "px",
          left: endBBox.left - mainBBox.left + "px",
          width: endBBox.width + "px"
        }], {
          duration: 200,
          iterations: 1,
          delay: 0,
          easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
        });

        animation.finished.then(function () {
          _this40["#selection-indicator"].hidden = true;
          _this40.removeAttribute("animatingindicator");
        });

        return animation;
      }
    }, {
      key: "getTabsByScreenIndex",
      value: function getTabsByScreenIndex() {
        var $screenIndex = Symbol();

        var _iteratorNormalCompletion25 = true;
        var _didIteratorError25 = false;
        var _iteratorError25 = undefined;

        try {
          for (var _iterator25 = this.children[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            var tab = _step25.value;

            tab[$screenIndex] = this._getTabScreenIndex(tab);
          }
        } catch (err) {
          _didIteratorError25 = true;
          _iteratorError25 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion25 && _iterator25.return) {
              _iterator25.return();
            }
          } finally {
            if (_didIteratorError25) {
              throw _iteratorError25;
            }
          }
        }

        return [].concat(_toConsumableArray(this.children)).sort(function (tab1, tab2) {
          return tab1[$screenIndex] > tab2[$screenIndex];
        });
      }
    }, {
      key: "_getTabScreenIndex",
      value: function _getTabScreenIndex(tab) {
        var tabBounds = tab.getBoundingClientRect();
        var tabsBounds = this.getBoundingClientRect();

        if (tabBounds.left - tabsBounds.left < tabBounds.width / 2) {
          return 0;
        } else {
          var offset = tabBounds.width / 2;

          for (var i = 1; i < this.maxTabs; i += 1) {
            if (tabBounds.left - tabsBounds.left >= offset && tabBounds.left - tabsBounds.left < offset + tabBounds.width) {
              if (i > this.childElementCount - 1) {
                return this.childElementCount - 1;
              } else {
                return i;
              }
            } else {
              offset += tabBounds.width;
            }
          }
        }
      }
    }, {
      key: "_getTabWithScreenIndex",
      value: function _getTabWithScreenIndex(screenIndex) {
        var _iteratorNormalCompletion26 = true;
        var _didIteratorError26 = false;
        var _iteratorError26 = undefined;

        try {
          for (var _iterator26 = this.children[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
            var tab = _step26.value;

            if (this._getTabScreenIndex(tab) === screenIndex) {
              return tab;
            }
          }
        } catch (err) {
          _didIteratorError26 = true;
          _iteratorError26 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion26 && _iterator26.return) {
              _iterator26.return();
            }
          } finally {
            if (_didIteratorError26) {
              throw _iteratorError26;
            }
          }
        }

        return null;
      }
    }, {
      key: "_getPreviousTabOnScreen",
      value: function _getPreviousTabOnScreen(tab) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var wrapAround = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var tabs = this.getTabsByScreenIndex();
        var tabScreenIndex = tabs.indexOf(tab);
        var previousTab = null;

        for (var i = tabScreenIndex - 1; i >= 0; i -= 1) {
          var _tab6 = tabs[i];

          if (skipDisabled && _tab6.disabled) {
            continue;
          } else {
            previousTab = _tab6;
            break;
          }
        }

        if (wrapAround) {
          if (previousTab === null) {
            for (var _i2 = tabs.length - 1; _i2 > tabScreenIndex; _i2 -= 1) {
              var _tab7 = tabs[_i2];

              if (skipDisabled && _tab7.disabled) {
                continue;
              } else {
                previousTab = _tab7;
                break;
              }
            }
          }
        }

        return previousTab;
      }

      // @info
      //   Get previous tab on screen.

    }, {
      key: "_getNextTabOnScreen",
      value: function _getNextTabOnScreen(tab) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var wrapAround = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var tabs = this.getTabsByScreenIndex();
        var tabScreenIndex = tabs.indexOf(tab);
        var nextTab = null;

        for (var i = tabScreenIndex + 1; i < tabs.length; i += 1) {
          var _tab8 = tabs[i];

          if (skipDisabled && _tab8.disabled) {
            continue;
          } else {
            nextTab = _tab8;
            break;
          }
        }

        if (wrapAround) {
          if (nextTab === null) {
            for (var _i3 = 0; _i3 < tabScreenIndex; _i3 += 1) {
              var _tab9 = tabs[_i3];

              if (skipDisabled && _tab9.disabled) {
                continue;
              } else {
                nextTab = _tab9;
                break;
              }
            }
          }
        }

        return nextTab;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        if (event.buttons === 1 && !this._waitingForTabToClose && event.target.closest("x-doctab")) {
          this._onTabPointerDown(event);
        }
      }
    }, {
      key: "_onTabPointerDown",
      value: function _onTabPointerDown(pointerDownEvent) {
        var _this41 = this;

        if (pointerDownEvent.isPrimary === false) {
          return;
        }

        var _pointerMoveListener = void 0,
            _lostPointerCaptureListener5 = void 0;
        var pointerDownTab = pointerDownEvent.target.closest("x-doctab");
        var selectedTab = this.querySelector("x-doctab[selected]");

        this.selectTab(pointerDownTab);
        if (selectedTab != pointerDownTab) {
          this.dispatchEvent(new CustomEvent("select", { detail: pointerDownTab }));
        }

        var selectionIndicatorAnimation = this._animateSelectionIndicator(selectedTab, pointerDownTab);
        this.setPointerCapture(pointerDownEvent.pointerId);

        this.addEventListener("pointermove", _pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          if (pointerMoveEvent.isPrimary && abs(pointerMoveEvent.clientX - pointerDownEvent.clientX) > 1) {
            _this41.removeEventListener("pointermove", _pointerMoveListener);
            _this41.removeEventListener("lostpointercapture", _lostPointerCaptureListener5);

            selectionIndicatorAnimation.finish();
            _this41._onTabDragStart(pointerDownEvent, pointerDownTab);
          }
        });

        this.addEventListener("lostpointercapture", _lostPointerCaptureListener5 = function lostPointerCaptureListener() {
          _this41.removeEventListener("pointermove", _pointerMoveListener);
          _this41.removeEventListener("lostpointercapture", _lostPointerCaptureListener5);
        });
      }
    }, {
      key: "_onTabDragStart",
      value: function _onTabDragStart(firstPointerMoveEvent, draggedTab) {
        var _this42 = this;

        var tabBounds = draggedTab.getBoundingClientRect();
        var tabsBounds = this.getBoundingClientRect();

        var $initialScreenIndex = Symbol();
        var $screenIndex = Symbol();
        var $flexOffset = Symbol();

        draggedTab.style.zIndex = 999;
        this["#open-button"].style.opacity = "0";

        var _iteratorNormalCompletion27 = true;
        var _didIteratorError27 = false;
        var _iteratorError27 = undefined;

        try {
          for (var _iterator27 = this.children[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
            var tab = _step27.value;

            var screenIndex = this._getTabScreenIndex(tab);
            tab[$screenIndex] = screenIndex;
            tab[$initialScreenIndex] = screenIndex;
            tab[$flexOffset] = tab.getBoundingClientRect().left - tabsBounds.left;

            if (tab !== draggedTab) {
              tab.style.transition = "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)";
            }
          }
        } catch (err) {
          _didIteratorError27 = true;
          _iteratorError27 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion27 && _iterator27.return) {
              _iterator27.return();
            }
          } finally {
            if (_didIteratorError27) {
              throw _iteratorError27;
            }
          }
        }

        var onDraggedTabScreenIndexChange = function onDraggedTabScreenIndexChange(fromScreenIndex, toScreenIndex) {
          if (toScreenIndex > fromScreenIndex + 1) {
            for (var i = fromScreenIndex; i < toScreenIndex; i += 1) {
              onDraggedTabScreenIndexChange(i, i + 1);
            }
          } else if (toScreenIndex < fromScreenIndex - 1) {
            for (var _i4 = fromScreenIndex; _i4 > toScreenIndex; _i4 -= 1) {
              onDraggedTabScreenIndexChange(_i4, _i4 - 1);
            }
          } else {
            var _iteratorNormalCompletion28 = true;
            var _didIteratorError28 = false;
            var _iteratorError28 = undefined;

            try {
              for (var _iterator28 = _this42.children[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                var tab = _step28.value;

                if (tab !== draggedTab) {
                  if (tab[$screenIndex] === toScreenIndex) {
                    tab[$screenIndex] = fromScreenIndex;
                  }

                  var translateX = -tab[$flexOffset];

                  for (var _i5 = 0; _i5 < tab[$screenIndex]; _i5 += 1) {
                    translateX += tabBounds.width;
                  }

                  if (translateX === 0) {
                    tab.style.transform = null;
                  } else {
                    tab.style.transform = "translate(" + translateX + "px)";
                  }
                }
              }
            } catch (err) {
              _didIteratorError28 = true;
              _iteratorError28 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion28 && _iterator28.return) {
                  _iterator28.return();
                }
              } finally {
                if (_didIteratorError28) {
                  throw _iteratorError28;
                }
              }
            }
          }
        };

        var pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          if (pointerMoveEvent.isPrimary) {
            var dragOffset = pointerMoveEvent.clientX - firstPointerMoveEvent.clientX;

            if (dragOffset + draggedTab[$flexOffset] <= 0) {
              dragOffset = -draggedTab[$flexOffset];
            } else if (dragOffset + draggedTab[$flexOffset] + tabBounds.width > tabsBounds.width) {
              dragOffset = tabsBounds.width - draggedTab[$flexOffset] - tabBounds.width;
            }

            draggedTab.style.transform = "translate(" + dragOffset + "px)";
            var screenIndex = _this42._getTabScreenIndex(draggedTab);

            if (screenIndex !== draggedTab[$screenIndex]) {
              var previousTabScreenIndex = draggedTab[$screenIndex];
              draggedTab[$screenIndex] = screenIndex;
              onDraggedTabScreenIndexChange(previousTabScreenIndex, draggedTab[$screenIndex]);
            }
          }
        };

        var lostPointerCaptureListener = async function lostPointerCaptureListener(dragEndEvent) {
          _this42.removeEventListener("pointermove", pointerMoveListener);
          _this42.removeEventListener("lostpointercapture", lostPointerCaptureListener);

          var translateX = -draggedTab[$flexOffset];

          for (var i = 0; i < draggedTab[$screenIndex]; i += 1) {
            translateX += tabBounds.width;
          }

          draggedTab.style.transition = "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)";
          draggedTab.style.transform = "translate(" + translateX + "px)";

          if (draggedTab[$initialScreenIndex] !== draggedTab[$screenIndex]) {
            _this42.dispatchEvent(new CustomEvent("rearrange"));
          }

          await sleep(150);

          draggedTab.style.zIndex = null;
          _this42["#open-button"].style.opacity = null;

          var _iteratorNormalCompletion29 = true;
          var _didIteratorError29 = false;
          var _iteratorError29 = undefined;

          try {
            for (var _iterator29 = _this42.children[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
              var tab = _step29.value;

              tab.style.transition = "none";
              tab.style.transform = "translate(0px, 0px)";
              tab.style.order = tab[$screenIndex];
            }
          } catch (err) {
            _didIteratorError29 = true;
            _iteratorError29 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion29 && _iterator29.return) {
                _iterator29.return();
              }
            } finally {
              if (_didIteratorError29) {
                throw _iteratorError29;
              }
            }
          }
        };

        this.addEventListener("pointermove", pointerMoveListener);
        this.addEventListener("lostpointercapture", lostPointerCaptureListener);
      }
    }, {
      key: "_onOpenButtonClick",
      value: function _onOpenButtonClick(clickEvent) {
        if (clickEvent.button === 0) {
          var customEvent = new CustomEvent("open", { cancelable: true });
          this.dispatchEvent(customEvent);

          if (customEvent.defaultPrevented === false) {
            var openedTab = html(_templateObject13);
            openedTab.style.order = this.childElementCount;
            this.openTab(openedTab);

            this.selectTab(openedTab);
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
          return;
        } else if (event.code === "Enter" || event.code === "Space") {
          var currentTab = this.querySelector("x-doctab[tabindex=\"0\"]");
          var selectedTab = this.querySelector("x-doctab[selected]");

          event.preventDefault();
          currentTab.click();

          if (currentTab !== selectedTab) {
            this.selectTab(currentTab);
            this._animateSelectionIndicator(selectedTab, currentTab);
          }
        } else if (event.code === "ArrowLeft") {
          var tabs = this.getTabsByScreenIndex();
          var _currentTab = this.querySelector("x-doctab[tabindex=\"0\"]");
          var previousTab = this._getPreviousTabOnScreen(_currentTab);

          if (previousTab) {
            event.preventDefault();

            _currentTab.tabIndex = -1;
            previousTab.tabIndex = 0;
            previousTab.focus();
          }
        } else if (event.code === "ArrowRight") {
          var _tabs = this.getTabsByScreenIndex();
          var _currentTab2 = this.querySelector("x-doctab[tabindex=\"0\"]");
          var nextTab = this._getNextTabOnScreen(_currentTab2);

          if (nextTab) {
            event.preventDefault();

            _currentTab2.tabIndex = -1;
            nextTab.tabIndex = 0;
            nextTab.focus();
          }
        }
      }
    }]);

    return XDocTabsElement;
  }(HTMLElement);

  customElements.define("x-doctabs", XDocTabsElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  var readFile = function readFile(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send(null);

      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      };

      xhr.onerror = function () {
        reject(xhr.status);
      };
    });
  };

  var shadowTemplate$b = html(_templateObject14);

  var cache = {};

  var XIconElement = function (_HTMLElement14) {
    _inherits(XIconElement, _HTMLElement14);

    _createClass(XIconElement, [{
      key: "name",


      // @type
      //   string
      // @default
      //   ""
      // @attribute
      get: function get() {
        return this.hasAttribute("name") ? this.getAttribute("name") : "";
      },
      set: function set(name) {
        this.setAttribute("name", name);
      }

      // @type
      //   string
      // @default
      //   "node_modules/xel/images/icons.svg"
      // @attribute

    }, {
      key: "iconset",
      get: function get() {
        if (this.hasAttribute("iconset") === false || this.getAttribute("iconset").trim() === "") {
          return "./icons.svg";
        } else {
          return this.getAttribute("iconset");
        }
      },
      set: function set(iconset) {
        this.setAttribute("iconset", iconset);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["name", "iconset"];
      }
    }]);

    function XIconElement() {
      _classCallCheck(this, XIconElement);

      var _this43 = _possibleConstructorReturn(this, (XIconElement.__proto__ || Object.getPrototypeOf(XIconElement)).call(this));

      _this43._shadowRoot = _this43.attachShadow({ mode: "closed" });
      _this43._shadowRoot.append(document.importNode(shadowTemplate$b.content, true));

      var _iteratorNormalCompletion30 = true;
      var _didIteratorError30 = false;
      var _iteratorError30 = undefined;

      try {
        for (var _iterator30 = _this43._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
          var element = _step30.value;

          _this43["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError30 = true;
        _iteratorError30 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion30 && _iterator30.return) {
            _iterator30.return();
          }
        } finally {
          if (_didIteratorError30) {
            throw _iteratorError30;
          }
        }
      }

      return _this43;
    }

    _createClass(XIconElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "name") {
          this._update();
        } else if (name === "iconset") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: async function _update() {
        if (this.name === "") {
          this["#svg"].innerHTML = "";
        } else {
          var symbol = await this._getSymbol(this.name, this.iconset);

          if (symbol) {
            this["#svg"].innerHTML = symbol.outerHTML + "<use href=\"#" + this.name + "\" width=\"100%\" height=\"100%\"></use>";
          } else {
            this["#svg"].innerHTML = "";
          }
        }
      }
    }, {
      key: "_getSymbol",
      value: function _getSymbol(name, iconsetURL) {
        var _this44 = this;

        return new Promise(async function (resolve) {
          var iconset = await _this44._getIconset(iconsetURL);
          var symbol = null;

          if (iconset) {
            symbol = iconset.querySelector("#" + CSS.escape(name));
          }

          resolve(symbol);
        });
      }
    }, {
      key: "_getIconset",
      value: function _getIconset(iconsetURL) {
        return new Promise(async function (resolve) {
          if (cache[iconsetURL]) {
            if (cache[iconsetURL].iconset) {
              resolve(cache[iconsetURL].iconset);
            } else {
              cache[iconsetURL].callbacks.push(resolve);
            }
          } else {
            cache[iconsetURL] = { callbacks: [resolve], iconset: null };

            var iconsetSVG = null;

            try {
              iconsetSVG = await readFile(iconsetURL);
            } catch (error) {
              iconsetSVG = null;
            }

            if (iconsetSVG) {
              cache[iconsetURL].iconset = svg(_templateObject15, iconsetSVG);

              var _iteratorNormalCompletion31 = true;
              var _didIteratorError31 = false;
              var _iteratorError31 = undefined;

              try {
                for (var _iterator31 = cache[iconsetURL].callbacks[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                  var callback = _step31.value;

                  callback(cache[iconsetURL].iconset);
                }
              } catch (err) {
                _didIteratorError31 = true;
                _iteratorError31 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion31 && _iterator31.return) {
                    _iterator31.return();
                  }
                } finally {
                  if (_didIteratorError31) {
                    throw _iteratorError31;
                  }
                }
              }
            }
          }
        });
      }
    }]);

    return XIconElement;
  }(HTMLElement);

  customElements.define("x-icon", XIconElement);

  var $oldTabIndex$4 = Symbol();

  var shadowTemplate$c = html(_templateObject16);

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend

  var XInputElement = function (_HTMLElement15) {
    _inherits(XInputElement, _HTMLElement15);

    _createClass(XInputElement, [{
      key: "type",


      // @type
      //   "text" || "email" || "password" || "url" || "color"
      // @default
      //   "text"
      // @attribute
      get: function get() {
        return this.hasAttribute("type") ? this.getAttribute("type") : "text";
      },
      set: function set(type) {
        this.setAttribute("type", type);
      }

      // @type
      //   string
      // @default
      //   ""
      // @attribute
      //   partial

    }, {
      key: "value",
      get: function get() {
        return this["#input"].value;
      },
      set: function set(value) {
        if (this["#input"].value !== value) {
          if (this.matches(":focus")) {
            // https://goo.gl/s1UnHh
            this["#input"].selectionStart = 0;
            this["#input"].selectionEnd = this["#input"].value.length;
            document.execCommand("insertText", false, value);
          } else {
            this["#input"].value = value;
          }

          if (this.validation === "instant") {
            this.validate();
          } else if (this.validation === "auto" || this.validation === "manual") {
            if (this.error !== null) {
              this.validate();
            }
          }

          this._updateEmptyState();
        }
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "spellcheck",
      get: function get() {
        return this.hasAttribute("spellcheck");
      },
      set: function set(spellcheck) {
        spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
      }

      // @type
      //   number
      // @default
      //   0
      // @attribute

    }, {
      key: "minLength",
      get: function get() {
        return this.hasAttribute("minlength") ? parseInt(this.getAttribute("minlength")) : 0;
      },
      set: function set(minLength) {
        this.setAttribute("minlength", minLength);
      }

      // @type
      //   number || Infinity
      // @default
      //   0
      // @attribute

    }, {
      key: "maxLength",
      get: function get() {
        return this.hasAttribute("maxlength") ? parseInt(this.getAttribute("maxlength")) : Infinity;
      },
      set: function set(maxLength) {
        this.setAttribute("maxlength", maxLength);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "required",
      get: function get() {
        return this.hasAttribute("required");
      },
      set: function set(required) {
        required ? this.setAttribute("required", "") : this.removeAttribute("required");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @atrribute

    }, {
      key: "readOnly",
      get: function get() {
        return this.hasAttribute("readonly");
      },
      set: function set(readOnly) {
        readOnly === true ? this.setAttribute("readonly", readOnly) : this.removeAttribute("readonly");
      }

      // @info
      //   Whether this input has "mixed" state.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   "auto"    - validate() is called when input loses focus and when user presses "Enter"
      //   "instant" - validate() is called on each key press
      //   "manual"  - you will call validate() manually when user submits the form
      // @type
      //   "auto" || "instant" || "manual"
      // @default
      //   "auto"

    }, {
      key: "validation",
      get: function get() {
        return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
      },
      set: function set(validation) {
        this.setAttribute("validation", validation);
      }

      // @type
      //   string?
      // @default
      //   null
      // @attribute

    }, {
      key: "error",
      get: function get() {
        return this.getAttribute("error");
      },
      set: function set(error) {
        error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["type", "value", "spellcheck", "maxlength", "readonly", "disabled", "validation"];
      }
    }]);

    function XInputElement() {
      _classCallCheck(this, XInputElement);

      var _this45 = _possibleConstructorReturn(this, (XInputElement.__proto__ || Object.getPrototypeOf(XInputElement)).call(this));

      _this45._shadowRoot = _this45.attachShadow({ mode: "closed", delegatesFocus: true });
      _this45._shadowRoot.append(document.importNode(shadowTemplate$c.content, true));

      var _iteratorNormalCompletion32 = true;
      var _didIteratorError32 = false;
      var _iteratorError32 = undefined;

      try {
        for (var _iterator32 = _this45._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
          var element = _step32.value;

          _this45["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError32 = true;
        _iteratorError32 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion32 && _iterator32.return) {
            _iterator32.return();
          }
        } finally {
          if (_didIteratorError32) {
            throw _iteratorError32;
          }
        }
      }

      _this45.addEventListener("focusin", function (event) {
        return _this45._onFocusIn(event);
      });
      _this45.addEventListener("focusout", function (event) {
        return _this45._onFocusOut(event);
      });
      _this45.addEventListener("keydown", function (event) {
        return _this45._onKeyDown(event);
      });

      _this45["#input"].addEventListener("change", function (event) {
        return _this45._onInputChange(event);
      });
      _this45["#input"].addEventListener("input", function (event) {
        return _this45._onInputInput(event);
      });
      return _this45;
    }

    _createClass(XInputElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();
        this._updateEmptyState();

        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "type") {
          this._onTypeAttributeChange();
        } else if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "spellcheck") {
          this._onSpellcheckAttributeChange();
        } else if (name === "maxlength") {
          this._onMaxLengthAttributeChange();
        } else if (name === "readonly") {
          this._onReadOnlyAttributeChnage();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        } else if (name === "validation") {
          this._onValidationAttributeChnage();
        }
      }

      // @info
      //   Override this method to validate the input value manually.
      // @type
      //   () => void

    }, {
      key: "validate",
      value: function validate() {
        if (this.value.length < this.minLength) {
          this.error = "Entered text is too short";
        } else if (this.value.length > this.maxLength) {
          this.error = "Entered text is too long";
        } else if (this.required && this.value.length === 0) {
          this.error = "This field is required";
        } else if (this.type === "email" && this["#input"].validity.valid === false) {
          this.error = "Invalid e-mail address";
        } else if (this.type === "url" && this["#input"].validity.valid === false) {
          this.error = "Invalid URL";
        } else if (this.type === "color" && isValidColorString(this["#input"].value) === false) {
          this.error = "Invalid color";
        } else {
          this.error = null;
        }
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this["#input"].select();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.value = "";
        this.error = null;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateEmptyState",
      value: function _updateEmptyState() {
        if (this.value.length === 0) {
          this.setAttribute("empty", "");
        } else {
          this.removeAttribute("empty");
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "input");
        this.setAttribute("aria-disabled", this.disabled);
        this.setAttribute("aria-readonly", this.readOnly);

        if (this.disabled) {
          this[$oldTabIndex$4] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$4] > 0 ? this[$oldTabIndex$4] : 0;
          }

          delete this[$oldTabIndex$4];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onTypeAttributeChange",
      value: function _onTypeAttributeChange() {
        if (this.type === "color") {
          this["#input"].type = "text";
        } else {
          this["#input"].type = this.type;
        }
      }
    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

        if (this.matches(":focus")) {
          this.selectAll();
        }
      }
    }, {
      key: "_onSpellcheckAttributeChange",
      value: function _onSpellcheckAttributeChange() {
        this["#input"].spellcheck = this.spellcheck;
      }
    }, {
      key: "_onMaxLengthAttributeChange",
      value: function _onMaxLengthAttributeChange() {
        this["#input"].maxLength = this.maxLength;
      }
    }, {
      key: "_onReadOnlyAttributeChnage",
      value: function _onReadOnlyAttributeChnage() {
        this["#input"].readOnly = this.readOnly;
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this["#input"].disabled = this.disabled;
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onValidationAttributeChnage",
      value: function _onValidationAttributeChnage() {
        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "_onFocusIn",
      value: function _onFocusIn() {
        this.dispatchEvent(new CustomEvent("textinputmodestart", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut() {
        this.dispatchEvent(new CustomEvent("textinputmodeend", { bubbles: true, composed: true }));

        if (this.validation === "auto") {
          this.validate();
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.key === "Enter") {
          document.execCommand("selectAll");

          if (this.validation === "instant") {
            this.validate();
          } else if (this.validation === "auto" || this.validation === "manual") {
            if (this.error !== null) {
              this.validate();
            }
          }
        }
      }
    }, {
      key: "_onInputInput",
      value: function _onInputInput(event) {
        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }

        event.stopPropagation();
        this._updateEmptyState();
        this.dispatchEvent(new CustomEvent("input", { bubbles: true }));
      }
    }, {
      key: "_onInputChange",
      value: function _onInputChange() {
        this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
      }
    }]);

    return XInputElement;
  }(HTMLElement);

  customElements.define("x-input", XInputElement);

  var shadowTemplate$d = html(_templateObject17);

  var XLabelElement = function (_HTMLElement16) {
    _inherits(XLabelElement, _HTMLElement16);

    _createClass(XLabelElement, [{
      key: "value",


      // @info
      //   Values associated with this label.
      // @type
      //   string
      // @default
      //   ""
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @info
      //   Source of the icon to show.
      // @type
      //   string
      // @attribute

    }, {
      key: "for",
      get: function get() {
        return this.getAttribute("for");
      },
      set: function set(value) {
        this.setAttribute("for", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["for"];
      }
    }]);

    function XLabelElement() {
      _classCallCheck(this, XLabelElement);

      var _this46 = _possibleConstructorReturn(this, (XLabelElement.__proto__ || Object.getPrototypeOf(XLabelElement)).call(this));

      _this46._shadowRoot = _this46.attachShadow({ mode: "closed" });
      _this46._shadowRoot.append(document.importNode(shadowTemplate$d.content, true));

      _this46.addEventListener("click", function (event) {
        return _this46._onClick(event);
      });
      return _this46;
    }

    _createClass(XLabelElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "for") {
          this._onForAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onClick",
      value: function _onClick(event) {
        if (this.for && this.disabled === false && event.target.closest("a") === null) {
          var target = this.getRootNode().querySelector("#" + CSS.escape(this.for));

          if (target) {
            target.click();
          }
        }
      }
    }, {
      key: "_onForAttributeChange",
      value: function _onForAttributeChange() {
        var rootNode = this.getRootNode();
        var target = rootNode.querySelector("#" + CSS.escape(this.for));

        if (target) {
          if (!this.id) {
            this.id = generateUniqueID(rootNode, "label-");
          }

          target.setAttribute("aria-labelledby", this.id);
        }
      }
    }]);

    return XLabelElement;
  }(HTMLElement);

  customElements.define("x-label", XLabelElement);

  var abs$1 = Math.abs;

  var windowWhitespace = 7;

  var shadowTemplate$e = html(_templateObject18);

  // @events
  //   open XMenu
  //   close XMenu

  var XMenuElement = function (_HTMLElement17) {
    _inherits(XMenuElement, _HTMLElement17);

    _createClass(XMenuElement, [{
      key: "opened",


      // @info
      //   Whether the menu is shown on screen.
      // @type
      //   boolean
      // @readonly
      // @attribute
      get: function get() {
        return this.hasAttribute("opened");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["opened"];
      }
    }]);

    function XMenuElement() {
      _classCallCheck(this, XMenuElement);

      var _this47 = _possibleConstructorReturn(this, (XMenuElement.__proto__ || Object.getPrototypeOf(XMenuElement)).call(this));

      _this47._delayPoints = [];
      _this47._delayTimeoutID = null;
      _this47._lastDelayPoint = null;

      _this47._extraTop = 0;
      _this47._lastScrollTop = 0;
      _this47._isPointerOverMenuBlock = false;
      _this47._expandWhenScrolled = false;

      _this47._shadowRoot = _this47.attachShadow({ mode: "closed" });
      _this47._shadowRoot.append(document.importNode(shadowTemplate$e.content, true));

      var _iteratorNormalCompletion33 = true;
      var _didIteratorError33 = false;
      var _iteratorError33 = undefined;

      try {
        for (var _iterator33 = _this47._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
          var element = _step33.value;

          _this47["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError33 = true;
        _iteratorError33 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion33 && _iterator33.return) {
            _iterator33.return();
          }
        } finally {
          if (_didIteratorError33) {
            throw _iteratorError33;
          }
        }
      }

      _this47.addEventListener("pointerdown", function (event) {
        return _this47._onPointerDown(event);
      });
      _this47.addEventListener("pointerover", function (event) {
        return _this47._onPointerOver(event);
      });
      _this47.addEventListener("pointerout", function (event) {
        return _this47._onPointerOut(event);
      });
      _this47.addEventListener("pointermove", function (event) {
        return _this47._onPointerMove(event);
      });
      _this47.addEventListener("keydown", function (event) {
        return _this47._onKeyDown(event);
      });
      _this47.addEventListener("wheel", function (event) {
        return _this47._onWheel(event);
      }, { passive: true });
      _this47["#main"].addEventListener("scroll", function (event) {
        return _this47._onScroll(event);
      }, { passive: true });
      return _this47;
    }

    _createClass(XMenuElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("role", "menu");
        this.setAttribute("aria-hidden", !this.opened);
        this.setAttribute("tabindex", "0");
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "opened") {
          this._onOpenedAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Open the menu so that overElement (belonging to the menu) is positioned directly over underElement.
      //   Returns a promise that is resolved when the menu finishes animating.
      // @type
      //   (HTMLElement, HTMLElement) => Promise<>

    }, {
      key: "openOverElement",
      value: function openOverElement(underElement, overElement) {
        var _this48 = this;

        return new Promise(async function (resolve) {
          var items = _this48.querySelectorAll(":scope > x-menuitem");

          if (items.length > 0) {
            _this48._expandWhenScrolled = true;
            _this48._openedTimestamp = getTimeStamp();
            _this48._resetInlineStyles();
            _this48.setAttribute("opened", "");

            var menuItem = [].concat(_toConsumableArray(items)).find(function (item) {
              return item.contains(overElement);
            }) || items[0];
            var menuBounds = _this48.getBoundingClientRect();
            var underElementBounds = underElement.getBoundingClientRect();
            var overElementBounds = overElement.getBoundingClientRect();

            var extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
            var extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

            menuItem.focus();

            // Determine extraLeft and extraTop which represent the extra offset when the menu is inside another
            // fixed-positioned element such as a popover.
            {
              if (menuBounds.top !== 0 || menuBounds.left !== 0) {
                extraLeft = -menuBounds.left;
                extraTop = -menuBounds.top;
              }
            }

            // Position the menu so that the underElement is directly above the overLabel
            {
              _this48.style.left = underElementBounds.x - (overElementBounds.x - menuBounds.x) + extraLeft + "px";
              _this48.style.top = underElementBounds.y - (overElementBounds.y - menuBounds.y) + extraTop + "px";
              menuBounds = _this48.getBoundingClientRect();
            }

            // Move the menu right if it overflows the left client bound
            {
              if (menuBounds.left < windowWhitespace) {
                _this48.style.left = windowWhitespace + extraLeft + "px";
                menuBounds = _this48.getBoundingClientRect();
              }
            }

            // Reduce the menu height if it overflows the top client bound
            {
              var overflowTop = windowWhitespace - menuBounds.top;

              if (overflowTop > 0) {
                _this48.style.height = menuBounds.bottom - windowWhitespace + "px";
                _this48.style.top = windowWhitespace + extraTop + "px";
                _this48["#main"].scrollTop = 9999;
                menuBounds = _this48.getBoundingClientRect();
              }
            }

            // Reduce menu height if it overflows the bottom client bound
            // Reduce menu width if it overflows the right client bound
            {
              if (menuBounds.bottom + windowWhitespace > window.innerHeight) {
                var overflow = menuBounds.bottom - window.innerHeight;
                var height = menuBounds.height - overflow - windowWhitespace;
                _this48.style.height = height + "px";
              }

              if (menuBounds.right + windowWhitespace > window.innerWidth) {
                var _overflow = menuBounds.right - window.innerWidth;
                var width = menuBounds.width - _overflow - windowWhitespace;
                _this48.style.width = width + "px";
              }
            }

            // Animate the menu block
            {
              var transition = getComputedStyle(_this48).getPropertyValue("--open-transition");

              var _parseTransistion2 = _this48._parseTransistion(transition),
                  _parseTransistion3 = _slicedToArray(_parseTransistion2, 3),
                  property = _parseTransistion3[0],
                  duration = _parseTransistion3[1],
                  _easing = _parseTransistion3[2];

              if (property === "transform") {
                var blockBounds = _this48.getBoundingClientRect();
                var originY = underElementBounds.y + underElementBounds.height / 2 - blockBounds.top;

                await _this48.animate({
                  transform: ["scaleY(0)", "scaleY(1)"],
                  transformOrigin: ["0 " + originY + "px", "0 " + originY + "px"]
                }, { duration: duration, easing: _easing }).finished;
              }
            }

            _this48.dispatchEvent(new CustomEvent("open", { bubbles: true, detail: _this48 }));
            _this48._extraTop = extraTop;
          }

          resolve();
        });
      }

      // @info
      //   Open the menu over the given <x-label> element.
      //   Returns a promise that is resolved when the menu finishes animating.
      // @type
      //   (XMenuItem) => Promise<>

    }, {
      key: "openOverLabel",
      value: function openOverLabel(underLabel) {
        var _this49 = this;

        return new Promise(async function (resolve) {
          var items = _this49.querySelectorAll(":scope > x-menuitem");

          if (items.length > 0) {
            _this49._resetInlineStyles();
            _this49.setAttribute("opened", "");
            _this49._expandWhenScrolled = true;
            _this49._openedTimestamp = getTimeStamp();

            var item = [].concat(_toConsumableArray(items)).find(function (item) {
              var itemLabel = item.querySelector("x-label");
              return itemLabel && itemLabel.textContent === underLabel.textContent ? true : false;
            });

            if (!item) {
              item = items[0];
            }

            var overLabel = item.querySelector("x-label");
            await _this49.openOverElement(underLabel, overLabel);
          }

          resolve();
        });
      }

      // @info
      //   Open the menu next the given menu item.
      //   Returns a promise that is resolved when the menu finishes animating.
      // @type
      //   (XMenuItem, string) => Promise

    }, {
      key: "openNextToElement",
      value: function openNextToElement(element) {
        var _this50 = this;

        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "horizontal";
        var elementWhitespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        return new Promise(async function (resolve) {
          _this50._expandWhenScrolled = false;
          _this50._openedTimestamp = getTimeStamp();

          _this50._resetInlineStyles();
          _this50.setAttribute("opened", "");
          _this50.dispatchEvent(new CustomEvent("open", { bubbles: true, detail: _this50 }));

          if (element.localName === "x-menuitem") {
            element.setAttribute("expanded", "");
          }

          var elementBounds = element.getBoundingClientRect();
          var menuBounds = _this50.getBoundingClientRect();
          var extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
          var extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

          // Determine extraLeft and extraTop which represent the extra offset when the menu is inside another
          // fixed-positioned element such as a popover.
          {
            if (menuBounds.top !== 0 || menuBounds.left !== 0) {
              extraLeft = -menuBounds.left;
              extraTop = -menuBounds.top;
            }
          }

          if (direction === "horizontal") {
            _this50.style.top = elementBounds.top + extraTop + "px";
            _this50.style.left = elementBounds.left + elementBounds.width + elementWhitespace + extraLeft + "px";

            var side = "right";

            // Reduce menu size if it does not fit on screen
            {
              var _menuBounds = _this50.getBoundingClientRect();

              if (_menuBounds.width > window.innerWidth - 10) {
                _this50.style.width = window.innerWidth - 10 + "px";
              }

              if (_menuBounds.height > window.innerHeight - 10) {
                _this50.style.height = window.innerHeight - 10 + "px";
              }
            }

            // Move the menu horizontally if it overflows the right screen edge
            {
              var _menuBounds2 = _this50.getBoundingClientRect();

              if (_menuBounds2.left + _menuBounds2.width + windowWhitespace > window.innerWidth) {
                // Move menu to the left side of the element if there is enough space to fit it in
                if (elementBounds.left > _menuBounds2.width + windowWhitespace) {
                  _this50.style.left = elementBounds.left - _menuBounds2.width + extraLeft + "px";
                  side = "left";
                }
                // ... otherwise move menu to the screen edge
                else {
                    // Move menu to the left screen edge
                    if (elementBounds.left > window.innerWidth - (elementBounds.left + elementBounds.width)) {
                      _this50.style.left = windowWhitespace + extraLeft + "px";
                      side = "left";
                    }
                    // Move menu to the right screen edge
                    else {
                        _this50.style.left = window.innerWidth - _menuBounds2.width - windowWhitespace + extraLeft + "px";
                        side = "right";
                      }
                  }
              }
            }

            // Move the menu vertically it overflows the bottom screen edge
            {
              var _menuBounds3 = _this50.getBoundingClientRect();

              if (_menuBounds3.top + _menuBounds3.height + windowWhitespace > window.innerHeight) {
                var bottomOverflow = _menuBounds3.top + _menuBounds3.height + windowWhitespace - window.innerHeight;
                _this50.style.top = _menuBounds3.top - bottomOverflow + extraTop + "px";
              }
            }

            // Animate the menu
            {
              var transition = getComputedStyle(_this50).getPropertyValue("--open-transition");

              var _parseTransistion4 = _this50._parseTransistion(transition),
                  _parseTransistion5 = _slicedToArray(_parseTransistion4, 3),
                  property = _parseTransistion5[0],
                  duration = _parseTransistion5[1],
                  _easing2 = _parseTransistion5[2];

              if (property === "transform") {
                await _this50.animate({
                  transform: ["scale(0, 0)", "scale(1, 1)"],
                  transformOrigin: [side === "left" ? "100% 0" : "0 0", side === "left" ? "100% 0" : "0 0"]
                }, { duration: duration, easing: _easing2 }).finished;
              }
            }
          } else if (direction === "vertical") {
            _this50.style.top = elementBounds.top + elementBounds.height + elementWhitespace + extraTop + "px";
            _this50.style.left = elementBounds.left + extraLeft + "px";

            var _side = "bottom";

            // Reduce menu size if it does not fit on screen
            {
              var _menuBounds4 = _this50.getBoundingClientRect();

              if (_menuBounds4.width > window.innerWidth - 10) {
                _this50.style.width = window.innerWidth - 10 + "px";
              }

              if (_menuBounds4.height > window.innerHeight - 10) {
                _this50.style.height = window.innerHeight - 10 + "px";
              }
            }

            if (element.parentElement && element.parentElement.localName === "x-menubar") {
              var _menuBounds5 = _this50.getBoundingClientRect();

              // Reduce menu height if it overflows bottom screen edge
              if (_menuBounds5.top + _menuBounds5.height + windowWhitespace > window.innerHeight) {
                _this50.style.height = window.innerHeight - (elementBounds.top + elementBounds.height) - 10 + "px";
              }
            } else {
              // Move the menu vertically if it overflows the bottom screen edge
              {
                var _menuBounds6 = _this50.getBoundingClientRect();

                if (_menuBounds6.top + _menuBounds6.height + windowWhitespace > window.innerHeight) {
                  // Move menu to the top side of the element if there is enough space to fit it in
                  if (elementBounds.top > _menuBounds6.height + windowWhitespace) {
                    _this50.style.top = elementBounds.top - _menuBounds6.height - elementWhitespace + extraTop + "px";
                    _side = "top";
                  }
                  // ... otherwise move menu to the screen edge
                  else {
                      // Move menu to the top screen edge
                      if (elementBounds.top > window.innerHeight - (elementBounds.top + elementBounds.height)) {
                        _this50.style.top = windowWhitespace + extraTop + "px";
                        _side = "top";
                      }
                      // Move menu to the bottom screen edge
                      else {
                          _this50.style.top = window.innerHeight - _menuBounds6.height - windowWhitespace + extraTop + "px";
                          _side = "bottom";
                        }
                    }
                }
              }
            }

            // Float the menu to the right element edge if the menu overflows right screen edge
            {
              var _menuBounds7 = _this50.getBoundingClientRect();

              if (_menuBounds7.left + _menuBounds7.width + windowWhitespace > window.innerWidth) {
                _this50.style.left = elementBounds.left + elementBounds.width - _menuBounds7.width + extraLeft + "px";
              }
            }

            // Float the menu to the left screen edge if it overflows the left screen edge
            {
              var _menuBounds8 = _this50.getBoundingClientRect();

              if (_menuBounds8.left < windowWhitespace) {
                _this50.style.left = windowWhitespace + extraLeft + "px";
              }
            }

            // Animate the menu
            {
              var _transition = getComputedStyle(_this50).getPropertyValue("--open-transition");

              var _parseTransistion6 = _this50._parseTransistion(_transition),
                  _parseTransistion7 = _slicedToArray(_parseTransistion6, 3),
                  _property = _parseTransistion7[0],
                  _duration = _parseTransistion7[1],
                  _easing3 = _parseTransistion7[2];

              if (_property === "transform") {
                await _this50.animate({
                  transform: ["scale(1, 0)", "scale(1, 1)"],
                  transformOrigin: [_side === "top" ? "0 100%" : "0 0", _side === "top" ? "0 100%" : "0 0"]
                }, { duration: _duration, easing: _easing3 }).finished;
              }
            }
          }

          _this50._extraTop = extraTop;
          resolve();
        });
      }

      // @info
      //   Open the menu at given client point.
      //   Returns a promise that is resolved when the menu finishes animating.
      // @type
      //   (number, number) => Promise

    }, {
      key: "openAtPoint",
      value: function openAtPoint(left, top) {
        var _this51 = this;

        return new Promise(async function (resolve) {
          _this51._expandWhenScrolled = false;
          _this51._openedTimestamp = getTimeStamp();

          _this51._resetInlineStyles();
          _this51.setAttribute("opened", "");
          _this51.dispatchEvent(new CustomEvent("open", { bubbles: true, detail: _this51 }));

          var menuBounds = _this51.getBoundingClientRect();
          var extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
          var extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

          // Determine extraLeft and extraTop which represent the extra offset when the menu is inside another
          // fixed-positioned element such as a popover.
          {
            if (menuBounds.top !== 0 || menuBounds.left !== 0) {
              extraLeft = -menuBounds.left;
              extraTop = -menuBounds.top;
            }
          }

          // Position the menu at given point
          {
            _this51.style.left = left + extraLeft + "px";
            _this51.style.top = top + extraTop + "px";
            menuBounds = _this51.getBoundingClientRect();
          }

          // If menu overflows right screen border then move it to the opposite side
          if (menuBounds.right + windowWhitespace > window.innerWidth) {
            left = left - menuBounds.width;
            _this51.style.left = left + extraLeft + "px";
            menuBounds = _this51.getBoundingClientRect();
          }

          // If menu overflows bottom screen border then move it up
          if (menuBounds.bottom + windowWhitespace > window.innerHeight) {
            top = top + window.innerHeight - (menuBounds.top + menuBounds.height) - windowWhitespace;
            _this51.style.top = top + extraTop + "px";
            menuBounds = _this51.getBoundingClientRect();

            // If menu now overflows top screen border then make it stretch to the whole available vertical space

            if (menuBounds.top < windowWhitespace) {
              top = windowWhitespace;
              _this51.style.top = top + extraTop + "px";
              _this51.style.height = window.innerHeight - windowWhitespace - windowWhitespace + "px";
            }
          }

          // Animate the menu
          {
            var transition = getComputedStyle(_this51).getPropertyValue("--open-transition");

            var _parseTransistion8 = _this51._parseTransistion(transition),
                _parseTransistion9 = _slicedToArray(_parseTransistion8, 3),
                property = _parseTransistion9[0],
                duration = _parseTransistion9[1],
                _easing4 = _parseTransistion9[2];

            if (property === "transform") {
              await _this51.animate({
                transform: ["scale(0)", "scale(1)"],
                transformOrigin: ["0 0", "0 0"]
              }, {
                duration: 80,
                easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
              }).finished;
            }
          }

          _this51._extraTop = extraTop;
          resolve();
        });
      }

      // @info
      //   Close the menu.
      //   Returns a promise that is resolved when the menu finishes animating.
      // @type
      //   (boolean) => Promise

    }, {
      key: "close",
      value: function close() {
        var _this52 = this;

        var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        return new Promise(async function (resolve) {
          if (_this52.opened) {
            _this52.removeAttribute("opened");
            _this52.dispatchEvent(new CustomEvent("close", { bubbles: true, detail: _this52 }));

            var item = _this52.closest("x-menuitem");

            if (item) {
              item.removeAttribute("expanded");
            }

            if (animate) {
              _this52.setAttribute("animating", "");

              var transition = getComputedStyle(_this52).getPropertyValue("--close-transition");

              var _parseTransistion10 = _this52._parseTransistion(transition),
                  _parseTransistion11 = _slicedToArray(_parseTransistion10, 3),
                  property = _parseTransistion11[0],
                  duration = _parseTransistion11[1],
                  _easing5 = _parseTransistion11[2];

              if (property === "opacity") {
                await _this52.animate({ opacity: ["1", "0"] }, { duration: duration, easing: _easing5 }).finished;
              }

              _this52.removeAttribute("animating");
            }

            var _iteratorNormalCompletion34 = true;
            var _didIteratorError34 = false;
            var _iteratorError34 = undefined;

            try {
              for (var _iterator34 = _this52.querySelectorAll(":scope > x-menuitem")[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                var _item = _step34.value;

                var submenu = _item.querySelector("x-menu[opened]");

                if (submenu) {
                  submenu.close();
                }
              }
            } catch (err) {
              _didIteratorError34 = true;
              _iteratorError34 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion34 && _iterator34.return) {
                  _iterator34.return();
                }
              } finally {
                if (_didIteratorError34) {
                  throw _iteratorError34;
                }
              }
            }
          }

          resolve();
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "focusNextMenuItem",
      value: function focusNextMenuItem() {
        var refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

        if (refItem) {
          var nextItem = null;

          for (var item = refItem.nextElementSibling; item; item = item.nextElementSibling) {
            if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
              nextItem = item;
              break;
            }
          }

          if (nextItem === null && refItem.parentElement != null) {
            var _iteratorNormalCompletion35 = true;
            var _didIteratorError35 = false;
            var _iteratorError35 = undefined;

            try {
              for (var _iterator35 = refItem.parentElement.children[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
                var _item2 = _step35.value;

                if (_item2.localName === "x-menuitem" && _item2.disabled === false && _item2.hidden === false) {
                  nextItem = _item2;
                  break;
                }
              }
            } catch (err) {
              _didIteratorError35 = true;
              _iteratorError35 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion35 && _iterator35.return) {
                  _iterator35.return();
                }
              } finally {
                if (_didIteratorError35) {
                  throw _iteratorError35;
                }
              }
            }
          }

          if (nextItem) {
            nextItem.focus();

            var menu = refItem.querySelector("x-menu");

            if (menu) {
              menu.close();
            }
          }
        } else {
          this.focusFirstMenuItem();
        }
      }
    }, {
      key: "focusPreviousMenuItem",
      value: function focusPreviousMenuItem() {
        var refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

        if (refItem) {
          var previousItem = null;

          for (var item = refItem.previousElementSibling; item; item = item.previousElementSibling) {
            if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
              previousItem = item;
              break;
            }
          }

          if (previousItem === null && refItem.parentElement != null) {
            var _iteratorNormalCompletion36 = true;
            var _didIteratorError36 = false;
            var _iteratorError36 = undefined;

            try {
              for (var _iterator36 = [].concat(_toConsumableArray(refItem.parentElement.children)).reverse()[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                var _item3 = _step36.value;

                if (_item3.localName === "x-menuitem" && _item3.disabled === false && _item3.hidden === false) {
                  previousItem = _item3;
                  break;
                }
              }
            } catch (err) {
              _didIteratorError36 = true;
              _iteratorError36 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion36 && _iterator36.return) {
                  _iterator36.return();
                }
              } finally {
                if (_didIteratorError36) {
                  throw _iteratorError36;
                }
              }
            }
          }

          if (previousItem) {
            previousItem.focus();

            var menu = refItem.querySelector("x-menu");

            if (menu) {
              menu.close();
            }
          }
        } else {
          this.focusLastMenuItem();
        }
      }
    }, {
      key: "focusFirstMenuItem",
      value: function focusFirstMenuItem() {
        var items = this.querySelectorAll("x-menuitem:not([disabled]):not([hidden])");
        var firstItem = items[0] || null;

        if (firstItem) {
          firstItem.focus();
        }
      }
    }, {
      key: "focusLastMenuItem",
      value: function focusLastMenuItem() {
        var items = this.querySelectorAll("x-menuitem:not([disabled]):not([hidden])");
        var lastItem = items.length > 0 ? items[items.length - 1] : null;

        if (lastItem) {
          lastItem.focus();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @doc
      //   http://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown

    }, {
      key: "_delay",
      value: function _delay(callback) {
        var _this53 = this;

        var tolerance = 75;
        var fullDelay = 300;
        var delay = 0;

        {
          var point = this._delayPoints[this._delayPoints.length - 1];
          var prevPoint = this._delayPoints[0];
          var openedSubmenu = this.querySelector("x-menu[opened]");

          if (openedSubmenu && point) {
            if (!prevPoint) {
              prevPoint = point;
            }

            var bounds = this.getBoundingClientRect();

            var upperLeftPoint = { x: bounds.left, y: bounds.top - tolerance };
            var upperRightPoint = { x: bounds.left + bounds.width, y: upperLeftPoint.y };
            var lowerLeftPoint = { x: bounds.left, y: bounds.top + bounds.height + tolerance };
            var lowerRightPoint = { x: bounds.left + bounds.width, y: lowerLeftPoint.y };

            var proceed = true;

            if (prevPoint.x < bounds.left || prevPoint.x > lowerRightPoint.x || prevPoint.y < bounds.top || prevPoint.y > lowerRightPoint.y) {
              proceed = false;
            }

            if (this._lastDelayPoint && point.x === this._lastDelayPoint.x && point.y === this._lastDelayPoint.y) {
              proceed = false;
            }

            if (proceed) {
              var decreasingCorner = void 0;
              var increasingCorner = void 0;

              {
                decreasingCorner = upperRightPoint;
                increasingCorner = lowerRightPoint;
              }

              var getSlope = function getSlope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
              };
              var decreasingSlope = getSlope(point, decreasingCorner);
              var increasingSlope = getSlope(point, increasingCorner);
              var prevDecreasingSlope = getSlope(prevPoint, decreasingCorner);
              var prevIncreasingSlope = getSlope(prevPoint, increasingCorner);

              if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                this._lastDelayPoint = point;
                delay = fullDelay;
              } else {
                this._lastDelayPoint = null;
              }
            }
          }
        }

        if (delay > 0) {
          this._delayTimeoutID = setTimeout(function () {
            _this53._delay(callback);
          }, delay);
        } else {
          callback();
        }
      }
    }, {
      key: "_clearDelay",
      value: function _clearDelay() {
        if (this._delayTimeoutID) {
          clearTimeout(this._delayTimeoutID);
          this._delayTimeoutID = null;
        }
      }
    }, {
      key: "_resetInlineStyles",
      value: function _resetInlineStyles() {
        this.style.position = "fixed";
        this.style.top = "0px";
        this.style.left = "0px";
        this.style.width = null;
        this.style.height = null;
        this.style.minWidth = null;
        this.style.maxWidth = null;
      }

      // @info
      //   Whether this or any ancestor menu is closing
      // @type
      //   Boolean

    }, {
      key: "_isClosing",
      value: function _isClosing() {
        return this.matches("*[closing], *[closing] x-menu");
      }

      // @info
      //   Parse the value of CSS transition property.
      // @type
      //   (string) => [string, number, string]

    }, {
      key: "_parseTransistion",
      value: function _parseTransistion(string) {
        var _string$trim$split = string.trim().split(" "),
            _string$trim$split2 = _toArray(_string$trim$split),
            rawDuration = _string$trim$split2[0],
            property = _string$trim$split2[1],
            rest = _string$trim$split2.slice(2);

        var duration = parseFloat(rawDuration);
        var easing = rest.join(" ");
        return [property, duration, easing];
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onOpenedAttributeChange",
      value: function _onOpenedAttributeChange() {
        this.setAttribute("aria-hidden", !this.opened);
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        if (event.target === this || event.target.localName === "hr") {
          event.stopPropagation();
        }
      }
    }, {
      key: "_onPointerOver",
      value: function _onPointerOver(event) {
        var _this54 = this;

        if (this._isClosing() || event.pointerType !== "mouse") {
          return;
        }

        if (event.target.closest("x-menu") === this) {
          if (this._isPointerOverMenuBlock === false) {
            this._onMenuBlockPointerEnter();
          }

          // Focus and expand the menu item under pointer and collapse other items
          {
            var item = event.target.closest("x-menuitem");

            if (item && item.disabled === false && item.closest("x-menu") === this) {
              if (item.matches(":focus") === false) {
                this._delay(async function () {
                  var otherItem = _this54.querySelector(":scope > x-menuitem:focus");

                  if (otherItem) {
                    var otherSubmenu = otherItem.querySelector("x-menu");

                    if (otherSubmenu) {
                      // otherItem.removeAttribute("expanded");
                      otherSubmenu.close();
                    }
                  }

                  item.focus();

                  var menu = item.closest("x-menu");
                  var submenu = item.querySelector("x-menu");
                  var otherItems = [].concat(_toConsumableArray(_this54.querySelectorAll(":scope > x-menuitem"))).filter(function ($0) {
                    return $0 !== item;
                  });

                  if (submenu) {
                    await sleep(60);

                    if (item.matches(":focus") && submenu.opened === false) {
                      submenu.openNextToElement(item, "horizontal");
                    }
                  }

                  var _iteratorNormalCompletion37 = true;
                  var _didIteratorError37 = false;
                  var _iteratorError37 = undefined;

                  try {
                    for (var _iterator37 = otherItems[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
                      var _otherItem = _step37.value;

                      var _otherSubmenu = _otherItem.querySelector("x-menu");

                      if (_otherSubmenu) {
                        _otherSubmenu.close();
                      }
                    }
                  } catch (err) {
                    _didIteratorError37 = true;
                    _iteratorError37 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion37 && _iterator37.return) {
                        _iterator37.return();
                      }
                    } finally {
                      if (_didIteratorError37) {
                        throw _iteratorError37;
                      }
                    }
                  }
                });
              }
            } else {
              this._delay(function () {
                _this54.focus();
              });
            }
          }
        }
      }
    }, {
      key: "_onPointerOut",
      value: function _onPointerOut(event) {
        // @bug: event.relatedTarget leaks shadowDOM, so we have to use closest() utility function
        if (!event.relatedTarget || closest(event.relatedTarget, "x-menu") !== this) {
          if (this._isPointerOverMenuBlock === true) {
            this._onMenuBlockPointerLeave();
          }
        }
      }
    }, {
      key: "_onMenuBlockPointerEnter",
      value: function _onMenuBlockPointerEnter() {
        if (this._isClosing()) {
          return;
        }

        this._isPointerOverMenuBlock = true;
        this._clearDelay();
      }
    }, {
      key: "_onMenuBlockPointerLeave",
      value: function _onMenuBlockPointerLeave() {
        if (this._isClosing()) {
          return;
        }

        this._isPointerOverMenuBlock = false;
        this._clearDelay();
        this.focus();
      }
    }, {
      key: "_onPointerMove",
      value: function _onPointerMove(event) {
        this._delayPoints.push({
          x: event.clientX,
          y: event.clientY
        });

        if (this._delayPoints.length > 3) {
          this._delayPoints.shift();
        }
      }
    }, {
      key: "_onWheel",
      value: function _onWheel(event) {
        if (event.target.closest("x-menu") === this) {
          this._isPointerOverMenuBlock = true;
        } else {
          this._isPointerOverMenuBlock = false;
        }
      }
    }, {
      key: "_onScroll",
      value: function _onScroll(event) {
        if (this._expandWhenScrolled) {
          var delta = this["#main"].scrollTop - this._lastScrollTop;
          this._lastScrollTop = this["#main"].scrollTop;

          if (getTimeStamp() - this._openedTimestamp > 100) {
            var menuRect = this.getBoundingClientRect();

            if (delta < 0) {
              if (menuRect.bottom + abs$1(delta) <= window.innerHeight - windowWhitespace) {
                this.style.height = menuRect.height + abs$1(delta) + "px";
              } else {
                this.style.height = window.innerHeight - menuRect.top - windowWhitespace + "px";
              }
            } else if (delta > 0) {
              var _getComputedStyle = getComputedStyle(this),
                  top = _getComputedStyle.top,
                  left = _getComputedStyle.left,
                  height = _getComputedStyle.height;

              if (menuRect.top - abs$1(delta) >= windowWhitespace) {
                this.style.top = parseFloat(top) - abs$1(delta) + "px";
                this.style.height = parseFloat(height) + abs$1(delta) + "px";

                this["#main"].scrollTop = 0;
                this._lastScrollTop = 0;
              } else {
                this.style.top = windowWhitespace + this._extraTop + "px";
                this.style.height = window.innerHeight - menuRect.top - windowWhitespace + "px";
              }
            }
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (this._isClosing()) {
          event.preventDefault();
          event.stopPropagation();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          event.stopPropagation();
          this.focusPreviousMenuItem();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          event.stopPropagation();
          this.focusNextMenuItem();
        } else if (event.code === "ArrowRight" || event.code === "Enter" || event.code === "Space") {
          var focusedItem = this.querySelector("x-menuitem:focus");

          if (focusedItem) {
            var submenu = focusedItem.querySelector("x-menu");

            if (submenu) {
              event.preventDefault();
              event.stopPropagation();

              if (submenu.opened === false) {
                submenu.openNextToElement(focusedItem, "horizontal");
              }

              var submenuFirstItem = submenu.querySelector("x-menuitem:not([disabled]):not([hidden])");

              if (submenuFirstItem) {
                submenuFirstItem.focus();
              }
            }
          }
        } else if (event.code === "ArrowLeft") {
          var _focusedItem = this.querySelector("x-menuitem:focus");

          if (_focusedItem) {
            var parentMenu = _focusedItem.closest("x-menu");
            var parentItem = parentMenu.closest("x-menuitem");

            if (parentItem && parentItem.closest("x-menu")) {
              event.preventDefault();
              event.stopPropagation();

              parentItem.focus();
              this.close();
            }
          }
        }
      }
    }]);

    return XMenuElement;
  }(HTMLElement);

  customElements.define("x-menu", XMenuElement);

  var debug$2 = false;

  var shadowTemplate$f = html(_templateObject19);

  var XMenuBarElement = function (_HTMLElement18) {
    _inherits(XMenuBarElement, _HTMLElement18);

    _createClass(XMenuBarElement, [{
      key: "disabled",


      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XMenuBarElement() {
      _classCallCheck(this, XMenuBarElement);

      var _this55 = _possibleConstructorReturn(this, (XMenuBarElement.__proto__ || Object.getPrototypeOf(XMenuBarElement)).call(this));

      _this55._expanded = false;

      _this55._shadowRoot = _this55.attachShadow({ mode: "closed" });
      _this55._shadowRoot.append(document.importNode(shadowTemplate$f.content, true));

      var _iteratorNormalCompletion38 = true;
      var _didIteratorError38 = false;
      var _iteratorError38 = undefined;

      try {
        for (var _iterator38 = _this55._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
          var element = _step38.value;

          _this55["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError38 = true;
        _iteratorError38 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion38 && _iterator38.return) {
            _iterator38.return();
          }
        } finally {
          if (_didIteratorError38) {
            throw _iteratorError38;
          }
        }
      }

      _this55.addEventListener("focusout", function (event) {
        return _this55._onFocusOut(event);
      });
      _this55._shadowRoot.addEventListener("pointerover", function (event) {
        return _this55._onShadowRootPointerOver(event);
      });
      _this55._shadowRoot.addEventListener("click", function (event) {
        return _this55._onShadowRootClick(event);
      });
      _this55._shadowRoot.addEventListener("wheel", function (event) {
        return _this55._onShadowRootWheel(event);
      });
      _this55._shadowRoot.addEventListener("keydown", function (event) {
        return _this55._onShadowRootKeyDown(event);
      });
      return _this55;
    }

    _createClass(XMenuBarElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this56 = this;

        this.setAttribute("role", "menubar");
        this.setAttribute("aria-disabled", this.disabled);

        window.addEventListener("orientationchange", this._orientationChangeListener = function () {
          _this56._onOrientationChange();
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        window.removeEventListener("orientationchange", this._orientationChangeListener);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_expandMenubarItem",
      value: function _expandMenubarItem(item) {
        var menu = item.querySelector(":scope > x-menu");

        if (menu && menu.opened === false) {
          item.focus();
          this._expanded = true;
          this.style.touchAction = "none";

          // Open item's menu and close other menus
          {
            menu.openNextToElement(item, "vertical");

            var menus = this.querySelectorAll(":scope > x-menuitem > x-menu");
            var otherMenus = [].concat(_toConsumableArray(menus)).filter(function ($0) {
              return $0 !== menu;
            });

            var _iteratorNormalCompletion39 = true;
            var _didIteratorError39 = false;
            var _iteratorError39 = undefined;

            try {
              for (var _iterator39 = otherMenus[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
                var otherMenu = _step39.value;

                if (otherMenu) {
                  otherMenu.close(false);
                }
              }
            } catch (err) {
              _didIteratorError39 = true;
              _iteratorError39 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion39 && _iterator39.return) {
                  _iterator39.return();
                }
              } finally {
                if (_didIteratorError39) {
                  throw _iteratorError39;
                }
              }
            }
          }

          // Show the backdrop
          {
            var _getBoundingClientRec = this.getBoundingClientRect(),
                x = _getBoundingClientRec.x,
                y = _getBoundingClientRec.y,
                width = _getBoundingClientRec.width,
                height = _getBoundingClientRec.height;

            this["#backdrop-path"].setAttribute("d", "\n          M 0 0\n          L " + window.innerWidth + " 0\n          L " + window.innerWidth + " " + window.innerHeight + "\n          L 0 " + window.innerHeight + "\n          L 0 0\n          M " + x + " " + y + "\n          L " + (x + width) + " " + y + "\n          L " + (x + width) + " " + (y + height) + "\n          L " + x + " " + (y + height) + "\n        ");

            this["#backdrop"].removeAttribute("hidden");
          }
        }
      }
    }, {
      key: "_collapseMenubarItems",
      value: function _collapseMenubarItems() {
        var _this57 = this;

        return new Promise(async function (resolve) {
          _this57._expanded = false;
          _this57.style.touchAction = null;

          // Hide the backdrop
          {
            _this57["#backdrop"].setAttribute("hidden", "");
            _this57["#backdrop-path"].setAttribute("d", "");
          }

          // Close all opened menus
          {
            var menus = _this57.querySelectorAll(":scope > x-menuitem > x-menu[opened]");

            var _iteratorNormalCompletion40 = true;
            var _didIteratorError40 = false;
            var _iteratorError40 = undefined;

            try {
              for (var _iterator40 = menus[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
                var menu = _step40.value;

                await menu.close(true);
              }
            } catch (err) {
              _didIteratorError40 = true;
              _iteratorError40 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion40 && _iterator40.return) {
                  _iterator40.return();
                }
              } finally {
                if (_didIteratorError40) {
                  throw _iteratorError40;
                }
              }
            }
          }

          var focusedMenuItem = _this57.querySelector("x-menuitem:focus");

          if (focusedMenuItem) {
            focusedMenuItem.blur();
          }

          resolve();
        });
      }
    }, {
      key: "_expandPreviousMenubarItem",
      value: function _expandPreviousMenubarItem() {
        var items = [].concat(_toConsumableArray(this.querySelectorAll(":scope > x-menuitem:not([disabled])")));
        var focusedItem = this.querySelector(":focus").closest("x-menubar > x-menuitem");

        if (items.length > 1 && focusedItem) {
          var i = items.indexOf(focusedItem);
          var previousItem = items[i - 1] || items[items.length - 1];
          this._expandMenubarItem(previousItem);
        }
      }
    }, {
      key: "_expandNextMenubarItem",
      value: function _expandNextMenubarItem() {
        var items = [].concat(_toConsumableArray(this.querySelectorAll(":scope > x-menuitem:not([disabled])")));
        var focusedItem = this.querySelector(":focus").closest("x-menubar > x-menuitem");

        if (focusedItem && items.length > 1) {
          var i = items.indexOf(focusedItem);
          var nextItem = items[i + 1] || items[0];
          this._expandMenubarItem(nextItem);
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this.setAttribute("aria-disabled", this.disabled);
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut(event) {
        if ((event.relatedTarget === null || this.contains(event.relatedTarget) === false) && debug$2 === false) {
          this._collapseMenubarItems();
        }
      }
    }, {
      key: "_onOrientationChange",
      value: function _onOrientationChange() {
        this._collapseMenubarItems();
      }
    }, {
      key: "_onShadowRootWheel",
      value: function _onShadowRootWheel(event) {
        var openedMenu = this.querySelector("x-menu[opened]");

        if (openedMenu && openedMenu.contains(event.target) === false) {
          event.preventDefault();
        }
      }
    }, {
      key: "_onShadowRootClick",
      value: async function _onShadowRootClick(event) {
        if (this.hasAttribute("closing")) {
          return;
        }

        var item = event.target.closest("x-menuitem");
        var ownerMenu = event.target.closest("x-menu");

        if (item && item.disabled === false && (!ownerMenu || ownerMenu.contains(item))) {
          var menu = item.querySelector("x-menu");

          if (item.parentElement === this) {
            if (menu) {
              menu.opened ? this._collapseMenubarItems() : this._expandMenubarItem(item);
            }
          } else {
            if (menu) {
              if (menu.opened && menu.opened === false) {
                menu.openNextToElement(item, "horizontal");
              }
            } else {
              this.setAttribute("closing", "");

              await item.whenTriggerEnd;
              await this._collapseMenubarItems();

              this.removeAttribute("closing");
            }
          }
        } else if (event.target === this["#backdrop-path"]) {
          this._collapseMenubarItems();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, {
      key: "_onShadowRootPointerOver",
      value: function _onShadowRootPointerOver(event) {
        if (this.hasAttribute("closing")) {
          return;
        }

        var item = event.target.closest("x-menuitem");

        if (event.target.closest("x-menu") === null && item && item.parentElement === this) {
          if (this._expanded && event.pointerType === "mouse") {
            if (item.hasAttribute("expanded") === false) {
              this._expandMenubarItem(item);
            } else {
              item.focus();
            }
          }
        }
      }
    }, {
      key: "_onShadowRootKeyDown",
      value: function _onShadowRootKeyDown(event) {
        if (this.hasAttribute("closing")) {
          event.stopPropagation();
          event.preventDefault();
        } else if (event.code === "Enter" || event.code === "Space") {
          var focusedMenubarItem = this.querySelector(":scope > x-menuitem:focus");

          if (focusedMenubarItem) {
            event.preventDefault();
            focusedMenubarItem.click();
          }
        } else if (event.code === "Escape") {
          if (this._expanded) {
            event.preventDefault();
            this._collapseMenubarItems();
          }
        } else if (event.code === "Tab") {
          var refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

          if (refItem) {
            refItem.focus();

            var menu = refItem.querySelector(":scope > x-menu");

            if (menu) {
              menu.tabIndex = -1;

              menu.close().then(function () {
                menu.tabIndex = -1;
              });
            }
          }
        } else if (event.code === "ArrowRight") {
          this._expandNextMenubarItem();
        } else if (event.code === "ArrowLeft") {
          this._expandPreviousMenubarItem();
        } else if (event.code === "ArrowDown") {
          var _menu2 = this.querySelector("x-menuitem:focus > x-menu");

          if (_menu2) {
            event.preventDefault();
            _menu2.focusFirstMenuItem();
          }
        } else if (event.code === "ArrowUp") {
          var _menu3 = this.querySelector("x-menuitem:focus > x-menu");

          if (_menu3) {
            event.preventDefault();
            _menu3.focusLastMenuItem();
          }
        }
      }
    }]);

    return XMenuBarElement;
  }(HTMLElement);

  customElements.define("x-menubar", XMenuBarElement);

  var max$5 = Math.max;

  var easing$4 = "cubic-bezier(0.4, 0, 0.2, 1)";
  var $oldTabIndex$5 = Symbol();

  var shadowTemplate$g = html(_templateObject20);

  // @events
  //   toggle

  var XMenuItemElement = function (_HTMLElement19) {
    _inherits(XMenuItemElement, _HTMLElement19);

    _createClass(XMenuItemElement, [{
      key: "value",


      // @info
      //   Value associated with this menu item (usually the command name).
      // @type
      //   string?
      // @default
      //   null
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : null;
      },
      set: function set(value) {
        if (this.value !== value) {
          value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
        }
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "toggled",
      get: function get() {
        return this.hasAttribute("toggled");
      },
      set: function set(toggled) {
        toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "togglable",
      get: function get() {
        return this.hasAttribute("togglable");
      },
      set: function set(togglable) {
        togglable ? this.setAttribute("togglable", "") : this.removeAttribute("togglable");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   Promise that is resolved when any trigger effects (such ripples or blinking) are finished.
      // @type
      //   Promise

    }, {
      key: "whenTriggerEnd",
      get: function get() {
        var _this59 = this;

        return new Promise(function (resolve) {
          if (_this59["#ripples"].childElementCount === 0 && _this59._blinking === false) {
            resolve();
          } else {
            _this59._triggerEndCallbacks.push(resolve);
          }
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XMenuItemElement() {
      _classCallCheck(this, XMenuItemElement);

      var _this58 = _possibleConstructorReturn(this, (XMenuItemElement.__proto__ || Object.getPrototypeOf(XMenuItemElement)).call(this));

      _this58._observer = new MutationObserver(function () {
        return _this58._updateArrowIconVisibility();
      });

      _this58._blinking = false;
      _this58._triggerEndCallbacks = [];

      _this58._shadowRoot = _this58.attachShadow({ mode: "closed" });
      _this58._shadowRoot.append(document.importNode(shadowTemplate$g.content, true));

      _this58.addEventListener("pointerdown", function (event) {
        return _this58._onPointerDown(event);
      });
      _this58.addEventListener("click", function (event) {
        return _this58._onClick(event);
      });
      _this58.addEventListener("keydown", function (event) {
        return _this58._onKeyDown(event);
      });

      var _iteratorNormalCompletion41 = true;
      var _didIteratorError41 = false;
      var _iteratorError41 = undefined;

      try {
        for (var _iterator41 = _this58._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
          var element = _step41.value;

          _this58["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError41 = true;
        _iteratorError41 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion41 && _iterator41.return) {
            _iterator41.return();
          }
        } finally {
          if (_didIteratorError41) {
            throw _iteratorError41;
          }
        }
      }

      return _this58;
    }

    _createClass(XMenuItemElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._observer.observe(this, { childList: true, attributes: false, characterData: false, subtree: false });
        this._updateArrowIconVisibility();
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateArrowIconVisibility",
      value: function _updateArrowIconVisibility() {
        if (this.parentElement.localName === "x-menubar") {
          this["#arrow-icon"].hidden = true;
        } else {
          var menu = this.querySelector("x-menu");
          this["#arrow-icon"].hidden = menu ? false : true;
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "menuitem");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$5] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$5] > 0 ? this[$oldTabIndex$5] : 0;
          }

          delete this[$oldTabIndex$5];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onPointerDown",
      value: async function _onPointerDown(pointerDownEvent) {
        var _this60 = this;

        if (pointerDownEvent.buttons !== 1) {
          return false;
        }

        if (this.matches("[closing] x-menuitem")) {
          pointerDownEvent.preventDefault();
          pointerDownEvent.stopPropagation();
          return;
        }

        pointerDownEvent.stopPropagation();

        // Trigger effect
        {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            var rect = this["#ripples"].getBoundingClientRect();
            var size = max$5(rect.width, rect.height) * 1.5;
            var top = pointerDownEvent.clientY - rect.y - size / 2;
            var left = pointerDownEvent.clientX - rect.x - size / 2;
            var whenLostPointerCapture = new Promise(function (r) {
              return _this60.addEventListener("lostpointercapture", r, { once: true });
            });

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
            this["#ripples"].append(ripple);

            this.setPointerCapture(pointerDownEvent.pointerId);

            var inAnimation = ripple.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing$4 });

            await whenLostPointerCapture;
            await inAnimation.finished;

            var outAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 300, easing: easing$4 });

            await outAnimation.finished;
            ripple.remove();

            if (this["#ripples"].childElementCount === 0) {
              var _iteratorNormalCompletion42 = true;
              var _didIteratorError42 = false;
              var _iteratorError42 = undefined;

              try {
                for (var _iterator42 = this._triggerEndCallbacks[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
                  var callback = _step42.value;

                  callback();
                }
              } catch (err) {
                _didIteratorError42 = true;
                _iteratorError42 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion42 && _iterator42.return) {
                    _iterator42.return();
                  }
                } finally {
                  if (_didIteratorError42) {
                    throw _iteratorError42;
                  }
                }
              }
            }
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        if (event.button > 0 || event.target.closest("x-menuitem") !== this || event.target.closest("x-menu") !== this.closest("x-menu") || this.matches("[closing] x-menuitem")) {
          return;
        }

        if (this.togglable) {
          var _event = new CustomEvent("toggle", { bubbles: true, cancelable: true });
          this.dispatchEvent(_event);

          if (_event.defaultPrevented === false) {
            this.toggled = !this.toggled;
          }
        }

        // Trigger effect
        {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
              var rect = this["#ripples"].getBoundingClientRect();
              var size = max$5(rect.width, rect.height) * 1.5;
              var top = rect.y + rect.height / 2 - rect.y - size / 2;
              var left = rect.x + rect.width / 2 - rect.x - size / 2;

              var ripple = createElement("div");
              ripple.setAttribute("class", "ripple click-ripple");
              ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
              this["#ripples"].append(ripple);

              var inAnimation = ripple.animate({ transform: ["scale3d(0, 0, 0)", "none"] }, { duration: 300, easing: easing$4 });

              await inAnimation.finished;

              var outAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 300, easing: easing$4 });

              await outAnimation.finished;

              ripple.remove();

              if (this["#ripples"].childElementCount === 0) {
                var _iteratorNormalCompletion43 = true;
                var _didIteratorError43 = false;
                var _iteratorError43 = undefined;

                try {
                  for (var _iterator43 = this._triggerEndCallbacks[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
                    var callback = _step43.value;

                    callback();
                  }
                } catch (err) {
                  _didIteratorError43 = true;
                  _iteratorError43 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion43 && _iterator43.return) {
                      _iterator43.return();
                    }
                  } finally {
                    if (_didIteratorError43) {
                      throw _iteratorError43;
                    }
                  }
                }
              }
            }
          } else if (triggerEffect === "blink") {
            this._blinking = true;

            this.parentElement.focus();
            await sleep(150);
            this.focus();
            await sleep(150);

            this._blinking = true;

            var _iteratorNormalCompletion44 = true;
            var _didIteratorError44 = false;
            var _iteratorError44 = undefined;

            try {
              for (var _iterator44 = this._triggerEndCallbacks[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
                var _callback = _step44.value;

                _callback();
              }
            } catch (err) {
              _didIteratorError44 = true;
              _iteratorError44 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion44 && _iterator44.return) {
                  _iterator44.return();
                }
              } finally {
                if (_didIteratorError44) {
                  throw _iteratorError44;
                }
              }
            }
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();

          if (!this.querySelector("x-menu")) {
            event.stopPropagation();
            this.click();
          }
        }
      }
    }]);

    return XMenuItemElement;
  }(HTMLElement);

  customElements.define("x-menuitem", XMenuItemElement);

  var shadowTemplate$h = html(_templateObject21);

  var XNotificationElement = function (_HTMLElement20) {
    _inherits(XNotificationElement, _HTMLElement20);

    _createClass(XNotificationElement, [{
      key: "opened",


      // @type
      //   boolean
      // @default
      //   false
      get: function get() {
        return this.hasAttribute("opened");
      },
      set: function set(opened) {
        opened === true ? this.setAttribute("opened", "") : this.removeAttribute("opened");
        this._time = 0;
      }

      // @info
      //   Time (in miliseconds) after which this notification should disappear.
      //   Set to 0 to disable the timeout.
      // @type
      //   number
      // @default
      //   0

    }, {
      key: "timeout",
      get: function get() {
        return this.hasAttribute("timeout") ? parseFloat(this.getAttribute("timeout")) : 0;
      },
      set: function set(timeout) {
        this.setAttribute("timeout", timeout);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["opened"];
      }
    }]);

    function XNotificationElement() {
      _classCallCheck(this, XNotificationElement);

      var _this61 = _possibleConstructorReturn(this, (XNotificationElement.__proto__ || Object.getPrototypeOf(XNotificationElement)).call(this));

      _this61._time = 0;

      _this61._shadowRoot = _this61.attachShadow({ mode: "closed" });
      _this61._shadowRoot.append(document.importNode(shadowTemplate$h.content, true));

      var _iteratorNormalCompletion45 = true;
      var _didIteratorError45 = false;
      var _iteratorError45 = undefined;

      try {
        for (var _iterator45 = _this61._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
          var element = _step45.value;

          _this61["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError45 = true;
        _iteratorError45 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion45 && _iterator45.return) {
            _iterator45.return();
          }
        } finally {
          if (_didIteratorError45) {
            throw _iteratorError45;
          }
        }
      }

      return _this61;
    }

    _createClass(XNotificationElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("tabindex", "0");
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "opened") {
          this.opened ? this._onOpen() : this._onClose();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onOpen",
      value: function _onOpen() {
        var _this62 = this;

        // Animate in
        {
          var fromBottom = 0 - this.getBoundingClientRect().height - 10 + "px";
          var toBottom = getComputedStyle(this).bottom;

          var inAnimation = this.animate({ bottom: [fromBottom, toBottom] }, { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });

          // await inAnimation.finished;
        }

        // Automatically close the notification after given timeout
        {
          this._time = 0;

          this._intervalID = setInterval(function () {
            _this62._time += 100;

            if (_this62.timeout > 0 && _this62._time > _this62.timeout) {
              _this62.opened = false;
            }
          }, 100);

          var openTimeStamp = getTimeStamp();

          window.addEventListener("pointerdown", this._windowPointerDownListener = function (event) {
            var pointerDownTimeStamp = getTimeStamp();
            var bounds = _this62.getBoundingClientRect();

            if (pointerDownTimeStamp - openTimeStamp > 10 && rectContainsPoint(bounds, new DOMPoint(event.clientX, event.clientY)) === false) {
              _this62.opened = false;
            }
          }, true);
        }
      }
    }, {
      key: "_onClose",
      value: async function _onClose() {
        clearInterval(this._intervalID);

        // Animate out
        {
          this.setAttribute("animating", "");
          var fromBottom = getComputedStyle(this).bottom;
          var toBottom = 0 - this.getBoundingClientRect().height - 10 + "px";

          var inAnimation = this.animate({ bottom: [fromBottom, toBottom] }, { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });

          await inAnimation.finished;
          this.removeAttribute("animating");
        }

        window.removeEventListener("pointerdown", this._windowPointerDownListener, true);
      }
    }]);

    return XNotificationElement;
  }(HTMLElement);

  customElements.define("x-notification", XNotificationElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  var isFinite$1 = Number.isFinite,
      isNaN = Number.isNaN,
      parseFloat$2 = Number.parseFloat;

  // @info
  //   Convert the first letter in the given string from lowercase to uppercase.
  // @type
  //   (string) => void

  var capitalize = function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
  };

  // @info
  //   Replace every occurance of string A with string B.
  // @type
  //   (string, string, string) => string
  var replaceAll = function replaceAll(text, a, b) {
    return text.split(a).join(b);
  };

  // @info
  //   Check if given string is a whitespace string as defined by DOM spec.
  // @type
  //   (string) => boolean
  // @src
  //   https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Whitespace_in_the_DOM
  var isDOMWhitespace = function isDOMWhitespace(string) {
    return !/[^\t\n\r ]/.test(string);
  };

  // @info
  //   Returns true if the passed argument is either a number or a string that represents a number.
  // @type
  //   (any) => boolean
  var isNumeric = function isNumeric(value) {
    var number = parseFloat$2(value);
    return isNaN(number) === false && isFinite$1(number);
  };

  var isFinite$2 = Number.isFinite;

  var numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", ",", "."];
  var $oldTabIndex$6 = Symbol();

  var shadowTemplate$i = html(_templateObject22);

  // @events
  //   change
  //   changestart
  //   changeend
  //   textinputmodestart
  //   textinputmodeend

  var XNumberInputElement = function (_HTMLElement21) {
    _inherits(XNumberInputElement, _HTMLElement21);

    _createClass(XNumberInputElement, [{
      key: "value",


      // @type
      //   number?
      // @default
      //   null
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? parseFloat(this.getAttribute("value")) : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @type
      //   number
      // @default
      //   -Infinity
      // @attribute

    }, {
      key: "min",
      get: function get() {
        return this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : -Infinity;
      },
      set: function set(min) {
        isFinite$2(min) ? this.setAttribute("min", min) : this.removeAttribute("min");
      }

      // @type
      //   number
      // @default
      //   Infinity
      // @attribute

    }, {
      key: "max",
      get: function get() {
        return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : Infinity;
      },
      set: function set(max) {
        isFinite$2(max) ? this.setAttribute("max", max) : this.removeAttribute("max");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",


      // @info
      //   Whether this input has "mixed" state.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "precision",


      // @info
      //   Maximal number of digits to be shown after the dot. This setting affects only the display value.
      // @type
      //   number
      // @default
      //   20
      // @attribute
      get: function get() {
        return this.hasAttribute("precision") ? parseFloat(this.getAttribute("precision")) : 20;
      },
      set: function set(value) {
        this.setAttribute("precision", value);
      }

      // @info
      //   Number by which value should be incremented or decremented when up or down arrow key is pressed.
      // @type
      //   number
      // @default
      //   1
      // @attribute

    }, {
      key: "step",
      get: function get() {
        return this.hasAttribute("step") ? parseFloat(this.getAttribute("step")) : 1;
      },
      set: function set(step) {
        this.setAttribute("step", step);
      }

      // @type
      //   string
      // @default
      //   ""
      // @attribute

    }, {
      key: "prefix",
      get: function get() {
        return this.hasAttribute("prefix") ? this.getAttribute("prefix") : "";
      },
      set: function set(prefix) {
        this.setAttribute("prefix", prefix);
      }

      // @type
      //   string
      // @default
      //   ""
      // @attribute

    }, {
      key: "suffix",
      get: function get() {
        return this.hasAttribute("suffix") ? this.getAttribute("suffix") : "";
      },
      set: function set(suffix) {
        this.setAttribute("suffix", suffix);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "required",
      get: function get() {
        return this.hasAttribute("required");
      },
      set: function set(required) {
        required ? this.setAttribute("required", "") : this.removeAttribute("required");
      }
    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @type
      //   string?
      // @default
      //   null
      // @attribute

    }, {
      key: "error",
      get: function get() {
        return this.getAttribute("error");
      },
      set: function set(error) {
        error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "min", "max", "prefix", "suffix", "disabled"];
      }
    }]);

    function XNumberInputElement() {
      _classCallCheck(this, XNumberInputElement);

      var _this63 = _possibleConstructorReturn(this, (XNumberInputElement.__proto__ || Object.getPrototypeOf(XNumberInputElement)).call(this));

      _this63._isDragging = false;
      _this63._isChangeStart = false;
      _this63._isArrowKeyDown = false;
      _this63._isBackspaceKeyDown = false;
      _this63._isStepperButtonDown = false;

      _this63._maybeDispatchChangeEndEvent = debounce(_this63._maybeDispatchChangeEndEvent, 500, _this63);

      _this63._shadowRoot = _this63.attachShadow({ mode: "closed", delegatesFocus: true });
      _this63._shadowRoot.append(document.importNode(shadowTemplate$i.content, true));

      var _iteratorNormalCompletion46 = true;
      var _didIteratorError46 = false;
      var _iteratorError46 = undefined;

      try {
        for (var _iterator46 = _this63._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
          var element = _step46.value;

          _this63["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError46 = true;
        _iteratorError46 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion46 && _iterator46.return) {
            _iterator46.return();
          }
        } finally {
          if (_didIteratorError46) {
            throw _iteratorError46;
          }
        }
      }

      _this63._shadowRoot.addEventListener("pointerdown", function (event) {
        return _this63._onShadowRootPointerDown(event);
      });
      _this63._shadowRoot.addEventListener("wheel", function (event) {
        return _this63._onWheel(event);
      });
      _this63["#editor"].addEventListener("paste", function (event) {
        return _this63._onPaste(event);
      });
      _this63["#editor"].addEventListener("input", function (event) {
        return _this63._onEditorInput(event);
      });
      _this63.addEventListener("pointerdown", function (event) {
        return _this63._onPointerDown(event);
      });
      _this63.addEventListener("keydown", function (event) {
        return _this63._onKeyDown(event);
      });
      _this63.addEventListener("keyup", function (event) {
        return _this63._onKeyUp(event);
      });
      _this63.addEventListener("keypress", function (event) {
        return _this63._onKeyPress(event);
      });
      _this63.addEventListener("incrementstart", function (event) {
        return _this63._onStepperIncrementStart(event);
      });
      _this63.addEventListener("decrementstart", function (event) {
        return _this63._onStepperDecrementStart(event);
      });
      _this63.addEventListener("focusin", function (event) {
        return _this63._onFocusIn(event);
      });
      _this63.addEventListener("focusout", function (event) {
        return _this63._onFocusOut(event);
      });
      return _this63;
    }

    _createClass(XNumberInputElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();

        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "min") {
          this._onMinAttributeChange();
        } else if (name === "max") {
          this._onMaxAttributeChange();
        } else if (name === "prefix") {
          this._onPrefixAttributeChange();
        } else if (name === "suffix") {
          this._onSuffixAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      // @info
      //   Override this method to validate the input value manually.
      // @type
      //   () => void

    }, {
      key: "validate",
      value: function validate() {
        if (this.value < this.min) {
          this.error = "Value is too low";
        } else if (this.value > this.max) {
          this.error = "Value is too high";
        } else if (this.required && this.value === null) {
          this.error = "This field is required";
        } else {
          this.error = null;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_increment",
      value: function _increment() {
        var large = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var oldValue = this.value;
        var newValue = this.value;

        if (large) {
          newValue += this.step * 10;
        } else {
          newValue += this.step;
        }

        newValue = normalize(newValue, this.min, this.max, getPrecision(this.step));

        if (oldValue !== newValue) {
          this.value = newValue;
        }

        if (this.matches(":focus")) {
          document.execCommand("selectAll");
        }

        this.validate();
        this._updateState();
      }
    }, {
      key: "_decrement",
      value: function _decrement() {
        var large = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var oldValue = this.value;
        var newValue = this.value;

        if (large) {
          newValue -= this.step * 10;
        } else {
          newValue -= this.step;
        }

        newValue = normalize(newValue, this.min, this.max, getPrecision(this.step));

        if (oldValue !== newValue) {
          this.value = newValue;
        }

        if (this.matches(":focus")) {
          document.execCommand("selectAll");
        }

        this.validate();
        this._updateState();
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_maybeDispatchChangeStartEvent",
      value: function _maybeDispatchChangeStartEvent() {
        if (!this._isChangeStart) {
          this._isChangeStart = true;
          this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));
        }
      }
    }, {
      key: "_maybeDispatchChangeEndEvent",
      value: function _maybeDispatchChangeEndEvent() {
        if (this._isChangeStart && !this._isArrowKeyDown && !this._isBackspaceKeyDown && !this._isStepperButtonDown) {
          this._isChangeStart = false;
          this.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
        }
      }
    }, {
      key: "_commitEditorChanges",
      value: function _commitEditorChanges() {
        var editorValue = this["#editor"].textContent.trim() === "" ? null : parseFloat(this["#editor"].textContent);
        editorValue = normalize(editorValue, this.min, this.max);

        if (editorValue !== this.value) {
          this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));
          this.value = editorValue;
          this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          this.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this.validate();

        this._updateEditorTextContent();
        this._updateState();
        this._updateStepper();
      }
    }, {
      key: "_updateEditorTextContent",
      value: function _updateEditorTextContent() {
        if (this.hasAttribute("value")) {
          this["#editor"].textContent = this.getAttribute("value").trim();
        } else {
          this["#editor"].textContent = "";
        }
      }
    }, {
      key: "_updateState",
      value: function _updateState() {
        if (this.value === null) {
          this.setAttribute("empty", "");
        } else {
          this.removeAttribute("empty");
        }
      }
    }, {
      key: "_updateStepper",
      value: function _updateStepper() {
        var stepper = this.querySelector("x-stepper");

        if (stepper) {
          var canDecrement = this.value > this.min;
          var canIncrement = this.value < this.max;

          if (canIncrement === true && canDecrement === true) {
            stepper.removeAttribute("disabled");
          } else if (canIncrement === false && canDecrement === false) {
            stepper.setAttribute("disabled", "");
          } else if (canIncrement === false) {
            stepper.setAttribute("disabled", "increment");
          } else if (canDecrement === false) {
            stepper.setAttribute("disabled", "decrement");
          }
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "input");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$6] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$6] > 0 ? this[$oldTabIndex$6] : 0;
          }

          delete this[$oldTabIndex$6];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this._update();
      }
    }, {
      key: "_onMinAttributeChange",
      value: function _onMinAttributeChange() {
        this._updateStepper();
      }
    }, {
      key: "_onMaxAttributeChange",
      value: function _onMaxAttributeChange() {
        this._updateStepper();
      }
    }, {
      key: "_onPrefixAttributeChange",
      value: function _onPrefixAttributeChange() {
        this["#editor"].setAttribute("data-prefix", this.prefix);
      }
    }, {
      key: "_onSuffixAttributeChange",
      value: function _onSuffixAttributeChange() {
        this["#editor"].setAttribute("data-suffix", this.suffix);
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this["#editor"].disabled = this.disabled;
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onFocusIn",
      value: function _onFocusIn() {
        document.execCommand("selectAll");
        this.dispatchEvent(new CustomEvent("textinputmodestart", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut() {
        this._shadowRoot.getSelection().collapse(this["#main"]);
        this._commitEditorChanges();
        this.dispatchEvent(new CustomEvent("textinputmodeend", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onEditorInput",
      value: function _onEditorInput() {
        this.validate();
        this._updateState();
        this._updateStepper();
      }
    }, {
      key: "_onWheel",
      value: function _onWheel(event) {
        if (this.matches(":focus")) {
          event.preventDefault();
          this._maybeDispatchChangeStartEvent();

          if (event.wheelDeltaX > 0 || event.wheelDeltaY > 0) {
            this._increment(event.shiftKey);
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          } else {
            this._decrement(event.shiftKey);
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }

          this._maybeDispatchChangeEndEvent();
        }
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        event.preventDefault();
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(pointerDownEvent) {
        if (pointerDownEvent.target.localName === "x-stepper") {
          // Don't focus the input when user clicks stepper
          pointerDownEvent.preventDefault();
        }
      }
    }, {
      key: "_onShadowRootPointerDown",
      value: function _onShadowRootPointerDown(pointerDownEvent) {
        var _this64 = this;

        if (pointerDownEvent.buttons !== 1 || pointerDownEvent.isPrimary === false) {
          pointerDownEvent.preventDefault();
          return;
        }

        if (pointerDownEvent.target === this["#editor"]) {
          if (this["#editor"].matches(":focus") === false) {
            pointerDownEvent.preventDefault();

            var initialValue = this.value;
            var cachedClientX = null;
            var pointerMoveListener = void 0,
                _lostPointerCaptureListener6 = void 0;

            this.style.cursor = "col-resize";
            this["#editor"].setPointerCapture(pointerDownEvent.pointerId);

            this["#editor"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
              if (pointerMoveEvent.clientX === cachedClientX || pointerMoveEvent.isPrimary === false) {
                return;
              }

              if (_this64._isDragging === false) {
                _this64._isDragging = true;
                _this64._isChangeStart = true;
                _this64.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));
              }

              cachedClientX = pointerMoveEvent.clientX;

              var dragOffset = pointerMoveEvent.clientX - pointerDownEvent.clientX;

              var value = initialValue + dragOffset * _this64.step;
              value = normalize(value, _this64.min, _this64.max, getPrecision(_this64.step));
              _this64.value = value;
              _this64.dispatchEvent(new CustomEvent("change", { bubbles: true }));
            });

            this["#editor"].addEventListener("lostpointercapture", _lostPointerCaptureListener6 = function lostPointerCaptureListener() {
              _this64["#editor"].removeEventListener("pointermove", pointerMoveListener);
              _this64["#editor"].removeEventListener("lostpointercapture", _lostPointerCaptureListener6);

              _this64.style.cursor = null;

              if (_this64._isDragging === true) {
                _this64._isDragging = false;
                _this64._isChangeStart = false;
                _this64.dispatchEvent(new CustomEvent("changeend", { detail: _this64.value !== initialValue, bubbles: true }));
              } else {
                _this64["#editor"].focus();
                document.execCommand("selectAll");
              }
            });
          }
        }
      }
    }, {
      key: "_onStepperIncrementStart",
      value: function _onStepperIncrementStart(event) {
        var _this65 = this;

        var incrementListener = void 0,
            _incrementEndListener = void 0;

        this._isStepperButtonDown = true;

        this.addEventListener("increment", incrementListener = function incrementListener(event) {
          _this65._maybeDispatchChangeStartEvent();
          _this65._increment(event.detail.shiftKey);
          _this65.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          _this65._maybeDispatchChangeEndEvent();
          _this65._update();
        });

        this.addEventListener("incrementend", _incrementEndListener = function incrementEndListener(event) {
          _this65._isStepperButtonDown = false;
          _this65.removeEventListener("increment", incrementListener);
          _this65.removeEventListener("incrementend", _incrementEndListener);
        });
      }
    }, {
      key: "_onStepperDecrementStart",
      value: function _onStepperDecrementStart(event) {
        var _this66 = this;

        var decrementListener = void 0,
            _decrementEndListener = void 0;

        this._isStepperButtonDown = true;

        this.addEventListener("decrement", decrementListener = function decrementListener(event) {
          _this66._maybeDispatchChangeStartEvent();
          _this66._decrement(event.detail.shiftKey);
          _this66.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          _this66._maybeDispatchChangeEndEvent();

          _this66._update();
        });

        this.addEventListener("decrementend", _decrementEndListener = function decrementEndListener(event) {
          _this66._isStepperButtonDown = false;
          _this66.removeEventListener("decrement", decrementListener);
          _this66.removeEventListener("decrementend", _decrementEndListener);
        });
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "ArrowDown") {
          event.preventDefault();

          this._isArrowKeyDown = true;
          this._maybeDispatchChangeStartEvent();
          this._decrement(event.shiftKey);
          this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          this._maybeDispatchChangeEndEvent();

          this._update();
        } else if (event.code === "ArrowUp") {
          event.preventDefault();

          this._isArrowKeyDown = true;
          this._maybeDispatchChangeStartEvent();
          this._increment(event.shiftKey);
          this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          this._maybeDispatchChangeEndEvent();

          this._update();
        } else if (event.code === "Backspace") {
          this._isBackspaceKeyDown = true;
        } else if (event.code === "Enter") {
          this._commitEditorChanges();
          document.execCommand("selectAll");
        }
      }
    }, {
      key: "_onKeyUp",
      value: function _onKeyUp(event) {
        if (event.code === "ArrowDown") {
          this._isArrowKeyDown = false;
          this._maybeDispatchChangeEndEvent();
        } else if (event.code === "ArrowUp") {
          this._isArrowKeyDown = false;
          this._maybeDispatchChangeEndEvent();
        } else if (event.code === "Backspace") {
          this._isBackspaceKeyDown = false;
        }
      }
    }, {
      key: "_onKeyPress",
      value: function _onKeyPress(event) {
        if (numericKeys.includes(event.key) === false) {
          event.preventDefault();
        }
      }
    }, {
      key: "_onPaste",
      value: async function _onPaste(event) {
        // Allow only for pasting numeric text
        event.preventDefault();
        var content = event.clipboardData.getData("text/plain").trim();

        if (isNumeric(content)) {
          // @bugfix: https://github.com/nwjs/nw.js/issues/3403
          await sleep(1);

          document.execCommand("insertText", false, content);
        }
      }
    }]);

    return XNumberInputElement;
  }(HTMLElement);

  customElements.define("x-numberinput", XNumberInputElement);

  var shadowTemplate$j = html(_templateObject23);

  // @events
  //   open
  //   close

  var XPopoverElement = function (_HTMLElement22) {
    _inherits(XPopoverElement, _HTMLElement22);

    _createClass(XPopoverElement, [{
      key: "opened",


      // @type
      //   boolean
      // @readonly
      // @attribute
      get: function get() {
        return this.hasAttribute("opened");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "modal",
      get: function get() {
        return this.hasAttribute("modal");
      },
      set: function set(modal) {
        modal ? this.setAttribute("modal", "") : this.removeAttribute("modal");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["modal"];
      }
    }]);

    function XPopoverElement() {
      _classCallCheck(this, XPopoverElement);

      var _this67 = _possibleConstructorReturn(this, (XPopoverElement.__proto__ || Object.getPrototypeOf(XPopoverElement)).call(this));

      _this67._shadowRoot = _this67.attachShadow({ mode: "closed" });
      _this67._shadowRoot.append(document.importNode(shadowTemplate$j.content, true));

      var _iteratorNormalCompletion47 = true;
      var _didIteratorError47 = false;
      var _iteratorError47 = undefined;

      try {
        for (var _iterator47 = _this67._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
          var element = _step47.value;

          _this67["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError47 = true;
        _iteratorError47 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion47 && _iterator47.return) {
            _iterator47.return();
          }
        } finally {
          if (_didIteratorError47) {
            throw _iteratorError47;
          }
        }
      }

      _this67["#backdrop"] = createElement("x-backdrop");
      _this67["#backdrop"].style.background = "rgba(0, 0, 0, 0)";
      _this67["#backdrop"].ownerElement = _this67;
      return _this67;
    }

    _createClass(XPopoverElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.tabIndex = -1;
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "modal") {
          this._onModalAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Open the popover next to the given element.
      //   Returns a promise that is resolved when the popover finishes animating.
      // @type
      //   (XButtonElement, string) => Promise

    }, {
      key: "open",
      value: function open(button) {
        var _this68 = this;

        return new Promise(async function (resolve) {
          var computedStyle = getComputedStyle(_this68);

          var align = computedStyle.getPropertyValue("--align").trim();
          var marginTop = parseFloat(computedStyle.marginTop);
          var marginBottom = parseFloat(computedStyle.marginBottom);
          var marginLeft = parseFloat(computedStyle.marginLeft);
          var marginRight = parseFloat(computedStyle.marginRight);

          var extraLeft = 0; // Extra offset needed when popover has fixed-positioned ancestor(s)
          var extraTop = 0; // Extra offset needed when popover has fixed-positioned ancestor(s)
          var windowWhitespace = 8; // Minimal whitespace between popover and window bounds
          var arrowWhitespace = 2; // Minimal whitespace between popover and arrow

          _this68.style.left = "0px";
          _this68.style.top = "0px";
          _this68.style.width = null;
          _this68.style.height = null;

          _this68.setAttribute("opened", "");

          if (_this68.modal) {
            _this68["#backdrop"].show(false);
          }

          // Determine extraLeft and extraTop which represent the extra offset when the popover is inside another
          // fixed-positioned element.
          {
            var popoverBounds = roundRect(_this68.getBoundingClientRect());

            if (popoverBounds.top !== 0 || popoverBounds.left !== 0) {
              extraLeft = -popoverBounds.left;
              extraTop = -popoverBounds.top;
            }
          }

          // Make the arrow look consistentaly with the popover
          {
            var _getComputedStyle2 = getComputedStyle(_this68),
                backgroundColor = _getComputedStyle2.backgroundColor,
                borderColor = _getComputedStyle2.borderColor,
                borderWidth = _getComputedStyle2.borderWidth;

            _this68["#arrow"].setAttribute("data-align", align);
            _this68["#arrow-path"].style.fill = backgroundColor;
            _this68["#arrow-path"].style.stroke = borderColor;
            _this68["#arrow-path"].style.strokeWidth = borderWidth + "px";
          }

          if (align === "bottom") {
            var buttonBounds = roundRect(button.getBoundingClientRect());
            var _popoverBounds = roundRect(_this68.getBoundingClientRect());
            var arrowBounds = roundRect(_this68["#arrow"].getBoundingClientRect());
            var _borderWidth = parseFloat(getComputedStyle(_this68).borderWidth);

            // Place the popover below the button
            {
              _this68.style.top = buttonBounds.bottom + arrowBounds.height + arrowWhitespace + extraTop + "px";
              _this68["#arrow"].style.top = buttonBounds.bottom + arrowWhitespace + _borderWidth + extraTop + "px";
              _this68["#arrow-path"].style.d = "path(\"M 0 100, L 50 0, L 100 100\")";
              _popoverBounds = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows bottom client bound, reduce its height (respecting min-height)
            if (_popoverBounds.bottom + windowWhitespace > window.innerHeight) {
              var reducedHeight = window.innerHeight - _popoverBounds.top - windowWhitespace;
              var minHeight = parseFloat(getComputedStyle(_this68).minHeight);

              if (reducedHeight >= minHeight) {
                _this68.style.height = reducedHeight + "px";
                _popoverBounds = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popover still overflows bottom client bound, place it above the button
            if (_popoverBounds.bottom + windowWhitespace > window.innerHeight) {
              _this68.style.top = buttonBounds.top - arrowWhitespace - arrowBounds.height - _popoverBounds.height + extraTop + "px";

              _this68["#arrow"].style.top = buttonBounds.top - arrowWhitespace - arrowBounds.height - _borderWidth + extraTop + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 50 100, L 100 0\")";
              _popoverBounds = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows top client bound, reduce its height (respecting min-height)
            if (_popoverBounds.top - windowWhitespace < 0) {
              var _reducedHeight = buttonBounds.top - arrowWhitespace - arrowBounds.height - windowWhitespace;
              var _minHeight = parseFloat(getComputedStyle(_this68).minHeight);

              if (_reducedHeight >= _minHeight) {
                _this68.style.top = windowWhitespace + extraTop + "px";
                _this68.style.height = _reducedHeight + "px";
                _popoverBounds = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popoever still overflows top client bound, place it back below the button
            if (_popoverBounds.top - windowWhitespace < 0) {
              _this68.style.top = buttonBounds.bottom + arrowBounds.height + arrowWhitespace + extraTop + "px";
              _this68["#arrow"].style.top = buttonBounds.bottom + arrowWhitespace + _borderWidth + extraTop + "px";
              _this68["#arrow-path"].style.d = "path(\"M 0 100, L 50 0, L 100 100\")";
            }
          } else if (align === "top") {
            var _buttonBounds = roundRect(button.getBoundingClientRect());
            var _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
            var _arrowBounds = roundRect(_this68["#arrow"].getBoundingClientRect());
            var _borderWidth2 = parseFloat(getComputedStyle(_this68).borderWidth);

            // Place the popover above the button
            {
              _this68.style.top = _buttonBounds.top - arrowWhitespace - _arrowBounds.height - _popoverBounds2.height + extraTop + "px";

              _this68["#arrow"].style.top = _buttonBounds.top - arrowWhitespace - _arrowBounds.height - _borderWidth2 + extraTop + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 50 100, L 100 0\")";
              _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows top client bound, reduce its height (respecting min-height)
            if (_popoverBounds2.top - windowWhitespace < 0) {
              var _reducedHeight2 = _buttonBounds.top - arrowWhitespace - _arrowBounds.height - windowWhitespace;
              var _minHeight2 = parseFloat(getComputedStyle(_this68).minHeight);

              if (_reducedHeight2 >= _minHeight2) {
                _this68.style.top = windowWhitespace + extraTop + "px";
                _this68.style.height = _reducedHeight2 + "px";
                _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popoever still overflows top client bound, place it below the button
            if (_popoverBounds2.top - windowWhitespace < 0) {
              _this68.style.top = _buttonBounds.bottom + _arrowBounds.height + arrowWhitespace + extraTop + "px";
              _this68["#arrow"].style.top = _buttonBounds.bottom + arrowWhitespace + _borderWidth2 + extraTop + "px";
              _this68["#arrow-path"].style.d = "path(\"M 0 100, L 50 0, L 100 100\")";
              _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows bottom client bound, reduce its height (respecting min-height)
            if (_popoverBounds2.bottom + windowWhitespace > window.innerHeight) {
              var _reducedHeight3 = window.innerHeight - _popoverBounds2.top - windowWhitespace;
              var _minHeight3 = parseFloat(getComputedStyle(_this68).minHeight);

              if (_reducedHeight3 >= _minHeight3) {
                _this68.style.height = _reducedHeight3 + "px";
                _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popover still overflows bottom client bound, move it back above the button
            if (_popoverBounds2.bottom + windowWhitespace > window.innerHeight) {
              _this68.style.top = _buttonBounds.top - arrowWhitespace - _arrowBounds.height - _popoverBounds2.height + extraTop + "px";

              _this68["#arrow"].style.top = _buttonBounds.top - arrowWhitespace - _arrowBounds.height - _borderWidth2 + extraTop + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 50 100, L 100 0\")";
              _popoverBounds2 = roundRect(_this68.getBoundingClientRect());
            }
          } else if (align === "left") {
            var _buttonBounds2 = roundRect(button.getBoundingClientRect());
            var _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
            var _arrowBounds2 = roundRect(_this68["#arrow"].getBoundingClientRect());
            var _borderWidth3 = parseFloat(getComputedStyle(_this68).borderWidth);

            // Place the popover on the left side of the button
            {
              _this68.style.left = _buttonBounds2.left - arrowWhitespace - _arrowBounds2.width - _popoverBounds3.width + extraLeft + "px";

              _this68["#arrow"].style.left = _buttonBounds2.left - _arrowBounds2.width - arrowWhitespace - _borderWidth3 + extraLeft + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 100 50, L 00 100\")";
              _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows left client bound, reduce its width (respecting min-width)
            if (_popoverBounds3.left - windowWhitespace < 0) {
              var reducedWidth = _buttonBounds2.left - arrowWhitespace - _arrowBounds2.height - windowWhitespace;
              var minWidth = parseFloat(getComputedStyle(_this68).minWidth);

              if (reducedWidth >= minWidth) {
                _this68.style.left = windowWhitespace + extraLeft + "px";
                _this68.style.width = reducedWidth + "px";
                _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popoever still overflows left client bound, place it on the right side of the button
            if (_popoverBounds3.left - windowWhitespace < 0) {
              _this68.style.left = _buttonBounds2.right + _arrowBounds2.height + arrowWhitespace + extraLeft + "px";
              _this68["#arrow"].style.top = _buttonBounds2.right + arrowWhitespace + _borderWidth3 + extraLeft + "px";
              _this68["#arrow-path"].style.d = "path(\"M 0 100, L 50 0, L 100 100\")";
              _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows right client bound, reduce its width (respecting min-width)
            if (_popoverBounds3.right + windowWhitespace > window.innerWidth) {
              var _reducedWidth = window.innerWidth - _popoverBounds3.left - windowWhitespace;
              var _minWidth = parseFloat(getComputedStyle(_this68).minWidth);

              if (_reducedWidth >= _minWidth) {
                _this68.style.width = _reducedWidth + "px";
                _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popover still overflows right client bound, move it back to the left side of the button
            if (_popoverBounds3.right + windowWhitespace > window.innerWidth) {
              _this68.style.left = _buttonBounds2.left - arrowWhitespace - _arrowBounds2.width - _popoverBounds3.width + extraLeft + "px";

              _this68["#arrow"].style.elft = _buttonBounds2.left - arrowWhitespace - _arrowBounds2.width - _borderWidth3 + extraLeft + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 100 50, L 00 100\")";
              _popoverBounds3 = roundRect(_this68.getBoundingClientRect());
            }
          } else if (align === "right") {
            var _buttonBounds3 = roundRect(button.getBoundingClientRect());
            var _popoverBounds4 = roundRect(_this68.getBoundingClientRect());
            var _arrowBounds3 = roundRect(_this68["#arrow"].getBoundingClientRect());
            var _borderWidth4 = parseFloat(getComputedStyle(_this68).borderWidth);

            // Place the popover on the right side of the button
            {
              _this68.style.left = _buttonBounds3.right + _arrowBounds3.width + arrowWhitespace + extraLeft + "px";
              _this68["#arrow"].style.left = _buttonBounds3.right + arrowWhitespace + _borderWidth4 + extraLeft + "px";
              _this68["#arrow-path"].style.d = "path(\"M 100 0, L 0 50, L 100 100\")";
              _popoverBounds4 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows right client bound, reduce its width (respecting min-width)
            if (_popoverBounds4.right + windowWhitespace > window.innerWidth) {
              var _reducedWidth2 = window.innerWidth - _popoverBounds4.left - windowWhitespace;
              var _minWidth2 = parseFloat(getComputedStyle(_this68).minWidth);

              if (_reducedWidth2 >= _minWidth2) {
                _this68.style.width = _reducedWidth2 + "px";
                _popoverBounds4 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popover still overflows right client bound, place it on the left side of the button
            if (_popoverBounds4.right + windowWhitespace > window.innerWidth) {
              _this68.style.left = _buttonBounds3.left - arrowWhitespace - _arrowBounds3.width - _popoverBounds4.width + extraLeft + "px";

              _this68["#arrow"].style.left = _buttonBounds3.left - arrowWhitespace - _arrowBounds3.width - _borderWidth4 + extraLeft + "px";

              _this68["#arrow-path"].style.d = "path(\"M 0 0, L 50 100, L 100 0\")";
              _popoverBounds4 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows left client bound, reduce its width (respecting min-width)
            if (_popoverBounds4.left - windowWhitespace < 0) {
              var _reducedWidth3 = _buttonBounds3.left - arrowWhitespace - _arrowBounds3.width - windowWhitespace;
              var _minWidth3 = parseFloat(getComputedStyle(_this68).minWidth);

              if (_reducedWidth3 >= _minWidth3) {
                _this68.style.left = windowWhitespace + extraLeft + "px";
                _this68.style.width = _reducedWidth3 + "px";
                _popoverBounds4 = roundRect(_this68.getBoundingClientRect());
              }
            }

            // If popoever still overflows left client bound, place it back on the right side of the button
            if (_popoverBounds4.left - windowWhitespace < 0) {
              _this68.style.left = _buttonBounds3.right + _arrowBounds3.width + arrowWhitespace + extraLeft + "px";
              _this68["#arrow"].style.left = _buttonBounds3.right + arrowWhitespace + _borderWidth4 + extraLeft + "px";
              _this68["#arrow-path"].style.d = "path(\"M 100 0, L 0 50, L 100 100\")";
            }
          }

          if (align === "bottom" || align === "top") {
            var _buttonBounds4 = roundRect(button.getBoundingClientRect());
            var _popoverBounds5 = roundRect(_this68.getBoundingClientRect());
            var _arrowBounds4 = roundRect(_this68["#arrow"].getBoundingClientRect());

            // Place the popover along the same X-axis as the button
            {
              _this68.style.left = _buttonBounds4.left + _buttonBounds4.width / 2 - _popoverBounds5.width / 2 + extraLeft + "px";
              _this68["#arrow"].style.left = _buttonBounds4.left + _buttonBounds4.width / 2 + extraLeft + "px";

              _popoverBounds5 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows left client bound, move it right
            if (_popoverBounds5.left - windowWhitespace < 0) {
              _this68.style.left = windowWhitespace + extraLeft + "px";
              _popoverBounds5 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows right client bound, move it left
            if (_popoverBounds5.right + windowWhitespace > window.innerWidth) {
              _this68.style.left = window.innerWidth - windowWhitespace - _popoverBounds5.width + extraLeft + "px";
              _popoverBounds5 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover still overflows left client bound, reduce its width
            if (_popoverBounds5.left < windowWhitespace) {
              _this68.style.left = windowWhitespace + extraLeft + "px";
              _this68.style.width = window.innerWidth - windowWhitespace - windowWhitespace + "px";
            }
          } else if (align === "left" || align === "right") {
            var _buttonBounds5 = roundRect(button.getBoundingClientRect());
            var _popoverBounds6 = roundRect(_this68.getBoundingClientRect());

            // Place the popover along the same Y-axis as the button
            {
              _this68.style.top = _buttonBounds5.top + _buttonBounds5.height / 2 - _popoverBounds6.height / 2 + extraTop + "px";
              _this68["#arrow"].style.top = _buttonBounds5.top + _buttonBounds5.height / 2 + extraTop + marginTop + "px";
              _popoverBounds6 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows top client bound, move it down
            if (_popoverBounds6.top - windowWhitespace < 0) {
              _this68.style.top = windowWhitespace + extraTop + marginTop + "px";
              _popoverBounds6 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover overflows bottom client bound, move it up
            if (_popoverBounds6.bottom + windowWhitespace > window.innerHeight) {
              var overflowBottom = _popoverBounds6.bottom + windowWhitespace - window.innerHeight;
              _this68.style.top = _popoverBounds6.top - overflowBottom + extraTop + "px";
              _popoverBounds6 = roundRect(_this68.getBoundingClientRect());
            }

            // If popover still overflows top client bound, reduce its size
            if (_popoverBounds6.top < windowWhitespace) {
              _this68.style.top = windowWhitespace + extraTop + "px";
              _this68.style.height = window.innerHeight - windowWhitespace - windowWhitespace + "px";
            }
          }

          // Animate the popover
          {
            var transition = getComputedStyle(_this68).getPropertyValue("--open-transition");

            var _parseTransistion12 = _this68._parseTransistion(transition),
                _parseTransistion13 = _slicedToArray(_parseTransistion12, 3),
                property = _parseTransistion13[0],
                duration = _parseTransistion13[1],
                _easing6 = _parseTransistion13[2];

            if (property === "transform") {
              await _this68.animate({
                transform: ["scale(1, 0)", "scale(1, 1)"],
                transformOrigin: ["0 0", "0 0"]
              }, { duration: duration, easing: _easing6 }).finished;
            }
          }

          _this68.dispatchEvent(new CustomEvent("open", { bubbles: true, detail: _this68 }));
          resolve();
        });
      }

      // @info
      //   Close the popover.
      //   Returns a promise that is resolved when the popover finishes animating.
      // @type
      //   (boolean) => Promise

    }, {
      key: "close",
      value: function close() {
        var _this69 = this;

        return new Promise(async function (resolve) {
          if (_this69.opened) {
            _this69.removeAttribute("opened");
            _this69.setAttribute("animating", "");
            _this69["#backdrop"].hide();
            _this69.dispatchEvent(new CustomEvent("close", { bubbles: true, detail: _this69 }));

            var transition = getComputedStyle(_this69).getPropertyValue("--close-transition");

            var _parseTransistion14 = _this69._parseTransistion(transition),
                _parseTransistion15 = _slicedToArray(_parseTransistion14, 3),
                property = _parseTransistion15[0],
                duration = _parseTransistion15[1],
                _easing7 = _parseTransistion15[2];

            if (property === "opacity") {
              await _this69.animate({ opacity: ["1", "0"] }, { duration: duration, easing: _easing7 }).finished;
            }

            _this69.removeAttribute("animating");
          }

          resolve();
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onModalAttributeChange",
      value: function _onModalAttributeChange() {
        if (this.modal && this.opened) {
          this["#backdrop"].show();
        } else {
          this["#backdrop"].hide();
        }
      }

      // @info
      //   Parse the value of CSS transition property.
      // @type
      //   (string) => [string, number, string]

    }, {
      key: "_parseTransistion",
      value: function _parseTransistion(string) {
        var _string$trim$split3 = string.trim().split(" "),
            _string$trim$split4 = _toArray(_string$trim$split3),
            rawDuration = _string$trim$split4[0],
            property = _string$trim$split4[1],
            rest = _string$trim$split4.slice(2);

        var duration = parseFloat(rawDuration);
        var easing = rest.join(" ");
        return [property, duration, easing];
      }
    }]);

    return XPopoverElement;
  }(HTMLElement);

  customElements.define("x-popover", XPopoverElement);

  var shadowTemplate$k = html(_templateObject24);

  var XProgressbarElement = function (_HTMLElement23) {
    _inherits(XProgressbarElement, _HTMLElement23);

    _createClass(XProgressbarElement, [{
      key: "value",


      // @info
      //   Current progress, in procentages.
      // @type
      //   number?
      // @default
      //   null
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? parseFloat(this.getAttribute("value")) : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @type
      //   number?
      // @default
      //   null
      // @attribute

    }, {
      key: "max",
      get: function get() {
        return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : 1;
      },
      set: function set(max) {
        this.setAttribute("max", max);
      }

      // @info
      //   Whether this button is disabled.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "max", "disabled"];
      }
    }]);

    function XProgressbarElement() {
      _classCallCheck(this, XProgressbarElement);

      var _this70 = _possibleConstructorReturn(this, (XProgressbarElement.__proto__ || Object.getPrototypeOf(XProgressbarElement)).call(this));

      _this70._shadowRoot = _this70.attachShadow({ mode: "closed" });
      _this70._shadowRoot.append(document.importNode(shadowTemplate$k.content, true));

      var _iteratorNormalCompletion48 = true;
      var _didIteratorError48 = false;
      var _iteratorError48 = undefined;

      try {
        for (var _iterator48 = _this70._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
          var element = _step48.value;

          _this70["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError48 = true;
        _iteratorError48 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion48 && _iterator48.return) {
            _iterator48.return();
          }
        } finally {
          if (_didIteratorError48) {
            throw _iteratorError48;
          }
        }
      }

      return _this70;
    }

    _createClass(XProgressbarElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._update();
        } else if (name === "disabled") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        // Determinate bar
        {
          // Hide
          if (this.value === null || this.value === -1 || this.disabled) {
            this["#determinate-bar"].style.width = "0%";
          }
          // Show
          else {
              this["#determinate-bar"].style.width = this.value / this.max * 100 + "%";
            }
        }

        // Indeterminate bars
        {
          // Hide
          if (this.value !== null && this.value !== -1 || this.disabled) {
            if (this._indeterminateAnimations) {
              var _iteratorNormalCompletion49 = true;
              var _didIteratorError49 = false;
              var _iteratorError49 = undefined;

              try {
                for (var _iterator49 = this._indeterminateAnimations[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
                  var _animation3 = _step49.value;

                  _animation3.cancel();
                }
              } catch (err) {
                _didIteratorError49 = true;
                _iteratorError49 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion49 && _iterator49.return) {
                    _iterator49.return();
                  }
                } finally {
                  if (_didIteratorError49) {
                    throw _iteratorError49;
                  }
                }
              }

              this._indeterminateAnimations = null;
            }
          }
          // Show
          else {
              if (!this._indeterminateAnimations) {
                this._indeterminateAnimations = [this["#primary-indeterminate-bar"].animate([{ left: "-35%", right: "100%", offset: 0.0 }, { left: "100%", right: "-90%", offset: 0.6 }, { left: "100%", right: "-90%", offset: 1.0 }], {
                  duration: 2000,
                  easing: "ease-in-out",
                  iterations: Infinity
                }), this["#secondary-indeterminate-bar"].animate([{ left: "-100%", right: "100%", offset: 0.0 }, { left: "110%", right: "-30%", offset: 0.8 }, { left: "110%", right: "-30%", offset: 1.0 }], {
                  duration: 2000,
                  delay: 1000,
                  easing: "ease-in-out",
                  iterations: Infinity
                })];
              }
            }
        }
      }
    }]);

    return XProgressbarElement;
  }(HTMLElement);

  customElements.define("x-progressbar", XProgressbarElement);

  var $oldTabIndex$7 = Symbol();

  var shadowTemplate$l = html(_templateObject25);

  // @events
  //   toggle

  var XRadioElement = function (_HTMLElement24) {
    _inherits(XRadioElement, _HTMLElement24);

    _createClass(XRadioElement, [{
      key: "value",


      // @info
      //   Values associated with this widget.
      // @type
      //   string
      // @default
      //   ""
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : null;
      },
      set: function set(value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "toggled",
      get: function get() {
        return this.hasAttribute("toggled");
      },
      set: function set(toggled) {
        toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["toggled", "disabled"];
      }
    }]);

    function XRadioElement() {
      _classCallCheck(this, XRadioElement);

      var _this71 = _possibleConstructorReturn(this, (XRadioElement.__proto__ || Object.getPrototypeOf(XRadioElement)).call(this));

      _this71._shadowRoot = _this71.attachShadow({ mode: "closed" });
      _this71._shadowRoot.append(document.importNode(shadowTemplate$l.content, true));

      var _iteratorNormalCompletion50 = true;
      var _didIteratorError50 = false;
      var _iteratorError50 = undefined;

      try {
        for (var _iterator50 = _this71._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step50; !(_iteratorNormalCompletion50 = (_step50 = _iterator50.next()).done); _iteratorNormalCompletion50 = true) {
          var element = _step50.value;

          _this71["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError50 = true;
        _iteratorError50 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion50 && _iterator50.return) {
            _iterator50.return();
          }
        } finally {
          if (_didIteratorError50) {
            throw _iteratorError50;
          }
        }
      }

      _this71.addEventListener("click", function (event) {
        return _this71._onClick(event);
      });
      _this71.addEventListener("pointerdown", function (event) {
        return _this71._onPointerDown(event);
      });
      _this71.addEventListener("keydown", function (event) {
        return _this71._onKeyDown(event);
      });
      return _this71;
    }

    _createClass(XRadioElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "toggled") {
          this._onToggledAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "radio");
        this.setAttribute("aria-checked", this.toggled);
        this.setAttribute("aria-disabled", this.disabled);

        if (!this.closest("x-radios")) {
          if (this.disabled) {
            this[$oldTabIndex$7] = this.tabIndex > 0 ? this.tabIndex : 0;
            this.tabIndex = -1;
          } else {
            if (this.tabIndex < 0) {
              this.tabIndex = this[$oldTabIndex$7] > 0 ? this[$oldTabIndex$7] : 0;
            }

            delete this[$oldTabIndex$7];
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onToggledAttributeChange",
      value: function _onToggledAttributeChange() {
        this.setAttribute("aria-checked", this.toggled);
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        if (!this.closest("x-radios")) {
          if (this.toggled && this.mixed) {
            this.mixed = false;
          } else {
            this.mixed = false;
            this.toggled = !this.toggled;
          }

          this.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));
        }
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
        if (this.matches(":focus") === false) {
          event.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();
          this.click();
        }
      }
    }]);

    return XRadioElement;
  }(HTMLElement);

  customElements.define("x-radio", XRadioElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa
  // @doc
  //   https://www.youtube.com/watch?v=uCIC2LNt0bk

  var XRadiosElement = function (_HTMLElement25) {
    _inherits(XRadiosElement, _HTMLElement25);

    _createClass(XRadiosElement, [{
      key: "value",

      // @type
      //   string?
      // @default
      //   null
      get: function get() {
        var radio = this.querySelector("x-radio[toggled]");
        return radio ? radio.value : null;
      },
      set: function set(value) {
        var _iteratorNormalCompletion51 = true;
        var _didIteratorError51 = false;
        var _iteratorError51 = undefined;

        try {
          for (var _iterator51 = this.querySelectorAll("x-radio")[Symbol.iterator](), _step51; !(_iteratorNormalCompletion51 = (_step51 = _iterator51.next()).done); _iteratorNormalCompletion51 = true) {
            var radio = _step51.value;

            radio.toggled = radio.value === value && value !== null;
          }
        } catch (err) {
          _didIteratorError51 = true;
          _iteratorError51 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion51 && _iterator51.return) {
              _iterator51.return();
            }
          } finally {
            if (_didIteratorError51) {
              throw _iteratorError51;
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XRadiosElement() {
      _classCallCheck(this, XRadiosElement);

      var _this72 = _possibleConstructorReturn(this, (XRadiosElement.__proto__ || Object.getPrototypeOf(XRadiosElement)).call(this));

      _this72._shadowRoot = _this72.attachShadow({ mode: "closed" });
      _this72._shadowRoot.innerHTML = "<slot></slot>";

      _this72.addEventListener("click", function (event) {
        return _this72._onClick(event);
      }, true);
      _this72.addEventListener("keydown", function (event) {
        return _this72._onKeyDown(event);
      });
      return _this72;
    }

    _createClass(XRadiosElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this73 = this;

        this.setAttribute("role", "radiogroup");

        var radios = [].concat(_toConsumableArray(this.querySelectorAll("x-radio"))).filter(function (radio) {
          return radio.closest("x-radios") === _this73;
        });
        var defaultRadio = radios.find(function ($0) {
          return $0.toggled && !$0.disabled;
        }) || radios.find(function ($0) {
          return !$0.disabled;
        });

        var _iteratorNormalCompletion52 = true;
        var _didIteratorError52 = false;
        var _iteratorError52 = undefined;

        try {
          for (var _iterator52 = radios[Symbol.iterator](), _step52; !(_iteratorNormalCompletion52 = (_step52 = _iterator52.next()).done); _iteratorNormalCompletion52 = true) {
            var radio = _step52.value;

            radio.setAttribute("tabindex", radio === defaultRadio ? "0 " : "-1");
            radio.setAttribute("aria-checked", radio === defaultRadio);
          }
        } catch (err) {
          _didIteratorError52 = true;
          _iteratorError52 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion52 && _iterator52.return) {
              _iterator52.return();
            }
          } finally {
            if (_didIteratorError52) {
              throw _iteratorError52;
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onClick",
      value: function _onClick(event) {
        var _this74 = this;

        var clickedRadio = event.target.localName === "x-radio" ? event.target : null;

        if (clickedRadio && !clickedRadio.toggled && !clickedRadio.disabled && event.button === 0) {
          var radios = [].concat(_toConsumableArray(this.querySelectorAll("x-radio")));
          var otherRadios = radios.filter(function (radio) {
            return radio.closest("x-radios") === _this74 && radio !== clickedRadio;
          });

          if (clickedRadio.toggled === false || clickedRadio.mixed === true) {
            clickedRadio.toggled = true;
            clickedRadio.mixed = false;
            clickedRadio.tabIndex = 0;

            var _iteratorNormalCompletion53 = true;
            var _didIteratorError53 = false;
            var _iteratorError53 = undefined;

            try {
              for (var _iterator53 = otherRadios[Symbol.iterator](), _step53; !(_iteratorNormalCompletion53 = (_step53 = _iterator53.next()).done); _iteratorNormalCompletion53 = true) {
                var radio = _step53.value;

                radio.toggled = false;
                radio.tabIndex = -1;
              }
            } catch (err) {
              _didIteratorError53 = true;
              _iteratorError53 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion53 && _iterator53.return) {
                  _iterator53.return();
                }
              } finally {
                if (_didIteratorError53) {
                  throw _iteratorError53;
                }
              }
            }

            this.dispatchEvent(new CustomEvent("toggle", { bubbles: true, detail: clickedRadio }));
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var _this75 = this;

        var key = event.key;


        if (key === "ArrowDown" || key === "ArrowRight") {
          var radios = [].concat(_toConsumableArray(this.querySelectorAll("x-radio")));
          var contextRadios = radios.filter(function ($0) {
            return $0.disabled === false && $0.closest("x-radios") === _this75;
          });
          var focusedRadio = radios.find(function (radio) {
            return radio.matches(":focus");
          });

          if (focusedRadio) {
            var focusedRadioIndex = contextRadios.indexOf(focusedRadio);
            var nextRadio = contextRadios.length > 1 ? contextRadios[focusedRadioIndex + 1] || contextRadios[0] : null;

            if (nextRadio) {
              event.preventDefault();

              nextRadio.focus();
              nextRadio.tabIndex = 0;
              focusedRadio.tabIndex = -1;
            }
          }
        } else if (key === "ArrowUp" || key === "ArrowLeft") {
          var _radios = [].concat(_toConsumableArray(this.querySelectorAll("x-radio")));
          var _contextRadios = _radios.filter(function ($0) {
            return $0.disabled === false && $0.closest("x-radios") === _this75;
          });
          var _focusedRadio = _radios.find(function (radio) {
            return radio.matches(":focus");
          });

          if (_focusedRadio) {
            var _focusedRadioIndex = _contextRadios.indexOf(_focusedRadio);
            var lastRadio = _contextRadios[_contextRadios.length - 1];
            var prevRadio = _contextRadios.length > 1 ? _contextRadios[_focusedRadioIndex - 1] || lastRadio : null;

            if (prevRadio) {
              event.preventDefault();

              prevRadio.focus();
              prevRadio.tabIndex = 0;
              _focusedRadio.tabIndex = -1;
            }
          }
        }
      }
    }]);

    return XRadiosElement;
  }(HTMLElement);

  customElements.define("x-radios", XRadiosElement);

  var shadowHTML$2 = "\n  <style>\n    :host {\n      display: block;\n      width: 100%;\n      user-select: none;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n\n    /**\n     * Hue slider\n     */\n\n    #hue-slider {\n      width: 100%;\n      height: 28px;\n      padding: 0 calc(var(--marker-width) / 2);\n      margin-bottom: 14px;\n      box-sizing: border-box;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n      background: red;\n    }\n\n    #hue-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n      background: linear-gradient(to right,\n        rgba(255, 0, 0, 1),\n        rgba(255, 255, 0, 1),\n        rgba(0, 255, 0, 1),\n        rgba(0, 255, 255, 1),\n        rgba(0, 0, 255, 1),\n        rgba(255, 0, 255, 1),\n        rgba(255, 0, 0, 1)\n      );\n    }\n\n    #hue-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n\n    /**\n     * Saturation-lightness slider\n     */\n\n    #satlight-slider {\n      width: 100%;\n      height: 174px;\n      border-radius: 2px;\n      position: relative;\n      touch-action: pinch-zoom;\n    }\n\n    #satlight-marker {\n      position: absolute;\n      top: 0%;\n      left: 0%;\n      width: var(--marker-size);\n      height: var(--marker-size);\n      transform: translate(calc(var(--marker-size) / -2), calc(var(--marker-size) / -2));\n      box-sizing: border-box;\n      background: rgba(0, 0, 0, 0.3);\n      border: 3px solid white;\n      border-radius: 999px;\n      box-shadow: 0 0 3px black;\n      --marker-size: 20px;\n    }\n\n    /**\n     * Alpha slider\n     */\n\n    #alpha-slider {\n      display: none;\n      width: 100%;\n      height: 28px;\n      margin-top: 14px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border: 1px solid #cecece;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n    :host([alphaslider]) #alpha-slider {\n      display: block;\n    }\n\n    #alpha-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #alpha-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n  </style>\n\n  <x-box vertical>\n    <div id=\"hue-slider\">\n      <div id=\"hue-slider-track\">\n        <div id=\"hue-slider-marker\"></div>\n      </div>\n    </div>\n\n    <div id=\"satlight-slider\">\n      <div id=\"satlight-marker\"></div>\n    </div>\n\n    <div id=\"alpha-slider\">\n      <div id=\"alpha-slider-track\">\n        <div id=\"alpha-slider-marker\"></div>\n      </div>\n    </div>\n  </x-box>\n";

  // @events
  //   change
  //   changestart
  //   changeend

  var XRectColorPickerElement = function (_HTMLElement26) {
    _inherits(XRectColorPickerElement, _HTMLElement26);

    _createClass(XRectColorPickerElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   "hsla(0, 0%, 100%, 1)"
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value"];
      }
    }]);

    function XRectColorPickerElement() {
      _classCallCheck(this, XRectColorPickerElement);

      // Note that HSVA color model is used only internally
      var _this76 = _possibleConstructorReturn(this, (XRectColorPickerElement.__proto__ || Object.getPrototypeOf(XRectColorPickerElement)).call(this));

      _this76._h = 0; // Hue (0 ~ 360)
      _this76._s = 0; // Saturation (0 ~ 100)
      _this76._v = 100; // Value (0 ~ 100)
      _this76._a = 1; // Alpha (0 ~ 1)

      _this76._isDraggingHueSliderMarker = false;
      _this76._isDraggingSatlightMarker = false;
      _this76._isDraggingAlphaSliderMarker = false;

      _this76._shadowRoot = _this76.attachShadow({ mode: "closed" });
      _this76._shadowRoot.innerHTML = shadowHTML$2;

      var _iteratorNormalCompletion54 = true;
      var _didIteratorError54 = false;
      var _iteratorError54 = undefined;

      try {
        for (var _iterator54 = _this76._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step54; !(_iteratorNormalCompletion54 = (_step54 = _iterator54.next()).done); _iteratorNormalCompletion54 = true) {
          var element = _step54.value;

          _this76["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError54 = true;
        _iteratorError54 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion54 && _iterator54.return) {
            _iterator54.return();
          }
        } finally {
          if (_didIteratorError54) {
            throw _iteratorError54;
          }
        }
      }

      _this76["#hue-slider"].addEventListener("pointerdown", function (event) {
        return _this76._onHueSliderPointerDown(event);
      });
      _this76["#satlight-slider"].addEventListener("pointerdown", function (event) {
        return _this76._onSatlightSliderPointerDown(event);
      });
      _this76["#alpha-slider"].addEventListener("pointerdown", function (event) {
        return _this76._onAlphaSliderPointerDown(event);
      });
      return _this76;
    }

    _createClass(XRectColorPickerElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._onValueAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this._updateHueSliderMarker();

        this._updateSatlightSliderMarker();
        this._updateSatlightSliderBackground();

        this._updateAlphaSliderMarker();
        this._updateAlphaSliderBackground();
      }
    }, {
      key: "_updateHueSliderMarker",
      value: function _updateHueSliderMarker() {
        this["#hue-slider-marker"].style.left = normalize(this._h, 0, 360, 0) / 360 * 100 + "%";
      }
    }, {
      key: "_updateSatlightSliderMarker",
      value: function _updateSatlightSliderMarker() {
        var left = this._s / 100 * 100;
        var top = 100 - this._v / 100 * 100;

        this["#satlight-marker"].style.left = left + "%";
        this["#satlight-marker"].style.top = top + "%";
      }
    }, {
      key: "_updateSatlightSliderBackground",
      value: function _updateSatlightSliderBackground() {
        var background1 = serializeColor([this._h, 100, 50, 1], "hsla", "hex");
        var background2 = "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))";
        var background3 = "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))";
        this["#satlight-slider"].style.background = background3 + ", " + background2 + ", " + background1;
      }
    }, {
      key: "_updateAlphaSliderMarker",
      value: function _updateAlphaSliderMarker() {
        this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
      }
    }, {
      key: "_updateAlphaSliderBackground",
      value: function _updateAlphaSliderBackground() {
        var _hsvToRgb$map = hsvToRgb(this._h, this._s, this._v).map(function ($0) {
          return round($0, 0);
        }),
            _hsvToRgb$map2 = _slicedToArray(_hsvToRgb$map, 3),
            r = _hsvToRgb$map2[0],
            g = _hsvToRgb$map2[1],
            b = _hsvToRgb$map2[2];

        var backroundA = "url(node_modules/xel/images/checkboard.png) repeat 0 0";
        var background = "linear-gradient(to right, rgba(" + r + ", " + g + ", " + b + ", 1), rgba(" + r + ", " + g + ", " + b + ", 0))";
        this["#alpha-slider"].style.background = background + "," + backroundA;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        if (this._isDraggingHueSliderMarker === false && this._isDraggingSatlightMarker === false && this._isDraggingAlphaSliderMarker === false) {
          var _parseColor5 = parseColor(this.value, "hsva"),
              _parseColor6 = _slicedToArray(_parseColor5, 4),
              h = _parseColor6[0],
              s = _parseColor6[1],
              v = _parseColor6[2],
              a = _parseColor6[3];

          this._h = h;
          this._s = s;
          this._v = v;
          this._a = a;

          this._update();
        }
      }
    }, {
      key: "_onSatlightSliderPointerDown",
      value: function _onSatlightSliderPointerDown(pointerDownEvent) {
        var _this77 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var pointerMoveListener = void 0,
            _lostPointerCaptureListener7 = void 0;
        var sliderBounds = this["#satlight-slider"].getBoundingClientRect();

        this._isDraggingSatlightMarker = true;
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));
        this["#satlight-slider"].setPointerCapture(pointerDownEvent.pointerId);

        var onPointerMove = function onPointerMove(clientX, clientY) {
          var x = (clientX - sliderBounds.left) / sliderBounds.width * 100;
          var y = (clientY - sliderBounds.top) / sliderBounds.height * 100;

          x = normalize(x, 0, 100, 2);
          y = normalize(y, 0, 100, 2);

          _this77._s = x;
          _this77._v = 100 - y;

          _this77.value = serializeColor([_this77._h, _this77._s, _this77._v, _this77._a], "hsva", "hsla");
          _this77.dispatchEvent(new CustomEvent("change", { bubbles: true }));

          _this77._updateSatlightSliderMarker();
          _this77._updateSatlightSliderBackground();
          _this77._updateAlphaSliderBackground();
        };

        onPointerMove(pointerDownEvent.clientX, pointerDownEvent.clientY);

        this["#satlight-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX, pointerMoveEvent.clientY);
        });

        this["#satlight-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener7 = function lostPointerCaptureListener(event) {
          _this77["#satlight-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this77["#satlight-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener7);
          _this77.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
          _this77._isDraggingSatlightMarker = false;
        });
      }
    }, {
      key: "_onHueSliderPointerDown",
      value: function _onHueSliderPointerDown(pointerDownEvent) {
        var _this78 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#hue-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener8 = void 0;

        this._isDraggingHueSliderMarker = true;
        this["#hue-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var h = (clientX - trackBounds.x) / trackBounds.width * 360;
          h = normalize(h, 0, 360, 0);

          if (h !== _this78._h) {
            _this78._h = h;
            _this78.value = serializeColor([_this78._h, _this78._s, _this78._v, _this78._a], "hsva", "hsla");

            _this78._updateHueSliderMarker();
            _this78._updateSatlightSliderBackground();
            _this78._updateSatlightSliderMarker();
            _this78._updateAlphaSliderBackground();

            _this78.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#hue-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#hue-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener8 = function lostPointerCaptureListener() {
          _this78["#hue-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this78["#hue-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener8);
          _this78.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this78._isDraggingHueSliderMarker = false;
        });
      }
    }, {
      key: "_onAlphaSliderPointerDown",
      value: function _onAlphaSliderPointerDown(pointerDownEvent) {
        var _this79 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener9 = void 0;

        this._isDraggingAlphaSliderMarker = true;
        this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var a = 1 - (clientX - trackBounds.x) / trackBounds.width;
          a = normalize(a, 0, 1, 2);

          if (a !== _this79._a) {
            _this79._a = a;
            _this79.value = serializeColor([_this79._h, _this79._s, _this79._v, _this79._a], "hsva", "hsla");
            _this79._updateAlphaSliderMarker();
            _this79.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#alpha-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener9 = function lostPointerCaptureListener() {
          _this79["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this79["#alpha-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener9);
          _this79.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));

          _this79._isDraggingAlphaSliderMarker = false;
        });
      }
    }]);

    return XRectColorPickerElement;
  }(HTMLElement);

  customElements.define("x-rectcolorpicker", XRectColorPickerElement);

  var windowPadding = 7;
  var $itemChild = Symbol();
  var $oldTabIndex$8 = Symbol();

  var shadowTemplate$m = html(_templateObject26);

  // @event
  //   change {oldValue: string?, newValue: string?}

  var XSelectElement = function (_HTMLElement27) {
    _inherits(XSelectElement, _HTMLElement27);

    _createClass(XSelectElement, [{
      key: "value",


      // @type
      //   string?
      // @default
      //   null
      get: function get() {
        var item = this.querySelector("x-menuitem[toggled]");
        return item ? item.value : null;
      },
      set: function set(value) {
        var _iteratorNormalCompletion55 = true;
        var _didIteratorError55 = false;
        var _iteratorError55 = undefined;

        try {
          for (var _iterator55 = this.querySelectorAll("x-menuitem")[Symbol.iterator](), _step55; !(_iteratorNormalCompletion55 = (_step55 = _iterator55.next()).done); _iteratorNormalCompletion55 = true) {
            var item = _step55.value;

            item.toggled = item.value === value && value !== null;
          }
        } catch (err) {
          _didIteratorError55 = true;
          _iteratorError55 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion55 && _iterator55.return) {
              _iterator55.return();
            }
          } finally {
            if (_didIteratorError55) {
              throw _iteratorError55;
            }
          }
        }
      }

      // @info
      //   Whether this select has "mixed" state.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XSelectElement() {
      _classCallCheck(this, XSelectElement);

      var _this80 = _possibleConstructorReturn(this, (XSelectElement.__proto__ || Object.getPrototypeOf(XSelectElement)).call(this));

      _this80._wasFocusedBeforeExpanding = false;
      _this80._updateButtonTh300 = throttle(_this80._updateButton, 300, _this80);

      _this80._mutationObserver = new MutationObserver(function (args) {
        return _this80._onMutation(args);
      });
      _this80._resizeObserver = new ResizeObserver(function () {
        return _this80._updateButtonChildrenSize();
      });

      _this80._shadowRoot = _this80.attachShadow({ mode: "closed" });
      _this80._shadowRoot.append(document.importNode(shadowTemplate$m.content, true));

      var _iteratorNormalCompletion56 = true;
      var _didIteratorError56 = false;
      var _iteratorError56 = undefined;

      try {
        for (var _iterator56 = _this80._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step56; !(_iteratorNormalCompletion56 = (_step56 = _iterator56.next()).done); _iteratorNormalCompletion56 = true) {
          var element = _step56.value;

          _this80["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError56 = true;
        _iteratorError56 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion56 && _iterator56.return) {
            _iterator56.return();
          }
        } finally {
          if (_didIteratorError56) {
            throw _iteratorError56;
          }
        }
      }

      _this80["#backdrop"] = createElement("x-backdrop");
      _this80["#backdrop"].style.opacity = "0";
      _this80["#backdrop"].ownerElement = _this80;
      _this80["#backdrop"].addEventListener("click", function (event) {
        return _this80._onBackdropClick(event);
      });

      _this80.addEventListener("pointerdown", function (event) {
        return _this80._onPointerDown(event);
      });
      _this80.addEventListener("toggle", function (event) {
        return _this80._onMenuItemToggle(event);
      });
      _this80.addEventListener("click", function (event) {
        return _this80._onClick(event);
      });
      _this80.addEventListener("keydown", function (event) {
        return _this80._onKeyDown(event);
      });

      return _this80;
    }

    _createClass(XSelectElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._mutationObserver.observe(this, { childList: true, attributes: true, characterData: true, subtree: true });
        this._resizeObserver.observe(this);

        this._updateButton();
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._mutationObserver.disconnect();
        this._resizeObserver.disconnect();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_expand",
      value: function _expand() {
        var _this81 = this;

        if (this._canExpand() === false) {
          return;
        }

        this._wasFocusedBeforeExpanding = this.matches(":focus");

        this["#backdrop"].show(false);

        window.addEventListener("resize", this._resizeListener = function () {
          _this81._collapse();
        });

        window.addEventListener("blur", this._blurListener = function () {
          {
            _this81._collapse();
          }
        });

        var menu = this.querySelector(":scope > x-menu");

        // Ensure all items are togglable, there is at most one toggled menu item and all other items are not toggled
        {
          var toggledItem = null;

          var _iteratorNormalCompletion57 = true;
          var _didIteratorError57 = false;
          var _iteratorError57 = undefined;

          try {
            for (var _iterator57 = menu.querySelectorAll("x-menuitem")[Symbol.iterator](), _step57; !(_iteratorNormalCompletion57 = (_step57 = _iterator57.next()).done); _iteratorNormalCompletion57 = true) {
              var item = _step57.value;

              item.togglable = true;

              if (item.toggled) {
                if (toggledItem === null) {
                  toggledItem = item;
                } else {
                  item.toggled = false;
                }
              }
            }
          } catch (err) {
            _didIteratorError57 = true;
            _iteratorError57 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion57 && _iterator57.return) {
                _iterator57.return();
              }
            } finally {
              if (_didIteratorError57) {
                throw _iteratorError57;
              }
            }
          }
        }

        // Open the menu
        {
          var _toggledItem = menu.querySelector("x-menuitem[toggled]");

          if (_toggledItem) {
            var buttonChild = this["#button"].querySelector("x-label") || this["#button"].firstElementChild;
            var itemChild = buttonChild[$itemChild];

            menu.openOverElement(buttonChild, itemChild);
          } else {
            var _item4 = menu.querySelector("x-menuitem").firstElementChild;
            menu.openOverElement(this["#button"], _item4);
          }
        }

        // Increase menu width if it is narrower than the button
        {
          var menuBounds = menu.getBoundingClientRect();
          var buttonBounds = this["#button"].getBoundingClientRect();
          var hostPaddingRight = parseFloat(getComputedStyle(this).paddingRight);

          if (menuBounds.right - hostPaddingRight < buttonBounds.right) {
            menu.style.minWidth = buttonBounds.right - menuBounds.left + hostPaddingRight + "px";
          }
        }

        // Reduce menu width if it oveflows the right client bound
        {
          var _menuBounds9 = this.getBoundingClientRect();

          if (_menuBounds9.right + windowPadding > window.innerWidth) {
            this.style.maxWidth = window.innerWidth - _menuBounds9.left - windowPadding + "px";
          }
        }
      }
    }, {
      key: "_collapse",
      value: async function _collapse() {
        var whenTriggerEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (this._canCollapse() === false) {
          return;
        }

        var menu = this.querySelector(":scope > x-menu");
        menu.setAttribute("closing", "");
        await whenTriggerEnd;
        this["#backdrop"].hide(false);

        if (this._wasFocusedBeforeExpanding) {
          this.focus();
        } else {
          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }

        window.removeEventListener("resize", this._resizeListener);
        window.removeEventListener("blur", this._blurListener);

        await menu.close();
        menu.removeAttribute("closing");
      }
    }, {
      key: "_canExpand",
      value: function _canExpand() {
        if (this.disabled) {
          return false;
        } else {
          var menu = this.querySelector(":scope > x-menu");
          var item = menu.querySelector("x-menuitem");
          return menu !== null && menu.opened === false && menu.hasAttribute("closing") === false && item !== null;
        }
      }
    }, {
      key: "_canCollapse",
      value: function _canCollapse() {
        if (this.disabled) {
          return false;
        } else {
          var menu = this.querySelector(":scope > x-menu");
          var item = menu.querySelector("x-menuitem");
          return menu !== null && menu.opened === true && menu.hasAttribute("closing") === false;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateButton",
      value: function _updateButton() {
        var toggledItem = this.querySelector(":scope > x-menu x-menuitem[toggled]");
        this["#button"].innerHTML = "";

        if (toggledItem) {
          var _iteratorNormalCompletion58 = true;
          var _didIteratorError58 = false;
          var _iteratorError58 = undefined;

          try {
            for (var _iterator58 = toggledItem.children[Symbol.iterator](), _step58; !(_iteratorNormalCompletion58 = (_step58 = _iterator58.next()).done); _iteratorNormalCompletion58 = true) {
              var itemChild = _step58.value;

              var buttonChild = itemChild.cloneNode(true);
              buttonChild[$itemChild] = itemChild;
              buttonChild.removeAttribute("id");
              buttonChild.removeAttribute("style");
              this["#button"].append(buttonChild);
            }
          } catch (err) {
            _didIteratorError58 = true;
            _iteratorError58 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion58 && _iterator58.return) {
                _iterator58.return();
              }
            } finally {
              if (_didIteratorError58) {
                throw _iteratorError58;
              }
            }
          }

          this._updateButtonChildrenSize();
        }

        this["#button"].append(this["#arrow-container"]);
      }
    }, {
      key: "_updateButtonChildrenSize",
      value: function _updateButtonChildrenSize() {
        var _iteratorNormalCompletion59 = true;
        var _didIteratorError59 = false;
        var _iteratorError59 = undefined;

        try {
          for (var _iterator59 = this["#button"].children[Symbol.iterator](), _step59; !(_iteratorNormalCompletion59 = (_step59 = _iterator59.next()).done); _iteratorNormalCompletion59 = true) {
            var buttonChild = _step59.value;

            if (buttonChild !== this["#arrow-container"]) {
              var _getComputedStyle3 = getComputedStyle(buttonChild[$itemChild]),
                  width = _getComputedStyle3.width,
                  height = _getComputedStyle3.height,
                  margin = _getComputedStyle3.margin,
                  padding = _getComputedStyle3.padding,
                  border = _getComputedStyle3.border;

              if (["x-icon", "x-swatch", "img", "svg"].includes(buttonChild[$itemChild].localName)) {
                buttonChild.style.width = width;
                buttonChild.style.height = height;
                buttonChild.style.minWidth = width;
              }

              buttonChild.style.margin = margin;
              buttonChild.style.padding = padding;
              buttonChild.style.border = border;
            }
          }
        } catch (err) {
          _didIteratorError59 = true;
          _iteratorError59 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion59 && _iterator59.return) {
              _iterator59.return();
            }
          } finally {
            if (_didIteratorError59) {
              throw _iteratorError59;
            }
          }
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("aria-disabled", this.disabled);

        // Update "tabindex" attribute
        {
          if (this.disabled) {
            this[$oldTabIndex$8] = this.tabIndex > 0 ? this.tabIndex : 0;
            this.tabIndex = -1;
          } else {
            if (this.tabIndex < 0) {
              this.tabIndex = this[$oldTabIndex$8] > 0 ? this[$oldTabIndex$8] : 0;
            }

            delete this[$oldTabIndex$8];
          }
        }

        // Update "role" attributes
        {
          this.setAttribute("role", "button");
          var menu = this.querySelector(":scope > x-menu");

          if (menu) {
            menu.setAttribute("role", "listbox");

            var _iteratorNormalCompletion60 = true;
            var _didIteratorError60 = false;
            var _iteratorError60 = undefined;

            try {
              for (var _iterator60 = menu.querySelectorAll("x-menuitem")[Symbol.iterator](), _step60; !(_iteratorNormalCompletion60 = (_step60 = _iterator60.next()).done); _iteratorNormalCompletion60 = true) {
                var item = _step60.value;

                item.setAttribute("role", "option");
              }
            } catch (err) {
              _didIteratorError60 = true;
              _iteratorError60 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion60 && _iterator60.return) {
                  _iterator60.return();
                }
              } finally {
                if (_didIteratorError60) {
                  throw _iteratorError60;
                }
              }
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onMutation",
      value: function _onMutation(records) {
        var _iteratorNormalCompletion61 = true;
        var _didIteratorError61 = false;
        var _iteratorError61 = undefined;

        try {
          for (var _iterator61 = records[Symbol.iterator](), _step61; !(_iteratorNormalCompletion61 = (_step61 = _iterator61.next()).done); _iteratorNormalCompletion61 = true) {
            var record = _step61.value;

            if (record.type === "attributes" && record.target.localName === "x-menuitem" && record.attributeName === "toggled") {
              this._updateButtonTh300();
            }
          }
        } catch (err) {
          _didIteratorError61 = true;
          _iteratorError61 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion61 && _iterator61.return) {
              _iterator61.return();
            }
          } finally {
            if (_didIteratorError61) {
              throw _iteratorError61;
            }
          }
        }
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        // Don't focus the widget with pointer
        if (!event.target.closest("x-menu") && this.matches(":focus") === false) {
          event.preventDefault();
        }
      }
    }, {
      key: "_onClick",
      value: function _onClick(event) {
        if (event.button !== 0) {
          return;
        }

        if (this._canExpand()) {
          this._expand();
        } else if (this._canCollapse()) {
          var clickedItem = event.target.closest("x-menuitem");

          if (clickedItem) {
            var oldValue = this.value;
            var newValue = clickedItem.value;

            var _iteratorNormalCompletion62 = true;
            var _didIteratorError62 = false;
            var _iteratorError62 = undefined;

            try {
              for (var _iterator62 = this.querySelectorAll("x-menuitem")[Symbol.iterator](), _step62; !(_iteratorNormalCompletion62 = (_step62 = _iterator62.next()).done); _iteratorNormalCompletion62 = true) {
                var item = _step62.value;

                item.toggled = item === clickedItem;
              }
            } catch (err) {
              _didIteratorError62 = true;
              _iteratorError62 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion62 && _iterator62.return) {
                  _iterator62.return();
                }
              } finally {
                if (_didIteratorError62) {
                  throw _iteratorError62;
                }
              }
            }

            if (oldValue !== newValue || this.mixed) {
              this.mixed = false;
              this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { oldValue: oldValue, newValue: newValue } }));
            }

            this._collapse(clickedItem.whenTriggerEnd);
          }
        }
      }
    }, {
      key: "_onMenuItemToggle",
      value: function _onMenuItemToggle(event) {
        // We will toggle the menu items manually
        event.preventDefault();
      }
    }, {
      key: "_onBackdropClick",
      value: function _onBackdropClick(event) {
        this._collapse();
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        var menu = this.querySelector(":scope > x-menu");

        if (event.key === "Enter" || event.key === "Space" || event.key === "ArrowUp" || event.key === "ArrowDown") {
          if (this._canExpand()) {
            event.preventDefault();
            this._expand();
          }
        } else if (event.key === "Escape") {
          if (this._canCollapse()) {
            event.preventDefault();
            this._collapse();
          }
        }
      }
    }]);

    return XSelectElement;
  }(HTMLElement);

  customElements.define("x-select", XSelectElement);

  var isAppleDevice = navigator.platform.startsWith("Mac") || ["iPhone", "iPad"].includes(navigator.platform);

  // @doc
  //   https://www.w3.org/TR/uievents-key/#keys-modifier
  var modKeys = ["Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Meta", "NumLock", "ScrollLock", "Shift", "Symbol", "SymbolLock"];

  var shadowTemplate$n = html(_templateObject27);

  var XShortcutElement = function (_HTMLElement28) {
    _inherits(XShortcutElement, _HTMLElement28);

    _createClass(XShortcutElement, [{
      key: "value",


      // @type
      //   Array<string>
      // @default
      //   []
      // @attribute
      get: function get() {
        var value = [];

        if (this.hasAttribute("value")) {
          var parts = this.getAttribute("value").replace("++", "+PLUS").split("+");
          parts = parts.map(function ($0) {
            return $0.trim().replace("PLUS", "+");
          }).filter(function ($0) {
            return $0 !== "";
          });
          value = parts;
        }

        return value;
      },
      set: function set(value) {
        this.setAttribute("value", value.join("+"));
      }

      // @type
      //   Array<string>

    }, {
      key: "modKeys",
      get: function get() {
        return this.value.filter(function (key) {
          return modKeys.includes(key);
        });
      }

      // @type
      //   String?

    }, {
      key: "normalKey",
      get: function get() {
        var key = this.value.find(function (key) {
          return modKeys.includes(key) === false;
        });
        return key === undefined ? null : key;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value"];
      }
    }]);

    function XShortcutElement() {
      _classCallCheck(this, XShortcutElement);

      var _this82 = _possibleConstructorReturn(this, (XShortcutElement.__proto__ || Object.getPrototypeOf(XShortcutElement)).call(this));

      _this82._shadowRoot = _this82.attachShadow({ mode: "closed" });
      _this82._shadowRoot.append(document.importNode(shadowTemplate$n.content, true));

      var _iteratorNormalCompletion63 = true;
      var _didIteratorError63 = false;
      var _iteratorError63 = undefined;

      try {
        for (var _iterator63 = _this82._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step63; !(_iteratorNormalCompletion63 = (_step63 = _iterator63.next()).done); _iteratorNormalCompletion63 = true) {
          var element = _step63.value;

          _this82["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError63 = true;
        _iteratorError63 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion63 && _iterator63.return) {
            _iterator63.return();
          }
        } finally {
          if (_didIteratorError63) {
            throw _iteratorError63;
          }
        }
      }

      return _this82;
    }

    _createClass(XShortcutElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        var displayValue = "";

        var keys = this.value;
        var modKeys = this.modKeys;
        var normalKey = this.normalKey;

        if (isAppleDevice) {
          if (modKeys.includes("Meta")) {
            displayValue += "^";
          }
          if (modKeys.includes("Alt")) {
            displayValue += "⌥";
          }
          if (modKeys.includes("Shift")) {
            displayValue += "⇧";
          }
          if (modKeys.includes("Control")) {
            displayValue += "⌘";
          }
          if (modKeys.includes("Symbol")) {
            displayValue += "☺";
          }

          var mappings = {
            "ArrowUp": "↑",
            "ArrowDown": "↓",
            "ArrowLeft": "←",
            "ArrowRight": "→",
            "Backspace": "⌦"
          };

          if (normalKey !== undefined) {
            displayValue += mappings[normalKey] || normalKey;
          }
        } else {
          var parts = [];

          if (modKeys.includes("Control")) {
            parts.push("Ctrl");
          }
          if (modKeys.includes("Alt")) {
            parts.push("Alt");
          }
          if (modKeys.includes("Meta")) {
            parts.push("Meta");
          }
          if (modKeys.includes("Shift")) {
            parts.push("Shift");
          }
          if (modKeys.includes("Symbol")) {
            parts.push("Symbol");
          }

          var _mappings = {
            "ArrowUp": "Up",
            "ArrowDown": "Down",
            "ArrowLeft": "Left",
            "ArrowRight": "Right"
          };

          if (normalKey !== null) {
            parts.push(_mappings[normalKey] || normalKey);
          }

          displayValue = parts.join("+");
        }

        this["#main"].textContent = displayValue;
      }
    }]);

    return XShortcutElement;
  }(HTMLElement);

  customElements.define("x-shortcut", XShortcutElement);

  var getClosestMultiple = function getClosestMultiple(number, step) {
    return round(round(number / step) * step, getPrecision(step));
  };
  var $oldTabIndex$9 = Symbol();

  var shadowTemplate$o = html(_templateObject28);

  // @events
  //   change
  //   changestart
  //   changeend

  var XSliderElement = function (_HTMLElement29) {
    _inherits(XSliderElement, _HTMLElement29);

    _createClass(XSliderElement, [{
      key: "min",


      // @type
      //   number
      // @default
      //   0
      // @attribute
      get: function get() {
        return this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : 0;
      },
      set: function set(min) {
        this.setAttribute("min", min);
      }

      // @type
      //   number
      // @default
      //   100
      // @attribute

    }, {
      key: "max",
      get: function get() {
        return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : 100;
      },
      set: function set(max) {
        this.setAttribute("max", max);
      }

      // @type
      //   number
      // @attribute

    }, {
      key: "value",
      get: function get() {
        if (this.hasAttribute("value")) {
          return parseFloat(this.getAttribute("value"));
        } else {
          return this.max >= this.min ? this.min + (this.max - this.min) / 2 : this.min;
        }
      },
      set: function set(value) {
        value = normalize(value, this.min, this.max);
        this.setAttribute("value", value);
      }

      // @type
      //   number
      // @default
      //   1
      // @attribute

    }, {
      key: "step",
      get: function get() {
        return this.hasAttribute("step") ? parseFloat(this.getAttribute("step")) : 1;
      },
      set: function set(step) {
        this.setAttribute("step", step);
      }

      // @info
      //   Whether this button is disabled.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "min", "max"];
      }
    }]);

    function XSliderElement() {
      _classCallCheck(this, XSliderElement);

      var _this83 = _possibleConstructorReturn(this, (XSliderElement.__proto__ || Object.getPrototypeOf(XSliderElement)).call(this));

      _this83._shadowRoot = _this83.attachShadow({ mode: "closed" });
      _this83._shadowRoot.append(document.importNode(shadowTemplate$o.content, true));

      _this83._observer = new MutationObserver(function (args) {
        return _this83._onMutation(args);
      });
      _this83._updateTicks500ms = throttle(_this83._updateTicks, 500, _this83);

      var _iteratorNormalCompletion64 = true;
      var _didIteratorError64 = false;
      var _iteratorError64 = undefined;

      try {
        for (var _iterator64 = _this83._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step64; !(_iteratorNormalCompletion64 = (_step64 = _iterator64.next()).done); _iteratorNormalCompletion64 = true) {
          var element = _step64.value;

          _this83["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError64 = true;
        _iteratorError64 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion64 && _iterator64.return) {
            _iterator64.return();
          }
        } finally {
          if (_didIteratorError64) {
            throw _iteratorError64;
          }
        }
      }

      _this83._shadowRoot.addEventListener("pointerdown", function (event) {
        return _this83._onShadowRootPointerDown(event);
      });
      _this83.addEventListener("pointerdown", function (event) {
        return _this83._onPointerDown(event);
      });
      _this83.addEventListener("keydown", function (event) {
        return _this83._onKeyDown(event);
      });
      return _this83;
    }

    _createClass(XSliderElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "min") {
          this._onMinAttributeChange();
        } else if (name === "max") {
          this._onMaxAttributeChange();
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("value", this.value);

        this._observer.observe(this, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["value"],
          characterData: false
        });

        this._updateTracks();
        this._updateThumbs();
        this._updateTicks();
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateTracks",
      value: function _updateTracks() {
        var left = (this.value - this.min) / (this.max - this.min) * 100;
        var originLeft = ((this.min > 0 ? this.min : 0) - this.min) / (this.max - this.min) * 100;

        if (left >= originLeft) {
          this["#tint-track"].style.left = originLeft + "%";
          this["#tint-track"].style.width = left - originLeft + "%";
        } else {
          this["#tint-track"].style.left = left + "%";
          this["#tint-track"].style.width = originLeft - left + "%";
        }
      }
    }, {
      key: "_updateThumbs",
      value: function _updateThumbs(animate) {
        this["#start-thumb"].style.left = (this.value - this.min) / (this.max - this.min) * 100 + "%";
      }
    }, {
      key: "_updateTicks",
      value: async function _updateTicks() {
        await customElements.whenDefined("x-label");

        this["#ticks"].innerHTML = "";

        var _iteratorNormalCompletion65 = true;
        var _didIteratorError65 = false;
        var _iteratorError65 = undefined;

        try {
          for (var _iterator65 = this.querySelectorAll(":scope > x-label")[Symbol.iterator](), _step65; !(_iteratorNormalCompletion65 = (_step65 = _iterator65.next()).done); _iteratorNormalCompletion65 = true) {
            var label = _step65.value;

            label.style.left = (label.value - this.min) / (this.max - this.min) * 100 + "%";
            this["#ticks"].insertAdjacentHTML("beforeend", "<div class=\"tick\" style=\"left: " + label.style.left + "\"></div>");
          }
        } catch (err) {
          _didIteratorError65 = true;
          _iteratorError65 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion65 && _iterator65.return) {
              _iterator65.return();
            }
          } finally {
            if (_didIteratorError65) {
              throw _iteratorError65;
            }
          }
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$9] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$9] > 0 ? this[$oldTabIndex$9] : 0;
          }

          delete this[$oldTabIndex$9];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this._updateTracks();
        this._updateThumbs();
      }
    }, {
      key: "_onMinAttributeChange",
      value: function _onMinAttributeChange() {
        this._updateTracks();
        this._updateThumbs();
        this._updateTicks();
      }
    }, {
      key: "_onMaxAttributeChange",
      value: function _onMaxAttributeChange() {
        this._updateTracks();
        this._updateThumbs();
        this._updateTicks();
      }
    }, {
      key: "_onMutation",
      value: function _onMutation(records) {
        var _iteratorNormalCompletion66 = true;
        var _didIteratorError66 = false;
        var _iteratorError66 = undefined;

        try {
          for (var _iterator66 = records[Symbol.iterator](), _step66; !(_iteratorNormalCompletion66 = (_step66 = _iterator66.next()).done); _iteratorNormalCompletion66 = true) {
            var record = _step66.value;

            if (record.type === "attributes" && record.target === this) {
              return;
            } else {
              this._updateTicks500ms();
            }
          }
        } catch (err) {
          _didIteratorError66 = true;
          _iteratorError66 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion66 && _iterator66.return) {
              _iterator66.return();
            }
          } finally {
            if (_didIteratorError66) {
              throw _iteratorError66;
            }
          }
        }
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
        if (this.matches(":focus") === false) {
          event.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }
      }
    }, {
      key: "_onShadowRootPointerDown",
      value: function _onShadowRootPointerDown(pointerDownEvent) {
        var _this84 = this;

        if (pointerDownEvent.buttons !== 1 || pointerDownEvent.isPrimary === false) {
          return;
        }

        var containerBounds = this["#thumbs"].getBoundingClientRect();
        var thumb = this["#start-thumb"];
        var thumbBounds = thumb.getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener10 = void 0;
        var changeStarted = false;

        this.setPointerCapture(pointerDownEvent.pointerId);

        var updateValue = function updateValue(clientX, animate) {
          var x = clientX - containerBounds.x - thumbBounds.width / 2;
          x = normalize(x, 0, containerBounds.width);

          var value = x / containerBounds.width * (_this84.max - _this84.min) + _this84.min;
          value = getClosestMultiple(value, _this84.step);

          if (_this84.value !== value) {
            _this84.value = value;

            if (changeStarted === false) {
              changeStarted = true;
              _this84.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));
            }

            _this84.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        if (pointerDownEvent.target.closest(".thumb") !== thumb) {
          updateValue(pointerDownEvent.clientX, true);
        }

        this.addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          if (pointerMoveEvent.isPrimary) {
            updateValue(pointerMoveEvent.clientX, false);
          }
        });

        this.addEventListener("lostpointercapture", _lostPointerCaptureListener10 = function lostPointerCaptureListener() {
          _this84.removeEventListener("pointermove", pointerMoveListener);
          _this84.removeEventListener("lostpointercapture", _lostPointerCaptureListener10);

          if (changeStarted) {
            _this84.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
          }
        });
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
          event.preventDefault();
          this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

          var oldValue = this.value;

          if (event.shiftKey) {
            this.value -= this.step * 10;
          } else {
            this.value -= this.step;
          }

          if (oldValue !== this.value) {
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }

          this.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
        } else if (event.code === "ArrowRight" || event.code === "ArrowUp") {
          event.preventDefault();
          this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

          var _oldValue = this.value;

          if (event.shiftKey) {
            this.value += this.step * 10;
          } else {
            this.value += this.step;
          }

          if (_oldValue !== this.value) {
            this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }

          this.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
        }
      }
    }]);

    return XSliderElement;
  }(HTMLElement);

  customElements.define("x-slider", XSliderElement);

  var shadowTemplate$p = html(_templateObject29);

  // @events
  //   increment
  //   incrementstart
  //   incrementend
  //   decrement
  //   decrementstart
  //   decrementend

  var XStepperElement = function (_HTMLElement30) {
    _inherits(XStepperElement, _HTMLElement30);

    _createClass(XStepperElement, [{
      key: "disabled",


      // @type
      //   true || false || "increment" || "decrement"
      // @default
      //   "false"
      get: function get() {
        if (this.hasAttribute("disabled")) {
          if (this.getAttribute("disabled") === "increment") {
            return "increment";
          } else if (this.getAttribute("disabled") === "decrement") {
            return "decrement";
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
      set: function set(disabled) {
        if (disabled === true) {
          this.setAttribute("disabled", "");
        } else if (disabled === false) {
          this.removeAttribute("disabled");
        } else {
          this.setAttribute("disabled", disabled);
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XStepperElement() {
      _classCallCheck(this, XStepperElement);

      var _this85 = _possibleConstructorReturn(this, (XStepperElement.__proto__ || Object.getPrototypeOf(XStepperElement)).call(this));

      _this85._shadowRoot = _this85.attachShadow({ mode: "closed" });
      _this85._shadowRoot.append(document.importNode(shadowTemplate$p.content, true));

      var _iteratorNormalCompletion67 = true;
      var _didIteratorError67 = false;
      var _iteratorError67 = undefined;

      try {
        for (var _iterator67 = _this85._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step67; !(_iteratorNormalCompletion67 = (_step67 = _iterator67.next()).done); _iteratorNormalCompletion67 = true) {
          var element = _step67.value;

          _this85["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError67 = true;
        _iteratorError67 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion67 && _iterator67.return) {
            _iterator67.return();
          }
        } finally {
          if (_didIteratorError67) {
            throw _iteratorError67;
          }
        }
      }

      _this85._shadowRoot.addEventListener("pointerdown", function (event) {
        return _this85._onPointerDown(event);
      });
      return _this85;
    }

    _createClass(XStepperElement, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        if (this.hasAttribute("disabled")) {
          this["#increment-button"].removeAttribute("data-pressed");
          this["#decrement-button"].removeAttribute("data-pressed");
        }
      }
    }, {
      key: "_onPointerDown",
      value: async function _onPointerDown(pointerDownEvent) {
        var _this86 = this;

        var button = pointerDownEvent.target.closest(".button");
        var action = null;

        if (button === this["#increment-button"]) {
          action = "increment";
        } else if (button === this["#decrement-button"]) {
          action = "decrement";
        }

        if (pointerDownEvent.buttons !== 1 || action === null) {
          return;
        }

        // Provide "pressed" attribute for theming purposes which acts like :active pseudo-class, but is guaranteed
        // to last at least 100ms.
        {
          var pointerDownTimeStamp = Date.now();

          button.setAttribute("data-pressed", "");
          this.setPointerCapture(pointerDownEvent.pointerId);

          this.addEventListener("lostpointercapture", async function (event) {
            var pressedTime = Date.now() - pointerDownTimeStamp;
            var minPressedTime = 100;

            if (pressedTime < minPressedTime) {
              await sleep(minPressedTime - pressedTime);
            }

            button.removeAttribute("data-pressed");
          }, { once: true });
        }

        // Dispatch events
        {
          var intervalID = null;
          var _pointerDownTimeStamp = Date.now();
          var shiftKey = pointerDownEvent.shiftKey;


          this.dispatchEvent(new CustomEvent(action + "start", { bubbles: true }));
          this.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: { shiftKey: shiftKey } }));

          this.addEventListener("lostpointercapture", async function (event) {
            clearInterval(intervalID);
            _this86.dispatchEvent(new CustomEvent(action + "end", { bubbles: true }));
          }, { once: true });

          intervalID = setInterval(function () {
            if (Date.now() - _pointerDownTimeStamp > 500) {
              _this86.dispatchEvent(new CustomEvent(action, { bubbles: true, detail: { shiftKey: shiftKey } }));
            }
          }, 100);
        }
      }
    }]);

    return XStepperElement;
  }(HTMLElement);

  customElements.define("x-stepper", XStepperElement);

  var shadowTemplate$q = html(_templateObject30);

  var XSwatchElement = function (_HTMLElement31) {
    _inherits(XSwatchElement, _HTMLElement31);

    _createClass(XSwatchElement, [{
      key: "value",


      // @info
      //   Value associated with this button.
      // @type
      //   string
      // @default
      //   "white"
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "white";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "selected",
      get: function get() {
        return this.hasAttribute("selected");
      },
      set: function set(selected) {
        selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
      }

      // @info
      //   Whether to show selection icon on hover and when the swatch is selected.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "showicon",
      get: function get() {
        return this.hasAttribute("showicon");
      },
      set: function set(showicon) {
        showicon ? this.setAttribute("showicon", "") : this.removeAttribute("showicon");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["disabled"];
      }
    }]);

    function XSwatchElement() {
      _classCallCheck(this, XSwatchElement);

      var _this87 = _possibleConstructorReturn(this, (XSwatchElement.__proto__ || Object.getPrototypeOf(XSwatchElement)).call(this));

      _this87._shadowRoot = _this87.attachShadow({ mode: "closed" });
      _this87._shadowRoot.append(document.importNode(shadowTemplate$q.content, true));

      var _iteratorNormalCompletion68 = true;
      var _didIteratorError68 = false;
      var _iteratorError68 = undefined;

      try {
        for (var _iterator68 = _this87._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step68; !(_iteratorNormalCompletion68 = (_step68 = _iterator68.next()).done); _iteratorNormalCompletion68 = true) {
          var element = _step68.value;

          _this87["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError68 = true;
        _iteratorError68 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion68 && _iterator68.return) {
            _iterator68.return();
          }
        } finally {
          if (_didIteratorError68) {
            throw _iteratorError68;
          }
        }
      }

      return _this87;
    }

    _createClass(XSwatchElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this["#main"].style.background = this.value;
      }
    }]);

    return XSwatchElement;
  }(HTMLElement);

  customElements.define("x-swatch", XSwatchElement);

  var easing$5 = "cubic-bezier(0.4, 0, 0.2, 1)";
  var $oldTabIndex$a = Symbol();

  var shadowTemplate$r = html(_templateObject31);

  // @events
  //   toggle

  var XSwitchElement = function (_HTMLElement32) {
    _inherits(XSwitchElement, _HTMLElement32);

    _createClass(XSwitchElement, [{
      key: "toggled",


      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("toggled");
      },
      set: function set(toggled) {
        toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["toggled", "disabled"];
      }
    }]);

    function XSwitchElement() {
      _classCallCheck(this, XSwitchElement);

      var _this88 = _possibleConstructorReturn(this, (XSwitchElement.__proto__ || Object.getPrototypeOf(XSwitchElement)).call(this));

      _this88._shadowRoot = _this88.attachShadow({ mode: "closed" });
      _this88._shadowRoot.append(document.importNode(shadowTemplate$r.content, true));

      var _iteratorNormalCompletion69 = true;
      var _didIteratorError69 = false;
      var _iteratorError69 = undefined;

      try {
        for (var _iterator69 = _this88._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step69; !(_iteratorNormalCompletion69 = (_step69 = _iterator69.next()).done); _iteratorNormalCompletion69 = true) {
          var element = _step69.value;

          _this88["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError69 = true;
        _iteratorError69 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion69 && _iterator69.return) {
            _iterator69.return();
          }
        } finally {
          if (_didIteratorError69) {
            throw _iteratorError69;
          }
        }
      }

      _this88.addEventListener("pointerdown", function (event) {
        return _this88._onPointerDown(event);
      });
      _this88.addEventListener("click", function (event) {
        return _this88._onClick(event);
      });
      _this88.addEventListener("keydown", function (event) {
        return _this88._onKeyDown(event);
      });
      return _this88;
    }

    _createClass(XSwitchElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "toggled") {
          this._onToggledAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "switch");
        this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$a] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$a] > 0 ? this[$oldTabIndex$a] : 0;
          }

          delete this[$oldTabIndex$a];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onToggledAttributeChange",
      value: function _onToggledAttributeChange() {
        this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onPointerDown",
      value: function _onPointerDown(event) {
        if (event.buttons !== 1) {
          event.preventDefault();
          return;
        }

        // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
        if (this.matches(":focus") === false) {
          event.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }

        // Ripple
        {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "unbounded") {
            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple");
            this["#ripples"].append(ripple);

            var transformAnimation = ripple.animate({ transform: ["translate(-50%, -50%) scale(0)", "translate(-50%, -50%) scale(1)"] }, { duration: 200, easing: easing$5 });

            this.setPointerCapture(event.pointerId);

            this.addEventListener("lostpointercapture", async function () {
              await transformAnimation.finished;

              var opacityAnimation = ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 200, easing: easing$5 });

              await opacityAnimation.finished;

              ripple.remove();
            }, { once: true });
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        // Update state
        {
          if (this.mixed) {
            this.mixed = false;
          } else {
            this.toggled = !this.toggled;
          }

          this.dispatchEvent(new CustomEvent("toggle"));
        }

        // Ripple
        if (event.isTrusted === false) {
          var rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

          if (rippleType === "unbounded") {
            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple");
            this["#ripples"].append(ripple);

            await ripple.animate({ transform: ["translate(-50%, -50%) scale(0)", "translate(-50%, -50%) scale(1)"] }, { duration: 200, easing: easing$5 }).finished;

            await ripple.animate({ opacity: [getComputedStyle(ripple).opacity, "0"] }, { duration: 200, easing: easing$5 }).finished;

            ripple.remove();
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();
          this.click();
        }
      }
    }]);

    return XSwitchElement;
  }(HTMLElement);

  customElements.define("x-switch", XSwitchElement);

  var max$6 = Math.max;

  var easing$6 = "cubic-bezier(0.4, 0, 0.2, 1)";

  var shadowTemplate$s = html(_templateObject32);

  var XTabElement = function (_HTMLElement33) {
    _inherits(XTabElement, _HTMLElement33);

    _createClass(XTabElement, [{
      key: "value",


      // @info
      //   Value associated with this tab.
      // @type
      //   string
      // @default
      //   ""
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "selected",
      get: function get() {
        return this.hasAttribute("selected");
      },
      set: function set(selected) {
        selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["selected", "disabled"];
      }
    }]);

    function XTabElement() {
      _classCallCheck(this, XTabElement);

      var _this89 = _possibleConstructorReturn(this, (XTabElement.__proto__ || Object.getPrototypeOf(XTabElement)).call(this));

      _this89._shadowRoot = _this89.attachShadow({ mode: "closed" });
      _this89._shadowRoot.append(document.importNode(shadowTemplate$s.content, true));

      var _iteratorNormalCompletion70 = true;
      var _didIteratorError70 = false;
      var _iteratorError70 = undefined;

      try {
        for (var _iterator70 = _this89._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step70; !(_iteratorNormalCompletion70 = (_step70 = _iterator70.next()).done); _iteratorNormalCompletion70 = true) {
          var element = _step70.value;

          _this89["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError70 = true;
        _iteratorError70 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion70 && _iterator70.return) {
            _iterator70.return();
          }
        } finally {
          if (_didIteratorError70) {
            throw _iteratorError70;
          }
        }
      }

      _this89.addEventListener("pointerdown", function (event) {
        return _this89._onPointerDown(event);
      });
      _this89.addEventListener("click", function (event) {
        return _this89._onClick(event);
      });
      return _this89;
    }

    _createClass(XTabElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
        this.setAttribute("role", "tab");
        this.setAttribute("aria-selected", this.selected);
        this.setAttribute("aria-disabled", this.disabled);

        this._updateArrowVisibility();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "selected") {
          this._onSelectedAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateArrowVisibility",
      value: function _updateArrowVisibility() {
        var menu = this.querySelector("x-menu");
        var popover = this.querySelector("x-popover");
        this["#arrow"].style.display = menu === null && popover === null ? "none" : null;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onSelectedAttributeChange",
      value: function _onSelectedAttributeChange() {
        this.setAttribute("aria-selected", this.selected);
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this.setAttribute("aria-disabled", this.disabled);
        this.setAttribute("tabindex", this.selected ? "0" : "-1");
      }
    }, {
      key: "_onPointerDown",
      value: async function _onPointerDown(pointerDownEvent) {
        var _this90 = this;

        // Don't focus the tab with pointer
        if (this.matches(":focus") === false && !pointerDownEvent.target.closest("x-menu, x-popup")) {
          pointerDownEvent.preventDefault();

          var ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
        }

        if (pointerDownEvent.buttons !== 1 || this.querySelector("x-menu")) {
          return;
        }

        // Provide "pressed" attribute for theming purposes
        {
          var pointerDownTimeStamp = Date.now();

          this.setAttribute("pressed", "");
          this.setPointerCapture(pointerDownEvent.pointerId);

          this.addEventListener("lostpointercapture", async function (event) {
            if (_this90.selected === true) {
              var pressedTime = Date.now() - pointerDownTimeStamp;
              var minPressedTime = 100;

              if (pressedTime < minPressedTime) {
                await sleep(minPressedTime - pressedTime);
              }
            }

            _this90.removeAttribute("pressed");
          }, { once: true });
        }

        // Ripple
        {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            var bounds = this["#ripples"].getBoundingClientRect();
            var size = max$6(bounds.width, bounds.height) * 1.5;
            var top = pointerDownEvent.clientY - bounds.y - size / 2;
            var left = pointerDownEvent.clientX - bounds.x - size / 2;
            var whenLostPointerCapture = new Promise(function (r) {
              return _this90.addEventListener("lostpointercapture", r, { once: true });
            });

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple pointer-down-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
            this["#ripples"].append(ripple);

            this.setPointerCapture(pointerDownEvent.pointerId);

            // Workaround for tabs that that change their color when selected
            ripple.hidden = true;
            await sleep(10);
            ripple.hidden = false;

            var inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"] }, { duration: 300, easing: easing$6 });

            await whenLostPointerCapture;
            await inAnimation.finished;

            var fromOpacity = getComputedStyle(ripple).opacity;
            var outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$6 });
            await outAnimation.finished;

            ripple.remove();
          }
        }
      }
    }, {
      key: "_onClick",
      value: async function _onClick(event) {
        // Ripple
        if (this["#ripples"].querySelector(".pointer-down-ripple") === null && !this.querySelector("x-menu")) {
          var triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

          if (triggerEffect === "ripple") {
            var bounds = this["#ripples"].getBoundingClientRect();
            var size = max$6(bounds.width, bounds.height) * 1.5;
            var top = bounds.y + bounds.height / 2 - bounds.y - size / 2;
            var left = bounds.x + bounds.width / 2 - bounds.x - size / 2;

            var ripple = createElement("div");
            ripple.setAttribute("class", "ripple click-ripple");
            ripple.setAttribute("style", "width: " + size + "px; height: " + size + "px; top: " + top + "px; left: " + left + "px;");
            this["#ripples"].append(ripple);

            var inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"] }, { duration: 300, easing: easing$6 });
            await inAnimation.finished;

            var fromOpacity = getComputedStyle(ripple).opacity;
            var outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$6 });
            await outAnimation.finished;

            ripple.remove();
          }
        }
      }
    }]);

    return XTabElement;
  }(HTMLElement);

  customElements.define("x-tab", XTabElement);

  var shadowTemplate$t = html(_templateObject33);

  // @events
  //   change

  var XTabsElement = function (_HTMLElement34) {
    _inherits(XTabsElement, _HTMLElement34);

    _createClass(XTabsElement, [{
      key: "value",

      // @type
      //   string?
      // @default
      //   null
      get: function get() {
        var selectedTab = this.querySelector("x-tab[selected]");
        return selectedTab ? selectedTab.value : null;
      },
      set: function set(value) {
        var tabs = [].concat(_toConsumableArray(this.querySelectorAll("x-tab")));
        var selectedTab = value === null ? null : tabs.find(function (tab) {
          return tab.value === value;
        });

        var _iteratorNormalCompletion71 = true;
        var _didIteratorError71 = false;
        var _iteratorError71 = undefined;

        try {
          for (var _iterator71 = tabs[Symbol.iterator](), _step71; !(_iteratorNormalCompletion71 = (_step71 = _iterator71.next()).done); _iteratorNormalCompletion71 = true) {
            var tab = _step71.value;

            tab.selected = tab === selectedTab;
          }
        } catch (err) {
          _didIteratorError71 = true;
          _iteratorError71 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion71 && _iterator71.return) {
              _iterator71.return();
            }
          } finally {
            if (_didIteratorError71) {
              throw _iteratorError71;
            }
          }
        }
      }

      // @property
      //   reflected
      // @type
      //   boolean
      // @default
      //   false

    }, {
      key: "centered",
      get: function get() {
        return this.hasAttribute("centered");
      },
      set: function set(centered) {
        centered === true ? this.setAttribute("centered", "") : this.removeAttribute("centered");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XTabsElement() {
      _classCallCheck(this, XTabsElement);

      var _this91 = _possibleConstructorReturn(this, (XTabsElement.__proto__ || Object.getPrototypeOf(XTabsElement)).call(this));

      _this91._wasFocusedBeforeExpanding = false;

      _this91._shadowRoot = _this91.attachShadow({ mode: "closed" });
      _this91._shadowRoot.append(document.importNode(shadowTemplate$t.content, true));

      var _iteratorNormalCompletion72 = true;
      var _didIteratorError72 = false;
      var _iteratorError72 = undefined;

      try {
        for (var _iterator72 = _this91._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step72; !(_iteratorNormalCompletion72 = (_step72 = _iterator72.next()).done); _iteratorNormalCompletion72 = true) {
          var element = _step72.value;

          _this91["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError72 = true;
        _iteratorError72 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion72 && _iterator72.return) {
            _iterator72.return();
          }
        } finally {
          if (_didIteratorError72) {
            throw _iteratorError72;
          }
        }
      }

      _this91["#backdrop"] = createElement("x-backdrop");
      _this91["#backdrop"].style.background = "rgba(0, 0, 0, 0)";

      _this91.addEventListener("click", function (event) {
        return _this91._onClick(event);
      });
      _this91.addEventListener("keydown", function (event) {
        return _this91._onKeyDown(event);
      });
      return _this91;
    }

    _createClass(XTabsElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("role", "tablist");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Expands given tab by opening its menu.

    }, {
      key: "_expand",
      value: function _expand(tab) {
        var _this92 = this;

        return new Promise(async function (resolve) {
          var menu = tab.querySelector(":scope > x-menu");
          var label = tab.querySelector("x-label");

          if (menu) {
            _this92._wasFocusedBeforeExpanding = _this92.querySelector("*:focus") !== null;

            var over = getComputedStyle(tab).getPropertyValue("--menu-position").trim() === "over";
            var whenOpened = over ? menu.openOverLabel(label) : menu.openNextToElement(tab, "vertical", 3);

            tab.setAttribute("expanded", "");

            // When menu closes, focus the tab
            menu.addEventListener("close", function () {
              var tabs = _this92.querySelectorAll("x-tab");
              var closedTab = tab;

              if (_this92._wasFocusedBeforeExpanding) {
                var _iteratorNormalCompletion73 = true;
                var _didIteratorError73 = false;
                var _iteratorError73 = undefined;

                try {
                  for (var _iterator73 = tabs[Symbol.iterator](), _step73; !(_iteratorNormalCompletion73 = (_step73 = _iterator73.next()).done); _iteratorNormalCompletion73 = true) {
                    var _tab10 = _step73.value;

                    _tab10.tabIndex = _tab10 === closedTab ? 0 : -1;
                  }
                } catch (err) {
                  _didIteratorError73 = true;
                  _iteratorError73 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion73 && _iterator73.return) {
                      _iterator73.return();
                    }
                  } finally {
                    if (_didIteratorError73) {
                      throw _iteratorError73;
                    }
                  }
                }

                closedTab.focus();
              } else {
                var _iteratorNormalCompletion74 = true;
                var _didIteratorError74 = false;
                var _iteratorError74 = undefined;

                try {
                  for (var _iterator74 = tabs[Symbol.iterator](), _step74; !(_iteratorNormalCompletion74 = (_step74 = _iterator74.next()).done); _iteratorNormalCompletion74 = true) {
                    var _tab11 = _step74.value;

                    _tab11.tabIndex = _tab11.selected ? 0 : -1;
                  }
                } catch (err) {
                  _didIteratorError74 = true;
                  _iteratorError74 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion74 && _iterator74.return) {
                      _iterator74.return();
                    }
                  } finally {
                    if (_didIteratorError74) {
                      throw _iteratorError74;
                    }
                  }
                }

                var ancestorFocusableElement = closest(_this92.parentNode, "[tabindex]");

                if (ancestorFocusableElement) {
                  ancestorFocusableElement.focus();
                }
              }
            }, { once: true });

            await whenOpened;

            if (!tab.querySelector("*:focus")) {
              menu.focus();
            }

            _this92["#backdrop"].ownerElement = menu;
            _this92["#backdrop"].show(false);
          }

          resolve();
        });
      }

      // @info
      //   Collapses currently expanded tab by closing its menu.

    }, {
      key: "_collapse",
      value: function _collapse(delay) {
        var _this93 = this;

        return new Promise(async function (resolve) {
          var menu = _this93.querySelector("x-menu[opened]");

          if (menu && !menu.hasAttribute("closing")) {
            var tabs = _this93.querySelectorAll("x-tab");
            var closedTab = menu.closest("x-tab");
            menu.setAttribute("closing", "");

            await delay;
            await menu.close();

            _this93["#backdrop"].hide(false);

            menu.removeAttribute("closing");
            closedTab.removeAttribute("expanded");
          }
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_animateSelectionIndicator",
      value: function _animateSelectionIndicator(startTab, endTab) {
        var _this94 = this;

        return new Promise(async function (resolve) {
          var mainBBox = _this94.getBoundingClientRect();
          var startBBox = startTab ? startTab.getBoundingClientRect() : null;
          var endBBox = endTab.getBoundingClientRect();
          var computedStyle = getComputedStyle(endTab);

          if (startBBox === null) {
            startBBox = DOMRect.fromRect(endBBox);
            startBBox.x += startBBox.width / 2;
            startBBox.width = 0;
          }

          _this94["#selection-indicator"].style.height = computedStyle.getPropertyValue("--selection-indicator-height");

          if (_this94["#selection-indicator"].style.height !== "0px") {
            _this94["#selection-indicator"].style.background = computedStyle.getPropertyValue("--selection-indicator-background");
            _this94["#selection-indicator"].hidden = false;

            _this94.setAttribute("animatingindicator", "");

            var _animation4 = _this94["#selection-indicator"].animate([{
              bottom: startBBox.bottom - mainBBox.bottom + "px",
              left: startBBox.left - mainBBox.left + "px",
              width: startBBox.width + "px"
            }, {
              bottom: endBBox.bottom - mainBBox.bottom + "px",
              left: endBBox.left - mainBBox.left + "px",
              width: endBBox.width + "px"
            }], {
              duration: 100,
              iterations: 1,
              delay: 0,
              easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            });

            await _animation4.finished;

            _this94["#selection-indicator"].hidden = true;
            _this94.removeAttribute("animatingindicator");
          }

          resolve();
        });
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onClick",
      value: function _onClick(event) {
        if (event.button !== 0) {
          return;
        }

        if (event.target.closest("x-backdrop")) {
          this._collapse();
        } else if (event.target.closest("x-menu")) {
          var clickedMenuItem = event.target.closest("x-menuitem");

          if (clickedMenuItem && clickedMenuItem.disabled === false) {
            var submenu = clickedMenuItem.querySelector("x-menu");

            if (submenu) {
              if (submenu.opened) {
                submenu.close();
              } else {
                submenu.openNextToElement(clickedMenuItem, "horizontal");
              }
            } else {
              this._collapse(clickedMenuItem.whenTriggerEnd);
            }
          }
        } else if (event.target.closest("x-tab")) {
          var tabs = this.querySelectorAll("x-tab");
          var clickedTab = event.target.closest("x-tab");
          var selectedTab = this.querySelector("x-tab[selected]");
          var _submenu = clickedTab.querySelector(":scope > x-menu");

          if (clickedTab !== selectedTab) {
            // Open a popup menu
            if (_submenu) {
              this._expand(clickedTab);
            }

            // Select the tab
            else {
                var _iteratorNormalCompletion75 = true;
                var _didIteratorError75 = false;
                var _iteratorError75 = undefined;

                try {
                  for (var _iterator75 = tabs[Symbol.iterator](), _step75; !(_iteratorNormalCompletion75 = (_step75 = _iterator75.next()).done); _iteratorNormalCompletion75 = true) {
                    var tab = _step75.value;

                    tab.selected = tab === clickedTab;
                  }
                } catch (err) {
                  _didIteratorError75 = true;
                  _iteratorError75 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion75 && _iterator75.return) {
                      _iterator75.return();
                    }
                  } finally {
                    if (_didIteratorError75) {
                      throw _iteratorError75;
                    }
                  }
                }

                this._animateSelectionIndicator(selectedTab, clickedTab);
                this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
              }
          }
        }
      }
    }, {
      key: "_onKeyDown",
      value: function _onKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
          var tab = event.target;
          var menu = tab.querySelector("x-menu");
          var label = tab.querySelector("x-label");

          if (menu) {
            if (menu.opened) {
              this._collapse();
              event.preventDefault();
            } else {
              this._expand(tab);
              event.preventDefault();
            }
          } else {
            event.preventDefault();
            tab.click();
          }
        } else if (event.code === "Escape") {
          var _tab12 = event.target.closest("x-tab");
          var _menu4 = _tab12.querySelector("x-menu");

          if (_menu4) {
            this._collapse();
          }
        } else if (event.code === "ArrowLeft") {
          var tabs = [].concat(_toConsumableArray(this.querySelectorAll("x-tab:not([disabled])")));
          var currentTab = this.querySelector("x-tab[tabindex=\"0\"]");
          var clickedTab = event.target;
          var openedTabMenu = this.querySelector("x-menu[opened]");

          event.preventDefault();

          if (openedTabMenu) ;else if (currentTab && tabs.length > 0) {
            var currentTabIndex = tabs.indexOf(currentTab);
            var previousTab = tabs[currentTabIndex - 1] || tabs[tabs.length - 1];

            currentTab.tabIndex = -1;
            previousTab.tabIndex = 0;
            previousTab.focus();
          }
        } else if (event.code === "ArrowRight") {
          var _tabs2 = [].concat(_toConsumableArray(this.querySelectorAll("x-tab:not([disabled])")));
          var _currentTab3 = this.querySelector("x-tab[tabindex=\"0\"]");
          var _clickedTab = event.target;
          var _openedTabMenu = this.querySelector("x-menu[opened]");

          event.preventDefault();

          if (_openedTabMenu) ;else if (_currentTab3 && _tabs2.length > 0) {
            var _currentTabIndex = _tabs2.indexOf(_currentTab3);
            var nextTab = _tabs2[_currentTabIndex + 1] || _tabs2[0];

            _currentTab3.tabIndex = -1;
            nextTab.tabIndex = 0;
            nextTab.focus();
          }
        } else if (event.code === "ArrowUp") {
          var _tab13 = event.target.closest("x-tab");
          var _menu5 = _tab13.querySelector("x-menu");

          if (_menu5) {
            event.preventDefault();

            if (_menu5.opened) {
              var lastMenuItem = _menu5.querySelector(":scope > x-menuitem:last-of-type:not([disabled])");

              if (lastMenuItem) {
                lastMenuItem.focus();
              }
            } else {
              this._expand(_tab13);
            }
          }
        } else if (event.code === "ArrowDown") {
          var _tab14 = event.target.closest("x-tab");
          var _menu6 = _tab14.querySelector("x-menu");

          if (_menu6) {
            event.preventDefault();

            if (_menu6.opened) {
              var firstMenuItem = _menu6.querySelector(":scope > x-menuitem:not([disabled])");

              if (firstMenuItem) {
                firstMenuItem.focus();
              }
            } else {
              this._expand(_tab14);
            }
          }
        }
      }
    }]);

    return XTabsElement;
  }(HTMLElement);

  customElements.define("x-tabs", XTabsElement);

  var $oldTabIndex$b = Symbol();

  var shadowTemplate$u = html(_templateObject34);

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend

  var XTagInputElement = function (_HTMLElement35) {
    _inherits(XTagInputElement, _HTMLElement35);

    _createClass(XTagInputElement, [{
      key: "value",


      // @type
      //   Array<string>
      // @default
      //   []
      // @attribute
      get: function get() {
        if (this.hasAttribute("value")) {
          return this.getAttribute("value").split(this.delimiter).map(function ($0) {
            return $0.trim();
          }).filter(function ($0) {
            return $0 !== "";
          });
        } else {
          return [];
        }
      },
      set: function set(value) {
        if (value.length === 0) {
          this.removeAttribute("value");
        } else {
          this.setAttribute("value", value.join(this.delimiter));
        }
      }

      // @type
      //   string

    }, {
      key: "delimiter",
      get: function get() {
        return this.hasAttribute("delimiter") ? this.getAttribute("delimiter") : ",";
      },
      set: function set(delimiter) {
        this.setAttribute("delimiter", delimiter);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "spellcheck",
      get: function get() {
        return this.hasAttribute("spellcheck");
      },
      set: function set(spellcheck) {
        spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
      }

      // @type
      //   string

    }, {
      key: "prefix",
      get: function get() {
        return this.hasAttribute("prefix") ? this.getAttribute("prefix") : "";
      },
      set: function set(prefix) {
        prefix === "" ? this.removeAttribute("prefix") : this.setAttribute("prefix", prefix);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "spellcheck", "disabled"];
      }
    }]);

    function XTagInputElement() {
      _classCallCheck(this, XTagInputElement);

      var _this95 = _possibleConstructorReturn(this, (XTagInputElement.__proto__ || Object.getPrototypeOf(XTagInputElement)).call(this));

      _this95._shadowRoot = _this95.attachShadow({ mode: "closed", delegatesFocus: true });
      _this95._shadowRoot.append(document.importNode(shadowTemplate$u.content, true));

      var _iteratorNormalCompletion76 = true;
      var _didIteratorError76 = false;
      var _iteratorError76 = undefined;

      try {
        for (var _iterator76 = _this95._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step76; !(_iteratorNormalCompletion76 = (_step76 = _iterator76.next()).done); _iteratorNormalCompletion76 = true) {
          var element = _step76.value;

          _this95["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError76 = true;
        _iteratorError76 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion76 && _iterator76.return) {
            _iterator76.return();
          }
        } finally {
          if (_didIteratorError76) {
            throw _iteratorError76;
          }
        }
      }

      _this95.addEventListener("focusin", function (event) {
        return _this95._onFocusIn(event);
      });
      _this95.addEventListener("focusout", function (event) {
        return _this95._onFocusOut(event);
      });
      _this95._shadowRoot.addEventListener("pointerdown", function (event) {
        return _this95._onShadowRootPointerDown(event);
      });
      _this95._shadowRoot.addEventListener("click", function (event) {
        return _this95._onShadowRootClick(event);
      });
      _this95["#editable-item"].addEventListener("keydown", function (event) {
        return _this95._onInputKeyDown(event);
      });
      _this95["#editable-item"].addEventListener("input", function (event) {
        return _this95._onInputInput(event);
      });
      return _this95;
    }

    _createClass(XTagInputElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "spellcheck") {
          this._onSpellcheckAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        }
      }

      // @info
      //   Override this method if you want the entered tags to match specific criteria.
      // @type
      //   (string) => boolean

    }, {
      key: "validateTag",
      value: function validateTag(tag) {
        return true;
      }
    }, {
      key: "_commitInput",
      value: function _commitInput() {
        this._updateValidityState();

        if (this.hasAttribute("error") === false) {
          var tag = this["#editable-item"].textContent.trim();
          this["#editable-item"].textContent = "";

          if (tag.length > 0) {
            if (this.value.includes(tag) === false) {
              var value = this.value.filter(function ($0) {
                return $0 !== tag;
              });
              this.value = [].concat(_toConsumableArray(value), [tag]);
              this.dispatchEvent(new CustomEvent("change"));
            }
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        var _arr2 = [].concat(_toConsumableArray(this["#items"].children));

        for (var _i6 = 0; _i6 < _arr2.length; _i6++) {
          var item = _arr2[_i6];
          if (item !== this["#editable-item"]) {
            item.remove();
          }
        }

        var _iteratorNormalCompletion77 = true;
        var _didIteratorError77 = false;
        var _iteratorError77 = undefined;

        try {
          for (var _iterator77 = this.value[Symbol.iterator](), _step77; !(_iteratorNormalCompletion77 = (_step77 = _iterator77.next()).done); _iteratorNormalCompletion77 = true) {
            var tag = _step77.value;

            this["#editable-item"].insertAdjacentHTML("beforebegin", "\n        <div class=\"item\" data-tag=\"" + tag + "\">\n          <label>" + this.prefix + tag + "</label>\n          <svg class=\"close-button\" viewBox=\"0 0 100 100\"><path class=\"close-button-path\"></path></svg>\n        </div>\n      ");
          }
        } catch (err) {
          _didIteratorError77 = true;
          _iteratorError77 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion77 && _iterator77.return) {
              _iterator77.return();
            }
          } finally {
            if (_didIteratorError77) {
              throw _iteratorError77;
            }
          }
        }

        this._updatePlaceholderVisibility();
      }
    }, {
      key: "_updateValidityState",
      value: function _updateValidityState() {
        var tag = this["#editable-item"].textContent.trim();

        if (this.validateTag(tag) === true || tag.length === 0) {
          this.removeAttribute("error");
        } else {
          this.setAttribute("error", "");
        }
      }
    }, {
      key: "_updatePlaceholderVisibility",
      value: function _updatePlaceholderVisibility() {
        var placeholder = this.querySelector(":scope > x-label");

        if (placeholder) {
          placeholder.hidden = this.value.length > 0 || this["#editable-item"].textContent.length > 0;
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "input");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$b] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$b] > 0 ? this[$oldTabIndex$b] : 0;
          }

          delete this[$oldTabIndex$b];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this._update();
      }
    }, {
      key: "_onSpellcheckAttributeChange",
      value: function _onSpellcheckAttributeChange() {
        this["#editable-item"].spellcheck = this.spellcheck;
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onFocusIn",
      value: function _onFocusIn() {
        this.dispatchEvent(new CustomEvent("textinputmodestart", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut() {
        this._commitInput();
        this["#editable-item"].removeAttribute("contenteditable");
        this.dispatchEvent(new CustomEvent("textinputmodeend", { bubbles: true, composed: true }));

        if (this.hasAttribute("error")) {
          this["#editable-item"].textContent = "";
          this.removeAttribute("error");
        }
      }
    }, {
      key: "_onShadowRootPointerDown",
      value: function _onShadowRootPointerDown(event) {
        if (event.target === this["#main"] || event.target === this["#items"]) {
          event.preventDefault();

          this["#editable-item"].setAttribute("contenteditable", "");

          var range = new Range();
          range.selectNodeContents(this["#editable-item"]);
          range.collapse(false);

          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (event.target.matches(".item, .item > *")) {
          var item = event.target.closest(".item");
          var closeButton = event.target.closest(".close-button");

          if (item !== this["#editable-item"] && !closeButton) {
            event.preventDefault();
            event.stopPropagation();
            this["#editable-item"].focus();
            this._commitInput();
          }
        }
      }
    }, {
      key: "_onShadowRootClick",
      value: function _onShadowRootClick(event) {
        if (event.target.closest(".close-button")) {
          this._onCloseButtonClick(event);
        }
      }
    }, {
      key: "_onCloseButtonClick",
      value: function _onCloseButtonClick(event) {
        var item = event.target.closest(".item");
        this.value = this.value.filter(function (tag) {
          return tag !== item.getAttribute("data-tag");
        });
        this.dispatchEvent(new CustomEvent("change"));
      }
    }, {
      key: "_onInputKeyDown",
      value: function _onInputKeyDown(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          this._commitInput();
        } else if (event.key === "Backspace") {
          var value = this["#editable-item"].textContent;

          if (value.length === 0) {
            this.value = this.value.slice(0, this.value.length - 1);
            this.dispatchEvent(new CustomEvent("change"));
          }
        }
      }
    }, {
      key: "_onInputInput",
      value: function _onInputInput() {
        var value = this["#editable-item"].textContent;

        if (value.includes(this.delimiter)) {
          this._commitInput();
        }

        this._updatePlaceholderVisibility();

        if (this.hasAttribute("error")) {
          this._updateValidityState();
        }

        this.dispatchEvent(new CustomEvent("input"));
      }
    }]);

    return XTagInputElement;
  }(HTMLElement);

  customElements.define("x-taginput", XTagInputElement);

  var $oldTabIndex$c = Symbol();

  var shadowTemplate$v = html(_templateObject35);

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend

  var XTextareaElement = function (_HTMLElement36) {
    _inherits(XTextareaElement, _HTMLElement36);

    _createClass(XTextareaElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   ""
      // @attribute
      get: function get() {
        return this["#editor"].textContent;
      },
      set: function set(value) {
        this["#editor"].textContent = value;

        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }

        this._updateEmptyState();
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "spellcheck",
      get: function get() {
        return this.hasAttribute("spellcheck");
      },
      set: function set(spellcheck) {
        spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
      }

      // @type
      //   number
      // @default
      //   0
      // @attribute

    }, {
      key: "minLength",
      get: function get() {
        return this.hasAttribute("minlength") ? parseInt(this.getAttribute("minlength")) : 0;
      },
      set: function set(minLength) {
        this.setAttribute("minlength", minLength);
      }

      // @type
      //   number || Infinity
      // @default
      //   0
      // @attribute

    }, {
      key: "maxLength",
      get: function get() {
        return this.hasAttribute("maxlength") ? parseInt(this.getAttribute("maxlength")) : Infinity;
      },
      set: function set(maxLength) {
        this.setAttribute("maxlength", maxLength);
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "required",
      get: function get() {
        return this.hasAttribute("required");
      },
      set: function set(required) {
        required ? this.setAttribute("required", "") : this.removeAttribute("required");
      }

      // @info
      //   Whether this textarea has "mixed" state.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "mixed",
      get: function get() {
        return this.hasAttribute("mixed");
      },
      set: function set(mixed) {
        mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
      }

      // @type
      //   boolean
      // @default
      //   false
      // @attribute

    }, {
      key: "disabled",
      get: function get() {
        return this.hasAttribute("disabled");
      },
      set: function set(disabled) {
        disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
      }

      // @info
      //   "auto"    - validate() is called when input loses focus and when user presses "Enter"
      //   "instant" - validate() is called on each key press
      //   "manual"  - you will call validate() manually when user submits the form
      // @type
      //   "auto" || "instant" || "manual"
      // @default
      //   "auto"

    }, {
      key: "validation",
      get: function get() {
        return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
      },
      set: function set(validation) {
        this.setAttribute("validation", validation);
      }

      // @type
      //   string?
      // @default
      //   null
      // @attribute

    }, {
      key: "error",
      get: function get() {
        return this.getAttribute("error");
      },
      set: function set(error) {
        error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value", "spellcheck", "disabled", "validation"];
      }
    }]);

    function XTextareaElement() {
      _classCallCheck(this, XTextareaElement);

      var _this96 = _possibleConstructorReturn(this, (XTextareaElement.__proto__ || Object.getPrototypeOf(XTextareaElement)).call(this));

      _this96._shadowRoot = _this96.attachShadow({ mode: "closed", delegatesFocus: true });
      _this96._shadowRoot.append(document.importNode(shadowTemplate$v.content, true));

      var _iteratorNormalCompletion78 = true;
      var _didIteratorError78 = false;
      var _iteratorError78 = undefined;

      try {
        for (var _iterator78 = _this96._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step78; !(_iteratorNormalCompletion78 = (_step78 = _iterator78.next()).done); _iteratorNormalCompletion78 = true) {
          var element = _step78.value;

          _this96["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError78 = true;
        _iteratorError78 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion78 && _iterator78.return) {
            _iterator78.return();
          }
        } finally {
          if (_didIteratorError78) {
            throw _iteratorError78;
          }
        }
      }

      _this96.addEventListener("focusin", function (event) {
        return _this96._onFocusIn(event);
      });
      _this96.addEventListener("focusout", function (event) {
        return _this96._onFocusOut(event);
      });

      _this96["#editor"].addEventListener("click", function (event) {
        return _this96._onEditorClick(event);
      });
      _this96["#editor"].addEventListener("input", function (event) {
        return _this96._onEditorInput(event);
      });
      return _this96;
    }

    _createClass(XTextareaElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateEmptyState();
        this._updateAccessabilityAttributes();

        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "value") {
          this._onValueAttributeChange();
        } else if (name === "spellcheck") {
          this._onSpellcheckAttributeChange();
        } else if (name === "disabled") {
          this._onDisabledAttributeChange();
        } else if (name === "validation") {
          this._onValidationAttributeChnage();
        }
      }

      // @info
      //   Override this method to validate the textarea value manually.
      // @type
      //   () => void

    }, {
      key: "validate",
      value: function validate() {
        if (this.value.length < this.minLength) {
          this.error = "Entered text is too short";
        } else if (this.value.length > this.maxLength) {
          this.error = "Entered text is too long";
        } else if (this.required && this.value.length === 0) {
          this.error = "This field is required";
        } else {
          this.error = null;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_updateEmptyState",
      value: function _updateEmptyState() {
        if (this.value.length === 0) {
          this.setAttribute("empty", "");
        } else {
          this.removeAttribute("empty");
        }
      }
    }, {
      key: "_updateAccessabilityAttributes",
      value: function _updateAccessabilityAttributes() {
        this.setAttribute("role", "input");
        this.setAttribute("aria-disabled", this.disabled);

        if (this.disabled) {
          this[$oldTabIndex$c] = this.tabIndex > 0 ? this.tabIndex : 0;
          this.tabIndex = -1;
        } else {
          if (this.tabIndex < 0) {
            this.tabIndex = this[$oldTabIndex$c] > 0 ? this[$oldTabIndex$c] : 0;
          }

          delete this[$oldTabIndex$c];
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

        if (this.matches(":focus")) {
          document.execCommand("selectAll");
        }
      }
    }, {
      key: "_onSpellcheckAttributeChange",
      value: function _onSpellcheckAttributeChange() {
        this["#editor"].spellcheck = this.spellcheck;
      }
    }, {
      key: "_onDisabledAttributeChange",
      value: function _onDisabledAttributeChange() {
        this["#editor"].disabled = this.disabled;
        this._updateAccessabilityAttributes();
      }
    }, {
      key: "_onValidationAttributeChnage",
      value: function _onValidationAttributeChnage() {
        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }, {
      key: "_onFocusIn",
      value: function _onFocusIn() {
        this._focusInValue = this.value;
        this.dispatchEvent(new CustomEvent("textinputmodestart", { bubbles: true, composed: true }));
      }
    }, {
      key: "_onFocusOut",
      value: function _onFocusOut() {
        this.dispatchEvent(new CustomEvent("textinputmodeend", { bubbles: true, composed: true }));
        this._shadowRoot.getSelection().collapse(this["#main"]);

        if (this.validation === "auto") {
          this.validate();
        }

        if (this.error === null && (this.value !== this._focusInValue || this.mixed)) {
          this.mixed = false;
          this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
        }
      }
    }, {
      key: "_onEditorClick",
      value: function _onEditorClick(event) {
        if (event.detail >= 4) {
          document.execCommand("selectAll");
        }
      }
    }, {
      key: "_onEditorInput",
      value: function _onEditorInput(event) {
        this.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        this._updateEmptyState();

        if (this.validation === "instant") {
          this.validate();
        } else if (this.validation === "auto") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }]);

    return XTextareaElement;
  }(HTMLElement);

  customElements.define("x-textarea", XTextareaElement);

  var shadowTemplate$w = html(_templateObject36);

  var ringThrobberSVG = "\n  <svg viewBox=\"0 0 100 100\">\n    <style>\n      ellipse {\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-dasharray: 10, 1000;\n        animation: dash-animation 2s cubic-bezier(0.8, 0.25, 0.25, 0.9) infinite, rotate-animation 2s linear infinite;\n        transform-origin: center;\n      }\n\n      @keyframes rotate-animation {\n        to {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes dash-animation {\n        50% {\n          stroke-dasharray: 200;\n          stroke-dashoffset: 0;\n        }\n        100% {\n          stroke-dasharray: 245;\n          stroke-dashoffset: -260;\n        }\n      }\n    </style>\n\n    <ellipse ry=\"40\" rx=\"40\" cy=\"50\" cx=\"50\" stroke-width=\"10\"/>\n  </svg>\n";

  var spinThrobberSVG = "\n  <svg viewBox=\"0 0 100 100\">\n    <style>\n      rect {\n        x: 46.5px;\n        y: 40px;\n        width: 7px;\n        height: 22px;\n        rx: 5px;\n        ry: 5px;\n        fill: currentColor;\n      }\n    </style>\n\n    <rect transform=\"rotate(0 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(30 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.08s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(60 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.17s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(90 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.25s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(120 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.33s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(150 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.42s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(180 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.5s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(210 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.58s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(240 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.66s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(270 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.75s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(300 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.83s\" repeatCount=\"indefinite\" />\n    </rect>\n    <rect transform=\"rotate(330 50 50) translate(0 -38)\">\n      <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"0.92s\" repeatCount=\"indefinite\" />\n    </rect>\n  </svg>\n";

  var XThrobberElement = function (_HTMLElement37) {
    _inherits(XThrobberElement, _HTMLElement37);

    _createClass(XThrobberElement, [{
      key: "type",


      // @type
      //   "ring" || "spin"
      // @default
      //   "ring"
      // @attribute
      get: function get() {
        return this.hasAttribute("type") ? this.getAttribute("type") : "ring";
      },
      set: function set(type) {
        this.setAttribute("type", type);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["type"];
      }
    }]);

    function XThrobberElement() {
      _classCallCheck(this, XThrobberElement);

      var _this97 = _possibleConstructorReturn(this, (XThrobberElement.__proto__ || Object.getPrototypeOf(XThrobberElement)).call(this));

      _this97._shadowRoot = _this97.attachShadow({ mode: "closed" });
      _this97._shadowRoot.append(document.importNode(shadowTemplate$w.content, true));

      var _iteratorNormalCompletion79 = true;
      var _didIteratorError79 = false;
      var _iteratorError79 = undefined;

      try {
        for (var _iterator79 = _this97._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step79; !(_iteratorNormalCompletion79 = (_step79 = _iterator79.next()).done); _iteratorNormalCompletion79 = true) {
          var element = _step79.value;

          _this97["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError79 = true;
        _iteratorError79 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion79 && _iterator79.return) {
            _iterator79.return();
          }
        } finally {
          if (_didIteratorError79) {
            throw _iteratorError79;
          }
        }
      }

      return _this97;
    }

    _createClass(XThrobberElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "type") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: async function _update() {
        this["#main"].innerHTML = this.type === "ring" ? ringThrobberSVG : spinThrobberSVG;

        if (this.hasAttribute("type") === false) {
          this.setAttribute("type", this.type);
        }
      }
    }]);

    return XThrobberElement;
  }(HTMLElement);

  customElements.define("x-throbber", XThrobberElement);

  var PI$2 = Math.PI,
      sqrt$2 = Math.sqrt,
      atan2$1 = Math.atan2,
      sin = Math.sin,
      cos = Math.cos,
      pow$2 = Math.pow;


  var shadowHTML$3 = "\n  <style>\n    :host {\n      display: block;\n      width: 100%;\n      user-select: none;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n\n    /**\n     * Hue-saturation slider\n     */\n\n    #huesat-slider {\n      display: flex;\n      position: relative;\n      width: 100%;\n      height: auto;\n      touch-action: pinch-zoom;\n    }\n\n    #huesat-image {\n      width: 100%;\n      height: 100%;\n      border-radius: 999px;\n      pointer-events: none;\n    }\n\n    #huesat-marker {\n      position: absolute;\n      top: 0%;\n      left: 0%;\n      width: var(--marker-size);\n      height: var(--marker-size);\n      transform: translate(calc(var(--marker-size) / -2), calc(var(--marker-size) / -2));\n      box-sizing: border-box;\n      background: rgba(0, 0, 0, 0.3);\n      border: 3px solid white;\n      border-radius: 999px;\n      box-shadow: 0 0 3px black;\n      --marker-size: 20px;\n    }\n\n    /**\n     * Value slider\n     */\n\n    #value-slider {\n      width: 100%;\n      height: 28px;\n      margin-top: 10px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border: 1px solid #cecece;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n\n    #value-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #value-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n\n    /**\n     * Alpha slider\n     */\n\n    #alpha-slider {\n      display: none;\n      width: 100%;\n      height: 28px;\n      margin-top: 14px;\n      padding: 0 calc(var(--marker-width) / 2);\n      box-sizing: border-box;\n      border: 1px solid #cecece;\n      border-radius: 2px;\n      touch-action: pan-y;\n      --marker-width: 18px;\n    }\n    :host([alphaslider]) #alpha-slider {\n      display: block;\n    }\n\n    #alpha-slider-track {\n      width: 100%;\n      height: 100%;\n      position: relative;\n      display: flex;\n      align-items: center;\n    }\n\n    #alpha-slider-marker {\n      position: absolute;\n      left: 0%;\n      background: rgba(0, 0, 0, 0.2);\n      box-shadow: 0 0 3px black;\n      box-sizing: border-box;\n      transform: translateX(calc((var(--marker-width) / 2) * -1));\n      border: 3px solid white;\n      width: var(--marker-width);\n      height: 32px;\n      position: absolute;\n    }\n  </style>\n\n  <x-box vertical>\n    <div id=\"huesat-slider\">\n      <img id=\"huesat-image\" src=\"node_modules/xel/images/wheel-spectrum.png\"></img>\n      <div id=\"huesat-marker\"></div>\n    </div>\n\n    <div id=\"value-slider\">\n      <div id=\"value-slider-track\">\n        <div id=\"value-slider-marker\"></div>\n      </div>\n    </div>\n\n    <div id=\"alpha-slider\">\n      <div id=\"alpha-slider-track\">\n        <div id=\"alpha-slider-marker\"></div>\n      </div>\n    </div>\n  </x-box>\n";

  // @events
  //   change
  //   changestart
  //   changeend

  var XWheelColorPickerElement = function (_HTMLElement38) {
    _inherits(XWheelColorPickerElement, _HTMLElement38);

    _createClass(XWheelColorPickerElement, [{
      key: "value",


      // @type
      //   string
      // @default
      //   "hsla(0, 0%, 100%, 1)"
      // @attribute
      get: function get() {
        return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
      },
      set: function set(value) {
        this.setAttribute("value", value);
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["value"];
      }
    }]);

    function XWheelColorPickerElement() {
      _classCallCheck(this, XWheelColorPickerElement);

      // Note that HSVA color model is used only internally
      var _this98 = _possibleConstructorReturn(this, (XWheelColorPickerElement.__proto__ || Object.getPrototypeOf(XWheelColorPickerElement)).call(this));

      _this98._h = 0; // Hue (0 ~ 360)
      _this98._s = 0; // Saturation (0 ~ 100)
      _this98._v = 100; // Value (0 ~ 100)
      _this98._a = 1; // Alpha (0 ~ 1)

      _this98._isDraggingHuesatMarker = false;
      _this98._isDraggingValueSliderMarker = false;
      _this98._isDraggingAlphaSliderMarker = false;

      _this98._shadowRoot = _this98.attachShadow({ mode: "closed" });
      _this98._shadowRoot.innerHTML = shadowHTML$3;

      var _iteratorNormalCompletion80 = true;
      var _didIteratorError80 = false;
      var _iteratorError80 = undefined;

      try {
        for (var _iterator80 = _this98._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step80; !(_iteratorNormalCompletion80 = (_step80 = _iterator80.next()).done); _iteratorNormalCompletion80 = true) {
          var element = _step80.value;

          _this98["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError80 = true;
        _iteratorError80 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion80 && _iterator80.return) {
            _iterator80.return();
          }
        } finally {
          if (_didIteratorError80) {
            throw _iteratorError80;
          }
        }
      }

      _this98["#huesat-slider"].addEventListener("pointerdown", function (event) {
        return _this98._onHuesatSliderPointerDown(event);
      });
      _this98["#value-slider"].addEventListener("pointerdown", function (event) {
        return _this98._onValueSliderPointerDown(event);
      });
      _this98["#alpha-slider"].addEventListener("pointerdown", function (event) {
        return _this98._onAlphaSliderPointerDown(event);
      });
      return _this98;
    }

    _createClass(XWheelColorPickerElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this._update();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        } else if (name === "value") {
          this._onValueAttributeChange();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this._updateHuesatMarker();
        this._updateValueSliderMarker();
        this._updateValueSliderBackground();
        this._updateAlphaSliderMarker();
        this._updateAlphaSliderBackground();
      }
    }, {
      key: "_updateHuesatMarker",
      value: function _updateHuesatMarker() {
        var h = this._h;
        var s = this._s;

        var wheelSize = 100;
        var angle = degToRad(h);
        var radius = s / 100 * wheelSize / 2;
        var centerPoint = { x: wheelSize / 2, y: wheelSize / 2 };

        var x = (wheelSize - (centerPoint.x + radius * cos(angle))) / wheelSize * 100;
        var y = (centerPoint.y - radius * sin(angle)) / wheelSize * 100;

        this["#huesat-marker"].style.left = x + "%";
        this["#huesat-marker"].style.top = y + "%";
      }
    }, {
      key: "_updateValueSliderMarker",
      value: function _updateValueSliderMarker() {
        this["#value-slider-marker"].style.left = 100 - normalize(this._v, 0, 100, 2) + "%";
      }
    }, {
      key: "_updateValueSliderBackground",
      value: function _updateValueSliderBackground() {
        var gradientBackground = "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))";
        var solidBackground = serializeColor([this._h, this._s, 100, 1], "hsva", "hex");
        this["#value-slider"].style.background = gradientBackground + ", " + solidBackground;
      }
    }, {
      key: "_updateAlphaSliderMarker",
      value: function _updateAlphaSliderMarker() {
        this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
      }
    }, {
      key: "_updateAlphaSliderBackground",
      value: function _updateAlphaSliderBackground() {
        var _hsvToRgb$map3 = hsvToRgb(this._h, this._s, this._v).map(function ($0) {
          return round($0, 0);
        }),
            _hsvToRgb$map4 = _slicedToArray(_hsvToRgb$map3, 3),
            r = _hsvToRgb$map4[0],
            g = _hsvToRgb$map4[1],
            b = _hsvToRgb$map4[2];

        var backroundA = "url(node_modules/xel/images/checkboard.png) repeat 0 0";
        var background = "linear-gradient(to right, rgba(" + r + ", " + g + ", " + b + ", 1), rgba(" + r + ", " + g + ", " + b + ", 0))";
        this["#alpha-slider"].style.background = background + "," + backroundA;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onValueAttributeChange",
      value: function _onValueAttributeChange() {
        if (this._isDraggingHuesatMarker === false && this._isDraggingValueSliderMarker === false && this._isDraggingAlphaSliderMarker === false) {
          var _parseColor7 = parseColor(this.value, "hsva"),
              _parseColor8 = _slicedToArray(_parseColor7, 4),
              h = _parseColor8[0],
              s = _parseColor8[1],
              v = _parseColor8[2],
              a = _parseColor8[3];

          this._h = h;
          this._s = s;
          this._v = v;
          this._a = a;

          this._update();
        }
      }
    }, {
      key: "_onHuesatSliderPointerDown",
      value: function _onHuesatSliderPointerDown(pointerDownEvent) {
        var _this99 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var pointerMoveListener = void 0,
            _lostPointerCaptureListener11 = void 0;
        var wheelBounds = this["#huesat-slider"].getBoundingClientRect();

        this._isDraggingHuesatMarker = true;
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        this["#huesat-slider"].style.cursor = "default";
        this["#huesat-slider"].setPointerCapture(pointerDownEvent.pointerId);

        var onPointerMove = function onPointerMove(clientX, clientY) {
          var radius = wheelBounds.width / 2;
          var x = clientX - wheelBounds.left - radius;
          var y = clientY - wheelBounds.top - radius;
          var d = pow$2(x, 2) + pow$2(y, 2);
          var theta = atan2$1(y, x);

          if (d > pow$2(radius, 2)) {
            x = radius * cos(theta);
            y = radius * sin(theta);
            d = pow$2(x, 2) + pow$2(y, 2);
            theta = atan2$1(y, x);
          }

          _this99._h = round((theta + PI$2) / (PI$2 * 2) * 360, 3);
          _this99._s = round(sqrt$2(d) / radius * 100, 3);

          _this99.value = serializeColor([_this99._h, _this99._s, _this99._v, _this99._a], "hsva", "hsla");
          _this99.dispatchEvent(new CustomEvent("change", { bubbles: true }));

          _this99._updateHuesatMarker();
          _this99._updateValueSliderBackground();
          _this99._updateAlphaSliderBackground();
        };

        onPointerMove(pointerDownEvent.clientX, pointerDownEvent.clientY);

        this["#huesat-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX, pointerMoveEvent.clientY);
        });

        this["#huesat-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener11 = function lostPointerCaptureListener(event) {
          _this99["#huesat-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this99["#huesat-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener11);
          _this99["#huesat-slider"].style.cursor = null;

          _this99.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
          _this99._isDraggingHuesatMarker = false;
        });
      }
    }, {
      key: "_onValueSliderPointerDown",
      value: function _onValueSliderPointerDown(pointerDownEvent) {
        var _this100 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#value-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener12 = void 0;

        this._isDraggingValueSliderMarker = true;
        this["#value-slider"].style.cursor = "default";
        this["#value-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var v = 100 - (clientX - trackBounds.x) / trackBounds.width * 100;
          v = normalize(v, 0, 100, 2);

          if (v !== _this100._v) {
            _this100._v = v;
            _this100.value = serializeColor([_this100._h, _this100._s, _this100._v, _this100._a], "hsva", "hsla");

            _this100._updateValueSliderMarker();
            _this100._updateAlphaSliderBackground();

            _this100.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#value-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#value-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener12 = function lostPointerCaptureListener() {
          _this100["#value-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this100["#value-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener12);
          _this100["#value-slider"].style.cursor = null;

          _this100.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
          _this100._isDraggingValueSliderMarker = false;
        });
      }
    }, {
      key: "_onAlphaSliderPointerDown",
      value: function _onAlphaSliderPointerDown(pointerDownEvent) {
        var _this101 = this;

        if (pointerDownEvent.buttons !== 1) {
          return;
        }

        var trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
        var pointerMoveListener = void 0,
            _lostPointerCaptureListener13 = void 0;

        this._isDraggingAlphaSliderMarker = true;
        this["#alpha-slider"].style.cursor = "default";
        this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
        this.dispatchEvent(new CustomEvent("changestart", { bubbles: true }));

        var onPointerMove = function onPointerMove(clientX) {
          var a = 1 - (clientX - trackBounds.x) / trackBounds.width;
          a = normalize(a, 0, 1, 2);

          if (a !== _this101._a) {
            _this101._a = a;
            _this101.value = serializeColor([_this101._h, _this101._s, _this101._v, _this101._a], "hsva", "hsla");
            _this101._updateAlphaSliderMarker();
            _this101.dispatchEvent(new CustomEvent("change", { bubbles: true }));
          }
        };

        onPointerMove(pointerDownEvent.clientX);

        this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = function pointerMoveListener(pointerMoveEvent) {
          onPointerMove(pointerMoveEvent.clientX);
        });

        this["#alpha-slider"].addEventListener("lostpointercapture", _lostPointerCaptureListener13 = function lostPointerCaptureListener() {
          _this101["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
          _this101["#alpha-slider"].removeEventListener("lostpointercapture", _lostPointerCaptureListener13);
          _this101["#alpha-slider"].style.cursor = null;

          _this101.dispatchEvent(new CustomEvent("changeend", { bubbles: true }));
          _this101._isDraggingAlphaSliderMarker = false;
        });
      }
    }]);

    return XWheelColorPickerElement;
  }(HTMLElement);

  customElements.define("x-wheelcolorpicker", XWheelColorPickerElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  // @info
  //   Retrieve the path to the currently loaded theme, defaulting to "vanilla.theme.css".
  // @type
  //   (void) => string
  var getThemePath = function getThemePath() {
    var themeStyleElement = document.querySelector("link[href*=\"/themes/\"]");
    var themePath = "node_modules/xel/themes/vanilla.css";

    if (themeStyleElement) {
      themePath = themeStyleElement.getAttribute("href");
    }

    return themePath;
  };

  // @info
  //   Retrieve the base name of the currently loaded theme, defaulting to "vanilla".
  // @type
  //   (void) => string
  var getThemeName = function getThemeName() {
    var path = getThemePath();
    var startIndex = path.lastIndexOf("/") + 1;
    var endIndex = path.length - 4;
    var theme = endIndex > startIndex ? path.substring(startIndex, endIndex) : "vanilla";
    return theme;
  };

  var colorSchemesByTheme = {
    material: {},
    macos: {
      blue: "hsl(211, 96.7%, 52.9%)",
      green: "hsl(88, 35%, 46%)",
      red: "hsl(344, 65%, 45%)",
      purple: "hsl(290, 40%, 46%)",
      yellowgreen: "hsl(61, 28%, 45%)"
    },
    vanilla: {
      blue: "hsl(211, 86%, 57%)",
      green: "hsl(88, 35%, 46%)",
      red: "hsl(344, 65%, 45%)",
      purple: "hsl(290, 40%, 46%)",
      yellowgreen: "hsl(61, 28%, 45%)"
    }
  };

  var shadowTemplate$x = html(_templateObject37, getThemePath());

  var XelAppElement = function (_HTMLElement39) {
    _inherits(XelAppElement, _HTMLElement39);

    function XelAppElement() {
      _classCallCheck(this, XelAppElement);

      var _this102 = _possibleConstructorReturn(this, (XelAppElement.__proto__ || Object.getPrototypeOf(XelAppElement)).call(this));

      _this102._shadowRoot = _this102.attachShadow({ mode: "closed" });
      _this102._shadowRoot.append(document.importNode(shadowTemplate$x.content, true));

      var _iteratorNormalCompletion81 = true;
      var _didIteratorError81 = false;
      var _iteratorError81 = undefined;

      try {
        for (var _iterator81 = _this102._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step81; !(_iteratorNormalCompletion81 = (_step81 = _iterator81.next()).done); _iteratorNormalCompletion81 = true) {
          var element = _step81.value;

          _this102["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError81 = true;
        _iteratorError81 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion81 && _iterator81.return) {
            _iterator81.return();
          }
        } finally {
          if (_didIteratorError81) {
            throw _iteratorError81;
          }
        }
      }

      window.addEventListener("load", function (event) {
        return _this102._onWindowLoad(event);
      });
      window.addEventListener("popstate", function (event) {
        return _this102._onPopState(event);
      });
      window.addEventListener("beforeunload", function (event) {
        return _this102._onWindowUnload(event);
      });

      _this102._shadowRoot.addEventListener("click", function (event) {
        return _this102._onShadowRootClick(event);
      });
      _this102["#hide-sidebar-button"].addEventListener("click", function (event) {
        return _this102._onHideNavButtonClick(event);
      });
      _this102["#show-sidebar-button"].addEventListener("click", function (event) {
        return _this102._onShowNavButtonClick(event);
      });
      _this102["#theme-select"].addEventListener("change", function (event) {
        return _this102._onThemeSelectChange(event);
      });
      _this102["#accent-color-select"].addEventListener("change", function (event) {
        return _this102._onAccentColorSelectChange(event);
      });
      return _this102;
    }

    _createClass(XelAppElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        history.scrollRestoration = "manual";

        if (history.state === null) {
          history.replaceState(null, null, window.location.href);
        }

        this._updateNavButtons();
        this._updateViews();
        this._updateThemeSection();

        this._applyAccentColor();
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_onThemeSelectChange",
      value: async function _onThemeSelectChange() {
        sessionStorage.setItem("theme", this["#theme-select"].value);
        await sleep(800);
        location.reload();
      }
    }, {
      key: "_onAccentColorSelectChange",
      value: function _onAccentColorSelectChange() {
        sessionStorage.setItem("accentColorName", this["#accent-color-select"].value);
        this._applyAccentColor();
      }
    }, {
      key: "_onWindowLoad",
      value: function _onWindowLoad() {
        var _this103 = this;

        var scrollTop = parseInt(sessionStorage.getItem("selectedViewScrollTop") || "0");
        var selectedView = this["#views"].querySelector(".view[selected]");

        if (selectedView) {
          selectedView.scrollTop = scrollTop;
        } else {
          sleep(100).then(function () {
            selectedView = _this103["#views"].querySelector(".view[selected]");
            selectedView.scrollTop = scrollTop;
          });
        }
      }
    }, {
      key: "_onWindowUnload",
      value: function _onWindowUnload(event) {
        var selectedView = this["#views"].querySelector(".view[selected]");
        sessionStorage.setItem("selectedViewScrollTop", selectedView.scrollTop);
      }
    }, {
      key: "_onPopState",
      value: function _onPopState(event) {
        this._updateNavButtons();
        this._updateViews();
      }
    }, {
      key: "_onShadowRootClick",
      value: function _onShadowRootClick(event) {
        var ctrlKey = event.ctrlKey,
            shiftKey = event.shiftKey,
            metaKey = event.metaKey,
            target = event.target;


        if (ctrlKey === false && shiftKey === false && metaKey === false) {
          var anchor = target.closest("a");

          if (anchor) {
            var url = new URL(anchor.href);

            if (location.origin === url.origin) {
              event.preventDefault();

              if (location.pathname !== url.pathname) {
                history.pushState(null, null, anchor.href);

                this._updateNavButtons();
                this._updateViews();
              }
            }
          }
        }
      }
    }, {
      key: "_onHideNavButtonClick",
      value: function _onHideNavButtonClick(event) {
        if (event.button === 0) {
          this._hideSidebar();
        }
      }
    }, {
      key: "_onShowNavButtonClick",
      value: function _onShowNavButtonClick(event) {
        if (event.button === 0) {
          this._showSidebar();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_showSidebar",
      value: function _showSidebar() {
        var _this104 = this;

        return new Promise(async function (resolve) {
          _this104["#sidebar"].hidden = false;

          var _getComputedStyle4 = getComputedStyle(_this104["#sidebar"]),
              width = _getComputedStyle4.width,
              height = _getComputedStyle4.height,
              marginLeft = _getComputedStyle4.marginLeft;

          var fromMarginLeft = marginLeft === "0px" && width !== "auto" ? "-" + width : marginLeft;
          var toMarginLeft = "0px";

          var animation = _this104["#sidebar"].animate({
            marginLeft: [fromMarginLeft, toMarginLeft]
          }, {
            duration: 250,
            easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });

          _this104["#sidebar"].style.marginLeft = "0";
          _this104._currentAnimation = animation;
        });
      }
    }, {
      key: "_hideSidebar",
      value: function _hideSidebar() {
        var _this105 = this;

        return new Promise(async function (resolve) {
          _this105["#sidebar"].hidden = false;

          var _getComputedStyle5 = getComputedStyle(_this105["#sidebar"]),
              width = _getComputedStyle5.width,
              height = _getComputedStyle5.height,
              marginLeft = _getComputedStyle5.marginLeft;

          var fromMarginLeft = marginLeft === "0px" && width !== "auto" ? "0px" : marginLeft;
          var toMarginLeft = "-" + width;

          var animation = _this105["#sidebar"].animate({
            marginLeft: [fromMarginLeft, toMarginLeft]
          }, {
            duration: 250,
            easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });

          _this105["#sidebar"].style.marginLeft = toMarginLeft;
          _this105._currentAnimation = animation;

          await animation.finished;

          if (_this105._currentAnimation === animation) {
            _this105["#sidebar"].hidden = true;
          }
        });
      }
    }, {
      key: "_applyAccentColor",
      value: function _applyAccentColor() {
        var accentColorName = sessionStorage.getItem("accentColorName");

        if (accentColorName !== null) {
          var themeName = getThemeName();
          var accentColor = colorSchemesByTheme[themeName][accentColorName];

          if (!accentColor) {
            var names = Object.keys(colorSchemesByTheme[themeName]);

            if (names.length > 0) {
              accentColor = colorSchemesByTheme[themeName][names[0]];
            }
          }

          if (accentColor) {
            var _parseColor9 = parseColor(accentColor, "hsla"),
                _parseColor10 = _slicedToArray(_parseColor9, 3),
                h = _parseColor10[0],
                s = _parseColor10[1],
                l = _parseColor10[2];

            document.body.style.setProperty("--accent-color-h", h);
            document.body.style.setProperty("--accent-color-s", s + "%");
            document.body.style.setProperty("--accent-color-l", l + "%");
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // @info
      //   Update selected nav button to match current location.

    }, {
      key: "_updateNavButtons",
      value: function _updateNavButtons() {
        var _iteratorNormalCompletion82 = true;
        var _didIteratorError82 = false;
        var _iteratorError82 = undefined;

        try {
          for (var _iterator82 = this["#nav"].querySelectorAll("x-button")[Symbol.iterator](), _step82; !(_iteratorNormalCompletion82 = (_step82 = _iterator82.next()).done); _iteratorNormalCompletion82 = true) {
            var button = _step82.value;

            var anchor = button.closest("a");

            if (anchor) {
              var url = new URL(anchor);

              if (url.origin === location.origin && url.pathname === location.pathname) {
                button.setAttribute("toggled", "");
              } else {
                button.removeAttribute("toggled");
              }
            }
          }
        } catch (err) {
          _didIteratorError82 = true;
          _iteratorError82 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion82 && _iterator82.return) {
              _iterator82.return();
            }
          } finally {
            if (_didIteratorError82) {
              throw _iteratorError82;
            }
          }
        }
      }

      // @info
      //   Update displayed view to match current location

    }, {
      key: "_updateViews",
      value: async function _updateViews() {
        var selectedView = this["#views"].querySelector(".view[selected]");

        if (!selectedView || selectedView.dataset.pathname !== location.pathname) {
          var view = this["#views"].querySelector("[data-pathname=\"" + location.pathname + "\"]");

          // If the view does not exist, try to create it
          if (!view) {
            var url = "";

            if (location.pathname === "/") {
              url = "docs/about.html";
            } else if (location.pathname.startsWith("/elements/")) {
              url = "docs" + location.pathname.substring(9) + ".html";
            } else {
              url = "docs" + location.pathname + ".html";
            }

            var viewHTML = await readFile(url);
            view = html(_templateObject15, viewHTML);
            view.setAttribute("data-pathname", location.pathname);
            this["#views"].append(view);
          }

          if (location.pathname === "/") {
            document.querySelector("title").textContent = "Xel";
          } else {
            document.querySelector("title").textContent = "Xel - " + view.querySelector("h2").textContent;
          }

          // Toggle view
          {
            var _view = this["#views"].querySelector("[data-pathname=\"" + location.pathname + "\"]");
            var otherView = this["#views"].querySelector(".view[selected]");

            if (otherView) {
              if (otherView === _view) {
                return;
              } else {
                otherView.removeAttribute("selected");
              }
            }

            _view.setAttribute("selected", "");
          }

          // Hide theme-specific sections that don't match the current theme
          {
            var themeName = getThemeName();

            var _iteratorNormalCompletion83 = true;
            var _didIteratorError83 = false;
            var _iteratorError83 = undefined;

            try {
              for (var _iterator83 = view.querySelectorAll("section")[Symbol.iterator](), _step83; !(_iteratorNormalCompletion83 = (_step83 = _iterator83.next()).done); _iteratorNormalCompletion83 = true) {
                var section = _step83.value;

                if (section.hasAttribute("data-themes")) {
                  if (section.getAttribute("data-themes").includes(themeName) === false) {
                    section.hidden = true;
                  }
                }
              }
            } catch (err) {
              _didIteratorError83 = true;
              _iteratorError83 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion83 && _iterator83.return) {
                  _iterator83.return();
                }
              } finally {
                if (_didIteratorError83) {
                  throw _iteratorError83;
                }
              }
            }

            var visibleSections = view.querySelectorAll("section:not([hidden])");

            if (visibleSections.length > 0) {
              var lastVisibleSection = visibleSections[visibleSections.length - 1];
              lastVisibleSection.setAttribute("data-last-visible", "");
            }
          }

          // Remove offscreen views
          {
            var _arr3 = [].concat(_toConsumableArray(this["#views"].children));

            for (var _i7 = 0; _i7 < _arr3.length; _i7++) {
              var _view2 = _arr3[_i7];
              if (_view2.hasAttribute("animating") === false && _view2.hasAttribute("selected") === false) {
                _view2.remove();
              }
            }
          }
        }
      }
    }, {
      key: "_updateThemeSection",
      value: function _updateThemeSection() {
        var themeName = getThemeName();

        // Update theme subsection
        {
          var _iteratorNormalCompletion84 = true;
          var _didIteratorError84 = false;
          var _iteratorError84 = undefined;

          try {
            for (var _iterator84 = this["#theme-select"].querySelectorAll("x-menuitem")[Symbol.iterator](), _step84; !(_iteratorNormalCompletion84 = (_step84 = _iterator84.next()).done); _iteratorNormalCompletion84 = true) {
              var item = _step84.value;

              if (item.getAttribute("value") === themeName) {
                item.setAttribute("toggled", "");
              } else {
                item.removeAttribute("toggled");
              }
            }
          } catch (err) {
            _didIteratorError84 = true;
            _iteratorError84 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion84 && _iterator84.return) {
                _iterator84.return();
              }
            } finally {
              if (_didIteratorError84) {
                throw _iteratorError84;
              }
            }
          }
        }

        // Update accent color subsection
        {
          if (themeName === "material") {
            this["#accent-color-subsection"].hidden = true;
          } else {
            var accentColorName = sessionStorage.getItem("accentColorName");
            var supportedAccentColorNames = Object.keys(colorSchemesByTheme[themeName]);

            var itemsHTML = "";

            var _iteratorNormalCompletion85 = true;
            var _didIteratorError85 = false;
            var _iteratorError85 = undefined;

            try {
              for (var _iterator85 = Object.entries(colorSchemesByTheme[themeName])[Symbol.iterator](), _step85; !(_iteratorNormalCompletion85 = (_step85 = _iterator85.next()).done); _iteratorNormalCompletion85 = true) {
                var _step85$value = _slicedToArray(_step85.value, 2),
                    colorName = _step85$value[0],
                    colorValue = _step85$value[1];

                itemsHTML += "\n            <x-menuitem value=\"" + colorName + "\" toggled>\n              <x-swatch value=\"" + colorValue + "\"></x-swatch>\n              <x-label>" + capitalize(colorName) + "</x-label>\n            </x-menuitem>\n          ";
              }
            } catch (err) {
              _didIteratorError85 = true;
              _iteratorError85 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion85 && _iterator85.return) {
                  _iterator85.return();
                }
              } finally {
                if (_didIteratorError85) {
                  throw _iteratorError85;
                }
              }
            }

            this["#accent-color-menu"].innerHTML = itemsHTML;

            if (accentColorName === null) {
              if (supportedAccentColorNames.length > 0) {
                accentColorName = supportedAccentColorNames[0];
                sessionStorage.setItem("accentColorName", accentColorName);
              }
            }

            if (supportedAccentColorNames.includes(accentColorName) === false) {
              if (supportedAccentColorNames.length > 0) {
                accentColorName = supportedAccentColorNames[0];
                sessionStorage.setItem("accentColorName", accentColorName);
              } else {
                accentColorName = null;
              }
            }

            var _iteratorNormalCompletion86 = true;
            var _didIteratorError86 = false;
            var _iteratorError86 = undefined;

            try {
              for (var _iterator86 = this["#accent-color-select"].querySelectorAll("x-menuitem")[Symbol.iterator](), _step86; !(_iteratorNormalCompletion86 = (_step86 = _iterator86.next()).done); _iteratorNormalCompletion86 = true) {
                var _item5 = _step86.value;

                if (_item5.getAttribute("value") === accentColorName) {
                  _item5.setAttribute("toggled", "");
                } else {
                  _item5.removeAttribute("toggled");
                }
              }
            } catch (err) {
              _didIteratorError86 = true;
              _iteratorError86 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion86 && _iterator86.return) {
                  _iterator86.return();
                }
              } finally {
                if (_didIteratorError86) {
                  throw _iteratorError86;
                }
              }
            }

            this["#accent-color-subsection"].hidden = false;
          }
        }
      }
    }]);

    return XelAppElement;
  }(HTMLElement);

  customElements.define("xel-app", XelAppElement);

  var shadowTemplate$y = html(_templateObject38);

  var XelCodeViewElement = function (_HTMLElement40) {
    _inherits(XelCodeViewElement, _HTMLElement40);

    _createClass(XelCodeViewElement, [{
      key: "value",

      // @type
      //   string
      // @default
      //   ""
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        this._value = value;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]);

    function XelCodeViewElement() {
      _classCallCheck(this, XelCodeViewElement);

      var _this106 = _possibleConstructorReturn(this, (XelCodeViewElement.__proto__ || Object.getPrototypeOf(XelCodeViewElement)).call(this));

      _this106._shadowRoot = _this106.attachShadow({ mode: "closed" });
      _this106._shadowRoot.append(document.importNode(shadowTemplate$y.content, true));

      _this106._value = "";

      _this106._observer = new MutationObserver(function () {
        return _this106._update();
      });
      _this106._observer.observe(_this106, { childList: true, attributes: false, characterData: true, subtree: true });

      var _iteratorNormalCompletion87 = true;
      var _didIteratorError87 = false;
      var _iteratorError87 = undefined;

      try {
        for (var _iterator87 = _this106._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step87; !(_iteratorNormalCompletion87 = (_step87 = _iterator87.next()).done); _iteratorNormalCompletion87 = true) {
          var element = _step87.value;

          _this106["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError87 = true;
        _iteratorError87 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion87 && _iterator87.return) {
            _iterator87.return();
          }
        } finally {
          if (_didIteratorError87) {
            throw _iteratorError87;
          }
        }
      }

      return _this106;
    }

    _createClass(XelCodeViewElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this["#prism-theme"].setAttribute("href", "node_modules/prismjs/themes/prism-coy.css");
        this._update();
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_update",
      value: function _update() {
        this["#code"].textContent = this.textContent;

        if (this["#code"].textContent !== "") {
          Prism.highlightElement(this["#code"], true);
        }
      }
    }]);

    return XelCodeViewElement;
  }(HTMLElement);

  customElements.define("xel-codeview", XelCodeViewElement);

  var counter = 0;

  var shadowTemplate$z = html(_templateObject39, getThemePath());

  var XelDemoElement = function (_HTMLElement41) {
    _inherits(XelDemoElement, _HTMLElement41);

    _createClass(XelDemoElement, [{
      key: "compact",


      // @info
      //   Compact demo has a scrollable code view with limited max height.
      // @type
      //   boolean
      // @default
      //   false
      // @attribute
      get: function get() {
        return this.hasAttribute("compact");
      },
      set: function set(compact) {
        compact ? this.setAttribute("compact", "") : this.removeAttribute("compact");
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["name"];
      }
    }]);

    function XelDemoElement() {
      _classCallCheck(this, XelDemoElement);

      var _this107 = _possibleConstructorReturn(this, (XelDemoElement.__proto__ || Object.getPrototypeOf(XelDemoElement)).call(this));

      _this107._shadowRoot = _this107.attachShadow({ mode: "closed" });
      _this107._shadowRoot.append(document.importNode(shadowTemplate$z.content, true));

      var _iteratorNormalCompletion88 = true;
      var _didIteratorError88 = false;
      var _iteratorError88 = undefined;

      try {
        for (var _iterator88 = _this107._shadowRoot.querySelectorAll("[id]")[Symbol.iterator](), _step88; !(_iteratorNormalCompletion88 = (_step88 = _iterator88.next()).done); _iteratorNormalCompletion88 = true) {
          var element = _step88.value;

          _this107["#" + element.id] = element;
        }
      } catch (err) {
        _didIteratorError88 = true;
        _iteratorError88 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion88 && _iterator88.return) {
            _iterator88.return();
          }
        } finally {
          if (_didIteratorError88) {
            throw _iteratorError88;
          }
        }
      }

      return _this107;
    }

    _createClass(XelDemoElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this["#code-view"].textContent = this._getDemoHTML();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name) {
        if (name === "name") {
          this._update();
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }, {
      key: "_getDemoHTML",
      value: function _getDemoHTML() {
        var container = document.createElement("div");
        var template = this.querySelector("template");

        if (!template) {
          return "";
        }

        var content = document.importNode(template.content, true);

        {
          var liveViewContent = content.cloneNode(true);
          window["shadowRoot" + counter] = this["#live-view"];
          var script = liveViewContent.querySelector("script");

          if (script) {
            var _textContent = replaceAll(script.textContent, "document", "window.shadowRoot" + counter);
            _textContent = "{" + _textContent + "}";
            script.textContent = _textContent;
          }

          counter += 1;

          this["#live-view"].append(liveViewContent);
        }

        var _iteratorNormalCompletion89 = true;
        var _didIteratorError89 = false;
        var _iteratorError89 = undefined;

        try {
          for (var _iterator89 = content.childNodes[Symbol.iterator](), _step89; !(_iteratorNormalCompletion89 = (_step89 = _iterator89.next()).done); _iteratorNormalCompletion89 = true) {
            var child = _step89.value;

            container.append(child.cloneNode(true));
          }

          // Remove dynamically added attributes
        } catch (err) {
          _didIteratorError89 = true;
          _iteratorError89 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion89 && _iterator89.return) {
              _iterator89.return();
            }
          } finally {
            if (_didIteratorError89) {
              throw _iteratorError89;
            }
          }
        }

        var _iteratorNormalCompletion90 = true;
        var _didIteratorError90 = false;
        var _iteratorError90 = undefined;

        try {
          for (var _iterator90 = container.querySelectorAll("*")[Symbol.iterator](), _step90; !(_iteratorNormalCompletion90 = (_step90 = _iterator90.next()).done); _iteratorNormalCompletion90 = true) {
            var element = _step90.value;

            if (element.localName.startsWith("x-")) {
              var _arr4 = [].concat(_toConsumableArray(element.attributes));

              for (var _i8 = 0; _i8 < _arr4.length; _i8++) {
                var _arr4$_i = _arr4[_i8],
                    name = _arr4$_i.name,
                    value = _arr4$_i.value;

                if (name === "tabindex" || name === "role" || name.startsWith("aria")) {
                  element.removeAttribute(name);
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError90 = true;
          _iteratorError90 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion90 && _iterator90.return) {
              _iterator90.return();
            }
          } finally {
            if (_didIteratorError90) {
              throw _iteratorError90;
            }
          }
        }

        var textContent = container.innerHTML;

        // Simplify boolean attributes
        textContent = replaceAll(textContent, "=\"\"", "");
        textContent = replaceAll(textContent, "demo", "document");

        var lines = textContent.split("\n");

        // Remove leading and trailing empty lines
        {
          if (isDOMWhitespace(lines[0])) {
            lines.shift();
          }

          if (isDOMWhitespace(lines[lines.length - 1])) {
            lines.pop();
          }
        }

        // Remove excesive indentation
        {
          var minIndent = Infinity;

          var _iteratorNormalCompletion91 = true;
          var _didIteratorError91 = false;
          var _iteratorError91 = undefined;

          try {
            for (var _iterator91 = lines[Symbol.iterator](), _step91; !(_iteratorNormalCompletion91 = (_step91 = _iterator91.next()).done); _iteratorNormalCompletion91 = true) {
              var line = _step91.value;

              if (isDOMWhitespace(line) === false) {
                var indent = 0;

                var _iteratorNormalCompletion92 = true;
                var _didIteratorError92 = false;
                var _iteratorError92 = undefined;

                try {
                  for (var _iterator92 = line[Symbol.iterator](), _step92; !(_iteratorNormalCompletion92 = (_step92 = _iterator92.next()).done); _iteratorNormalCompletion92 = true) {
                    var _char = _step92.value;

                    if (_char === " ") {
                      indent += 1;
                    } else {
                      break;
                    }
                  }
                } catch (err) {
                  _didIteratorError92 = true;
                  _iteratorError92 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion92 && _iterator92.return) {
                      _iterator92.return();
                    }
                  } finally {
                    if (_didIteratorError92) {
                      throw _iteratorError92;
                    }
                  }
                }

                if (indent < minIndent) {
                  minIndent = indent;
                }
              }
            }
          } catch (err) {
            _didIteratorError91 = true;
            _iteratorError91 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion91 && _iterator91.return) {
                _iterator91.return();
              }
            } finally {
              if (_didIteratorError91) {
                throw _iteratorError91;
              }
            }
          }

          lines = lines.map(function (line) {
            return line.substring(minIndent);
          });
        }

        var innerHTML = lines.join("\n");
        return innerHTML;
      }
    }]);

    return XelDemoElement;
  }(HTMLElement);

  customElements.define("xel-demo", XelDemoElement);
})();
