"use strict";

const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"
const sunriseURL = "https://api.sunrise-sunset.org/json"
const mapquestURL = "https://www.mapquestapi.com/geocoding/v1/address"
const staticMapURL = "https://www.mapquestapi.com/staticmap/v5/map?"
const mapquestLatLong = {};
let userDateSelected = 0;
let mapquestLat = 0
let mapquestLng = 0

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
    mapquestLat = `${responseJson.results[0].locations[0].latLng.lat}`
    mapquestLng = `${responseJson.results[0].locations[0].latLng.lng}`
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
  return $('.map').append(`<img class="mapImg" src="${responseJson}" alt="picture of location">`)
}
//sets up event listeners
function main () {
  $('form').on('click', '#user-click', function (){
      let userLocation = $('#user-input-location').val();
      userDateSelected = $('#user-input-date').val();
      getUserMapquestInfo(userLocation);
      getStaticMap(userLocation);
      $('h1').css('display', 'none');
      $('fieldset').css('display', 'none');
      $('#reset').css('display', 'block');
/*      if (mapquestLat <= 30) {
        $('body').css('background-image'), 'url(https://cdn.pixabay.com/photo/2016/10/18/21/22/california-1751455_960_720.jpg)';
      }
      else if (mapquestLat >= 50) {
        $('body').css('background-image'), 'url(https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_960_720.jpg)';
      }
      else {
        $('body').css('background-image'), 'url(https://lorempixel.com/1920/1080/city)';
      };
*/
      return userDateSelected;
  })
}

$(main);


function reset () {
  $('.reset').on('click', '#reset', function (){
      $('#sunriseTime').remove();
      $('#civilTime').remove();
      $('#nauticalTime').remove();
      $('#astronomicalTime').remove();
      $('.mapImg').remove();
      $('h1').css('display','block');
      $('fieldset').css('display','block');
      $('body').css('background-image', 'url(https://cdn.pixabay.com/photo/2017/02/19/15/28/italy-2080072_960_720.jpg');
      $('#reset').css('display', 'none');
  })
}
$(reset);
