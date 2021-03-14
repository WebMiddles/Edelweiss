const getWeather = () => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=abzakovo&units=metric&lang=ru&appid=e12d67de3a9499be24e0c3a9c56b2f23";

  const condition = document.getElementById("condition");
  const pressure = document.getElementById("pressure");
  const temperature = document.getElementById("temperature");
  const wind = document.getElementById("wind");

  fetch(url)
    .then(response => response.json())
    .then(response => {
      temperature.textContent = response.main.temp;
      wind.textContent = `${response.wind.speed} м/с`;
      condition.textContent = response.weather[0].description;
      pressure.textContent = `${Math.floor(
        response.main.pressure / 1.4
      )} мм рт.cт.`;
    })
    .then();
};

export default getWeather;
