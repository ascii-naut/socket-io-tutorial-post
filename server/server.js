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
let savedNumber = num;


io.on('connection', (socket) => {

    socket.on('startGame', () => {
        io.emit('startGame');
    })
    socket.on('crazyIsClicked', (data) => {
        io.emit('crazyIsClicked', data);
    });
  
    socket.on('giveMeNumber', () => {
        io.emit('takeThisData', num)
    })

    socket.emit('updateServerNumber', () => {
        //num++;
        savedNumber = num;
    });
    socket.on('changeServerNumber', (data) => {
        num = data;
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
        savedNumber = num;
    })

    io.emit('save', savedNumber);
});

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});