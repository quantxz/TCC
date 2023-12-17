const socket = io("http://localhost:3000");

socket.on("message", () => {
    // Emitir uma mensagem para o servidor com um evento "mess"
    socket.emit("message", "mess");
});

// Receptor de mensagem do servidor
socket.on("messageToClient", (data) => {
    console.log(data);
});