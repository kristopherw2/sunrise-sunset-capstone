"use strict"
// mapquest api = https://developer.mapquest.com/documentation/geocoding-api/
//sunrise api = https://sunrise-sunset.org/api


const apikey = ""

function getUserLatLong (location) {
    
}


function main () {
    $('form').on('click', '#user-click', function (){
        let userLocation = $('#user-input-location').val();
        let userDate = $('#user-input-date').val();
        console.log(userLocation, userDate);
    })
    
}

$(main);