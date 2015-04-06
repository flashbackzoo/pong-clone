(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var _import2 = require('./canvas');

var canvas = _interopRequireWildcard(_import2);

var Ball = (function () {
    function Ball() {
        _classCallCheck(this, Ball);

        this.x = canvas.element.width / 2;
        this.y = canvas.element.height / 2;
        this.x_speed = 3;
        this.y_speed = 0;
    }

    _createClass(Ball, [{
        key: 'render',
        value: function render() {
            canvas.context.beginPath();
            canvas.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
            canvas.context.fillStyle = constants.BALL_COLOR;
            canvas.context.fill();
        }
    }, {
        key: 'hitTopWall',
        value: function hitTopWall() {
            return this.posTop < 0;
        }
    }, {
        key: 'hitComputerPaddle',
        value: function hitComputerPaddle(paddle) {
            return this.posRight > paddle.x && (this.posBottom > paddle.y && this.posTop < paddle.y + paddle.height);
        }
    }, {
        key: 'hitBottomWall',
        value: function hitBottomWall() {
            return this.posBottom > canvas.element.height;
        }
    }, {
        key: 'hitPlayerPaddle',
        value: function hitPlayerPaddle(paddle) {
            return this.posLeft < paddle.x + paddle.width && (this.posBottom > paddle.y && this.posTop < paddle.y + paddle.height);
        }
    }, {
        key: 'pointScored',
        value: function pointScored() {
            return this.posRight < 0 || this.posLeft > canvas.element.width;
        }
    }, {
        key: 'update',
        value: function update(playerPaddle, computerPaddle) {
            this.x -= this.x_speed;
            this.y -= this.y_speed;

            if (this.hitTopWall()) {
                this.y = this.radius * 2;
                this.y_speed = this.y_speed * -1;
            } else if (this.hitBottomWall()) {
                this.y = canvas.element.height - 5;
                this.y_speed = this.y_speed * -1;
            } else if (this.pointScored()) {
                this.x = canvas.element.width / 2;
                this.y = canvas.element.height / 2;
                this.x_speed = 3;
                this.y_speed = 0;
            }

            if (this.hitPlayerPaddle(playerPaddle)) {
                this.x_speed = this.x_speed * -1;
                this.y_speed += playerPaddle.y_speed / 2;
                this.x += this.x_speed * -1;
            }

            if (this.hitComputerPaddle(computerPaddle)) {
                this.x_speed = this.x_speed * -1;
                this.y_speed += playerPaddle.y_speed / 2;
                this.x += this.x_speed * -1;
            }
        }
    }, {
        key: 'radius',
        get: function () {
            return this.constructor.radius;
        }
    }, {
        key: 'posTop',
        get: function () {
            return this.y - this.radius;
        }
    }, {
        key: 'posRight',
        get: function () {
            return this.x + this.radius;
        }
    }, {
        key: 'posBottom',
        get: function () {
            return this.y + this.radius;
        }
    }, {
        key: 'posLeft',
        get: function () {
            return this.x - this.radius;
        }
    }]);

    return Ball;
})();

Ball.radius = constants.BALL_RADIUS;

exports['default'] = Ball;
module.exports = exports['default'];

},{"./canvas":2,"./constants":4}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var e = document.createElement('canvas'),
    c = e.getContext('2d');

e.width = constants.CANVAS_WIDTH;
e.height = constants.CANVAS_HEIGHT;

c.fillStyle = constants.CANVAS_BACKGROUND_COLOR;
c.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

var element = e;
exports.element = element;
var context = c;
exports.context = context;

},{"./constants":4}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var _Paddle = require('./paddle');

var _Paddle2 = _interopRequireWildcard(_Paddle);

var _import2 = require('./canvas');

var canvas = _interopRequireWildcard(_import2);

var Computer = (function () {
    function Computer() {
        _classCallCheck(this, Computer);

        this.paddle = new _Paddle2['default'](canvas.element.width - (constants.PADDLE_WIDTH + constants.PADDLE_BUFFER), canvas.element.height / 2 - constants.PADDLE_HEIGHT / 2);
    }

    _createClass(Computer, [{
        key: 'render',
        value: function render() {
            this.paddle.render();
        }
    }, {
        key: 'update',
        value: function update(ball) {
            var y_pos = ball.y;

            var diff = (this.paddle.y + this.paddle.height / 2 - y_pos) * -1;

            if (diff < 0 && diff < -4) {
                // Max speed top
                diff = -5;
            } else if (diff > 0 && diff > 4) {
                // Max speed bottom
                diff = 5;
            }

            this.paddle.move(0, diff);

            if (this.paddle.y < 0) {
                this.paddle.y = 0;
            } else if (this.paddle.y + this.paddle.height > canvas.element.height) {
                this.paddle.y = canvas.element.height - this.paddle.height;
            }
        }
    }]);

    return Computer;
})();

exports['default'] = Computer;
module.exports = exports['default'];

},{"./canvas":2,"./constants":4,"./paddle":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CANVAS_WIDTH = 800;
exports.CANVAS_WIDTH = CANVAS_WIDTH;
var CANVAS_HEIGHT = 500;
exports.CANVAS_HEIGHT = CANVAS_HEIGHT;
var CANVAS_BACKGROUND_COLOR = '#000000';

exports.CANVAS_BACKGROUND_COLOR = CANVAS_BACKGROUND_COLOR;
var PADDLE_WIDTH = 10;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var PADDLE_HEIGHT = 50;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
var PADDLE_COLOR = '#009900';
exports.PADDLE_COLOR = PADDLE_COLOR;
var PADDLE_BUFFER = 5;

exports.PADDLE_BUFFER = PADDLE_BUFFER;
var BALL_RADIUS = 5;
exports.BALL_RADIUS = BALL_RADIUS;
var BALL_COLOR = '#ffffff';

exports.BALL_COLOR = BALL_COLOR;
var PLAYER_UP_KEY_CODE = '87';exports.PLAYER_UP_KEY_CODE = PLAYER_UP_KEY_CODE;
// w
var PLAYER_DOWN_KEY_CODE = '83'; // s
exports.PLAYER_DOWN_KEY_CODE = PLAYER_DOWN_KEY_CODE;

},{}],5:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var _import2 = require('./canvas');

var canvas = _interopRequireWildcard(_import2);

var _Player = require('./player');

var _Player2 = _interopRequireWildcard(_Player);

var _Computer = require('./computer');

var _Computer2 = _interopRequireWildcard(_Computer);

var _Ball = require('./ball');

var _Ball2 = _interopRequireWildcard(_Ball);

function update() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
}

function render() {
    canvas.context.fillStyle = constants.CANVAS_BACKGROUND_COLOR;
    canvas.context.fillRect(0, 0, canvas.element.width, canvas.element.height);
    player.render();
    computer.render();
    ball.render();
}

function step() {
    update();
    render();
    window.requestAnimationFrame(step);
}

var player = new _Player2['default']();

var computer = new _Computer2['default']();

var ball = new _Ball2['default']();

window.onload = function () {
    document.body.appendChild(canvas.element);
    window.requestAnimationFrame(step);
};

},{"./ball":1,"./canvas":2,"./computer":3,"./constants":4,"./player":7}],6:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var _import2 = require('./canvas');

var canvas = _interopRequireWildcard(_import2);

var Paddle = (function () {
    function Paddle(x, y) {
        _classCallCheck(this, Paddle);

        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    _createClass(Paddle, [{
        key: 'render',
        value: function render() {
            canvas.context.fillStyle = constants.PADDLE_COLOR;
            canvas.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }, {
        key: 'maxTop',
        value: function maxTop() {
            return this.y < 0;
        }
    }, {
        key: 'maxBottom',
        value: function maxBottom() {
            return this.y + this.height > constants.CANVAS_HEIGHT;
        }
    }, {
        key: 'move',
        value: function move(x, y) {
            this.x += x;
            this.y += y;
            this.x_speed = x;
            this.y_speed = y;

            if (this.maxTop()) {
                this.y = 0;
                this.y_speed = 0;
            } else if (this.maxBottom()) {
                this.y = constants.CANVAS_HEIGHT - this.height;
                this.y_speed = 0;
            }
        }
    }, {
        key: 'width',
        get: function () {
            return this.constructor.width;
        }
    }, {
        key: 'height',
        get: function () {
            return this.constructor.height;
        }
    }]);

    return Paddle;
})();

Paddle.width = constants.PADDLE_WIDTH;
Paddle.height = constants.PADDLE_HEIGHT;

exports['default'] = Paddle;
module.exports = exports['default'];

},{"./canvas":2,"./constants":4}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _import = require('./constants');

var constants = _interopRequireWildcard(_import);

var _Paddle = require('./paddle');

var _Paddle2 = _interopRequireWildcard(_Paddle);

var Player = (function () {
    function Player() {
        _classCallCheck(this, Player);

        this.paddle = new _Paddle2['default'](constants.PADDLE_BUFFER, constants.CANVAS_HEIGHT / 2 - constants.PADDLE_HEIGHT / 2);

        this.keys = {};

        window.addEventListener('keydown', (function (event) {
            this.keys[event.keyCode] = true;
        }).bind(this), false);

        window.addEventListener('keyup', (function (event) {
            delete this.keys[event.keyCode];
        }).bind(this), false);
    }

    _createClass(Player, [{
        key: 'render',
        value: function render() {
            this.paddle.render();
        }
    }, {
        key: 'update',
        value: function update() {
            for (var prop in this.keys) {
                switch (prop) {
                    case constants.PLAYER_UP_KEY_CODE:
                        this.paddle.move(0, -4);
                        break;
                    case constants.PLAYER_DOWN_KEY_CODE:
                        this.paddle.move(0, 4);
                        break;
                    default:
                        this.paddle.move(0, 0);
                        break;
                }
            }
        }
    }]);

    return Player;
})();

exports['default'] = Player;
module.exports = exports['default'];

},{"./constants":4,"./paddle":6}]},{},[5]);
