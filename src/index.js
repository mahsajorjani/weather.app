// coded by mahsa jorjani from iran
//challenge1

let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} , ${hours}:${minutes}`;

  return formattedDate;
}
let currenetdateTime = document.querySelector("#day");
currenetdateTime.innerHTML = formatDate(currentTime);

//week 5
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°c`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let city = cityInput.value;
  let apiKey = "2f5257f6af18ca282242813ab999e7f4";
  //let city = "Gorgan";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//axios.get(`${apiUrl}&appid=${apiKey}`).then(search);

//let h1 = document.querySelector("#city");
//h1.innerHTML = city;
