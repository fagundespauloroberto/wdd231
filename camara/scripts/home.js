document.addEventListener('DOMContentLoaded', () => {
    // passando os dados por parametro para o OpenWeatherMap
    const apiKey = 'aec60799ec6fb1768a1d7fbae2b57a34';
    const lat = '-26.96'; 
    const lon = '-52.53'; 
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            //clima Atual
            const responseCurrent = await fetch(weatherUrl);
            if (responseCurrent.ok) {
                const dataCurrent = await responseCurrent.json();
                displayCurrentWeather(dataCurrent);
            }

            //previsão 3 Dias
            const responseForecast = await fetch(forecastUrl);
            if (responseForecast.ok) {
                const dataForecast = await responseForecast.json();
                displayForecast(dataForecast);
            }
        } catch (error) {
            console.error('Erro ao buscar clima:', error);
        }
    }

    function displayCurrentWeather(data) {
        const currentWeatherEl = document.getElementById('current-weather');
        if (!currentWeatherEl) return;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;

        currentWeatherEl.innerHTML = `
            <div class="weather-info">
                <img src="${iconUrl}" alt="${desc}">
                <div>
                    <p class="temp">${temp}°C</p>
                    <p class="desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
                </div>
            </div>
        `;
    }

    function displayForecast(data) {
        const forecastEl = document.getElementById('forecast');
        if (!forecastEl) return;
        forecastEl.innerHTML = '';

        //pegar horário fixo por dia (12:00) para os próximos 3 dias
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        dailyForecasts.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
            const temp = Math.round(item.main.temp);

            const dayDiv = document.createElement('div');
            dayDiv.className = 'forecast-day';
            dayDiv.innerHTML = `
                <p><strong>${dayName.toUpperCase()}</strong></p>
                <p>${temp}°C</p>
            `;
            forecastEl.appendChild(dayDiv);
        });
    }

    const levelNames = {
        1: 'Membro',
        2: 'Prata',
        3: 'Ouro'
    };

    async function fetchSpotlights() {
        try {
            const response = await fetch('./dados/membros.json');
            if (!response.ok) throw new Error('Erro ao carregar membros');
            const members = await response.json();

        //membros de nível Prata (2) e Ouro (3)
            const qualifiedMembers = members.filter(m => m.nivelAtuacao === 2 || m.nivelAtuacao === 3);

        //embaralha a lista filtrada
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        //selec até 3 membros
            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error('Erro ao carregar os destaques:', error);
            const container = document.getElementById('spotlight-cards');
            if (container) {
                container.innerHTML = '<p>Erro ao carregar os membros em destaque.</p>';
            }
        }
    }

    function displaySpotlights(spotlights) {
        const container = document.getElementById('spotlight-cards');
        if (!container) return;
        container.innerHTML = '';

        spotlights.forEach(member => {
            const card = document.createElement('article');
            card.className = 'spotlight-card';

            // Trata a URL do campo 'site'
            const rawWeb = member.site || '#';
            const cleanWeb = rawWeb.replace(/^https?:\/\//, '').split('/')[0]; // Exibe apenas o domínio limpo

            card.innerHTML = `
                <div class="spotlight-header">
                    <h3>${member.nome}</h3>
                    <p class="tagline">${member.descricao || 'Empresa Associada'}</p>
                </div>
                <hr>
                <div class="spotlight-body">
                    <img src="imagens/${member.imagem}" alt="Logo de ${member.nome}" loading="lazy">
                    <div class="spotlight-details">
                        <p><strong>NÍVEL:</strong> <span class="badge level-${member.nivelAtuacao}">${levelNames[member.nivelAtuacao]}</span></p>
                        <p><strong>ENDEREÇO:</strong> ${member.endereco}</p>
                        <p><strong>TELEFONE:</strong> ${member.telefone}</p>
                        <p><strong>SITE:</strong> <a href="${rawWeb}" target="_blank" rel="noopener">${cleanWeb}</a></p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    fetchWeather();
    fetchSpotlights();
});