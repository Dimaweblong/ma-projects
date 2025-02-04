
const apiKey = "97b28ff4bbdf1459884f8b126af96005";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="; // Убираем лишний параметр

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found"); // Обработка ошибок
        }

        let data = await response.json();
        console.log(data);

        // Заполнение данных в HTML
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/cloud.png'
        }
        else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png'
        }
        else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png'
        }
        else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png'
        }

        document.querySelector(".weather").style.display = "block"

    } catch (error) {
        console.error("Error:", error);
        // Вывод ошибки на экран, если город не найден
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Пожалуйста введите название города");
    }
});

