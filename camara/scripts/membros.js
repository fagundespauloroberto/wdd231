document.addEventListener('DOMContentLoaded', () => {
    const url = 'dados/membros.json';
    const membersContainer = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    const levelNames = {
        1: 'Membro',
        2: 'Prata',
        3: 'Ouro'
    };

    async function getMembersData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Falha ao carregar arquivo de membros');
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error('Erro ao buscar membros:', error);
            if (membersContainer) {
                membersContainer.innerHTML = '<p>Erro ao carregar o diretório de membros. Tente novamente mais tarde.</p>';
            }
        }
    }

    function displayMembers(members) {
        if (!membersContainer) return;
        membersContainer.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'member-card';

            card.innerHTML = `
                <img src="imagens/${member.imagem}" alt="Logo de ${member.nome}" loading="lazy">
                <div>
                    <h3>${member.nome}</h3>
                    <p><strong>Endereço:</strong> ${member.endereco}</p>
                    <p><strong>Telefone:</strong> ${member.telefone}</p>
                    <p><a href="${member.website}" target="_blank" rel="noopener">Acessar Site</a></p>
                </div>
                <div>
                    <span class="member-level level-${member.nivel}">${levelNames[member.nivel] || 'Membro'}</span>
                </div>
            `;

            membersContainer.appendChild(card);
        });
    }

    // Alternância de Layout (Grade / Lista)
    if (gridBtn && listBtn && membersContainer) {
        gridBtn.addEventListener('click', () => {
            membersContainer.className = 'grid-view';
            gridBtn.classList.add('active-view');
            listBtn.classList.remove('active-view');
        });

        listBtn.addEventListener('click', () => {
            membersContainer.className = 'list-view';
            listBtn.classList.add('active-view');
            gridBtn.classList.remove('active-view');
        });
    }

    getMembersData();
});