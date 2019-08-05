"use strict"
// mapquest api = https://developer.mapquest.com/documentation/geocoding-api/
//sunrise api = https://sunrise-sunset.org/api


const apikey = ""
const sunriseURL = "https://sunrise-sunset.org/api"
const mapquestURL = "https://developer.mapquest.com/documentation/geocoding-api/"
function getUserLatLong (location) {
}
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
function main () {
    $('form').on('click', '#user-click', function (){
        let userLocation = $('#user-input-location').val();
        let userDate = $('#user-input-date').val();
        console.log(userLocation, userDate);
    })
}
function sunriseResults(){
  return
  `<div id="sunriseTime"><span>Sunrise time: ${responseJSON.results.sunrise}<b>
  Sunset Time: ${responseJSON.results.sunset}<b>
  Solar Noon: ${responseJSON.results.solar_noon}</span></div>`;
}



$(main);
