let ButtonPerfil = document.getElementById('EditarPerfil');
let Personalizaçao = document.querySelector('.Conteiner-Perfil');
let ExitPersonalizaçao = document.getElementById('Sair-personalizaçao');
let TradeFoto = document.getElementById('IMG-Edit');
let InputTrade = document.getElementById('IMG-Input');
let OriginalImg = document.querySelector('.FotoPerfil');

// Elementos de texto que serão atualizados
let Name = document.querySelector('.NomeTXT');
let Username = document.querySelector('.UsernameTXT');
let Bio = document.querySelector('.BioTXT');

// Inputs para novos valores
let InputNome = document.getElementById('Name');
let InputUsername = document.getElementById('Username');
let InputBio = document.getElementById('Bio');

// Função para mostrar/ocultar o formulário de personalização
const SeePersonalizaçao = () => {
    if (Personalizaçao.style.display === "none") {
        Personalizaçao.style.display = "block";
    } else {
        Personalizaçao.style.display = "none";
    }
};

// Função para sair da personalização
const ExitPerfil = () => {
    if (Personalizaçao.style.display === "block") {
        Personalizaçao.style.display = "none";
    } else {
        Personalizaçao.style.display = "block";
    }
};

// Função para clicar no input de foto
let ImgPlay = () => {
    InputTrade.click();
};

// Função para atualizar a imagem de perfil
InputTrade.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.MulduraImg').style.backgroundImage = `url(${e.target.result})`;
            document.querySelector('.FotoPerfil').style.backgroundImage = `url(${e.target.result})`;

            document.querySelector('.MulduraImg').textContent = '';
            document.querySelector('.FotoPerfil').textContent = '';
        };

        reader.readAsDataURL(file);
    }
});

// Função para atualizar o nome, username e bio
const TradeInfo = () => {
    let newName = InputNome.value;
    let newUsername = InputUsername.value;
    let newBio = InputBio.value;


    if (!newUsername.startsWith('@')) {
        alert('O username deve começar com "@"');
        return; // Não continua a execução da função
    }


    Name.textContent = newName;
    Username.textContent = newUsername;
    Bio.textContent = newBio;
};

// comentei pq tava dificel de enteder meu proprio codigo no caso de duvida, nao toque em nada tudo pode quebrar a qualquer momento
ButtonPerfil.addEventListener("click", SeePersonalizaçao);
ExitPersonalizaçao.addEventListener("click", ExitPerfil);
TradeFoto.addEventListener("click", ImgPlay);
document.getElementById('Salvar').addEventListener('click', TradeInfo);
