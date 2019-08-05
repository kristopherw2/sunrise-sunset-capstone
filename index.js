"use strict";
// mapquest api = https://developer.mapquest.com/documentation/geocoding-api/
//sunrise api = https://sunrise-sunset.org/api



const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"
const sunriseURL = "https://sunrise-sunset.org/api/json"
const mapquestURL = "https://developer.mapquest.com/documentation/geocoding-api/"
const mapquestLatLong = {}; 
let userDateSelected = ""



// function main () {
//   $('form').on('click', '#user-click', function (){
//       let userLocation = $('#user-input-location').val();
//       userDateSelected = $('#user-input-date').val();
//       getUserMapquestInfo(userLocation);
//   })
// }

//builds object data for mapquest api and fetches lattitude and longitude from JSON and stores the values in mapquestLatLong
function getUserMapquestInfo (location) {
  const mapquestInfo = {
    "key": apikey,
    "location": location
  }
  const mapquestQueryInfo = formatMapquestQuery(mapquestInfo);
  const mapquestSearchURL = mapquestURL + '?' + mapquestQueryInfo; 

  fetch(mapquestSearchURL, {mode: 'no-cors'})
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    console.log(JSON.stringify(responseJson));
    return mapquestLatLong = responseJson.results.locations.displayLatLng
  })
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });

}

//stores lat and lng in string for sunrise call
let mapquestLat = `lat=${mapquestLatLong.lat}`
let mapquestLng = `lng=${mapquestLatLong.lng}`



//makes the call to the sunrise api
function sunriseQuery(mapquestLatLong, userDateSelected) {
  const sunriseURLQuery =sunriseURL + '?' + mapquestlat + mapquestLng + userDateSelected;
  
  fetch(sunriseURLQuery)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    console.log(JSON.stringify(responseJson));
    sunriseResultsData(responseJson);
  })
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

//formats data for params for api query
function formatMapquestQuery (mapquestObjectData) {
  const mapquestQueryItems = Object.keys(mapquestObjectData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(mapquestObjectData[key])}`)
  console.log(mapquestQueryItems);
  return mapquestQueryItems.join('&');
}

//the results
function sunriseResultsData(responseJSON) {
  responseJSON.map()
  $('.search-results').empty()
return $('.search-results').html(
  `<div id="sunriseTime"><span>Sunrise time: ${responseJSON.results.sunrise}<b>
  Sunset Time: ${responseJSON.results.sunset}<b>
  Solar Noon: ${responseJSON.results.solar_noon}</span></div>`)
}

//sets up event listeners
function main () {
  $('form').on('click', '#user-click', function (){
      let userLocation = $('#user-input-location').val();
      userDateSelected = $('#user-input-date').val();
      getUserMapquestInfo(userLocation);
      return userDateSelected;
  })
}

$(main); 
