"use strict";

const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"
const sunriseURL = "https://api.sunrise-sunset.org/json"
const mapquestURL = "https://www.mapquestapi.com/geocoding/v1/address"
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
  
 
  
  fetch(staticMapRequestURL)
  .then(response => {
    if (response.ok) {
      return response;
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
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
  const newDate = Object.keys(responseJSON.results).map(key => `${new Date(`${userDateSelected} ${responseJSON.results[key]} UTC`)}`).map(string => string.replace("GMT-0500 (Central Daylight Time)", ""))
  //const newDate = newDate.map(string => string.replace("GMT-0500 (Central Daylight Time)", ""))
 return $('.search-results').html(
  `<div id="sunriseTime"><span>Sunrise: ${newDate[0]}<br>
  Sunset Time: ${newDate[1]}<br>
  Solar Noon: ${newDate[2]}</span></div>
  <div id="civilTime"><span>Civil Twilight Begin: ${newDate[4]}<br>
  Civil Twilight End: ${newDate[5]}</span></div>
  <div id="nauticalTime"><span>Nautical Twilight Begin: ${newDate[6]}<br>
  Nautical Twilight End: ${newDate[7]}</span></div>
  <div id="astronomicalTime"><span>Astronomical Twilight Begin: ${newDate[8]}<br>
  Astronomical Twilight End: ${newDate[9]}</span></div>`)
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
      $('body').css('background-image', 'url(https://lorempixel.com/1920/1080/city)');
      return userDateSelected;
  })
}

$(main);
