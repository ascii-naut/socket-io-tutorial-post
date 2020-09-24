const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath))

let num = Number(0);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    socket.on('startGame', () => {
        io.emit('startGame');
    })

    socket.on('crazyIsClicked', (data) => {
        io.emit('crazyIsClicked', data);
    });

    io.emit('getServerNumber', {
        myNum: num
    });
    socket.on('updateServerNumber', (data) => {
        num++;
        console.log(data.myNum);
    });

    socket.on('giveMeNumber', (data) => {
        data = num;
        io.emit('takeThisData', data)
    })




});

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});