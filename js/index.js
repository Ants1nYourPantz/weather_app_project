console.log("Hello from index.html");


let form = document.getElementById("weatherForm");
form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector(`input[name="weatherForm"]`);
    console.log("City added:", cityInput.value);
    let weatherInfo = await getWeatherInfo(cityInput.value);
    addCity(weatherInfo)
    cityInput.value = "";
};

async function getWeatherInfo(weatherForm){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${weatherForm}`);
        let data = await response.json();
        console.log(data);
        return data;
    } catch(err){
        console.error(err);
    };
};

function addCity(cityToAdd){
    let card = document.createElement('div');
    card.className = "card w-75";

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let currentLoc = document.createElement('p');
    currentLoc.className = 'fs-3 fw-bold text-decoration-underline';
    currentLoc.textContent = `${cityToAdd.location.name}`

    let currentTemp = document.createElement('p');
    currentTemp.textContent = `Current Temperature: ${cityToAdd.current.temp_f}F`

    let feelsLike = document.createElement('p');
    feelsLike.textContent = `Feels Like: ${cityToAdd.current.feelslike_f}F`
    
    let curCondition = document.createElement('p');
    curCondition.textContent = `Condition: ${cityToAdd.current.condition.text}`
    
    cardBody.append(currentLoc, currentTemp, feelsLike, curCondition);

    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'd-flex justify-content-center';

    col.append(card);

    let cityContainer = document.getElementById('cityContainer');
    cityContainer.append(col);
    
    
};

