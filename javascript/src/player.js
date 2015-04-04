import * as constants from './constants';
import Paddle from './paddle';

class Player {
    constructor() {
        this.paddle = new Paddle(constants.PADDLE_BUFFER, (constants.CANVAS_HEIGHT / 2) - (constants.PADDLE_HEIGHT / 2));

        this.keys = {};

        window.addEventListener('keydown', function (event) {
            this.keys[event.keyCode] = true;
        }.bind(this), false);

        window.addEventListener('keyup', function (event) {
            delete this.keys[event.keyCode];
        }.bind(this), false);
    }

    render() {
        this.paddle.render();
    }

    update() {
        for (var prop in this.keys) {
            switch(prop) {
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
}

export default Player;
