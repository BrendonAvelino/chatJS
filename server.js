// api/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); 

io.on('connection', (socket) => {
  console.log("Um usuário conectado");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuário Disconectado');
  });
});

module.exports = server;  // Exporte o servidor para o Vercel
