document.addEventListener("DOMContentLoaded", function() {
    const weatherForm = document.getElementById("weatherForm");
    const locationInput = document.getElementById("location");
    const weatherInfo = document.getElementById("weatherInfo");

    const API_KEY = 'bf3c07ccb06d299f701492656ab1791d '; // Replace with your API key
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    weatherForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const location = locationInput.value;

        if (location.trim() === '') {
            alert("Please enter a valid location");
            return;
        }

        const endpoint = `${API_URL}?q=${location}&units=metric&appid=${API_KEY}`;

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const feelsLike = data.main.feels_like;
                const humidity = data.main.humidity;

                const weatherHtml = `
                    <h2>Weather in ${location}</h2>
                    <p><strong>Current Conditions:</strong> ${weatherDescription}</p>
                    <p><strong>Temperature:</strong> ${temperature} °C</p>
                    <p><strong>Feels Like:</strong> ${feelsLike} °C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;

                weatherInfo.innerHTML = weatherHtml;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            });
    });
});
