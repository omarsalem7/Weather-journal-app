// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use(express.static("website"));
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost : ${port}`);
}

let projectData = {};

// get weather data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// post an weather data
app.post("/addWeather", (req, res) => {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  console.log(projectData);
});
