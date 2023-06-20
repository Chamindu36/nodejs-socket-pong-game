let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');

    pongNamespace.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on('ready', () => {
            console.log('Player ready', socket.id);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                // Select the second client as referee which is base client
                // Then braodcast that to all clients (players)
                pongNamespace.emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.broadcast.emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.broadcast.emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
        });
    });
};

module.exports = {
    listen,
}