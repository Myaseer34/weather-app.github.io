$(document).ready(function() {
    const apiKey = '0857bdfbf9822bcb5f4d0f481d5e160a';
    const defaultLocation = 'Toronto';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${apiKey}`;

    $.get(apiUrl, function(data) {
        $('#location').text(`${data.name}, ${data.sys.country}`);
        $('#temperature').text(`Now ${data.main.temp} °C`);
        $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        $('#condition').text(data.weather[0].main);
        $('#feels-like').text(`${data.main.feels_like} °C`);
        $('#humidity').text(`${data.main.humidity}%`);
        $('#wind-speed').text(`${data.wind.speed} m/s`);

        // Change background based on weather condition
        updateBackground(data.weather[0].main.toLowerCase());
    }).fail(function() {
        $('#weather-info').html('<p>Unable to retrieve weather data at this time.</p>');
    });

    function updateBackground(condition) {
        let weatherContainer = $('#weather-container');
        const backgrounds = {
            clear: 'linear-gradient(135deg, #f5af19, #f12711)',
            clouds: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
            rain: 'linear-gradient(135deg, #00c6ff, #0072ff)',
            snow: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
            default: 'linear-gradient(135deg, #bdc3c7, #2c3e50)'
        };
        weatherContainer.css('background', backgrounds[condition] || backgrounds.default);
    }

    $('#weather-container').tilt({
        maxTilt: 50,
        perspective: 1000,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1.1,
        speed: 500,
        transition: true,
        glare: true,
        maxGlare: 0.5,
        reset: true
    });
});
