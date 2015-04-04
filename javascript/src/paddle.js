import * as constants from './constants';
import * as canvas from './canvas';

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    render() {
        canvas.context.fillStyle = constants.PADDLE_COLOR;
        canvas.context.fillRect(this.x, this.y, this.width, this.height);
    }

    maxTop() {
        return this.y < 0;
    }

    maxBottom() {
        return this.y + this.height > constants.CANVAS_HEIGHT;
    }

    move(x, y) {
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

    get width() {
        return this.constructor.width;
    }

    get height() {
        return this.constructor.height;
    }
}

Paddle.width = constants.PADDLE_WIDTH;
Paddle.height = constants.PADDLE_HEIGHT;

export default Paddle;
