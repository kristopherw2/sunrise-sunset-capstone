"use strict"

const apikey = ""

function main () {
    $('form').on('click', '#user-click', function (){
        let userLocation = $('#user-input-location').val();
        let userDate = $('#user-input-date').val();
        console.log(userLocation, userDate);
    })
    
}

$(main);