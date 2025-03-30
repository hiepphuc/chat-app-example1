const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Có người vừa kết nối!');
    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});