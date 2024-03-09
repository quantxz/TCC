const url = new URLSearchParams(window.location.search);
const room = url.get("room");

const socket = io("http://localhost:3000", {
    query: { roomName: room }
});

Document.addEventListener("")
socket.on('all_messages', (messages) => {
    const div = document.querySelector(".messages");
    if (div.childNodes.length === 0) {
        messages.forEach(message => {
            render(message.author, message.content, message.hour);
        });
    }
});


const button = document.querySelector(".submit")
const private = document.querySelector(".private")

const render = (author, message, hour) => {
    const div = document.querySelector(".messages")
    const divMessage = document.createElement("div");
    const messageContent = `<p><strong>${author} - ${message}</strong></p> - ${hour}`;
    divMessage.innerHTML = messageContent;
    div.appendChild(divMessage);
}


button.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.querySelector(".messageContent").value;
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    socket.emit("message", {
        author: "quantxz",
        room: "room0",
        content: input,
        hour: `${hours}:${minutes}:${seconds}`
    })

})

socket.emit("find_messages", "room0")

socket.on("private message", (data) => {
    console.log(data)
})

// Receptor de mensagem do servidor
socket.on("message", (data) => {
    console.log({ message: `this is the ${data}` });
    render("quantxz", data.content, data.hour)
});
