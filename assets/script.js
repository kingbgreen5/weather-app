//       4f5f4f23db412f9704e82e1a76863ed2     openweather api key

var searchFieldEl = document.querySelector('#searchField');
var searchFieldInput = document.querySelector('#searchFieldInput');
var displayEl = document.querySelector("#display")
var displayTodayEl = document.querySelector("#displayToday") 
var fiveDayContainerEl = document.querySelector('#fiveDayContainer');
var searchHistory = document.querySelector('#localstoragediv')
var clearSearch = document.querySelector('#clearSearches')
var searchBtn =document.querySelector("#search")

searchArray =[]                                                           // creates search array as an empty array
if (JSON.parse(localStorage.getItem("search")) != null){                  // if theres stuff in local storage, update the search array with that stuff
  searchArray = JSON.parse(localStorage.getItem("search"));               // this is neaded because each time the page reloads it empties search array on the above line.
}



var today = dayjs()
var todayFormated= dayjs().format(' M/D/YY');
var day1 = today.add(1,'day');
var day2 = today.add(2,'day');
var day3 = today.add(3,'day');
var day4 = today.add(4,'day');
var day5 = today.add(5,'day');


var formSubmitHandler = function (event) {                              // when clicked, this is run
  event.preventDefault();
  if(searchFieldInput.value==''){
    return
  }
      var usersSearchInput = searchFieldInput.value                         // sets a variable from the info typed in the field
      console.log("Search Input: " + usersSearchInput)
      getSearch(usersSearchInput)                                       // runs the search function with users search input
      storeSearch()                                                    // log search to local storage
      renderSearch()
};

  
  var historyButtonHandler = function (event) {                        // When History Buttons are clicked, runs this function listening for any clicks in the search history Div
  var element = event.target;                                           // Selects the Clicked BUtton
  var usersSearchInput = element.id
  if (element.matches("button") === true) {
    console.log("Search Input: " + usersSearchInput)
    getSearch(usersSearchInput) 
      searchFieldInput.value = ''                                         // Clears Search Field
    }}

  
    var clearSearchHandler = function (event) {      
      searchArray =[]   
      localStorage.clear("search", JSON.stringify(searchArray));
    }





  function storeSearch(){     // Stores Searches in local Storage
  var usersSearchInput = searchFieldInput.value 
  searchArray.push(usersSearchInput)
  localStorage.setItem("search", JSON.stringify(searchArray));        
  console.log(searchArray)
};

function renderSearch(){       
  
  displayTodayEl.textContent=''                                                                   //Clears info From the Displayed elements  
  fiveDayContainerEl.textContent=''
  searchHistory.textContent=''
  var storedSearches = JSON.parse(localStorage.getItem("search")); 
  // searchArray = JSON.parse(localStorage.getItem("search"));                // Renders Stored searches
  for (var i = 0; i < storedSearches.length; i++) {
    var search = storedSearches[i];
    // searchArray =[]
    var button = document.createElement("button");
    button.textContent = search
    button.id = search
    searchHistory.appendChild(button);
    console.log(button)
}
}


function getSearch(usersSearchInput) {                              // Runs Search Function
  var latlonURl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + usersSearchInput +  '&limit=1&appid=4f5f4f23db412f9704e82e1a76863ed2' 
  fetch(latlonURl)                                         // FETCH
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
    if (data.length === 0) {
      displayEl.textContent = 'Data not found';
      return;
    }
      var latitude= data[0].lat                                               // take lat long, input into variables for use for next fetch
      var longitude= data[0].lon
      console.log(latitude)
      console.log(longitude)
        var locationURl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=4f5f4f23db412f9704e82e1a76863ed2'
      fetch(locationURl)                                         // FETCH
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayTodayEl.textContent=''                                                                   //Clears info From the Displayed elements  
            fiveDayContainerEl.textContent=''

            var locationDisplay = 
              document.createElement("h1")
              locationDisplay.textContent = data.city.name;
            var locationDate = 
              document.createElement("h3")
              locationDate.textContent =  todayFormated; 
            var todaysImg=
              document.createElement('img')
              todaysImg.src= 'https://openweathermap.org/img/wn/'+    data.list[0].weather[0].icon   +  '@2x.png'
            var todaysTemp=
              document.createElement('h4');
              todaysTemp.textContent = "Temperature: " + data.list[0].main.temp +"°F";
            var todaysWind=
              document.createElement('h4');
              todaysWind.textContent = "Wind Speed: " + data.list[0].wind.speed + " MPH";
            var todaysHumidity=
              document.createElement('h4');
              todaysHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";

            displayTodayEl.appendChild(locationDisplay)
            displayTodayEl.appendChild(locationDate)
            displayTodayEl.appendChild(todaysImg)
            displayTodayEl.appendChild(todaysTemp)
            displayTodayEl.appendChild(todaysWind)
            displayTodayEl.appendChild(todaysHumidity)


            var fiveDayForcast=                                             // div for 5 Day
              document.createElement('h2')
              fiveDayForcast.textContent= "5 Day Forcast:"



            var day1=                                                         // DAY1
              document.createElement('div')
              day1.id= "fiveDayBlocks"
            var day1Img=
              document.createElement('img')
              day1Img.src= 'https://openweathermap.org/img/wn/'+    data.list[8].weather[0].icon   +  '@2x.png'
            var day1Date=
              document.createElement('h3')
              day1Date.textContent = today.add(1, 'day').format(' M/D/YY');
            var day1Temp=
              document.createElement('h5');
              day1Temp.textContent = "Temperature: " + data.list[7].main.temp +"°F";
            var day1Wind=
              document.createElement('h5');
              day1Wind.textContent = "Wind Speed: " + data.list[7].wind.speed + " MPH";
            var day1Humidity=
              document.createElement('h5');
              day1Humidity.textContent = "Humidity: " + data.list[7].main.humidity + "%";

            day1.appendChild(day1Date)                                          //tapes everything to day1 div
            day1.appendChild(day1Img)
            day1.appendChild(day1Temp)
            day1.appendChild(day1Wind)
            day1.appendChild(day1Humidity)

            var day2=                                                         // DAY2
              document.createElement('div')
              day2.id = "fiveDayBlocks"
            var day2Date=
              document.createElement('h3')
              day2Date.textContent= today.add(2, 'day').format(' M/D/YY');
            var day2Img=
              document.createElement('img')
              day2Img.src= 'https://openweathermap.org/img/wn/'+    data.list[16].weather[0].icon   +  '@2x.png'
            var day2Temp=
              document.createElement('h5');
              day2Temp.textContent = "Temperature: " + data.list[15].main.temp +"°F";
            var day2Wind=
              document.createElement('h5');
              day2Wind.textContent = "Wind Speed: " + data.list[15].wind.speed + " MPH";
            var day2Humidity=
              document.createElement('h5');
              day2Humidity.textContent = "Humidity: " + data.list[15].main.humidity + "%";

            day2.appendChild(day2Date)  
            day2.appendChild(day2Img)                                        //tapes everything to day2 div
            day2.appendChild(day2Temp)
            day2.appendChild(day2Wind)
            day2.appendChild(day2Humidity)

            var day3=                                                         // DAY3
              document.createElement('div')
              day3.id = "fiveDayBlocks"
            var day3Img=
              document.createElement('img')
              day3Img.src= 'https://openweathermap.org/img/wn/'+    data.list[24].weather[0].icon   +  '@2x.png'
            var day3Date=
              document.createElement('h3')
              day3Date.textContent= today.add(3, 'day').format(' M/D/YY');
            var day3Temp=
              document.createElement('h5');
              day3Temp.textContent = "Temperature: " + data.list[25].main.temp +"°F";
            var day3Wind=
              document.createElement('h5');
              day3Wind.textContent = "Wind Speed: " + data.list[25].wind.speed + " MPH";
            var day3Humidity=
              document.createElement('h5');
              day3Humidity.textContent = "Humidity: " + data.list[25].main.humidity + "%";

            day3.appendChild(day3Date)                                          //tapes everything to day3 div
            day3.appendChild(day3Img)
            day3.appendChild(day3Temp)
            day3.appendChild(day3Wind)
            day3.appendChild(day3Humidity)


            var day4=                                                         // DAY4
              document.createElement('div')
              day4.id = "fiveDayBlocks"
            var day4Img=
              document.createElement('img')
              day4Img.src= 'https://openweathermap.org/img/wn/'+    data.list[31].weather[0].icon   +  '@2x.png'
            var day4Date=
              document.createElement('h3')
              day4Date.textContent= today.add(4, 'day').format(' M/D/YY');
            var day4Temp=
              document.createElement('h5');
              day4Temp.textContent = "Temperature: " + data.list[31].main.temp +"°F";
            var day4Wind=
              document.createElement('h5');
              day4Wind.textContent = "Wind Speed: " + data.list[31].wind.speed + " MPH";

            var day4Humidity=
              document.createElement('h5');
              day4Humidity.textContent = "Humidity: " + data.list[31].main.humidity + "%";

            day4.appendChild(day4Date)                                          //tapes everything to day4 div
            day4.appendChild(day4Img)
            day4.appendChild(day4Temp)
            day4.appendChild(day4Wind)
            day4.appendChild(day4Humidity)


            var day5=                                                         // DAY5
              document.createElement('div')
              day5.id = "fiveDayBlocks"
            var day5Img=
              document.createElement('img')
              day5Img.src= 'https://openweathermap.org/img/wn/'+    data.list[39].weather[0].icon   +  '@2x.png'
            var day5Date=
              document.createElement('h3')
              day5Date.textContent= today.add(5, 'day').format(' M/D/YY');
            var day5Temp=
              document.createElement('h5');
              day5Temp.textContent = "Temperature: " + data.list[39].main.temp +"°F";
            var day5Wind=
              document.createElement('h5');
              day5Wind.textContent = "Wind Speed: " + data.list[39].wind.speed + " MPH";

            var day5Humidity=
              document.createElement('h5');
              day5Humidity.textContent = "Humidity: " + data.list[39].main.humidity + "%";

            day5.appendChild(day5Date)                                          //tapes everything to day2 div
            day5.appendChild(day5Img)
            day5.appendChild(day5Temp)
            day5.appendChild(day5Wind)
            day5.appendChild(day5Humidity)

            fiveDayForcast.appendChild(day1)                 //tapes all the days to fiveDayForcast
            fiveDayForcast.appendChild(day2)
            fiveDayForcast.appendChild(day3)
            fiveDayForcast.appendChild(day4)
            fiveDayForcast.appendChild(day5)

          fiveDayContainerEl.appendChild(fiveDayForcast)    //tapes fiveDayForcast to the fiveDayContainer
           console.log(fiveDayForcast)
          })}})});

  } else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to Library');
})};



// searchFieldEl.addEventListener('submit', formSubmitHandler);          // listens for clicks on the submit button
searchHistory.addEventListener("click", historyButtonHandler);   
clearSearch .addEventListener('click', clearSearchHandler);
searchBtn.addEventListener('click', formSubmitHandler);
renderSearch()