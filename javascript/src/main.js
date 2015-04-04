import * as constants from './constants';
import * as canvas from './canvas';
import Player from './player';
import Computer from './computer';
import Ball from './ball';

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

var player = new Player();

var computer = new Computer();

var ball = new Ball();

window.onload = function () {
    document.body.appendChild(canvas.element);
    window.requestAnimationFrame(step);
}
