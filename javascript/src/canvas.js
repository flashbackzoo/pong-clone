import * as constants from './constants';

var e = document.createElement('canvas'),
    c = e.getContext('2d');

e.width = constants.CANVAS_WIDTH;
e.height = constants.CANVAS_HEIGHT;


c.fillStyle = constants.CANVAS_BACKGROUND_COLOR;
c.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

export var element = e;
export var context = c;
