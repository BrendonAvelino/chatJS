const socket = io(); // Conecta ao servidor Socket.IO

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username = prompt("Digite seu nome:"); // Pergunta o nome do usuário

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = `${username}: ${input.value}`; // Adiciona o nome do usuário à mensagem
    if (message) {
        socket.emit('chat message', message);
        input.value = '';
    }
});


socket.on('chat message', (msg) => { // Adiciona um evento para receber mensagens do servidor e exibi-las.
    const item = document.createElement('div');
    item.textContent = msg; // Define o conteúdo do item como a mensagem recebida
    messages.appendChild(item); // Adiciona o item à lista de mensagens
    messages.scrollTop = messages.scrollHeight; // Rola para baixo para mostrar a mensagem mais recente
});