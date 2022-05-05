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

// When scrolling, bring the navbar in and out of view.
$(document).ready(function() {
  $(window).scroll(function() {
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
  var dark_light = document.getElementById("dark_light").onclick = function() {
      document.body.classList.toggle("dark-theme");
      $('#dark_light').toggleClass("invert-color");
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
