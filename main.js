let input = document.querySelector('input');
let btn = document.querySelector('button');
let hed = document.querySelector('.hed');
let but = document.querySelector('.but');
let hed1 = document.querySelector('.hed1');
let but1 = document.querySelector('.but1');
let bottm = document.querySelector(".bottm");
let wrapper = document.querySelector('.wrapper');

const Funct = () => {
    hed.innerHTML = '';
    but.innerHTML = '';
    hed1.innerHTML = '';
    but1.innerHTML = '';

    let qury = input.value;
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${qury}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '011641d6a5msh0e0918209bc6738p10a5c3jsn54bb0313d8b9',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            const country = document.createElement('h2');
            country.textContent = data.location.country;
            hed.appendChild(country);

            const region = document.createElement('h2');
            region.textContent = data.location.region;
            hed.appendChild(region);

            const updateTime = document.createElement('p');
            updateTime.textContent = `Last Updated: ${data.current.last_updated}`;
            but.appendChild(updateTime);

            const windChill = document.createElement('p');
            windChill.textContent = `Feels like: +${data.current.windchill_c}°C`;
            but.appendChild(windChill);

            const temperature = document.createElement('h1');
            temperature.textContent = `+${data.current.temp_c}°C`;
            hed1.appendChild(temperature);

            const conditionIcon = document.createElement('img');
            conditionIcon.src = data.current.condition.icon;
            hed1.appendChild(conditionIcon);

            const pressure = document.createElement('p');
            pressure.textContent = `Pressure: ${data.current.pressure_in} inHg`;
            hed1.appendChild(pressure);

            const windInfo = document.createElement('div');
            windInfo.innerHTML = `<img src="./363-3638728_wind-icon-png-free-stock-blue-wind-icon-removebg-preview.png" alt="">${data.current.wind_mph}<p>m/s</p>`;
            but1.appendChild(windInfo);

            const humidityInfo = document.createElement('div');
            humidityInfo.classList.add('whater');
            humidityInfo.innerHTML = `<img src="./images__3_-removebg-preview.png" alt="">${data.current.humidity}<p>%</p>`;
            but1.appendChild(humidityInfo);

            const pressureInfo = document.createElement('div');
            pressureInfo.innerHTML = `<img src="./png-clipart-barometer-computer-icons-gauge-atmospheric-pressure-barometer-angle-atmospheric-pressure-removebg-preview.png" alt="">${data.current.pressure_mb} <p>mm</p>`;
            but1.appendChild(pressureInfo);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
           
        });
};

btn.addEventListener('click', Funct);



btn.addEventListener('click', () => {
    const city = input.value.trim();

    if (city) {
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=7`;
        const options = {
            method: 'GET',
            headers: {
                        'x-rapidapi-key': '011641d6a5msh0e0918209bc6738p10a5c3jsn54bb0313d8b9',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderForecast(data);
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                alert('Ma\'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
            });
    } else {
        alert('Iltimos, shahar nomini kiriting!');
    }
});

function renderForecast(data) {
  bottm.innerHTML=''

    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        const haftakun = document.createElement('div');
    

        haftakun.innerHTML = `
            <h2>${dayOfWeek}</h2>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>Max: ${day.day.maxtemp_c}°C</p>
            <p>Min: ${day.day.mintemp_c}°C</p>
            <p>${day.day.condition.text}</p>
        `;

        bottm.appendChild(haftakun);
    });
}
