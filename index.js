process.title = 'MeuServidor';
var args = process.argv,
    port = args[2] || 3000,
    webServer = require('./server');

const io = require('socket.io')(webServer);

try {
    webServer.listen(port, () => {
        console.log('\x1b[01;32mServidor iniciado\x1b[0m\n');
        console.log(`\x1b[01;36mhttp://localhost:${port}/\x1b[0m\n`);
    });

    io.on('connection', socket => {
        console.log('socket conectado ' + socket.id);

        socket.on('sendData', data => {
            console.log(data);
        });
    });
} catch (e) {
    console.log('\x1b[01;31mOcorreu um erro!\x1b[0m');
    console.log(e);
}
