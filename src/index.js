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

function processWeatherData(data) {
   try{const processedDays = {};
  for(let i=0;i<15;i++){
    const dayWeather = {
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

function mainDisplay(alldata){
  const data=alldata[0]
  const mainDiv=document.querySelector(".main-display")
  const card=document.createElement("div")
  card.classList.add("card")

  const locationDiv=document.createElement("div")
  locationDiv.classList.add("location");
  locationDiv.textContent = `Location: ${data.location}`;

  const tempDiv=document.createElement("div")
  tempDiv.classList.add("temp")
  tempDiv.textContent=`temp is ${data.temp}`
  console.log("was so insane that i made her my header")

  card.appendChild(locationDiv);
  card.appendChild(tempDiv);
  

  // Append the card to the main display
  mainDiv.appendChild(card);
}

async function main() {
  const weatherData= await getWeather("elmaadi")
  const processedData=processWeatherData(weatherData)
  console.log (processedData)
  
}

//  main()
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
})