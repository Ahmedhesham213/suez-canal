import React, { useState, useEffect } from 'react';
import '../styles/weather.css';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const SUEZ_LAT = 30.5852;
const SUEZ_LON = 32.2739;

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState('week'); // 'today' or 'week'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWeatherData() {
      try {
        setLoading(true);
        // Fetch weather data, including daily metrics, uv, sunrise/sunset, humidity, and visibility
        const response = await fetch(
          `${BASE_URL}?latitude=${SUEZ_LAT}&longitude=${SUEZ_LON}&current=relative_humidity_2m,visibility&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max&current_weather=true&timezone=auto`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }
    getWeatherData();
  }, []);

  const getWeatherDescription = (code) => {
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
  };

  const getWeatherIcon = (code) => {
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
    return icons[code] || "clear-icon.svg";
  };

  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleString("en-US", options);
  };

  const getWeekday = (dateString) => {
    const date = new Date(dateString);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getDay()];
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="weather-page-container">
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1743e3', margin: 'auto' }}>
          Loading Weather Dashboard...
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-page-container">
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336', margin: 'auto' }}>
          Failed to load weather data. Please try again later.
        </div>
      </div>
    );
  }

  const { current_weather, daily, current } = weatherData;
  const currentTemp = Math.round(current_weather.temperature);
  const currentDesc = getWeatherDescription(current_weather.weathercode);
  const currentIcon = getWeatherIcon(current_weather.weathercode);
  const currentWindSpeed = current_weather.windspeed;
  const currentWindDir = getWindDirection(current_weather.winddirection);
  
  // Extracting from daily arrays
  const uvIndexToday = daily.uv_index_max ? daily.uv_index_max[0] : 5;
  const sunriseToday = daily.sunrise ? formatTime(daily.sunrise[0]) : '6:00 AM';
  const sunsetToday = daily.sunset ? formatTime(daily.sunset[0]) : '6:00 PM';
  const humidityToday = current.relative_humidity_2m ?? '65';
  const visibilityToday = current.visibility ? (current.visibility / 1000).toFixed(1) : '10.0';

  return (
    <div className="weather-page-container">
      <div className="weather-dashboard">
        
        {/* Sidebar displaying current weather details */}
        <div className="sidebar">
          <div className="current-weather">
            <div className="weather-icon">
              <img src={`/images/weather/${currentIcon}`} alt={currentDesc} />
            </div>
            <h2>{currentTemp}°C</h2>
            <p className="current-day">{formatDate(current_weather.time)}</p>
            <p className="weather-desc">{currentDesc}</p>
            <p className="rain-chance">Suez Transit Region</p>
            <div className="location">
              <img src="/images/weather/background.jpg" alt="Suez Canal Map Location" />
              <p>Suez Canal, Suez, Egypt</p>
            </div>
          </div>
        </div>

        {/* Main section showing weekly forecast or today detailed tabs */}
        <div className="main-content">
          <div className="forecast">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'today' ? 'active' : ''}`} 
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button 
                className={`tab ${activeTab === 'week' ? 'active' : ''}`} 
                onClick={() => setActiveTab('week')}
              >
                Week
              </button>
            </div>

            <div className="forecast-days">
              {activeTab === 'week' ? (
                daily.time.map((dateStr, index) => {
                  const maxTemp = Math.round(daily.temperature_2m_max[index]);
                  const minTemp = Math.round(daily.temperature_2m_min[index]);
                  const code = daily.weathercode[index];
                  const icon = getWeatherIcon(code);
                  const desc = getWeatherDescription(code);

                  return (
                    <div className="forecast-day" key={index}>
                      <p className="day">{getWeekday(dateStr)}</p>
                      <img src={`/images/weather/${icon}`} alt={desc} title={desc} />
                      <p className="temp">{maxTemp}° - {minTemp}°</p>
                    </div>
                  );
                })
              ) : (
                // Displaying expanded info for today
                <div style={{ padding: '20px', background: '#f8f9fc', borderRadius: '8px', border: '1px solid #e5e5e5', width: '100%', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#1743e3', marginBottom: '10px' }}>Today's Weather Conditions</h4>
                  <p style={{ margin: '5px 0' }}><strong>Condition:</strong> {currentDesc}</p>
                  <p style={{ margin: '5px 0' }}><strong>Current Temperature:</strong> {currentTemp}°C</p>
                  <p style={{ margin: '5px 0' }}><strong>Day Range:</strong> {Math.round(daily.temperature_2m_max[0])}°C Max / {Math.round(daily.temperature_2m_min[0])}°C Min</p>
                  <p style={{ margin: '5px 0' }}><strong>Wind Conditions:</strong> {currentWindSpeed} km/h from {currentWindDir}</p>
                  <p style={{ margin: '5px 0' }}><strong>Sun Cycle:</strong> Sunrise at {sunriseToday} / Sunset at {sunsetToday}</p>
                </div>
              )}
            </div>
          </div>

          {/* Highlights grids */}
          <div className="highlights">
            <h3>Today's Highlights</h3>
            <div className="highlight-cards">
              <div className="card">
                <h4>UV Index</h4>
                <div className="uv-data">
                  <span className="uv-value">{uvIndexToday}</span>
                  <p>{uvIndexToday > 5 ? 'High' : uvIndexToday > 2 ? 'Moderate' : 'Low'}</p>
                </div>
              </div>
              <div className="card">
                <h4>Wind Status</h4>
                <span className="wind-value">{currentWindSpeed} km/h</span>
                <p className="wind-dir">{currentWindDir}</p>
              </div>
              <div className="card">
                <h4>Sunrise & Sunset</h4>
                <span className="value" style={{ fontSize: '20px' }}>{sunriseToday}</span><br />
                <span className="value" style={{ fontSize: '20px' }}>{sunsetToday}</span>
              </div>
              <div className="card">
                <h4>Humidity</h4>
                <span className="value">{humidityToday}%</span>
                <p>{humidityToday > 60 ? 'Humid' : humidityToday > 30 ? 'Normal' : 'Dry'}</p>
              </div>
              <div className="card">
                <h4>Visibility</h4>
                <span className="value">{visibilityToday} km</span>
                <p>{parseFloat(visibilityToday) > 8 ? 'Clear' : 'Foggy'}</p>
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
    </div>
  );
}
