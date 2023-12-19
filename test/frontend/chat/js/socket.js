const socket = io("http://localhost:3000");
const button = document.querySelector(".submit")


button.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.querySelector(".messageContent")
    
    socket.emit("select_room", {
        user: "Anderson",
        room: "room"
    });

    socket.emit("message", {
        user: "Anderson",
        room: "room"
    })
})

// Receptor de mensagem do servidor
socket.on("message", (data) => {
    console.log({
            message: `this is the ${data}`
    });
});
