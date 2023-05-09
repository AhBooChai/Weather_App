const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const error = document.getElementById('error');
const icon = "http://openweathermap.org/img/wn/";
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=57090738bfcdb9093b1d877d7903c22f&q=';

// Convert country code to country name
const countryNames = new Intl.DisplayNames(
    ['en'], { type: 'region' }
);

// API call to retrieve data
async function weatherAPI(city) {
    const response = await fetch(apiURL + city);

    if (response.status === 404) {
        error.style.display = 'block';
        error.innerHTML = 'Invalid city name entered!';
    } else {
        let data = await response.json();
        console.log(data);
        let country = countryNames.of(data.sys.country);
        document.getElementById('city').innerHTML = data.name + ', ' + country;
        document.getElementById('icon').src = icon + data.weather[0].icon + '.png';
        document.getElementById('temperature').innerHTML = Math.floor(data.main.temp) + ' °C';
        document.getElementById('description').innerHTML = data.weather[0].description;
        document.getElementById('humidity').innerHTML = data.main.humidity + ' %';
        document.getElementById('windSpeed').innerHTML = data.wind.speed + ' km/h';
        document.getElementById('lowTemperature').innerHTML = Math.floor(data.main.temp_min) + ' °C';
        document.getElementById('highTemperature').innerHTML = Math.floor(data.main.temp_max) + ' °C';
        error.style.display = 'none';
    }
}

searchButton.addEventListener('click', () => {
    weatherAPI(search.value);
    search.value = '';
});