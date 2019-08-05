"use strict"
// mapquest api = https://developer.mapquest.com/documentation/geocoding-api/
//sunrise api = https://sunrise-sunset.org/api


const apikey = "zkn6RGyTDlLGsN8i8RfEmURf2GozTAkL"

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