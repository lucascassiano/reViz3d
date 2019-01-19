process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"NyPj":[function(require,module,exports) {
"use strict";module.exports="logo.d0dafcaa.svg";
},{}],"6cnO":[function(require,module,exports) {
"use strict";module.exports="github.eed41466.svg";
},{}],"pKEH":[function(require,module,exports) {
"use strict";
},{}],"rMii":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.updateSelectedObject=exports.updateScene=exports.toggleMenu=void 0;var e=require("redux"),t={menuIsOpen:!0,project:{name:null,path:null},environment:{selectedObject:null,scene:null}},n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"TOGGLE_MENU":var r=!e.menuIsOpen;return Object.assign({},e,{menuIsOpen:r});case"UPDATE_SCENE":var s=Object.assign({},e.environment,{scene:n.scene});return Object.assign({},e,{environment:s});case"UPDATE_SELECTED_OBJECT":s=Object.assign({},e.environment,{selectedObject:n.object});return Object.assign({},e,{environment:s});default:return e}},r=(0,e.createStore)(n),s=function(){r.dispatch({type:"TOGGLE_MENU"})};exports.toggleMenu=s;var c=function(e){r.dispatch({type:"UPDATE_SCENE",scene:e})};exports.updateScene=c;var a=function(e){r.dispatch({type:"UPDATE_SELECTED_OBJECT",object:e})};exports.updateSelectedObject=a;var o=r;exports.default=o;
},{}],"8h4T":[function(require,module,exports) {
"use strict";var e=require("@babel/runtime/helpers/interopRequireWildcard"),t=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var l=t(require("@babel/runtime/helpers/classCallCheck")),a=t(require("@babel/runtime/helpers/createClass")),n=t(require("@babel/runtime/helpers/possibleConstructorReturn")),r=t(require("@babel/runtime/helpers/getPrototypeOf")),u=t(require("@babel/runtime/helpers/inherits")),i=t(require("@babel/runtime/helpers/assertThisInitialized")),o=t(require("@babel/runtime/helpers/defineProperty")),c=e(require("react")),s=require("@blueprintjs/core"),d=require("../store"),f=require("react-redux"),m=function(e){function t(){var e,a;(0,l.default)(this,t);for(var u=arguments.length,c=new Array(u),s=0;s<u;s++)c[s]=arguments[s];return a=(0,n.default)(this,(e=(0,r.default)(t)).call.apply(e,[this].concat(c))),(0,o.default)((0,i.default)((0,i.default)(a)),"xChange",function(e){a.props.object.position.x=e}),(0,o.default)((0,i.default)((0,i.default)(a)),"yChange",function(e){a.props.object.position.y=e}),(0,o.default)((0,i.default)((0,i.default)(a)),"zChange",function(e){a.props.object.position.z=e}),(0,o.default)((0,i.default)((0,i.default)(a)),"rxChange",function(e){a.props.object.rotation.x=e}),(0,o.default)((0,i.default)((0,i.default)(a)),"ryChange",function(e){a.props.object.rotation.y=e}),(0,o.default)((0,i.default)((0,i.default)(a)),"rzChange",function(e){a.props.object.rotation.z=e}),a}return(0,u.default)(t,e),(0,a.default)(t,[{key:"render",value:function(){var e=this.props.object,t=e?e.name:null,l=e?e.position:{x:0,y:0,z:0},a=e?e.rotation:{x:0,y:0,z:0};return c.default.createElement("div",{className:"menu-object"},c.default.createElement("h2",null,t),"position",c.default.createElement("div",{className:"menu-position"},c.default.createElement("div",{className:"menu-position-cell"},"x",c.default.createElement(s.NumericInput,{fill:!0,value:l?l.x:0,onValueChange:this.xChange})),c.default.createElement("div",{className:"menu-position-cell"},"y",c.default.createElement(s.NumericInput,{fill:!0,value:l?l.y:0,onValueChange:this.yChange})),c.default.createElement("div",{className:"menu-position-cell"},"z",c.default.createElement(s.NumericInput,{fill:!0,value:l?l.z:0,onValueChange:this.zChange}))),"rotation",c.default.createElement("div",{className:"menu-position"},c.default.createElement("div",{className:"menu-position-cell"},"x",c.default.createElement(s.NumericInput,{fill:!0,value:a?a.x:0,onValueChange:this.rxChange})),c.default.createElement("div",{className:"menu-position-cell"},"y",c.default.createElement(s.NumericInput,{fill:!0,value:a?a.y:0,onValueChange:this.ryChange})),c.default.createElement("div",{className:"menu-position-cell"},"z",c.default.createElement(s.NumericInput,{fill:!0,value:a?a.z:0,onValueChange:this.rzChange}))))}}]),t}(c.Component),p=function(e){function t(){return(0,l.default)(this,t),(0,n.default)(this,(0,r.default)(t).apply(this,arguments))}return(0,u.default)(t,e),(0,a.default)(t,[{key:"render",value:function(){var e=this.props.open?"menu":"menu-hidden",t=this.props.environment;console.log("env",t);var l="select a object...";return t.selectedObject&&(l=this.props.environment.selectedObject),c.default.createElement("div",null,c.default.createElement(s.Icon,{icon:"caret-right",className:this.props.open?"menu-caret-open":"menu-caret-closed",onClick:d.toggleMenu,iconSize:20}),c.default.createElement("div",{className:e},c.default.createElement(s.Card,{className:s.Classes.DARK+" content"},c.default.createElement(s.Tabs,{className:"tabs"},c.default.createElement(s.Tab,{id:"rx",title:"Objects",panel:c.default.createElement(m,{object:l})}),c.default.createElement(s.Tab,{id:"ng",title:"Data",panel:c.default.createElement("div",null,"Angular")}),c.default.createElement(s.Tab,{id:"mb",title:"Project",panel:c.default.createElement("div",null,"hiiii")}),c.default.createElement(s.Tabs,null)))))}}]),t}(c.Component),h=function(e){return{menu:e.menuIsOpen,environment:e.environment}},b=function(e){return{toggleMenu:function(){e({type:"TOGGLE_MENU",open:null})}}},v=(0,f.connect)(h,b)(p);exports.default=v;
},{"../store":"rMii"}],"lY9v":[function(require,module,exports) {
"use strict";var e=require("@babel/runtime/helpers/interopRequireWildcard"),r=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=r(require("@babel/runtime/helpers/classCallCheck")),u=r(require("@babel/runtime/helpers/createClass")),n=r(require("@babel/runtime/helpers/possibleConstructorReturn")),i=r(require("@babel/runtime/helpers/getPrototypeOf")),l=r(require("@babel/runtime/helpers/inherits")),o=e(require("react")),s=r(require("react-dom")),a=require("react-hot-loader"),p=r(require("./icons/logo.svg")),c=r(require("./icons/github.svg")),d=require("electron");require("./app.css");var f=require("react-redux"),q=require("./store"),b=r(require("./components/Menu")),h=function(e){function r(){return(0,t.default)(this,r),(0,n.default)(this,(0,i.default)(r).apply(this,arguments))}return(0,l.default)(r,e),(0,u.default)(r,[{key:"render",value:function(){return console.log("props",this.props),o.default.createElement("div",null,o.default.createElement(b.default,{open:this.props.menu}))}}]),r}(o.Component),m=function(e){return{menu:e.menuIsOpen}},v=function(e){return{toggleMenu:function(){e({type:"TOGGLE_MENU",open:null})}}},g=(0,f.connect)(m,v)(h);exports.default=g;
},{"./icons/logo.svg":"NyPj","./icons/github.svg":"6cnO","./app.css":"pKEH","./store":"rMii","./components/Menu":"8h4T"}],"J6gt":[function(require,module,exports) {
"use strict";var e=require("@babel/runtime/helpers/interopRequireWildcard"),t=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=t(require("@babel/runtime/helpers/classCallCheck")),r=t(require("@babel/runtime/helpers/createClass")),n=e(require("three")),i=function(){function e(){(0,o.default)(this,e)}return(0,r.default)(e,[{key:"getObject",value:function(){var e={topColor:{type:"c",value:new n.Color(6316128)},bottomColor:{type:"c",value:new n.Color(2171169)},offset:{type:"f",value:400},exponent:{type:"f",value:1}},t=new n.SphereBufferGeometry(1e3,32,15),o=new n.ShaderMaterial({uniforms:e,vertexShader:"\n        varying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\t\tvWorldPosition = worldPosition.xyz;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n            ",fragmentShader:"\n        uniform vec3 topColor;\n\t\t\tuniform vec3 bottomColor;\n\t\t\tuniform float offset;\n\t\t\tuniform float exponent;\n\t\t\tvarying vec3 vWorldPosition;\n\t\t\tvoid main() {\n\t\t\t\tfloat h = normalize( vWorldPosition + offset ).y;\n\t\t\t\tgl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );\n            }\n            ",side:n.BackSide});return new n.Mesh(t,o)}}]),e}();exports.default=i;
},{}],"/2Ye":[function(require,module,exports) {
"use strict";var e=require("@babel/runtime/helpers/interopRequireDefault"),n=require("@babel/runtime/helpers/interopRequireWildcard"),o=n(require("three")),r=e(require("./sky")),t=n(require("../store")),i=require("three-orbit-controls")(o),a=require("three-obj-loader");a(o);var d=new o.Scene,l=new o.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1e4);l.position.set(0,10,-30),l.lookAt(new o.Vector3);var c=document.getElementById("3d-env"),s=new o.WebGLRenderer({canvas:c});s.setSize(window.innerWidth,window.innerHeight),s.setClearColor(0,0);var u=new o.Group;d.add(u);var w=new o.BoxGeometry(10,10,10),m=new o.MeshBasicMaterial({color:0});(h=new o.Mesh(w,m)).name="cube1",u.add(h);w=new o.BoxGeometry(5,5,5),m=new o.MeshBasicMaterial({color:65535});(h=new o.Mesh(w,m)).position.y=7.5,h.name="cube2",u.add(h);var h;w=new o.BoxGeometry(5,5,5),m=new o.MeshBasicMaterial({color:65535});(h=new o.Mesh(w,m)).position.y=15,h.name="cube3",u.add(h);var v=new i(l),b=new r.default;d.add(b.getObject(o));var p=new o.GridHelper(100,10,11184810,6710886);d.add(p);var g,q,f,y=new o.Raycaster,B=new o.Vector2;function M(e){B.x=e.clientX/s.domElement.clientWidth*2-1,B.y=-e.clientY/s.domElement.clientHeight*2+1}function j(e){g&&2==e.button&&(console.log(e),console.log(g.name)),g&&0==e.button&&((0,t.updateSelectedObject)(g),console.log(t.default.getState().environment),console.log(g.name),f=g,q&&d.remove(q),q=new o.BoxHelper(g,5627391),d.add(q))}function G(){requestAnimationFrame(G),y.setFromCamera(B,l);var e=y.intersectObjects(u.children);e.length?e[0].object!=g&&((g=e[0].object)||(g=null)):g&&(g=null),q&&q.update(),s.render(d,l)}window.addEventListener("mousemove",M,!1),window.addEventListener("mousedown",j,!1);var x=new o.OBJLoader;x.load("models/monster.obj",function(e){d.add(e)},function(e){console.log(e.loaded/e.total*100+"% loaded")},function(e){console.log("An error happened")}),G();
},{"./sky":"J6gt","../store":"rMii"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("@babel/runtime/helpers/interopRequireDefault"),r=require("@babel/runtime/helpers/interopRequireWildcard"),t=r(require("react")),u=e(require("react-dom")),i=require("react-hot-loader"),a=require("react-redux"),d=e(require("./App.js"));require("./index.css");var l=e(require("./store"));require("./viewer/viewer.js");var n=function(){u.default.render(t.default.createElement(i.AppContainer,null,t.default.createElement(a.Provider,{store:l.default},t.default.createElement(d.default,null))),window.document.getElementById("app"))};"undefined"!=typeof window&&n(),module.hot&&module.hot.accept(n),window.focus();
},{"./App.js":"lY9v","./index.css":"pKEH","./store":"rMii","./viewer/viewer.js":"/2Ye"}]},{},["Focm"], null)
//# sourceMappingURL=src.81054908.map