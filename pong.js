var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvasHeight = 500,
    canvasWidth = 800;

function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 0;
}
Paddle.prototype.width = 10;
Paddle.prototype.height = 50;
Paddle.prototype.render = function () {
    context.fillStyle = '#009900';
    context.fillRect(this.x, this.y, this.width, this.height);
};
Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;

    if (this.y < 0) { // All the way up
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > canvasHeight) { // All the way down
        this.y = canvasHeight - this.height;
        this.y_speed = 0;
    }
};

function Ball() {
    this.x = (canvasWidth / 2);
    this.y = (canvasHeight / 2);
    this.x_speed = 3;
    this.y_speed = 0;
    this.radius = 5;
}
Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = '#ffffff';
    context.fill();
};
Ball.prototype.update = function (playerPaddle, computerPaddle) {
    this.x -= this.x_speed;
    this.y -= this.y_speed;

    var ball_left = this.x - 5,
        ball_top = this.y - 5,
        ball_right = this.x + 5,
        ball_bottom = this.y + 5;

    var player_right = playerPaddle.x + playerPaddle.width,
        player_top = playerPaddle.y,
        player_bottom = playerPaddle.y + playerPaddle.height;

    var computer_left = computerPaddle.x,
        computer_top = computerPaddle.y,
        computer_bottom = computerPaddle.y + computerPaddle.height;

    if (ball_top < 0) { // Hitting top wall
        this.y = this.radius * 2;
        this.y_speed = this.y_speed * -1;
    } else if (ball_bottom > canvasHeight) { // Hitting bottom wall
        this.y = canvasHeight - 5;
        this.y_speed = this.y_speed * -1;
    } else if (this.x < 0 || this.x > canvasWidth) { // A point was scored
        this.x = (canvasWidth / 2);
        this.y = (canvasHeight / 2);
        this.x_speed = 3;
        this.y_speed = 0;
    }

    if (ball_left < player_right && (ball_top > player_top && ball_bottom < player_bottom)) { // Player paddle hit
        this.x_speed = this.x_speed * -1;
        this.y_speed += (playerPaddle.y_speed / 2);
        this.x += this.x_speed * -1;
    }

    if (ball_right > computer_left && (ball_top > computer_top && ball_bottom < computer_bottom)) { // Computer paddle hit
        this.x_speed = this.x_speed * -1;
        this.y_speed += (playerPaddle.y_speed / 2);
        this.x += this.x_speed * -1;
    }
};

function Player() {
    this.paddle = new Paddle(5, (canvasHeight / 2) - (Paddle.prototype.height / 2));
};
Player.prototype.render = function () {
    this.paddle.render();
};
Player.prototype.update = function () {
    for (var prop in keys) {
        switch(prop) {
            case '87': // 'w' (up)
                this.paddle.move(0, -4);
                break;
            case '83': // 's' (down)
                this.paddle.move(0, 4);
                break;
            default:
                this.paddle.move(0, 0);
                break;
        }
    }
};

function Computer() {
    this.paddle = new Paddle(canvasWidth - (Paddle.prototype.width + 5), (canvasHeight / 2) - (Paddle.prototype.height / 2));
}
Computer.prototype.render = function () {
    this.paddle.render();
};
Computer.prototype.update = function (ball) {
    var y_pos = ball.y;

    var diff = ((this.paddle.y + (this.paddle.height / 2)) - y_pos) * -1;

    if (diff < 0 && diff < -4) { // Max speed top
        diff = -5;
    } else if (diff > 0 && diff > 4) { // Max speed bottom
        diff = 5;
    }

    this.paddle.move(0, diff);

    if (this.paddle.y < 0) {
        this.paddle.y = 0;
    } else if (this.paddle.y + this.paddle.height > canvasHeight) {
        this.paddle.y = canvasHeight - this.paddle.height;
    }
};

var keys = {};

var player = new Player();

var computer = new Computer();

var ball = new Ball();

var update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

var render = function () {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    player.render();
    computer.render();
    ball.render();
};

var step = function () {
    update();
    render();
    window.requestAnimationFrame(step)
};

canvas.height = canvasHeight;
canvas.width = canvasWidth;

context.fillStyle = '#000000';
context.fillRect(0, 0, canvasWidth, canvasHeight);

window.addEventListener('keydown', function (event) {
    keys[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    delete keys[event.keyCode];
});

window.onload = function () {
    document.body.appendChild(canvas);
    window.requestAnimationFrame(step);
}
