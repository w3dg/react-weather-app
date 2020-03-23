import React, { useState, useEffect } from "react";
const api_key = "e2b67636b902d2fc4320b0f2c059e920";
const api_base = `https://api.openweathermap.org/data/2.5/`;
const ipapiUrl = `https://ipapi.co/json`;

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    (async () => {
      // Set weather for first time based off their location
      const response = await fetch(ipapiUrl);
      const json = await response.json();
      const { city, country_code } = json;
      console.log(city, country_code);
      fetch(
        `${api_base}weather?q=${city}, ${country_code}&units=metric&APPID=${api_key}`
      )
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
        });
    })();
  }, []);

  function search(evt) {
    if (evt.key === "Enter") {
      fetch(`${api_base}weather?q=${query}&units=metric&APPID=${api_key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
        });
    }
  }

  function calcWindDirection(deg) {
    if (deg === 360 || deg === 0) {
      return "N";
    } else if (deg > 0 && deg < 90) {
      return "NE";
    } else if (deg === 90) {
      return "E";
    } else if (deg > 90 && deg < 180) {
      return "SE";
    } else if (deg === 180) {
      return "S";
    } else if (deg > 180 && deg < 270) {
      return "SW";
    } else if (deg === 270) {
      return "W";
    } else if (deg > 270 && deg < 360) {
      return "NW";
    } else {
      return "N/A";
    }
  }
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for your city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="wrapfull">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">
                  Lat: {weather.coord.lat}, Lon: {weather.coord.lon}
                </div>
              </div>
              <div className="weather-box">
                <div className="weather-temp">
                  <div className="icon">
                    <i className={"owf owf-" + weather.weather[0].id}></i>
                  </div>
                  <div className="temp">{Math.round(weather.main.temp)} °C</div>
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
              <div className="svgdiv">
                <p>Scroll down for more details</p>
                <svg
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="8 12 12 16 16 12"></polyline>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                </svg>
              </div>
            </div>
            <div className="extra-info">
              {/* <div className="humidity">Humidity: {weather.main.humidity}%</div>
               */}
              <div className="wind">
                <svg
                  viewBox="0 0 24 24"
                  className="extrasvgs"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
                <div className="wind">
                  {weather.wind.speed.toFixed(1)}m/s{" "}
                  {calcWindDirection(weather.wind.deg)}
                </div>
              </div>

              <div className="humidity">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="extrasvgs"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <div className="humidity">{weather.main.humidity}%</div>
              </div>

              <div className="visibility">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="extrasvgs"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>

                <div className="visibility">{weather.visibility / 1000}km</div>
              </div>
              <div className="clouds">
                <svg
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="extrasvgs"
                >
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>

                <div className="clouds">{weather.clouds.all}%</div>
              </div>
              <div className="feels-like">
                <svg
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="extrasvgs"
                >
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                </svg>

                <div className="feels-like">{weather.main.feels_like}°C</div>
              </div>

              <div className="minmax">
                <div className="mm">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="extrasvgs"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                  <p>/</p>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="extrasvgs"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
                <div className="minmax">
                  {Math.round(weather.main.temp_min)}/
                  {Math.round(weather.main.temp_max)} °C
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="no-city">
              Weather React
              <br />
              <small>Loading...</small>
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
