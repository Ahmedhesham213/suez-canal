import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

/* Uses original css/weather.css + css/header.css - exact markup as weather.html
   The original weather.js logic is ported into useEffect */

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const SUEZ_LAT = 30.5852;
const SUEZ_LON = 32.2739;

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing Rime Fog", 51: "Drizzle: Light",
    61: "Rain: Slight", 63: "Rain: Moderate", 65: "Rain: Heavy",
    71: "Snow: Slight", 73: "Snow: Moderate", 75: "Snow: Heavy",
    95: "Thunderstorm", 99: "Thunderstorm with Hail",
  };
  return descriptions[code] || "Unknown Weather";
}

function getWeatherIcon(code) {
  const icons = {
    0: "sunny-icon.svg", 1: "clear-icon.svg", 2: "partly-cloudy-icon.svg",
    3: "cloudy-icon.svg", 45: "foggy-icon.svg", 48: "foggy-icon.svg",
    51: "drizzle-icon.svg", 61: "rainy-icon.svg", 63: "rainy-icon.svg",
    65: "rainy-icon.svg", 71: "rainy-icon.svg", 73: "rainy-icon.svg",
    75: "rainy-icon.svg", 95: "thunderstorm-icon.svg", 99: "hailstorm-icon.svg",
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

export default function Weather() {

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `${BASE_URL}?latitude=${SUEZ_LAT}&longitude=${SUEZ_LON}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`
        );
        const data = await response.json();
        updateCurrentWeather(data.current_weather);
        updateWeeklyForecast(data.daily);
        updateHighlights(data.current_weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    function updateCurrentWeather(current) {
      const tempEl = document.getElementById("current-temp");
      if (tempEl) tempEl.textContent = `${Math.round(current.temperature)}°C`;
      const dayEl = document.querySelector(".current-day");
      if (dayEl) dayEl.textContent = formatDate(new Date());
      const descEl = document.querySelector(".weather-desc");
      if (descEl) descEl.textContent = getWeatherDescription(current.weathercode);
      const rainEl = document.querySelector(".rain-chance");
      if (rainEl) rainEl.textContent = `Rain - ${current.precipitation_probability || 0}%`;
    }

    function updateWeeklyForecast(daily) {
      const forecastContainer = document.getElementById("forecast-container");
      if (!forecastContainer) return;
      forecastContainer.innerHTML = "";

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
            <img src="/images/weather/${weatherIcon}" alt="${getWeatherDescription(weatherCode)}">
            <p class="temp">${maxTemp}° - ${minTemp}°</p>
          </div>
        `;
      });
    }

    function updateHighlights(current) {
      const uvVal = document.querySelector('.uv-value');
      if (uvVal) uvVal.textContent = '5';
      const uvData = document.querySelector('.uv-data p');
      if (uvData) uvData.textContent = 'Normal';

      const windVal = document.querySelector('.wind-value');
      if (windVal) windVal.textContent = `${current.windspeed.toFixed(1)} km/h`;
      const windDir = document.querySelector('.wind-dir');
      if (windDir) windDir.textContent = getWindDirection(current.winddirection);

      const card3Values = document.querySelectorAll('.highlight-cards .card:nth-child(3) .value');
      if (card3Values[0]) card3Values[0].textContent = '6:00 AM';
      if (card3Values[1]) card3Values[1].textContent = '6:00 PM';
    }

    fetchWeatherData();
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/css/weather.css" />
      <link rel="stylesheet" href="/css/header.css" />

      {/* header */}
      <header className="header">
        <Link to="/" className="logo">
          <img src="/images/keep it2.png" alt="logo" width="150" className="logo-image" />
        </Link>

        <nav className="navbar">
          <NavLink to="/" end style={{ '--i': 1 }} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" style={{ '--i': 2 }} className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/travels" style={{ '--i': 3 }} className={({ isActive }) => isActive ? 'active' : ''}>Today Travels</NavLink>
          <NavLink to="/weather" style={{ '--i': 4 }} className={({ isActive }) => isActive ? 'active' : ''}>Weather</NavLink>
          <Link to="/login">
            <button className="singn_in_btn">sign in</button>
          </Link>
        </nav>

        <div className="soial-media">
          <a href="https://twitter.com/SuezAuthorityEG" target="_blank" rel="noreferrer" style={{ '--i': 1 }}><i className="bx bxl-twitter"></i></a>
          <a href="https://www.facebook.com/SuezCanalAuthorityEG/" target="_blank" rel="noreferrer" style={{ '--i': 2 }}><i className="bx bxl-facebook-circle"></i></a>
          <a href="https://www.instagram.com/suezcanalauthority/" target="_blank" rel="noreferrer" style={{ '--i': 3 }}><i className="bx bxl-instagram-alt"></i></a>
        </div>
      </header>

      {/* body - exact same as weather.html */}
      <div className="weather-dashboard">

        <div className="sidebar">
          <div className="current-weather">
            <div className="weather-icon">
              <img src="/images/weather/sunny-icon.png" alt="Current Weather" />
            </div>
            <h2 id="current-temp">12°C</h2>
            <p className="current-day">Monday, 16:00</p>
            <p className="weather-desc">Mostly Cloudy</p>
            <p className="rain-chance">Rain - 30%</p>
            <div className="location">
              <img src="/images/weather/background.jpg" alt="Location" />
              <p>Suez Canal, Suez, Egypt</p>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="forecast">
            <div className="tabs">
              <button className="tab" id="today-tab">Today</button>
              <button className="tab active" id="week-tab">Week</button>
            </div>
            <div className="forecast-days" id="forecast-container">
              <div className="forecast-day" id="forecast-day">
                <p className="day">Wednesday</p>
                <img src="/images/weather/cloudy-icon.svg" alt="Weather Icon" />
                <p className="temp">26° - 16°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">thursday</p>
                <img src="/images/weather/rainy-icon.svg" alt="Weather Icon" />
                <p className="temp">26° - 16°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">Friday</p>
                <img src="/images/weather/rainy-icon.svg" alt="Weather Icon" />
                <p className="temp">27° - 16°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">Saturday</p>
                <img src="/images/weather/foggy-icon.svg" alt="Weather Icon" />
                <p className="temp">27° - 15°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">Sunday</p>
                <img src="/images/weather/rainy-icon.svg" alt="Weather Icon" />
                <p className="temp">23° - 16°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">Monday</p>
                <img src="/images/weather/rainy-icon.svg" alt="Weather Icon" />
                <p className="temp">20° - 14°</p>
              </div>
              <div className="forecast-day" id="forecast-day">
                <p className="day">Tuesday</p>
                <img src="/images/weather/rainy-icon.svg" alt="Weather Icon" />
                <p className="temp">19° - 12°</p>
              </div>
            </div>
          </div>

          <div className="highlights">
            <h3>Today's Highlights</h3>
            <div className="highlight-cards">
              <div className="card">
                <h4>UV Index</h4>
                <div className="uv-data">
                  <span className="uv-value">5</span>
                  <p>Moderate</p>
                </div>
              </div>
              <div className="card">
                <h4>Wind Status</h4>
                <span className="wind-value">7.70 km/h</span>
                <p className="wind-dir">WSW</p>
              </div>
              <div className="card">
                <h4>Sunrise &amp; Sunset</h4>
                <span className="value" style={{ fontSize: '25px' }}>6:35 AM</span><br />
                <span className="value" style={{ fontSize: '25px' }}>5:42 PM</span>
              </div>
              <div className="card">
                <h4>Humidity</h4>
                <span className="value" id="Humidityv">12%</span>
                <p>Normal</p>
              </div>
              <div className="card">
                <h4>Visibility</h4>
                <span className="value">5.2 km</span>
                <p>Average</p>
              </div>
              <div className="card">
                <h4>Air Quality</h4>
                <span className="value">105</span>
                <p>Unhealthy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
