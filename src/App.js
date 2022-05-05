import React, {useState, setState} from 'react';
import logo from './logo.svg';

const weather_api = {
  key: "bad7b680058eadb2d456582593ec1fc2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [saved_query, setSavedQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [scale, setScale] = useState('celsius');

  const search = event => {
    if (event.key === "Enter") {
      setSavedQuery(query);
      if (scale === "celsius") {
        fetch(`${weather_api.base}weather?q=${query}&units=metric&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
          setQuery('');
          setWeather(result);});
      }
      else {
        fetch(`${weather_api.base}weather?q=${query}&units=imperial&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
          setQuery('');
          setWeather(result);});
      }
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  function changeScale() {
    if (scale === 'celsius') {
      setScale('fahrenheit');
      if (typeof weather.main != "undefined") {
        fetch(`${weather_api.base}weather?q=${saved_query}&units=imperial&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
          setWeather(result);});
      }
    }
    else {
      setScale('celsius');
      if (typeof weather.main != "undefined") {
        fetch(`${weather_api.base}weather?q=${saved_query}&units=metric&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
          setWeather(result);});
      }
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? "app" : "app cool") : "app"}>
      <nav className="navbar">
            <div className="nav-list">
                <div className="logo"><a href="#weather"><span>Pages</span></a></div>
                <ul className="menu">
                    <li><a href="https://vchi-dev.github.io/">About</a></li>
                    <li><a href="#weather">Weather</a></li>
                    <li><a href="#time">Time</a></li>
                    <li><a href="#weather" onClick={changeScale}>°{(scale === 'celsius') ? "C" : "F"}</a></li>
                    <li><img src={require("./assets/img/dark_light.png")} id="dark_light" alt="" /></li>
                </ul>
            </div>
      </nav>
      <div id="weather"></div>
      <main>
        <div className="top-bar">
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temperature">{Math.round(weather.main.temp)}°{(scale === 'celsius') ? "C" : "F"}</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
            ) : ('')}
        </div>
        <div className="empty-space" id="time"></div>
      </main>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
