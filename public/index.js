import { createWebpad } from './js/webpad.js';
var socket = io('http://localhost:3000');

window.onload = () => {
    run();
};

function run () {
    createWebpad();
}

function sendData (data) {
    socket.emit('sendData', data);
}

export {sendData};
