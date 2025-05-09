// geting uI
let userCard = document.querySelector('.user-card');
let errorMsg = document.querySelector('.error');
let locationName = document.querySelector('#locationName');
let detectBtn = document.querySelector('#detectBtn');
let weatherCard = document.querySelector('.weather-card');
let BackArr = document.querySelector('#BackArr');
let infotxt = document.querySelector('#infoText');
let iconImg = document.querySelector('#iconImg');

//define variable
let api;
//add event lis
locationName.addEventListener('keyup', e => {
    if (e.key == 'Enter' && locationName.value != '') {
        var cityName = locationName.value;
        requestApi(cityName);
    }
    else if (locationName.value == '') {
        console.log('Please Input value');
    }
});
function requestApi(city) {
    apiKey = 'ab772cd89c4c5a89db5fbace3eafb445';
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}
detectBtn.addEventListener('click', e => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Oops! your browser dosn't support GeoLocation");
    }
});
function onSuccess(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    apiKey = 'ab772cd89c4c5a89db5fbace3eafb445';
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchData();
}
function onError(err) {
    infotxt.style.display = 'block';
    infotxt.innerText = err.message;
    infotxt.style.color = '#ff5810';
}
function fetchData() {
    infotxt.innerText = "Geating Weather Deatils.....";
    infotxt.style.display = "block";
    infotxt.style.color = "#0000ff";

    fetch(api)
        .then(res => res.json())
        .then(result => watherApp(result))
        .catch(e => {
            console.log(e.message);
            infotxt.style.display = 'block';
            infotxt.innerText = "Something Wrong Please try again.....";
            infotxt.style.color = "#ff5480";
        });
}


function watherApp(info) {
    // console.log(info);
    if (info.cod == 404) {
        infotxt.style.display = 'block';
        infotxt.innerHTML = `Oops! <b>${locationName.value}</b> is not valid city`;
        infotxt.style.color = "#ff5480";
        locationName.value = '';
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { id, description } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        document.querySelector('.temp .numb').innerText = Math.round(temp);
        document.querySelector('.weather-title').innerText = description;
        document.querySelector('.location-details .city').innerText = city;
        document.querySelector('.location-details .country').innerText = country;
        document.querySelector('.feel-like .temp-feel').innerText = Math.round(feels_like);
        document.querySelector('.humi-feel').innerText = humidity;
        if (id === 800) {
            iconImg.src = 'assets/img/clear.svg';
        }
        else if (id >= 200 && id <= 232) {
            iconImg.src = 'assets/img/strom.svg';
        }
        else if (id >= 600 && id <= 622) {
            iconImg.src = 'assets/img/snow.svg';
        }
        else if (id >= 801 && id <= 804) {
            iconImg.src = 'assets/img/cloud.svg';
        }
        else if (id >= 701 && id <= 781) {
            iconImg.src = 'assets/img/haze.svg';
        }
        else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            iconImg.src = 'assets/img/rain.svg';
        }
        userCard.style.display = 'none';
        weatherCard.style.display = 'block';
        locationName.value = '';
        infotxt.innerText = '';
        infotxt.style.display = 'none';
    }
}
BackArr.addEventListener('click', () => {
    userCard.style.display = 'block';
    weatherCard.style.display = 'none';
})
