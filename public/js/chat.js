const socket = io(); // Conecta ao servidor Socket.IO

const form = document.getElementById('form');
const input = document.getElementById('inputMsg');
const inputName = document.getElementById('inputName');
const messages = document.getElementById('messages');

let userName = null

inputName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        userName = inputName.value;
        socket.emit('chat name', userName);
        inputName.style.color = 'green';
        inputName.disabled = true;
    }
});

form.addEventListener('submit', (event) => { // Adiciona um evento para o envio do formulário.
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    const message = input.value;
    if (message && userName) {
        socket.emit('chat message', `${userName}: ${message}`); // Envia a mensagem para o servidor
        input.value = ''; // Limpa o campo de entrada
    }
});

socket.on('chat message', (msg) => { // Adiciona um evento para receber mensagens do servidor e exibi-las.
    const item = document.createElement('div');
    item.textContent = msg; // Define o conteúdo do item como a mensagem recebida
    messages.appendChild(item); // Adiciona o item à lista de mensagens
    messages.scrollTop = messages.scrollHeight; // Rola para baixo para mostrar a mensagem mais recente
});
socket.on('chat name', (name) => {
    const nameItem = document.createElement('div');
    nameItem.textContent = `${userName} entrou no chat`;
    messages.appendChild(nameItem);
    messages.scrollTop = messages.scrollHeight; // Rola para baixo para mostrar a mensagem mais recente
}) 