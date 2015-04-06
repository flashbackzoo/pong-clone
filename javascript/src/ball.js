import * as constants from './constants';
import * as canvas from './canvas';

class Ball {
    constructor() {
        this.x = (canvas.element.width / 2);
        this.y = (canvas.element.height / 2);
        this.x_speed = 3;
        this.y_speed = 0;
    }

    render() {
        canvas.context.beginPath();
        canvas.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        canvas.context.fillStyle = constants.BALL_COLOR;
        canvas.context.fill();
    }

    hitTopWall() {
        return this.posTop < 0;
    }

    hitComputerPaddle(paddle) {
        return this.posRight > paddle.x && (this.posBottom > paddle.y && this.posTop < paddle.y + paddle.height);
    }

    hitBottomWall() {
        return this.posBottom > canvas.element.height
    }

    hitPlayerPaddle(paddle) {
        return (this.posLeft < paddle.x + paddle.width) && (this.posBottom > paddle.y && this.posTop < paddle.y + paddle.height);
    }

    pointScored() {
        return this.posRight < 0 || this.posLeft > canvas.element.width;
    }

    update(playerPaddle, computerPaddle) {
        this.x -= this.x_speed;
        this.y -= this.y_speed;

        if (this.hitTopWall()) {
            this.y = this.radius * 2;
            this.y_speed = this.y_speed * -1;
        } else if (this.hitBottomWall()) {
            this.y = canvas.element.height - 5;
            this.y_speed = this.y_speed * -1;
        } else if (this.pointScored()) {
            this.x = (canvas.element.width / 2);
            this.y = (canvas.element.height / 2);
            this.x_speed = 3;
            this.y_speed = 0;
        }

        if (this.hitPlayerPaddle(playerPaddle)) {
            this.x_speed = (this.x_speed + 1) * -1;
            this.y_speed += (playerPaddle.y_speed);
            this.x += this.x_speed * -1;
        }

        if (this.hitComputerPaddle(computerPaddle)) {
            this.x_speed = (this.x_speed - 1) * -1;
            this.y_speed += (playerPaddle.y_speed);
            this.x += this.x_speed * -1;
        }
    }

    get radius() {
        return this.constructor.radius;
    }

    get posTop() {
        return this.y - this.radius;
    }

    get posRight() {
        return this.x + this.radius;
    }

    get posBottom() {
        return this.y + this.radius;
    }

    get posLeft() {
        return this.x - this.radius;
    }
}

Ball.radius = constants.BALL_RADIUS;

export default Ball;
