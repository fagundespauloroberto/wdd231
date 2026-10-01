import { atracoes } from '../dados/atracoes.mjs';

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

    localStorage.setItem('lastVisitTimestamp', now.toString());
}

/* 2. Renderização dos Cartões Dinâmicos (CORRIGIDA) */
function renderAttractions() {
    const galleryContainer = document.getElementById('gallery-grid');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';

    atracoes.forEach(item => {
        const card = document.createElement('article');
        card.className = 'attraction-card animate-card';
        card.style.gridArea = item.id;

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.alt}" width="400" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
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