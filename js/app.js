const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const errorMessage = document.getElementById("errorMessage");
const loader = document.getElementById("loader");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoader();

  try {
    const response = await fetch(
      `http://localhost:3000/weather?city=${city}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
}

function displayWeather(data) {
  weatherCard.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡 Temperature: ${data.main.temp}°C`;
  description.textContent = `☁ Condition: ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
}

function showError(message) {
  weatherCard.classList.add("hidden");
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}