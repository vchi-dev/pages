import React, { useState } from 'react';
import logo from './logo.svg';

const weather_api = {
	key: "bad7b680058eadb2d456582593ec1fc2",
	base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
	const [query, setQuery] = useState(() => {
		return '';
	});
	const [saved_query, setSavedQuery] = useState(() => {
		return '';
	});
	const [weather, setWeather] = useState(() => {
		return '';
	});
	const [scale, setScale] = useState(() => {
		return 'celsius';
	});

	const search = event => {
		if (event.key === "Enter") {
			setSavedQuery(query);
			if (scale === "celsius") {
				fetch(`${weather_api.base}weather?q=${query}&units=metric&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
					setQuery('');
					setWeather(result);
				});
			}
			else {
				fetch(`${weather_api.base}weather?q=${query}&units=imperial&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
					setQuery('');
					setWeather(result);
				});
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

		return `${day}, ${month} ${date}, ${year}`;
	}

	function changeScale() {
		if (scale === 'celsius') {
			setScale('fahrenheit');
			if (typeof weather.main != "undefined") {
				fetch(`${weather_api.base}weather?q=${saved_query}&units=imperial&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
					setWeather(result);
				});
			}
		}
		else {
			setScale('celsius');
			if (typeof weather.main != "undefined") {
				fetch(`${weather_api.base}weather?q=${saved_query}&units=metric&APPID=${weather_api.key}`).then(res => res.json()).then(result => {
					setWeather(result);
				});
			}
		}
	}

	function updateClock() {
		var current_time = new Date();
		var hour = current_time.getHours();
		var minute = current_time.getMinutes();
		var meridiem = "AM";
		if (hour === 0) {
			hour = 12;
		}
		else if (hour > 12) {
			hour = hour - 12;
			meridiem = "PM";
		}
		if (minute < 10) {
			minute = ('0' + minute).slice(-2);
		}
		var ids = ["hour", "minute", "meridiem"];
		var values = [hour, minute, meridiem];
		// console.log(document.getElementById(ids[0]));
		for (var i = 0; i < ids.length; i++) {
			document.getElementById(ids[i]).firstChild.nodeValue = values[i];
		}
	}

	window.onload = function initClock() {
		updateClock();
		window.setInterval(function () { updateClock(); }, 1000);
	}

	const scrollTop = (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const showMusic = () => {
		var musicItems = document.querySelectorAll(".music-visible");
		console.log(musicItems);
		for (var i = 0; i < musicItems.length; i++) {
			musicItems[i].classList.toggle("display-none");
		}
	}

	return (
		<div className={(scale === "celsius") ? ((typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? "app" : "app cool") : "app") : ((typeof weather.main != "undefined") ? ((weather.main.temp > 59) ? "app" : "app cool") : "app")}>
			<nav className="navbar" id="top">
				<div className="nav-list">
					<div className="logo"><a href="#no-action" onClick={scrollTop}><span>Pages</span></a></div>
					<ul className="menu">
						<li><a href="https://vchi-dev.github.io/">About</a></li>
						<li><a href="#no-action" onClick={changeScale}>°{(scale === 'celsius') ? "C" : "F"}</a></li>
						<li><span className="material-icons md-dark" id="dark-mode">light_mode</span></li>
					</ul>
				</div>
			</nav>
			<main>
				<div className="second-nav">
					<input type="text" className="search-bar" placeholder="Search Your City's Weather..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
					{/* Weather */}
					{(typeof weather.main != "undefined") ? (
						<div>
							<div className="weather-box">
								<div className="temperature">{Math.round(weather.main.temp)}°{(scale === 'celsius') ? "C" : "F"}</div>
								<div className="weather">{weather.weather[0].main}</div>
							</div>
						</div>
					) : (
						<div>
							<div className="weather-box">
								<div className="temperature">00°{(scale === 'celsius') ? "C" : "F"}</div>
								<div className="weather">Empty</div>
							</div>
						</div>
					)}
					{/* Clock */}
					<div className="time-box">
						<div className="time">
							<span id="hour">00</span>:
							<span id="minute">00</span>
							<span id="meridiem">AM</span>
						</div>
					</div>
				</div>
				<div className="date">{dateBuilder(new Date())}</div>
				<div className="music-wrapper">
					<div className="music-bar">
						<span className="material-icons" id="show-music" onClick={showMusic}>expand_more</span>
						<span className="music-text music-visible">Now Playing</span>
						<span className="material-icons music-visible">more_horiz</span>
					</div>
					<div className="song-details">
						<p className="song-name"></p>
						<p className="song-artist"></p>
					</div>
					<div className="progress-div">
						<div className="progress-bar">
							<span></span>
						</div>
					</div>
					<div className="song-timer">
						<span className="current-time music-text music-visible">0:10</span>&nbsp;&nbsp;
						<span className="total-time music-text music-visible">3:40</span>
					</div>
					<div className="controls">
						<span className="material-icons music-visible" id="repeat">repeat</span>
						<span className="material-icons music-visible" id="prev">skip_previous</span>
						<div className="play-pause-button">
							<span className="material-icons music-visible" id="play">play_arrow</span>
						</div>
						<span className="material-icons music-visible" id="next">skip_next</span>
						<span className="material-icons music-visible" id="more">queue_music</span>
					</div>
				</div>
			</main>
			{/* Footer */}
			<div className="footer blur">
				<img src={logo} className="App-logo" alt="logo" height={"50px;"} />
				<p>Made with React by Vincent Chi</p>
			</div>
		</div>
	);
}

export default App;
