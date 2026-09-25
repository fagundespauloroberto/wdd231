document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Lógica de Controle dos Modais
    const openButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Abre o modal correspondente ao clicar no botão do cartão
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const dialog = document.getElementById(modalId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    //fechamos o modal - click botão "Fechar"
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });

    // Fecha o modal ao clicar fora dele (no backdrop)
    const dialogs = document.querySelectorAll('.membership-dialog');
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                dialog.close();
            }
        });
    });
});