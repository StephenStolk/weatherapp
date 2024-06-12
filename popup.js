document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    const weatherContainer = document.getElementById("weather-container");
    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
  
    // Get location and fetch weather data
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByLocation(lat, lon);
    }, error => {
      console.error('Error getting location:', error);
      alert('Error getting location. Please enter a city name.');
    });
  
    // Search weather by city name
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value;
      if (city) {
        fetchWeatherByCity(city);
      } else {
        alert('Please enter a city name.');
      }
    });
  
    function fetchWeatherByLocation(lat, lon) {
      fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.current && data.daily) {
            displayWeather(data);
          } else {
            console.error('Invalid data format:', data);
            alert('Error fetching weather data.');
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          alert('Error fetching weather data.');
        });
    }
  
    function fetchWeatherByCity(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          if (data.coord) {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            fetchWeatherByLocation(lat, lon);
          } else {
            console.error('Invalid data format:', data);
            alert('City not found.');
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          alert('Error fetching weather data.');
        });
    }
  
    function displayWeather(data) {
      weatherContainer.classList.add('visible');
      document.getElementById("location").textContent = `Location: ${data.timezone}`;
      document.getElementById("temperature").textContent = `Temperature: ${data.current.temp} °C`;
      document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
  
      let forecastHTML = "<h3>7-Day Forecast:</h3>";
      data.daily.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        forecastHTML += `<p>${date} - Temp: ${day.temp.day} °C, Weather: ${day.weather[0].description}</p>`;
      });
      document.getElementById("forecast").innerHTML = forecastHTML;
    }
  });
  