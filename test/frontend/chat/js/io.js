
//arrumar a requisição para post
const api = async () => {
    try {
        const response = (await fetch("http://localhost:3000/socket/chat?room=room&privacy=public", {
            method: "POST"
        }));

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Erro na requisição: ${error.message}`);
    }
};

api();