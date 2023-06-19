const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = 3000;

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);


    socket.on('ready', () => {
        console.log('Player ready', socket.id);

        readyPlayerCount++;

        if (readyPlayerCount === 2) {
            // Select the second client as referee which is base client
            // Then braodcast that to all clients (players)
            io.emit('startGame', socket.id);
        }
    });
});