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
 
 
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let city = cityInput.value;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = documnet.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = documnet.querySelector("#icon");
  iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt" ,response.data.weather[0].description);
 celsiusTemperature = response.data.main.temp;
}


let apiKey = "2f5257f6af18ca282242813ab999e7f4";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);


function displayfahrenhietTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  fahrenhietlink.classList.add("active");
  let fahrenhietTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenhietTemperature);
  
}


function displaycelsiusTemperature(event){
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenhietlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  
}
  let fahrenhietlink = document.querySelector("#fahrenheit-link");
fahrenhietlink.addEventListener("click",displayfahrenhietTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click",displaycelsiusTemperature);


function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let city = cityInput.value;
  let apiKey = "2f5257f6af18ca282242813ab999e7f4";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//axios.get(`${apiUrl}&appid=${apiKey}`).then(search);

//let h1 = document.querySelector("#city");
//h1.innerHTML = city;
