
const button = document.querySelector(".submit")


button.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.querySelector(".messageContent")

    socket.emit("message", {
        user: "Anderson",
        room: "room",
        payload: "hello World"
    })
})

// Receptor de mensagem do servidor
socket.on("message", (data) => {
    console.log({
            message: `this is the ${data}`
    });
});
