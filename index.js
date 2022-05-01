var cityList =$("#city-list");
var cities = [];
var key = "fc8bffadcdca6a94d021c093eac22797";

//Format for day
var date = new Date();

var month = date.getMonth()+1;
var day = date.getDate();

var dayOutput = date.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;


//Calling function init();
init();

//Function init();
function init(){
    //Get stored cities from localStorage
    //Parsing the JSON string to an object
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
        cities = storedCities;
      }
    // Render cities to the DOM
    renderCities();
}
//Function StoreCities()
function storeCities(){
   // Stringify and set "cities" key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}
//Function renderCities()
function renderCities() {
     // Clear cityList element
    // cityList.text = "";
    // cityList.HTML = "";
    cityList.empty();

    // Render a new li for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];

      var li = $("<li>").text(city);
      li.attr('id', 'istc');
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      cityList.append(li);
    }
     //Get Response weather for the first city only
     getResponseWeather(city);
  }

  //When form is submitted...
  $("#add-city").on("click", function(event){
      event.preventDefault();

    // This line will grab the city from the input box
    var city = $("#city-input").val().trim();
    // return from function early if submitted city is blank
    if (city ===''){
        return;
    }

    //Adding city-input to the city array
    cities.push(city);
    // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();

  });

  //Function get Response Weather 

  function getResponseWeather(cityName){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 

    //Clear content of today-weather
    $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Create a new table row element
      var cityTitle = $("<h3>").text(response.name + " "+ dayOutput);
      $("#today-weather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#today-weather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;


    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(responseuv) {
        var cityUV = $("<span>").text(responseuv.value);
        var cityUVp = $("<p>").text("UV Index: ");
        cityUVp.append(cityUV);
        $("#today-weather").append(cityUV);
        $("#today-weather").append(cityUV);
        if(cityUV <= 2){
            cityUV.attr("class","green")
        }
        else if (cityUV <= 7){
            cityUV.attr("class","orange")
        }
        else{
            cityUV.attr("class","red")
        }
      });
    });

  }