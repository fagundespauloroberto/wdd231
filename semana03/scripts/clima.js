// elementos HTML no DOM
const tempAtual = document.querySelector('#temp-atual');
const iconeDoClima = document.querySelector('#icone-do-clima');
const descrDaLegenda = document.querySelector('figcaption');

// coordenadas Trier, Alemanha: Latitude 49.75, Longitude 6.64
// aqui temos a chave também...
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=aec60799ec6fb1768a1d7fbae2b57a34';

// Função assíncrona para buscar dados da API
async function apiFetch() {
  try {
    const resposta = await fetch(url);
    if (resposta.ok) {
      const dados = await resposta.json();
      console.log(dados); // Teste de inspeção dos dados no console
      mostrarResultados(dados);
    } else {
      throw Error(await resposta.text());
    }
  } catch (erro) {
    console.log(erro);
  }
}

// preencher os elementos HTML com os dados da API
function mostrarResultados(dados) {
  tempAtual.innerHTML = `${dados.main.temp.toFixed(0)}°F`;
  const iconesrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`;
  let descr = dados.weather[0].description;

  iconeDoClima.setAttribute('src', iconesrc);
  iconeDoClima.setAttribute('alt', descr);
  descrDaLegenda.textContent = `${descr}`;
}

// Execução da busca
apiFetch();