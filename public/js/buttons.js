var stick = new Image();
stick.src = '../imgs/stick.png';

var buttonA = new Image();
buttonA.src = '../imgs/A.png';

var buttonB = new Image();
buttonB.src = '../imgs/B.png';

var buttonX = new Image();
buttonX.src = '../imgs/X.png';

var buttonY = new Image();
buttonY.src = '../imgs/Y.png';

function checkPress (buttons = [], X, Y) {
    buttons.forEach((b) => {
        if (X >= b.x && X <= b.x + b.size) {
            if (Y >= b.y && Y <= b.y + b.size) {
                b.pressed = true;
                return b.pressed;
            }
        } else {
            b.pressed = false;
            return b.pressed;
        }
    });
}

function moveAxes (stick, X, Y, CONTEXT, THECANVAS) {
    stick.axes = [ X - stick.x, stick.y - Y ];

    CONTEXT.drawImage(stick.img, X, Y, stick.size,  stick.size);
}

export {buttonA, buttonB, stick, checkPress, moveAxes};
