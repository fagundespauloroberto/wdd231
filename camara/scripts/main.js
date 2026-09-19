document.addEventListener('DOMContentLoaded', () => {
    // Menu Responsivo (Hambúrguer)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');

    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
        });
    }

    // Atualização Dinâmica do Ano e Última Modificação no Rodapé
    const currentYearEl = document.getElementById('current-year');
    const lastModifiedEl = document.getElementById('last-modified');

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Última modificação: ${document.lastModified}`;
    }
});
