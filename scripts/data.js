document.addEventListener("DOMContentLoaded", () => {
    const anoAtualSpan = document.getElementById("anoAtual");
    const ultimaModificacaoP = document.getElementById("ultimaModificacao");

    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    if (ultimaModificacaoP) {
        ultimaModificacaoP.textContent = `Última Modificação: ${document.lastModified}`;
    }
});