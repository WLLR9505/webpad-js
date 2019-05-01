import {buttonA, buttonB, stick, checkPress, moveAxes} from './buttons.js';
import {sendData} from '../index.js';

var THECANVAS, CONTEXT;
var SelectedControl;

function createWebpad () {
    console.log('creating webpad');
    let main = document.getElementById('main');
    THECANVAS = document.createElement('canvas');
    THECANVAS.setAttribute('id', 'canvas');
    THECANVAS.width = window.innerWidth;
    THECANVAS.height = window.innerHeight;
    CONTEXT = THECANVAS.getContext('2d');
    main.appendChild(THECANVAS);

    SelectedControl = drawSimpleWebpad();
    THECANVAS.addEventListener('mousedown', (event) => {
        let canvasX = event.pageX;
        let canvasY = event.pageY;
        sendData(`Clicou :: X: ${canvasX} Y: ${canvasY}`);

        checkPress(SelectedControl, canvasX, canvasY);

        if (SelectedControl[0].pressed) {
            alert('botão A pressionado');
        }
        if (SelectedControl[1].pressed) {
            alert('botão B pressionado');
        }

    });

    THECANVAS.addEventListener('mousemove', (event) => {
        let canvasX = event.pageX;
        let canvasY = event.pageY;
        if(SelectedControl[2].pressed) {
            drawBackground('#00ffff', '#ff0000');

            moveAxes(SelectedControl[2], canvasX - (SelectedControl[2].size / 2), canvasY - (SelectedControl[2].size / 2), CONTEXT, THECANVAS);

            sendData(`stick :: X: ${SelectedControl[2].axes[0]} Y: ${SelectedControl[2].axes[1]}`);

            drawButton(SelectedControl[0]);
            drawButton(SelectedControl[1]);
        }
    });


    THECANVAS.addEventListener('mouseup', () => {   //reseta o estado
        SelectedControl.forEach((b) => {
            b.pressed = false;
        });
        drawBackground('#00ffff', '#ff0000');
        SelectedControl.forEach((b) => {
            drawButton(b);
        });
    });
}

function drawButton (btn) {
    CONTEXT.drawImage(btn.img , btn.x, btn.y, btn.size, btn.size);
}

function drawBackground (leftColor, rightColor) {
    //L-side
    CONTEXT.fillStyle = leftColor;
    CONTEXT.fillRect(0, 0, window.innerWidth / 2, window.innerHeight);
    //R-side
    CONTEXT.fillStyle = rightColor;
    CONTEXT.fillRect(window.innerWidth / 2, 0 , window.innerWidth / 2, window.innerHeight);
}

function drawSimpleWebpad () {

    const SIMPLEPAD = [
        {   //A
            x: (window.innerWidth * 0.65) - buttonA.width,
            y: (window.innerHeight / 2) - buttonA.height,
            size: 0.20 * window.innerHeight,
            img: buttonA,
            pressed: false
        },
        {   //B
            x: (window.innerWidth * 0.85) - buttonB.width,
            y: (window.innerHeight / 2) - buttonB.height,
            size: 0.20 * window.innerHeight,
            img: buttonB,
            pressed: false
        },
        {   //Stick
            size: 0.25 * window.innerHeight,
            x: (window.innerWidth / 4) - stick.width,
            y: (window.innerHeight / 2) - stick.height,
            img: stick,
            pressed: false,
            axes: [ 0, 0 ]
        }
    ];
    drawBackground('#00ffff', '#ff0000');

    //buttons A - B
    drawButton(SIMPLEPAD[0]);    //A
    drawButton(SIMPLEPAD[1]);    //B
    //stick
    drawButton(SIMPLEPAD[2]);

    return SIMPLEPAD;
}

export { createWebpad, THECANVAS, CONTEXT };
