export const atracoes = [
  {
    id: "item1",
    name: "Igreja Matriz São Luiz Gonzaga",
    image: "imagens/matriz.webp",
    alt: "Igreja Matriz São Luiz Gonzaga",
    address: "Centro, Xaxim - SC",
    description: "Conhecida como o principal cartão-postal da cidade, esta imponente igreja na região central destaca-se pela bela arquitetura e reformas recentes."
  },
  {
    id: "item2",
    name: "Praça Frei Bruno",
    image: "imagens/praca-frei-bruno.webp",
    alt: "Praça Frei Bruno",
    address: "Centro, Xaxim - SC",
    description: "Localizada no centro e em frente à Igreja Matriz, é um espaço arborizado tradicional para caminhadas, descanso e convivência."
  },
  {
    id: "item3",
    name: "Villaggio Famiglia Rossoni",
    image: "imagens/villaggio-rossoni.webp",
    alt: "Villaggio Famiglia Rossoni",
    address: "Linha Pilão de Pedra, Xaxim - SC",
    description: "Propriedade de turismo rural que oferece imersão na cultura italiana, peças históricas preservadas e excelente comida colonial (atendimento aos fins de semana e sob agendamento)."
  },
  {
    id: "item4",
    name: "Heredità – Famiglia Turcatel",
    image: "imagens/heredita-turcatel.webp",
    alt: "Heredità Famiglia Turcatel",
    address: "Linha Golfo de Cima, Xaxim - SC",
    description: "Espaço de agricultura familiar que serve café colonial artesanal e promove o contacto direto com a natureza mediante agendamento prévio."
  },
  {
    id: "item5",
    name: "Camping Pavan",
    image: "imagens/camping-pavan.webp",
    alt: "Camping Pavan",
    address: "Linha Limeira, Xaxim - SC",
    description: "Possui infraestrutura com piscinas naturais, trilhas ecológicas e belas cascatas, sendo ideal para os praticantes de ecoturismo e lazer ao ar livre."
  },
  {
    id: "item6",
    name: "Ecoparque Sol Nascente",
    image: "imagens/ecoparque-sol-nascente.webp",
    alt: "Ecoparque Sol Nascente",
    address: "Xaxim - SC",
    description: "Área verde muito procurada por visitantes e moradores para contemplação ambiental, momentos de lazer ao ar livre e registos fotográficos."
  },
  {
    id: "item7",
    name: "Gruta Pedro Guerreiro",
    image: "imagens/gruta-pedro-guerreiro.webp",
    alt: "Gruta Pedro Guerreiro",
    address: "Localidade de Colorado (~5 km do centro), Xaxim - SC",
    description: "Marco histórico e património público localizado no interior do município, rodeado de natureza e tranquilidade."
  },
  {
    id: "item8",
    name: "Pesque Pague Invitti",
    image: "imagens/pesque-pague-invitti.webp",
    alt: "Pesque Pague Invitti",
    address: "Zona Rural, Xaxim - SC",
    description: "Espaço de lazer estruturado com açudes para pesca desportiva e momentos de convivência num ambiente campestre acolhedor."
  }
];

/**
 * Renderiza os cartões de atrações dentro do container especificado.
 * @param {string} containerSelector - Seletor CSS do elemento container (ex: '.attractions-grid')
 */
export function renderAttractions(containerSelector = '.attractions-grid') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = attractions.map(item => `
    <article class="attraction-card animate-card" style="grid-area: ${item.id};">
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.alt}" loading="lazy" width="400" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
    </article>
  `).join('');
}
