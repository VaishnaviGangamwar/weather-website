import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const api = {
    key: "39ab4adb78148d3e4edf430b158a8ef1",
    base: "https://api.openweathermap.org/data/2.5/weather",
  };

  useEffect(() => {
    const fetchWeatherByGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`${api.base}?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
              .then((res) => res.json())
              .then((d) => setWeather(d));
          },
          (error) => {
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
      }
    };
    fetchWeatherByGeolocation();
  }, []);
  const handleSearch = () => {
    fetch(`${api.base}?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((d) => setWeather(d));
  };
  return (
    <div className="main">
      <div className="Card">
        <input
          type="Search"
          placeholder="Enter Your City"
          onChange={(e) => setSearch(e.target.value)}
          className="inp"
        />
        <button onClick={handleSearch} className="btn">
          Get Location
        </button>
        <div className="Card1">
          {typeof weather.main !== "undefined" ? (
            <div className="data">
              <p>City : {weather.name}</p>
              <p>Tempreture : {weather.main.temp} C</p>
              <p>Weather : {weather.weather[0].main}</p>
              <p>Weather : {weather.weather[0].description}</p>
            </div>
          ) : (
            "Not Found"
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

