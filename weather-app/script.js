const apiKey = "66addae8ce04d08ff2517320fd139b0d";

// ambil elemen html yang diperlukan
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");

// function untuk mendapatkan data cuaca dari API openweather
const getWeatherData = async (latitude, longitude) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    locationElement.textContent = `${data.name},${data.sys.country}`;
    temperatureElement.innerHTML = `Temperature: ${data.main.temp} &deg;C`;
    descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    const iconCode = data.weather[0].icon;
    weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Gagal mendapatkan data cuaca.");
  }
};

//  function untuk mendapatkan lokasi pengguna
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Gagal mendapatkan lokasi. Mohon izinkan akses lokasi.");
      }
    );
  } else {
    alert("Geolocation tidak didukung oleh browser ini.");
  }
};

// memanggil function getLocation ketika halaman dimuat
window.onload = getLocation;
