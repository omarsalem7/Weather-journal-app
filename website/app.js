// Global variables

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "586c1c4fa69927ef6de56367a26a9fe7"; //my api key
let d = new Date();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
//console.log(newDate);

/* Function to POST data */
document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  //get data from api
  getWeatherData(baseURL, zipCode, apiKey).then((data) => {
    //console.log(data);
    // post data to server
    postData("http://localhost:8000/addWeather", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feeling,
    });
    // call update ui
    updateUi();
  });
}
const getWeatherData = async (baseURL, zipCode, apiKey) => {
  /* the zip code should enter for us only if you enter for another country like egypt 
  change the us with eg and then enter the zip code of city in egypt */
  const response = await fetch(baseURL + zipCode + ",us" + "&appid=" + apiKey);
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
//async post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // 
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log("Error: ", error);
    // appropriately handle the error
  }
};

const updateUi = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    const all = await request.json();
    
    //console.log(all);
    document.getElementById("date").innerHTML = all.date;
    document.getElementById("temp").innerHTML = all.temperature;
    document.getElementById("content").innerHTML = all.userResponse;
  } catch (error) {
    console.log("Error: " + error);
  }
};
