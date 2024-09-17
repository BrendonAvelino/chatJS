const express = require('express'); // Importa o framework Express
const http = require('http'); // Importa o módulo HTTP do Node.js
const socketIo = require('socket.io'); // Importa o Socket.IO para comunicação em tempo real

const app = express(); // Cria uma instância do Express
const server = http.createServer(app);  // Cria um servidor HTTP com o Express
const io = socketIo(server); // Cria uma instância do Socket.IO com o servidor HTTP




app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

io.on('connection', (socket) => { // Define um evento que é chamado quando um cliente se conecta ao servidor.
    console.log("Um usuário conectado"); // Mensagem no console quando um usuário se conecta

    socket.on('chat message', (msg) => { // Evento quando uma mensagem de chat é recebida
        io.emit('chat message', msg); // Emite a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => { // Evento quando um usuário se desconecta
        console.log('Usuário Disconectado'); // Mensagem no console quando um usuário se desconecta
    });
});


server.listen(3000, () => {  // Inicia o servidor na porta 3000
    console.log('Servidor rodando na porta 3000');
});