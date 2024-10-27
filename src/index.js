import './styles.css'; 


async function getWeather(place) {
  try {
    // Fetch weather data
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=${API_key}&contentType=json`);

    // Parse response JSON
    const data = await response.json();

    // Log the parsed data
    console.log("Weather data object:", data);
    return data
  } catch (error) {
    console.error("Error fetching the weather data:", error);
  }
}
function createWeatherElement( type,className, textContent) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}
function processWeatherData(data) {
   try{const processedDays = {};
      for(let i=0;i<15;i++){
        const dayWeather = {
          currTemp:data.currentConditions.temp,
          currFeelsLike:data.currentConditions.feelslike,
          currentConditions:data.currentConditions.conditions,
          currentIcon:data.currentConditions.icon,
          uvIndex:data.currentConditions.uvindex,
          temp: data.days[i].temp || null,
          maxTemp: data.days[i].tempmax || null, 
          minTemp: data.days[i].tempmin || null, 
          feelslike: data.days[i].feelslike || null, 
          description: data.days[i].description || "No description", 
          icon: data.days[i].icon || null, 
          conditions:data.days[i].conditions || null,
          hours:[],
          location:data.address
        };
        for(let j=0;j<24;j++){
          const hourData={
            temp:data.days[i].hours[j].temp || null,
            conditions:data.days[i].hours[j].conditions || null, 
            feelslike:data.days[i].hours[j].feelslike || null,


          }
          dayWeather.hours.push(hourData);
        }
        processedDays[i]=dayWeather;
      }
      

        return processedDays;
      }
  catch(error){
    console.error("Error fetching the weather data:", error);
  }



}
function alldays(alldata){
  try{
    
    const div=document.createElement("div")
    const mainDiv=document.querySelector(".alldays-div")
    mainDiv.innerHTML="";
    const guideDiv = document.createElement("div");
        guideDiv.classList.add("day", "guide");
        guideDiv.innerHTML = `
            <div class="date">Date</div>
            <div class="icon">icon</div>
            <div class="min">Min Temp (°C)</div>
            <div class="max">Max Temp (°C)</div>
           <div class="conditions">Weather Conditions(°C)</div>
          
        `;
        mainDiv.appendChild(guideDiv)
    for(let i=0;i<15;i++){
      //date
      const futureDate=new Date(date)
      const allDiv=document.createElement("div")
      allDiv.classList.add("day")

      futureDate.setDate(date.getDate()+i)

      const dayName=days[futureDate.getDay()];
      //date
      let dateDiv=document.createElement("div");
      if (i==0)
        { dateDiv = createWeatherElement('div','date', `Today ${futureDate.getDate()}`);}
      else
      {dateDiv = createWeatherElement('div','date', `${dayName} ${futureDate.getDate()}`);
    }
      
      //icon test
      const iconDiv=createWeatherElement('i','icon',"")
      iconDiv.classList.add("wi")
      iconDiv.classList.add(getIconClass(alldata[i].icon))
      // min temp
      const minDiv = createWeatherElement( 'div','min', `${alldata[i].minTemp}`);
      //max temp
      const maxDiv= createWeatherElement('div','max', `${alldata[i].maxTemp}`);
      //conditons
      const conditionsDiv=createWeatherElement('div','conditions',`${alldata[i].conditions}`)
      allDiv.appendChild(dateDiv)
      allDiv.appendChild(iconDiv)
      allDiv.appendChild(minDiv)
      allDiv.appendChild(maxDiv)
      allDiv.appendChild(conditionsDiv)
      mainDiv.appendChild(allDiv)
    }
  }
  catch(error){
    console.log(error)
  }
}
function mainDisplay(alldata){
  try{
    
    const data=alldata[0]
    const mainDiv=document.querySelector(".main-display")
    mainDiv.innerHTML=""
    const card=document.createElement("div")
    card.classList.add("card")

    const locationDiv= createWeatherElement('div','location',`Location: ${data.location}`)
   

    const tempDiv=createWeatherElement('div','temp',`temp is ${data.currTemp}`)

    console.log("was so insane that i made her my header")

    card.appendChild(locationDiv);
    card.appendChild(tempDiv);
    

    // Append the card to the main display
    mainDiv.appendChild(card);
  }
  catch(error){
    console.log(error)
  }
}

async function main() {
  const weatherData= await getWeather("elmaadi")
  const processedData=processWeatherData(weatherData)
  console.log (processedData)
  alldays(processedData)
  
}

//main()
 document.querySelector('nav').addEventListener('mousedown', function(e) {
  e.preventDefault(); // Prevent text selection on mouse down
});
document.querySelector(".weather-title").addEventListener("click",()=>{
  location.reload();

})


document.querySelector("form").addEventListener("submit",async (event)=>{
  event.preventDefault()
  let place=document.getElementById("search-box");
  console.log(place.value)
  
  const weatherData= await getWeather(place.value);
  const processedData=processWeatherData(weatherData);
  console.log (processedData);
  mainDisplay(processedData);
  place.value=""
  alldays(processedData)

})

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date(); // Start with today's date

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
async function fetchCities(query) {
  const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': rapidKey,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
  });
  const data = await response.json();
  return data.data;
}
async function handleInput() {
  const query = input.value.trim();
  if (query.length < 3) {
    suggestions.innerHTML = '';  // Clear suggestions if input is less than 3 characters
    return;
  }

  const cities = await fetchCities(query);
  suggestions.innerHTML = '';  // Clear previous suggestions

  cities.forEach(city => {
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion';
    suggestion.textContent = `${city.city}, ${city.country}`;
    
    // Handle click on suggestion
    suggestion.addEventListener('click', () => {
      input.value = suggestion.textContent;
      suggestions.innerHTML = '';  // Clear suggestions when a city is selected
      // You can add a function here to fetch the weather for the selected city
    });

    suggestions.appendChild(suggestion);
  });
}

input.addEventListener('input', debounce(handleInput, 1300));

const iconMap = {
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  "cloudy": "wi-cloudy",
  "rain": "wi-rain",
  "snow": "wi-snow",
  "wind": "wi-windy",
  "fog": "wi-fog",
  "sleet": "wi-sleet",
  "thunderstorm": "wi-thunderstorm",
  "hail": "wi-hail"
};

function getIconClass(apiIcon) {
  return iconMap[apiIcon] || "wi-na"; // Fallback to 'not available' icon
}
