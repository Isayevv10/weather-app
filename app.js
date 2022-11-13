let container = document.querySelector(".container");
let weatherForm = document.querySelector(".weather-form");
let nameCity = document.querySelector(".name");
let desc = document.querySelector(".desc");
let temp = document.querySelector(".temp");
let inputValue = document.querySelector(".inputValue");
let minmax = document.querySelector(".minmax");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let myKey = "9400084bd0795e15d5dd086f9a7a6356";
let date = document.querySelector(".date");

// get date
let time = new Date();
let day = time.getDate();
let month = time.getMonth() + 1;
let year = time.getFullYear();
let hour = time.getHours();
date.innerHTML = `${day} / ${month} / ${year}`;

// background changes
if (hour > 17 && hour < 5) {
  container.style.backgroundImage = "url('./night.jpg')";
} else {
  container.style.backgroundImage = "url('./weather.png')";
}

// send city name to weatherData function
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = inputValue.value;
  if (cityName === "" || cityName === null) {
    weatherData();
  } else {
    geoWeather(cityName);
  }

  weatherForm.reset();
});

// fetch data when you write cityname to form
function geoWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&lang=az&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      nameCity.innerHTML = `${data.name}, ${data.sys.country}`;
      temp.innerHTML = `${Math.round(data.main.feels_like)}°C`;
      desc.innerHTML = data.weather[0].description;
      minmax.innerHTML = `${Math.round(data.main.temp_min)}°C / ${Math.round(
        data.main.temp_max
      )}°C`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
    })
    .catch("City not found!");
}

// fetch data according to your location
function weatherData() {
  function succesCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=az&appid=${myKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        nameCity.innerHTML = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${Math.round(data.main.feels_like)}°C`;
        desc.innerHTML = data.weather[0].description;
        minmax.innerHTML = `${Math.round(data.main.temp_min)}°C / ${Math.round(
          data.main.temp_max
        )}°C`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
      })
      .catch(() => alert("Did not find location"));
  }

  function errorCallback() {
    alert("did not find your location...");
  }
  navigator.geolocation.watchPosition(succesCallback, errorCallback);
}
weatherData();
