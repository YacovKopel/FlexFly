
var destination = "JFK"
var startDate = "2022-12-10";
var endDate = "2022-12-17";

var eventKey = "&client_id=MzA4OTQzMjR8MTY3MDYxMjQzMi41NjI0NDc4";
var geoCodingKey = "AIzaSyCMqveQphuo5qFLoKYnLwLws2QWMVsx_RE";
var tequilaKey = "9dU5c1zZxOO4AyOA58aEW70owtRgoHgC";

var flightURL = "https://api.tequila.kiwi.com/v2/search?fly_from=city:LAX&fly_to=city:JFK";
var eventURL = "https://api.seatgeek.com/2/events?"; 
var geoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?address="; 

geoCodingURL = geoCodingURL + destination + "&key=" + geoCodingKey;

console.log(geoCodingURL);

eventURL = eventURL + "lat=40.7509&lon=-73.9943&range=1mi" + eventKey;

//eventURL = "https://api.seatgeek.com/2/events?datetime_utc.gte=2012-04-01&datetime_utc.lte=2012-04-30" + eventKey;

fetch(geoCodingURL)
    .then( function (response) {
        return response.json();
    })
    .then( function(data) {
        console.log(data);
    });

fetch(eventURL)
    .then( function (response) {
        return response.json();
    })
    .then( function(data) {
        var events = data.events;
        console.log(events);
        for(var i=0; i<events.length; i++){
            console.log(events[i]);
        }
    });

fetch(flightURL,
    {method: 'GET',
    headers: {
       'apikey': tequilaKey
    }})
    .then(function(response){
        return response.json();
    })
    .then(function (flights){
        console.log(flights.data);
    });