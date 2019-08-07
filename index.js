"use strict";

const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"
const sunriseURL = "https://api.sunrise-sunset.org/json"
const mapquestURL = "https://www.mapquestapi.com/geocoding/v1/address"
const mapquestLatLong = {};
let userDateSelected = 0;

//builds object data for mapquest api and fetches lattitude and longitude from JSON and stores the values in mapquestLatLong
function getUserMapquestInfo (location) {
  const mapquestInfo = {
    "key": apikey,
    "location": location
  }
  const mapquestQueryInfo = formatMapquestQuery(mapquestInfo);
  const mapquestSearchURL = mapquestURL + '?' + mapquestQueryInfo; 

  fetch(mapquestSearchURL)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    const mapquestLat = `${responseJson.results[0].locations[0].latLng.lat}`
    const mapquestLng = `${responseJson.results[0].locations[0].latLng.lng}`
    sunriseQuery(mapquestLat, mapquestLng, userDateSelected);
  })
  .catch(err => {
    console.log(`${err.message}`);
  });

}

//makes the call to the sunrise api
function sunriseQuery(mapquestLat, mapquestLng, userDateSelected) {
  const sunriseParams = {
       "lat": mapquestLat,
      'lng': mapquestLng,
      "date": userDateSelected
  }

  const sunriseQueryInfo = formatMapquestQuery(sunriseParams);
  const completedSunriseURL = sunriseURL + '?' + sunriseQueryInfo;
    
  fetch(completedSunriseURL)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    sunriseResultsData(responseJson);
  })
  .catch(err => {
    console.log(`${err.message}`);
  });
}

//formats data for params for api query
function formatMapquestQuery (mapquestObjectData) {
  const mapquestQueryItems = Object.keys(mapquestObjectData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(mapquestObjectData[key])}`)
  return mapquestQueryItems.join('&');
}

//the results
function sunriseResultsData(responseJSON) {
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
