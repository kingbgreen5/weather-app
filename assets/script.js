//       4f5f4f23db412f9704e82e1a76863ed2     openweather api key

var searchFieldEl = document.querySelector('#searchField');
var searchFieldInput = document.querySelector('#searchFieldInput');
var displayEl = document.querySelector("#display")
var displayTodayEl = document.querySelector("#displayToday") 
var fiveDayContainerEl = document.querySelector('#fiveDayContainer');
var searchHistory = document.querySelector('#localstoragediv')


var today = dayjs()
var todayFormated= dayjs().format(' M/D/YY');
var day1 = today.add(1,'day');
var day2 = today.add(2,'day');
var day3 = today.add(3,'day');
var day4 = today.add(4,'day');
var day5 = today.add(5,'day');


var formSubmitHandler = function (event) {             // when clicked, this is run
  event.preventDefault();
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
  console.log("Search Input: " + usersSearchInput)
  getSearch(usersSearchInput)                         // runs the search function with users search input
  storeSearch()
  renderSearch()
  // log search to local storage
  // When those buttons are clicked on after they are built later they need to auto search for the selected city
};

// 
// historyButtonHandler

function historyButtonHandler(){

}



searchArray =[]
function storeSearch(){                                         // Stores Searches in local Storage
var usersSearchInput = searchFieldInput.value 
searchArray.push(usersSearchInput)
localStorage.setItem("search", JSON.stringify(searchArray));        
};




function renderSearch(){                                              // Renders Stored searches
  for (var i = 0; i < searchArray.length; i++) {
    var search = searchArray[i];
    searchArray =[]
    var button = document.createElement("button");
    button.textContent = search
    searchHistory.appendChild(button);
}
}



















 function getSearch(usersSearchInput) {
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
            document.createElement("h2")
            locationDisplay.textContent = data.city.name +" "+ todayFormated + " " + data.list[0].weather[0].icon;    ////sets data for the display function above
           
            var todaysTemp=
            document.createElement('h5');
            todaysTemp.textContent = "Temperature: " + data.list[0].main.temp +"°F";

            var todaysWind=
            document.createElement('h5');
            todaysWind.textContent = "Wind Speed: " + data.list[0].wind.speed + " MPH";

            var todaysHumidity=
            document.createElement('h5');
            todaysHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";


            displayTodayEl.appendChild(locationDisplay)
            displayTodayEl.appendChild(todaysTemp)
            displayTodayEl.appendChild(todaysWind)
            displayTodayEl.appendChild(todaysHumidity)

         


            var fiveDayForcast=                                             //
            document.createElement('h2')
            fiveDayForcast.textContent= "5 Day Forcast:"



            var day1=                                                         // DAY1
            document.createElement('div')

            var day1Date=
            document.createElement('h3')
            day1Date.textContent = today.add(1, 'day').format(' M/D/YY');

            var day1Temp=
            document.createElement('h5');
           day1Temp.textContent = "Temperature: " + data.list[8].main.temp +"°F";
        
           var day1Wind=
           document.createElement('h5');
           day1Wind.textContent = "Wind Speed: " + data.list[8].wind.speed + " MPH";

           var day1Humidity=
           document.createElement('h5');
           day1Humidity.textContent = "Humidity: " + data.list[8].main.humidity + "%";

           day1.appendChild(day1Date)                                          //tapes everything to day1 div
           day1.appendChild(day1Temp)
           day1.appendChild(day1Wind)
           day1.appendChild(day1Humidity)



           var day2=                                                         // DAY2
           document.createElement('div')

           var day2Date=
           document.createElement('h3')
           day2Date.textContent= today.add(2, 'day').format(' M/D/YY');

           var day2Temp=
           document.createElement('h5');
          day2Temp.textContent = "Temperature: " + data.list[16].main.temp +"°F";
       
          var day2Wind=
          document.createElement('h5');
          day2Wind.textContent = "Wind Speed: " + data.list[16].wind.speed + " MPH";

          var day2Humidity=
          document.createElement('h5');
          day2Humidity.textContent = "Humidity: " + data.list[16].main.humidity + "%";

          day2.appendChild(day2Date)                                          //tapes everything to day2 div
          day2.appendChild(day2Temp)
          day2.appendChild(day2Wind)
          day2.appendChild(day2Humidity)



          var day3=                                                         // DAY3
          document.createElement('div')

          var day3Date=
          document.createElement('h3')
          day3Date.textContent= today.add(3, 'day').format(' M/D/YY');

          var day3Temp=
          document.createElement('h5');
         day3Temp.textContent = "Temperature: " + data.list[24].main.temp +"°F";
      
         var day3Wind=
         document.createElement('h5');
         day3Wind.textContent = "Wind Speed: " + data.list[24].wind.speed + " MPH";

         var day3Humidity=
         document.createElement('h5');
         day3Humidity.textContent = "Humidity: " + data.list[24].main.humidity + "%";

         day3.appendChild(day3Date)                                          //tapes everything to day3 div
         day3.appendChild(day3Temp)
         day3.appendChild(day3Wind)
         day3.appendChild(day3Humidity)



         var day4=                                                         // DAY4
         document.createElement('div')

         var day4Date=
         document.createElement('h3')
         day4Date.textContent= today.add(4, 'day').format(' M/D/YY');

         var day4Temp=
         document.createElement('h5');
        day4Temp.textContent = "Temperature: " + data.list[32].main.temp +"°F";
     
        var day4Wind=
        document.createElement('h5');
        day4Wind.textContent = "Wind Speed: " + data.list[32].wind.speed + " MPH";

        var day4Humidity=
        document.createElement('h5');
        day4Humidity.textContent = "Humidity: " + data.list[32].main.humidity + "%";

        day4.appendChild(day4Date)                                          //tapes everything to day4 div
        day4.appendChild(day4Temp)
        day4.appendChild(day4Wind)
        day4.appendChild(day4Humidity)



        var day5=                                                         // DAY5
        document.createElement('div')

        var day5Date=
        document.createElement('h3')
        day5Date.textContent= today.add(5, 'day').format(' M/D/YY');

        var day5Temp=
        document.createElement('h5');
        day5Temp.textContent = "Temperature: " + data.list[24].main.temp +"°F";
    
       var day5Wind=
       document.createElement('h5');
       day5Wind.textContent = "Wind Speed: " + data.list[24].wind.speed + " MPH";

       var day5Humidity=
       document.createElement('h5');
       day5Humidity.textContent = "Humidity: " + data.list[24].main.humidity + "%";

       day5.appendChild(day5Date)                                          //tapes everything to day2 div
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

       


          })}})
        


    






  //     for (var i = 0; i < data.photos.length; i++) {          // for the length of the string returned, go through each one
  //       imgURL=(data.photos[i].img_src);                       // set the image source to imgURL
  //       cameraName=(data.photos[i].camera.full_name);          // Set the name of the Camera that took the photo to cameraName
  //       displayPhotos(imgURL);
  // }
}
);
  } else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to Library');
})};



searchFieldEl.addEventListener('submit', formSubmitHandler);
searchHistory.addEventListener('submit', historyButtonHandler);
