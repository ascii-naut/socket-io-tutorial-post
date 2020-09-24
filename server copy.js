const path = require('path');
let http = require('http');
let express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('disconnect', () => {
        console.log("A user has disconnected.");    
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});