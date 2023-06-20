const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST'],
        allowEIO3: true // false by default
    }
});

const sockets = require('./socket');

const PORT = 3000;
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(socketServer);
