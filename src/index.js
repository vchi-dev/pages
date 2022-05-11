import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

$(document).ready(function () {
	// When scrolling, bring the navbar in and out of view.
	// Add blur to navbar.
	$(window).scroll(function () {
		if (this.scrollY > 25) {
			$('.navbar').addClass("sticky");
			$('.navbar').addClass("blur");
		}
		else {
			$('.navbar').removeClass("sticky");
			$('.navbar').removeClass("blur");
		}
	})

	// Dark and Light theme
	var darktheme = document.getElementById("dark-mode").onclick = function () {
		// Makes all the colors change.
		document.body.classList.toggle("dark-theme");

		// Change all icons from light to dark, vice versa.
		$('.material-icons').toggleClass("md-dark");
		$('.material-icons').toggleClass("md-light");

		// Changes the moon to the sun.
		var darkicon = document.getElementById("dark-mode");
		if (darkicon.innerHTML === "dark_mode") {
			darkicon.innerHTML = "light_mode";
		}
		else {
			darkicon.innerHTML = "dark_mode";
		}

		// Changes the color of the rest of the icons.
		$('.dark-icons').toggleClass("invert-color");
		$('.dark-icons-body').toggleClass("invert-color");
	}
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();