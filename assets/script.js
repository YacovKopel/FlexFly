var submitBtn= $('#submit');
var from=$('#fromInput');
var to = $('#toInput');
var duration = $('#durationInput');
var numMonths = $('#numMonths');
var one= $('#plusOne');

var two =$('#plusTwo');
var three= $('#plusThree');
var four=$('#plusFour');
var five = $('#plusFive')
var six = $('#plusSix');
var today=dayjs().format('DD/MM/YYYY');
$('#time').text(today);

var uptodate=''
function returnMon() {
    if (numMonths.val()=='Now - 1 month') {
        uptodate= dayjs().add(1, 'month').format('DD/MM/YYYY') 
    }
    else if (numMonths.val()=='Now - 2 months') {
        uptodate= dayjs().add(2, 'month').format('DD/MM/YYYY') 
    }else if (numMonths.val()=='Now - 3 months') {
        uptodate= dayjs().add(3, 'month').format('DD/MM/YYYY') 
    }
    else if (numMonths.val()=='Now - 4 months') {
        uptodate= dayjs().add(4, 'month').format('DD/MM/YYYY') 
    }
    else if (numMonths.val()=='Now - 5 months') {
        uptodate= dayjs().add(5, 'month').format('DD/MM/YYYY') 
    }else if (numMonths.val()=='Now - 6 months') {
        uptodate= dayjs().add(6, 'month').format('DD/MM/YYYY') 
    }
    console.log(uptodate)
    return uptodate
}

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
        returnMon(uptodate)
       
        var newurl= 'https://api.tequila.kiwi.com/v2/search' + '?fly_from='+ from.val()
         + '&fly_to=' + to.val()+'&return_from='+ today +'&return_to='+ uptodate + '&nights_in_dst_from=' + duration.val() 
         + '&nights_in_dst_to=' + duration.val()+'&flight_type=round' + '&curr=USD&sort=price&asc=1&limit=3'      
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
              console.log(data.data.length)
              for (let i = 0; i < data.data.length; i++) {
                var fullflight=data.data[i].route
                console.log(data.data[i].price)
                console.log(fullflight)
                for (let i = 0; i < fullflight.length; i++) {
                    console.log(fullflight.length)
                    console.log(fullflight[i].cityCodeFrom)
                    console.log(fullflight[i].cityCodeTo)
                    console.log(fullflight[i].airline)
                    console.log(fullflight[i].cityFrom)
                    console.log(fullflight[i].cityTo)
                    console.log(fullflight[i].flight_no)
            
                }
            }
            })
            .catch(function(error) {
              console.log(error);
            });
        
           
         // Submit the form
    });
});

