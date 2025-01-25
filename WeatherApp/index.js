

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');

const API_KEY = "f3ade56be50f37ba8f82c37167e65de6";

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else {
        throw new Error("Unable to fetch weather data. Please try again later.");
      }
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;

  weatherDisplay.innerHTML = `
    <p><strong>City:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
  `;
  weatherDisplay.classList.remove("error");
}

function displayError(message) {
  weatherDisplay.innerHTML = `<p>${message}</p>`;
  weatherDisplay.classList.add("error");
}
