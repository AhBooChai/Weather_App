const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const icon = "http://openweathermap.org/img/wn/";
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=57090738bfcdb9093b1d877d7903c22f&q=';

async function weatherAPI(city) {
    const response = await fetch(apiURL + city);

    if (response.status === 404) {
        document.getElementById('error').innerHTML = 'error';
    } else {
        let data = await response.json();
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('icon').src = icon + data.weather[0].icon + '.png';
    }
}

searchButton.addEventListener('click', () => {
    weatherAPI(search.value);
    search.value = '';
});