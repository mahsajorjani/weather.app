// coded by mahsa jorjani from iran


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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let currentDay = date.getDay();
  let days = [ "Sun" , "Mon" , "Tue" , " Wed" , "Thu" , "Fri" , "Sat" ];
  return days[currentDay];

}


function displayForecast(response){
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class=" row">`;
forecast.forEach(function(forecastDay , index){
if(index <6){
      forecastHTML = forecastHTML +
`
        <div class="col-2">
          <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}
          </div>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt=""
          width="45"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperatures-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="weather-forecast-temperatures-min">${Math.round(forecastDay.temp.min)}°</span> 
        </div>
      </div>`;
}
});
forecastHTML = forecastHTML+ `</div>`;
forecastElement.innerHTML = forecastHTML;

}
function getForecast(coordinates){
console.log(coordinates);
let apiKey = "2f5257f6af18ca282242813ab999e7f4";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = cityInput.value;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt" ,response.data.weather[0].description);
 celsiusTemperature = response.data.main.temp;
 getForecast(response.data.coord);
}



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
let celsiusTemperature = null;

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