document.addEventListener('DOMContentLoaded', () => {
    // Configurações do OpenWeatherMap
    const apiKey = 'aec60799ec6fb1768a1d7fbae2b57a34'; //chave aqui, passamos por parametro
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
        forecastEl.innerHTML = '';

        //filtro da lista para pegar um horário fixo por dia (ex: 12:00) para os próximos 3 dias
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

    const membersUrl = 'dados/membros.json';

    async function fetchSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) throw new Error('Erro ao carregar membros');
            const members = await response.json();

            // membros nível 2 (Prata) e 3 (Ouro)
            const qualifiedMembers = members.filter(m => m.nivel === 2 || m.nivel === 3);

            //sorteia aleatoriamente entre 2 e 3 membros
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error('Erro ao carregar destaques:', error);
        }
    }

    function displaySpotlights(spotlights) {
        const container = document.getElementById('spotlight-cards');
        if (!container) return;
        container.innerHTML = '';

        const levelText = { 2: 'Membro Prata', 3: 'Membro Ouro' };

        spotlights.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';

            card.innerHTML = `
                <span class="badge level-${member.nivel}">${levelText[member.nivel]}</span>
                <img src="imagens/${member.imagem}" alt="Logo ${member.nome}" loading="lazy">
                <h3>${member.nome}</h3>
                <p><strong>Telefone:</strong> ${member.telefone}</p>
                <p><strong>Endereço:</strong> ${member.endereco}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Acessar Website</a></p>
            `;
            container.appendChild(card);
        });
    }

    fetchWeather();
    fetchSpotlights();
});