const locationField = document.getElementById("js-locationinput");
const locationInput = document.getElementById("js-locationsubmit");
const weatherCondition = document.getElementById("js-weathercondition");
const temperature = document.getElementById("js-temperature");
const weatherIcon = document.getElementById("js-weathericon");

const getUserLocation = (event) => {
    event.preventDefault();
    const inputValue = locationField.value;
    getWeatherData(inputValue);

}


const getWeatherData = (userLocation) => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + userLocation + ",UK&units=metric&APPID=7c5e998268ad415c134ff54444a16be9")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw (response);
            }
        })
        .then(data => {
            onApiSuccess(data);
        })
        .catch(error => {
            onApiError(error);
        })
};

const onApiSuccess = (data) => {
    weatherCondition.innerHTML = data.weather[0].main;
    temperature.innerHTML = Math.floor(data.main.temp);

    const imageSrc = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    weatherIcon.innerHTML = "<img src='" + imageSrc + "'>";
    console.log(data);
};

const onApiError = (error) => {
    console.log(error);
    weatherCondition.innerHTML = "";
    temperature.innerHTML = "";
    weatherIcon.innerHTML = "";

};


locationInput.addEventListener("click", getUserLocation);