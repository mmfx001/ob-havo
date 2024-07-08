let input = document.querySelector('input')
let btn = document.querySelector('button')
let hed = document.querySelector('.hed')
let but = document.querySelector('.but')
let hed1 = document.querySelector('.hed1')
let but1 = document.querySelector('.but1')
let bottm = document.querySelector(".bottm")
let wrapper = document.querySelector('.wrapper')
const Funct = () => {
    let qury = input.value
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
            const b1 = document.createElement('h2')
            b1.innerHTML = data.location.country
            hed.appendChild(b1)
            const b = document.createElement('h2')
            b.innerHTML = data.location.region
            hed.appendChild(b)
            console.log(data)

            const p = document.createElement('p')
            p.innerHTML = `soat; ${data.current.last_updated}`
            but.appendChild(p)
            const b2 = document.createElement('p')
            b2.innerHTML = `baland harorat +${data.current.windchill_c}°`
            but.appendChild(b2)


            const h1 = document.createElement('h1')
            h1.innerHTML = `+${data.current.temp_c}°`
            hed1.appendChild(h1)
            const img = document.createElement("img")
            img.src = data.current.condition.icon
            hed1.appendChild(img)
            const p2 = document.createElement('p')
            p2.innerHTML = `pas harorat +${data.current.pressure_in}°`
            hed1.appendChild(p2)
            
            let whid = document.createElement('div')
                
             whid.innerHTML=`<img src="./363-3638728_wind-icon-png-free-stock-blue-wind-icon-removebg-preview.png" alt="">${data.current.wind_mph}<p>M/C</p>`
             but1.appendChild(whid)
             let whater = document.createElement('div')
             whater.classList.add('whater'); 
             whater.innerHTML=` <img src="./images__3_-removebg-preview.png" alt="">${data.current.humidity}<p>%</p>`
             
             but1.appendChild(whater)
             let ww = document.createElement('div')
                
             ww.innerHTML=`<img src="./png-clipart-barometer-computer-icons-gauge-atmospheric-pressure-barometer-angle-atmospheric-pressure-removebg-preview.png" alt="">${data.current.pressure_mb} <p>MM</p>`
             but1.appendChild(ww)
        })

}

btn.addEventListener('click', Funct)



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
