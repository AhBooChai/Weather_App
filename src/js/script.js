const searchButton = document.getElementById('searchButton');
const error = document.getElementById('error');
const icon = "http://openweathermap.org/img/wn/";
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=57090738bfcdb9093b1d877d7903c22f&q=';
const API_KEY = "AIzaSyBt8gibQBYoi8DtUck5HKCeUJcSa-Wzs8c"
let lat;
let lon;

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
        lat = data.coord.lat;
        lon = data.coord.lon;
        await getTimeZone(lat, lon, data.name)
        error.style.display = 'none';
    }
}

async function getTimeZone(latitude, longitude, city) {
    console.log({ latitude, longitude })
    const result = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=1331161200&key=${API_KEY}`)
    const data = await result.json();
    const timezone = data.timeZoneId;

    let options = {
            timeZone: timezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        },
        formatter = new Intl.DateTimeFormat([], options);
    const time = formatter.format(new Date())
    document.getElementById('dayAndTime').innerHTML = `${time}`;
    // alert(`Time in ${city} is ${time}`)
}
// 

searchButton.addEventListener('click', () => {
    const search = document.getElementById('search')
    weatherAPI(search.value);
    search.value = '';
});

// use Google Timezone API to get current time of city