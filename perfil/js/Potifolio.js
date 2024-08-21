let ButtonPortifolio = document.getElementById('EditarPortifolio');
let ConteinerPortifolio = document.querySelector('.Conteiner-Portifolio');
let SairPortifolio = document.getElementById('Sair-Portifolio')
// inputs
let Lingua = document.getElementById('LINGUA')
let Experiencia = document.getElementById('Experiencia')
let Expecialidade = document.getElementById('EXPECIALIDADE')
let Nivel = document.getElementById('NIVEL')
// habilidades section
let LinguaLI = document.querySelector('.habilidade1');
let ExperienciaLI = document.querySelector('.habilidade2');
let ExpecialidadeLI = document.querySelector('.habilidade3');
let NivelLI = document.querySelector('.habilidade4');
let SalvarPortifolio = document.getElementById('Salvar-portifolio');



const PortifolioPlay = () => {

    if (ConteinerPortifolio.style.display == "none") {
        ConteinerPortifolio.style.display = "block";




    } else {


        ConteinerPortifolio.style.display = "none";
    }



}
const PortifolioBack = () => {

    if (ConteinerPortifolio.style.display == "block") {
        ConteinerPortifolio.style.display = "none";




    } else {


        ConteinerPortifolio.style.display = "block";
    }



}
const HabilidadeInfo = () => {

    let newLingua = Lingua.value;
    let newExperiencia = Experiencia.value;
    let newExpecialidade = Expecialidade.value;
    let newNivel = Nivel.value;

    LinguaLI.textContent = newLingua;
    ExperienciaLI.textContent = newExperiencia;
    ExpecialidadeLI.textContent = newExpecialidade;
    NivelLI.textContent = newNivel;


};

ButtonPortifolio.addEventListener("click", PortifolioPlay);
SairPortifolio.addEventListener("click", PortifolioBack);
SalvarPortifolio.addEventListener("click", HabilidadeInfo)