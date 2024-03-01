const  url = new URLSearchParams(window.location.search);
const room = url.get("room");

const socket = io("http://localhost:3000", {
    query: { roomName: room }
});

const button = document.querySelector(".submit")
const private = document.querySelector(".private")

const render = (author, message) => {
    const div = document.querySelector(".messages")
    const divMessage = document.createElement("div");
    const messageContent = `<p><strong>${author} - ${message}</strong></p>`;
    divMessage.innerHTML = messageContent;
    div.appendChild(divMessage);
}


button.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.querySelector(".messageContent").value

    socket.emit("message", {
        author: "dfhhsetfasgedf",
        room: "room0",
        content: input
    })
})

socket.emit("find_messages", "room0")

socket.on('all_messages', (messages) => {
    messages.forEach(message => {
      render(message.author, message.content);
    });
});

private.addEventListener("click", () => {
    socket.emit("private message", {
        content: "ta workando ?",
        to: "zY51N70IEYyvkmJHAAAJ"
    })
})

socket.on("private message", (data) => {
    console.log(data)
})

// Receptor de mensagem do servidor
socket.on("message", (data) => {
    console.log({ message: `this is the ${data}`} );
    render("room", data)
});
