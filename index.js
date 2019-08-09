"use strict";

const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"
const sunriseURL = "https://api.sunrise-sunset.org/json"
const mapquestURL = "http://www.mapquestapi.com/geocoding/v1/address"
const staticMapURL = "https://www.mapquestapi.com/staticmap/v5/map?"
const mapquestLatLong = {};
let userDateSelected = 0;

//makes call to the mapquest static map api
function getStaticMap(userLocation){
    const staticMapParams = {
      "key": apikey,
      "center": userLocation,
      "locations": userLocation,
      "size": "200,200"
    }
  const formattedStaticMapParams = formatUserParamsQuery(staticMapParams);
  const staticMapRequestURL = staticMapURL + formattedStaticMapParams
  
  console.log(staticMapRequestURL);
  
  fetch(staticMapRequestURL)
  .then(response => {
    if (response.ok) {
      return response;
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    console.log(responseJson);
    drawMap(responseJson.url);
  })
  .catch(err => {
    console.log(`${err.message}`);
  });
}

//builds object data for mapquest api and fetches lattitude and longitude from JSON and stores the values in mapquestLatLong
function getUserMapquestInfo (location) {
  const mapquestInfo = {
    "key": apikey,
    "location": location
  }

  const mapquestQueryInfo = formatUserParamsQuery(mapquestInfo);
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

  const sunriseQueryInfo = formatUserParamsQuery (sunriseParams);
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
function formatUserParamsQuery (mapquestObjectData) {
  const mapquestQueryItems = Object.keys(mapquestObjectData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(mapquestObjectData[key])}`)
  return mapquestQueryItems.join('&');
}


//the results
function sunriseResultsData(responseJSON) {
 return $('.search-results').html(
  `<div id="sunriseTime"><span>Sunrise time: ${responseJSON.results.sunrise}<br>
  Sunset Time: ${responseJSON.results.sunset}<br>
  Solar Noon: ${responseJSON.results.solar_noon}</span></div>
  <div id="civilTime"><span>Civil Twilight Begin: ${responseJSON.results.civil_twilight_end}<br>
  Civil Twilight End: ${responseJSON.results.civil_twilight_end}</span></div>
  <div id="nauticalTime"><span>Nautical Twilight Begin: ${responseJSON.results.nautical_twilight_begin}<br>
  Nautical Twilight End: ${responseJSON.results.nautical_twilight_end}</span></div>
  <div id="astronomicalTime"><span>Astronomical Twilight Begin: ${responseJSON.results.astronomical_twilight_begin}<br>
  Astronomical Twilight End: ${responseJSON.results.astronomical_twilight_end}</span></div>`)
}
//to draw map
function drawMap (responseJson){
  $('.map').empty()
  return $('.map').append(`<img src="${responseJson}" alt="picture of location">`)
}
//sets up event listeners
function main () {
  $('form').on('click', '#user-click', function (){
      let userLocation = $('#user-input-location').val();
      userDateSelected = $('#user-input-date').val();
      getUserMapquestInfo(userLocation);
      getStaticMap(userLocation);
      $('h1').remove();
      $('fieldset').remove();
      $('body').css('background-image', 'url(http://lorempixel.com/1920/1080/city)');
      return userDateSelected;
  })
}

$(main);
