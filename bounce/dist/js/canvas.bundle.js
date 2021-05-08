/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var width = canvas.width = innerWidth;
var height = canvas.height = innerHeight;
var mouse = {
  x: undefined,
  y: undefined
};
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66', 'yellow']; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  width = canvas.width = innerWidth;
  height = canvas.height = innerHeight;
  init();
});
console.log('console working'); // Objects

var _Object = /*#__PURE__*/function () {
  function _Object(x, y, radius, color, mass) {
    var _this = this;

    _classCallCheck(this, _Object);

    _defineProperty(this, "update", function (objects) {
      _this.draw();

      for (var i = 0; i < objects.length; i++) {
        if (_this === objects[i]) continue;

        if (_utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(_this.x, _this.y, objects[i].x, objects[i].y) - 2 * _this.radius < 0) {
          _utils__WEBPACK_IMPORTED_MODULE_0___default.a.resolveCollision(_this, objects[i], _this.mass);
        }
      }

      _this.x += _this.velocity.x;
      _this.y += _this.velocity.y;

      if (_this.x + _this.radius > width || _this.x - _this.radius < 0) {
        _this.velocity.x = -_this.velocity.x;
      }

      if (_this.y + _this.radius > height || _this.y - _this.radius < 0) {
        _this.velocity.y = -_this.velocity.y;
      }

      if (_utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(mouse.x, mouse.y, _this.x, _this.y) < 100) {
        _this.opacity = 0.4;
      } else {
        _this.opacity = 0;
      }
    });

    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6
    };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.opacity = 0.1;
  }

  _createClass(_Object, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }
  }]);

  return _Object;
}(); // Implementation


var objects;

function init() {
  objects = [];

  for (var i = 0; i < 250; i++) {
    var x;
    var y;
    var radius = 15;
    var color = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(colors);

    if (i !== 0) {
      for (var j = 0; j < objects.length; j++) {
        if (_utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(objects[j].x, objects[j].y, x, y) < 2 * radius) {
          x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, width - radius);
          y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, height - radius);
          j = -1;
        }
      }
    } else {
      x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, width - radius);
      y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, height - radius);
    }

    objects.push(new _Object(x, y, radius, color, 1));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)

  objects.forEach(function (object) {
    object.update(objects);
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function rotateAxis(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = otherParticle.velocity.x - particle.velocity.x;
  var yVelocityDiff = otherParticle.velocity.y - particle.velocity.y;
  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist <= 0) {
    var angle = -Math.atan2(yDist, xDist);
    var m1 = particle.mass;
    var m2 = otherParticle.mass;
    var u1 = rotateAxis(particle.velocity, angle);
    var u2 = rotateAxis(otherParticle.velocity, angle);
    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    };
    var vFinal1 = rotateAxis(v1, -angle);
    var vFinal2 = rotateAxis(v2, -angle);
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance,
  resolveCollision: resolveCollision
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map