var submitBtn= $('#submit');
var from=$('#fromInput');
var to = $('#toInput');
var duration = $('#durationInput');
var numMonths = $('#numMonths');


var url = 'https://api.tequila.kiwi.com/v2/search';
var apikey = '9dU5c1zZxOO4AyOA58aEW70owtRgoHgC';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '38fb04b87bmsh6cb52bdef7ffc4fp15ab0ejsnd45492be722f',
		'X-RapidAPI-Host': 'iata-and-icao-codes.p.rapidapi.com'
	}
};

fetch('https://iata-and-icao-codes.p.rapidapi.com/airlines', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

$(document).ready(function(){
    submitBtn.on('click',function(event){
        event.preventDefault(); 
       
        var newurl= 'https://api.tequila.kiwi.com/v2/search' + '?fly_from='+ from.val()
         + '&fly_to=' + to.val()+ '&nights_in_dst_from=' + duration.val() 
         + '&nights_in_dst_to=' + duration.val() + '&curr=USD&sort=price&asc=1&limit=3'      
        console.log(newurl)
        fetch(newurl, {
            method: "GET",
            withCredentials: true,
            headers: {
              "apikey": apikey,
              "Content-Type": "application/json"
            }
          })
            .then(resp => resp.json())
            .then(function(data) {
              console.log(data);
            })
            .catch(function(error) {
              console.log(error);
            });
        
           
         // Submit the form
    });
});


