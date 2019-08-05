"use strict"
// mapquest api = https://developer.mapquest.com/documentation/geocoding-api/
//sunrise api = https://sunrise-sunset.org/api



const apikey = "792a50c1d3fd55e54cf1432083cf34d73c8c6d2a"
const sunriseURL = "https://sunrise-sunset.org/api"
const mapquestURL = "https://developer.mapquest.com/documentation/geocoding-api/"


/*
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    console.log(queryItems.join('&'));
  return queryItems.join('&');
}
function createVideoHTML(title, description, thumbnailURL) {
    return `
        <div class="video">
            <img class="video-thumbnail" src="${thumbnailURL}" />
            <div class="video-title">${title}</div>
            <div class="video-description">${description}</div>
        </div>`}
function displayResults(responseData) {
    const items = responseData.items
    const itemHtml = items.map(function(item){
        const title = (item.snippet.title)
        const description = (item.snippet.description)
        const thumbnail = (item.snippet.thumbnails.medium.url)
        return createVideoHTML(title, description, thumbnail)
    }).join("")
    $("#search-results").html(itemHtml)
}*/

//sets up event listeners
function main () {
    $('form').on('click', '#user-click', function (){
        let userLocation = $('#user-input-location').val();
        let userDate = $('#user-input-date').val();
        console.log(userLocation, userDate);
    })
    getUserMapquestInfo(userLocation);
}

//builds object data for mapquest api
function getUserMapquestInfo (location) {
  const mapquestInfo = {
    "key": apikey,
    "location": location
  }
  formatMapquestQuery(mapquestInfo);
}

//formats data for params for api query
function formatMapquestQuery (mapquestObjectData) {
  const mapquestQueryItems = Object.keys(mapquestObjectData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(mapquestObjectData[key])}`)
  console.log(mapquestQueryItems);
  return mapquestQueryItems.join('&');
}




//the results
function sunriseResultsData() {
$('.search-results').empty()
return $('.search-results').html(
  `<div id="sunriseTime"><span>Sunrise time: ${responseJSON.results.sunrise}<b>
  Sunset Time: ${responseJSON.results.sunset}<b>
  Solar Noon: ${responseJSON.results.solar_noon}</span></div>`)
}



$(main);
