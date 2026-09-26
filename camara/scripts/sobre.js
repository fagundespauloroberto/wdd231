import { atracoes } from '../dados/atracao.mjs';

document.addEventListener('DOMContentLoaded', () => {
    handleVisitCounter();
    renderAttractions();
    setupMobileMenu();
});

/* 1. Cálculo de Visitas via localStorage */
function handleVisitCounter() {
    const messageContainer = document.getElementById('visit-message');
    if (!messageContainer) return;

    const lastVisit = localStorage.getItem('lastVisitTimestamp');
    const now = Date.now();

    if (!lastVisit) {
        messageContainer.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const msPerDay = 24 * 60 * 60 * 1000;
        const timeDifference = now - parseInt(lastVisit, 10);
        const daysDifference = Math.floor(timeDifference / msPerDay);

        if (timeDifference < msPerDay) {
            messageContainer.textContent = "Já voltou? Que legal!";
        } else {
            const dayWord = daysDifference === 1 ? "dia" : "dias";
            messageContainer.textContent = `Seu último acesso foi há ${daysDifference} ${dayWord}.`;
        }
    }

    // Atualiza a data da última visita para o acesso atual
    localStorage.setItem('lastVisitTimestamp', now.toString());
}

/* 2. Renderização dos Cartões Dinâmicos */
function renderAttractions() {
    const galleryContainer = document.getElementById('gallery-grid');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';

    atracoes.forEach(item => {
        const card = document.createElement('article');
        card.className = 'attraction-card';
        card.style.gridArea = item.id; // Vincula cada cartão à sua área de grade nomeada

        card.innerHTML = `
            <h2>${item.nome}</h2>
            <figure>
                <img src="imagens/${item.imagem}" alt="${item.nome}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.endereco}</address>
            <p>${item.descricao}</p>
            <button class="info-btn" type="button">Saiba mais</button>
        `;

        galleryContainer.appendChild(card);
    });
}

/* 3. Controle do Menu Responsivo */
function setupMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('open');
            btn.classList.toggle('open');
        });
    }
}