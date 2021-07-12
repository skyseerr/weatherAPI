function weather() {

    // const APIkey = 'ce58761bc00245c196f110049212806';

    const dayOfWeek = {
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT',
        7: 'SUN',
        8: 'MON',
        9: 'TUE',
    }

    const dayOfW = new Date();
    const today = dayOfW.getDay();

    const town = document.getElementById('townInput');
    town.addEventListener('focus', () => {
        town.placeholder = 'Enter the name of the city';
    });
    town.addEventListener('blur', () => {
        town.placeholder = 'Another location';
    });
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getWeather();

        town.value = '';
        
    });

    async function starWeather() {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=ce58761bc00245c196f110049212806&q=sofia&days=7&aqi=no&alerts=no`;
        const response = await fetch(url);
        const data = await response.json();

        createCurrent(data);
        createForecast(data);

        console.log(data);
    }

    starWeather();

    async function getWeather() {

        const url = `http://api.weatherapi.com/v1/forecast.json?key=ce58761bc00245c196f110049212806&q=${town.value}&days=7&aqi=no&alerts=no`;
        const response = await fetch(url);
        const data = await response.json();

        createCurrent(data);
        createForecast(data);

        return data;

        console.log(data);

    }

    function createForecast(data) {

        const threeDayWeather = data.forecast;
        const forecast = threeDayWeather.forecastday;
        const firstDay = document.querySelector(".firstDay");
        const secondDay = document.querySelector(".secondDay");
        const thirdDay = document.querySelector(".thirdDay");
        firstDay.innerHTML = '';
        const currentDay = e('h2', 'TODAY', 'currentWeather', '');
        firstDay.appendChild(currentDay);

        secondDay.innerHTML = '';
        const dayAfter = e('h2', dayOfWeek[today + 1], 'dayAfter', '');
        secondDay.appendChild(dayAfter);

        thirdDay.innerHTML = '';
        const theNextDay = e('h2', dayOfWeek[today + 2], 'theNextDay', '');
        thirdDay.appendChild(theNextDay);

        const forecastDivs = document.querySelector(".threeDay").children;

        let counter = 0;

        for(let i = 0; i <= 4; i+=2){
            const minTemp = forecast[counter].day.mintemp_c;
            const maxTemp = forecast[counter].day.maxtemp_c;
            forecastDivs[i].appendChild(e('div', '', 'firstDayIcon', `<img src="./img/icons/${(forecast[counter].day.condition.icon).slice(-7)}" alt="">`));
            // forecastDivs[i].appendChild(e('h3', `${forecast[counter].day.condition.text}`));
            const temps = e('ul', '', 'minMaxTemp', '');
            temps.appendChild(forecastDivs[i].appendChild(e('li', `${maxTemp}° - ${minTemp}°`)));
            forecastDivs[i].appendChild(temps);
            forecastDivs[i].appendChild(e('h4', 'Chance of rain'));
            forecastDivs[i].appendChild(e('div','','',`<img src="./img/icons/umbrella.png" alt="">`));
            forecastDivs[i].appendChild(e('h2', `${forecast[counter].day.daily_chance_of_rain}%`, 'chanceOfRain'));

            counter++;
        }
  
        console.log(forecast);
    }

    function createCurrent(data) {

        const townInformation = document.querySelector(".townInfo");
        townInformation.innerHTML = '';

        const countryInformation = document.querySelector(".countryInfo");
        countryInformation.innerHTML = '';

        const conditionInformation = document.querySelector(".conditionInfo");
        conditionInformation.innerHTML = '';

        const firstLine = data.location;
        const secondLine = data.current;
        const conditionInfo = secondLine.condition;

        townInformation.appendChild(e('div', `${secondLine.temp_c}°`, 'degree'));

        const divLocationTime = townInformation.appendChild(e('div', '', 'locationTimeWrap'));
        divLocationTime.appendChild(e('div', `${firstLine.name}`, 'townName'));
        divLocationTime.appendChild(e('div', firstLine.localtime, 'localTime'));

        const divIconWrap = townInformation.appendChild(e('div', '', 'iconWrap'));
        divIconWrap.appendChild(e('div', '', 'weatherIcon', `<img src="./img/icons/${(conditionInfo.icon).slice(-7)}" alt="${conditionInfo.text}">`));
        divIconWrap.appendChild(e('div', conditionInfo.text, 'weatherText'));

        createForecast(data);
    }

    function e(type, content, className, html) {

        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (className) {
            element.className = className;
        }

        if (html) {
            element.innerHTML = html;
        }

        return element;
    }

}

weather();