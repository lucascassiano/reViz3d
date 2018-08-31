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
      class DOMRect {
        constructor(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
        }

        static fromRect(otherRect) {
          return new DOMRect(otherRect.x, otherRect.y, otherRect.width, otherRect.height);
        }

        get top() {
          return this.y;
        }

        get left() {
          return this.x;
        }

        get right() {
          return this.x + this.width;
        }

        get bottom() {
          return this.y + this.height;
        }
      }

      window.DOMRect = DOMRect;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //
  // ClientRect polyfill
  //

  if (window.ClientRect) {
    if (window.ClientRect.prototype.hasOwnProperty("x") === false) {
      Object.defineProperty(window.ClientRect.prototype, "x", {
        get() {
          return this.left;
        },
        set(value) {
          this.left = value;
        }
      });
    }
    if (window.ClientRect.prototype.hasOwnProperty("y") === false) {
      Object.defineProperty(window.ClientRect.prototype, "y", {
        get() {
          return this.top;
        },
        set(value) {
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
    let showModal = HTMLDialogElement.prototype.showModal;
    let close = HTMLDialogElement.prototype.close;

    HTMLDialogElement.prototype.showModal = function() {
      return new Promise( async (resolve) => {
        showModal.apply(this, arguments);

        let dialogRect = this.getBoundingClientRect();
        let transitionDuration = parseFloat(getComputedStyle(this).getPropertyValue("transition-duration")) * 1000;
        let transitionTimingFunction = getComputedStyle(this).getPropertyValue("transition-timing-function");
        let animation;

        // Animate from left
        if (getComputedStyle(this).left === "0px" && getComputedStyle(this).right !== "0px") {
          animation = this.animate(
            { transform: [`translateX(-${dialogRect.right}px)`, "translateX(0px)"]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }
        // Animate from right
        else if (getComputedStyle(this).right === "0px" && getComputedStyle(this).left !== "0px") {
          animation = this.animate(
            { transform: [`translateX(${dialogRect.width}px)`, "translateX(0px)"]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }
        // Animate from top
        else {
          animation = this.animate(
            { transform: [`translateY(-${dialogRect.bottom}px)`, "translateY(0px)"]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }

        // Close the dialog when backdrop is clicked
        {
          let keyDownListener;
          let pointerDownListener;
          let clickListener;
          let closeListener;
          let closeOnClick = true;

          let isPointerInsideDialog = (event) => {
            let dialogRect = this.getBoundingClientRect();

            return (
              event.clientX >= dialogRect.x &&
              event.clientX <= dialogRect.x + dialogRect.width &&
              event.clientY >= dialogRect.y &&
              event.clientY <= dialogRect.y + dialogRect.height
            );
          };

          this.addEventListener("keydown", keyDownListener = (event) => {
            event.stopPropagation();
          });

          this.addEventListener("pointerdown", pointerDownListener = (event) => {
            closeOnClick = (isPointerInsideDialog(event) === false);
          });

          this.addEventListener("click", clickListener = (event) => {
            if (closeOnClick) {
              if (isPointerInsideDialog(event) === false && this.hasAttribute("open")) {
                this.close();
              }
            }
          });

          this.addEventListener("close", closeListener = (event) => {
            this.removeEventListener("keydown", keyDownListener);
            this.removeEventListener("pointerdown", pointerDownListener);
            this.removeEventListener("click", clickListener);
            this.removeEventListener("close", closeListener);
          });
        }

        await animation.finished;
        resolve();
      });
    };

    HTMLDialogElement.prototype.close = function() {
      return new Promise( async (resolve) => {
        let dialogRect = this.getBoundingClientRect();
        let transitionDuration = parseFloat(getComputedStyle(this).getPropertyValue("transition-duration")) * 1000;
        let transitionTimingFunction = getComputedStyle(this).getPropertyValue("transition-timing-function");
        let animation;

        // Animate to left
        if (getComputedStyle(this).left === "0px" && getComputedStyle(this).right !== "0px") {
          animation = this.animate(
            { transform: ["translateX(0px)", `translateX(-${dialogRect.right}px)`]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }
        // Animate to right
        else if (getComputedStyle(this).right === "0px" && getComputedStyle(this).left !== "0px") {
          animation = this.animate(
            { transform: ["translateX(0px)", `translateX(${dialogRect.width}px)`]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }
        // Animate to top
        else {
          animation = this.animate(
            { transform: [ "translateY(0px)", `translateY(-${dialogRect.bottom + 50}px)`]},
            { duration: transitionDuration, easing: transitionTimingFunction }
          );
        }

        await animation.finished;

        if (this.hasAttribute("open")) {
          close.apply(this, arguments);
        }

        resolve();
      });
    };

    Object.defineProperty(HTMLDialogElement.prototype, "open", {
      get() {
        return this.hasAttribute("open");
      },
      set(open) {
      }
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
        get() {
          return this.sourceCapabilities.firesTouchEvents ? "touch" : "mouse";
        }
      });
    }
  }

  // Make setPointerCapture also capture the cursor image
  {
    let setPointerCapture = Element.prototype.setPointerCapture;

    Element.prototype.setPointerCapture = function(pointerId) {
      setPointerCapture.call(this, pointerId);

      let cursor = getComputedStyle(this).cursor;
      let styleElements = [];

      {
        for (let node = this.parentNode || this.host; node && node !== document; node = node.parentNode || node.host) {
          if (node.nodeType === document.DOCUMENT_FRAGMENT_NODE) {
            let styleElement = document.createElementNS(node.host.namespaceURI, "style");
            styleElement.textContent = `* { cursor: ${cursor} !important; user-select: none !important; }`;
            node.append(styleElement);
            styleElements.push(styleElement);
          }
          else if (node.nodeType === document.DOCUMENT_NODE) {
            let styleElement = document.createElement("style");
            styleElement.textContent = `* { cursor: ${cursor} !important; user-select: none !important; }`;
            node.head.append(styleElement);
            styleElements.push(styleElement);
          }
        }
      }

      let finish = () => {
        window.removeEventListener("pointerup", finish, true);
        this.removeEventListener("lostpointercapture", finish);

        for (let styleElement of styleElements) {
          styleElement.remove();
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
    let animation = document.createElement("div").animate({});

    if (animation.finished === undefined) {
      Object.defineProperty(animation.constructor.prototype, "finished", {
        get() {
          return new Promise((resolve) => {
            this.playState === "finished" ? resolve() : this.addEventListener("finish", () => resolve(), {once: true});
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
    Node.prototype.append = function(child) {
      this.appendChild(child);
    };
  }

  if (!Node.prototype.prepend) {
    Node.prototype.prepend = function(child) {
      this.insertBefore(child, this.firstElementChild);
    };
  }

  if (!Node.prototype.before) {
    Node.prototype.before = function(element) {
      this.parentElement.insertBefore(element, this);
    };
  }

  if (!Node.prototype.after) {
    Node.prototype.after  = function(element) {
      this.parentElement.insertBefore(element, this.nextElementSibling);
    };
  }

  if (!Node.prototype.replace) {
    Node.prototype.replace = function(element) {
      this.parentNode.replaceChild(element, this);
    };
  }

  if (!Node.prototype.closest) {
    Node.prototype.closest = function(selector) {
      return this.parentNode ? this.parentNode.closest(selector) : null;
    };
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  // ResizeObserver API polyfill
  // https://github.com/que-etc/resize-observer-polyfill/blob/master/dist/ResizeObserver.js
  //

  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ResizeObserver = factory());
  }(window, (function () {
  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
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

      return (function () {
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
              if ( ctx === void 0 ) ctx = null;

              for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                  var entry = list[i];

                  callback.call(ctx, entry[1], entry[0]);
              }
          };

          Object.defineProperties( anonymous.prototype, prototypeAccessors );

          return anonymous;
      }());
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
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
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
      if (typeof requestAnimationFrame === 'function') {
          // It's required to use a bounded function because IE sometimes throws
          // an "Invalid calling object" error if rAF is invoked without the global
          // object on the left hand side.
          return requestAnimationFrame.bind(global$1);
      }

      return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
  })();

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
  var throttle = function (callback, delay) {
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
  var ResizeObserverController = function() {
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
      activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

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
          var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

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
  var defineConfigurable = (function (target, props) {
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
  });

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = (function (target) {
      // Assume that the element is an instance of Node, which means that it
      // has the "ownerDocument" property from which we can retrieve a
      // corresponding global object.
      var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

      // Return the local global object if it's not possible extract one from
      // provided element.
      return ownerGlobal || global$1;
  });

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
      var positions = [], len = arguments.length - 1;
      while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

      return positions.reduce(function (size, position) {
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
  var isSVGGraphicsElement = (function () {
      // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
      // interface.
      if (typeof SVGGraphicsElement !== 'undefined') {
          return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
      }

      // If it's so, then check that element is at least an instance of the
      // SVGElement and that it has the "getBBox" method.
      // eslint-disable-next-line no-extra-parens
      return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
  })();

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
  var ResizeObservation = function(target) {
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

  var ResizeObserverEntry = function(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);

      // According to the specification following properties are not writable
      // and are also not enumerable in the native implementation.
      //
      // Property accessors are not being used as they'd require to define a
      // private WeakMap storage which may cause memory leaks in browsers that
      // don't support this type of collections.
      defineConfigurable(this, { target: target, contentRect: contentRect });
  };

  var ResizeObserverSPI = function(callback, controller, callbackCtx) {
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
  var ResizeObserver = function(callback) {
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

  var index = (function () {
      // Export existing implementation if available.
      if (typeof global$1.ResizeObserver !== 'undefined') {
          return global$1.ResizeObserver;
      }

      return ResizeObserver;
  })();

  return index;
  })));

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  let templateElement = document.createElement("template");

  // @info
  //   Template string tag used to parse HTML strings.
  // @type
  //   () => HTMLElement || DocumentFragment
  let html = (strings, ...expressions) => {
    let parts = [];

    for (let i = 0; i < strings.length; i += 1) {
      parts.push(strings[i]);
      if (expressions[i] !== undefined) parts.push(expressions[i]);
    }

    let innerHTML = parts.join("");
    templateElement.innerHTML = innerHTML;
    let fragment = document.importNode(templateElement.content, true);

    if (fragment.children.length === 1) {
      return fragment.firstElementChild;
    }
    else {
      return fragment;
    }
  };

  // @info
  //   Template string tag used to parse SVG strings.
  // @type
  //   () => SVGElement || DocumentFragment
  let svg = (strings, ...expressions) => {
    let parts = [];

    for (let i = 0; i < strings.length; i += 1) {
      parts.push(strings[i]);
      if (expressions[i] !== undefined) parts.push(expressions[i]);
    }

    let innerHTML = `<svg id="x-stub" xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;

    templateElement.innerHTML = innerHTML;

    let fragment = document.importNode(templateElement.content, true);
    let stub = fragment.querySelector("svg#x-stub");

    if (stub.children.length === 1) {
      return stub.firstElementChild;
    }
    else {
      for (let child of [...stub.childNodes]) {
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
  let createElement = (name, is = null) => {
    let parts = name.split(":");
    let element = null;

    if (parts.length === 1) {
      let [localName] = parts;

      if (is === null) {
        element = document.createElement(localName);
      }
      else {
        element = document.createElement(localName, is);
      }
    }
    else if (parts.length === 2) {
      let [namespace, localName] = parts;

      if (namespace === "svg") {
        element = document.createElementNS("http://www.w3.org/2000/svg", localName);
      }
    }

    return element;
  };

  // @info
  //   Same as standard element.closest() method but can also walk shadow DOM.
  // @type
  //   (Element, string, boolean) => Element?
  let closest = (element, selector, walkShadowDOM = true) => {
    let matched = element.closest(selector);

    if (walkShadowDOM && !matched && element.getRootNode().host) {
      return closest(element.getRootNode().host, selector);
    }
    else {
      return matched;
    }
  };

  // @info
  //   Generate element ID that is unique in the given document fragment.
  // @type
  //   (DocumentFragment, string) => string
  let generateUniqueID = (fragment, prefix = "") => {
    let counter = 1;

    while (true) {
      let id = prefix + counter;

      if (fragment.querySelector("#" + CSS.escape(id)) === null) {
        return id;
      }
      else {
        counter += 1;
      }
    }
  };

  let {max} = Math;
  let easing = "cubic-bezier(0.4, 0, 0.2, 1)";

  let shadowTemplate = html`
  <template>
    <style>
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        --arrow-width: 24px;
        --arrow-height: 24px;
        --arrow-color: currentColor;
        --arrow-align: flex-end;
        --arrow-d: path("M 29.0 31.4 L 50 52.3 L 70.9 31.4 L 78.5 40.0 L 50 68.5 L 21.2 40.3 L 29.0 31.4 Z");
        --arrow-transform: rotate(0deg);
        --focused-arrow-background: transparent;
        --focused-arrow-outline: none;
        --trigger-effect: none; /* ripple, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.05;
      }
      :host([expanded]) {
        --arrow-transform: rotate(-180deg);
      }
      :host([animating]) {
        overflow: hidden;
      }

      #main {
        position: relative;
        width: 100%;
        height: 100%;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: inherit;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        border-radius: 999px;
        transform: none;
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
        pointer-events: none;
      }

      /**
       * Arrow
       */

      #arrow-container {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: var(--arrow-align);
        pointer-events: none;
      }

      #arrow {
        margin: 0 14px 0 0;
        display: flex;
        width: var(--arrow-width);
        height: var(--arrow-height);
        min-width: var(--arrow-width);
        color: var(--arrow-color);
        d: var(--arrow-d);
        transform: var(--arrow-transform);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #arrow:focus {
        background: var(--focused-arrow-background);
        outline: var(--focused-arrow-outline);
      }

      #arrow path {
        fill: currentColor;
        d: inherit;
}
    </style>

    <main id="main">
      <div id="ripples"></div>

      <div id="arrow-container">
        <svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none" tabindex="1">
          <path></path>
        </svg>
      </div>

      <slot></slot>
    </main>
  </template>
`;

  class XAccordionElement extends HTMLElement {
    static get observedAttributes() {
      return ["expanded"];
    }

    get expanded() {
      return this.hasAttribute("expanded");
    }
    set expanded(expanded) {
      expanded ? this.setAttribute("expanded", "") : this.removeAttribute("expanded");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this._resizeObserver = new ResizeObserver(() => this._updateArrowPosition());

      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this["#arrow"].addEventListener("keydown", (event) => this._onArrowKeyDown(event));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "expanded") {
        this._updateArrowPosition();
      }
    }

    connectedCallback() {
      this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
      this._resizeObserver.unobserve(this);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateArrowPosition() {
      let header = this.querySelector(":scope > header");

      if (header) {
        this["#arrow-container"].style.height = header.getBoundingClientRect().height + "px";
      }
      else {
        this["#arrow-container"].style.height = null;
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onArrowKeyDown(event) {
      if (event.key === "Enter") {
        this.querySelector("header").click();
      }
    }

    async _onPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let header = this.querySelector("header");
      let closestFocusableElement = pointerDownEvent.target.closest("[tabindex]");

      if (header.contains(pointerDownEvent.target) && this.contains(closestFocusableElement) === false) {
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        // Ripple
        if (triggerEffect === "ripple") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max(rect.width, rect.height) * 1.5;
          let top  = pointerDownEvent.clientY - rect.y - size/2;
          let left = pointerDownEvent.clientX - rect.x - size/2;
          let whenLostPointerCapture = new Promise((r) => this.addEventListener("lostpointercapture", r, {once: true}));

          this.setPointerCapture(pointerDownEvent.pointerId);

          let ripple = html`<div></div>`;
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);

          this["#ripples"].append(ripple);
          this["#ripples"].style.contain = "strict";

          let inAnimation = ripple.animate(
            { transform: ["scale3d(0, 0, 0)", "none"]},
            { duration: 300, easing }
          );

          await whenLostPointerCapture;
          await inAnimation.finished;

          let outAnimation = ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity, "0"]},
            { duration: 300, easing }
          );

          await outAnimation.finished;
          ripple.remove();
        }
      }
    }

    async _onClick(event) {
      let header = this.querySelector("header");
      let closestFocusableElement = event.target.closest("[tabindex]");

      if (header.contains(event.target) && this.contains(closestFocusableElement) === false) {
        // Collapse
        if (this.expanded) {
          let startBBox = this.getBoundingClientRect();

          if (this._animation) {
            this._animation.finish();
          }

          this.expanded = false;
          this.removeAttribute("animating");
          let endBBox = this.getBoundingClientRect();
          this.setAttribute("animating", "");

          let animation = this.animate(
            {
              height: [startBBox.height + "px", endBBox.height + "px"],
            },
            {
              duration: 300,
              easing
            }
          );

          this._animation = animation;
          await animation.finished;

          if (this._animation === animation) {
            this.removeAttribute("animating");
          }
        }

        // Expand
        else {
          let startBBox = this.getBoundingClientRect();

          if (this._animation) {
            this._animation.finish();
          }

          this.expanded = true;
          this.removeAttribute("animating");
          let endBBox = this.getBoundingClientRect();
          this.setAttribute("animating", "");

          let animation = this.animate(
            {
              height: [startBBox.height + "px", endBBox.height + "px"],
            },
            {
              duration: 300,
              easing
            }
          );

          this._animation = animation;
          await animation.finished;

          if (this._animation === animation) {
            this.removeAttribute("animating");
          }
        }
      }
    }
  }

  customElements.define("x-accordion", XAccordionElement);

  let shadowTemplate$1 = html`
  <template>
    <style>
      :host {
        display: block;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        touch-action: none;
        will-change: opacity;
        cursor: default;
        background: rgba(0, 0, 0, 0.5);
      }
      :host([hidden]) {
        display: none;
      }
    </style>
  </template>
`;

  class XBackdropElement extends HTMLElement {
    // @info
    //   Element below which the backdrop should be placed.
    // @type
    //   HTMLElement
    get ownerElement() {
      return this._ownerElement ? this._ownerElement : document.body.firstElementChild;
    }
    set ownerElement(ownerElement) {
      this._ownerElement = ownerElement;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._ownerElement = null;
      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$1.content, true));

      this.addEventListener("wheel", (event) => event.preventDefault());
      this.addEventListener("pointerdown", (event) => event.preventDefault()); // Don't steal the focus
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    show(animate = true) {
      this.style.top = "0px";
      this.style.left = "0px";
      this.ownerElement.before(this);
      this.hidden = false;

      let bounds = this.getBoundingClientRect();
      let extraTop = 0;
      let extraLeft = 0;

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
        let zIndex = parseFloat(getComputedStyle(this.ownerElement).zIndex);
        this.style.zIndex = zIndex - 1;
      }

      this.style.top = (extraTop) + "px";
      this.style.left = (extraLeft) + "px";

      // Animate the backdrop
      if (animate) {
        let backdropAnimation = this.animate(
          {
            opacity: ["0", "1"]
          },
          {
            duration: 100,
            easing: "ease-out"
          }
        );

        return backdropAnimation.finished;
      }
    }

    hide(animate = true) {
      if (animate) {
        let backdropAnimation = this.animate(
          {
            opacity: ["1", "0"]
          },
          {
            duration: 100,
            easing: "ease-in"
          }
        );

        backdropAnimation.finished.then(() => {
          document.body.style.overflow = null;
          this.remove();
        });

        return backdropAnimation.finished;
      }
      else {
        document.body.style.overflow = null;
        this.remove();
      }
    }
  }

  customElements.define("x-backdrop", XBackdropElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  let {max: max$1, pow: pow$1, sqrt: sqrt$1, PI: PI$1} = Math;

  // @info
  //   Round given number to the fixed number of decimal places.
  // @type
  //   (number, number) => number
  let round = (number, precision = 0) => {
    let coefficient = pow$1(10, precision);
    return Math.round(number * coefficient) / coefficient;
  };

  // @type
  //   (DOMRect, number) => DOMRect
  let roundRect = (rect, precision = 0) => {
    return new DOMRect(
      round(rect.x, precision),
      round(rect.y, precision),
      round(rect.width, precision),
      round(rect.height, precision)
    );
  };

  // @type
  //   (number, number, number, number?) => number
  let normalize = (number, min, max = Infinity, precision = null) => {
    if (precision !== null) {
      number = round(number, precision);
    }

    if (number < min) {
      number = min;
    }
    else if (number > max) {
      number = max;
    }

    return number;
  };

  // @type
  //   (number) => number
  let getPrecision = (number) => {
    if (!isFinite(number)) {
      return 0;
    }
    else {
      let e = 1;
      let p = 0;

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
  let getDistanceBetweenPoints = (point1, point2) => {
    let x = point2.x - point1.x;
    x = x * x;

    let y = point2.y - point1.y;
    y = y * y;

    let distance = sqrt$1(x+y);
    return distance;
  };

  // @type
  //   (DOMRect, DOMPoint) => boolean
  let rectContainsPoint = (rect, point) => {
    if (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    ) {
      return true;
    }
    else {
      return false;
    }
  };

  // @type
  //   (number) => number
  let degToRad = (degrees) => {
    let radians = (PI$1 * degrees) / 180;
    return radians;
  };

  let {min, max: max$2, floor} = Math;
  let {parseFloat: parseFloat$1, parseInt: parseInt$1} = Number;

  // @info
  //   A list of named colors and their corresponding RGB values.
  // @doc
  //   http://www.w3.org/TR/css3-color/#svg-color
  let namedColors = {
                          // R,   G,   B
    aliceblue:            [240, 248, 255],
    antiquewhite:         [250, 235, 215],
    aqua:                 [  0, 255, 255],
    aquamarine:           [127, 255, 212],
    azure:                [240, 255, 255],
    beige:                [245, 245, 220],
    bisque:               [255, 228, 196],
    black:                [  0,   0   ,0],
    blanchedalmond:       [255, 235, 205],
    blue:                 [  0,   0, 255],
    blueviolet:           [138,  43, 226],
    brown:                [165,  42,  42],
    burlywood:            [222, 184, 135],
    cadetblue:            [ 95, 158, 160],
    chartreuse:           [127, 255,   0],
    chocolate:            [210, 105,  30],
    coral:                [255, 127,  80],
    cornflowerblue:       [100, 149, 237],
    cornsilk:             [255, 248, 220],
    crimson:              [220,  20,  60],
    cyan:                 [  0, 255, 255],
    darkblue:             [  0,   0, 139],
    darkcyan:             [  0, 139, 139],
    darkgoldenrod:        [184, 134,  11],
    darkgray:             [169, 169, 169],
    darkgreen:            [  0, 100,   0],
    darkgrey:             [169, 169, 169],
    darkkhaki:            [189, 183, 107],
    darkmagenta:          [139,   0, 139],
    darkolivegreen:       [ 85, 107,  47],
    darkorange:           [255, 140,   0],
    darkorchid:           [153,  50, 204],
    darkred:              [139,   0,   0],
    darksalmon:           [233, 150, 122],
    darkseagreen:         [143, 188, 143],
    darkslateblue:        [ 72,  61, 139],
    darkslategray:        [ 47,  79,  79],
    darkslategrey:        [ 47,  79,  79],
    darkturquoise:        [  0, 206, 209],
    darkviolet:           [148,   0, 211],
    deeppink:             [255,  20, 147],
    deepskyblue:          [  0, 191, 255],
    dimgray:              [105, 105, 105],
    dimgrey:              [105, 105, 105],
    dodgerblue:           [ 30, 144, 255],
    firebrick:            [178,  34,  34],
    floralwhite:          [255, 250, 240],
    forestgreen:          [ 34, 139,  34],
    fuchsia:              [255,   0, 255],
    gainsboro:            [220, 220, 220],
    ghostwhite:           [248, 248, 255],
    gold:                 [255, 215,   0],
    goldenrod:            [218, 165,  32],
    gray:                 [128, 128, 128],
    green:                [  0, 128,   0],
    greenyellow:          [173, 255,  47],
    grey:                 [128, 128, 128],
    honeydew:             [240, 255, 240],
    hotpink:              [255, 105, 180],
    indianred:            [205,  92,  92],
    indigo:               [ 75,   0, 130],
    ivory:                [255, 255, 240],
    khaki:                [240, 230, 140],
    lavender:             [230, 230, 250],
    lavenderblush:        [255, 240, 245],
    lawngreen:            [124, 252,   0],
    lemonchiffon:         [255, 250, 205],
    lightblue:            [173, 216, 230],
    lightcoral:           [240, 128, 128],
    lightcyan:            [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray:            [211, 211, 211],
    lightgreen:           [144, 238, 144],
    lightgrey:            [211, 211, 211],
    lightpink:            [255, 182, 193],
    lightsalmon:          [255, 160, 122],
    lightseagreen:        [32,  178, 170],
    lightskyblue:         [135, 206, 250],
    lightslategray:       [119, 136, 153],
    lightslategrey:       [119, 136, 153],
    lightsteelblue:       [176, 196, 222],
    lightyellow:          [255, 255, 224],
    lime:                 [  0, 255,   0],
    limegreen:            [ 50, 205,  50],
    linen:                [250, 240, 230],
    magenta:              [255,   0 ,255],
    maroon:               [128,   0,   0],
    mediumaquamarine:     [102, 205, 170],
    mediumblue:           [  0,   0, 205],
    mediumorchid:         [186,  85, 211],
    mediumpurple:         [147, 112, 219],
    mediumseagreen:       [ 60, 179, 113],
    mediumslateblue:      [123, 104, 238],
    mediumspringgreen:    [  0, 250, 154],
    mediumturquoise:      [ 72, 209, 204],
    mediumvioletred:      [199,  21, 133],
    midnightblue:         [ 25,  25, 112],
    mintcream:            [245, 255, 250],
    mistyrose:            [255, 228, 225],
    moccasin:             [255, 228, 181],
    navajowhite:          [255, 222, 173],
    navy:                 [  0,   0, 128],
    oldlace:              [253, 245, 230],
    olive:                [128, 128,   0],
    olivedrab:            [107, 142,  35],
    orange:               [255, 165,   0],
    orangered:            [255,  69,   0],
    orchid:               [218, 112, 214],
    palegoldenrod:        [238, 232, 170],
    palegreen:            [152, 251, 152],
    paleturquoise:        [175, 238, 238],
    palevioletred:        [219, 112, 147],
    papayawhip:           [255, 239, 213],
    peachpuff:            [255, 218, 185],
    peru:                 [205, 133,  63],
    pink:                 [255, 192, 203],
    plum:                 [221, 160, 221],
    powderblue:           [176, 224, 230],
    purple:               [128,   0, 128],
    red:                  [255,   0,   0],
    rosybrown:            [188, 143, 143],
    royalblue:            [ 65, 105, 225],
    saddlebrown:          [139,  69,  19],
    salmon:               [250, 128, 114],
    sandybrown:           [244, 164,  96],
    seagreen:             [46,  139,  87],
    seashell:             [255, 245, 238],
    sienna:               [160,  82,  45],
    silver:               [192, 192, 192],
    skyblue:              [135, 206, 235],
    slateblue:            [106,  90, 205],
    slategray:            [112, 128, 144],
    slategrey:            [112, 128, 144],
    snow:                 [255, 250, 250],
    springgreen:          [  0, 255, 127],
    steelblue:            [ 70, 130, 180],
    tan:                  [210, 180, 140],
    teal:                 [  0, 128, 128],
    thistle:              [216, 191, 216],
    tomato:               [255,  99,  71],
    turquoise:            [ 64, 224, 208],
    violet:               [238, 130, 238],
    wheat:                [245, 222, 179],
    white:                [255, 255, 255],
    whitesmoke:           [245, 245, 245],
    yellow:               [255, 255,   0],
    yellowgreen:          [154, 205,  50]
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  class StringScanner {
    // @type
    //   (string) => void
    constructor(text) {
      this.text = text;

      this.cursor = 0;
      this.line = 1;
      this.column = 1;

      this._storedPosition = {cursor: 0, line: 1, column: 1};
    }

    // @info
    //   Read given number of chars.
    // @type
    //   (number) => string?
    read(i = 1) {
      let string = "";
      let initialCursor = this.cursor;

      for (let j = 0; j < i; j += 1) {
        let c = this.text[initialCursor + j];

        if (c === undefined) {
          break;
        }
        else {
          string += c;
          this.cursor += 1;

          if (c === "\n"){
            this.line += 1;
            this.column = 1;
          }
          else {
            this.column += 1;
          }
        }
      }

      return (string === "" ? null : string);
    }

    // @info
    //   Read given number of chars without advancing the cursor.
    // @type
    //   (number) => string?
    peek(i = 1) {
      let string = "";

      for (let j = 0; j < i; j += 1) {
        let c = this.text[this.cursor + j];

        if (c === undefined) {
          break;
        }
        else {
          string += c;
        }
      }

      return (string === "" ? null : string);
    }

    // @type
    //   () => void
    storePosition() {
      let {cursor, line, column} = this;
      this._storedPosition = {cursor, line, column};
    }

    // @type
    //   () => void
    restorePosition() {
      let {cursor, line, column} = this._storedPosition;

      this.cursor = cursor;
      this.line = line;
      this.column = column;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // @info
  //   Convert color from RGB to HSL space. R, G and B components on input must be in 0-255 range.
  // @src
  //   http://goo.gl/J9ra3
  // @type
  //   (number, number, number) => [number, number, number]
  let rgbToHsl = (r, g, b) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let maxValue = max$2(r, g, b);
    let minValue = min(r, g, b);

    let h;
    let s;
    let l;

    h = s = l = (maxValue + minValue) / 2;

    if (maxValue === minValue) {
      h = s = 0;
    }
    else {
      let d = maxValue - minValue;

      if (l > 0.5) {
        s = d / (2 - maxValue - minValue);
      }
      else {
        s = d / (maxValue + minValue);
      }

      if (maxValue === r) {
        let z;

        if (g < b) {
          z = 6;
        }
        else {
          z = 0;
        }

        h = (g - b) / d + z;
      }

      else if (maxValue === g) {
        h = (b - r) / d + 2;
      }

      else if (maxValue === b) {
        h = (r - g) / d + 4;
      }
    }

    h = normalize((h / 6) * 360, 0, 360, 0);
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
  let hslToRgb = (h, s, l) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r;
    let g;
    let b;

    if (s === 0) {
      r = g = b = l;
    }
    else {
      let hue2rgb = (p, q, t) => {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1/6) {
          return p + (q - p) * 6 * t;
        }
        if (t < 1/2) {
          return q;
        }
        if (t < 2/3) {
          return p + (q - p) * (2/3 - t) * 6;
        }

        return p;
      };

      let q;
      let p;

      if (l < 0.5) {
        q = l * (1 + s);
      }
      else {
        q = l + s - l * s;
      }

      p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
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
  let rgbToHsv = (r, g, b) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let maxValue = max$2(r, g, b);
    let minValue = min(r, g, b);

    let h = 0;
    let s = 0;
    let v = maxValue;
    let d = maxValue - minValue;

    if (maxValue === 0) {
      s = 0;
    }
    else {
      s = d / maxValue;
    }

    if (maxValue === minValue) {
      h = 0;
    }
    else {
      if (maxValue === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      }
      else if (maxValue === g) {
        h = (b - r) / d + 2;
      }
      else if (maxValue === b) {
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
  let hsvToRgb = (h, s, v) => {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    let i = floor(h * 6);
    let f = (h * 6) - i;
    let p = v * (1 - s);
    let q = v * (1 - (f * s));
    let t = v * (1 - (1 - f) * s);

    let r = 0;
    let g = 0;
    let b = 0;

    if (i % 6 === 0) {
      r = v;
      g = t;
      b = p;
    }

    else if (i % 6 === 1) {
      r = q;
      g = v;
      b = p;
    }

    else if (i % 6 === 2) {
      r = p;
      g = v;
      b = t;
    }

    else if (i % 6 === 3) {
      r = p;
      g = q;
      b = v;
    }

    else if (i % 6 === 4) {
      r = t;
      g = p;
      b = v;
    }

    else if (i % 6 === 5) {
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
  let hslToHsv = (h, s, l) => {
    h = h / 360;
    s = s / 100;
    l = (l / 100) * 2;

    if (l <= 1) {
      s = s * l;
    }
    else {
      s = s * (2 - l);
    }

    let hh = h;
    let ss;
    let vv;

    if ((l + s) === 0) {
      ss = 0;
    }
    else {
      ss = (2 * s) / (l + s);
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
  let hsvToHsl = (h, s, v) => {
    h = h / 360;
    s = s / 100;
    v = v / 100;

    let hh = h;
    let ll = (2 - s) * v;
    let ss = s * v;

    if (ll <= 1) {
      if (ll === 0) {
        ss = 0;
      }
      else {
        ss = ss / ll;
      }
    }
    else if (ll === 2) {
      ss = 0;
    }
    else {
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
  let parseColor = (colorString, outputModel = "rgba") => {
    colorString = colorString.trim();

    let tokens = tokenizeColor(colorString);
    let rgbaComponents = null;
    let hslaComponents = null;

    // RGB, e.g. rgb(100, 100, 100)

    if (
      tokens.length === 7 &&
      tokens[0].text === "rgb(" &&
      tokens[1].type === "NUM" &&
      tokens[2].text === "," &&
      tokens[3].type === "NUM" &&
      tokens[4].text === "," &&
      tokens[5].type === "NUM" &&
      tokens[6].text === ")"
    ) {
      rgbaComponents = [
        parseFloat$1(tokens[1].text),
        parseFloat$1(tokens[3].text),
        parseFloat$1(tokens[5].text),
        1,
      ];
    }

    // RGB with percentages, e.g. rgb(50%, 50%, 50%)

    else if (
      tokens.length === 7 &&
      tokens[0].text === "rgb(" &&
      tokens[1].type === "PERCENTAGE" &&
      tokens[2].text === "," &&
      tokens[3].type === "PERCENTAGE" &&
      tokens[4].text === "," &&
      tokens[5].type === "PERCENTAGE" &&
      tokens[6].text === ")"
    ) {
      rgbaComponents = [
        (parseFloat$1(tokens[1].text)/100) * 255,
        (parseFloat$1(tokens[3].text)/100) * 255,
        (parseFloat$1(tokens[5].text)/100) * 255,
        1,
      ];
    }

    // RGBA, e.g. rgba(100, 100, 100, 0.5)

    else if (
      tokens.length === 9 &&
      tokens[0].text === "rgba(" &&
      tokens[1].type === "NUM" &&
      tokens[2].text === "," &&
      tokens[3].type === "NUM" &&
      tokens[4].text === "," &&
      tokens[5].type === "NUM" &&
      tokens[6].text === "," &&
      tokens[7].type === "NUM" &&
      tokens[8].text === ")"
    ) {
      rgbaComponents = [
        parseFloat$1(tokens[1].text),
        parseFloat$1(tokens[3].text),
        parseFloat$1(tokens[5].text),
        parseFloat$1(tokens[7].text),
      ];
    }

    // RGBA with percentages, e.g. rgba(50%, 50%, 50%, 0.5)

    else if (
      tokens.length === 9 &&
      tokens[0].text === "rgb(" &&
      tokens[1].type === "PERCENTAGE" &&
      tokens[2].text === "," &&
      tokens[3].type === "PERCENTAGE" &&
      tokens[4].text === "," &&
      tokens[5].type === "PERCENTAGE" &&
      tokens[6].text === ","&&
      tokens[7].type === "NUM" &&
      tokens[8].text === ")"
    ) {
      rgbaComponents = [
        (parseFloat$1(tokens[1].text)/100) * 255,
        (parseFloat$1(tokens[3].text)/100) * 255,
        (parseFloat$1(tokens[5].text)/100) * 255,
        parseFloat$1(tokens[7].text),
      ];
    }

    // HSL, e.g. hsl(360, 100%, 100%)

    else if (
      tokens.length === 7 &&
      tokens[0].text === "hsl(" &&
      tokens[1].type === "NUM" &&
      tokens[2].text === "," &&
      tokens[3].type === "PERCENTAGE" &&
      tokens[4].text === "," &&
      tokens[5].type === "PERCENTAGE" &&
      tokens[6].text === ")"
    ) {
      hslaComponents = [
        parseFloat$1(tokens[1].text),
        parseFloat$1(tokens[3].text),
        parseFloat$1(tokens[5].text),
        1,
      ];
    }

    // HSLA, e.g. hsla(360, 100%, 100%, 1)

    else if (
      tokens.length === 9 &&
      tokens[0].text === "hsla(" &&
      tokens[1].type === "NUM" &&
      tokens[2].text === "," &&
      tokens[3].type === "PERCENTAGE" &&
      tokens[4].text === "," &&
      tokens[5].type === "PERCENTAGE" &&
      tokens[6].text === "," &&
      tokens[7].type === "NUM" &&
      tokens[8].text === ")"
    ) {
      hslaComponents = [
        parseFloat$1(tokens[1].text),
        parseFloat$1(tokens[3].text),
        parseFloat$1(tokens[5].text),
        parseFloat$1(tokens[7].text),
      ];
    }

    // HEX, e.g. "#fff"

    else if (tokens[0].type === "HEX" && tokens[1] === undefined) {
      let hexString = tokens[0].text.substring(1); // get rid of leading "#"

      let hexRed;
      let hexGreen;
      let hexBlue;

      if (hexString.length === 3) {
        hexRed   = hexString[0] + hexString[0];
        hexGreen = hexString[1] + hexString[1];
        hexBlue  = hexString[2] + hexString[2];
      }
      else {
        hexRed   = hexString[0] + hexString[1];
        hexGreen = hexString[2] + hexString[3];
        hexBlue  = hexString[4] + hexString[5];
      }

      rgbaComponents = [
        parseInt$1(hexRed, 16),
        parseInt$1(hexGreen, 16),
        parseInt$1(hexBlue, 16),
        1,
      ];
    }

    // Named color, e.g. "white"

    else if (namedColors[colorString]) {
      rgbaComponents = [
        namedColors[colorString][0],
        namedColors[colorString][1],
        namedColors[colorString][2],
        1,
      ];
    }

    // Finalize

    if (rgbaComponents) {
      let [r, g, b, a] = rgbaComponents;

      r = normalize(r, 0, 255, 0);
      g = normalize(g, 0, 255, 0);
      b = normalize(b, 0, 255, 0);
      a = normalize(a, 0, 1, 2);

      if (outputModel === "hsla") {
        let [h, s, l] = rgbToHsl(r, g, b);
        return [h, s, l, a];
      }
      else if (outputModel === "hsva") {
        let [h, s, v] = rgbToHsv(r, g, b);
        return [h, s, v, a];
      }
      else {
        return [r, g, b, a];
      }
    }
    else if (hslaComponents) {
      let [h, s, l, a] = hslaComponents;

      h = normalize(h, 0, 360, 0);
      s = normalize(s, 0, 100, 1);
      l = normalize(l, 0, 100, 1);
      a = normalize(a, 0, 1, 2);

      if (outputModel === "hsla") {
        return [h, s, l, a];
      }
      else if (outputModel === "hsva") {
        let [hh, ss, vv] = hslToHsv(h, s, l);
        return [hh, ss, vv, a];
      }
      else {
        let [r, g, b] = hslToRgb(h, s, l);
        return [r, g, b, a];
      }
    }
    else {
      throw new Error(`Invalid color string: "${colorString}"`);
      return null;
    }
  };

  // @type
  //   components = Array<number, number, number, number>
  //   inputModel = "rgba" || "hsla" || "hsva"
  //   outputFormat = "rgb" || "rgba" || "rgb%" || "rgba%" || "hex" || "hsl" || "hsla"
  //   (components, inputModel, outputFormat) => string
  let serializeColor = (components, inputModel = "rgba", outputFormat = "hex") => {
    let string = null;

    // RGB(A) output
    if (["rgb", "rgba", "rgb%", "rgba%", "hex"].includes(outputFormat)) {
      let r;
      let g;
      let b;
      let a;

      if (inputModel === "rgba") {
        [r, g, b, a] = components;
      }
      else if (inputModel === "hsla") {
        [r, g, b] = hslToRgb(...components);
        a = components[3];
      }
      else if (inputModel === "hsva") {
        [r, g, b] = hsvToRgb(...components);
        a = components[3];
      }

      if (outputFormat === "rgb%" || outputFormat === "rgba%") {
        r = normalize((r/255) * 100, 0, 100, 1);
        g = normalize((g/255) * 100, 0, 100, 1);
        b = normalize((b/255) * 100, 0, 100, 1);
        a = normalize(a, 0, 1, 2);
      }
      else {
        r = normalize(r, 0, 255, 0);
        g = normalize(g, 0, 255, 0);
        b = normalize(b, 0, 255, 0);
        a = normalize(a, 0, 1, 2);
      }

      if (outputFormat === "rgb") {
        string = `rgb(${r}, ${g}, ${b})`;
      }
      else if (outputFormat === "rgba") {
        string = `rgba(${r}, ${g}, ${b}, ${a})`;
      }
      else if (outputFormat === "rgb%") {
        string = `rgb(${r}%, ${g}%, ${b}%)`;
      }
      else if (outputFormat === "rgba%") {
        string = `rgb(${r}%, ${g}%, ${b}%, ${a})`;
      }
      else if (outputFormat === "hex") {
        let hexRed   = r.toString(16);
        let hexGreen = g.toString(16);
        let hexBlue  = b.toString(16);

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
      let h;
      let s;
      let l;
      let a;

      if (inputModel === "hsla") {
        [h, s, l, a] = components;
      }
      else if (inputModel === "hsva") {
        [h, s, l] = hsvToHsl(...components);
        a = components[3];
      }
      else if (inputModel === "rgba") {
        [h, s, l] = rgbToHsl(...components);
        a = components[3];
      }

      h = normalize(h, 0, 360, 0);
      s = normalize(s, 0, 100, 1);
      l = normalize(l, 0, 100, 1);
      a = normalize(a, 0, 1, 2);

      if (outputFormat === "hsl") {
        string = `hsl(${h}, ${s}%, ${l}%)`;
      }
      else if (outputFormat === "hsla") {
        string = `hsla(${h}, ${s}%, ${l}%, ${a})`;
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
  let tokenizeColor = (cssText) => {
    let tokens = [];
    let scanner = new StringScanner(cssText.toLowerCase());

    while (scanner.peek() !== null) {
      let char = scanner.read();

      (() => {
        // FUNCTION
        if (char === "r" || char === "h") {
          let text = char;

          if (char + scanner.peek(3) === "rgb(") {
            text += scanner.read(3);
          }
          else if (char + scanner.peek(4) === "rgba(") {
            text += scanner.read(4);
          }
          else if (char + scanner.peek(3) === "hsl(") {
            text += scanner.read(3);
          }
          else if (char + scanner.peek(4) === "hsla(") {
            text += scanner.read(4);
          }

          if (text !== char) {
            tokens.push({type: "FUNCTION", text: text});
            return;
          }
        }

        // HEX
        if (char === "#") {
          if (isHexColorString(char + scanner.peek(6))) {
            let text = char + scanner.read(6);
            tokens.push({type: "HEX", text: text});
            return;
          }

          else if (isHexColorString(char + scanner.peek(3))) {
            text = char + scanner.read(3);
            tokens.push({type: "HEX", text: text});
            return;
          }
        }

        // NUMBER
        // PERCENTAGE
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"].includes(char)) {
          let text = char;

          while (true) {
            if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(scanner.peek())) {
              text += scanner.read();
            }
            else {
              break;
            }
          }

          if (scanner.peek() === "%") {
            text += scanner.read();
            tokens.push({type: "PERCENTAGE", text: text});
          }
          else {
            tokens.push({type: "NUM", text: text});
          }

          return;
        }

        // S
        if (/\u0009|\u000a|\u000c|\u000d|\u0020/.test(char)) {
          // Don't tokenize whitespace as it's meaningless
          return;
        }

        // CHAR
        tokens.push({type: "CHAR", text: char});
        return;
      })();
    }

    return tokens;
  };

  // @type
  //   format = "rgb" || "rgba" || "rgb%" || "rgba%" || "hex" || "hsl" || "hsla"
  //   (string, format) => string
  let formatColorString = (colorString, format) => {
    let model = format.startsWith("hsl") ? "hsla" : "rgba";
    let components = parseColor(colorString, model);
    let formattedColorString = serializeColor(components, model, format);
    return formattedColorString;
  };

  // @info
  //   Check if string represents a valid hex color, e.g. "#fff", "#bada55".
  // @type
  //   (string) => boolean
  let isHexColorString = (string) => {
    string = string.toLowerCase();

    if (string[0] !== "#") {
      return false;
    }
    else if (string.length !== 4 && string.length !== 7) {
      return false;
    }
    else {
      string = string.substring(1); // get rid of "#"
    }

    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    for (let digit of string) {
      if (!hexDigits.includes(digit)) {
        return false;
      }
    }

    return true;
  };

  // @info
  //   Check if string contains valid CSS3 color, e.g. "blue", "#fff", "rgb(50, 50, 100)".
  // @type
  //   (string) => boolean
  let isValidColorString = (string) => {
    try {
      parseColor(string);
    }
    catch (error) {
      return false;
    }

    return true;
  };

  let shadowHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      user-select: none;
    }
    :host([hidden]) {
      display: none;
    }

    /**
     * Hue slider
     */

    #hue-slider {
      width: 100%;
      height: 28px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border-radius: 2px;
      touch-action: pan-y;
      background: red;
      --marker-width: 18px;
    }

    #hue-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      background: linear-gradient(to right,
        rgba(255, 0, 0, 1),
        rgba(255, 255, 0, 1),
        rgba(0, 255, 0, 1),
        rgba(0, 255, 255, 1),
        rgba(0, 0, 255, 1),
        rgba(255, 0, 255, 1),
        rgba(255, 0, 0, 1)
      );
    }

    #hue-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }

    /**
     * Saturation slider
     */

    #saturation-slider {
      width: 100%;
      height: 28px;
      margin-top: 20px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }

    #saturation-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #saturation-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }

    /**
     * Lightness slider
     */

    #lightness-slider {
      width: 100%;
      height: 28px;
      margin-top: 20px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }

    #lightness-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #lightness-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }

    /**
     * Alpha slider
     */

    #alpha-slider {
      display: none;
      width: 100%;
      height: 28px;
      margin-top: 20px;
      margin-bottom: 8px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border: 1px solid #cecece;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }
    :host([alphaslider]) #alpha-slider {
      display: block;
    }

    #alpha-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #alpha-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }
  </style>

  <x-box vertical>
    <div id="hue-slider">
      <div id="hue-slider-track">
        <div id="hue-slider-marker"></div>
      </div>
    </div>

    <div id="saturation-slider">
      <div id="saturation-slider-track">
        <div id="saturation-slider-marker"></div>
      </div>
    </div>

    <div id="lightness-slider">
      <div id="lightness-slider-track">
        <div id="lightness-slider-marker"></div>
      </div>
    </div>

    <div id="alpha-slider">
      <div id="alpha-slider-track">
        <div id="alpha-slider-marker"></div>
      </div>
    </div>
  </x-box>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  class XBarsColorPickerElement extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    // @type
    //   string
    // @default
    //   "hsla(0, 0%, 100%, 1)"
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._h = 0;  // Hue (0 ~ 360)
      this._s = 0;  // Saturation (0 ~ 100)
      this._l = 80; // Lightness (0 ~ 100)
      this._a = 1;  // Alpha (0 ~ 1)

      this._isDraggingHueSliderMarker = false;
      this._isDraggingSaturationSliderMarker = false;
      this._isDraggingLightnessSliderMarker = false;
      this._isDraggingAlphaSliderMarker = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.innerHTML = shadowHTML;

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#hue-slider"].addEventListener("pointerdown", (event) => this._onHueSliderPointerDown(event));
      this["#saturation-slider"].addEventListener("pointerdown", (event) => this._onSaturationSliderPointerDown(event));
      this["#lightness-slider"].addEventListener("pointerdown", (event) => this._onLightnessSliderPointerDown(event));
      this["#alpha-slider"].addEventListener("pointerdown", (event) => this._onAlphaSliderPointerDown(event));
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this._updateHueSliderMarker();

      this._udpateSaturationSliderMarker();
      this._udpateSaturationSliderBackground();

      this._udpateLightnessSliderMarker();
      this._udpateLightnessSliderBackground();

      this._updateAlphaSliderMarker();
      this._updateAlphaSliderBackground();
    }

    _updateHueSliderMarker() {
      this["#hue-slider-marker"].style.left = ((normalize(this._h, 0, 360, 0) / 360) * 100) + "%";
    }

    _udpateSaturationSliderMarker() {
      this["#saturation-slider-marker"].style.left = normalize(this._s, 0, 100, 2) + "%";
    }

    _udpateLightnessSliderMarker() {
      this["#lightness-slider-marker"].style.left = normalize(this._l, 0, 100, 2) + "%";
    }

    _updateAlphaSliderMarker() {
      this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
    }

    _udpateSaturationSliderBackground() {
      let h = this._h;

      this["#saturation-slider"].style.background = `linear-gradient(
      to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%)
    )`;
    }

    _udpateLightnessSliderBackground() {
      let h = this._h;
      let s = this._s;

      this["#lightness-slider"].style.background = `linear-gradient(
      to right, hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 50%), hsl(${h}, ${s}%, 100%)
    )`;
    }

    _updateAlphaSliderBackground() {
      let h = this._h;
      let s = this._s;
      let l = this._l;

      this["#alpha-slider"].style.background = `
      linear-gradient(to right, hsla(${h}, ${s}%, ${l}%, 1), hsla(${h}, ${s}%, ${l}%, 0)),
      url(node_modules/xel/images/checkboard.png) repeat 0 0
    `;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      if (
        this._isDraggingHueSliderMarker === false &&
        this._isDraggingSaturationSliderMarker === false &&
        this._isDraggingLightnessSliderMarker === false &&
        this._isDraggingAlphaSliderMarker === false
      ) {
        let [h, s, l, a] = parseColor(this.value, "hsla");

        this._h = h;
        this._s = s;
        this._l = l;
        this._a = a;

        this._update();
      }
    }

    _onHueSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#hue-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingHueSliderMarker = true;
      this["#hue-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let h = ((clientX - trackBounds.x) / trackBounds.width) * 360;
        h = normalize(h, 0, 360, 0);

        if (h !== this._h) {
          this._h = h;
          this.value = serializeColor([this._h, this._s, this._l, this._a], "hsla", "hsla");

          this._updateHueSliderMarker();
          this._udpateSaturationSliderBackground();
          this._udpateLightnessSliderBackground();
          this._updateAlphaSliderBackground();

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#hue-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#hue-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#hue-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#hue-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingHueSliderMarker = false;
      });
    }

    _onSaturationSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#saturation-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingSaturationSliderMarker = true;
      this["#saturation-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let s = ((clientX - trackBounds.x) / trackBounds.width) * 100;
        s = normalize(s, 0, 100, 0);

        if (s !== this._s) {
          this._s = s;
          this.value = serializeColor([this._h, this._s, this._l, this._a], "hsla", "hsla");

          this._udpateSaturationSliderMarker();
          this._udpateSaturationSliderBackground();
          this._udpateLightnessSliderBackground();
          this._updateAlphaSliderBackground();

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#saturation-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#saturation-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#saturation-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#saturation-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingSaturationSliderMarker = false;
      });
    }

    _onLightnessSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#lightness-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingLightnessSliderMarker = true;
      this["#lightness-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let l = ((clientX - trackBounds.x) / trackBounds.width) * 100;
        l = normalize(l, 0, 100, 0);

        if (l !== this._l) {
          this._l = l;
          this.value = serializeColor([this._h, this._s, this._l, this._a], "hsla", "hsla");

          this._udpateLightnessSliderMarker();
          this._udpateSaturationSliderBackground();
          this._udpateLightnessSliderBackground();
          this._updateAlphaSliderBackground();

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#lightness-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#lightness-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#lightness-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#lightness-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingLightnessSliderMarker = false;
      });
    }

    _onAlphaSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingAlphaSliderMarker = true;
      this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let a = 1 - ((clientX - trackBounds.x) / trackBounds.width);
        a = normalize(a, 0, 1, 2);

        if (a !== this._a) {
          this._a = a;
          this.value = serializeColor([this._h, this._s, this._l, this._a], "hsla", "hsla");
          this._updateAlphaSliderMarker();
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#alpha-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#alpha-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingAlphaSliderMarker = false;
      });
    }
  }
  customElements.define("x-barscolorpicker", XBarsColorPickerElement);

  let shadowTemplate$2 = html`
  <template>
    <style>
      :host {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      :host([vertical]) {
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
      }
    </style>

    <slot></slot>
  </template>
`;

  class XBoxElement extends HTMLElement {
    // @info
    //   Whether to use vertical (rather than horizontal) layout.
    // @type
    //   boolean
    // @default
    //   false
    get vertical() {
      return this.hasAttribute("vertical");
    }
    set vertical(vertical) {
      vertical ? this.setAttribute("vertical", "") : this.removeAttribute("vertical");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$2.content, true));
    }
  }

  customElements.define("x-box", XBoxElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  // @info
  //   Sleep for given period of time (in miliseconds).
  // @type
  //   (number) => Promise
  let sleep = (time) => {
    return new Promise( (resolve, reject) => {
      setTimeout(() => resolve(), time);
    });
  };

  // @info
  //   Get timestamp in Unix format, e.g. 1348271383119 [http://en.wikipedia.org/wiki/Unix_time]
  // @type
  //   () => number
  let getTimeStamp = () => {
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
  let throttle = (func, wait = 500, context) => {
    let args = null;
    let timeout = null;
    let result = null;
    let previous = 0;

    let later = () => {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
    };

    let wrapper = (..._args) => {
      let now = new Date();
      let remaining = wait - (now - previous);
      args = _args;

      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      }

      else if (!timeout) {
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
  let debounce = (func, wait, context, immediate = false) => {
    let timeout = null;
    let result = null;

    let wrapper = (...args) => {
      let later = () => {
        timeout = null;

        if (!immediate) {
          result = func.apply(context, args);
        }
      };

      let callNow = (immediate && !timeout);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        result = func.apply(context, args);
      }

      return result;
    };

    return wrapper;
  };

  let {max: max$3} = Math;
  let easing$1 = "cubic-bezier(0.4, 0, 0.2, 1)";
  let $oldTabIndex = Symbol();

  let shadowTemplate$3 = html`
  <template>
    <style>
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        box-sizing: border-box;
        opacity: 1;
        position: relative;
        --trigger-effect: none; /* ripple, unbounded-ripple, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.2;
        --arrow-width: 8px;
        --arrow-height: 8px;
        --arrow-margin: 0 0 0 3px;
        --arrow-d: path("M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.0 31.6 Z");
      }
      :host(:focus) {
        outline: none;
      }
      :host([mixed]) {
        opacity: 0.75;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      /**
       * Arrow
       */

      #arrow {
        width: var(--arrow-width);
        height: var(--arrow-height);
        min-width: var(--arrow-width);
        margin: var(--arrow-margin);
        color: currentColor;
        d: var(--arrow-d);
      }

      #arrow path {
        fill: currentColor;
        d: inherit;
      }
      #arrow[hidden] {
        display: none;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: inherit;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        border-radius: 999px;
        transform: none;
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
        pointer-events: none;
      }
    </style>

    <div id="ripples"></div>
    <slot></slot>

    <svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path id="arrow-path"></path>
    </svg>
  </template>
`;

  // @events
  //   toggle
  class XButtonElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @info
    //   Values associated with this button.
    // @type
    //   string
    // @default
    //   null
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @info
    //   Whether this button is toggled.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get toggled() {
      return this.hasAttribute("toggled");
    }
    set toggled(toggled) {
      toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
    }

    // @info
    //   Whether this button can be toggled on/off by the user (e.g. by clicking the button).
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get togglable() {
      return this.hasAttribute("togglable");
    }
    set togglable(togglable) {
      togglable ? this.setAttribute("togglable", "") : this.removeAttribute("togglable");
    }

    // @info
    //   CSS skin to be used by this button.
    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get skin() {
      return this.getAttribute("skin");
    }
    set skin(skin) {
      skin === null ? this.removeAttribute("skin") : this.setAttribute("skin", skin);
    }

    // @info
    //   Whether the this button has "mixed" state.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @info
    //   Whether this button is disabled.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    // @info
    //   Whether the menu or popover associated with this button is opened.
    // @type
    //   boolean
    // @attribute
    //   read-only
    get expanded() {
      return this.hasAttribute("expanded");
    }

    // @info
    //   Whether clicking this button will cause a menu or popover to show up.
    // @type
    //   boolean
    get expandable() {
      return this._canOpenMenu() || this._canOpenPopover();
    }

    // @info
    //   Direct ancestor <x-buttons> element.
    // @type
    //   XButtonsElement?
    get ownerButtons() {
      if (this.parentElement) {
        if (this.parentElement.localName === "x-buttons") {
          return this.parentElement;
        }
        else if (this.parentElement.localName === "x-box" && this.parentElement.parentElement) {
          if (this.parentElement.parentElement.localName === "x-buttons") {
            return this.parentElement.parentElement;
          }
        }
      }

      return null;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$3.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));

      (async () => {
        await customElements.whenDefined("x-backdrop");
        this["#backdrop"] = createElement("x-backdrop");
        this["#backdrop"].style.background =  "rgba(0, 0, 0, 0)";
      })();

    }

    async connectedCallback() {
      // Make the parent anchor element non-focusable (button should be focused instead)
      if (this.parentElement && this.parentElement.localName === "a" && this.parentElement.tabIndex !== -1) {
        this.parentElement.tabIndex = -1;
      }

      this._updateAccessabilityAttributes();
      this._updateArrowVisibility();
    }

    attributeChangedCallback(name) {
      if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @info
    //   Open the child menu or overlay.
    expand() {
      return new Promise( async (resolve) => {
        if (this._canOpenMenu()) {
          await this._openMenu();
        }

        else if (this._canOpenPopover()) {
          await this._openPopover();
        }

        resolve();
      });
    }

    // @info
    //   Close the child menu or overlay.
    collapse(delay = null) {
      return new Promise(async (resolve) => {

        if (this._canCloseMenu()) {
          await this._closeMenu(delay);
        }
        else if (this._canClosePopover()) {
          await this._closePopover(delay);
        }

        resolve();
      });
    }

    _openMenu() {
      return new Promise( async (resolve) => {
        if (this._canOpenMenu()) {
          let menu = this.querySelector(":scope > x-menu");

          this._wasFocusedBeforeExpanding = this.matches(":focus");
          this.setAttribute("expanded", "");

          this["#backdrop"].ownerElement = menu;
          this["#backdrop"].show(false);

          await menu.openNextToElement(this, "vertical", 3);
          menu.focus();
        }

        resolve();
      });
    }

    _closeMenu(delay = null) {
      return new Promise( async (resolve) => {
        if (this._canCloseMenu()) {
          let menu = this.querySelector(":scope > x-menu");
          menu.setAttribute("closing", "");

          await delay;
          await menu.close();

          this["#backdrop"].hide(false);
          this.removeAttribute("expanded");

          if (this._wasFocusedBeforeExpanding) {
            this.focus();
          }
          else {
            let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

            if (ancestorFocusableElement) {
              ancestorFocusableElement.focus();
            }
          }

          menu.removeAttribute("closing");
        }

        resolve();
      });
    }

    _canOpenMenu() {
      let result = false;

      if (this.disabled === false) {
        let menu = this.querySelector(":scope > x-menu");

        if (menu && menu.hasAttribute("opened") === false && menu.hasAttribute("closing") === false) {
          let item = menu.querySelector("x-menuitem");

          if (item !== null) {
            result = true;
          }
        }
      }

      return result;
    }

    _canCloseMenu() {
      let result = false;

      if (this.disabled === false) {
        let menu = this.querySelector(":scope > x-menu");

        if (menu && menu.opened) {
          result = true;
        }
      }

      return result;
    }

    _openPopover() {
      return new Promise( async (resolve) => {
        if (this._canOpenPopover()) {
          let popover = this.querySelector(":scope > x-popover");

          this._wasFocusedBeforeExpanding = this.matches(":focus");
          this.setAttribute("expanded", "");

          await popover.open(this);
          popover.focus();
        }

        resolve();
      });
    }

    _closePopover(delay = null) {
      return new Promise( async (resolve) => {
        if (this._canClosePopover()) {
          let popover = this.querySelector(":scope > x-popover");
          popover.setAttribute("closing", "");

          await delay;
          await popover.close();

          this.removeAttribute("expanded");

          if (this._wasFocusedBeforeExpanding) {
            this.focus();
          }
          else {
            let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

            if (ancestorFocusableElement) {
              ancestorFocusableElement.focus();
            }
          }

          popover.removeAttribute("closing");
        }

        resolve();
      });
    }

    _canOpenPopover() {
      let result = false;

      if (this.disabled === false) {
        let popover = this.querySelector(":scope > x-popover");

        if (popover && popover.hasAttribute("opened") === false ) {
          result = true;
        }
      }

      return result;
    }

    _canClosePopover() {
      let result = false;

      if (this.disabled === false) {
        let popover = this.querySelector(":scope > x-popover");

        if (popover && popover.opened) {
          result = true;
        }
      }

      return result;
    }

    _openDialog() {
      return new Promise((resolve) => {
        if (this._canOpenDialog()) {
          let dialog = this.querySelector(":scope > dialog");
          dialog.showModal();
        }

        resolve();
      });
    }

    _canOpenDialog() {
      let result = false;

      if (this.disabled === false) {
        let dialog = this.querySelector(":scope > dialog");

        if (dialog && dialog.hasAttribute("open") === false && dialog.hasAttribute("closing") === false) {
          result = true;
        }
      }

      return result;
    }

    _openNotification() {
      return new Promise((resolve) => {
        if (this._canOpenNotification()) {
          let notification = this.querySelector(":scope > x-notification");
          notification.opened = true;
        }

        resolve();
      });
    }

    _canOpenNotification() {
      let result = false;

      if (this.disabled === false) {
        let notification = this.querySelector(":scope > x-notification");

        if (notification && !notification.hasAttribute("opened") && !notification.hasAttribute("closing")) {
          result = true;
        }
      }

      return result;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateArrowVisibility() {
      let popup = this.querySelector(":scope > x-menu, :scope > x-popover");
      this["#arrow"].style.display = (popup ? null : "none");
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "button");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex] > 0) ? this[$oldTabIndex] : 0;
        }

        delete this[$oldTabIndex];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onPointerDown(event) {
      let openedMenu = this.querySelector(":scope > x-menu[opened]");
      let openedPopover = this.querySelector(":scope > x-popover[opened]");
      let openedDialog = this.querySelector(":scope > dialog[open]");
      let openedNotification = this.querySelector(":scope > x-notification[opened]");

      if (event.target === this["#backdrop"]) {
        this._onBackdropPointerDown(event);
      }
      else if (openedMenu && openedMenu.contains(event.target)) {
        return;
      }
      else if (openedPopover && openedPopover.contains(event.target)) {
        return;
      }
      else if (openedDialog && openedDialog.contains(event.target)) {
        return;
      }
      else if (openedNotification && openedNotification.contains(event.target)) {
        return;
      }
      else {
        this._onButtonPointerDown(event);
      }
    }

    _onClick(event) {
      let openedMenu = this.querySelector(":scope > x-menu[opened]");
      let openedPopover = this.querySelector(":scope > x-popover[opened]");
      let openedDialog = this.querySelector(":scope > dialog[open]");
      let openedNotification = this.querySelector(":scope > x-notification[opened]");

      if (event.target === this["#backdrop"]) {
        return;
      }
      else if (openedMenu && openedMenu.contains(event.target)) {
        if (openedMenu.hasAttribute("closing") === false && event.target.closest("x-menuitem")) {
          this._onMenuItemClick(event);
        }
      }
      else if (openedPopover && openedPopover.contains(event.target)) {
        return;
      }
      else if (openedDialog && openedDialog.contains(event.target)) {
        return;
      }
      else if (openedNotification && openedNotification.contains(event.target)) {
        return;
      }
      else {
        this._onButtonClick(event);
      }
    }

    _onBackdropPointerDown(pointerDownEvent) {
      this.collapse();
    }

    async _onButtonPointerDown(pointerDownEvent) {
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
        let ancestorFocusableElement = closest(this.parentNode, "*[tabindex]:not(a)");

        this.addEventListener("lostpointercapture", () => {
          if (ancestorFocusableElement) {
            ancestorFocusableElement.focus();
          }
          else {
            this.blur();
          }
        }, {once: true});
      }

      // Provide "pressed" attribute for theming purposes which acts like :active pseudo-class, but is guaranteed
      // to last at least 150ms.
      if (this._canOpenMenu() === false && this._canOpenPopover() === false && this._canClosePopover() === false) {
        let pointerDownTimeStamp = Date.now();
        let isDown = true;

        this.addEventListener("lostpointercapture", async () => {
          isDown = false;
          let pressedTime = Date.now() - pointerDownTimeStamp;
          let minPressedTime = 150;

          if (pressedTime < minPressedTime) {
            await sleep(minPressedTime - pressedTime);
          }

          this.removeAttribute("pressed");
        }, {once: true});

        (async () => {
          if (this.ownerButtons) {
            if (this.ownerButtons.tracking === 0 || this.ownerButtons.tracking === 2) {
              await sleep(10);
            }
            else if (this.ownerButtons.tracking === 1 && (this.toggled === false || this.mixed)) {
              await sleep(10);
            }
          }
          else if (this.togglable) {
            await sleep(10);
          }

          if (isDown) {
            this.setAttribute("pressed", "");
          }
        })();
      }

      if (this._canOpenMenu()) {
        this._openMenu();
      }
      else if (this._canOpenPopover()) {
        this._openPopover();
      }
      else if (this._canClosePopover()) {
        this._closePopover();
      }

      // Ripple
      {
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max$3(rect.width, rect.height) * 1.5;
          let top  = pointerDownEvent.clientY - rect.y - size/2;
          let left = pointerDownEvent.clientX - rect.x - size/2;
          let whenLostPointerCapture = new Promise((r) => this.addEventListener("lostpointercapture", r, {once: true}));
          let delay = true;

          if (this.expandable === false) {
            if (this.ownerButtons) {
              if (this.ownerButtons.tracking === 0 || this.ownerButtons.tracking === 2) {
                delay = false;
              }
              else if (this.ownerButtons.tracking === 1 && this.toggled === false) {
                delay = false;
              }
            }
            else if (this.togglable) {
              delay = false;
            }
          }

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);

          this["#ripples"].append(ripple);
          this["#ripples"].style.contain = "strict";

          let inAnimation = ripple.animate(
            { transform: ["scale3d(0, 0, 0)", "none"]},
            { duration: 300, easing: easing$1 }
          );

          await whenLostPointerCapture;

          if (delay) {
            await inAnimation.finished;

            let outAnimation = ripple.animate(
              { opacity: [getComputedStyle(ripple).opacity || "0", "0"]},
              { duration: 300, easing: easing$1 }
            );

            await outAnimation.finished;
          }

          ripple.remove();
        }

        else if (triggerEffect === "unbounded-ripple") {
          let bounds = this["#ripples"].getBoundingClientRect();
          let size = bounds.height * 1.25;
          let top  = (bounds.y + bounds.height/2) - bounds.y - size/2;
          let left = (bounds.x + bounds.width/2)  - bounds.x - size/2;
          let whenLostPointerCapture = new Promise((r) => this.addEventListener("lostpointercapture", r, {once: true}));

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);

          this["#ripples"].append(ripple);
          this["#ripples"].style.contain = "none";

          // Workaround for buttons that change their color when toggled on/off.
          ripple.hidden = true;
          await sleep(20);
          ripple.hidden = false;

          let inAnimation = ripple.animate(
            { transform: ["scale(0)", "scale(1)"] },
            { duration: 200, easing: easing$1 }
          );

          await whenLostPointerCapture;
          await inAnimation.finished;

          let outAnimation = ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity || "0", "0"] },
            { duration: 200, easing: easing$1 }
          );

          await outAnimation.finished;
          ripple.remove();
        }
      }
    }

    async _onButtonClick(event) {
      let popup = this.querySelector(":scope > x-menu, :scope > x-popover");

      if (popup && popup.hasAttribute("closing")) {
        return;
      }





      if (this._canClosePopover()) ;
      else {
        if (this._canOpenDialog()) {
          this._openDialog();
        }
        else if (this._canOpenNotification()) {
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
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max$3(rect.width, rect.height) * 1.5;
          let top  = (rect.y + rect.height/2) - rect.y - size/2;
          let left = (rect.x + rect.width/2) - rect.x - size/2;
          let delay = true;

          if (this.ownerButtons) {
            if (this.ownerButtons.tracking === 0 || this.ownerButtons.tracking === 2) {
              delay = false;
            }
            else if (this.ownerButtons.tracking === 1 && this.toggled === true) {
              delay = false;
            }
          }
          else if (this.togglable) {
            delay = false;
          }

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple click-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);

          this["#ripples"].append(ripple);
          this["#ripples"].style.contain = "strict";

          let inAnimation = ripple.animate(
            { transform: ["scale3d(0, 0, 0)", "none"]},
            { duration: 300, easing: easing$1 }
          );

          if (delay) {
            await inAnimation.finished;

            let outAnimation = ripple.animate(
              { opacity: [getComputedStyle(ripple).opacity || "0", "0"] },
              { duration: 300, easing: easing$1 }
            );

            await outAnimation.finished;
          }

          ripple.remove();
        }

        else if (triggerEffect === "unbounded-ripple") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = rect.height * 1.35;
          let top  = (rect.y + rect.height/2) - rect.y - size/2;
          let left = (rect.x + rect.width/2) - rect.x - size/2;

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);

          this["#ripples"].append(ripple);
          this["#ripples"].style.contain = "none";

          await ripple.animate(
            { transform: ["scale3d(0, 0, 0)", "none"] },
            { duration: 300, easing: easing$1 }
          ).finished;

          await ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity || "0", "0"] },
            { duration: 300, easing: easing$1 }
          ).finished;

          ripple.remove();
        }
      }
    }

    _onMenuItemClick(event) {
      let item = event.target.closest("x-menuitem");
      let menu = this.querySelector(":scope > x-menu");

      if (!menu.hasAttribute("closing")) {
        this.collapse(item.whenTriggerEnd);
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        if (this._canOpenMenu()) {
          event.preventDefault();
          this._openMenu().then(() => this.querySelector(":scope > x-menu").focusFirstMenuItem());
        }
        else if (this._canOpenPopover()) {
          event.preventDefault();
          this._openPopover();
        }
        else if (this._canOpenDialog()) {
          event.preventDefault();
          this._openDialog();
        }
        else if (this._canOpenNotification()) {
          event.preventDefault();
          this._openNotification();
        }
        else {
          if (this.matches(":focus")) {
            if (this._canClosePopover()) {
              this._closePopover();
            }
            else if (this._canCloseMenu()) {
              this._closeMenu();
            }
            else {
              event.preventDefault();
              this.click();
            }
          }
        }
      }

      else if (event.code === "ArrowDown") {
        if (this._canOpenMenu()) {
          let menu = this.querySelector(":scope > x-menu");
          event.preventDefault();
          this._openMenu().then(() => this.querySelector(":scope > x-menu").focusFirstMenuItem());
        }
        else if (this._canOpenPopover()) {
          event.preventDefault();
          this._openPopover();
        }
        else {
          event.preventDefault();
          this.click();
        }
      }

      else if (event.code === "ArrowUp") {
        if (this._canOpenMenu()) {
          event.preventDefault();
          this._openMenu().then(() => this.querySelector(":scope > x-menu").focusLastMenuItem());
        }
        else if (this._canOpenPopover()) {
          event.preventDefault();
          this._openPopover();
        }
        else {
          event.preventDefault();
          this.click();
        }
      }

      else if (event.code === "Escape") {
        if (this._canCloseMenu()) {
          event.preventDefault();
          this.collapse();
        }
        else if (this._canClosePopover()) {
          event.preventDefault();
          this.collapse();
        }
      }
    }
  }

  customElements.define("x-button", XButtonElement);

  let {isArray} = Array;

  let shadowTemplate$4 = html`
  <template>
    <style>
      :host {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        width: fit-content;
      }
      :host([hidden]) {
        display: none;
      }
    </style>
    <slot></slot>
  </template>
`;

  // @events
  //   toggle
  class XButtonsElement extends HTMLElement {
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
    get tracking() {
      return this.hasAttribute("tracking") ? parseInt(this.getAttribute("tracking")) : -1;
    }
    set tracking(tracking) {
      this.setAttribute("tracking", tracking);
    }

    // @info
    //   Get/set the buttons that should have toggled state.
    // @type
    //   string || Array || null
    get value() {
      if (this.tracking === 2) {
        let buttons = this._getButtons().filter(button => button.toggled);
        return buttons.map(button => button.value).filter(value => value != undefined);
      }
      else if (this.tracking === 1 || this.tracking === 0) {
        let button = this._getButtons().find(button => button.toggled);
        return button && button.value !== undefined ? button.value : null;
      }
      else if (this.tracking === -1) {
        return null;
      }
    }
    set value(value) {
      if (this.tracking === 2) {
        let buttons = this._getButtons();

        if (isArray(value)) {
          for (let button of buttons) {
            button.toggled = (value.includes(button.value));
          }
        }
        else {
          for (let button of buttons) {
            button.toggled = button.value === value;
          }
        }
      }
      else if (this.tracking === 1 || this.tracking === 0) {
        let buttons = this._getButtons();
        let matchedButton = buttons.find(button => button.value === value);

        for (let button of buttons) {
          button.toggled = (button === matchedButton);
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$4.content, true));

      this.addEventListener("click", (event) => this._onClick(event), true);
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      for (let child of this.children) {
        if (child.localName === "x-button") {
          let boxShadow = getComputedStyle(child).boxShadow;

          if (boxShadow !== "none") {
            this.setAttribute("hasboxshadow", "");
          }
          else {
            this.removeAttribute("hasboxshadow");
          }

          break;
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _getButtons() {
      return [...this.querySelectorAll(":scope > x-button, :scope > x-box > x-button")];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onClick(event) {
      if (event.button !== 0) {
        return;
      }

      let clickedButton = event.target.closest("x-button");
      let canToggle = (clickedButton && clickedButton.disabled === false && clickedButton.expandable === false);

      if (canToggle) {
        let otherButtons = this._getButtons().filter(button => button !== clickedButton);

        if (this.tracking === 0) {
          if (clickedButton.mixed) {
            clickedButton.mixed = false;
          }
          else {
            clickedButton.toggled = !clickedButton.toggled;
            clickedButton.mixed = false;
          }

          for (let button of otherButtons) {
            button.toggled = false;
            button.mixed = false;
          }

          this.dispatchEvent(new CustomEvent("toggle", {bubbles: true, detail: clickedButton}));
        }
        else if (this.tracking === 1) {
          if (clickedButton.toggled === false || clickedButton.mixed === true) {
            clickedButton.toggled = true;
            clickedButton.mixed = false;

            for (let button of otherButtons) {
              button.toggled = false;
              button.mixed = false;
            }

            this.dispatchEvent(new CustomEvent("toggle", {bubbles: true, detail: clickedButton}));
          }
        }
        else if (this.tracking === 2) {
          if (clickedButton.mixed) {
            clickedButton.mixed = false;
          }
          else {
            clickedButton.toggled = !clickedButton.toggled;
          }

          this.dispatchEvent(new CustomEvent("toggle", {bubbles: true, detail: clickedButton}));
        }
      }
    }

    _onKeyDown(event) {
      let {key} = event;

      if (key === "ArrowRight") {
        let element = [...this.children].find(child => child.matches(":focus"));

        if (element.nextElementSibling) {
          element.nextElementSibling.focus();
        }
        else if (element !== element.parentElement.firstElementChild) {
          element.parentElement.firstElementChild.focus();
        }
      }

      else if (key === "ArrowLeft") {
        let element = [...this.children].find(child => child.matches(":focus"));

        if (element.previousElementSibling) {
          element.previousElementSibling.focus();
        }
        else if (element !== element.parentElement.lastElementChild) {
          element.parentElement.lastElementChild.focus();
        }
      }
    }
  }

  customElements.define("x-buttons", XButtonsElement);

  let shadowTemplate$5 = html`
  <template>
    <style>
      :host {
        display: block;
        width: 100%;
        min-width: 20px;
        min-height: 48px;
        box-sizing: border-box;
        margin: 30px 0;
      }
    </style>
    <slot></slot>
  </template>
`;

  class XCardElement extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$5.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }
  }

  customElements.define("x-card", XCardElement);

  let easing$2 = "cubic-bezier(0.4, 0, 0.2, 1)";
  let $oldTabIndex$1 = Symbol();

  let shadowTemplate$6 = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        margin: 0 8px 0 0;
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border: 2px solid currentColor;
        --checkmark-width: 100%;
        --checkmark-height: 100%;
        --checkmark-opacity: 0;
        --checkmark-d: path(
          "M 0 0 L 100 0 L 100 100 L 0 100 L 0 0 Z M 95 23 L 86 13 L 37 66 L 13.6 41 L 4.5 51 L 37 85 L 95 23 Z"
        );
        --ripple-type: none; /* unbounded, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.15;
      }
      :host([toggled]) {
        --checkmark-opacity: 1;
      }
      :host([mixed]) {
        --checkmark-opacity: 1;
        --checkmark-d: path("M 0 0 L 100 0 L 100 100 L 0 100 Z M 87 42.6 L 13 42.6 L 13 57.4 L 87 57.4 Z");
      }
      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
      :host([hidden]) {
        display: none;
      }
      :host(:focus) {
        outline: none;
      }

      /**
       * Icons
       */

      #checkmark {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--checkmark-width);
        height: var(--checkmark-height);
        opacity: var(--checkmark-opacity);
        d: var(--checkmark-d);
        transition-property: opacity;
        transition-timing-function: inherit;
        transition-duration: inherit;
      }

      #checkmark path {
        fill: currentColor;
        d: inherit;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        z-index: -1;
        will-change: opacity, transform;
        border-radius: 999px;
        transform: scale(2.6);
      }
    </style>

    <div id="ripples"></div>

    <svg id="checkmark" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path></path>
    </svg>
  </template>
`;

  // @events
  //   toggle
  class XCheckboxElement extends HTMLElement {
    static get observedAttributes() {
      return ["toggled", "disabled"];
    }

    // @info
    //   Values associated with this checkbox.
    // @type
    //   string
    // @default
    //   null
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get toggled() {
      return this.hasAttribute("toggled");
    }
    set toggled(toggled) {
      toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$6.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();
    }

    attributeChangedCallback(name) {
      if (name === "toggled") {
        this._onToggledAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "checkbox");
      this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$1] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$1] > 0) ? this[$oldTabIndex$1] : 0;
        }

        delete this[$oldTabIndex$1];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onToggledAttributeChange() {
      this.setAttribute("aria-toggled", this.mixed ? "mixed" : this.toggled);
    }

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onPointerDown(event) {
      if (event.buttons !== 1) {
        event.preventDefault();
        return;
      }

      // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
      if (this.matches(":focus") === false) {
        event.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }

      // Ripple
      {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "unbounded") {
          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          this["#ripples"].append(ripple);

          let transformAnimation = ripple.animate(
            { transform: ["scale(0)", "scale(2.6)"] },
            { duration: 200, easing: easing$2 }
          );

          this.setPointerCapture(event.pointerId);

          this.addEventListener("lostpointercapture", async () => {
            await transformAnimation.finished;

            let opacityAnimation = ripple.animate(
              { opacity: [getComputedStyle(ripple).opacity, "0"] },
              { duration: 200, easing: easing$2 }
            );

            await opacityAnimation.finished;

            ripple.remove();
          }, {once: true});
        }
      }
    }

    async _onClick(event) {
      // Update state
      {
        if (this.mixed) {
          this.mixed = false;
        }
        else {
          this.toggled = !this.toggled;
        }

        this.dispatchEvent(new CustomEvent("toggle", {bubbles: true}));
      }

      // Ripple
      if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "unbounded") {
          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple");
          this["#ripples"].append(ripple);

          await ripple.animate(
            { transform: ["scale(0)", "scale(2.6)"] },
            { duration: 300, easing: easing$2 }
          ).finished;

          await ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity, "0"] },
            { duration: 300, easing: easing$2 }
          ).finished;

          ripple.remove();
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.click();
      }
    }
  }
  customElements.define("x-checkbox", XCheckboxElement);

  let $oldTabIndex$2 = Symbol();

  let shadowHTML$1 = `
  <style>
    :host {
      display: block;
      height: 24px;
      width: 40px;
      box-sizing: border-box;
      background: url(node_modules/xel/images/checkboard.png) repeat 0 0;
      border: 1px solid rgb(150, 150, 150);
      position: relative;
    }
    :host([hidden]) {
      display: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.4;
    }

    ::slotted(x-popover) {
      width: 190px;
      height: auto;
      padding: 12px 12px;
    }

    #input {
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: none;
      background: none;
      padding: 0;
      opacity: 0;
      -webkit-appearance: none;
    }
    #input::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    #input::-webkit-color-swatch {
      border: none;
    }
  </style>

  <input tabindex="-1" id="input" type="color" value="#ffffff">
  <slot></slot>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  class XColorSelectElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "disabled"];
    }

    // @type
    //   string
    // @default
    //   #000000
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "#ffffff";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._inputChangeStarted = false;
      this._onInputChangeDebouonced = debounce(this._onInputChangeDebouonced, 400, this);

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.innerHTML = shadowHTML$1;

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("change", (event) => this._onChange(event));
      this["#input"].addEventListener("change", (event) => this._onInputChange(event));
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    connectedCallback() {
      let picker = this.querySelector("x-wheelcolorpicker, x-rectcolorpicker, x-barscolorpicker");

      if (picker) {
        picker.setAttribute("value", formatColorString(this.value, "rgba"));
      }

      this._updateAccessabilityAttributes();
      this._updateInput();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async _expand() {
      if (this.hasAttribute("expanded") === false) {
        let popover = this.querySelector("x-popover");

        if (popover) {
          this._wasFocusedBeforeExpanding = this.matches(":focus");
          this.setAttribute("expanded", "");
          await popover.open(this);
          popover.focus();
        }
      }
    }

    async _collapse(delay = null) {
      if (this.hasAttribute("expanded")) {
        let popover = this.querySelector("x-popover");

        if (popover) {
          popover.setAttribute("closing", "");

          await popover.close();
          this.removeAttribute("expanded");

          if (this._wasFocusedBeforeExpanding) {
            this.focus();
          }
          else {
            let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

            if (ancestorFocusableElement) {
              ancestorFocusableElement.focus();
            }
          }

          popover.removeAttribute("closing");
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateInput() {
      let [r, g, b, a] = parseColor(this.value, "rgba");
      this["#input"].value = serializeColor([r, g, b, a], "rgba", "hex");
      this["#input"].style.opacity = a;
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$2] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$2] > 0) ? this[$oldTabIndex$2] : 0;
        }

        delete this[$oldTabIndex$2];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      if (!this._inputChangeStarted) {
        this._updateInput();
      }

      let picker = [...this.querySelectorAll("*")].find(element => element.localName.endsWith("colorpicker"));

      if (picker && picker.getAttribute("value") !== this.getAttribute("value")) {
        picker.setAttribute("value", this.getAttribute("value"));
      }
    }

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onChange(event) {
      if (event.target !== this) {
        this.value = formatColorString(event.target.value, "rgba");
        this._updateInput();
      }
    }

    _onInputChange() {
      if (this._inputChangeStarted === false) {
        this._inputChangeStarted = true;
        this.dispatchEvent(new CustomEvent("changestart"));
      }

      this.dispatchEvent(new CustomEvent("change"));
      this._onInputChangeDebouonced();
    }

    _onInputChangeDebouonced() {
      if (this._inputChangeStarted) {
        this.value = this["#input"].value;
        this._inputChangeStarted = false;
        this.dispatchEvent(new CustomEvent("changeend"));
      }
    }

    _onPointerDown(event) {
      if (event.target === this) {
        event.preventDefault();
      }
    }

    _onClick(event) {
      let popover = this.querySelector(":scope > x-popover");

      if (popover) {
        if (popover.opened) {
          if (popover.modal === false && event.target === this) {
            event.preventDefault();
            this._collapse();
          }
          else if (popover.modal === true && event.target.localName === "x-backdrop") {
            event.preventDefault();
            this._collapse();
          }
        }
        else {
          event.preventDefault();
          this._expand();
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        let popover = this.querySelector("x-popover");

        event.preventDefault();
        event.stopPropagation();

        if (popover) {
          if (this.hasAttribute("expanded")) {
            this._collapse();
          }
          else {
            this._expand();
          }
        }
        else {
          this["#input"].click();
        }
      }

      else if (event.code === "Escape") {
        let popover = this.querySelector("x-popover");

        if (popover) {
          if (this.hasAttribute("expanded")) {
            this._collapse();
          }
        }
      }

      else if (event.code === "Tab") {
        if (this.hasAttribute("expanded")) {
          event.preventDefault();
        }
      }
    }
  }

  customElements.define("x-colorselect", XColorSelectElement);

  let shadowTemplate$7 = html`
  <template>
    <style>
      :host {
        display: fixed;
        width: 0px;
        height: 0px;
        z-index: 1001;
      }
    </style>

    <slot></slot>
  </template>
`;

  class XContextMenuElement extends HTMLElement {
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._parentElement = null;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$7.content, true));

      this["#backdrop"] = createElement("x-backdrop");
      this["#backdrop"].style.background =  "rgba(0, 0, 0, 0)";
      this["#backdrop"].addEventListener("contextmenu", (event) => this._onBackdropContextMenu(event));
      this["#backdrop"].addEventListener("pointerdown", (event) => this._onBackdropPointerDown(event));

      window.addEventListener("blur", (event) => this._onBlur(event));
      this.addEventListener("blur", (event) => this._onBlur(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event), true);
      this.addEventListener("click", (event) => this._onClick(event));
    }

    connectedCallback() {
      this._parentElement = this.parentElement || this.parentNode.host;

      this._parentElement.addEventListener("contextmenu", this._parentContextMenuListener = (event) => {
        this._onParentContextMenu(event);
      });
    }

    disconnectedCallback() {
      this._parentElement.removeEventListener("contextmenu", this._parentContextMenuListener);
      this._parentElement = null;
    }

    ///////////////////////////////////'/////////////////////////////////////////////////////////////////////////////

    open(clientX, clientY) {
      let menu = this.querySelector("x-menu");

      if (menu.opened === false) {
        menu.openAtPoint(clientX, clientY);

        this["#backdrop"].ownerElement = menu;
        this["#backdrop"].show(false);

        menu.focus();
      }
    }

    close() {
      return new Promise(async (resolve) => {
        let menu = this.querySelector("x-menu");
        await menu.close();
        this["#backdrop"].hide(false);

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }

        resolve();
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onBlur() {
    }

    _onParentContextMenu(event) {
      if (this.disabled === false) {
        event.preventDefault();
        this.open(event.clientX, event.clientY);
      }
    }

    _onBackdropContextMenu(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.close().then(() => {
        let target = this.parentElement.getRootNode().elementFromPoint(event.clientX, event.clientY);

        if (target && this.parentElement.contains(target)) {
          this.open(event.clientX, event.clientY);
        }
      });
    }

    _onBackdropPointerDown(event) {
      if (event.buttons === 1) {
        event.preventDefault();
        this.close();
      }
    }

    async _onClick(event) {
      let item = event.target.closest("x-menuitem");

      if (item && item.disabled === false) {
        let submenu = item.querySelector("x-menu");

        if (submenu) {
          if (submenu.opened) {
            submenu.close();
          }
          else {
            submenu.openNextToElement(item, "horizontal");
          }
        }
        else {
          this.setAttribute("closing", "");

          await item.whenTriggerEnd;
          await this.close();

          this.removeAttribute("closing");
        }
      }
    }

    _onKeyDown(event) {
      if (event.key === "Escape") {
        let menu = this.querySelector("x-menu");

        if (menu.opened) {
          event.preventDefault();
          this.close();
        }
      }

      else if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();

        let menu = this.querySelector("x-menu");
        menu.focusNextMenuItem();
      }
    }
  }

  customElements.define("x-contextmenu", XContextMenuElement);

  let $oldTabIndex$3 = Symbol();

  let shadowTemplate$8 = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        max-width: 140px;
        height: 24px;
        box-sizing: border-box;
        color: #000000;
        background: white;
        --inner-padding: 0;
      }
      :host(:focus) {
        z-index: 10;
      }
      :host(:hover) {
        cursor: text;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      #main {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      /**
       * Input
       */

      #input {
        width: 100%;
        height: 100%;
        padding: var(--inner-padding);
        box-sizing: border-box;
        color: inherit;
        background: none;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
        cursor: inherit;
      }
      #input::-webkit-clear-button {
        display: none;
      }
      #input::-webkit-inner-spin-button {
        display: none;
      }
      #input::-webkit-calendar-picker-indicator {
        opacity: 0;
        margin: 0;
        padding: 0;
        width: 16px;
        height: 16px;
      }
      :host([empty]) #input::-webkit-datetime-edit-fields-wrapper {
        display: none;
      }
      :host(:active) #input::-webkit-datetime-edit-fields-wrapper,
      :host(:focus) #input::-webkit-datetime-edit-fields-wrapper {
        display: initial;
      }

      /**
       * Expand icon
       */

      #expand-icon {
        display: block;
        position: absolute;
        right: 5px;
        width: 16px;
        height: 16px;
        opacity: 0.7;
        color: inherit;
        background-color: inherit;
        pointer-events: none;
      }

      /**
       * Error message
       */

      :host([error])::before {
        position: absolute;
        left: 0;
        top: 26px;
        box-sizing: border-box;
        color: #d50000;
        font-family: inherit;
        font-size: 11px;
        line-height: 1.2;
        white-space: pre;
        content: attr(error);
      }
    </style>

    <main id="main">
      <slot></slot>
      <x-icon id="expand-icon" name="date-range"></x-icon>
      <input id="input" type="date"></input>
    </main>
  </template>
`;

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend
  class XDateSelectElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "min", "max", "disabled", "validation"];
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    //   partial
    get value() {
      return this["#input"].value;
    }
    set value(value) {
      if (this["#input"].value !== value) {
        this["#input"].value = value;

        if (this.validation === "instant") {
          this.validate();
        }
        else if (this.validation === "auto" || this.validation === "manual") {
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
    get min() {
      return this.hasAttribute("min") ? this.getAttribute("min") : null;
    }
    set min(date) {
      this.setAttribute("min", date);
    }

    // @type
    //   string
    // @default
    //   null
    // @attribute
    get max() {
      return this.hasAttribute("max") ? this.getAttribute("max") : null;
    }
    set max(date) {
      this.setAttribute("max", date);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get required() {
      return this.hasAttribute("required");
    }
    set required(required) {
      required ? this.setAttribute("required", "") : this.removeAttribute("required");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
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
    get validation() {
      return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
    }
    set validation(validation) {
      this.setAttribute("validation", validation);
    }

    // @type
    //   string?
    // @default
    //   null
    // @attribute
    get error() {
      return this.getAttribute("error");
    }
    set error(error) {
      error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$8.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("focusin", (event) => this._onFocusIn(event));
      this.addEventListener("focusout", (event) => this._onFocusOut(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));

      this["#input"].addEventListener("change", (event) => this._onInputChange(event));
      this["#input"].addEventListener("input", (event) => this._onInputInput(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();
      this._updateEmptyState();

      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "min") {
        this._onMinAttributeChange();
      }
      else if (name === "max") {
        this._onMaxAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
      else if (name === "validation") {
        this._onValidationAttributeChnage();
      }
    }

    // @info
    //   Override this method to validate the input value manually.
    // @type
    //   () => void
    validate() {
      if (this.value && this.min && this.value < this.min) {
        this.error = "Entered date is before the minimum date";
      }
      else if (this.value && this.max && this.value > this.max) {
        this.error = "Entered date is after the maximum date";
      }
      else if (this.required && this.value.length === 0) {
        this.error = "This field is required";
      }
      else {
        this.error = null;
      }
    }

    selectAll() {
      this["#input"].select();
    }

    clear() {
      this.value = "";
      this.error = null;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateEmptyState() {
      if (this.value.length === 0) {
        this.setAttribute("empty", "");
      }
      else {
        this.removeAttribute("empty");
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "input");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$3] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$3] > 0) ? this[$oldTabIndex$3] : 0;
        }

        delete this[$oldTabIndex$3];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

      if (this.matches(":focus")) {
        this.selectAll();
      }
    }

    _onMinAttributeChange() {
      this["#input"].min = this.min;
    }

    _onMaxAttributeChange() {
      this["#input"].max = this.max;
    }

    _onDisabledAttributeChange() {
      this["#input"].disabled = this.disabled;
      this._updateAccessabilityAttributes();
    }

    _onValidationAttributeChnage() {
      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    _onFocusIn() {
      this.dispatchEvent(new CustomEvent("textinputmodestart", {bubbles: true, composed: true}));
    }

    _onFocusOut() {
      this.dispatchEvent(new CustomEvent("textinputmodeend", {bubbles: true, composed: true}));

      if (this.validation === "auto") {
        this.validate();
      }
    }

    _onKeyDown(event) {
      if (event.key === "Enter") {
        document.execCommand("selectAll");

        if (this.validation === "instant") {
          this.validate();
        }
        else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }

    _onInputInput(event) {
      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }

      event.stopPropagation();
      this._updateEmptyState();
      this.dispatchEvent(new CustomEvent("input", {bubbles: true}));
    }

    _onInputChange() {
      this.validate();
      this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
    }
  }

  customElements.define("x-dateselect", XDateSelectElement);

  let {max: max$4} = Math;

  let easing$3 = "cubic-bezier(0.4, 0, 0.2, 1)";

  let shadowTemplate$9 = html`
  <template>
    <style>
      :host {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 200px;
        flex: 1 0 0;
        transition-property: max-width, padding, order;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        cursor: default;
        padding: 0 4px 0 16px;
        user-select: none;
        touch-action: pan-y;
        box-sizing: border-box;
        overflow: hidden;
        contain: strict;
        will-change: max-width;
        z-index: 0;
        -webkit-app-region: no-drag;
        --ripple-type: none; /* bounded, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.2;
        --selection-indicator-height: 3px;
        --selection-indicator-color: var(--accent-color);
        --close-button-position: static;
        --close-button-left: 0;
        --close-button-right: initial;
        --close-button-width: 18px;
        --close-button-height: 18px;
        --close-button-margin: 0 0 0 auto;
        --close-button-opacity: 0.8;
        --close-button-path-d: path(
          "M 74 31 L 69 26 L 50 45 L 31 26 L 26 31 L 45 50 L 26 69 L 31 74 L 50 55 L 69 74 L 74 69 L 55 50 Z"
        );
      }
      :host([edited]) {
        --close-button-path-d: path(
          "M 68 50 C 68 60 60 68 50 68 C 40 68 32 60 32 50 C 32 40 40 32 50 32 C 60 32 68 40 68 50 Z"
        );
      }
      :host(:focus) {
        outline: none;
      }
      :host([closing]) {
        pointer-events: none;
      }
      :host([selected]) {
        z-index: 1;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      /**
       * Close button
       */

      #close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: var(--close-button-position);
        left: var(--close-button-left);
        right: var(--close-button-right);
        width: var(--close-button-width);
        height: var(--close-button-height);
        margin: var(--close-button-margin);
        opacity: var(--close-button-opacity);
        padding: 1px;
      }
      #close-button:hover {
        background: rgba(0, 0, 0, 0.08);
        opacity: 1;
      }

      #close-button-path {
        pointer-events: none;
        d: var(--close-button-path-d);
        fill: currentColor;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
        contain: strict;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        border-radius: 999px;
        will-change: opacity, transform;
        pointer-events: none;
      }

      /**
       * Selection indicator
       */

      #selection-indicator {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: var(--selection-indicator-height);
        background: var(--selection-indicator-color);
        pointer-events: none;
      }
      :host([selected]) #selection-indicator {
        display: block;
      }
      :host-context(x-doctabs[animatingindicator]) #selection-indicator {
        display: none;
      }
    </style>

    <div id="ripples"></div>
    <div id="selection-indicator"></div>

    <slot></slot>

    <svg id="close-button" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path id="close-button-path"></path>
    </svg>
  </template>
`;

  // @events
  //   close
  class XDocTabElement extends HTMLElement {
    static get observedAttributes() {
      return ["selected", "disabled"];
    }

    // @type
    //   XDocTabsElement
    // @readOnly
    get ownerTabs() {
      return this.closest("x-doctabs");
    }

    // @info
    //   Value associated with this tab.
    // @type
    //   string
    // @default
    //   ""
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    // @property
    //   reflected
    // @type
    //   boolean
    // @default
    //   false
    get selected() {
      return this.hasAttribute("selected");
    }
    set selected(selected) {
      selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
    }

    // @property
    //   reflected
    // @type
    //   boolean
    // @default
    //   false
    get edited() {
      return this.hasAttribute("edited");
    }
    set edited(edited) {
      edited ? this.setAttribute("edited", "") : this.removeAttribute("edited");
    }

    // @property
    //   reflected
    // @type
    //   boolean
    // @default
    //   false
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled === true ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$9.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#close-button"].addEventListener("pointerdown", (event) => this._onCloseButtonPointerDown(event));
      this["#close-button"].addEventListener("click", (event) => this._onCloseButtonClick(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
    }

    connectedCallback() {
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
      this.setAttribute("role", "tab");
      this.setAttribute("aria-selected", this.selected);
      this.setAttribute("aria-disabled", this.disabled);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "selected") {
        this._onSelectedAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onSelectedAttributeChange() {
      this.setAttribute("aria-selected", this.selected);
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    _onDisabledAttributeChange() {
      this.setAttribute("aria-disabled", this.disabled);
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    _onPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        pointerDownEvent.preventDefault();
        return;
      }

      // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
      if (this.matches(":focus") === false) {
        pointerDownEvent.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }

      // Provide "pressed" attribute for theming purposes
      {
        let pointerDownTimeStamp = Date.now();

        this.setAttribute("pressed", "");
        this.setPointerCapture(pointerDownEvent.pointerId);

        this.addEventListener("lostpointercapture", async (event) => {
          if (this.selected === true) {
            let pressedTime = Date.now() - pointerDownTimeStamp;
            let minPressedTime = 100;

            if (pressedTime < minPressedTime) {
              await sleep(minPressedTime - pressedTime);
            }
          }

          this.removeAttribute("pressed");
        }, {once: true});
      }

      // Ripple
      {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "bounded") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max$4(rect.width, rect.height) * 1.5;
          let top  = pointerDownEvent.clientY - rect.y - size/2;
          let left = pointerDownEvent.clientX - rect.x - size/2;

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
          this["#ripples"].append(ripple);

          let inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"]}, { duration: 300, easing: easing$3 });

          // Pointer capture is set on the owner tabs rather than this tab intentionally. Owner tabs might be
          // already capturing the pointer and hijacking it would disrupt the currently performed tab move
          // operation.
          this.ownerTabs.setPointerCapture(pointerDownEvent.pointerId);

          this.ownerTabs.addEventListener("lostpointercapture", async () => {
            await inAnimation.finished;

            let fromOpacity = getComputedStyle(ripple).opacity;
            let outAnimation = ripple.animate({ opacity: [fromOpacity, "0"]}, { duration: 300, easing: easing$3 });
            await outAnimation.finished;

            ripple.remove();
          }, {once: true});
        }
      }
    }

    async _onClick(event) {
      if (event.button !== 0) {
        return;
      }

      // Ripple
      if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "bounded") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max$4(rect.width, rect.height) * 1.5;
          let top  = (rect.y + rect.height/2) - rect.y - size/2;
          let left = (rect.x + rect.width/2) - rect.x - size/2;

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple click-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
          this["#ripples"].append(ripple);

          let inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"]}, { duration: 300, easing: easing$3 });
          await inAnimation.finished;

          let fromOpacity = getComputedStyle(ripple).opacity;
          let outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$3 });
          await outAnimation.finished;

          ripple.remove();
        }
      }
    }

    _onCloseButtonPointerDown(event) {
      if (event.buttons !== 1) {
        return;
      }

      event.stopPropagation();
    }

    _onCloseButtonClick(event) {
      if (event.button !== 0) {
        return;
      }

      event.stopPropagation();

      let customEvent = new CustomEvent("close", {bubbles: true, cancelable: true, detail: this});
      this.dispatchEvent(customEvent);

      if (customEvent.defaultPrevented === false) {
        this.ownerTabs.closeTab(this);
      }
    }
  }
  customElements.define("x-doctab", XDocTabElement);

  let {abs} = Math;
  let {parseInt: parseInt$2} = Number;

  let shadowTemplate$a = html`
  <template>
    <style>
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        --open-button-width: 24px;
        --open-button-height: 24px;
        --open-button-margin: 0 10px;
        --open-button-path-d: path(
          "M 79 54 L 54 54 L 54 79 L 46 79 L 46 54 L 21 54 L 21 46 L 46 46 L 46 21 L 54 21 L 54 46 L 79 46 L 79 54 Z"
        );
      }
      :host(:focus) {
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      #open-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--open-button-width);
        height: var(--open-button-height);
        margin: var(--open-button-margin);
        order: 9999;
        opacity: 0.7;
        color: inherit;
        -webkit-app-region: no-drag;
      }
      #open-button:hover {
        opacity: 1;
      }

      #open-button-path {
        d: var(--open-button-path-d);
        fill: currentColor;
      }

      #selection-indicator-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      }

      #selection-indicator {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    </style>

    <slot></slot>

    <div id="selection-indicator-container">
      <div id="selection-indicator" hidden></div>
    </div>

    <svg id="open-button" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path id="open-button-path"></path>
    </svg>
  </template>
`;

  // @events
  //   open
  //   close
  //   select
  //   rearrange
  class XDocTabsElement extends HTMLElement {
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled === true ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    // @info
    //   Maximal number of tambs that can be opened
    // @type
    //   number
    // @default
    //   20
    // @attribute
    get maxTabs() {
      return this.hasAttribute("maxtabs") ? parseInt$2(this.getAttribute("maxtabs")) : 20;
    }
    set maxTabs(maxTabs) {
      this.setAttribute("maxtabs", maxTabs);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._waitingForTabToClose = false;
      this._waitingForPointerMoveAfterClosingTab = false;

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$a.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this["#open-button"].addEventListener("click", (event) => this._onOpenButtonClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    openTab(tab, animate = true) {
      return new Promise( async (resolve, reject) => {
        let tabs = this.querySelectorAll("x-doctab");

        if (tabs.length >= this.maxTabs) {
          reject(`Can't open more than ${this.maxTabs} tabs.`);
        }
        else {
          let maxOrder = 0;

          for (let tab of this.children) {
            let order = parseInt$2(tab.style.order);

            if (!Number.isNaN(order) && order > maxOrder) {
              maxOrder = order;
            }
          }
          tab.style.order = maxOrder;

          if (animate === false) {
            tab.style.transition = "none";
            tab.style.maxWidth = null;
            tab.style.padding = null;

            this.append(tab);
            tab.focus();
            resolve(tab);
          }
          else if (animate === true) {
            tab.style.transition = null;
            tab.style.maxWidth = "0px";
            tab.style.padding = "0px";

            tab.setAttribute("opening", "");
            this.append(tab);
            await sleep(30);

            tab.addEventListener("transitionend", () => {
              tab.removeAttribute("opening");
              resolve(tab);
            }, {once: true});

            tab.style.maxWidth = null;
            tab.style.padding = null;
            tab.focus();
          }
        }
      });
    }

    closeTab(tab, animate = true) {
      return new Promise( async (resolve) => {
        let tabs = this.getTabsByScreenIndex().filter(tab => tab.hasAttribute("closing") === false);
        let tabWidth = tab.getBoundingClientRect().width;
        let tabScreenIndex = this._getTabScreenIndex(tab);

        tab.setAttribute("closing", "");

        if (tabScreenIndex < tabs.length - 1) {
          for (let tab of this.children) {
            if (tab.hasAttribute("closing") === false) {
              tab.style.transition = "none";
              tab.style.maxWidth = tabWidth + "px";
            }
          }
        }

        if (animate) {
          tab.style.transition = null;
        }
        else {
          tab.style.transition = "none";
        }

        tab.style.maxWidth = "0px";
        tab.style.pointerEvents = "none";

        this._waitingForTabToClose = true;

        if (tab.selected) {
          let previousTab = tabs[tabs.indexOf(tab) - 1];
          let nextTab = tabs[tabs.indexOf(tab) + 1];

          tab.selected = false;

          if (nextTab) {
            nextTab.selected = true;
          }
          else if (previousTab) {
            previousTab.selected = true;
          }
        }

        if (tab.matches(":focus")) {
          let selectedTab = this.querySelector("x-doctab[selected]");

          if (selectedTab) {
            selectedTab.focus();
          }
          else {
            this.focus();
          }
        }

        tab.style.maxWidth = "0px";
        tab.style.padding = "0px";

        if (animate) {
          await sleep(150);
        }

        tab.remove();
        this._waitingForTabToClose = false;
        tab.removeAttribute("closing");

        resolve();

        if (!this._waitingForPointerMoveAfterClosingTab) {
          this._waitingForPointerMoveAfterClosingTab = true;
          await this._whenPointerMoved(3);
          this._waitingForPointerMoveAfterClosingTab = false;

          for (let tab of this.children) {
            tab.style.transition = null;
            tab.style.maxWidth = null;
            tab.style.order = this._getTabScreenIndex(tab);
          }
        }
      });
    }

    selectPreviousTab() {
      let tabs = this.getTabsByScreenIndex();
      let currentTab = this.querySelector(`x-doctab[selected]`) || this.querySelector("x-doctab");
      let previousTab = this._getPreviousTabOnScreen(currentTab);

      if (currentTab && previousTab) {
        this.selectTab(previousTab);

        return previousTab;
      }

      return null;
    }

    selectNextTab() {
      let tabs = this.getTabsByScreenIndex();
      let currentTab = this.querySelector(`x-doctab[selected]`) || this.querySelector("x-doctab:last-of-type");
      let nextTab = this._getNextTabOnScreen(currentTab);

      if (currentTab && nextTab) {
        this.selectTab(nextTab);

        return nextTab;
      }

      return null;
    }

    selectTab(nextTab) {
      let currentTab = this.querySelector(`x-doctab[selected]`) || this.querySelector("x-doctab:last-of-type");

      if (currentTab) {
        currentTab.tabIndex = -1;
        currentTab.selected = false;
      }

      nextTab.tabIndex = 0;
      nextTab.selected = true;
    }

    moveSelectedTabLeft() {
      let selectedTab = this.querySelector("x-doctab[selected]");
      let selectedTabScreenIndex = this._getTabScreenIndex(selectedTab);

      for (let tab of this.children) {
        tab.style.order = this._getTabScreenIndex(tab);
      }

      if (parseInt$2(selectedTab.style.order) === 0) {
        for (let tab of this.children) {
          if (tab === selectedTab) {
            tab.style.order = this.childElementCount - 1;
          }
          else {
            tab.style.order = parseInt$2(tab.style.order) - 1;
          }
        }
      }
      else {
        let otherTab = this._getTabWithScreenIndex(selectedTabScreenIndex - 1);
        otherTab.style.order = parseInt$2(otherTab.style.order) + 1;
        selectedTab.style.order = parseInt$2(selectedTab.style.order) - 1;
      }
    }

    moveSelectedTabRight() {
      let selectedTab = this.querySelector("x-doctab[selected]");
      let selectedTabScreenIndex = this._getTabScreenIndex(selectedTab);

      for (let tab of this.children) {
        tab.style.order = this._getTabScreenIndex(tab);
      }

      if (parseInt$2(selectedTab.style.order) === this.childElementCount - 1) {
        for (let tab of this.children) {
          if (tab === selectedTab) {
            tab.style.order = 0;
          }
          else {
            tab.style.order = parseInt$2(tab.style.order) + 1;
          }
        }
      }
      else {
        let otherTab = this._getTabWithScreenIndex(selectedTabScreenIndex + 1);
        otherTab.style.order = parseInt$2(otherTab.style.order) - 1;
        selectedTab.style.order = parseInt$2(selectedTab.style.order) + 1;
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @info
    //   Returns a promise that is resolved when the pointer is moved by at least the given distance.
    // @type
    //   (number) => Promise
    _whenPointerMoved(distance = 3) {
      return new Promise((resolve) => {
        let pointerMoveListener, pointerOutListener, blurListener;
        let fromPoint = null;

        let removeListeners = () => {
          window.removeEventListener("pointermove", pointerMoveListener);
          window.removeEventListener("pointerout", pointerOutListener);
          window.removeEventListener("blur", blurListener);
        };

        window.addEventListener("pointermove", pointerMoveListener = (event) => {
          if (fromPoint === null) {
            fromPoint = {x: event.clientX, y: event.clientY};
          }
          else {
            let toPoint = {x: event.clientX, y: event.clientY};

            if (getDistanceBetweenPoints(fromPoint, toPoint) >= distance) {
              removeListeners();
              resolve();
            }
          }
        });

        window.addEventListener("pointerout", pointerOutListener = (event) => {
          if (event.toElement === null) {
            removeListeners();
            resolve();
          }
        });

        window.addEventListener("blur", blurListener = () => {
          removeListeners();
          resolve();
        });
      });
    }

    _animateSelectionIndicator(fromTab, toTab) {
      let mainBBox = this.getBoundingClientRect();
      let startBBox = fromTab ? fromTab.getBoundingClientRect() : null;
      let endBBox = toTab.getBoundingClientRect();
      let computedStyle = getComputedStyle(toTab);

      if (startBBox === null) {
        startBBox = DOMRect.fromRect(endBBox);
        startBBox.x += startBBox.width / 2;
        startBBox.width = 0;
      }

      this["#selection-indicator"].style.height = computedStyle.getPropertyValue("--selection-indicator-height");
      this["#selection-indicator"].style.background = computedStyle.getPropertyValue("--selection-indicator-color");
      this["#selection-indicator"].hidden = false;

      this.setAttribute("animatingindicator", "");

      let animation = this["#selection-indicator"].animate(
        [
          {
            bottom: (startBBox.bottom - mainBBox.bottom) + "px",
            left: (startBBox.left - mainBBox.left) + "px",
            width: startBBox.width + "px",
          },
          {
            bottom: (endBBox.bottom - mainBBox.bottom) + "px",
            left: (endBBox.left - mainBBox.left) + "px",
            width: endBBox.width + "px",
          }
        ],
        {
          duration: 200,
          iterations: 1,
          delay: 0,
          easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
        }
      );

      animation.finished.then(() => {
        this["#selection-indicator"].hidden = true;
        this.removeAttribute("animatingindicator");
      });

      return animation;
    }

    getTabsByScreenIndex() {
      let $screenIndex = Symbol();

      for (let tab of this.children) {
        tab[$screenIndex] = this._getTabScreenIndex(tab);
      }

      return [...this.children].sort((tab1, tab2) => tab1[$screenIndex] > tab2[$screenIndex]);
    }

    _getTabScreenIndex(tab) {
      let tabBounds = tab.getBoundingClientRect();
      let tabsBounds = this.getBoundingClientRect();

      if (tabBounds.left - tabsBounds.left < tabBounds.width / 2) {
        return 0;
      }
      else {
        let offset = (tabBounds.width / 2);

        for (let i = 1; i < this.maxTabs; i += 1) {
          if (tabBounds.left - tabsBounds.left >= offset &&
              tabBounds.left - tabsBounds.left < offset + tabBounds.width) {
            if (i > this.childElementCount - 1) {
              return this.childElementCount - 1;
            }
            else {
              return i;
            }
          }
          else {
            offset += tabBounds.width;
          }
        }
      }
    }

    _getTabWithScreenIndex(screenIndex) {
      for (let tab of this.children) {
        if (this._getTabScreenIndex(tab) === screenIndex) {
          return tab;
        }
      }

      return null;
    }

    _getPreviousTabOnScreen(tab, skipDisabled = true, wrapAround = true) {
      let tabs = this.getTabsByScreenIndex();
      let tabScreenIndex = tabs.indexOf(tab);
      let previousTab = null;

      for (let i = tabScreenIndex - 1; i >= 0; i -= 1) {
        let tab = tabs[i];

        if (skipDisabled && tab.disabled) {
          continue;
        }
        else {
          previousTab = tab;
          break;
        }
      }

      if (wrapAround) {
        if (previousTab === null) {
          for (let i = tabs.length - 1; i > tabScreenIndex; i -= 1) {
            let tab = tabs[i];

            if (skipDisabled && tab.disabled) {
              continue;
            }
            else {
              previousTab = tab;
              break;
            }
          }
        }
      }

      return previousTab;
    }

    // @info
    //   Get previous tab on screen.
    _getNextTabOnScreen(tab, skipDisabled = true, wrapAround = true) {
      let tabs = this.getTabsByScreenIndex();
      let tabScreenIndex = tabs.indexOf(tab);
      let nextTab = null;

      for (let i = tabScreenIndex + 1; i < tabs.length; i += 1) {
        let tab = tabs[i];

        if (skipDisabled && tab.disabled) {
          continue;
        }
        else {
          nextTab = tab;
          break;
        }
      }

      if (wrapAround) {
        if (nextTab === null) {
          for (let i = 0; i < tabScreenIndex; i += 1) {
            let tab = tabs[i];

            if (skipDisabled && tab.disabled) {
              continue;
            }
            else {
              nextTab = tab;
              break;
            }
          }
        }
      }

      return nextTab;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onPointerDown(event) {
      if (event.buttons === 1 && !this._waitingForTabToClose && event.target.closest("x-doctab")) {
        this._onTabPointerDown(event);
      }
    }

    _onTabPointerDown(pointerDownEvent) {
      if (pointerDownEvent.isPrimary === false) {
        return;
      }

      let pointerMoveListener, lostPointerCaptureListener;
      let pointerDownTab = pointerDownEvent.target.closest("x-doctab");
      let selectedTab = this.querySelector("x-doctab[selected]");

      this.selectTab(pointerDownTab);
      if (selectedTab != pointerDownTab) {
        this.dispatchEvent(new CustomEvent("select", {detail: pointerDownTab}));
      }

      let selectionIndicatorAnimation = this._animateSelectionIndicator(selectedTab, pointerDownTab);
      this.setPointerCapture(pointerDownEvent.pointerId);

      this.addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        if (pointerMoveEvent.isPrimary && abs(pointerMoveEvent.clientX - pointerDownEvent.clientX) > 1) {
          this.removeEventListener("pointermove", pointerMoveListener);
          this.removeEventListener("lostpointercapture", lostPointerCaptureListener);

          selectionIndicatorAnimation.finish();
          this._onTabDragStart(pointerDownEvent, pointerDownTab);
        }
      });

      this.addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this.removeEventListener("pointermove", pointerMoveListener);
        this.removeEventListener("lostpointercapture", lostPointerCaptureListener);
      });
    }

    _onTabDragStart(firstPointerMoveEvent, draggedTab) {
      let tabBounds = draggedTab.getBoundingClientRect();
      let tabsBounds = this.getBoundingClientRect();

      let $initialScreenIndex = Symbol();
      let $screenIndex = Symbol();
      let $flexOffset = Symbol();

      draggedTab.style.zIndex = 999;
      this["#open-button"].style.opacity = "0";

      for (let tab of this.children) {
        let screenIndex = this._getTabScreenIndex(tab);
        tab[$screenIndex] = screenIndex;
        tab[$initialScreenIndex] = screenIndex;
        tab[$flexOffset] = tab.getBoundingClientRect().left - tabsBounds.left;

        if (tab !== draggedTab) {
          tab.style.transition = "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      }

      let onDraggedTabScreenIndexChange = (fromScreenIndex, toScreenIndex) => {
        if (toScreenIndex > fromScreenIndex + 1) {
          for (let i = fromScreenIndex; i < toScreenIndex; i += 1) {
            onDraggedTabScreenIndexChange(i, i + 1);
          }
        }
        else if (toScreenIndex < fromScreenIndex - 1) {
          for (let i = fromScreenIndex; i > toScreenIndex; i -= 1) {
            onDraggedTabScreenIndexChange(i, i - 1);
          }
        }
        else {
          for (let tab of this.children) {
            if (tab !== draggedTab) {
              if (tab[$screenIndex] === toScreenIndex) {
                tab[$screenIndex] = fromScreenIndex;
              }

              let translateX = -tab[$flexOffset];

              for (let i = 0; i < tab[$screenIndex]; i += 1) {
                translateX += tabBounds.width;
              }

              if (translateX === 0) {
                tab.style.transform = null;
              }
              else {
                tab.style.transform = "translate(" + translateX + "px)";
              }
            }
          }
        }
      };

      let pointerMoveListener = (pointerMoveEvent) => {
        if (pointerMoveEvent.isPrimary) {
          let dragOffset = pointerMoveEvent.clientX - firstPointerMoveEvent.clientX;

          if (dragOffset + draggedTab[$flexOffset] <= 0) {
            dragOffset = -draggedTab[$flexOffset];
          }
          else if (dragOffset + draggedTab[$flexOffset] + tabBounds.width > tabsBounds.width) {
            dragOffset = tabsBounds.width - draggedTab[$flexOffset] - tabBounds.width;
          }

          draggedTab.style.transform = "translate(" + dragOffset + "px)";
          let screenIndex = this._getTabScreenIndex(draggedTab);

          if (screenIndex !== draggedTab[$screenIndex]) {
            let previousTabScreenIndex = draggedTab[$screenIndex];
            draggedTab[$screenIndex] = screenIndex;
            onDraggedTabScreenIndexChange(previousTabScreenIndex, draggedTab[$screenIndex]);
          }
        }
      };

      let lostPointerCaptureListener = async (dragEndEvent) => {
        this.removeEventListener("pointermove", pointerMoveListener);
        this.removeEventListener("lostpointercapture", lostPointerCaptureListener);

        let translateX = -draggedTab[$flexOffset];

        for (let i = 0; i < draggedTab[$screenIndex]; i += 1) {
          translateX += tabBounds.width;
        }

        draggedTab.style.transition = "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)";
        draggedTab.style.transform = "translate(" + translateX + "px)";

        if (draggedTab[$initialScreenIndex] !== draggedTab[$screenIndex]) {
          this.dispatchEvent(
            new CustomEvent("rearrange")
          );
        }

        await sleep(150);

        draggedTab.style.zIndex = null;
        this["#open-button"].style.opacity = null;

        for (let tab of this.children) {
          tab.style.transition = "none";
          tab.style.transform = "translate(0px, 0px)";
          tab.style.order = tab[$screenIndex];
        }
      };

      this.addEventListener("pointermove", pointerMoveListener);
      this.addEventListener("lostpointercapture", lostPointerCaptureListener);
    }

    _onOpenButtonClick(clickEvent) {
      if (clickEvent.button === 0) {
        let customEvent = new CustomEvent("open", {cancelable: true});
        this.dispatchEvent(customEvent);

        if (customEvent.defaultPrevented === false) {
          let openedTab = html`<x-doctab><x-label>Untitled</x-label></x-doctab>`;
          openedTab.style.order = this.childElementCount;
          this.openTab(openedTab);

          this.selectTab(openedTab);
        }
      }
    }

    _onKeyDown(event) {
      if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
        return;
      }

      else if (event.code === "Enter" || event.code === "Space") {
        let currentTab = this.querySelector(`x-doctab[tabindex="0"]`);
        let selectedTab = this.querySelector(`x-doctab[selected]`);

        event.preventDefault();
        currentTab.click();

        if (currentTab !== selectedTab) {
          this.selectTab(currentTab);
          this._animateSelectionIndicator(selectedTab, currentTab);
        }
      }

      else if (event.code === "ArrowLeft") {
        let tabs = this.getTabsByScreenIndex();
        let currentTab = this.querySelector(`x-doctab[tabindex="0"]`);
        let previousTab = this._getPreviousTabOnScreen(currentTab);

        if (previousTab) {
          event.preventDefault();

          currentTab.tabIndex = -1;
          previousTab.tabIndex = 0;
          previousTab.focus();
        }
      }

      else if (event.code === "ArrowRight") {
        let tabs = this.getTabsByScreenIndex();
        let currentTab = this.querySelector(`x-doctab[tabindex="0"]`);
        let nextTab = this._getNextTabOnScreen(currentTab);

        if (nextTab) {
          event.preventDefault();

          currentTab.tabIndex = -1;
          nextTab.tabIndex = 0;
          nextTab.focus();
        }
      }
    }
  }
  customElements.define("x-doctabs", XDocTabsElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  let readFile = (url) => {
    return new Promise( (resolve, reject) => {
      let xhr = new XMLHttpRequest;
      xhr.open("GET", url);
      xhr.send(null);

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        }
        else {
          reject(xhr.status);
        }
      };

      xhr.onerror = () => {
        reject(xhr.status);
      };
    })
  };

  let shadowTemplate$b = html`
  <template>
    <style>
      :host {
        display: block;
        color: currentColor;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
      :host([disabled]) {
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      #svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
        stroke: none;
        /* @bugfix: pointerOverEvent.relatedTarget leaks shadow DOM of <x-icon> */
        pointer-events: none;
      }
    </style>

    <svg id="svg" preserveAspectRatio="none" viewBox="0 0 100 100" width="0px" height="0px"></svg>
  </template>
`;

  let cache = {};

  class XIconElement extends HTMLElement {
    static get observedAttributes() {
      return ["name", "iconset"];
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get name() {
      return this.hasAttribute("name") ? this.getAttribute("name") : "";
    }
    set name(name) {
      this.setAttribute("name", name);
    }

    // @type
    //   string
    // @default
    //   "node_modules/xel/images/icons.svg"
    // @attribute
    get iconset() {
      if (this.hasAttribute("iconset") === false || this.getAttribute("iconset").trim() === "") {
        return "./icons.svg";
      }
      else {
        return this.getAttribute("iconset");
      }
    }
    set iconset(iconset) {
      this.setAttribute("iconset", iconset);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$b.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "name") {
        this._update();
      }
      else if (name === "iconset") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async _update() {
      if (this.name === "") {
        this["#svg"].innerHTML = "";
      }
      else {
        let symbol = await this._getSymbol(this.name, this.iconset);

        if (symbol) {
          this["#svg"].innerHTML = `${symbol.outerHTML}<use href="#${this.name}" width="100%" height="100%"></use>`;
        }
        else {
          this["#svg"].innerHTML = "";
        }
      }
    }

    _getSymbol(name, iconsetURL) {
      return new Promise(async (resolve) => {
        let iconset = await this._getIconset(iconsetURL);
        let symbol = null;

        if (iconset) {
          symbol = iconset.querySelector("#" + CSS.escape(name));
        }

        resolve(symbol);
      });
    }

    _getIconset(iconsetURL) {
      return new Promise(async (resolve) => {
        if (cache[iconsetURL]) {
          if (cache[iconsetURL].iconset) {
            resolve(cache[iconsetURL].iconset);
          }
          else {
            cache[iconsetURL].callbacks.push(resolve);
          }
        }
        else {
          cache[iconsetURL] = {callbacks: [resolve], iconset: null};

          let iconsetSVG = null;

          try {
            iconsetSVG = await readFile(iconsetURL);
          }
          catch (error) {
            iconsetSVG = null;
          }

          if (iconsetSVG) {
            cache[iconsetURL].iconset = svg`${iconsetSVG}`;

            for (let callback of cache[iconsetURL].callbacks) {
              callback(cache[iconsetURL].iconset);
            }
          }
        }
      });
    }
  }

  customElements.define("x-icon", XIconElement);

  let $oldTabIndex$4 = Symbol();

  let shadowTemplate$c = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        max-width: 140px;
        height: 24px;
        box-sizing: border-box;
        color: #000000;
        background: white;
        --selection-color: currentColor;
        --selection-background: #B2D7FD;
        --inner-padding: 0;
      }
      :host(:focus) {
        z-index: 10;
      }
      :host(:hover) {
        cursor: text;
      }
      :host([error]) {
        --selection-color: white;
        --selection-background: #d50000;
      }
      :host([readonly]) {
        color: rgba(0, 0, 0, 0.75);
      }
      :host([mixed]) {
        color: rgba(0, 0, 0, 0.7);
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      ::selection {
        color: var(--selection-color);
        background: var(--selection-background);
      }

      #main {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      #input {
        width: 100%;
        height: 100%;
        padding: var(--inner-padding);
        box-sizing: border-box;
        color: inherit;
        background: none;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        text-align: inherit;
        cursor: inherit;
      }
      #input:-webkit-autofill {
        /* Hide the placehodler text when the input is autofilled */
        z-index: 1;
      }

      /* Selection rect */
      :host(:not(:focus)) ::selection {
        color: inherit;
        background: transparent;
      }

      /* Error */
      :host([error])::before {
        position: absolute;
        left: 0;
        top: 26px;
        box-sizing: border-box;
        color: #d50000;
        font-family: inherit;
        font-size: 11px;
        line-height: 1.2;
        white-space: pre;
        content: attr(error);
      }
    </style>

    <main id="main">
      <slot></slot>
      <input id="input" spellcheck="false"></input>
    </main>
  </template>
`;

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend
  class XInputElement extends HTMLElement {
    static get observedAttributes() {
      return ["type", "value", "spellcheck", "maxlength", "readonly", "disabled", "validation"];
    }

    // @type
    //   "text" || "email" || "password" || "url" || "color"
    // @default
    //   "text"
    // @attribute
    get type() {
      return this.hasAttribute("type") ? this.getAttribute("type") : "text";
    }
    set type(type) {
      this.setAttribute("type", type);
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    //   partial
    get value() {
      return this["#input"].value;
    }
    set value(value) {
      if (this["#input"].value !== value) {
        if (this.matches(":focus")) {
          // https://goo.gl/s1UnHh
          this["#input"].selectionStart = 0;
          this["#input"].selectionEnd = this["#input"].value.length;
          document.execCommand("insertText", false, value);
        }
        else {
          this["#input"].value = value;
        }

        if (this.validation === "instant") {
          this.validate();
        }
        else if (this.validation === "auto" || this.validation === "manual") {
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
    get spellcheck() {
      return this.hasAttribute("spellcheck");
    }
    set spellcheck(spellcheck) {
      spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
    }

    // @type
    //   number
    // @default
    //   0
    // @attribute
    get minLength() {
      return this.hasAttribute("minlength") ? parseInt(this.getAttribute("minlength")) : 0;
    }
    set minLength(minLength) {
      this.setAttribute("minlength", minLength);
    }

    // @type
    //   number || Infinity
    // @default
    //   0
    // @attribute
    get maxLength() {
      return this.hasAttribute("maxlength") ? parseInt(this.getAttribute("maxlength")) : Infinity;
    }
    set maxLength(maxLength) {
      this.setAttribute("maxlength", maxLength);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get required() {
      return this.hasAttribute("required");
    }
    set required(required) {
      required ? this.setAttribute("required", "") : this.removeAttribute("required");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @atrribute
    get readOnly() {
      return this.hasAttribute("readonly");
    }
    set readOnly(readOnly) {
      readOnly === true ? this.setAttribute("readonly", readOnly) : this.removeAttribute("readonly");
    }

    // @info
    //   Whether this input has "mixed" state.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
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
    get validation() {
      return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
    }
    set validation(validation) {
      this.setAttribute("validation", validation);
    }

    // @type
    //   string?
    // @default
    //   null
    // @attribute
    get error() {
      return this.getAttribute("error");
    }
    set error(error) {
      error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$c.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("focusin", (event) => this._onFocusIn(event));
      this.addEventListener("focusout", (event) => this._onFocusOut(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));

      this["#input"].addEventListener("change", (event) => this._onInputChange(event));
      this["#input"].addEventListener("input", (event) => this._onInputInput(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();
      this._updateEmptyState();

      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    attributeChangedCallback(name) {
      if (name === "type") {
        this._onTypeAttributeChange();
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "spellcheck") {
        this._onSpellcheckAttributeChange();
      }
      else if (name === "maxlength") {
        this._onMaxLengthAttributeChange();
      }
      else if (name === "readonly") {
        this._onReadOnlyAttributeChnage();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
      else if (name === "validation") {
        this._onValidationAttributeChnage();
      }
    }

    // @info
    //   Override this method to validate the input value manually.
    // @type
    //   () => void
    validate() {
      if (this.value.length < this.minLength) {
        this.error = "Entered text is too short";
      }
      else if (this.value.length > this.maxLength) {
        this.error = "Entered text is too long";
      }
      else if (this.required && this.value.length === 0) {
        this.error = "This field is required";
      }
      else if (this.type === "email" && this["#input"].validity.valid === false) {
        this.error = "Invalid e-mail address";
      }
      else if (this.type === "url" && this["#input"].validity.valid === false) {
        this.error = "Invalid URL";
      }
      else if (this.type === "color" && isValidColorString(this["#input"].value) === false) {
        this.error = "Invalid color";
      }
      else {
        this.error = null;
      }
    }

    selectAll() {
      this["#input"].select();
    }

    clear() {
      this.value = "";
      this.error = null;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateEmptyState() {
      if (this.value.length === 0) {
        this.setAttribute("empty", "");
      }
      else {
        this.removeAttribute("empty");
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "input");
      this.setAttribute("aria-disabled", this.disabled);
      this.setAttribute("aria-readonly", this.readOnly);

      if (this.disabled) {
        this[$oldTabIndex$4] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$4] > 0) ? this[$oldTabIndex$4] : 0;
        }

        delete this[$oldTabIndex$4];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onTypeAttributeChange() {
      if (this.type === "color") {
        this["#input"].type = "text";
      }
      else {
        this["#input"].type = this.type;
      }
    }

    _onValueAttributeChange() {
      this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

      if (this.matches(":focus")) {
        this.selectAll();
      }
    }

    _onSpellcheckAttributeChange() {
      this["#input"].spellcheck = this.spellcheck;
    }

    _onMaxLengthAttributeChange() {
      this["#input"].maxLength = this.maxLength;
    }

    _onReadOnlyAttributeChnage() {
      this["#input"].readOnly = this.readOnly;
      this._updateAccessabilityAttributes();
    }

    _onDisabledAttributeChange() {
      this["#input"].disabled = this.disabled;
      this._updateAccessabilityAttributes();
    }

    _onValidationAttributeChnage() {
      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    _onFocusIn() {
      this.dispatchEvent(new CustomEvent("textinputmodestart", {bubbles: true, composed: true}));
    }

    _onFocusOut() {
      this.dispatchEvent(new CustomEvent("textinputmodeend", {bubbles: true, composed: true}));

      if (this.validation === "auto") {
        this.validate();
      }
    }

    _onKeyDown(event) {
      if (event.key === "Enter") {
        document.execCommand("selectAll");

        if (this.validation === "instant") {
          this.validate();
        }
        else if (this.validation === "auto" || this.validation === "manual") {
          if (this.error !== null) {
            this.validate();
          }
        }
      }
    }

    _onInputInput(event) {
      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }

      event.stopPropagation();
      this._updateEmptyState();
      this.dispatchEvent(new CustomEvent("input", {bubbles: true}));
    }

    _onInputChange() {
      this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
    }
  }

  customElements.define("x-input", XInputElement);

  let shadowTemplate$d = html`
  <template>
    <style>
      :host {
        display: block;
        line-height: 1.2;
        user-select: none;
        box-sizing: border-box;
      }
      :host(:hover) {
        cursor: default;
      }
      :host([disabled]) {
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }
    </style>

    <slot></slot>
  </template>
`;

  class XLabelElement extends HTMLElement {
    static get observedAttributes() {
      return ["for"];
    }

    // @info
    //   Values associated with this label.
    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @info
    //   Source of the icon to show.
    // @type
    //   string
    // @attribute
    get for() {
      return this.getAttribute("for");
    }
    set for(value) {
      this.setAttribute("for", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$d.content, true));

      this.addEventListener("click", (event) => this._onClick(event));
    }

    attributeChangedCallback(name) {
      if (name === "for") {
        this._onForAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onClick(event) {
      if (this.for && this.disabled === false && event.target.closest("a") === null) {
        let target = this.getRootNode().querySelector("#" + CSS.escape(this.for));

        if (target) {
          target.click();
        }
      }
    }

    _onForAttributeChange() {
      let rootNode = this.getRootNode();
      let target = rootNode.querySelector("#" + CSS.escape(this.for));

      if  (target) {
        if (!this.id) {
          this.id = generateUniqueID(rootNode, "label-");
        }

        target.setAttribute("aria-labelledby", this.id);
      }
    }
  }

  customElements.define("x-label", XLabelElement);

  let {abs: abs$1} = Math;
  let windowWhitespace = 7;

  let shadowTemplate$e = html`
  <template>
    <style>
      :host {
        display: none;
        top: 0;
        left: 0;
        width: fit-content;
        z-index: 1001;
        box-sizing: border-box;
        background: white;
        cursor: default;
        -webkit-app-region: no-drag;
        --scrollbar-background: rgba(0, 0, 0, 0.2);
        --scrollbar-width: 6px;
        --open-transition: 100 transform cubic-bezier(0.4, 0, 0.2, 1);
        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host([opened]),
      :host([animating]) {
        display: block;
      }
      :host(:focus) {
        outline: none;
      }
      :host-context([debug]):host(:focus) {
        outline: 2px solid red;
      }

      #main {
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
      }

      ::-webkit-scrollbar {
        max-width: var(--scrollbar-width);
        background: none;
      }
      ::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-background);
      }
      ::-webkit-scrollbar-corner {
        display: none
      }
    </style>

    <main id="main" role="presentation">
      <slot id="slot"></slot>
    </main>
  </template>
`;

  // @events
  //   open XMenu
  //   close XMenu
  class XMenuElement extends HTMLElement {
    static get observedAttributes() {
      return ["opened"];
    }

    // @info
    //   Whether the menu is shown on screen.
    // @type
    //   boolean
    // @readonly
    // @attribute
    get opened() {
      return this.hasAttribute("opened");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._delayPoints = [];
      this._delayTimeoutID = null;
      this._lastDelayPoint = null;

      this._extraTop = 0;
      this._lastScrollTop = 0;
      this._isPointerOverMenuBlock = false;
      this._expandWhenScrolled = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$e.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("pointerover", (event) => this._onPointerOver(event));
      this.addEventListener("pointerout", (event) => this._onPointerOut(event));
      this.addEventListener("pointermove", (event) => this._onPointerMove(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
      this.addEventListener("wheel", (event) => this._onWheel(event), {passive: true});
      this["#main"].addEventListener("scroll", (event) => this._onScroll(event), {passive: true});
    }

    connectedCallback() {
      this.setAttribute("role", "menu");
      this.setAttribute("aria-hidden", !this.opened);
      this.setAttribute("tabindex", "0");
    }

    attributeChangedCallback(name) {
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
    openOverElement(underElement, overElement) {
      return new Promise( async (resolve) => {
        let items = this.querySelectorAll(":scope > x-menuitem");

        if (items.length > 0) {
          this._expandWhenScrolled = true;
          this._openedTimestamp = getTimeStamp();
          this._resetInlineStyles();
          this.setAttribute("opened", "");

          let menuItem = [...items].find((item) => item.contains(overElement)) || items[0];
          let menuBounds = this.getBoundingClientRect();
          let underElementBounds = underElement.getBoundingClientRect();
          let overElementBounds = overElement.getBoundingClientRect();

          let extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
          let extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

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
            this.style.left = (underElementBounds.x - (overElementBounds.x - menuBounds.x) + extraLeft) + "px";
            this.style.top = (underElementBounds.y - (overElementBounds.y - menuBounds.y) + extraTop) + "px";
            menuBounds = this.getBoundingClientRect();
          }

          // Move the menu right if it overflows the left client bound
          {
            if (menuBounds.left < windowWhitespace) {
              this.style.left = (windowWhitespace + extraLeft) + "px";
              menuBounds = this.getBoundingClientRect();
            }
          }

          // Reduce the menu height if it overflows the top client bound
          {
            let overflowTop = windowWhitespace - menuBounds.top;

            if (overflowTop > 0) {
              this.style.height = (menuBounds.bottom - windowWhitespace) + "px";
              this.style.top = (windowWhitespace + extraTop) + "px";
              this["#main"].scrollTop = 9999;
              menuBounds = this.getBoundingClientRect();
            }
          }

          // Reduce menu height if it overflows the bottom client bound
          // Reduce menu width if it overflows the right client bound
          {
            if (menuBounds.bottom + windowWhitespace > window.innerHeight) {
              let overflow = menuBounds.bottom - window.innerHeight;
              let height = menuBounds.height - overflow - windowWhitespace;
              this.style.height = height + "px";
            }

            if (menuBounds.right + windowWhitespace > window.innerWidth) {
              let overflow = menuBounds.right - window.innerWidth;
              let width = menuBounds.width - overflow - windowWhitespace;
              this.style.width = `${width}px`;
            }
          }

          // Animate the menu block
          {
            let transition = getComputedStyle(this).getPropertyValue("--open-transition");
            let [property, duration, easing] = this._parseTransistion(transition);

            if (property === "transform") {
              let blockBounds = this.getBoundingClientRect();
              let originY = underElementBounds.y + underElementBounds.height/2 - blockBounds.top;

              await this.animate(
                {
                  transform: ["scaleY(0)", "scaleY(1)"],
                  transformOrigin: [`0 ${originY}px`, `0 ${originY}px`]
                },
                { duration, easing }
              ).finished;
            }
          }

          this.dispatchEvent(new CustomEvent("open", {bubbles: true, detail: this}));
          this._extraTop = extraTop;
        }

        resolve();
      });
    }

    // @info
    //   Open the menu over the given <x-label> element.
    //   Returns a promise that is resolved when the menu finishes animating.
    // @type
    //   (XMenuItem) => Promise<>
    openOverLabel(underLabel) {
      return new Promise( async (resolve) => {
        let items = this.querySelectorAll(":scope > x-menuitem");

        if (items.length > 0) {
          this._resetInlineStyles();
          this.setAttribute("opened", "");
          this._expandWhenScrolled = true;
          this._openedTimestamp = getTimeStamp();

          let item = [...items].find((item) => {
            let itemLabel = item.querySelector("x-label");
            return (itemLabel && itemLabel.textContent === underLabel.textContent) ? true : false;
          });

          if (!item) {
            item = items[0];
          }

          let overLabel = item.querySelector("x-label");
          await this.openOverElement(underLabel, overLabel);
        }

        resolve();
      });
    }

    // @info
    //   Open the menu next the given menu item.
    //   Returns a promise that is resolved when the menu finishes animating.
    // @type
    //   (XMenuItem, string) => Promise
    openNextToElement(element, direction = "horizontal", elementWhitespace = 0) {
      return new Promise(async (resolve) => {
        this._expandWhenScrolled = false;
        this._openedTimestamp = getTimeStamp();

        this._resetInlineStyles();
        this.setAttribute("opened", "");
        this.dispatchEvent(new CustomEvent("open", {bubbles: true, detail: this}));

        if (element.localName === "x-menuitem") {
          element.setAttribute("expanded", "");
        }

        let elementBounds = element.getBoundingClientRect();
        let menuBounds = this.getBoundingClientRect();
        let extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
        let extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

        // Determine extraLeft and extraTop which represent the extra offset when the menu is inside another
        // fixed-positioned element such as a popover.
        {
          if (menuBounds.top !== 0 || menuBounds.left !== 0) {
            extraLeft = -menuBounds.left;
            extraTop = -menuBounds.top;
          }
        }

        if (direction === "horizontal") {
          this.style.top = (elementBounds.top + extraTop) + "px";
          this.style.left = (elementBounds.left + elementBounds.width + elementWhitespace + extraLeft) + "px";

          let side = "right";

          // Reduce menu size if it does not fit on screen
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.width > window.innerWidth - 10) {
              this.style.width = (window.innerWidth - 10) + "px";
            }

            if (menuBounds.height > window.innerHeight - 10) {
              this.style.height = (window.innerHeight - 10) + "px";
            }
          }

          // Move the menu horizontally if it overflows the right screen edge
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.left + menuBounds.width + windowWhitespace > window.innerWidth) {
              // Move menu to the left side of the element if there is enough space to fit it in
              if (elementBounds.left > menuBounds.width + windowWhitespace) {
                this.style.left = (elementBounds.left - menuBounds.width + extraLeft) + "px";
                side = "left";
              }
              // ... otherwise move menu to the screen edge
              else {
                // Move menu to the left screen edge
                if (elementBounds.left > window.innerWidth - (elementBounds.left + elementBounds.width)) {
                  this.style.left = (windowWhitespace + extraLeft) + "px";
                  side = "left";
                }
                // Move menu to the right screen edge
                else {
                  this.style.left = (window.innerWidth - menuBounds.width - windowWhitespace + extraLeft) + "px";
                  side = "right";
                }
              }
            }
          }

          // Move the menu vertically it overflows the bottom screen edge
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.top + menuBounds.height + windowWhitespace > window.innerHeight) {
              let bottomOverflow = (menuBounds.top + menuBounds.height + windowWhitespace) - window.innerHeight;
              this.style.top = (menuBounds.top - bottomOverflow + extraTop) + "px";
            }
          }

          // Animate the menu
          {
            let transition = getComputedStyle(this).getPropertyValue("--open-transition");
            let [property, duration, easing] = this._parseTransistion(transition);

            if (property === "transform") {
              await this.animate(
                {
                  transform: ["scale(0, 0)", "scale(1, 1)"],
                  transformOrigin: [side === "left" ? "100% 0" : "0 0", side === "left" ? "100% 0" : "0 0"]
                },
                { duration, easing }
              ).finished;
            }
          }
        }

        else if (direction === "vertical") {
          this.style.top = (elementBounds.top + elementBounds.height + elementWhitespace + extraTop) + "px";
          this.style.left = (elementBounds.left + extraLeft) + "px";

          let side = "bottom";

          // Reduce menu size if it does not fit on screen
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.width > window.innerWidth - 10) {
              this.style.width = (window.innerWidth - 10) + "px";
            }

            if (menuBounds.height > window.innerHeight - 10) {
              this.style.height = (window.innerHeight - 10) + "px";
            }
          }

          if (element.parentElement && element.parentElement.localName === "x-menubar") {
            let menuBounds = this.getBoundingClientRect();

            // Reduce menu height if it overflows bottom screen edge
            if (menuBounds.top + menuBounds.height + windowWhitespace > window.innerHeight) {
              this.style.height = (window.innerHeight - (elementBounds.top + elementBounds.height) - 10) + "px";
            }
          }
          else {
            // Move the menu vertically if it overflows the bottom screen edge
            {
              let menuBounds = this.getBoundingClientRect();

              if (menuBounds.top + menuBounds.height + windowWhitespace > window.innerHeight) {
                // Move menu to the top side of the element if there is enough space to fit it in
                if (elementBounds.top > menuBounds.height + windowWhitespace) {
                  this.style.top = (elementBounds.top - menuBounds.height - elementWhitespace + extraTop) + "px";
                  side = "top";
                }
                // ... otherwise move menu to the screen edge
                else {
                  // Move menu to the top screen edge
                  if (elementBounds.top > window.innerHeight - (elementBounds.top + elementBounds.height)) {
                    this.style.top = (windowWhitespace + extraTop) + "px";
                    side = "top";
                  }
                  // Move menu to the bottom screen edge
                  else {
                    this.style.top = (window.innerHeight - menuBounds.height - windowWhitespace + extraTop) + "px";
                    side = "bottom";
                  }
                }
              }
            }
          }

          // Float the menu to the right element edge if the menu overflows right screen edge
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.left + menuBounds.width + windowWhitespace > window.innerWidth) {
              this.style.left = (elementBounds.left + elementBounds.width - menuBounds.width + extraLeft) + "px";
            }
          }

          // Float the menu to the left screen edge if it overflows the left screen edge
          {
            let menuBounds = this.getBoundingClientRect();

            if (menuBounds.left < windowWhitespace) {
              this.style.left = (windowWhitespace + extraLeft) + "px";
            }
          }

          // Animate the menu
          {
            let transition = getComputedStyle(this).getPropertyValue("--open-transition");
            let [property, duration, easing] = this._parseTransistion(transition);

            if (property === "transform") {
              await this.animate(
                {
                  transform: ["scale(1, 0)", "scale(1, 1)"],
                  transformOrigin: [side === "top" ? "0 100%" : "0 0", side === "top" ? "0 100%" : "0 0"]
                },
                { duration, easing }
              ).finished;
            }
          }
        }

        this._extraTop = extraTop;
        resolve();
      });
    }

    // @info
    //   Open the menu at given client point.
    //   Returns a promise that is resolved when the menu finishes animating.
    // @type
    //   (number, number) => Promise
    openAtPoint(left, top) {
      return new Promise( async (resolve) => {
        this._expandWhenScrolled = false;
        this._openedTimestamp = getTimeStamp();

        this._resetInlineStyles();
        this.setAttribute("opened", "");
        this.dispatchEvent(new CustomEvent("open", {bubbles: true, detail: this}));

        let menuBounds = this.getBoundingClientRect();
        let extraLeft = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)
        let extraTop = 0; // Extra offset needed when menu has fixed-positioned ancestor(s)

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
          this.style.left = (left + extraLeft) + "px";
          this.style.top = (top + extraTop) + "px";
          menuBounds = this.getBoundingClientRect();
        }

        // If menu overflows right screen border then move it to the opposite side
        if (menuBounds.right + windowWhitespace > window.innerWidth) {
          left = left - menuBounds.width;
          this.style.left = (left + extraLeft) + "px";
          menuBounds = this.getBoundingClientRect();
        }

        // If menu overflows bottom screen border then move it up
        if (menuBounds.bottom + windowWhitespace > window.innerHeight) {
          top = top + window.innerHeight - (menuBounds.top + menuBounds.height) - windowWhitespace;
          this.style.top = (top + extraTop) + "px";
          menuBounds = this.getBoundingClientRect();

          // If menu now overflows top screen border then make it stretch to the whole available vertical space

          if (menuBounds.top < windowWhitespace) {
            top = windowWhitespace;
            this.style.top = (top + extraTop) + "px";
            this.style.height = (window.innerHeight - windowWhitespace - windowWhitespace) + "px";
          }
        }

        // Animate the menu
        {
          let transition = getComputedStyle(this).getPropertyValue("--open-transition");
          let [property, duration, easing] = this._parseTransistion(transition);

          if (property === "transform") {
            await this.animate(
              {
                transform: ["scale(0)", "scale(1)"],
                transformOrigin: ["0 0", "0 0"]
              },
              {
                duration: 80,
                easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
              }
            ).finished;
          }
        }

        this._extraTop = extraTop;
        resolve();
      });
    }

    // @info
    //   Close the menu.
    //   Returns a promise that is resolved when the menu finishes animating.
    // @type
    //   (boolean) => Promise
    close(animate = true) {
      return new Promise(async (resolve) => {
        if (this.opened) {
          this.removeAttribute("opened");
          this.dispatchEvent(new CustomEvent("close", {bubbles: true, detail: this}));

          let item = this.closest("x-menuitem");

          if (item) {
            item.removeAttribute("expanded");
          }

          if (animate) {
            this.setAttribute("animating", "");

            let transition = getComputedStyle(this).getPropertyValue("--close-transition");
            let [property, duration, easing] = this._parseTransistion(transition);

            if (property === "opacity") {
              await this.animate({ opacity: ["1", "0"] }, { duration, easing }).finished;
            }

            this.removeAttribute("animating");
          }

          for (let item of this.querySelectorAll(":scope > x-menuitem")) {
            let submenu = item.querySelector("x-menu[opened]");

            if (submenu) {
              submenu.close();
            }
          }
        }

        resolve();
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    focusNextMenuItem() {
      let refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

      if (refItem) {
        let nextItem = null;

        for (let item = refItem.nextElementSibling; item; item = item.nextElementSibling) {
          if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
            nextItem = item;
            break;
          }
        }

        if (nextItem === null && refItem.parentElement != null) {
          for (let item of refItem.parentElement.children) {
            if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
              nextItem = item;
              break;
            }
          }
        }

        if (nextItem) {
          nextItem.focus();

          let menu = refItem.querySelector("x-menu");

          if (menu) {
            menu.close();
          }
        }
      }
      else {
        this.focusFirstMenuItem();
      }
    }

    focusPreviousMenuItem() {
      let refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

      if (refItem) {
        let previousItem = null;

        for (let item = refItem.previousElementSibling; item; item = item.previousElementSibling) {
          if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
            previousItem = item;
            break;
          }
        }

        if (previousItem === null && refItem.parentElement != null) {
          for (let item of [...refItem.parentElement.children].reverse()) {
            if (item.localName === "x-menuitem" && item.disabled === false && item.hidden === false) {
              previousItem = item;
              break;
            }
          }
        }

        if (previousItem) {
          previousItem.focus();

          let menu = refItem.querySelector("x-menu");

          if (menu) {
            menu.close();
          }
        }
      }
      else {
        this.focusLastMenuItem();
      }
    }

    focusFirstMenuItem() {
      let items = this.querySelectorAll("x-menuitem:not([disabled]):not([hidden])");
      let firstItem = items[0] || null;

      if (firstItem) {
        firstItem.focus();
      }
    }

    focusLastMenuItem() {
      let items = this.querySelectorAll("x-menuitem:not([disabled]):not([hidden])");
      let lastItem = (items.length > 0) ? items[items.length-1] : null;

      if (lastItem) {
        lastItem.focus();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @doc
    //   http://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown
    _delay(callback) {
      let tolerance = 75;
      let fullDelay = 300;
      let delay = 0;

      {
        let point = this._delayPoints[this._delayPoints.length - 1];
        let prevPoint = this._delayPoints[0];
        let openedSubmenu = this.querySelector("x-menu[opened]");

        if (openedSubmenu && point) {
          if (!prevPoint) {
            prevPoint = point;
          }

          let bounds = this.getBoundingClientRect();

          let upperLeftPoint  = {x: bounds.left, y: bounds.top - tolerance };
          let upperRightPoint = {x: bounds.left + bounds.width, y: upperLeftPoint.y };
          let lowerLeftPoint  = {x: bounds.left, y: bounds.top + bounds.height + tolerance};
          let lowerRightPoint = {x: bounds.left + bounds.width, y: lowerLeftPoint.y };

          let proceed = true;

          if (
            prevPoint.x < bounds.left || prevPoint.x > lowerRightPoint.x ||
            prevPoint.y < bounds.top  || prevPoint.y > lowerRightPoint.y
          ) {
            proceed = false;
          }

          if (
            this._lastDelayPoint &&
            point.x === this._lastDelayPoint.x &&
            point.y === this._lastDelayPoint.y
          ) {
            proceed = false;
          }

          if (proceed) {
            let decreasingCorner;
            let increasingCorner;

            {
              decreasingCorner = upperRightPoint;
              increasingCorner = lowerRightPoint;
            }

            let getSlope = (a, b) => (b.y - a.y) / (b.x - a.x);
            let decreasingSlope = getSlope(point, decreasingCorner);
            let increasingSlope = getSlope(point, increasingCorner);
            let prevDecreasingSlope = getSlope(prevPoint, decreasingCorner);
            let prevIncreasingSlope = getSlope(prevPoint, increasingCorner);

            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
              this._lastDelayPoint = point;
              delay = fullDelay;
            }
            else {
              this._lastDelayPoint = null;
            }
          }
        }
      }

      if (delay > 0) {
        this._delayTimeoutID = setTimeout(() => {
          this._delay(callback);
        }, delay);
      }
      else {
        callback();
      }
    }

    _clearDelay() {
      if (this._delayTimeoutID) {
        clearTimeout(this._delayTimeoutID);
        this._delayTimeoutID = null;
      }
    }

    _resetInlineStyles() {
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
    _isClosing() {
      return this.matches("*[closing], *[closing] x-menu");
    }

    // @info
    //   Parse the value of CSS transition property.
    // @type
    //   (string) => [string, number, string]
    _parseTransistion(string) {
      let [rawDuration, property, ...rest] = string.trim().split(" ");
      let duration = parseFloat(rawDuration);
      let easing = rest.join(" ");
      return [property, duration, easing];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onOpenedAttributeChange() {
      this.setAttribute("aria-hidden", !this.opened);
    }

    _onPointerDown(event) {
      if (event.target === this || event.target.localName === "hr") {
        event.stopPropagation();
      }
    }

    _onPointerOver(event) {
      if (this._isClosing() || event.pointerType !== "mouse") {
        return;
      }

      if (event.target.closest("x-menu") === this) {
        if (this._isPointerOverMenuBlock === false) {
          this._onMenuBlockPointerEnter();
        }

        // Focus and expand the menu item under pointer and collapse other items
        {
          let item = event.target.closest("x-menuitem");

          if (item && item.disabled === false && item.closest("x-menu") === this) {
            if (item.matches(":focus") === false) {
              this._delay( async () => {
                let otherItem = this.querySelector(":scope > x-menuitem:focus");

                if (otherItem) {
                  let otherSubmenu = otherItem.querySelector("x-menu");

                  if (otherSubmenu) {
                    // otherItem.removeAttribute("expanded");
                    otherSubmenu.close();
                  }
                }

                item.focus();

                let menu = item.closest("x-menu");
                let submenu = item.querySelector("x-menu");
                let otherItems = [...this.querySelectorAll(":scope > x-menuitem")].filter($0 => $0 !== item);

                if (submenu) {
                  await sleep(60);

                  if (item.matches(":focus") && submenu.opened === false) {
                    submenu.openNextToElement(item, "horizontal");
                  }
                }

                for (let otherItem of otherItems) {
                  let otherSubmenu = otherItem.querySelector("x-menu");

                  if (otherSubmenu) {
                    otherSubmenu.close();
                  }
                }
              });
            }
          }
          else {
            this._delay(() => {
              this.focus();
            });
          }
        }
      }
    }

    _onPointerOut(event) {
      // @bug: event.relatedTarget leaks shadowDOM, so we have to use closest() utility function
      if (!event.relatedTarget || closest(event.relatedTarget, "x-menu") !== this) {
        if (this._isPointerOverMenuBlock === true) {
          this._onMenuBlockPointerLeave();
        }
      }
    }

    _onMenuBlockPointerEnter() {
      if (this._isClosing()) {
        return;
      }

      this._isPointerOverMenuBlock = true;
      this._clearDelay();
    }

    _onMenuBlockPointerLeave() {
      if (this._isClosing()) {
        return;
      }

      this._isPointerOverMenuBlock = false;
      this._clearDelay();
      this.focus();
    }

    _onPointerMove(event) {
      this._delayPoints.push({
        x: event.clientX,
        y: event.clientY
      });

      if (this._delayPoints.length > 3) {
        this._delayPoints.shift();
      }
    }

    _onWheel(event) {
      if (event.target.closest("x-menu") === this) {
        this._isPointerOverMenuBlock = true;
      }
      else {
        this._isPointerOverMenuBlock = false;
      }
    }

    _onScroll(event) {
      if (this._expandWhenScrolled) {
        let delta = this["#main"].scrollTop - this._lastScrollTop;
        this._lastScrollTop = this["#main"].scrollTop;

        if (getTimeStamp() - this._openedTimestamp > 100) {
          let menuRect = this.getBoundingClientRect();

          if (delta < 0) {
            if (menuRect.bottom + abs$1(delta) <= window.innerHeight - windowWhitespace) {
              this.style.height = (menuRect.height + abs$1(delta)) + "px";
            }
            else {
              this.style.height = (window.innerHeight - menuRect.top - windowWhitespace) + "px";
            }
          }
          else if (delta > 0) {
            let {top, left, height} = getComputedStyle(this);

            if (menuRect.top - abs$1(delta) >= windowWhitespace) {
              this.style.top = (parseFloat(top) - abs$1(delta)) + "px";
              this.style.height = (parseFloat(height) + abs$1(delta)) + "px";

              this["#main"].scrollTop = 0;
              this._lastScrollTop = 0;
            }
            else {
              this.style.top = (windowWhitespace + this._extraTop) + "px";
              this.style.height = (window.innerHeight - menuRect.top - windowWhitespace) + "px";
            }
          }
        }
      }
    }

    _onKeyDown(event) {
      if (this._isClosing()) {
        event.preventDefault();
        event.stopPropagation();
      }

      else if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        this.focusPreviousMenuItem();
      }

      else if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        this.focusNextMenuItem();
      }

      else if (event.code === "ArrowRight" || event.code === "Enter" || event.code === "Space") {
        let focusedItem = this.querySelector("x-menuitem:focus");

        if (focusedItem) {
          let submenu = focusedItem.querySelector("x-menu");

          if (submenu) {
            event.preventDefault();
            event.stopPropagation();

            if (submenu.opened === false) {
              submenu.openNextToElement(focusedItem, "horizontal");
            }

            let submenuFirstItem = submenu.querySelector("x-menuitem:not([disabled]):not([hidden])");

            if (submenuFirstItem) {
              submenuFirstItem.focus();
            }
          }
        }
      }

      else if (event.code === "ArrowLeft") {
        let focusedItem = this.querySelector("x-menuitem:focus");

        if (focusedItem) {
          let parentMenu = focusedItem.closest("x-menu");
          let parentItem = parentMenu.closest("x-menuitem");

          if (parentItem && parentItem.closest("x-menu")) {
            event.preventDefault();
            event.stopPropagation();

            parentItem.focus();
            this.close();
          }
        }
      }
    }
  }

  customElements.define("x-menu", XMenuElement);

  let debug$2 = false;

  let shadowTemplate$f = html`
  <template>
    <style>
      :host {
        display: flex;
        align-items: center;
        width: 100%;
        height: fit-content;
        overflow: auto;
        box-sizing: border-box;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.6;
      }

      #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        pointer-events: none;
        touch-action: none;
      }
      #backdrop[hidden] {
        display: none;
      }

      #backdrop path {
        fill: red;
        fill-rule: evenodd;
        opacity: 0;
        pointer-events: all;
      }
    </style>

    <svg id="backdrop" hidden>
      <path id="backdrop-path"></path>
    </svg>

    <slot></slot>
  </template>
`;

  class XMenuBarElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._expanded = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$f.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("focusout", (event) => this._onFocusOut(event));
      this._shadowRoot.addEventListener("pointerover", (event) => this._onShadowRootPointerOver(event));
      this._shadowRoot.addEventListener("click", (event) => this._onShadowRootClick(event));
      this._shadowRoot.addEventListener("wheel", (event) => this._onShadowRootWheel(event));
      this._shadowRoot.addEventListener("keydown", (event) => this._onShadowRootKeyDown(event));
    }

    connectedCallback() {
      this.setAttribute("role", "menubar");
      this.setAttribute("aria-disabled", this.disabled);

      window.addEventListener("orientationchange", this._orientationChangeListener = () => {
        this._onOrientationChange();
      });
    }

    disconnectedCallback() {
      window.removeEventListener("orientationchange", this._orientationChangeListener);
    }

    attributeChangedCallback(name) {
      if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _expandMenubarItem(item) {
      let menu = item.querySelector(":scope > x-menu");

      if (menu && menu.opened === false) {
        item.focus();
        this._expanded = true;
        this.style.touchAction = "none";

        // Open item's menu and close other menus
        {
          menu.openNextToElement(item, "vertical");

          let menus = this.querySelectorAll(":scope > x-menuitem > x-menu");
          let otherMenus = [...menus].filter($0 => $0 !== menu);

          for (let otherMenu of otherMenus) {
            if (otherMenu) {
              otherMenu.close(false);
            }
          }
        }

        // Show the backdrop
        {
          let {x, y, width, height} = this.getBoundingClientRect();

          this["#backdrop-path"].setAttribute("d", `
          M 0 0
          L ${window.innerWidth} 0
          L ${window.innerWidth} ${window.innerHeight}
          L 0 ${window.innerHeight}
          L 0 0
          M ${x} ${y}
          L ${x + width} ${y}
          L ${x + width} ${y + height}
          L ${x} ${y + height}
        `);

          this["#backdrop"].removeAttribute("hidden");
        }
      }
    }

    _collapseMenubarItems() {
      return new Promise( async (resolve) => {
        this._expanded = false;
        this.style.touchAction = null;

        // Hide the backdrop
        {
          this["#backdrop"].setAttribute("hidden", "");
          this["#backdrop-path"].setAttribute("d", "");
        }

        // Close all opened menus
        {
          let menus = this.querySelectorAll(":scope > x-menuitem > x-menu[opened]");

          for (let menu of menus) {
            await menu.close(true);
          }
        }

        let focusedMenuItem = this.querySelector("x-menuitem:focus");

        if (focusedMenuItem) {
          focusedMenuItem.blur();
        }

        resolve();
      });
    }

    _expandPreviousMenubarItem() {
      let items = [...this.querySelectorAll(":scope > x-menuitem:not([disabled])")];
      let focusedItem = this.querySelector(":focus").closest("x-menubar > x-menuitem");

      if (items.length > 1 && focusedItem) {
        let i = items.indexOf(focusedItem);
        let previousItem = items[i - 1] || items[items.length-1];
        this._expandMenubarItem(previousItem);
      }
    }

    _expandNextMenubarItem() {
      let items = [...this.querySelectorAll(":scope > x-menuitem:not([disabled])")];
      let focusedItem = this.querySelector(":focus").closest("x-menubar > x-menuitem");

      if (focusedItem && items.length > 1) {
        let i = items.indexOf(focusedItem);
        let nextItem = items[i + 1] || items[0];
        this._expandMenubarItem(nextItem);
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onDisabledAttributeChange() {
      this.setAttribute("aria-disabled", this.disabled);
    }

    _onFocusOut(event) {
      if ((event.relatedTarget === null || this.contains(event.relatedTarget) === false) && debug$2 === false) {
        this._collapseMenubarItems();
      }
    }

    _onOrientationChange() {
      this._collapseMenubarItems();
    }

    _onShadowRootWheel(event) {
      let openedMenu = this.querySelector("x-menu[opened]");

      if (openedMenu && openedMenu.contains(event.target) === false) {
        event.preventDefault();
      }
    }

    async _onShadowRootClick(event) {
      if (this.hasAttribute("closing")) {
        return;
      }

      let item = event.target.closest("x-menuitem");
      let ownerMenu = event.target.closest("x-menu");

      if (item && item.disabled === false && (!ownerMenu || ownerMenu.contains(item))) {
        let menu = item.querySelector("x-menu");

        if (item.parentElement === this) {
          if (menu) {
            menu.opened ? this._collapseMenubarItems() : this._expandMenubarItem(item);
          }
        }
        else {
          if (menu) {
            if (menu.opened && menu.opened === false) {
              menu.openNextToElement(item, "horizontal");
            }
          }
          else {
            this.setAttribute("closing", "");

            await item.whenTriggerEnd;
            await this._collapseMenubarItems();

            this.removeAttribute("closing");
          }
        }
      }

      else if (event.target === this["#backdrop-path"]) {
        this._collapseMenubarItems();
        event.preventDefault();
        event.stopPropagation();
      }
    }

    _onShadowRootPointerOver(event) {
      if (this.hasAttribute("closing")) {
        return;
      }

      let item = event.target.closest("x-menuitem");

      if (event.target.closest("x-menu") === null && item && item.parentElement === this) {
        if (this._expanded && event.pointerType === "mouse") {
          if (item.hasAttribute("expanded") === false) {
            this._expandMenubarItem(item);
          }
          else {
            item.focus();
          }
        }
      }
    }

    _onShadowRootKeyDown(event) {
      if (this.hasAttribute("closing")) {
        event.stopPropagation();
        event.preventDefault();
      }

      else if (event.code === "Enter" || event.code === "Space") {
        let focusedMenubarItem = this.querySelector(":scope > x-menuitem:focus");

        if (focusedMenubarItem) {
          event.preventDefault();
          focusedMenubarItem.click();
        }
      }

      else if (event.code === "Escape") {
        if (this._expanded) {
          event.preventDefault();
          this._collapseMenubarItems();
        }
      }

      else if (event.code === "Tab") {
        let refItem = this.querySelector(":scope > x-menuitem:focus, :scope > x-menuitem[expanded]");

        if (refItem) {
          refItem.focus();

          let menu = refItem.querySelector(":scope > x-menu");

          if (menu) {
            menu.tabIndex = -1;

            menu.close().then(() => {
              menu.tabIndex = -1;
            });
          }
        }
      }

      else if (event.code === "ArrowRight") {
        this._expandNextMenubarItem();
      }

      else if (event.code === "ArrowLeft") {
        this._expandPreviousMenubarItem();
      }

      else if (event.code === "ArrowDown") {
        let menu = this.querySelector("x-menuitem:focus > x-menu");

        if (menu) {
          event.preventDefault();
          menu.focusFirstMenuItem();
        }
      }

      else if (event.code === "ArrowUp") {
        let menu = this.querySelector("x-menuitem:focus > x-menu");

        if (menu) {
          event.preventDefault();
          menu.focusLastMenuItem();
        }
      }
    }
  }

  customElements.define("x-menubar", XMenuBarElement);

  let {max: max$5} = Math;
  let easing$4 = "cubic-bezier(0.4, 0, 0.2, 1)";
  let $oldTabIndex$5 = Symbol();

  let shadowTemplate$g = html`
  <template>
    <style>
      :host {
        display: flex;
        flex-flow: row;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        cursor: default;
        user-select: none;
        contain: layout style;
        --trigger-effect: ripple; /* ripple, blink, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.1;
        --checkmark-d: path("M 37.5 65 L 21 48.9 L 15.7 54.35 L 37.5 76.1 L 84.3 29.3 L 78.8 23.8 Z");
        --checkmark-width: 24px;
        --checkmark-height: 24px;
        --checkmark-margin: 0 12px 0 0;
      }
      :host([hidden]) {
        display: none;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.6;
      }
      :host(:focus) {
        outline: none;
      }
      :host-context([debug]):host(:focus) {
        outline: 2px solid red;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        contain: strict;
        overflow: hidden;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        border-radius: 999px;
        transform: none;
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
        pointer-events: none;
      }

      /**
       * Checkmark
       */

      #checkmark {
        color: inherit;
        display: none;
        transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
        align-self: center;
        width: var(--checkmark-width);
        height: var(--checkmark-height);
        margin: var(--checkmark-margin);
        d: var(--checkmark-d);
      }
      :host([togglable]) #checkmark {
        display: flex;
        transform: scale(0);
        transform-origin: 50% 50%;
      }
      :host([toggled]) #checkmark {
        display: flex;
        transform: scale(1);
      }

      #checkmark path {
        d: inherit;
        fill: currentColor;
      }

      /**
       * "Expand" arrow icon
       */

      #arrow-icon {
        display: flex;
        width: 16px;
        height: 16px;
        transform: scale(1.1);
        align-self: center;
        margin-left: 8px;
        color: inherit;
      }
      #arrow-icon[hidden] {
        display: none;
      }
    </style>

    <div id="ripples"></div>

    <svg id="checkmark" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path></path>
    </svg>

    <slot></slot>
    <x-icon id="arrow-icon" name="play-arrow" hidden></x-icon>
  </template>
`;

  // @events
  //   toggle
  class XMenuItemElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @info
    //   Value associated with this menu item (usually the command name).
    // @type
    //   string?
    // @default
    //   null
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : null;
    }
    set value(value) {
      if (this.value !== value) {
        value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
      }
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get toggled() {
      return this.hasAttribute("toggled");
    }
    set toggled(toggled) {
      toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get togglable() {
      return this.hasAttribute("togglable");
    }
    set togglable(togglable) {
      togglable ? this.setAttribute("togglable", "") : this.removeAttribute("togglable");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    // @info
    //   Promise that is resolved when any trigger effects (such ripples or blinking) are finished.
    // @type
    //   Promise
    get whenTriggerEnd() {
      return new Promise((resolve) => {
        if (this["#ripples"].childElementCount === 0 && this._blinking === false) {
          resolve();
        }
        else {
          this._triggerEndCallbacks.push(resolve);
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._observer = new MutationObserver(() => this._updateArrowIconVisibility());

      this._blinking = false;
      this._triggerEndCallbacks = [];

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$g.content, true));

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this._observer.observe(this, {childList: true, attributes: false, characterData: false, subtree: false});
      this._updateArrowIconVisibility();
      this._updateAccessabilityAttributes();
    }

    disconnectedCallback() {
      this._observer.disconnect();
    }

    attributeChangedCallback(name) {
      if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateArrowIconVisibility() {
      if (this.parentElement.localName === "x-menubar") {
        this["#arrow-icon"].hidden = true;
      }
      else {
        let menu = this.querySelector("x-menu");
        this["#arrow-icon"].hidden = menu ? false : true;
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "menuitem");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$5] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$5] > 0) ? this[$oldTabIndex$5] : 0;
        }

        delete this[$oldTabIndex$5];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    async _onPointerDown(pointerDownEvent) {
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
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          let rect = this["#ripples"].getBoundingClientRect();
          let size = max$5(rect.width, rect.height) * 1.5;
          let top  = pointerDownEvent.clientY - rect.y - size/2;
          let left = pointerDownEvent.clientX - rect.x - size/2;
          let whenLostPointerCapture = new Promise((r) => this.addEventListener("lostpointercapture", r, {once: true}));

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
          this["#ripples"].append(ripple);

          this.setPointerCapture(pointerDownEvent.pointerId);

          let inAnimation = ripple.animate(
            { transform: ["scale3d(0, 0, 0)", "none"]},
            { duration: 300, easing: easing$4 }
          );

          await whenLostPointerCapture;
          await inAnimation.finished;

          let outAnimation = ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity, "0"]},
            { duration: 300, easing: easing$4 }
          );

          await outAnimation.finished;
          ripple.remove();

          if (this["#ripples"].childElementCount === 0) {
            for (let callback of this._triggerEndCallbacks) {
              callback();
            }
          }
        }
      }
    }

    async _onClick(event) {
      if (
        event.button > 0 ||
        event.target.closest("x-menuitem") !== this ||
        event.target.closest("x-menu") !== this.closest("x-menu") ||
        this.matches("[closing] x-menuitem")
      ) {
        return;
      }

      if (this.togglable) {
        let event = new CustomEvent("toggle", {bubbles: true, cancelable: true});
        this.dispatchEvent(event);

        if (event.defaultPrevented === false) {
          this.toggled = !this.toggled;
        }
      }

      // Trigger effect
      {
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          if (this["#ripples"].querySelector(".pointer-down-ripple") === null) {
            let rect = this["#ripples"].getBoundingClientRect();
            let size = max$5(rect.width, rect.height) * 1.5;
            let top  = (rect.y + rect.height/2) - rect.y - size/2;
            let left = (rect.x + rect.width/2) - rect.x - size/2;

            let ripple = createElement("div");
            ripple.setAttribute("class", "ripple click-ripple");
            ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
            this["#ripples"].append(ripple);

            let inAnimation = ripple.animate(
              { transform: ["scale3d(0, 0, 0)", "none"]},
              { duration: 300, easing: easing$4 }
            );

            await inAnimation.finished;

            let outAnimation = ripple.animate(
              { opacity: [getComputedStyle(ripple).opacity, "0"] },
              { duration: 300, easing: easing$4 }
            );

            await outAnimation.finished;

            ripple.remove();

            if (this["#ripples"].childElementCount === 0) {
              for (let callback of this._triggerEndCallbacks) {
                callback();
              }
            }
          }
        }

        else if (triggerEffect === "blink") {
          this._blinking = true;

          this.parentElement.focus();
          await sleep(150);
          this.focus();
          await sleep(150);

          this._blinking = true;

          for (let callback of this._triggerEndCallbacks) {
            callback();
          }
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();

        if (!this.querySelector("x-menu")) {
          event.stopPropagation();
          this.click();
        }
      }
    }
  }

  customElements.define("x-menuitem", XMenuItemElement);

  let shadowTemplate$h = html`
  <template>
    <style>
      :host {
        display: none;
        position: fixed;
        min-width: 15px;
        min-height: 15px;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 12px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.9);
        background: #434343;
        z-index: 9999;
        font-size: 12px;
        user-select: text;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host([opened]),
      :host([animating]) {
        display: block;
      }
      :host(:focus) {
        outline: none;
      }
    </style>

    <slot></slot>
  </template>
`;

  class XNotificationElement extends HTMLElement {
    static get observedAttributes() {
      return ["opened"];
    }

    // @type
    //   boolean
    // @default
    //   false
    get opened() {
      return this.hasAttribute("opened");
    }
    set opened(opened) {
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
    get timeout() {
      return this.hasAttribute("timeout") ? parseFloat(this.getAttribute("timeout")) : 0;
    }
    set timeout(timeout) {
      this.setAttribute("timeout", timeout);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._time = 0;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$h.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this.setAttribute("tabindex", "0");
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "opened") {
        this.opened ? this._onOpen() : this._onClose();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onOpen() {
      // Animate in
      {
        let fromBottom = (0 - this.getBoundingClientRect().height - 10) + "px";
        let toBottom = getComputedStyle(this).bottom;

        let inAnimation = this.animate(
          { bottom: [fromBottom, toBottom]},
          { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
        );

        // await inAnimation.finished;
      }

      // Automatically close the notification after given timeout
      {
        this._time = 0;

        this._intervalID = setInterval(() => {
          this._time += 100;

          if (this.timeout > 0 && this._time > this.timeout) {
            this.opened = false;
          }
        }, 100);

        let openTimeStamp = getTimeStamp();

        window.addEventListener("pointerdown", this._windowPointerDownListener = (event) => {
          let pointerDownTimeStamp = getTimeStamp();
          let bounds = this.getBoundingClientRect();

          if (
            pointerDownTimeStamp - openTimeStamp > 10 &&
            rectContainsPoint(bounds, new DOMPoint(event.clientX, event.clientY)) === false
          ) {
            this.opened = false;
          }
        }, true);
      }
    }

    async _onClose() {
      clearInterval(this._intervalID);

      // Animate out
      {
        this.setAttribute("animating", "");
        let fromBottom = getComputedStyle(this).bottom;
        let toBottom = (0 - this.getBoundingClientRect().height - 10) + "px";

        let inAnimation = this.animate(
          { bottom: [fromBottom, toBottom]},
          { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
        );

        await inAnimation.finished;
        this.removeAttribute("animating");
      }

      window.removeEventListener("pointerdown", this._windowPointerDownListener, true);
    }
  }

  customElements.define("x-notification", XNotificationElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  let {isFinite: isFinite$1, isNaN, parseFloat: parseFloat$2} = Number;

  // @info
  //   Convert the first letter in the given string from lowercase to uppercase.
  // @type
  //   (string) => void
  let capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substr(1);
  };

  // @info
  //   Replace every occurance of string A with string B.
  // @type
  //   (string, string, string) => string
  let replaceAll = (text, a, b) => {
    return text.split(a).join(b);
  };

  // @info
  //   Check if given string is a whitespace string as defined by DOM spec.
  // @type
  //   (string) => boolean
  // @src
  //   https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Whitespace_in_the_DOM
  let isDOMWhitespace = (string) => {
    return !(/[^\t\n\r ]/.test(string));
  };

  // @info
  //   Returns true if the passed argument is either a number or a string that represents a number.
  // @type
  //   (any) => boolean
  let isNumeric = (value) => {
    let number = parseFloat$2(value);
    return isNaN(number) === false && isFinite$1(number);
  };

  let {isFinite: isFinite$2} = Number;
  let numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", ",", "."];
  let $oldTabIndex$6 = Symbol();

  let shadowTemplate$i = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        width: 100px;
        height: 24px;
        box-sizing: border-box;
        color: #000000;
        --selection-color: currentColor;
        --selection-background: #B2D7FD;
        --inner-padding: 0;
      }
      :host(:hover) {
        cursor: text;
      }
      :host([error]) {
        --selection-color: white;
        --selection-background: #d50000;
      }
      :host([mixed]) {
        color: rgba(0, 0, 0, 0.7);
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      ::selection {
        color: var(--selection-color);
        background: var(--selection-background);
      }

      #main {
        display: flex;
        align-items: center;
        height: 100%;
      }

      #editor-container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: var(--inner-padding);
        box-sizing: border-box;
        overflow: hidden;
      }

      #editor {
        width: 100%;
        overflow: auto;
        color: inherit;
        background: none;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        line-height: 10;
        white-space: nowrap;
      }
      #editor::-webkit-scrollbar {
        display: none;
      }
      #editor::before {
        content: attr(data-prefix);
        pointer-events: none;
      }
      #editor::after {
        content: attr(data-suffix);
        pointer-events: none;
      }
      :host([empty]) #editor::before,
      :host([empty]) #editor::after,
      :host(:focus) #editor::before,
      :host(:focus) #editor::after {
        content: "";
      }
    </style>

    <main id="main">
      <div id="editor-container">
        <div id="editor" contenteditable="plaintext-only" spellcheck="false"></div>
      </div>

      <slot></slot>
    </main>
  </template>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  //   textinputmodestart
  //   textinputmodeend
  class XNumberInputElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "min", "max", "prefix", "suffix", "disabled"];
    }

    // @type
    //   number?
    // @default
    //   null
    // @attribute
    get value() {
      return this.hasAttribute("value") ? parseFloat(this.getAttribute("value")) : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @type
    //   number
    // @default
    //   -Infinity
    // @attribute
    get min() {
      return this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : -Infinity;
    }
    set min(min) {
      isFinite$2(min) ? this.setAttribute("min", min) : this.removeAttribute("min");
    }

    // @type
    //   number
    // @default
    //   Infinity
    // @attribute
    get max() {
      return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : Infinity;
    }
    set max(max) {
      isFinite$2(max) ? this.setAttribute("max", max) : this.removeAttribute("max");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @info
    //   Maximal number of digits to be shown after the dot. This setting affects only the display value.
    // @type
    //   number
    // @default
    //   20
    // @attribute
    get precision() {
      return this.hasAttribute("precision") ? parseFloat(this.getAttribute("precision")) : 20;
    }
    set precision(value) {
      this.setAttribute("precision", value);
    }

    // @info
    //   Number by which value should be incremented or decremented when up or down arrow key is pressed.
    // @type
    //   number
    // @default
    //   1
    // @attribute
    get step() {
      return this.hasAttribute("step") ? parseFloat(this.getAttribute("step")) : 1;
    }
    set step(step) {
      this.setAttribute("step", step);
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get prefix() {
      return this.hasAttribute("prefix") ? this.getAttribute("prefix") : "";
    }
    set prefix(prefix) {
      this.setAttribute("prefix", prefix);
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get suffix() {
      return this.hasAttribute("suffix") ? this.getAttribute("suffix") : "";
    }
    set suffix(suffix) {
      this.setAttribute("suffix", suffix);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get required() {
      return this.hasAttribute("required");
    }
    set required(required) {
      required ? this.setAttribute("required", "") : this.removeAttribute("required");
    }

    // @info
    //   Whether this input has "mixed" state.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    // @type
    //   string?
    // @default
    //   null
    // @attribute
    get error() {
      return this.getAttribute("error");
    }
    set error(error) {
      error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._isDragging = false;
      this._isChangeStart = false;
      this._isArrowKeyDown = false;
      this._isBackspaceKeyDown = false;
      this._isStepperButtonDown = false;

      this._maybeDispatchChangeEndEvent = debounce(this._maybeDispatchChangeEndEvent, 500, this);

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$i.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this._shadowRoot.addEventListener("pointerdown", (event) => this._onShadowRootPointerDown(event));
      this._shadowRoot.addEventListener("wheel", (event) => this._onWheel(event));
      this["#editor"].addEventListener("paste", (event) => this._onPaste(event));
      this["#editor"].addEventListener("input", (event) => this._onEditorInput(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
      this.addEventListener("keyup", (event) => this._onKeyUp(event));
      this.addEventListener("keypress", (event) => this._onKeyPress(event));
      this.addEventListener("incrementstart", (event) => this._onStepperIncrementStart(event));
      this.addEventListener("decrementstart", (event) => this._onStepperDecrementStart(event));
      this.addEventListener("focusin", (event) => this._onFocusIn(event));
      this.addEventListener("focusout", (event) => this._onFocusOut(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();

      this._update();
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "min") {
        this._onMinAttributeChange();
      }
      else if (name === "max") {
        this._onMaxAttributeChange();
      }
      else if (name === "prefix") {
        this._onPrefixAttributeChange();
      }
      else if (name === "suffix") {
        this._onSuffixAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    // @info
    //   Override this method to validate the input value manually.
    // @type
    //   () => void
    validate() {
      if (this.value < this.min) {
        this.error = "Value is too low";
      }
      else if (this.value > this.max) {
        this.error = "Value is too high";
      }
      else if (this.required && this.value === null) {
        this.error = "This field is required";
      }
      else {
        this.error = null;
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _increment(large = false) {
      let oldValue = this.value;
      let newValue = this.value;

      if (large) {
        newValue += this.step * 10;
      }
      else {
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

    _decrement(large = false) {
      let oldValue = this.value;
      let newValue = this.value;

      if (large) {
        newValue -= this.step * 10;
      }
      else {
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

    _maybeDispatchChangeStartEvent() {
      if (!this._isChangeStart) {
        this._isChangeStart = true;
        this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));
      }
    }

    _maybeDispatchChangeEndEvent() {
      if (this._isChangeStart && !this._isArrowKeyDown && !this._isBackspaceKeyDown && !this._isStepperButtonDown) {
        this._isChangeStart = false;
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
      }
    }

    _commitEditorChanges() {
      let editorValue = this["#editor"].textContent.trim() === "" ? null : parseFloat(this["#editor"].textContent);
      editorValue = normalize(editorValue, this.min, this.max);

      if (editorValue !== this.value) {
        this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));
        this.value = editorValue;
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this.validate();

      this._updateEditorTextContent();
      this._updateState();
      this._updateStepper();
    }

    _updateEditorTextContent() {
      if (this.hasAttribute("value")) {
        this["#editor"].textContent = this.getAttribute("value").trim();
      }
      else {
        this["#editor"].textContent = "";
      }
    }

    _updateState() {
      if (this.value === null) {
        this.setAttribute("empty", "");
      }
      else {
        this.removeAttribute("empty");
      }
    }

    _updateStepper() {
      let stepper = this.querySelector("x-stepper");

      if (stepper) {
        let canDecrement = (this.value > this.min);
        let canIncrement = (this.value < this.max);

        if (canIncrement === true && canDecrement === true) {
          stepper.removeAttribute("disabled");
        }
        else if (canIncrement === false && canDecrement === false) {
          stepper.setAttribute("disabled", "");
        }
        else if (canIncrement === false) {
          stepper.setAttribute("disabled", "increment");
        }
        else if (canDecrement === false) {
          stepper.setAttribute("disabled", "decrement");
        }
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "input");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$6] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$6] > 0) ? this[$oldTabIndex$6] : 0;
        }

        delete this[$oldTabIndex$6];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      this._update();
    }

    _onMinAttributeChange() {
      this._updateStepper();
    }

    _onMaxAttributeChange() {
      this._updateStepper();
    }

    _onPrefixAttributeChange() {
      this["#editor"].setAttribute("data-prefix", this.prefix);
    }

    _onSuffixAttributeChange() {
      this["#editor"].setAttribute("data-suffix", this.suffix);
    }

    _onDisabledAttributeChange() {
      this["#editor"].disabled = this.disabled;
      this._updateAccessabilityAttributes();
    }

    _onFocusIn() {
      document.execCommand("selectAll");
      this.dispatchEvent(new CustomEvent("textinputmodestart", {bubbles: true, composed: true}));
    }

    _onFocusOut() {
      this._shadowRoot.getSelection().collapse(this["#main"]);
      this._commitEditorChanges();
      this.dispatchEvent(new CustomEvent("textinputmodeend", {bubbles: true, composed: true}));
    }

    _onEditorInput() {
      this.validate();
      this._updateState();
      this._updateStepper();
    }

    _onWheel(event) {
      if (this.matches(":focus")) {
        event.preventDefault();
        this._maybeDispatchChangeStartEvent();

        if (event.wheelDeltaX > 0 || event.wheelDeltaY > 0) {
          this._increment(event.shiftKey);
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
        else {
          this._decrement(event.shiftKey);
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }

        this._maybeDispatchChangeEndEvent();
      }
    }

    _onClick(event) {
      event.preventDefault();
    }

    _onPointerDown(pointerDownEvent) {
      if (pointerDownEvent.target.localName === "x-stepper") {
        // Don't focus the input when user clicks stepper
        pointerDownEvent.preventDefault();
      }
    }

    _onShadowRootPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1 || pointerDownEvent.isPrimary === false) {
        pointerDownEvent.preventDefault();
        return;
      }

      if (pointerDownEvent.target === this["#editor"]) {
        if (this["#editor"].matches(":focus") === false) {
          pointerDownEvent.preventDefault();

          let initialValue = this.value;
          let cachedClientX = null;
          let pointerMoveListener, lostPointerCaptureListener;

          this.style.cursor = "col-resize";
          this["#editor"].setPointerCapture(pointerDownEvent.pointerId);

          this["#editor"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
            if (pointerMoveEvent.clientX === cachedClientX || pointerMoveEvent.isPrimary === false) {
              return;
            }

            if (this._isDragging === false) {
              this._isDragging = true;
              this._isChangeStart = true;
              this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));
            }

            cachedClientX = pointerMoveEvent.clientX;

            let dragOffset = pointerMoveEvent.clientX - pointerDownEvent.clientX;

            let value = initialValue + (dragOffset * this.step);
            value = normalize(value, this.min, this.max, getPrecision(this.step));
            this.value = value;
            this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
          });

          this["#editor"].addEventListener("lostpointercapture",  lostPointerCaptureListener = () => {
            this["#editor"].removeEventListener("pointermove", pointerMoveListener);
            this["#editor"].removeEventListener("lostpointercapture", lostPointerCaptureListener);

            this.style.cursor = null;

            if (this._isDragging === true) {
              this._isDragging = false;
              this._isChangeStart = false;
              this.dispatchEvent(new CustomEvent("changeend", {detail: this.value !== initialValue, bubbles: true}));
            }
            else {
              this["#editor"].focus();
              document.execCommand("selectAll");
            }
          });
        }
      }
    }

    _onStepperIncrementStart(event) {
      let incrementListener, incrementEndListener;

      this._isStepperButtonDown = true;

      this.addEventListener("increment", incrementListener = (event) => {
        this._maybeDispatchChangeStartEvent();
        this._increment(event.detail.shiftKey);
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        this._maybeDispatchChangeEndEvent();
        this._update();
      });

      this.addEventListener("incrementend", incrementEndListener = (event) => {
        this._isStepperButtonDown = false;
        this.removeEventListener("increment", incrementListener);
        this.removeEventListener("incrementend", incrementEndListener);
      });
    }

    _onStepperDecrementStart(event) {
      let decrementListener, decrementEndListener;

      this._isStepperButtonDown = true;

      this.addEventListener("decrement", decrementListener = (event) => {
        this._maybeDispatchChangeStartEvent();
        this._decrement(event.detail.shiftKey);
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        this._maybeDispatchChangeEndEvent();

        this._update();
      });

      this.addEventListener("decrementend", decrementEndListener = (event) => {
        this._isStepperButtonDown = false;
        this.removeEventListener("decrement", decrementListener);
        this.removeEventListener("decrementend", decrementEndListener);
      });
    }

    _onKeyDown(event) {
      if (event.code === "ArrowDown") {
        event.preventDefault();

        this._isArrowKeyDown = true;
        this._maybeDispatchChangeStartEvent();
        this._decrement(event.shiftKey);
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        this._maybeDispatchChangeEndEvent();

        this._update();
      }

      else if (event.code === "ArrowUp") {
        event.preventDefault();

        this._isArrowKeyDown = true;
        this._maybeDispatchChangeStartEvent();
        this._increment(event.shiftKey);
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        this._maybeDispatchChangeEndEvent();

        this._update();
      }

      else if (event.code === "Backspace") {
        this._isBackspaceKeyDown = true;
      }

      else if (event.code === "Enter") {
        this._commitEditorChanges();
        document.execCommand("selectAll");
      }
    }

    _onKeyUp(event) {
      if (event.code === "ArrowDown") {
        this._isArrowKeyDown = false;
        this._maybeDispatchChangeEndEvent();
      }

      else if (event.code === "ArrowUp") {
        this._isArrowKeyDown = false;
        this._maybeDispatchChangeEndEvent();
      }

      else if (event.code === "Backspace") {
        this._isBackspaceKeyDown = false;
      }
    }

    _onKeyPress(event) {
      if (numericKeys.includes(event.key) === false) {
        event.preventDefault();
      }
    }

    async _onPaste(event) {
      // Allow only for pasting numeric text
      event.preventDefault();
      let content = event.clipboardData.getData("text/plain").trim();

      if (isNumeric(content)) {
        // @bugfix: https://github.com/nwjs/nw.js/issues/3403
        await sleep(1);

        document.execCommand("insertText", false, content);
      }
    }
  }

  customElements.define("x-numberinput", XNumberInputElement);

  let shadowTemplate$j = html`
  <template>
    <style>
      :host {
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        min-height: 30px;
        z-index: 1001;
        box-sizing: border-box;
        background: white;
        -webkit-app-region: no-drag;
        --orientation: vertical; /* horizontal, vertical */
        --align: bottom;
        --arrow-size: 20px;
        --open-transition: 900 transform cubic-bezier(0.4, 0, 0.2, 1);
        --close-transition: 200 opacity cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host(:focus) {
        outline: none;
      }
      :host([opened]),
      :host([animating]) {
        display: flex;
      }

      #arrow {
        position: fixed;
        box-sizing: border-box;
        content: "";
      }
      #arrow[data-align="top"],
      #arrow[data-align="bottom"] {
        width: var(--arrow-size);
        height: calc(var(--arrow-size) * 0.6);
        transform: translate(-50%, 0);
      }
      #arrow[data-align="left"],
      #arrow[data-align="right"] {
        width: calc(var(--arrow-size) * 0.6);
        height: var(--arrow-size);
        transform: translate(0, -50%);
      }

      #arrow path {
        fill: pink;
        vector-effect: non-scaling-stroke;
        stroke-width: 1;
      }
    </style>

    <svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path id="arrow-path"></path>
    </svg>

    <slot></slot>
  </template>
`;

  // @events
  //   open
  //   close
  class XPopoverElement extends HTMLElement {
    static get observedAttributes() {
      return ["modal"];
    }

    // @type
    //   boolean
    // @readonly
    // @attribute
    get opened() {
      return this.hasAttribute("opened");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get modal() {
      return this.hasAttribute("modal");
    }
    set modal(modal) {
      modal ? this.setAttribute("modal", "") : this.removeAttribute("modal");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$j.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#backdrop"] = createElement("x-backdrop");
      this["#backdrop"].style.background =  "rgba(0, 0, 0, 0)";
      this["#backdrop"].ownerElement = this;
    }

    connectedCallback() {
      this.tabIndex = -1;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "modal") {
        this._onModalAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @info
    //   Open the popover next to the given element.
    //   Returns a promise that is resolved when the popover finishes animating.
    // @type
    //   (XButtonElement, string) => Promise
    open(button) {
      return new Promise( async (resolve) => {
        let computedStyle = getComputedStyle(this);

        let align = computedStyle.getPropertyValue("--align").trim();
        let marginTop = parseFloat(computedStyle.marginTop);
        let marginBottom = parseFloat(computedStyle.marginBottom);
        let marginLeft = parseFloat(computedStyle.marginLeft);
        let marginRight = parseFloat(computedStyle.marginRight);

        let extraLeft = 0;         // Extra offset needed when popover has fixed-positioned ancestor(s)
        let extraTop = 0;          // Extra offset needed when popover has fixed-positioned ancestor(s)
        let windowWhitespace = 8; // Minimal whitespace between popover and window bounds
        let arrowWhitespace = 2;   // Minimal whitespace between popover and arrow

        this.style.left = "0px";
        this.style.top = "0px";
        this.style.width = null;
        this.style.height = null;

        this.setAttribute("opened", "");

        if (this.modal) {
          this["#backdrop"].show(false);
        }

        // Determine extraLeft and extraTop which represent the extra offset when the popover is inside another
        // fixed-positioned element.
        {
          let popoverBounds = roundRect(this.getBoundingClientRect());

          if (popoverBounds.top !== 0 || popoverBounds.left !== 0) {
            extraLeft = -popoverBounds.left;
            extraTop = -popoverBounds.top;
          }
        }

        // Make the arrow look consistentaly with the popover
        {
          let {backgroundColor, borderColor, borderWidth} = getComputedStyle(this);

          this["#arrow"].setAttribute("data-align", align);
          this["#arrow-path"].style.fill = backgroundColor;
          this["#arrow-path"].style.stroke = borderColor;
          this["#arrow-path"].style.strokeWidth = borderWidth + "px";
        }

        if (align === "bottom") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());
          let arrowBounds = roundRect(this["#arrow"].getBoundingClientRect());
          let borderWidth = parseFloat(getComputedStyle(this).borderWidth);

          // Place the popover below the button
          {
            this.style.top = (buttonBounds.bottom + arrowBounds.height + arrowWhitespace + extraTop) + "px";
            this["#arrow"].style.top = (buttonBounds.bottom + arrowWhitespace + borderWidth + extraTop) + "px";
            this["#arrow-path"].style.d = `path("M 0 100, L 50 0, L 100 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows bottom client bound, reduce its height (respecting min-height)
          if (popoverBounds.bottom + windowWhitespace > window.innerHeight) {
            let reducedHeight = window.innerHeight - popoverBounds.top - windowWhitespace;
            let minHeight = parseFloat(getComputedStyle(this).minHeight);

            if (reducedHeight >= minHeight) {
              this.style.height = reducedHeight + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popover still overflows bottom client bound, place it above the button
          if (popoverBounds.bottom + windowWhitespace > window.innerHeight) {
            this.style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - popoverBounds.height + extraTop
            ) + "px";

            this["#arrow"].style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - borderWidth + extraTop
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 50 100, L 100 0")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows top client bound, reduce its height (respecting min-height)
          if (popoverBounds.top - windowWhitespace < 0) {
            let reducedHeight = buttonBounds.top - arrowWhitespace - arrowBounds.height - windowWhitespace;
            let minHeight = parseFloat(getComputedStyle(this).minHeight);

            if (reducedHeight >= minHeight) {
              this.style.top = (windowWhitespace + extraTop) + "px";
              this.style.height = reducedHeight + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popoever still overflows top client bound, place it back below the button
          if (popoverBounds.top - windowWhitespace < 0) {
            this.style.top = (buttonBounds.bottom + arrowBounds.height + arrowWhitespace + extraTop) + "px";
            this["#arrow"].style.top = (buttonBounds.bottom + arrowWhitespace + borderWidth + extraTop) + "px";
            this["#arrow-path"].style.d = `path("M 0 100, L 50 0, L 100 100")`;
          }
        }

        else if (align === "top") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());
          let arrowBounds = roundRect(this["#arrow"].getBoundingClientRect());
          let borderWidth = parseFloat(getComputedStyle(this).borderWidth);

          // Place the popover above the button
          {
            this.style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - popoverBounds.height + extraTop
            ) + "px";

            this["#arrow"].style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - borderWidth + extraTop
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 50 100, L 100 0")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows top client bound, reduce its height (respecting min-height)
          if (popoverBounds.top - windowWhitespace < 0) {
            let reducedHeight = buttonBounds.top - arrowWhitespace - arrowBounds.height - windowWhitespace;
            let minHeight = parseFloat(getComputedStyle(this).minHeight);

            if (reducedHeight >= minHeight) {
              this.style.top = (windowWhitespace + extraTop) + "px";
              this.style.height = reducedHeight + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popoever still overflows top client bound, place it below the button
          if (popoverBounds.top - windowWhitespace < 0) {
            this.style.top = (buttonBounds.bottom + arrowBounds.height + arrowWhitespace + extraTop) + "px";
            this["#arrow"].style.top = (buttonBounds.bottom + arrowWhitespace + borderWidth + extraTop) + "px";
            this["#arrow-path"].style.d = `path("M 0 100, L 50 0, L 100 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows bottom client bound, reduce its height (respecting min-height)
          if (popoverBounds.bottom + windowWhitespace > window.innerHeight) {
            let reducedHeight = window.innerHeight - popoverBounds.top - windowWhitespace;
            let minHeight = parseFloat(getComputedStyle(this).minHeight);

            if (reducedHeight >= minHeight) {
              this.style.height = reducedHeight + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popover still overflows bottom client bound, move it back above the button
          if (popoverBounds.bottom + windowWhitespace > window.innerHeight) {
            this.style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - popoverBounds.height + extraTop
            ) + "px";

            this["#arrow"].style.top = (
              buttonBounds.top - arrowWhitespace - arrowBounds.height - borderWidth + extraTop
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 50 100, L 100 0")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }
        }

        else if (align === "left") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());
          let arrowBounds = roundRect(this["#arrow"].getBoundingClientRect());
          let borderWidth = parseFloat(getComputedStyle(this).borderWidth);

          // Place the popover on the left side of the button
          {
            this.style.left = (
              buttonBounds.left - arrowWhitespace - arrowBounds.width - popoverBounds.width + extraLeft
            ) + "px";

            this["#arrow"].style.left = (
              buttonBounds.left - arrowBounds.width - arrowWhitespace - borderWidth + extraLeft
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 100 50, L 00 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows left client bound, reduce its width (respecting min-width)
          if (popoverBounds.left - windowWhitespace < 0) {
            let reducedWidth = buttonBounds.left - arrowWhitespace - arrowBounds.height - windowWhitespace;
            let minWidth = parseFloat(getComputedStyle(this).minWidth);

            if (reducedWidth >= minWidth) {
              this.style.left = (windowWhitespace + extraLeft) + "px";
              this.style.width = reducedWidth + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popoever still overflows left client bound, place it on the right side of the button
          if (popoverBounds.left - windowWhitespace < 0) {
            this.style.left = (buttonBounds.right + arrowBounds.height + arrowWhitespace + extraLeft) + "px";
            this["#arrow"].style.top = (buttonBounds.right + arrowWhitespace + borderWidth + extraLeft) + "px";
            this["#arrow-path"].style.d = `path("M 0 100, L 50 0, L 100 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows right client bound, reduce its width (respecting min-width)
          if (popoverBounds.right + windowWhitespace > window.innerWidth) {
            let reducedWidth = window.innerWidth - popoverBounds.left - windowWhitespace;
            let minWidth = parseFloat(getComputedStyle(this).minWidth);

            if (reducedWidth >= minWidth) {
              this.style.width = reducedWidth + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popover still overflows right client bound, move it back to the left side of the button
          if (popoverBounds.right + windowWhitespace > window.innerWidth) {
            this.style.left = (
              buttonBounds.left - arrowWhitespace - arrowBounds.width - popoverBounds.width + extraLeft
            ) + "px";

            this["#arrow"].style.elft = (
              buttonBounds.left - arrowWhitespace - arrowBounds.width - borderWidth + extraLeft
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 100 50, L 00 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }
        }

        else if (align === "right") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());
          let arrowBounds = roundRect(this["#arrow"].getBoundingClientRect());
          let borderWidth = parseFloat(getComputedStyle(this).borderWidth);

          // Place the popover on the right side of the button
          {
            this.style.left = (buttonBounds.right + arrowBounds.width + arrowWhitespace + extraLeft) + "px";
            this["#arrow"].style.left = (buttonBounds.right + arrowWhitespace + borderWidth + extraLeft) + "px";
            this["#arrow-path"].style.d = `path("M 100 0, L 0 50, L 100 100")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows right client bound, reduce its width (respecting min-width)
          if (popoverBounds.right + windowWhitespace > window.innerWidth) {
            let reducedWidth = window.innerWidth - popoverBounds.left - windowWhitespace;
            let minWidth = parseFloat(getComputedStyle(this).minWidth);

            if (reducedWidth >= minWidth) {
              this.style.width = reducedWidth + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popover still overflows right client bound, place it on the left side of the button
          if (popoverBounds.right + windowWhitespace > window.innerWidth) {
            this.style.left = (
              buttonBounds.left - arrowWhitespace - arrowBounds.width - popoverBounds.width + extraLeft
            ) + "px";

            this["#arrow"].style.left = (
              buttonBounds.left - arrowWhitespace - arrowBounds.width - borderWidth + extraLeft
            ) + "px";

            this["#arrow-path"].style.d = `path("M 0 0, L 50 100, L 100 0")`;
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows left client bound, reduce its width (respecting min-width)
          if (popoverBounds.left - windowWhitespace < 0) {
            let reducedWidth = buttonBounds.left - arrowWhitespace - arrowBounds.width - windowWhitespace;
            let minWidth = parseFloat(getComputedStyle(this).minWidth);

            if (reducedWidth >= minWidth) {
              this.style.left = (windowWhitespace + extraLeft) + "px";
              this.style.width = reducedWidth + "px";
              popoverBounds = roundRect(this.getBoundingClientRect());
            }
          }

          // If popoever still overflows left client bound, place it back on the right side of the button
          if (popoverBounds.left - windowWhitespace < 0) {
            this.style.left = (buttonBounds.right + arrowBounds.width + arrowWhitespace + extraLeft) + "px";
            this["#arrow"].style.left = (buttonBounds.right + arrowWhitespace + borderWidth + extraLeft) + "px";
            this["#arrow-path"].style.d = `path("M 100 0, L 0 50, L 100 100")`;
          }
        }

        if (align === "bottom" || align === "top") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());
          let arrowBounds = roundRect(this["#arrow"].getBoundingClientRect());

          // Place the popover along the same X-axis as the button
          {
            this.style.left = (buttonBounds.left + buttonBounds.width/2 - popoverBounds.width/2 + extraLeft) + "px";
            this["#arrow"].style.left = (buttonBounds.left + buttonBounds.width/2 + extraLeft) + "px";

            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows left client bound, move it right
          if (popoverBounds.left - windowWhitespace < 0) {
            this.style.left = (windowWhitespace + extraLeft) + "px";
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows right client bound, move it left
          if (popoverBounds.right + windowWhitespace > window.innerWidth) {
            this.style.left = (window.innerWidth - windowWhitespace - popoverBounds.width + extraLeft) + "px";
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover still overflows left client bound, reduce its width
          if (popoverBounds.left < windowWhitespace) {
            this.style.left = (windowWhitespace + extraLeft) + "px";
            this.style.width = (window.innerWidth - windowWhitespace - windowWhitespace) + "px";
          }
        }

        else if (align === "left" || align === "right") {
          let buttonBounds = roundRect(button.getBoundingClientRect());
          let popoverBounds = roundRect(this.getBoundingClientRect());

          // Place the popover along the same Y-axis as the button
          {
            this.style.top = (buttonBounds.top + buttonBounds.height/2 - popoverBounds.height/2 + extraTop) + "px";
            this["#arrow"].style.top = (buttonBounds.top + buttonBounds.height/2 + extraTop + marginTop) + "px";
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows top client bound, move it down
          if (popoverBounds.top - windowWhitespace < 0) {
            this.style.top = (windowWhitespace + extraTop + marginTop) + "px";
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover overflows bottom client bound, move it up
          if (popoverBounds.bottom + windowWhitespace > window.innerHeight) {
            let overflowBottom = popoverBounds.bottom + windowWhitespace - window.innerHeight;
            this.style.top = (popoverBounds.top - overflowBottom + extraTop) + "px";
            popoverBounds = roundRect(this.getBoundingClientRect());
          }

          // If popover still overflows top client bound, reduce its size
          if (popoverBounds.top < windowWhitespace) {
            this.style.top = (windowWhitespace + extraTop) + "px";
            this.style.height = (window.innerHeight - windowWhitespace - windowWhitespace) + "px";
          }
        }

        // Animate the popover
        {
          let transition = getComputedStyle(this).getPropertyValue("--open-transition");
          let [property, duration, easing] = this._parseTransistion(transition);

          if (property === "transform") {
            await this.animate(
              {
                transform: ["scale(1, 0)", "scale(1, 1)"],
                transformOrigin: ["0 0", "0 0"]
              },
              { duration, easing }
            ).finished;
          }
        }

        this.dispatchEvent(new CustomEvent("open", {bubbles: true, detail: this}));
        resolve();
      });
    }

    // @info
    //   Close the popover.
    //   Returns a promise that is resolved when the popover finishes animating.
    // @type
    //   (boolean) => Promise
    close() {
      return new Promise(async (resolve) => {
        if (this.opened) {
          this.removeAttribute("opened");
          this.setAttribute("animating", "");
          this["#backdrop"].hide();
          this.dispatchEvent(new CustomEvent("close", {bubbles: true, detail: this}));

          let transition = getComputedStyle(this).getPropertyValue("--close-transition");
          let [property, duration, easing] = this._parseTransistion(transition);

          if (property === "opacity") {
            await this.animate({ opacity: ["1", "0"] }, { duration, easing }).finished;
          }

          this.removeAttribute("animating");
        }

        resolve();
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onModalAttributeChange() {
      if (this.modal && this.opened) {
        this["#backdrop"].show();
      }
      else {
        this["#backdrop"].hide();
      }
    }

    // @info
    //   Parse the value of CSS transition property.
    // @type
    //   (string) => [string, number, string]
    _parseTransistion(string) {
      let [rawDuration, property, ...rest] = string.trim().split(" ");
      let duration = parseFloat(rawDuration);
      let easing = rest.join(" ");
      return [property, duration, easing];
    }
  }

  customElements.define("x-popover", XPopoverElement);

  let shadowTemplate$k = html`
  <template>
    <style>
      :host {
        display: block;
        box-sizing: border-box;
        height: 4px;
        width: 100%;
        position: relative;
        contain: strict;
        overflow: hidden;
        background: #acece6;
        cursor: default;
        --bar-background: #3B99FB;
        --bar-box-shadow: 0px 0px 0px 1px #3385DB;
      }
      :host([hidden]) {
        display: none;
      }

      #indeterminate-bars {
        width: 100%;
        height: 100%;
      }

      #determinate-bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0%;
        height: 100%;
        background: var(--bar-background);
        box-shadow: var(--bar-box-shadow);
        transition: width 0.4s ease-in-out;
        will-change: left, right;
      }

      #primary-indeterminate-bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        background: var(--bar-background);
        will-change: left, right;
      }

      #secondary-indeterminate-bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        background: var(--bar-background);
        will-change: left, right;
      }
    </style>

    <div id="determinate-bar"></div>

    <div id="indeterminate-bars">
      <div id="primary-indeterminate-bar"></div>
      <div id="secondary-indeterminate-bar"></div>
    </div>
  </template>
`;

  class XProgressbarElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "max", "disabled"];
    }

    // @info
    //   Current progress, in procentages.
    // @type
    //   number?
    // @default
    //   null
    // @attribute
    get value() {
      return this.hasAttribute("value") ? parseFloat(this.getAttribute("value")) : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @type
    //   number?
    // @default
    //   null
    // @attribute
    get max() {
      return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : 1;
    }
    set max(max) {
      this.setAttribute("max", max);
    }

    // @info
    //   Whether this button is disabled.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$k.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._update();
      }
      else if (name === "disabled") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      // Determinate bar
      {
        // Hide
        if (this.value === null || this.value === -1 || this.disabled) {
          this["#determinate-bar"].style.width = "0%";
        }
        // Show
        else {
          this["#determinate-bar"].style.width = ((this.value / this.max) * 100) + "%";
        }
      }

      // Indeterminate bars
      {
        // Hide
        if ((this.value !== null && this.value !== -1) || this.disabled) {
          if (this._indeterminateAnimations) {
            for (let animation of this._indeterminateAnimations) {
              animation.cancel();
            }

            this._indeterminateAnimations = null;
          }
        }
        // Show
        else {
          if (!this._indeterminateAnimations) {
            this._indeterminateAnimations = [
              this["#primary-indeterminate-bar"].animate(
                [
                  { left: "-35%", right: "100%", offset: 0.0 },
                  { left: "100%", right: "-90%", offset: 0.6 },
                  { left: "100%", right: "-90%", offset: 1.0 }
                ],
                {
                  duration: 2000,
                  easing: "ease-in-out",
                  iterations: Infinity
                }
              ),
              this["#secondary-indeterminate-bar"].animate(
                [
                  { left: "-100%", right: "100%", offset: 0.0 },
                  { left:  "110%", right: "-30%", offset: 0.8 },
                  { left:  "110%", right: "-30%", offset: 1.0 }
                ],
                {
                  duration: 2000,
                  delay: 1000,
                  easing: "ease-in-out",
                  iterations: Infinity
                }
              )
            ];
          }
        }
      }
    }
  }

  customElements.define("x-progressbar", XProgressbarElement);

  let $oldTabIndex$7 = Symbol();

  let shadowTemplate$l = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        border: 3px solid black;
        width: 20px;
        height: 20px;
        border-radius: 99px;
        --dot-color: black;
        --dot-transform: scale(0);
        --dot-box-shadow: none;
      }
      :host([toggled]) {
        --dot-transform: scale(0.6);
      }
      :host(:focus) {
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
      :host([hidden]) {
        display: none;
      }

      #main {
        border-radius: 99px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #dot {
        width: 100%;
        height: 100%;
        background: var(--dot-color);
        border-radius: 99px;
        box-shadow: var(--dot-box-shadow);
        transform: var(--dot-transform);
        transition: all 0.15s ease-in-out;
      }
      :host([mixed][toggled]) #dot {
        height: 33%;
        border-radius: 0;
      }
    </style>

    <main id="main">
      <div id="dot"></div>
    </main>
  </template>
`;

  // @events
  //   toggle
  class XRadioElement extends HTMLElement {
    static get observedAttributes() {
      return ["toggled", "disabled"];
    }

    // @info
    //   Values associated with this widget.
    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : null;
    }
    set value(value) {
      value === null ? this.removeAttribute("value") : this.setAttribute("value", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get toggled() {
      return this.hasAttribute("toggled");
    }
    set toggled(toggled) {
      toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$l.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();
    }

    attributeChangedCallback(name) {
      if (name === "toggled") {
        this._onToggledAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "radio");
      this.setAttribute("aria-checked", this.toggled);
      this.setAttribute("aria-disabled", this.disabled);

      if (!this.closest("x-radios")) {
        if (this.disabled) {
          this[$oldTabIndex$7] = (this.tabIndex > 0 ? this.tabIndex : 0);
          this.tabIndex = -1;
        }
        else {
          if (this.tabIndex < 0) {
            this.tabIndex = (this[$oldTabIndex$7] > 0) ? this[$oldTabIndex$7] : 0;
          }

          delete this[$oldTabIndex$7];
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onToggledAttributeChange() {
      this.setAttribute("aria-checked", this.toggled);
    }

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onClick(event) {
      if (!this.closest("x-radios")) {
        if (this.toggled && this.mixed) {
          this.mixed = false;
        }
        else {
          this.mixed = false;
          this.toggled = !this.toggled;
        }

        this.dispatchEvent(new CustomEvent("toggle", {bubbles: true}));
      }
    }

    _onPointerDown(event) {
      // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
      if (this.matches(":focus") === false) {
        event.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.click();
      }
    }
  }
  customElements.define("x-radio", XRadioElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa
  // @doc
  //   https://www.youtube.com/watch?v=uCIC2LNt0bk

  class XRadiosElement extends HTMLElement {
    // @type
    //   string?
    // @default
    //   null
    get value() {
      let radio = this.querySelector(`x-radio[toggled]`);
      return radio ? radio.value : null;
    }
    set value(value) {
      for (let radio of this.querySelectorAll("x-radio")) {
        radio.toggled = (radio.value === value && value !== null);
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.innerHTML = `<slot></slot>`;

      this.addEventListener("click", (event) => this._onClick(event), true);
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      this.setAttribute("role", "radiogroup");

      let radios = [...this.querySelectorAll("x-radio")].filter(radio => radio.closest("x-radios") === this);
      let defaultRadio = radios.find($0 => $0.toggled && !$0.disabled) || radios.find($0 => !$0.disabled);

      for (let radio of radios) {
        radio.setAttribute("tabindex", radio === defaultRadio ? "0 ": "-1");
        radio.setAttribute("aria-checked", radio === defaultRadio);
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onClick(event) {
      let clickedRadio = event.target.localName === "x-radio" ? event.target : null;

      if (clickedRadio && !clickedRadio.toggled && !clickedRadio.disabled && event.button === 0) {
        let radios = [...this.querySelectorAll("x-radio")];
        let otherRadios = radios.filter(radio => radio.closest("x-radios") === this && radio !== clickedRadio);

        if (clickedRadio.toggled === false || clickedRadio.mixed === true) {
          clickedRadio.toggled = true;
          clickedRadio.mixed = false;
          clickedRadio.tabIndex = 0;

          for (let radio of otherRadios) {
            radio.toggled = false;
            radio.tabIndex = -1;
          }

          this.dispatchEvent(new CustomEvent("toggle", {bubbles: true, detail: clickedRadio}));
        }
      }
    }

    _onKeyDown(event) {
      let {key} = event;

      if (key === "ArrowDown" || key === "ArrowRight") {
        let radios = [...this.querySelectorAll("x-radio")];
        let contextRadios = radios.filter($0 => $0.disabled === false && $0.closest("x-radios") === this);
        let focusedRadio = radios.find(radio => radio.matches(":focus"));

        if (focusedRadio) {
          let focusedRadioIndex = contextRadios.indexOf(focusedRadio);
          let nextRadio = contextRadios.length > 1 ? contextRadios[focusedRadioIndex+1] || contextRadios[0] : null;

          if (nextRadio) {
            event.preventDefault();

            nextRadio.focus();
            nextRadio.tabIndex = 0;
            focusedRadio.tabIndex = -1;
          }
        }
      }

      else if (key === "ArrowUp" || key === "ArrowLeft") {
        let radios = [...this.querySelectorAll("x-radio")];
        let contextRadios = radios.filter($0 => $0.disabled === false && $0.closest("x-radios") === this);
        let focusedRadio = radios.find(radio => radio.matches(":focus"));

        if (focusedRadio) {
          let focusedRadioIndex = contextRadios.indexOf(focusedRadio);
          let lastRadio = contextRadios[contextRadios.length-1];
          let prevRadio = contextRadios.length > 1 ? contextRadios[focusedRadioIndex-1] || lastRadio : null;

          if (prevRadio) {
            event.preventDefault();

            prevRadio.focus();
            prevRadio.tabIndex = 0;
            focusedRadio.tabIndex = -1;
          }
        }
      }
    }
  }

  customElements.define("x-radios", XRadiosElement);

  let shadowHTML$2 = `
  <style>
    :host {
      display: block;
      width: 100%;
      user-select: none;
    }
    :host([hidden]) {
      display: none;
    }

    /**
     * Hue slider
     */

    #hue-slider {
      width: 100%;
      height: 28px;
      padding: 0 calc(var(--marker-width) / 2);
      margin-bottom: 14px;
      box-sizing: border-box;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
      background: red;
    }

    #hue-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      background: linear-gradient(to right,
        rgba(255, 0, 0, 1),
        rgba(255, 255, 0, 1),
        rgba(0, 255, 0, 1),
        rgba(0, 255, 255, 1),
        rgba(0, 0, 255, 1),
        rgba(255, 0, 255, 1),
        rgba(255, 0, 0, 1)
      );
    }

    #hue-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }

    /**
     * Saturation-lightness slider
     */

    #satlight-slider {
      width: 100%;
      height: 174px;
      border-radius: 2px;
      position: relative;
      touch-action: pinch-zoom;
    }

    #satlight-marker {
      position: absolute;
      top: 0%;
      left: 0%;
      width: var(--marker-size);
      height: var(--marker-size);
      transform: translate(calc(var(--marker-size) / -2), calc(var(--marker-size) / -2));
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.3);
      border: 3px solid white;
      border-radius: 999px;
      box-shadow: 0 0 3px black;
      --marker-size: 20px;
    }

    /**
     * Alpha slider
     */

    #alpha-slider {
      display: none;
      width: 100%;
      height: 28px;
      margin-top: 14px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border: 1px solid #cecece;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }
    :host([alphaslider]) #alpha-slider {
      display: block;
    }

    #alpha-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #alpha-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }
  </style>

  <x-box vertical>
    <div id="hue-slider">
      <div id="hue-slider-track">
        <div id="hue-slider-marker"></div>
      </div>
    </div>

    <div id="satlight-slider">
      <div id="satlight-marker"></div>
    </div>

    <div id="alpha-slider">
      <div id="alpha-slider-track">
        <div id="alpha-slider-marker"></div>
      </div>
    </div>
  </x-box>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  class XRectColorPickerElement extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    // @type
    //   string
    // @default
    //   "hsla(0, 0%, 100%, 1)"
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      // Note that HSVA color model is used only internally
      this._h = 0;   // Hue (0 ~ 360)
      this._s = 0;   // Saturation (0 ~ 100)
      this._v = 100; // Value (0 ~ 100)
      this._a = 1;   // Alpha (0 ~ 1)

      this._isDraggingHueSliderMarker = false;
      this._isDraggingSatlightMarker = false;
      this._isDraggingAlphaSliderMarker = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.innerHTML = shadowHTML$2;

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#hue-slider"].addEventListener("pointerdown", (event) => this._onHueSliderPointerDown(event));
      this["#satlight-slider"].addEventListener("pointerdown", (event) => this._onSatlightSliderPointerDown(event));
      this["#alpha-slider"].addEventListener("pointerdown", (event) => this._onAlphaSliderPointerDown(event));
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this._updateHueSliderMarker();

      this._updateSatlightSliderMarker();
      this._updateSatlightSliderBackground();

      this._updateAlphaSliderMarker();
      this._updateAlphaSliderBackground();
    }

    _updateHueSliderMarker() {
      this["#hue-slider-marker"].style.left = ((normalize(this._h, 0, 360, 0) / 360) * 100) + "%";
    }

    _updateSatlightSliderMarker() {
      let left = (this._s / 100) * 100;
      let top = 100 - ((this._v / 100) * 100);

      this["#satlight-marker"].style.left = `${left}%`;
      this["#satlight-marker"].style.top = `${top}%`;
    }

    _updateSatlightSliderBackground() {
      let background1 = serializeColor([this._h, 100, 50, 1], "hsla", "hex");
      let background2 = "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,1))";
      let background3 = "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))";
      this["#satlight-slider"].style.background = `${background3}, ${background2}, ${background1}`;
    }

    _updateAlphaSliderMarker() {
      this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
    }

    _updateAlphaSliderBackground() {
      let [r, g, b] = hsvToRgb(this._h, this._s, this._v).map($0 => round($0, 0));
      let backroundA = `url(node_modules/xel/images/checkboard.png) repeat 0 0`;
      let background = `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`;
      this["#alpha-slider"].style.background = background + "," + backroundA;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      if (
        this._isDraggingHueSliderMarker === false &&
        this._isDraggingSatlightMarker === false &&
        this._isDraggingAlphaSliderMarker === false
      ) {
        let [h, s, v, a] = parseColor(this.value, "hsva");

        this._h = h;
        this._s = s;
        this._v = v;
        this._a = a;

        this._update();
      }
    }

    _onSatlightSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let pointerMoveListener, lostPointerCaptureListener;
      let sliderBounds = this["#satlight-slider"].getBoundingClientRect();

      this._isDraggingSatlightMarker = true;
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));
      this["#satlight-slider"].setPointerCapture(pointerDownEvent.pointerId);

      let onPointerMove = (clientX, clientY) => {
        let x = ((clientX - sliderBounds.left) / sliderBounds.width) * 100;
        let y = ((clientY - sliderBounds.top) / sliderBounds.height) * 100;

        x = normalize(x, 0, 100, 2);
        y = normalize(y, 0, 100, 2);

        this._s = x;
        this._v = 100 - y;

        this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));

        this._updateSatlightSliderMarker();
        this._updateSatlightSliderBackground();
        this._updateAlphaSliderBackground();
      };

      onPointerMove(pointerDownEvent.clientX, pointerDownEvent.clientY);

      this["#satlight-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX, pointerMoveEvent.clientY);
      });

      this["#satlight-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = (event) => {
        this["#satlight-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#satlight-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
        this._isDraggingSatlightMarker = false;
      });
    }

    _onHueSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#hue-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingHueSliderMarker = true;
      this["#hue-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let h = ((clientX - trackBounds.x) / trackBounds.width) * 360;
        h = normalize(h, 0, 360, 0);

        if (h !== this._h) {
          this._h = h;
          this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");

          this._updateHueSliderMarker();
          this._updateSatlightSliderBackground();
          this._updateSatlightSliderMarker();
          this._updateAlphaSliderBackground();

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#hue-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#hue-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#hue-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#hue-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingHueSliderMarker = false;
      });
    }

    _onAlphaSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingAlphaSliderMarker = true;
      this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let a = 1 - ((clientX - trackBounds.x) / trackBounds.width);
        a = normalize(a, 0, 1, 2);

        if (a !== this._a) {
          this._a = a;
          this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");
          this._updateAlphaSliderMarker();
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#alpha-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#alpha-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));

        this._isDraggingAlphaSliderMarker = false;
      });
    }
  }
  customElements.define("x-rectcolorpicker", XRectColorPickerElement);

  let windowPadding = 7;
  let $itemChild = Symbol();
  let $oldTabIndex$8 = Symbol();

  let shadowTemplate$m = html`
  <template>
    <style>
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        max-width: 100%;
        box-sizing: border-box;
        outline: none;
        font-size: 15px;
        user-select: none;
        --arrow-width: 13px;
        --arrow-height: 13px;
        --arrow-min-width: 13px;
        --arrow-margin: 0 2px 0 11px;
        --arrow-color: currentColor;
        --arrow-d: path(
          "M 25 41 L 50 16 L 75 41 L 83 34 L 50 1 L 17 34 Z M 17 66 L 50 100 L 83 66 L 75 59 L 50 84 L 25 59 Z"
        );
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }
      :host(:hover) {
        cursor: default;
      }

      #button {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        width: 100%;
        height: 100%;
      }

      :host([mixed]) #button > * {
        opacity: 0.7;
      }

      #button > x-label {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      #button > #arrow-container {
        margin: 0 0 0 auto;
        z-index: 999;
      }

      #button > #arrow-container #arrow {
        display: flex;
        width: var(--arrow-width);
        height: var(--arrow-height);
        min-width: var(--arrow-min-width);
        margin: var(--arrow-margin);
        color: var(--arrow-color);
        d: var(--arrow-d);
      }

      #button > #arrow-container #arrow path {
        fill: currentColor;
        d: inherit;
      }
    </style>

    <div id="button">
      <div id="arrow-container">
        <svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path></path>
        </svg>
      </div>
    </div>

    <slot></slot>
  </template>
`;

  // @event
  //   change {oldValue: string?, newValue: string?}
  class XSelectElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @type
    //   string?
    // @default
    //   null
    get value() {
      let item = this.querySelector(`x-menuitem[toggled]`);
      return item ? item.value : null;
    }
    set value(value) {
      for (let item of this.querySelectorAll("x-menuitem")) {
        item.toggled = (item.value === value && value !== null);
      }
    }

    // @info
    //   Whether this select has "mixed" state.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._wasFocusedBeforeExpanding = false;
      this._updateButtonTh300 = throttle(this._updateButton, 300, this);

      this._mutationObserver = new MutationObserver((args) => this._onMutation(args));
      this._resizeObserver = new ResizeObserver(() => this._updateButtonChildrenSize());

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$m.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#backdrop"] = createElement("x-backdrop");
      this["#backdrop"].style.opacity = "0";
      this["#backdrop"].ownerElement = this;
      this["#backdrop"].addEventListener("click", (event) => this._onBackdropClick(event));

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("toggle", (event) => this._onMenuItemToggle(event));
      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));

    }

    connectedCallback() {
      this._mutationObserver.observe(this, {childList: true, attributes: true, characterData: true, subtree: true});
      this._resizeObserver.observe(this);

      this._updateButton();
      this._updateAccessabilityAttributes();
    }

    disconnectedCallback() {
      this._mutationObserver.disconnect();
      this._resizeObserver.disconnect();
    }

    attributeChangedCallback(name) {
      if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _expand() {
      if (this._canExpand() === false) {
        return;
      }

      this._wasFocusedBeforeExpanding = this.matches(":focus");

      this["#backdrop"].show(false);

      window.addEventListener("resize", this._resizeListener = () => {
        this._collapse();
      });

      window.addEventListener("blur", this._blurListener = () => {
        {
          this._collapse();
        }
      });

      let menu = this.querySelector(":scope > x-menu");

      // Ensure all items are togglable, there is at most one toggled menu item and all other items are not toggled
      {
        let toggledItem = null;

        for (let item of menu.querySelectorAll("x-menuitem")) {
          item.togglable = true;

          if (item.toggled) {
            if (toggledItem === null) {
              toggledItem = item;
            }
            else {
              item.toggled = false;
            }
          }
        }
      }

      // Open the menu
      {
        let toggledItem = menu.querySelector(`x-menuitem[toggled]`);

        if (toggledItem) {
          let buttonChild = this["#button"].querySelector("x-label") || this["#button"].firstElementChild;
          let itemChild = buttonChild[$itemChild];

          menu.openOverElement(buttonChild, itemChild);
        }
        else {
          let item = menu.querySelector("x-menuitem").firstElementChild;
          menu.openOverElement(this["#button"], item);
        }
      }

      // Increase menu width if it is narrower than the button
      {
        let menuBounds = menu.getBoundingClientRect();
        let buttonBounds = this["#button"].getBoundingClientRect();
        let hostPaddingRight = parseFloat(getComputedStyle(this).paddingRight);

        if (menuBounds.right - hostPaddingRight < buttonBounds.right) {
          menu.style.minWidth = (buttonBounds.right - menuBounds.left + hostPaddingRight) + "px";
        }
      }

      // Reduce menu width if it oveflows the right client bound
      {
        let menuBounds = this.getBoundingClientRect();

        if (menuBounds.right + windowPadding > window.innerWidth) {
          this.style.maxWidth = (window.innerWidth - menuBounds.left - windowPadding) + "px";
        }
      }
    }

    async _collapse(whenTriggerEnd = null) {
      if (this._canCollapse() === false) {
        return;
      }

      let menu = this.querySelector(":scope > x-menu");
      menu.setAttribute("closing", "");
      await whenTriggerEnd;
      this["#backdrop"].hide(false);

      if (this._wasFocusedBeforeExpanding) {
        this.focus();
      }
      else {
        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }

      window.removeEventListener("resize", this._resizeListener);
      window.removeEventListener("blur", this._blurListener);

      await menu.close();
      menu.removeAttribute("closing");
    }

    _canExpand() {
      if (this.disabled) {
        return false;
      }
      else {
        let menu = this.querySelector(":scope > x-menu");
        let item = menu.querySelector("x-menuitem");
        return menu !== null && menu.opened === false && menu.hasAttribute("closing") === false && item !== null;
      }
    }

    _canCollapse() {
      if (this.disabled) {
        return false;
      }
      else {
        let menu = this.querySelector(":scope > x-menu");
        let item = menu.querySelector("x-menuitem");
        return menu !== null && menu.opened === true && menu.hasAttribute("closing") === false;
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateButton() {
      let toggledItem = this.querySelector(`:scope > x-menu x-menuitem[toggled]`);
      this["#button"].innerHTML = "";

      if (toggledItem) {
        for (let itemChild of toggledItem.children) {
          let buttonChild = itemChild.cloneNode(true);
          buttonChild[$itemChild] = itemChild;
          buttonChild.removeAttribute("id");
          buttonChild.removeAttribute("style");
          this["#button"].append(buttonChild);
        }

        this._updateButtonChildrenSize();
      }

      this["#button"].append(this["#arrow-container"]);
    }

    _updateButtonChildrenSize() {
      for (let buttonChild of this["#button"].children) {
        if (buttonChild !== this["#arrow-container"]) {
          let {width, height, margin, padding, border} = getComputedStyle(buttonChild[$itemChild]);

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
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("aria-disabled", this.disabled);

      // Update "tabindex" attribute
      {
        if (this.disabled) {
          this[$oldTabIndex$8] = (this.tabIndex > 0 ? this.tabIndex : 0);
          this.tabIndex = -1;
        }
        else {
          if (this.tabIndex < 0) {
            this.tabIndex = (this[$oldTabIndex$8] > 0) ? this[$oldTabIndex$8] : 0;
          }

          delete this[$oldTabIndex$8];
        }
      }

      // Update "role" attributes
      {
        this.setAttribute("role", "button");
        let menu = this.querySelector(":scope > x-menu");

        if (menu) {
          menu.setAttribute("role", "listbox");

          for (let item of menu.querySelectorAll("x-menuitem")) {
            item.setAttribute("role", "option");
          }
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onMutation(records) {
      for (let record of records) {
        if (record.type === "attributes" && record.target.localName === "x-menuitem" && record.attributeName === "toggled") {
          this._updateButtonTh300();
        }
      }
    }

    _onPointerDown(event) {
      // Don't focus the widget with pointer
      if (!event.target.closest("x-menu") && this.matches(":focus") === false) {
        event.preventDefault();
      }
    }

    _onClick(event) {
      if (event.button !== 0) {
        return;
      }

      if (this._canExpand()) {
        this._expand();
      }
      else if (this._canCollapse()) {
        let clickedItem = event.target.closest("x-menuitem");

        if (clickedItem) {
          let oldValue = this.value;
          let newValue = clickedItem.value;

          for (let item of this.querySelectorAll("x-menuitem")) {
            item.toggled = (item === clickedItem);
          }

          if (oldValue !== newValue || this.mixed) {
            this.mixed = false;
            this.dispatchEvent(new CustomEvent("change", {bubbles: true, detail: {oldValue, newValue}}));
          }

          this._collapse(clickedItem.whenTriggerEnd);
        }
      }
    }

    _onMenuItemToggle(event) {
      // We will toggle the menu items manually
      event.preventDefault();
    }

    _onBackdropClick(event) {
      this._collapse();
    }

    _onKeyDown(event) {
      let menu = this.querySelector(":scope > x-menu");

      if (event.key === "Enter" || event.key === "Space" || event.key === "ArrowUp" || event.key === "ArrowDown") {
        if (this._canExpand()) {
          event.preventDefault();
          this._expand();
        }
      }

      else if (event.key === "Escape") {
        if (this._canCollapse()) {
          event.preventDefault();
          this._collapse();
        }
      }
    }
  }

  customElements.define("x-select", XSelectElement);

  let isAppleDevice = navigator.platform.startsWith("Mac") || ["iPhone", "iPad"].includes(navigator.platform);

  // @doc
  //   https://www.w3.org/TR/uievents-key/#keys-modifier
  let modKeys = [
    "Alt",
    "AltGraph",
    "CapsLock",
    "Control",
    "Fn",
    "FnLock",
    "Meta",
    "NumLock",
    "ScrollLock",
    "Shift",
    "Symbol",
    "SymbolLock"
  ];

  let shadowTemplate$n = html`
  <template>
    <style>
      :host {
        display: inline-block;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 1;
      }
    </style>

    <main id="main"></main>
  </template>
`;

  class XShortcutElement extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    // @type
    //   Array<string>
    // @default
    //   []
    // @attribute
    get value() {
      let value = [];

      if (this.hasAttribute("value")) {
        let parts = this.getAttribute("value").replace("++", "+PLUS").split("+");
        parts = parts.map($0 => $0.trim().replace("PLUS", "+")).filter($0 => $0 !== "");
        value = parts;
      }

      return value;
    }
    set value(value) {
      this.setAttribute("value", value.join("+"));
    }

    // @type
    //   Array<string>
    get modKeys() {
      return this.value.filter(key => modKeys.includes(key));
    }

    // @type
    //   String?
    get normalKey() {
      let key = this.value.find(key => modKeys.includes(key) === false);
      return key === undefined ? null : key;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$n.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      let displayValue = "";

      let keys = this.value;
      let modKeys = this.modKeys;
      let normalKey = this.normalKey;

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

        let mappings = {
          "ArrowUp": "↑",
          "ArrowDown": "↓",
          "ArrowLeft": "←",
          "ArrowRight": "→",
          "Backspace": "⌦"
        };

        if (normalKey !== undefined) {
          displayValue += mappings[normalKey] || normalKey;
        }
      }
      else {
        let parts = [];

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

        let mappings = {
          "ArrowUp": "Up",
          "ArrowDown": "Down",
          "ArrowLeft": "Left",
          "ArrowRight": "Right"
        };

        if (normalKey !== null) {
          parts.push(mappings[normalKey] || normalKey);
        }

        displayValue = parts.join("+");
      }

      this["#main"].textContent = displayValue;
    }
  }

  customElements.define("x-shortcut", XShortcutElement);

  let getClosestMultiple = (number, step) => round(round(number / step) * step, getPrecision(step));
  let $oldTabIndex$9 = Symbol();

  let shadowTemplate$o = html`
  <template>
    <style>
      :host {
        display: block;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        touch-action: pan-y;
        --focus-ring-color: currentColor;
        --focus-ring-opacity: 1;
        --focus-ring-width: 10px;
        --focus-ring-transition-duration: 0.15s;
        --thumb-width: 20px;
        --thumb-height: 20px;
        --thumb-d: path("M 50 50 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0");
        --thumb-transform: none;
        --thumb-color: gray;
        --thumb-border-width: 1px;
        --thumb-border-color: rgba(0, 0, 0, 0.2);
        --tick-color: rgba(0, 0, 0, 0.4);
        --track-height: 2px;
        --track-color: gray;
        --track-tint-color: black;
      }
      :host(:focus) {
        outline: none;
      }
      :host(:hover) {
        cursor: default;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.4;
      }

      /**
       * Tracks
       */

      #tracks {
        position: absolute;
        width: 100%;
        height: var(--track-height);
        top: calc((var(--thumb-height) / 2) - var(--track-height)/2);
      }

      #tracks #normal-track {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--track-color);
        border-radius: 10px;
      }

      #tracks #tint-track {
        position: absolute;
        width: 0%;
        height: 100%;
        background: var(--track-tint-color);
      }

      /**
       * Thumbs
       */

      #thumbs {
        position: relative;
        width: calc(100% - var(--thumb-width));
        height: 100%;
      }

      #thumbs .thumb {
        position: relative;
        left: 0;
        width: var(--thumb-width);
        height: var(--thumb-height);
        display: block;
        box-sizing: border-box;
        overflow: visible;
        transform: var(--thumb-transform);
        transition: transform 0.2s ease-in-out;
        will-change: transform;
        d: var(--thumb-d);
      }

      #thumbs .thumb .shape {
        d: inherit;
        fill: var(--thumb-color);
        stroke: var(--thumb-border-color);
        stroke-width: var(--thumb-border-width);
        vector-effect: non-scaling-stroke;
      }

      #thumbs .thumb .focus-ring {
        d: inherit;
        fill: none;
        stroke: var(--focus-ring-color);
        stroke-width: 0;
        opacity: var(--focus-ring-opacity);
        vector-effect: non-scaling-stroke;
        transition: stroke-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host(:focus) #thumbs .thumb .focus-ring {
        stroke-width: var(--focus-ring-width);
      }

      /**
       * Ticks
       */

      #ticks {
        width: calc(100% - var(--thumb-width));
        height: 5px;
        margin: 0 0 3px 0;
        position: relative;
        margin-left: calc(var(--thumb-width) / 2);
      }
      #ticks:empty {
        display: none;
      }

      #ticks .tick {
        position: absolute;
        width: 1px;
        height: 100%;
        background: var(--tick-color);
      }

      /**
       * Labels
       */

      #labels {
        position: relative;
        width: calc(100% - var(--thumb-width));
        height: 14px;
        margin-left: calc(var(--thumb-width) / 2);
        font-size: 12px;
      }
      :host(:empty) #labels {
        display: none;
      }

      ::slotted(x-label) {
        position: absolute;
        transform: translateX(-50%);
      }
    </style>

    <div id="tracks">
      <div id="normal-track"></div>
      <div id="tint-track"></div>
    </div>

    <div id="thumbs">
      <svg id="start-thumb" class="thumb" viewBox="0 0 100 100" preserveAspectRatio="none" style="left: 0%;">
        <path class="focus-ring"></path>
        <path class="shape"></path>
      </svg>
    </div>

    <div id="ticks"></div>

    <div id="labels">
      <slot></slot>
    </div>
  </template>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  class XSliderElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "min", "max"];
    }

    // @type
    //   number
    // @default
    //   0
    // @attribute
    get min() {
      return this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : 0;
    }
    set min(min) {
      this.setAttribute("min", min);
    }

    // @type
    //   number
    // @default
    //   100
    // @attribute
    get max() {
      return this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : 100;
    }
    set max(max) {
      this.setAttribute("max", max);
    }

    // @type
    //   number
    // @attribute
    get value() {
      if (this.hasAttribute("value")) {
        return parseFloat(this.getAttribute("value"));
      }
      else {
        return this.max >= this.min ? this.min + (this.max - this.min) / 2 : this.min;
      }
    }
    set value(value) {
      value = normalize(value, this.min, this.max);
      this.setAttribute("value", value);
    }

    // @type
    //   number
    // @default
    //   1
    // @attribute
    get step() {
      return this.hasAttribute("step") ? parseFloat(this.getAttribute("step")) : 1;
    }
    set step(step) {
      this.setAttribute("step", step);
    }

    // @info
    //   Whether this button is disabled.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$o.content, true));

      this._observer = new MutationObserver((args) => this._onMutation(args));
      this._updateTicks500ms = throttle(this._updateTicks, 500, this);

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this._shadowRoot.addEventListener("pointerdown", (event) => this._onShadowRootPointerDown(event));
      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "min") {
        this._onMinAttributeChange();
      }
      else if (name === "max") {
        this._onMaxAttributeChange();
      }
    }

    connectedCallback() {
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

    disconnectedCallback() {
      this._observer.disconnect();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateTracks() {
      let left = (((this.value - this.min) / (this.max - this.min)) * 100);
      let originLeft = (((this.min > 0 ? this.min : 0) - this.min) / (this.max - this.min)) * 100;

      if (left >= originLeft) {
        this["#tint-track"].style.left = `${originLeft}%`;
        this["#tint-track"].style.width = (left - originLeft) + "%";
      }
      else {
        this["#tint-track"].style.left = `${left}%`;
        this["#tint-track"].style.width = `${originLeft - left}%`;
      }
    }

    _updateThumbs(animate) {
      this["#start-thumb"].style.left = (((this.value - this.min) / (this.max - this.min)) * 100) + "%";
    }

    async _updateTicks() {
      await customElements.whenDefined("x-label");

      this["#ticks"].innerHTML = "";

      for (let label of this.querySelectorAll(":scope > x-label")) {
        label.style.left = (((label.value - this.min) / (this.max - this.min)) * 100) + "%";
        this["#ticks"].insertAdjacentHTML("beforeend", `<div class="tick" style="left: ${label.style.left}"></div>`);
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$9] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$9] > 0) ? this[$oldTabIndex$9] : 0;
        }

        delete this[$oldTabIndex$9];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      this._updateTracks();
      this._updateThumbs();
    }

    _onMinAttributeChange() {
      this._updateTracks();
      this._updateThumbs();
      this._updateTicks();
    }

    _onMaxAttributeChange() {
      this._updateTracks();
      this._updateThumbs();
      this._updateTicks();
    }

    _onMutation(records) {
      for (let record of records) {
        if (record.type === "attributes" && record.target === this) {
          return;
        }
        else {
          this._updateTicks500ms();
        }
      }
    }

    _onPointerDown(event) {
      // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
      if (this.matches(":focus") === false) {
        event.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }
    }

    _onShadowRootPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1 || pointerDownEvent.isPrimary === false) {
        return;
      }

      let containerBounds = this["#thumbs"].getBoundingClientRect();
      let thumb = this["#start-thumb"];
      let thumbBounds = thumb.getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;
      let changeStarted = false;

      this.setPointerCapture(pointerDownEvent.pointerId);

      let updateValue = (clientX, animate) => {
        let x = clientX - containerBounds.x - thumbBounds.width/2;
        x = normalize(x, 0, containerBounds.width);

        let value = (x / containerBounds.width) * (this.max - this.min) + this.min;
        value = getClosestMultiple(value, this.step);

        if (this.value !== value) {
          this.value = value;

          if (changeStarted === false) {
            changeStarted = true;
            this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));
          }

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      if (pointerDownEvent.target.closest(".thumb") !== thumb) {
        updateValue(pointerDownEvent.clientX, true);
      }

      this.addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        if (pointerMoveEvent.isPrimary) {
          updateValue(pointerMoveEvent.clientX, false);
        }
      });

      this.addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this.removeEventListener("pointermove", pointerMoveListener);
        this.removeEventListener("lostpointercapture", lostPointerCaptureListener);

        if (changeStarted) {
          this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
        }
      });
    }

    _onKeyDown(event) {
      if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

        let oldValue = this.value;

        if (event.shiftKey) {
          this.value -= this.step * 10;
        }
        else {
          this.value -= this.step;
        }

        if (oldValue !== this.value) {
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }

        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
      }
      else if (event.code === "ArrowRight" || event.code === "ArrowUp") {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

        let oldValue = this.value;

        if (event.shiftKey) {
          this.value += this.step * 10;
        }
        else {
          this.value += this.step;
        }

        if (oldValue !== this.value) {
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }

        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
      }
    }
  }

  customElements.define("x-slider", XSliderElement);

  let shadowTemplate$p = html`
  <template>
    <style>
      :host {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: fit-content;
        --button-color: rgba(0, 0, 0, 0.6);
        --button-border-left: none;
        --pressed-button-color: white;
        --pressed-button-background: rgba(0, 0, 0, 0.3);
        --increment-arrow-width: 11px;
        --increment-arrow-height: 11px;
        --increment-arrow-path-d: path("M 24 69 L 50 43 L 76 69 L 69 76 L 50 58 L 31 76 L 24 69 Z" );
        --decrement-arrow-width: 11px;
        --decrement-arrow-height: 11px;
        --decrement-arrow-path-d: path("M 24 32 L 50 58 L 76 32 L 69 25 L 50 44 L 31 25 L 24 32 Z" );
      }
      :host(:hover) {
        cursor: default;
      }

      #increment-button,
      #decrement-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        user-select: none;
        box-sizing: border-box;
        color: var(--button-color);
        border-left: var(--button-border-left);
      }
      #increment-button[data-pressed],
      #decrement-button[data-pressed] {
        color: var(--pressed-button-color);
        background: var(--pressed-button-background);
      }
      :host([disabled="increment"]) #increment-button,
      :host([disabled="decrement"]) #decrement-button,
      :host([disabled=""]) #increment-button,
      :host([disabled=""]) #decrement-button {
        opacity: 0.3;
        pointer-events: none;
      }

      #increment-arrow {
        width: var(--increment-arrow-width);
        height: var(--increment-arrow-height);
        pointer-events: none;
      }
      #decrement-arrow {
        width: var(--decrement-arrow-width);
        height: var(--decrement-arrow-height);
        pointer-events: none;
      }

      #increment-arrow-path {
        d: var(--increment-arrow-path-d);
        fill: currentColor;
      }
      #decrement-arrow-path {
        d: var(--decrement-arrow-path-d);
        fill: currentColor;
      }
    </style>

    <div id="decrement-button" class="button">
      <svg id="decrement-arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path id="decrement-arrow-path"></path>
      </svg>
    </div>

    <div id="increment-button" class="button">
      <svg id="increment-arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path id="increment-arrow-path"></path>
      </svg>
    </div>
  </template>
`;

  // @events
  //   increment
  //   incrementstart
  //   incrementend
  //   decrement
  //   decrementstart
  //   decrementend
  class XStepperElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @type
    //   true || false || "increment" || "decrement"
    // @default
    //   "false"
    get disabled() {
      if (this.hasAttribute("disabled")) {
        if (this.getAttribute("disabled") === "increment") {
          return "increment";
        }
        else if (this.getAttribute("disabled") === "decrement") {
          return "decrement";
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    }
    set disabled(disabled) {
      if (disabled === true) {
        this.setAttribute("disabled", "");
      }
      else if (disabled === false) {
        this.removeAttribute("disabled");
      }
      else {
        this.setAttribute("disabled", disabled);
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$p.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this._shadowRoot.addEventListener("pointerdown", (event) => this._onPointerDown(event));
    }

    attributeChangedCallback(name) {
      if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onDisabledAttributeChange() {
      if (this.hasAttribute("disabled")) {
        this["#increment-button"].removeAttribute("data-pressed");
        this["#decrement-button"].removeAttribute("data-pressed");
      }
    }

    async _onPointerDown(pointerDownEvent) {
      let button = pointerDownEvent.target.closest(".button");
      let action = null;

      if (button === this["#increment-button"]) {
        action = "increment";
      }
      else if (button === this["#decrement-button"]) {
        action = "decrement";
      }

      if (pointerDownEvent.buttons !== 1 || action === null) {
        return;
      }

      // Provide "pressed" attribute for theming purposes which acts like :active pseudo-class, but is guaranteed
      // to last at least 100ms.
      {
        let pointerDownTimeStamp = Date.now();

        button.setAttribute("data-pressed", "");
        this.setPointerCapture(pointerDownEvent.pointerId);

        this.addEventListener("lostpointercapture", async (event) => {
          let pressedTime = Date.now() - pointerDownTimeStamp;
          let minPressedTime = 100;

          if (pressedTime < minPressedTime) {
            await sleep(minPressedTime - pressedTime);
          }

          button.removeAttribute("data-pressed");
        }, {once: true});
      }

      // Dispatch events
      {
        let intervalID = null;
        let pointerDownTimeStamp = Date.now();
        let {shiftKey} = pointerDownEvent;

        this.dispatchEvent(new CustomEvent(action + "start", {bubbles: true}));
        this.dispatchEvent(new CustomEvent(action, {bubbles: true, detail: {shiftKey}}));

        this.addEventListener("lostpointercapture", async (event) => {
          clearInterval(intervalID);
          this.dispatchEvent(new CustomEvent(action + "end", {bubbles: true}));
        }, {once: true});

        intervalID = setInterval(() => {
          if (Date.now() - pointerDownTimeStamp > 500) {
            this.dispatchEvent(new CustomEvent(action, {bubbles: true, detail: {shiftKey}}));
          }
        }, 100);
      }
    }
  }

  customElements.define("x-stepper", XStepperElement);

  let shadowTemplate$q = html`
  <template>
    <style>
      :host {
        display: block;
        width: 22px;
        height: 22px;
        cursor: default;
        box-sizing: border-box;
        overflow: hidden;
      }

      #main {
        width: 100%;
        height: 100%;
        position: relative;
      }

      #selected-icon {
        display: none;
        position: absolute;
        left: calc(50% - 8px);
        top: calc(50% - 8px);
        width: 16px;
        height: 16px;
        color: white;
      }
      :host([showicon]:hover) #selected-icon {
        display: block;
        opacity: 0.6;
      }
      :host([showicon][selected]) #selected-icon {
        display: block;
        opacity: 1;
      }
      :host([showicon][value="#FFFFFF"]) #selected-icon {
        fill: gray;
      }
    </style>

    <main id="main">
      <x-icon id="selected-icon" name="send"></x-icon>
    </main>
  </template>
`;

  class XSwatchElement extends HTMLElement {
    static get observedAttributes() {
      return ["disabled"];
    }

    // @info
    //   Value associated with this button.
    // @type
    //   string
    // @default
    //   "white"
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "white";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get selected() {
      return this.hasAttribute("selected");
    }
    set selected(selected) {
      selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
    }

    // @info
    //   Whether to show selection icon on hover and when the swatch is selected.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get showicon() {
      return this.hasAttribute("showicon");
    }
    set showicon(showicon) {
      showicon ? this.setAttribute("showicon", "") : this.removeAttribute("showicon");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$q.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this["#main"].style.background = this.value;
    }
  }

  customElements.define("x-swatch", XSwatchElement);

  let easing$5 = "cubic-bezier(0.4, 0, 0.2, 1)";
  let $oldTabIndex$a = Symbol();

  let shadowTemplate$r = html`
  <template>
    <style>
      :host {
        display: block;
        width: 30px;
        height: 18px;
        margin: 0 8px 0 0;
        box-sizing: border-box;
        display: flex;
        --focus-ring-color: currentColor;
        --focus-ring-opacity: 0.2;
        --focus-ring-width: 10px;
        --focus-ring-transition-duration: 0.15s;
        --ripple-type: none; /* unbounded, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.2;
        --thumb-color: currentColor;
        --thumb-size: 20px;
        --thumb-border-radius: 999px;
        --track-height: 65%;
        --track-color: currentColor;
        --track-opacity: 0.5;
        --track-border-radius: 999px;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      :host(:focus) {
        outline: none;
      }

      #main {
        width: 100%;
        height: 100%;
        position: relative;
      }

      /**
       * Track
       */

      #track {
        width: 100%;
        height: var(--track-height);
        background: var(--track-color);
        opacity: var(--track-opacity);
        border-radius: var(--track-border-radius);
      }

      /**
       * Thumb
       */

      #thumb {
        position: absolute;
        left: 0px;
        width: var(--thumb-size);
        height: var(--thumb-size);
        background: var(--thumb-color);
        border-radius: var(--thumb-border-radius);
        transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host([toggled]) #thumb {
        left: calc(100% - var(--thumb-size));
      }
      :host([mixed]) #thumb {
        left: calc(50% - var(--thumb-size) / 2);
      }

      /**
       * Focus ring
       */

      #focus-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--thumb-size);
        height: var(--thumb-size);
        transform: translate(-50%, -50%);
        background: transparent;
        border: 0px solid var(--focus-ring-color);
        border-radius: 999px;
        opacity: var(--focus-ring-opacity);
        transition: border-width var(--focus-ring-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host(:focus) #thumb #focus-ring {
        border-width: var(--focus-ring-width);
      }

      /**
       * Ripples
       */

      #ripples .ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(var(--thumb-size) + 22px);
        height: calc(var(--thumb-size) + 22px);
        transform: translate(-50%, -50%);
        background: var(--ripple-background);
        border-radius: 999px;
        opacity: var(--ripple-opacity);
      }
    </style>

    <x-box id="main">
      <div id="track"></div>

      <div id="thumb">
        <div id="focus-ring"></div>
        <div id="ripples"></div>
      </div>
    </x-box>
  </template>
`;

  // @events
  //   toggle
  class XSwitchElement extends HTMLElement {
    static get observedAttributes() {
      return ["toggled", "disabled"];
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get toggled() {
      return this.hasAttribute("toggled");
    }
    set toggled(toggled) {
      toggled ? this.setAttribute("toggled", "") : this.removeAttribute("toggled");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$r.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      this._updateAccessabilityAttributes();
    }

    attributeChangedCallback(name) {
      if (name === "toggled") {
        this._onToggledAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "switch");
      this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$a] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$a] > 0) ? this[$oldTabIndex$a] : 0;
        }

        delete this[$oldTabIndex$a];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onToggledAttributeChange() {
      this.setAttribute("aria-checked", this.mixed ? "mixed" : this.toggled);
    }

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onPointerDown(event) {
      if (event.buttons !== 1) {
        event.preventDefault();
        return;
      }

      // Don't focus the widget with pointer, instead focus the closest ancestor focusable element
      if (this.matches(":focus") === false) {
        event.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }

      // Ripple
      {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "unbounded") {
          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple");
          this["#ripples"].append(ripple);

          let transformAnimation = ripple.animate(
            { transform: ["translate(-50%, -50%) scale(0)", "translate(-50%, -50%) scale(1)"] },
            { duration: 200, easing: easing$5 }
          );

          this.setPointerCapture(event.pointerId);

          this.addEventListener("lostpointercapture", async () => {
            await transformAnimation.finished;

            let opacityAnimation = ripple.animate(
              { opacity: [getComputedStyle(ripple).opacity, "0"] },
              { duration: 200, easing: easing$5 }
            );

            await opacityAnimation.finished;

            ripple.remove();
          }, {once: true});
        }
      }
    }

    async _onClick(event) {
      // Update state
      {
        if (this.mixed) {
          this.mixed = false;
        }
        else {
          this.toggled = !this.toggled;
        }

        this.dispatchEvent(new CustomEvent("toggle"));
      }

      // Ripple
      if (event.isTrusted === false) {
        let rippleType = getComputedStyle(this).getPropertyValue("--ripple-type").trim();

        if (rippleType === "unbounded") {
          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple");
          this["#ripples"].append(ripple);

          await ripple.animate(
            { transform: ["translate(-50%, -50%) scale(0)", "translate(-50%, -50%) scale(1)"] },
            { duration: 200, easing: easing$5 }
          ).finished;

          await ripple.animate(
            { opacity: [getComputedStyle(ripple).opacity, "0"] },
            { duration: 200, easing: easing$5 }
          ).finished;

          ripple.remove();
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.click();
      }
    }
  }
  customElements.define("x-switch", XSwitchElement);

  let {max: max$6} = Math;
  let easing$6 = "cubic-bezier(0.4, 0, 0.2, 1)";

  let shadowTemplate$s = html`
  <template>
    <style>
      :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        box-sizing: border-box;
        cursor: default;
        user-select: none;
        --menu-position: below; /* over, below */
        --trigger-effect: none; /* ripple, none */
        --ripple-background: currentColor;
        --ripple-opacity: 0.2;
        --arrow-width: 9px;
        --arrow-height: 9px;
        --arrow-margin: 1px 0 0 3px;
        --arrow-d: path("M 11.7 19.9 L 49.8 57.9 L 87.9 19.9 L 99.7 31.6 L 49.8 81.4 L -0.01 31.6 Z");
        --selection-indicator-height: 3px;
        --selection-indicator-background: white;
      }
      :host(:focus) {
        outline: none;
      }

      #content {
        display: inherit;
        flex-flow:inherit;
        align-items: inherit;
        z-index: 100;
      }

      /**
       * Arrow
       */

      #arrow {
        width: var(--arrow-width);
        height: var(--arrow-height);
        margin: var(--arrow-margin);
        color: currentColor;
        d: var(--arrow-d);
      }

      #arrow-path {
        fill: currentColor;
        d: inherit;
      }

      /**
       * Ripples
       */

      #ripples {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      }

      #ripples .ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background: var(--ripple-background);
        opacity: var(--ripple-opacity);
        border-radius: 999px;
        transform: none;
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, transform;
        pointer-events: none;
      }

      /**
       * Selection indicator
       */

      #selection-indicator {
        display: none;
        width: 100%;
        height: var(--selection-indicator-height);
        background: var(--selection-indicator-background);
        position: absolute;
        bottom: 0;
        left: 0;
      }
      :host([selected]) #selection-indicator {
        display: block;
      }
      :host-context([animatingindicator]) #selection-indicator {
        display: none;
      }
    </style>

    <div id="ripples"></div>
    <div id="selection-indicator"></div>

    <div id="content">
      <slot></slot>

      <svg id="arrow" viewBox="0 0 100 100" preserveAspectRatio="none" hidden>
        <path id="arrow-path"></path>
      </svg>
    </div>
  </template>
`;

  class XTabElement extends HTMLElement {
    static get observedAttributes() {
      return ["selected", "disabled"];
    }

    // @info
    //   Value associated with this tab.
    // @type
    //   string
    // @default
    //   ""
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get selected() {
      return this.hasAttribute("selected");
    }
    set selected(selected) {
      selected ? this.setAttribute("selected", "") : this.removeAttribute("selected");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$s.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("pointerdown", (event) => this._onPointerDown(event));
      this.addEventListener("click", (event) => this._onClick(event));
    }

    connectedCallback() {
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
      this.setAttribute("role", "tab");
      this.setAttribute("aria-selected", this.selected);
      this.setAttribute("aria-disabled", this.disabled);

      this._updateArrowVisibility();
    }

    attributeChangedCallback(name) {
      if (name === "selected") {
        this._onSelectedAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateArrowVisibility() {
      let menu = this.querySelector("x-menu");
      let popover = this.querySelector("x-popover");
      this["#arrow"].style.display = (menu === null && popover === null) ? "none" : null;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onSelectedAttributeChange() {
      this.setAttribute("aria-selected", this.selected);
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    _onDisabledAttributeChange() {
      this.setAttribute("aria-disabled", this.disabled);
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }

    async _onPointerDown(pointerDownEvent) {
      // Don't focus the tab with pointer
      if (this.matches(":focus") === false && !pointerDownEvent.target.closest("x-menu, x-popup")) {
        pointerDownEvent.preventDefault();

        let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

        if (ancestorFocusableElement) {
          ancestorFocusableElement.focus();
        }
      }

      if (pointerDownEvent.buttons !== 1 || this.querySelector("x-menu")) {
        return;
      }

      // Provide "pressed" attribute for theming purposes
      {
        let pointerDownTimeStamp = Date.now();

        this.setAttribute("pressed", "");
        this.setPointerCapture(pointerDownEvent.pointerId);

        this.addEventListener("lostpointercapture", async (event) => {
          if (this.selected === true) {
            let pressedTime = Date.now() - pointerDownTimeStamp;
            let minPressedTime = 100;

            if (pressedTime < minPressedTime) {
              await sleep(minPressedTime - pressedTime);
            }
          }

          this.removeAttribute("pressed");
        }, {once: true});
      }

      // Ripple
      {
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          let bounds = this["#ripples"].getBoundingClientRect();
          let size = max$6(bounds.width, bounds.height) * 1.5;
          let top  = pointerDownEvent.clientY - bounds.y - size/2;
          let left = pointerDownEvent.clientX - bounds.x - size/2;
          let whenLostPointerCapture = new Promise((r) => this.addEventListener("lostpointercapture", r, {once: true}));

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple pointer-down-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
          this["#ripples"].append(ripple);

          this.setPointerCapture(pointerDownEvent.pointerId);

          // Workaround for tabs that that change their color when selected
          ripple.hidden = true;
          await sleep(10);
          ripple.hidden = false;

          let inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"]}, { duration: 300, easing: easing$6 });

          await whenLostPointerCapture;
          await inAnimation.finished;

          let fromOpacity = getComputedStyle(ripple).opacity;
          let outAnimation = ripple.animate({ opacity: [fromOpacity, "0"]}, { duration: 300, easing: easing$6 });
          await outAnimation.finished;

          ripple.remove();
        }
      }
    }

    async _onClick(event) {
      // Ripple
      if (this["#ripples"].querySelector(".pointer-down-ripple") === null && !this.querySelector("x-menu")) {
        let triggerEffect = getComputedStyle(this).getPropertyValue("--trigger-effect").trim();

        if (triggerEffect === "ripple") {
          let bounds = this["#ripples"].getBoundingClientRect();
          let size = max$6(bounds.width, bounds.height) * 1.5;
          let top  = (bounds.y + bounds.height/2) - bounds.y - size/2;
          let left = (bounds.x + bounds.width/2) - bounds.x - size/2;

          let ripple = createElement("div");
          ripple.setAttribute("class", "ripple click-ripple");
          ripple.setAttribute("style", `width: ${size}px; height: ${size}px; top: ${top}px; left: ${left}px;`);
          this["#ripples"].append(ripple);

          let inAnimation = ripple.animate({ transform: ["scale(0)", "scale(1)"]}, { duration: 300, easing: easing$6 });
          await inAnimation.finished;

          let fromOpacity = getComputedStyle(ripple).opacity;
          let outAnimation = ripple.animate({ opacity: [fromOpacity, "0"] }, { duration: 300, easing: easing$6 });
          await outAnimation.finished;

          ripple.remove();
        }
      }
    }
  }

  customElements.define("x-tab", XTabElement);

  let shadowTemplate$t = html`
  <template>
    <style>
      :host {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        justify-content: flex-start;
      }
      :host([centered]) {
        margin: 0 auto;
        justify-content: center;
      }

      :host([centered]) ::slotted(x-tab) {
        flex: 0;
      }

      #selection-indicator {
        position: absolute;
        width: 100%;
        height: fit-content;
        bottom: 0;
        left: 0;
        pointer-events: none;
      }
    </style>

    <slot></slot>
    <div id="selection-indicator" hidden></div>
  </template>
`;

  // @events
  //   change
  class XTabsElement extends HTMLElement {
    // @type
    //   string?
    // @default
    //   null
    get value() {
      let selectedTab = this.querySelector("x-tab[selected]");
      return selectedTab ? selectedTab.value : null;
    }
    set value(value) {
      let tabs = [...this.querySelectorAll("x-tab")];
      let selectedTab = (value === null) ? null : tabs.find(tab => tab.value === value);

      for (let tab of tabs) {
        tab.selected = (tab === selectedTab);
      }
    }

    // @property
    //   reflected
    // @type
    //   boolean
    // @default
    //   false
    get centered() {
      return this.hasAttribute("centered");
    }
    set centered(centered) {
      centered === true ? this.setAttribute("centered", "") : this.removeAttribute("centered");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._wasFocusedBeforeExpanding = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$t.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#backdrop"] = createElement("x-backdrop");
      this["#backdrop"].style.background = "rgba(0, 0, 0, 0)";

      this.addEventListener("click", (event) => this._onClick(event));
      this.addEventListener("keydown", (event) => this._onKeyDown(event));
    }

    connectedCallback() {
      this.setAttribute("role", "tablist");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @info
    //   Expands given tab by opening its menu.
    _expand(tab) {
      return new Promise( async (resolve) => {
        let menu = tab.querySelector(":scope > x-menu");
        let label = tab.querySelector("x-label");

        if (menu) {
          this._wasFocusedBeforeExpanding = this.querySelector("*:focus") !== null;

          let over = getComputedStyle(tab).getPropertyValue("--menu-position").trim() === "over";
          let whenOpened = over ? menu.openOverLabel(label) :  menu.openNextToElement(tab, "vertical", 3);

          tab.setAttribute("expanded", "");

          // When menu closes, focus the tab
          menu.addEventListener("close", () => {
            let tabs = this.querySelectorAll("x-tab");
            let closedTab = tab;

            if (this._wasFocusedBeforeExpanding) {
              for (let tab of tabs) {
                tab.tabIndex = (tab === closedTab ? 0 : -1);
              }

              closedTab.focus();
            }
            else {
              for (let tab of tabs) {
                tab.tabIndex = (tab.selected ? 0 : -1);
              }

              let ancestorFocusableElement = closest(this.parentNode, "[tabindex]");

              if (ancestorFocusableElement) {
                ancestorFocusableElement.focus();
              }
            }
          }, {once: true});

          await whenOpened;

          if (!tab.querySelector("*:focus")) {
            menu.focus();
          }

          this["#backdrop"].ownerElement = menu;
          this["#backdrop"].show(false);
        }

        resolve();
      });
    }

    // @info
    //   Collapses currently expanded tab by closing its menu.
    _collapse(delay) {
      return new Promise( async (resolve) => {
        let menu = this.querySelector("x-menu[opened]");

        if (menu && !menu.hasAttribute("closing")) {
          let tabs = this.querySelectorAll("x-tab");
          let closedTab = menu.closest("x-tab");
          menu.setAttribute("closing", "");

          await delay;
          await menu.close();

          this["#backdrop"].hide(false);

          menu.removeAttribute("closing");
          closedTab.removeAttribute("expanded");
        }
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _animateSelectionIndicator(startTab, endTab) {
      return new Promise( async (resolve) => {
        let mainBBox = this.getBoundingClientRect();
        let startBBox = startTab ? startTab.getBoundingClientRect() : null;
        let endBBox = endTab.getBoundingClientRect();
        let computedStyle = getComputedStyle(endTab);

        if (startBBox === null) {
          startBBox = DOMRect.fromRect(endBBox);
          startBBox.x += startBBox.width / 2;
          startBBox.width = 0;
        }

        this["#selection-indicator"].style.height = computedStyle.getPropertyValue("--selection-indicator-height");

        if (this["#selection-indicator"].style.height !== "0px") {
          this["#selection-indicator"].style.background = computedStyle.getPropertyValue("--selection-indicator-background");
          this["#selection-indicator"].hidden = false;

          this.setAttribute("animatingindicator", "");

          let animation = this["#selection-indicator"].animate(
            [
              {
                bottom: (startBBox.bottom - mainBBox.bottom) + "px",
                left: (startBBox.left - mainBBox.left) + "px",
                width: startBBox.width + "px",
              },
              {
                bottom: (endBBox.bottom - mainBBox.bottom) + "px",
                left: (endBBox.left - mainBBox.left) + "px",
                width: endBBox.width + "px",
              }
            ],
            {
              duration: 100,
              iterations: 1,
              delay: 0,
              easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            }
          );

          await animation.finished;

          this["#selection-indicator"].hidden = true;
          this.removeAttribute("animatingindicator");
        }

        resolve();
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onClick(event) {
      if (event.button !== 0) {
        return;
      }

      if (event.target.closest("x-backdrop")) {
        this._collapse();
      }

      else if (event.target.closest("x-menu")) {
        let clickedMenuItem = event.target.closest("x-menuitem");

        if (clickedMenuItem && clickedMenuItem.disabled === false) {
          let submenu = clickedMenuItem.querySelector("x-menu");

          if (submenu) {
            if (submenu.opened) {
              submenu.close();
            }
            else {
              submenu.openNextToElement(clickedMenuItem, "horizontal");
            }
          }
          else {
            this._collapse(clickedMenuItem.whenTriggerEnd);
          }
        }
      }

      else if (event.target.closest("x-tab")) {
        let tabs = this.querySelectorAll("x-tab");
        let clickedTab = event.target.closest("x-tab");
        let selectedTab = this.querySelector("x-tab[selected]");
        let submenu = clickedTab.querySelector(":scope > x-menu");

        if (clickedTab !== selectedTab) {
          // Open a popup menu
          if (submenu) {
            this._expand(clickedTab);
          }

          // Select the tab
          else {
            for (let tab of tabs) {
              tab.selected = (tab === clickedTab);
            }

            this._animateSelectionIndicator(selectedTab, clickedTab);
            this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
          }
        }
      }
    }

    _onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        let tab = event.target;
        let menu = tab.querySelector("x-menu");
        let label = tab.querySelector("x-label");

        if (menu) {
          if (menu.opened) {
            this._collapse();
            event.preventDefault();
          }
          else {
            this._expand(tab);
            event.preventDefault();
          }
        }
        else {
          event.preventDefault();
          tab.click();
        }
      }

      else if (event.code === "Escape") {
        let tab = event.target.closest("x-tab");
        let menu = tab.querySelector("x-menu");

        if (menu) {
          this._collapse();
        }
      }

      else if (event.code === "ArrowLeft") {
        let tabs = [...this.querySelectorAll("x-tab:not([disabled])")];
        let currentTab = this.querySelector(`x-tab[tabindex="0"]`);
        let clickedTab = event.target;
        let openedTabMenu = this.querySelector("x-menu[opened]");

        event.preventDefault();

        if (openedTabMenu) ;
        else if (currentTab && tabs.length > 0) {
          let currentTabIndex = tabs.indexOf(currentTab);
          let previousTab = tabs[currentTabIndex - 1] || tabs[tabs.length - 1];

          currentTab.tabIndex = -1;
          previousTab.tabIndex = 0;
          previousTab.focus();
        }
      }

      else if (event.code === "ArrowRight") {
        let tabs = [...this.querySelectorAll("x-tab:not([disabled])")];
        let currentTab = this.querySelector(`x-tab[tabindex="0"]`);
        let clickedTab = event.target;
        let openedTabMenu = this.querySelector("x-menu[opened]");

        event.preventDefault();

        if (openedTabMenu) ;
        else if (currentTab && tabs.length > 0) {
          let currentTabIndex = tabs.indexOf(currentTab);
          let nextTab = tabs[currentTabIndex + 1] || tabs[0];

          currentTab.tabIndex = -1;
          nextTab.tabIndex = 0;
          nextTab.focus();
        }
      }

      else if (event.code === "ArrowUp") {
        let tab = event.target.closest("x-tab");
        let menu = tab.querySelector("x-menu");

        if (menu) {
          event.preventDefault();

          if (menu.opened) {
            let lastMenuItem = menu.querySelector(":scope > x-menuitem:last-of-type:not([disabled])");

            if (lastMenuItem) {
              lastMenuItem.focus();
            }
          }
          else {
            this._expand(tab);
          }
        }
      }

      else if (event.code === "ArrowDown") {
        let tab = event.target.closest("x-tab");
        let menu = tab.querySelector("x-menu");

        if (menu) {
          event.preventDefault();

          if (menu.opened) {
            let firstMenuItem = menu.querySelector(":scope > x-menuitem:not([disabled])");

            if (firstMenuItem) {
              firstMenuItem.focus();
            }
          }
          else {
            this._expand(tab);
          }
        }
      }
    }
  }

  customElements.define("x-tabs", XTabsElement);

  let $oldTabIndex$b = Symbol();

  let shadowTemplate$u = html`
  <template>
    <style>
      :host {
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        min-height: 24px;
        background: white;
        border: 1px solid #BFBFBF;
        font-size: 12px;
        --close-button-path-d: path(
          "M 25 16 L 50 41 L 75 16 L 84 25 L 59 50 L 84 75 L 75 84 L 50 59 L 25 84 L 16 75 L 41 50 L 16 25 Z"
        );
        --selection-color: currentColor;
        --selection-background: #B2D7FD;
        --tag-background: rgba(0, 0, 0, 0.04);
        --tag-border: 1px solid #cccccc;
        --tag-color: currentColor;
      }
      :host(:focus) {
        outline: 1px solid blue;
      }
      :host([error]) {
        --selection-color: white;
        --selection-background: #d50000;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      ::selection {
        color: var(--selection-color);
        background: var(--selection-background);
      }

      #main {
        width: 100%;
        height: 100%;
        min-height: inherit;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        align-content: flex-start;
        cursor: text;
      }

      #items {
        display: flex;
        flex-wrap: wrap;
        padding: 2px;
      }
      :host([mixed]) #items {
        opacity: 0.7;
      }

      .item {
        height: 100%;
        margin: 2px;
        padding: 0px 3px 0 6px;
        display: flex;
        line-height: 1.2;
        align-items: center;
        justify-content: center;
        background: var(--tag-background);
        border: var(--tag-border);
        color: var(--tag-color);
        font-size: inherit;
        cursor: default;
        user-select: none;
      }
      .item#editable-item {
        color: inherit;
        outline: none;
        background: none;
        border: 1px solid transparent;
        flex-grow: 1;
        align-items: center;
        justify-content: flex-start;
        white-space: pre;
        cursor: text;
        user-select: text;
      }

      .item .close-button {
        color: inherit;
        opacity: 0.8;
        width: 11px;
        height: 11px;
        vertical-align: middle;
        margin-left: 4px;
      }
      .item .close-button:hover {
        background: rgba(0, 0, 0, 0.1);
        opacity: 1;
      }

      .item .close-button-path {
        fill: currentColor;
        d: var(--close-button-path-d);
      }
    </style>

    <main id="main">
      <div id="items">
        <span id="editable-item" class="item" spellcheck="false"></span>
      </div>
      <slot></slot>
    </main>
  </template>
`;

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend
  class XTagInputElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "spellcheck", "disabled"];
    }

    // @type
    //   Array<string>
    // @default
    //   []
    // @attribute
    get value() {
      if (this.hasAttribute("value")) {
        return this.getAttribute("value").split(this.delimiter).map($0 => $0.trim()).filter($0 => $0 !== "");
      }
      else {
        return [];
      }
    }
    set value(value) {
      if (value.length === 0) {
        this.removeAttribute("value");
      }
      else {
        this.setAttribute("value", value.join(this.delimiter));
      }
    }

    // @type
    //   string
    get delimiter() {
      return this.hasAttribute("delimiter") ? this.getAttribute("delimiter") : ",";
    }
    set delimiter(delimiter) {
      this.setAttribute("delimiter", delimiter);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get spellcheck() {
      return this.hasAttribute("spellcheck");
    }
    set spellcheck(spellcheck) {
      spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
    }

    // @type
    //   string
    get prefix() {
      return this.hasAttribute("prefix") ? this.getAttribute("prefix") : "";
    }
    set prefix(prefix) {
      prefix === "" ? this.removeAttribute("prefix") : this.setAttribute("prefix", prefix);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      disabled ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$u.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("focusin", (event) => this._onFocusIn(event));
      this.addEventListener("focusout", (event) => this._onFocusOut(event));
      this._shadowRoot.addEventListener("pointerdown", (event) => this._onShadowRootPointerDown(event));
      this._shadowRoot.addEventListener("click", (event) => this._onShadowRootClick(event));
      this["#editable-item"].addEventListener("keydown", (event) => this._onInputKeyDown(event));
      this["#editable-item"].addEventListener("input", (event) => this._onInputInput(event));
    }

    connectedCallback() {
      this._update();
      this._updateAccessabilityAttributes();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "spellcheck") {
        this._onSpellcheckAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
    }

    // @info
    //   Override this method if you want the entered tags to match specific criteria.
    // @type
    //   (string) => boolean
    validateTag(tag) {
      return true;
    }

    _commitInput() {
      this._updateValidityState();

      if (this.hasAttribute("error") === false) {
        let tag = this["#editable-item"].textContent.trim();
        this["#editable-item"].textContent = "";

        if (tag.length > 0) {
          if (this.value.includes(tag) === false) {
            let value = this.value.filter($0 => $0 !== tag);
            this.value = [...value, tag];
            this.dispatchEvent(new CustomEvent("change"));
          }
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      for (let item of [...this["#items"].children]) {
        if (item !== this["#editable-item"]) {
          item.remove();
        }
      }

      for (let tag of this.value) {
        this["#editable-item"].insertAdjacentHTML("beforebegin", `
        <div class="item" data-tag="${tag}">
          <label>${this.prefix}${tag}</label>
          <svg class="close-button" viewBox="0 0 100 100"><path class="close-button-path"></path></svg>
        </div>
      `);
      }

      this._updatePlaceholderVisibility();
    }

    _updateValidityState() {
      let tag = this["#editable-item"].textContent.trim();

      if (this.validateTag(tag) === true || tag.length === 0) {
        this.removeAttribute("error");
      }
      else {
        this.setAttribute("error", "");
      }
    }

    _updatePlaceholderVisibility() {
      let placeholder = this.querySelector(":scope > x-label");

      if (placeholder) {
        placeholder.hidden = (this.value.length > 0 || this["#editable-item"].textContent.length > 0);
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "input");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$b] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$b] > 0) ? this[$oldTabIndex$b] : 0;
        }

        delete this[$oldTabIndex$b];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      this._update();
    }

    _onSpellcheckAttributeChange() {
      this["#editable-item"].spellcheck = this.spellcheck;
    }

    _onDisabledAttributeChange() {
      this._updateAccessabilityAttributes();
    }

    _onFocusIn() {
      this.dispatchEvent(new CustomEvent("textinputmodestart", {bubbles: true, composed: true}));
    }

    _onFocusOut() {
      this._commitInput();
      this["#editable-item"].removeAttribute("contenteditable");
      this.dispatchEvent(new CustomEvent("textinputmodeend", {bubbles: true, composed: true}));

      if (this.hasAttribute("error")) {
        this["#editable-item"].textContent = "";
        this.removeAttribute("error");
      }
    }

    _onShadowRootPointerDown(event) {
      if (event.target === this["#main"] || event.target === this["#items"]) {
        event.preventDefault();

        this["#editable-item"].setAttribute("contenteditable", "");

        let range = new Range();
        range.selectNodeContents(this["#editable-item"]);
        range.collapse(false);

        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }

      else if (event.target.matches(`.item, .item > *`)) {
        let item = event.target.closest(".item");
        let closeButton = event.target.closest(".close-button");

        if (item !== this["#editable-item"] && !closeButton) {
          event.preventDefault();
          event.stopPropagation();
          this["#editable-item"].focus();
          this._commitInput();
        }
      }
    }

    _onShadowRootClick(event) {
      if (event.target.closest(".close-button")) {
        this._onCloseButtonClick(event);
      }
    }

    _onCloseButtonClick(event) {
      let item = event.target.closest(".item");
      this.value = this.value.filter(tag => tag !== item.getAttribute("data-tag"));
      this.dispatchEvent(new CustomEvent("change"));
    }

    _onInputKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this._commitInput();
      }
      else if (event.key === "Backspace") {
        let value = this["#editable-item"].textContent;

        if (value.length === 0) {
          this.value = this.value.slice(0, this.value.length - 1);
          this.dispatchEvent(new CustomEvent("change"));
        }
      }
    }

    _onInputInput() {
      let value = this["#editable-item"].textContent;

      if (value.includes(this.delimiter)) {
        this._commitInput();
      }

      this._updatePlaceholderVisibility();

      if (this.hasAttribute("error")) {
        this._updateValidityState();
      }

      this.dispatchEvent(new CustomEvent("input"));
    }
  }
  customElements.define("x-taginput", XTagInputElement);

  let $oldTabIndex$c = Symbol();

  let shadowTemplate$v = html`
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        min-height: 100px;
        box-sizing: border-box;
        background: white;
        color: #000000;
        --selection-color: currentColor;
        --selection-background: #B2D7FD;
        --inner-padding: 0;
      }
      :host(:hover) {
        cursor: text;
      }
      :host([error]) {
        --selection-color: white;
        --selection-background: #d50000;
      }
      :host([mixed]) {
        color: rgba(0, 0, 0, 0.7);
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([hidden]) {
        display: none;
      }

      ::selection {
        color: var(--selection-color);
        background: var(--selection-background);
      }

      ::-webkit-scrollbar {
        max-width: 6px;
        max-height: 6px;
        background: none;
      }
      ::-webkit-scrollbar-track {
        border-radius: 25px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 25px;
      }
      ::-webkit-scrollbar-corner {
        display: none
      }

      #main {
        display: flex;
        flex-flow: column;
        height: 100%;
        min-height: inherit;
        max-height: inherit;
        overflow-y: auto;
      }

      #editor {
        flex: 1;
        padding: var(--inner-padding);
        box-sizing: border-box;
        color: inherit;
        background: none;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        overflow: auto;
      }

      /* Error text */
      :host([error])::before {
        position: absolute;
        left: 0;
        bottom: -20px;
        box-sizing: border-box;
        color: #d50000;
        font-family: inherit;
        font-size: 11px;
        line-height: 1.2;
        white-space: pre;
        content: attr(error) " ";
      }
    </style>

    <main id="main">
      <slot></slot>
      <div id="editor" contenteditable="plaintext-only" spellcheck="false"></div>
    </main>
  </template>
`;

  // @events
  //   input
  //   change
  //   textinputmodestart
  //   textinputmodeend
  class XTextareaElement extends HTMLElement {
    static get observedAttributes() {
      return ["value", "spellcheck", "disabled", "validation"];
    }

    // @type
    //   string
    // @default
    //   ""
    // @attribute
    get value() {
      return this["#editor"].textContent;
    }
    set value(value) {
      this["#editor"].textContent = value;

      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
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
    get spellcheck() {
      return this.hasAttribute("spellcheck");
    }
    set spellcheck(spellcheck) {
      spellcheck ? this.setAttribute("spellcheck", "") : this.removeAttribute("spellcheck");
    }

    // @type
    //   number
    // @default
    //   0
    // @attribute
    get minLength() {
      return this.hasAttribute("minlength") ? parseInt(this.getAttribute("minlength")) : 0;
    }
    set minLength(minLength) {
      this.setAttribute("minlength", minLength);
    }

    // @type
    //   number || Infinity
    // @default
    //   0
    // @attribute
    get maxLength() {
      return this.hasAttribute("maxlength") ? parseInt(this.getAttribute("maxlength")) : Infinity;
    }
    set maxLength(maxLength) {
      this.setAttribute("maxlength", maxLength);
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get required() {
      return this.hasAttribute("required");
    }
    set required(required) {
      required ? this.setAttribute("required", "") : this.removeAttribute("required");
    }

    // @info
    //   Whether this textarea has "mixed" state.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get mixed() {
      return this.hasAttribute("mixed");
    }
    set mixed(mixed) {
      mixed ? this.setAttribute("mixed", "") : this.removeAttribute("mixed");
    }

    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
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
    get validation() {
      return this.hasAttribute("validation") ? this.getAttribute("validation") : "auto";
    }
    set validation(validation) {
      this.setAttribute("validation", validation);
    }

    // @type
    //   string?
    // @default
    //   null
    // @attribute
    get error() {
      return this.getAttribute("error");
    }
    set error(error) {
      error === null ? this.removeAttribute("error") : this.setAttribute("error", error);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed", delegatesFocus: true});
      this._shadowRoot.append(document.importNode(shadowTemplate$v.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this.addEventListener("focusin", (event) => this._onFocusIn(event));
      this.addEventListener("focusout", (event) => this._onFocusOut(event));

      this["#editor"].addEventListener("click", (event) => this._onEditorClick(event));
      this["#editor"].addEventListener("input", (event) => this._onEditorInput(event));
    }

    connectedCallback() {
      this._updateEmptyState();
      this._updateAccessabilityAttributes();

      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    attributeChangedCallback(name) {
      if (name === "value") {
        this._onValueAttributeChange();
      }
      else if (name === "spellcheck") {
        this._onSpellcheckAttributeChange();
      }
      else if (name === "disabled") {
        this._onDisabledAttributeChange();
      }
      else if (name === "validation") {
        this._onValidationAttributeChnage();
      }
    }

    // @info
    //   Override this method to validate the textarea value manually.
    // @type
    //   () => void
    validate() {
      if (this.value.length < this.minLength) {
        this.error = "Entered text is too short";
      }
      else if (this.value.length > this.maxLength) {
        this.error = "Entered text is too long";
      }
      else if (this.required && this.value.length === 0) {
        this.error = "This field is required";
      }
      else {
        this.error = null;
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _updateEmptyState() {
      if (this.value.length === 0) {
        this.setAttribute("empty", "");
      }
      else {
        this.removeAttribute("empty");
      }
    }

    _updateAccessabilityAttributes() {
      this.setAttribute("role", "input");
      this.setAttribute("aria-disabled", this.disabled);

      if (this.disabled) {
        this[$oldTabIndex$c] = (this.tabIndex > 0 ? this.tabIndex : 0);
        this.tabIndex = -1;
      }
      else {
        if (this.tabIndex < 0) {
          this.tabIndex = (this[$oldTabIndex$c] > 0) ? this[$oldTabIndex$c] : 0;
        }

        delete this[$oldTabIndex$c];
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      this.value = this.hasAttribute("value") ? this.getAttribute("value") : "";

      if (this.matches(":focus")) {
        document.execCommand("selectAll");
      }
    }

    _onSpellcheckAttributeChange() {
      this["#editor"].spellcheck = this.spellcheck;
    }

    _onDisabledAttributeChange() {
      this["#editor"].disabled = this.disabled;
      this._updateAccessabilityAttributes();
    }

    _onValidationAttributeChnage() {
      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto" || this.validation === "manual") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }

    _onFocusIn() {
      this._focusInValue = this.value;
      this.dispatchEvent(new CustomEvent("textinputmodestart", {bubbles: true, composed: true}));
    }

    _onFocusOut() {
      this.dispatchEvent(new CustomEvent("textinputmodeend", {bubbles: true, composed: true}));
      this._shadowRoot.getSelection().collapse(this["#main"]);

      if (this.validation === "auto") {
        this.validate();
      }

      if (this.error === null && (this.value !== this._focusInValue || this.mixed)) {
        this.mixed = false;
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
      }
    }

    _onEditorClick(event) {
      if (event.detail >= 4) {
        document.execCommand("selectAll");
      }
    }

    _onEditorInput(event) {
      this.dispatchEvent(new CustomEvent("input", {bubbles: true}));
      this._updateEmptyState();

      if (this.validation === "instant") {
        this.validate();
      }
      else if (this.validation === "auto") {
        if (this.error !== null) {
          this.validate();
        }
      }
    }
  }

  customElements.define("x-textarea", XTextareaElement);

  let shadowTemplate$w = html`
  <template>
    <style>
      :host {
        display: block;
        width: 30px;
        height: 30px;
        box-sizing: border-box;
      }
      :host([hidden]) {
        display: none;
      }
      :host([type="ring"]) {
        color: #4285f4;
      }
      :host([type="spin"]) {
        color: #404040;
      }

      #main {
        width: 100%;
        height: 100%;
      }

      svg {
        color: inherit;
        width: 100%;
        height: 100%;
      }
    </style>

    <main id="main"></main>
  </template>
`;

  let ringThrobberSVG = `
  <svg viewBox="0 0 100 100">
    <style>
      ellipse {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-dasharray: 10, 1000;
        animation: dash-animation 2s cubic-bezier(0.8, 0.25, 0.25, 0.9) infinite, rotate-animation 2s linear infinite;
        transform-origin: center;
      }

      @keyframes rotate-animation {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes dash-animation {
        50% {
          stroke-dasharray: 200;
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dasharray: 245;
          stroke-dashoffset: -260;
        }
      }
    </style>

    <ellipse ry="40" rx="40" cy="50" cx="50" stroke-width="10"/>
  </svg>
`;

  let spinThrobberSVG = `
  <svg viewBox="0 0 100 100">
    <style>
      rect {
        x: 46.5px;
        y: 40px;
        width: 7px;
        height: 22px;
        rx: 5px;
        ry: 5px;
        fill: currentColor;
      }
    </style>

    <rect transform="rotate(0 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(30 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(60 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.17s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(90 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(120 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.33s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(150 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.42s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(180 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(210 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.58s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(240 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.66s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(270 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(300 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.83s" repeatCount="indefinite" />
    </rect>
    <rect transform="rotate(330 50 50) translate(0 -38)">
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.92s" repeatCount="indefinite" />
    </rect>
  </svg>
`;

  class XThrobberElement extends HTMLElement {
    static get observedAttributes() {
      return ["type"];
    }

    // @type
    //   "ring" || "spin"
    // @default
    //   "ring"
    // @attribute
    get type() {
      return this.hasAttribute("type") ? this.getAttribute("type") : "ring";
    }
    set type(type) {
      this.setAttribute("type", type);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$w.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "type") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async _update() {
      this["#main"].innerHTML = (this.type === "ring") ? ringThrobberSVG : spinThrobberSVG;

      if (this.hasAttribute("type") === false) {
        this.setAttribute("type", this.type);
      }
    }
  }

  customElements.define("x-throbber", XThrobberElement);

  let {PI: PI$2, sqrt: sqrt$2, atan2: atan2$1, sin, cos, pow: pow$2} = Math;

  let shadowHTML$3 = `
  <style>
    :host {
      display: block;
      width: 100%;
      user-select: none;
    }
    :host([hidden]) {
      display: none;
    }

    /**
     * Hue-saturation slider
     */

    #huesat-slider {
      display: flex;
      position: relative;
      width: 100%;
      height: auto;
      touch-action: pinch-zoom;
    }

    #huesat-image {
      width: 100%;
      height: 100%;
      border-radius: 999px;
      pointer-events: none;
    }

    #huesat-marker {
      position: absolute;
      top: 0%;
      left: 0%;
      width: var(--marker-size);
      height: var(--marker-size);
      transform: translate(calc(var(--marker-size) / -2), calc(var(--marker-size) / -2));
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.3);
      border: 3px solid white;
      border-radius: 999px;
      box-shadow: 0 0 3px black;
      --marker-size: 20px;
    }

    /**
     * Value slider
     */

    #value-slider {
      width: 100%;
      height: 28px;
      margin-top: 10px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border: 1px solid #cecece;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }

    #value-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #value-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }

    /**
     * Alpha slider
     */

    #alpha-slider {
      display: none;
      width: 100%;
      height: 28px;
      margin-top: 14px;
      padding: 0 calc(var(--marker-width) / 2);
      box-sizing: border-box;
      border: 1px solid #cecece;
      border-radius: 2px;
      touch-action: pan-y;
      --marker-width: 18px;
    }
    :host([alphaslider]) #alpha-slider {
      display: block;
    }

    #alpha-slider-track {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
    }

    #alpha-slider-marker {
      position: absolute;
      left: 0%;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 3px black;
      box-sizing: border-box;
      transform: translateX(calc((var(--marker-width) / 2) * -1));
      border: 3px solid white;
      width: var(--marker-width);
      height: 32px;
      position: absolute;
    }
  </style>

  <x-box vertical>
    <div id="huesat-slider">
      <img id="huesat-image" src="node_modules/xel/images/wheel-spectrum.png"></img>
      <div id="huesat-marker"></div>
    </div>

    <div id="value-slider">
      <div id="value-slider-track">
        <div id="value-slider-marker"></div>
      </div>
    </div>

    <div id="alpha-slider">
      <div id="alpha-slider-track">
        <div id="alpha-slider-marker"></div>
      </div>
    </div>
  </x-box>
`;

  // @events
  //   change
  //   changestart
  //   changeend
  class XWheelColorPickerElement extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }

    // @type
    //   string
    // @default
    //   "hsla(0, 0%, 100%, 1)"
    // @attribute
    get value() {
      return this.hasAttribute("value") ? this.getAttribute("value") : "hsla(0, 0%, 100%, 1)";
    }
    set value(value) {
      this.setAttribute("value", value);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      // Note that HSVA color model is used only internally
      this._h = 0;   // Hue (0 ~ 360)
      this._s = 0;   // Saturation (0 ~ 100)
      this._v = 100; // Value (0 ~ 100)
      this._a = 1;   // Alpha (0 ~ 1)

      this._isDraggingHuesatMarker = false;
      this._isDraggingValueSliderMarker = false;
      this._isDraggingAlphaSliderMarker = false;

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.innerHTML = shadowHTML$3;

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      this["#huesat-slider"].addEventListener("pointerdown", (event) => this._onHuesatSliderPointerDown(event));
      this["#value-slider"].addEventListener("pointerdown", (event) => this._onValueSliderPointerDown(event));
      this["#alpha-slider"].addEventListener("pointerdown", (event) => this._onAlphaSliderPointerDown(event));
    }

    connectedCallback() {
      this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      else if (name === "value") {
        this._onValueAttributeChange();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this._updateHuesatMarker();
      this._updateValueSliderMarker();
      this._updateValueSliderBackground();
      this._updateAlphaSliderMarker();
      this._updateAlphaSliderBackground();
    }

    _updateHuesatMarker() {
      let h = this._h;
      let s = this._s;

      let wheelSize = 100;
      let angle = degToRad(h);
      let radius = (s / 100) * wheelSize/2;
      let centerPoint = {x: wheelSize/2, y: wheelSize/2};

      let x = ((wheelSize - (centerPoint.x + (radius * cos(angle)))) / wheelSize) * 100;
      let y = ((centerPoint.y - (radius * sin(angle))) / wheelSize) * 100;

      this["#huesat-marker"].style.left = x + "%";
      this["#huesat-marker"].style.top = y + "%";
    }

    _updateValueSliderMarker() {
      this["#value-slider-marker"].style.left = (100 - normalize(this._v, 0, 100, 2)) + "%";
    }

    _updateValueSliderBackground() {
      let gradientBackground = "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1))";
      let solidBackground = serializeColor([this._h, this._s, 100, 1], "hsva", "hex");
      this["#value-slider"].style.background = `${gradientBackground}, ${solidBackground}`;
    }

    _updateAlphaSliderMarker() {
      this["#alpha-slider-marker"].style.left = normalize((1 - this._a) * 100, 0, 100, 2) + "%";
    }

    _updateAlphaSliderBackground() {
      let [r, g, b] = hsvToRgb(this._h, this._s, this._v).map($0 => round($0, 0));
      let backroundA = `url(node_modules/xel/images/checkboard.png) repeat 0 0`;
      let background = `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`;
      this["#alpha-slider"].style.background = background + "," + backroundA;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _onValueAttributeChange() {
      if (
        this._isDraggingHuesatMarker === false &&
        this._isDraggingValueSliderMarker === false &&
        this._isDraggingAlphaSliderMarker === false
      ) {
        let [h, s, v, a] = parseColor(this.value, "hsva");

        this._h = h;
        this._s = s;
        this._v = v;
        this._a = a;

        this._update();
      }
    }

    _onHuesatSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let pointerMoveListener, lostPointerCaptureListener;
      let wheelBounds = this["#huesat-slider"].getBoundingClientRect();

      this._isDraggingHuesatMarker = true;
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      this["#huesat-slider"].style.cursor = "default";
      this["#huesat-slider"].setPointerCapture(pointerDownEvent.pointerId);

      let onPointerMove = (clientX, clientY) => {
        let radius = wheelBounds.width / 2;
        let x = clientX - wheelBounds.left - radius;
        let y = clientY - wheelBounds.top - radius;
        let d = pow$2(x, 2) + pow$2(y, 2);
        let theta = atan2$1(y, x);

        if (d > pow$2(radius, 2)) {
          x = radius * cos(theta);
          y = radius * sin(theta);
          d = pow$2(x, 2) + pow$2(y, 2);
          theta = atan2$1(y, x);
        }

        this._h = round(((theta + PI$2) / (PI$2 * 2)) * 360, 3);
        this._s = round((sqrt$2(d) / radius) * 100, 3);

        this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");
        this.dispatchEvent(new CustomEvent("change", {bubbles: true}));

        this._updateHuesatMarker();
        this._updateValueSliderBackground();
        this._updateAlphaSliderBackground();
      };

      onPointerMove(pointerDownEvent.clientX, pointerDownEvent.clientY);

      this["#huesat-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX, pointerMoveEvent.clientY);
      });

      this["#huesat-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = (event) => {
        this["#huesat-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#huesat-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this["#huesat-slider"].style.cursor = null;

        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
        this._isDraggingHuesatMarker = false;
      });
    }

    _onValueSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#value-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingValueSliderMarker = true;
      this["#value-slider"].style.cursor = "default";
      this["#value-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let v = 100 - ((clientX - trackBounds.x) / trackBounds.width) * 100;
        v = normalize(v, 0, 100, 2);

        if (v !== this._v) {
          this._v = v;
          this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");

          this._updateValueSliderMarker();
          this._updateAlphaSliderBackground();

          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#value-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#value-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#value-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#value-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this["#value-slider"].style.cursor = null;

        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
        this._isDraggingValueSliderMarker = false;
      });
    }

    _onAlphaSliderPointerDown(pointerDownEvent) {
      if (pointerDownEvent.buttons !== 1) {
        return;
      }

      let trackBounds = this["#alpha-slider-track"].getBoundingClientRect();
      let pointerMoveListener, lostPointerCaptureListener;

      this._isDraggingAlphaSliderMarker = true;
      this["#alpha-slider"].style.cursor = "default";
      this["#alpha-slider"].setPointerCapture(pointerDownEvent.pointerId);
      this.dispatchEvent(new CustomEvent("changestart", {bubbles: true}));

      let onPointerMove = (clientX) => {
        let a = 1 - ((clientX - trackBounds.x) / trackBounds.width);
        a = normalize(a, 0, 1, 2);

        if (a !== this._a) {
          this._a = a;
          this.value = serializeColor([this._h, this._s, this._v, this._a], "hsva", "hsla");
          this._updateAlphaSliderMarker();
          this.dispatchEvent(new CustomEvent("change", {bubbles: true}));
        }
      };

      onPointerMove(pointerDownEvent.clientX);

      this["#alpha-slider"].addEventListener("pointermove", pointerMoveListener = (pointerMoveEvent) => {
        onPointerMove(pointerMoveEvent.clientX);
      });

      this["#alpha-slider"].addEventListener("lostpointercapture", lostPointerCaptureListener = () => {
        this["#alpha-slider"].removeEventListener("pointermove", pointerMoveListener);
        this["#alpha-slider"].removeEventListener("lostpointercapture", lostPointerCaptureListener);
        this["#alpha-slider"].style.cursor = null;

        this.dispatchEvent(new CustomEvent("changeend", {bubbles: true}));
        this._isDraggingAlphaSliderMarker = false;
      });
    }
  }
  customElements.define("x-wheelcolorpicker", XWheelColorPickerElement);

  // @copyright
  //   © 2016-2017 Jarosław Foksa

  // @info
  //   Retrieve the path to the currently loaded theme, defaulting to "vanilla.theme.css".
  // @type
  //   (void) => string
  let getThemePath = () => {
    let themeStyleElement = document.querySelector(`link[href*="/themes/"]`);
    let themePath = "node_modules/xel/themes/vanilla.css";

    if (themeStyleElement) {
      themePath = themeStyleElement.getAttribute("href");
    }

    return themePath;
  };

  // @info
  //   Retrieve the base name of the currently loaded theme, defaulting to "vanilla".
  // @type
  //   (void) => string
  let getThemeName = () => {
    let path  = getThemePath();
    let startIndex = path.lastIndexOf("/") + 1;
    let endIndex = path.length - 4;
    let theme = (endIndex > startIndex ? path.substring(startIndex, endIndex) : "vanilla");
    return theme;
  };

  let colorSchemesByTheme = {
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
    },
  };

  let shadowTemplate$x = html`
  <template>
    <link rel="stylesheet" href="${getThemePath()}">

    <style>
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }

      #main {
        position: relative;
        display: flex;
        flex-flow: row;
        width: 100%;
        height: 100%;
      }

      /**
       * Navigation
       */

      #sidebar {
        position: relative;
        width: 270px;
        overflow: auto;
        box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
                    0px 1px 1px 0px rgba(0,0,0,0.14),
                    0px 1px 3px 0px rgba(0,0,0,0.12);
        z-index: 100;
      }

      #sidebar #header {
        padding: 20px 0;
      }

      #sidebar #header + hr {
        margin-top: -1px;
      }

      #sidebar h1 {
        margin: 0px 22px 0px 104px;
        line-height: 1;
      }

      #sidebar #nav {
        margin-bottom: 20px;
        width: 100%;
      }

      #sidebar #nav .external-link-icon {
        margin: 0;
        width: 20px;
        height: 20px;
      }

      #sidebar #nav x-button {
        width: calc(100% + 60px);
        margin-left: -30px;
        padding: 8px 30px;
        --ripple-background: white;
      }

      #sidebar #nav x-button x-label {
        font-size: 15px;
      }

      #hide-sidebar-button {
        position: absolute;
        top: 18px;
        left: 11px;
        padding: 0;
        width: 32px;
        height: 32px;
        min-height: 32px;
      }

      #show-sidebar-button {
        position: absolute;
        top: 20px;
        left: 11px;
        z-index: 10;
        padding: 0;
        width: 32px;
        height: 32px;
        min-height: 32px;
      }

      #theme-section {
        padding: 10px 0px;
      }

      #theme-section #theme-heading {
        margin-top: 0;
      }

      #theme-section x-select {
        width: 100%;
      }

      #theme-section #theme-select {
        margin-bottom: 14px;
      }

      /**
       * Views
       */

      #views {
        display: block;
        width: 100%;
        height: 100%;
        min-width: 20px;
        min-height: 20px;
        position: relative;
        flex: 1;
      }

      #views > .view {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
      }
      #views > .view:not([selected]) {
        display: none !important;
      }

      #views > .view > article {
        padding: 0 70px;
        margin: 0 auto;
        max-width: 780px;
        box-sizing: border-box;
      }

      #views section {
        margin-bottom: 35px;
      }

      #views section[hidden] + hr,
      #views section[data-last-visible] + hr {
        display: none;
      }

      #views section h3,
      #views section h4,
      #views section h5 {
        position: relative;
      }

      /* "About" view */

      #views #about-view {
        color: white;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 0 100px;
        margin: 0;
        max-width: none;
        box-sizing: border-box;
      }

      #about-view h1 {
        font-size: 170px;
        font-weight: 700;
        line-height: 1.5;
        margin: 0 0 50px 0;
        padding: 0;
        line-height: 1;
      }
      @media screen and (max-width: 880px) {
        #about-view h1  {
          font-size: 120px;
        }
      }

      #about-view h2 {
        font-size: 27px;
        font-weight: 400;
        line-height: 1.05;
        color: rgba(255,255,255, 0.8);
        margin: 0 0 20px 0;
        text-transform: none;
      }

      #about-view h2 em {
        color: rgba(255,255,255, 0.95);
        font-style: normal;
        font-weight: 700;
      }

      /* "Setup" view */

      #views #setup-view h3 {
        margin-bottom: 0;
      }

      #views #setup-view h3 x-icon {
        width: 40px;
        height: auto;
        display: inline-block;
        vertical-align: middle;
      }

      #views #setup-view pre {
        display: block;
        white-space: pre;
        overflow: auto;
      }

      #views #setup-view dd {
        margin: 0 0 18px 0;
      }
      #views #setup-view dd:last-of-type {
        margin: 0;
      }

      /* "FAQ" view */

      #views #faq-view h4 {
        margin-top: 0;
      }

      /* "Resources" view */

      #views #resources-view ul {
        margin-bottom: 0;
        padding-left: 20px;
      }
    </style>

    <main id="main">
      <x-button id="show-sidebar-button" icon="menu" skin="textured">
        <x-icon name="menu"></x-icon>
      </x-button>

      <sidebar id="sidebar">
        <header id="header">
          <h1 id="logo">Xel</h1>

          <x-button id="hide-sidebar-button" skin="textured">
            <x-icon name="chevron-left"></x-icon>
          </x-button>
        </header>

        <hr/>

        <nav id="nav">
          <section>
            <a href="/">
              <x-button skin="nav">
                <x-icon name="info"></x-icon>
                <x-label>About</x-label>
              </x-button>
            </a>

            <a href="/setup">
              <x-button skin="nav">
                <x-icon name="build"></x-icon>
                <x-label>Setup</x-label>
              </x-button>
            </a>

            <a href="/faq">
              <x-button skin="nav">
                <x-icon name="question-answer"></x-icon>
                <x-label>FAQ</x-label>
              </x-button>
            </a>

            <a href="/resources">
              <x-button skin="nav">
                <x-icon name="book"></x-icon>
                <x-label>Resources</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <a href="https://github.com/jarek-foksa/xel" target="_blank">
              <x-button skin="nav">
                <x-icon name="code"></x-icon>
                <x-label>Source Code</x-label>
                <x-icon class="external-link-icon" name="exit-to-app"></x-icon>
              </x-button>
            </a>

            <a href="https://github.com/jarek-foksa/xel/issues" target="_blank">
              <x-button skin="nav">
                <x-icon name="bug-report"></x-icon>
                <x-label>Bugs</x-label>
                <x-icon class="external-link-icon" name="exit-to-app"></x-icon>
              </x-button>
            </a>

            <a href="https://github.com/jarek-foksa/xel/commits" target="_blank">
              <x-button skin="nav">
                <x-icon name="event"></x-icon>
                <x-label>Changelog</x-label>
                <x-icon class="external-link-icon" name="exit-to-app"></x-icon>
              </x-button>
            </a>
          </section>

          <hr/>

          <section id="theme-section">
            <div id="theme-subsection">
              <h3 id="theme-heading">Theme</h3>

              <x-select id="theme-select">
                <x-menu>
                  <x-menuitem value="macos">
                    <x-label>MacOS</x-label>
                  </x-menuitem>

                  <x-menuitem value="material" toggled>
                    <x-label>Material</x-label>
                  </x-menuitem>

                  <x-menuitem value="vanilla">
                    <x-label>Vanilla</x-label>
                  </x-menuitem>
                </x-menu>
              </x-select>
            </div>

            <div id="accent-color-subsection">
              <h3>Accent color</h3>

              <x-select id="accent-color-select">
                <x-menu id="accent-color-menu"></x-menu>
              </x-select>
            </div>
          </section>

          <hr/>

          <section>
            <h3>Primitives</h3>

            <a href="/elements/x-box">
              <x-button skin="nav">
                <x-label>x-box</x-label>
              </x-button>
            </a>

            <a href="/elements/x-card">
              <x-button skin="nav">
                <x-label>x-card</x-label>
              </x-button>
            </a>

            <a href="/elements/x-accordion">
              <x-button skin="nav">
                <x-label>x-accordion</x-label>
              </x-button>
            </a>

            <a href="/elements/x-icon">
              <x-button skin="nav">
                <x-label>x-icon</x-label>
              </x-button>
            </a>

            <a href="/elements/x-label">
              <x-button skin="nav">
                <x-label>x-label</x-label>
              </x-button>
            </a>

            <a href="/elements/x-shortcut">
              <x-button skin="nav">
                <x-label>x-shortcut</x-label>
              </x-button>
            </a>

            <a href="/elements/x-stepper">
              <x-button skin="nav">
                <x-label>x-stepper</x-label>
              </x-button>
            </a>

            <a href="/elements/x-swatch">
              <x-button skin="nav">
                <x-label>x-swatch</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Buttons</h3>

            <a href="/elements/x-button">
              <x-button skin="nav">
                <x-label>x-button</x-label>
              </x-button>
            </a>

            <a href="/elements/x-buttons">
              <x-button skin="nav">
                <x-label>x-buttons</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Tabs</h3>

            <a href="/elements/x-tabs">
              <x-button skin="nav">
                <x-label>x-tabs</x-label>
              </x-button>
            </a>

            <a href="/elements/x-doctabs">
              <x-button skin="nav">
                <x-label>x-doctabs</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Menus</h3>

            <a href="/elements/x-menu">
              <x-button skin="nav">
                <x-label>x-menu</x-label>
              </x-button>
            </a>

            <a href="/elements/x-menuitem">
              <x-button skin="nav">
                <x-label>x-menuitem</x-label>
              </x-button>
            </a>

            <a href="/elements/x-menubar">
              <x-button skin="nav">
                <x-label>x-menubar</x-label>
              </x-button>
            </a>

            <a href="/elements/x-contextmenu">
              <x-button skin="nav">
                <x-label>x-contextmenu</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Popups</h3>

            <a href="/elements/dialog">
              <x-button skin="nav">
                <x-label>dialog</x-label>
              </x-button>
            </a>

            <a href="/elements/x-popover">
              <x-button skin="nav">
                <x-label>x-popover</x-label>
              </x-button>
            </a>

            <a href="/elements/x-notification">
              <x-button skin="nav">
                <x-label>x-notification</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Forms</h3>

            <a href="/elements/x-checkbox">
              <x-button skin="nav">
                <x-label>x-checkbox</x-label>
              </x-button>
            </a>

            <a href="/elements/x-radio">
              <x-button skin="nav">
                <x-label>x-radio</x-label>
              </x-button>
            </a>

            <a href="/elements/x-switch">
              <x-button skin="nav">
                <x-label>x-switch</x-label>
              </x-button>
            </a>

            <a href="/elements/x-select">
              <x-button skin="nav">
                <x-label>x-select</x-label>
              </x-button>
            </a>

            <a href="/elements/x-colorselect">
              <x-button skin="nav">
                <x-label>x-colorselect</x-label>
              </x-button>
            </a>

            <a href="/elements/x-dateselect">
              <x-button skin="nav">
                <x-label>x-dateselect</x-label>
              </x-button>
            </a>

            <a href="/elements/x-input">
              <x-button skin="nav">
                <x-label>x-input</x-label>
              </x-button>
            </a>

            <a href="/elements/x-numberinput">
              <x-button skin="nav">
                <x-label>x-numberinput</x-label>
              </x-button>
            </a>

            <a href="/elements/x-taginput">
              <x-button skin="nav">
                <x-label>x-taginput</x-label>
              </x-button>
            </a>

            <a href="/elements/x-textarea">
              <x-button skin="nav">
                <x-label>x-textarea</x-label>
              </x-button>
            </a>

            <a href="/elements/x-slider">
              <x-button skin="nav">
                <x-label>x-slider</x-label>
              </x-button>
            </a>
          </section>

          <hr/>

          <section>
            <h3>Progress</h3>

            <a href="/elements/x-progressbar">
              <x-button skin="nav">
                <x-label>x-progressbar</x-label>
              </x-button>
            </a>

            <a href="/elements/x-throbber">
              <x-button skin="nav">
                <x-label>x-throbber</x-label>
              </x-button>
            </a>
          </section>
        </nav>
      </sidebar>

      <div id="views"></div>
    </main>
  </template>
`;

  class XelAppElement extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$x.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }

      window.addEventListener("load", (event) => this._onWindowLoad(event));
      window.addEventListener("popstate", (event) => this._onPopState(event));
      window.addEventListener("beforeunload", (event) => this._onWindowUnload(event));

      this._shadowRoot.addEventListener("click", (event) => this._onShadowRootClick(event));
      this["#hide-sidebar-button"].addEventListener("click", (event) => this._onHideNavButtonClick(event));
      this["#show-sidebar-button"].addEventListener("click", (event) => this._onShowNavButtonClick(event));
      this["#theme-select"].addEventListener("change", (event) => this._onThemeSelectChange(event));
      this["#accent-color-select"].addEventListener("change", (event) => this._onAccentColorSelectChange(event));
    }

    connectedCallback() {
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

    async _onThemeSelectChange() {
      sessionStorage.setItem("theme", this["#theme-select"].value);
      await sleep(800);
      location.reload();
    }

    _onAccentColorSelectChange() {
      sessionStorage.setItem("accentColorName", this["#accent-color-select"].value);
      this._applyAccentColor();
    }

    _onWindowLoad() {
      let scrollTop = parseInt(sessionStorage.getItem("selectedViewScrollTop") || "0");
      let selectedView = this["#views"].querySelector(".view[selected]");

      if (selectedView) {
        selectedView.scrollTop = scrollTop;
      }
      else {
        sleep(100).then(() => {
          selectedView = this["#views"].querySelector(".view[selected]");
          selectedView.scrollTop = scrollTop;
        });
      }
    }

    _onWindowUnload(event) {
      let selectedView = this["#views"].querySelector(".view[selected]");
      sessionStorage.setItem("selectedViewScrollTop", selectedView.scrollTop);
    }

    _onPopState(event) {
      this._updateNavButtons();
      this._updateViews();
    }

    _onShadowRootClick(event) {
      let {ctrlKey, shiftKey, metaKey, target} = event;

      if (ctrlKey === false && shiftKey === false && metaKey === false) {
        let anchor = target.closest("a");

        if (anchor) {
          let url = new URL(anchor.href);

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

    _onHideNavButtonClick(event) {
      if (event.button === 0) {
        this._hideSidebar();
      }
    }

    _onShowNavButtonClick(event) {
      if (event.button === 0) {
        this._showSidebar();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _showSidebar() {
      return new Promise(async (resolve) => {
        this["#sidebar"].hidden = false;

        let {width, height, marginLeft} = getComputedStyle(this["#sidebar"]);
        let fromMarginLeft = (marginLeft === "0px" && width !== "auto" ? `-${width}` : marginLeft);
        let toMarginLeft = "0px";

        let animation = this["#sidebar"].animate(
          {
            marginLeft: [fromMarginLeft, toMarginLeft]
          },
          {
            duration: 250,
            easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          }
        );

        this["#sidebar"].style.marginLeft = "0";
        this._currentAnimation = animation;
      });
    }

    _hideSidebar() {
      return new Promise(async (resolve) => {
        this["#sidebar"].hidden = false;

        let {width, height, marginLeft} = getComputedStyle(this["#sidebar"]);
        let fromMarginLeft = (marginLeft === "0px" && width !== "auto" ? "0px" : marginLeft);
        let toMarginLeft = `-${width}`;

        let animation = this["#sidebar"].animate(
          {
            marginLeft: [fromMarginLeft, toMarginLeft]
          },
          {
            duration: 250,
            easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
          }
        );

        this["#sidebar"].style.marginLeft = toMarginLeft;
        this._currentAnimation = animation;

        await animation.finished;

        if (this._currentAnimation === animation) {
          this["#sidebar"].hidden = true;
        }
      });
    }

    _applyAccentColor() {
      let accentColorName = sessionStorage.getItem("accentColorName");

      if (accentColorName !== null) {
        let themeName = getThemeName();
        let accentColor = colorSchemesByTheme[themeName][accentColorName];

        if (!accentColor) {
          let names = Object.keys(colorSchemesByTheme[themeName]);

          if (names.length > 0) {
            accentColor = colorSchemesByTheme[themeName][names[0]];
          }
        }

        if (accentColor) {
          let [h, s, l] = parseColor(accentColor, "hsla");
          document.body.style.setProperty("--accent-color-h", h);
          document.body.style.setProperty("--accent-color-s", s + "%");
          document.body.style.setProperty("--accent-color-l", l + "%");
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // @info
    //   Update selected nav button to match current location.
    _updateNavButtons() {
      for (let button of this["#nav"].querySelectorAll("x-button")) {
        let anchor = button.closest("a");

        if (anchor) {
          let url = new URL(anchor);

          if (url.origin === location.origin && url.pathname === location.pathname) {
            button.setAttribute("toggled", "");
          }
          else {
            button.removeAttribute("toggled");
          }
        }
      }
    }

    // @info
    //   Update displayed view to match current location
    async _updateViews() {
      let selectedView = this["#views"].querySelector(".view[selected]");

      if (!selectedView || selectedView.dataset.pathname !== location.pathname) {
        let view = this["#views"].querySelector(`[data-pathname="${location.pathname}"]`);

        // If the view does not exist, try to create it
        if (!view) {
          let url = "";

          if (location.pathname === "/") {
            url = "docs/about.html";
          }
          else if (location.pathname.startsWith("/elements/")) {
            url = "docs" + location.pathname.substring(9) + ".html";
          }
          else {
            url = "docs" + location.pathname + ".html";
          }

          let viewHTML = await readFile(url);
          view = html`${viewHTML}`;
          view.setAttribute("data-pathname", location.pathname);
          this["#views"].append(view);
        }

        if (location.pathname === "/") {
          document.querySelector("title").textContent = "Xel";
        }
        else {
          document.querySelector("title").textContent = "Xel - " + view.querySelector("h2").textContent;
        }

        // Toggle view
        {
          let view = this["#views"].querySelector(`[data-pathname="${location.pathname}"]`);
          let otherView = this["#views"].querySelector(`.view[selected]`);

          if (otherView) {
            if (otherView === view) {
              return;
            }
            else {
              otherView.removeAttribute("selected");
            }
          }

          view.setAttribute("selected", "");
        }

        // Hide theme-specific sections that don't match the current theme
        {
          let themeName = getThemeName();

          for (let section of view.querySelectorAll("section")) {
            if (section.hasAttribute("data-themes")) {
              if (section.getAttribute("data-themes").includes(themeName) === false) {
                section.hidden = true;
              }
            }
          }

          let visibleSections = view.querySelectorAll("section:not([hidden])");

          if (visibleSections.length > 0) {
            let lastVisibleSection = visibleSections[visibleSections.length-1];
            lastVisibleSection.setAttribute("data-last-visible", "");
          }
        }

        // Remove offscreen views
        {
          for (let view of [...this["#views"].children]) {
            if (view.hasAttribute("animating") === false && view.hasAttribute("selected") === false) {
              view.remove();
            }
          }
        }
      }
    }

    _updateThemeSection() {
      let themeName = getThemeName();

      // Update theme subsection
      {
        for (let item of this["#theme-select"].querySelectorAll("x-menuitem")) {
          if (item.getAttribute("value") === themeName) {
            item.setAttribute("toggled", "");
          }
          else {
            item.removeAttribute("toggled");
          }
        }
      }

      // Update accent color subsection
      {
        if (themeName === "material") {
          this["#accent-color-subsection"].hidden = true;
        }
        else {
          let accentColorName = sessionStorage.getItem("accentColorName");
          let supportedAccentColorNames = Object.keys(colorSchemesByTheme[themeName]);

          let itemsHTML = "";

          for (let [colorName, colorValue] of Object.entries(colorSchemesByTheme[themeName])) {
            itemsHTML += `
            <x-menuitem value="${colorName}" toggled>
              <x-swatch value="${colorValue}"></x-swatch>
              <x-label>${capitalize(colorName)}</x-label>
            </x-menuitem>
          `;
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
            }
            else {
              accentColorName = null;
            }
          }

          for (let item of this["#accent-color-select"].querySelectorAll("x-menuitem")) {
            if (item.getAttribute("value") === accentColorName) {
              item.setAttribute("toggled", "");
            }
            else {
              item.removeAttribute("toggled");
            }
          }

          this["#accent-color-subsection"].hidden = false;
        }
      }
    }
  }

  customElements.define("xel-app", XelAppElement);

  let shadowTemplate$y = html`
  <template>
    <style>
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        background: white;
        padding: 14px;
        --selection-background: #B2D7FD;
      }

      ::selection {
        background: var(--selection-background);
      }

      #code {
        display: block;
        white-space: pre-wrap;
        overflow-x: auto;
        font-size: 13px;
        line-height: 18px;
        outline: none;
        background: none;
        padding: 0;
      }
    </style>

    <link id="prism-theme" rel="stylesheet">
    <code id="code" class="language-html"></code>
  </template>
`;

  class XelCodeViewElement extends HTMLElement {
    // @type
    //   string
    // @default
    //   ""
    get value() {
      return this._value;
    }
    set value(value) {
      this._value = value;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$y.content, true));

      this._value = "";

      this._observer = new MutationObserver(() => this._update());
      this._observer.observe(this, {childList: true, attributes: false, characterData: true, subtree: true});

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this["#prism-theme"].setAttribute("href", "node_modules/prismjs/themes/prism-coy.css");
      this._update();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _update() {
      this["#code"].textContent = this.textContent;

      if (this["#code"].textContent !== "") {
        Prism.highlightElement(this["#code"], true);
      }
    }
  }

  customElements.define("xel-codeview", XelCodeViewElement);

  let counter = 0;

  let shadowTemplate$z = html`
  <template>
    <style>
      :host {
        display: block;
      }

      #code-view {
        margin-top: 25px;
      }
      :host([compact]) #code-view {
        max-height: 350px;
        overflow: scroll;
      }
    </style>

    <link rel="stylesheet" href="${getThemePath()}">

    <main>
      <div id="live-view"></div>
      <xel-codeview id="code-view"></xel-codeview>
    </main>
  </template>
`;

  class XelDemoElement extends HTMLElement {
    static get observedAttributes() {
      return ["name"];
    }

    // @info
    //   Compact demo has a scrollable code view with limited max height.
    // @type
    //   boolean
    // @default
    //   false
    // @attribute
    get compact() {
      return this.hasAttribute("compact");
    }
    set compact(compact) {
      compact ? this.setAttribute("compact", "") : this.removeAttribute("compact");
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: "closed"});
      this._shadowRoot.append(document.importNode(shadowTemplate$z.content, true));

      for (let element of this._shadowRoot.querySelectorAll("[id]")) {
        this["#" + element.id] = element;
      }
    }

    connectedCallback() {
      this["#code-view"].textContent = this._getDemoHTML();
    }

    attributeChangedCallback(name) {
      if (name === "name") {
        this._update();
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    _getDemoHTML() {
      let container = document.createElement("div");
      let template = this.querySelector("template");

      if (!template) {
        return "";
      }

      let content = document.importNode(template.content, true);

      {
        let liveViewContent = content.cloneNode(true);
        window["shadowRoot" + counter] = this["#live-view"];
        let script = liveViewContent.querySelector("script");

        if (script) {
          let textContent = replaceAll(script.textContent, "document", `window.shadowRoot${counter}`);
          textContent = "{" + textContent + "}";
          script.textContent = textContent;
        }

        counter += 1;

        this["#live-view"].append(liveViewContent);
      }

      for (let child of content.childNodes) {
        container.append(child.cloneNode(true));
      }

      // Remove dynamically added attributes
      for (let element of container.querySelectorAll("*")) {
        if (element.localName.startsWith("x-")) {
          for (let {name, value} of [...element.attributes]) {
            if (name === "tabindex" || name === "role" || name.startsWith("aria")) {
              element.removeAttribute(name);
            }
          }
        }
      }

      let textContent = container.innerHTML;

      // Simplify boolean attributes
      textContent = replaceAll(textContent, `=""`, "");
      textContent = replaceAll(textContent, "demo", "document");

      let lines = textContent.split("\n");

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
        let minIndent = Infinity;

        for (let line of lines) {
          if (isDOMWhitespace(line) === false) {
            let indent = 0;

            for (let char of line) {
              if (char === " ") {
                indent += 1;
              }
              else {
                break;
              }
            }

            if (indent < minIndent) {
              minIndent = indent;
            }
          }
        }

        lines = lines.map(line => line.substring(minIndent));
      }

      let innerHTML = lines.join("\n");
      return innerHTML;
    }
  }

  customElements.define("xel-demo", XelDemoElement);

}());
