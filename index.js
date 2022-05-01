var cityList =$("#city-list");

var cities = [];
console.log(cities);

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
    // console.log(cities);
}

//Function StoreCities()
function storeCities(){
   // Stringify and set "cities" key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
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
      console.log(city);

      var li = $("<li>").text(city);
      li.attr("data-index", i);
      li.attr("class", "list-group-item");
      console.log(li);

      cityList.append(li);
    }
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
    // console.log(cities);
    // city= "";
    console.log(cities);
    console.log(city);
    // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();

  });