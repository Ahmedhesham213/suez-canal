// Weather API configuration
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const SUEZ_LAT = 30.5852;
const SUEZ_LON = 32.2739;

// Fetch weather data and update dashboard
async function fetchWeatherData() {
    try {
        const response = await fetch(`${BASE_URL}?latitude=${SUEZ_LAT}&longitude=${SUEZ_LON}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`);
        const data = await response.json();

        // Update all sections with new data
        updateCurrentWeather(data.current_weather);
        updateWeeklyForecast(data.daily);
        updateHighlights(data.current_weather);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        //alert("Failed to load weather data. Please try again later.");
    }
}

// Update current weather section
function updateCurrentWeather(current) {
    document.getElementById("current-temp").textContent = `${Math.round(current.temperature)}°C`;
    document.querySelector(".current-day").textContent = formatDate(new Date());
    document.querySelector(".weather-desc").textContent = getWeatherDescription(current.weathercode);
    document.querySelector(".rain-chance").textContent = `Rain - ${current.precipitation_probability || 0}%`;
}

// Update weekly forecast
function updateWeeklyForecast(daily) {
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = ""; // Clear existing forecast

    daily.time.forEach((dateString, index) => {
        const date = new Date(dateString);
        const weekday = getWeekday(date);
        const maxTemp = Math.round(daily.temperature_2m_max[index]);
        const minTemp = Math.round(daily.temperature_2m_min[index]);
        const weatherCode = daily.weathercode[index];
        const weatherIcon = getWeatherIcon(weatherCode);

        forecastContainer.innerHTML += `
            <div class="forecast-day" data-day="${index}">
                <p class="day">${weekday}</p>
                <img src="images/weather/${weatherIcon}" alt="${getWeatherDescription(weatherCode)}">
                <p class="temp">${maxTemp}° - ${minTemp}°</p>
            </div>
        `;
    });
}

// Update highlights section
function updateHighlights(current) {
    // UV Index (Open-Meteo doesn't provide UV data; placeholder)
    document.querySelector('.uv-value').textContent = '5';
    document.querySelector('.uv-data p').textContent = 'Normal';

    // Wind Status
    document.querySelector('.wind-value').textContent = `${current.windspeed.toFixed(1)} km/h`;
    document.querySelector('.wind-dir').textContent = getWindDirection(current.winddirection);

    // Sunrise & Sunset (Open-Meteo doesn't provide this data; placeholder)
    document.querySelector('.highlight-cards .card:nth-child(3) .value:first-child').textContent = '6:00 AM';
    document.querySelector('.highlight-cards .card:nth-child(3) .value:last-child').textContent = '6:00 PM';

    // Humidity (Open-Meteo doesn't provide humidity data; placeholder)
    document.querySelector('Humidityv').textContent = `${current.relative_humidity}`;

    // Visibility (Open-Meteo doesn't provide visibility data; placeholder)
    document.querySelector('.highlight-cards .card:nth-child(5) .value').textContent = `${current.visiblity} km`;

    // Air Quality (Placeholder, as Open-Meteo doesn't provide AQI)
    document.querySelector('.highlight-cards .card:nth-child(6) .value').textContent = '105'; // Replace with actual data if available
}

// Helper Functions
function getWeatherDescription(code) {
    const descriptions = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing Rime Fog",
        51: "Drizzle: Light",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy",
        71: "Snow: Slight",
        73: "Snow: Moderate",
        75: "Snow: Heavy",
        95: "Thunderstorm",
        99: "Thunderstorm with Hail",
    };
    return descriptions[code] || "Unknown Weather";
}

function getWeatherIcon(code) {
    const icons = {
        0: "sunny-icon.svg",
        1: "clear-icon.svg",
        2: "partly-cloudy-icon.svg",
        3: "cloudy-icon.svg",
        45: "foggy-icon.svg",
        48: "foggy-icon.svg",
        51: "drizzle-icon.svg",
        61: "rainy-icon.svg",
        63: "rainy-icon.svg",
        65: "rainy-icon.svg",
        71: "rainy-icon.svg",
        73: "rainy-icon.svg",
        75: "rainy-icon.svg",
        95: "thunderstorm-icon.svg",
        99: "hailstorm-icon.svg",
    };
    return icons[code] || "unknown-icon.svg";
}

function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
}

function formatDate(date) {
    const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleString("en-US", options);
}

function getWeekday(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
}

// Initialize the dashboard with weather data
fetchWeatherData();
