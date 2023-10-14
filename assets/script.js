//       4f5f4f23db412f9704e82e1a76863ed2     openweather api key

var searchFieldEl = document.querySelector('#searchField');
var searchFieldInput = document.querySelector('#searchFieldInput');
var displayEl = document.querySelector("#display")
var displayTodayEl = document.querySelector(".displayToday")

var formSubmitHandler = function (event) {             // when clicked, this is run
  event.preventDefault();
  var usersSearchInput = searchFieldInput.value       // sets a variable from the info typed in the field
  console.log("Search Input: " + usersSearchInput)
  getSearch(usersSearchInput)                         // runs the search function with users search input
  displayWeather()
  // log search to local storage
  // When those buttons are clicked on after they are built later they need to auto search for the selected city
};






function displayWeather(){
// needs to create the elements , Current weather, 5 day forcast

  // displayEl.appendChild(img);    // document.body.appendChild(img);        //  adds it to the <body> tag                
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
        var locationURl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=4f5f4f23db412f9704e82e1a76863ed2'
      fetch(locationURl)                                         // FETCH
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);


            
        
        
            
            var locationDisplay = 
            document.createElement("h3")
            locationDisplay.textContent = data.city.name +" "+ "DATEPLACEHOLDER" +" "+ data.list[0].weather[0].icon;    ////sets data for the display function above
            console.log(locationDisplay)

            var todaysTemp=
            document.createElement('h5');
            todaysTemp.textContent = "Temperature: " + data.list[0].main.temp;

            var todaysWind=
            document.createElement('h5');
            todaysWind.textContent = "Wind Speed: " + data.list[0].wind.speed;

            var todaysHumidity=
            document.createElement('h5');
            todaysHumidity.textContent = "Humidity: " + data.list[0].main.humidity;

            document.body.appendChild(locationDisplay)
            document.body.appendChild(todaysTemp)
            document.body.appendChild(todaysWind)
            document.body.appendChild(todaysHumidity)
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
