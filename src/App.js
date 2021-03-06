import './App.css';
import React, { useState } from 'react';

// OpenWeatherMap API key & site link
const api = {
  key: "3be4a59490bd19b22f63c9eb0f02c5d8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // Search bar functionality to pull city weather data (metric) based in search query
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  }

  // Display today's date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // Adjust date to show ex: 1st, 5th instead of 1, 5
    if (date === 1 || date === 21 || date === 31) {
      date = date + "st";
    } else if (date === 3 || date === 23) {
      date = date + "rd";
    } else {
      date = date + "th";
    }

    return `${day} ${month} ${date}, ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? 'Warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div 
          className="location-box">
            <div 
            className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div 
            className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div 
          className="weather-box">
            <div 
            className="temp">
              {Math.round(weather.main.temp)}??c
            </div>
            <div 
            className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;
