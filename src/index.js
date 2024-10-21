import './styles.css'; 

const API_key = "SVXQ7TQNLTGCERACXMDS5DMKU";

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

function processWeatherData(data) {
  const processedDays = {};
  for(let i=0;i<15;i++){
    const dayWeather = {
      temp: data.days[i].temp, // Current temperature
      maxTemp: data.days[i].tempmax, // Max temperature
      minTemp: data.days[i].tempmin, // Min temperature
      feelslike: data.days[i].feelslike || null, // Feels like temperature
      description: data.days[i].description || "No description", // Weather description
      icon: data.days[i].icon || null, // Weather icon 
      conditions:data.days[i].conditions,
      hours:[]
    };
    for(let j=0;j<24;j++){
      const hourData={
        temp:data.days[i].hours[j].temp,
        conditions:data.days[i].hours[j].conditions,
        feelslike:data.days[i].hours[j].feelslike,


      }
      dayWeather.hours.push(hourData);
    }
    processedDays[i]=dayWeather;
  }
  

    return processedDays;
}

async function main() {
  const weatherData= await getWeather("elmaadi")
  const processedData=processWeatherData(weatherData)
  console.log (processedData)
  
}
//°C
 main()