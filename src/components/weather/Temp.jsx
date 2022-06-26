import { useEffect, useState } from "react";
import "./Temp.css";
import { WeatherCard } from "./WeatherCard";

export const Temp = () => {
  const [cityName, setCityName] = useState("patna");
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=00eaedc2746bfa3e2a5048b61354926b`;
      let res = await fetch(url);
      let data = await res.json();
      //   console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setWeatherInfo(myNewWeatherInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            className="searchTerm"
            placeholder="Search..."
            id="search"
            type="search"
            autoFocus
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button className="searchButton" onClick={getWeather}>
            Search
          </button>
        </div>
      </div>

      <WeatherCard weatherInfo={weatherInfo} />
    </>
  );
};
