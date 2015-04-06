import * as constants from './constants';
import Paddle from './paddle';
import * as canvas from './canvas'

class Computer {
    constructor() {
        this.paddle = new Paddle(canvas.element.width - (constants.PADDLE_WIDTH + constants.PADDLE_BUFFER), (canvas.element.height / 2) - (constants.PADDLE_HEIGHT / 2));
    }

    render() {
        this.paddle.render();
    }

    update(ball) {
        var y_pos = ball.y;

        var diff = ((this.paddle.y + (this.paddle.height / 2)) - y_pos) * -1;

        if (diff < 0 && diff < -4) { // Max speed top
            diff = -4;
        } else if (diff > 0 && diff > 4) { // Max speed bottom
            diff = 4;
        }

        this.paddle.move(0, diff);

        if (this.paddle.y < 0) {
            this.paddle.y = 0;
        } else if (this.paddle.y + this.paddle.height > canvas.element.height) {
            this.paddle.y = canvas.element.height - this.paddle.height;
        }
    }
}

export default Computer;
