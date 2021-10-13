import express from 'express';
const app = express();

import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";

const io = new Server(server);

app.use(express.static(__dirname + '/client'));

const rooms: Map<string, string> = new Map()

io.on('connection', (socket) => {
    socket.on("identify", (room) => {
        const old_room = rooms.get(socket.id)
        if(old_room !== undefined) socket.leave(old_room)
        rooms.set(socket.id, room)
        socket.join(room)
    });
    socket.on('message', (message) => {
        const room = rooms.get(socket.id)
        if(room === undefined) return;
        socket.broadcast.to(room).emit('message', message);
    })
});

io.on('disconnect', (socket) => {
    rooms.delete(socket.id)
})

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});