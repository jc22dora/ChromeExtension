
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//import "app-module-path/register.js";
const path = require('path');
const http = require('http');
//const express = require('express');
import express from "express";
//import "socket.io.min.js";
import { Server } from "socket.io";
//const socketio = require('socket.io');
//import axios from "axios.min.js";
//const axios = require('axios');
const { formatMessage, getStockPrice } = require('./utils/messages');
const { userJoin, getCurrentUser, getUserList, userDisconnect } = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


// set static
app.use(express.static(path.join(__dirname, '')));


// run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        console.log(username, room);
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        console.log('New WS Connection...');

        socket.emit('message', formatMessage('bot', 'Terminal connected'));


        // broadcast when user connects
        socket.broadcast.to(user.room).emit('message', formatMessage('bot', 'A user connected to Terminal'));

         
        // runs when client disconnects
        socket.on('disconnect', () => {
            userDisconnect(socket.id);
            io.emit('message', formatMessage('bot', 'A user has disconnected from Terminal'));
        });

        var users = getUserList();
        for (let i = 0; i < users.length;i++) {
            console.log(users[i].username);
        }

    });
    

    // listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);


        if (msg.includes('GENI')) {
            var { percent, sign } = getStockPrice();
            if (sign >= 0) {
                var color = "green";
                var html = "&#9650;";
            }
            else {
                color = "red";
                html = "&#9660;";
            }
            var hotkey = "<span style='color: " + color + ";'>" + "GENI" + html + percent + "%" + "</span>";
            socket.emit('message', formatMessage(hotkey, ''));
        }


        io.to(user.room).emit('message', formatMessage(user.username, msg));

    });


})


const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log('Server running on PORT' + PORT));

