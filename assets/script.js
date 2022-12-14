var submitBtn = $("#submit");
var from = $("#fromInput");
var to = $("#toInput");
var duration = $("#durationInput");
var numMonths = $("#numMonths");
var one = $("#plusOne");
var two = $("#plusTwo");
var three = $("#plusThree");
var four = $("#plusFour");
var five = $("#plusFive");
var six = $("#plusSix");
var today = dayjs().format("DD/MM/YYYY");
var cardOne = $(".card-1");
var cardTwo = $(".card-2");
var cardThree = $(".card-3");
$("#time").text(today);

var uptodate = "";
function returnMon() {
  if (numMonths.val() == "Now - 1 month") {
    uptodate = dayjs().add(1, "month").format("DD/MM/YYYY");
  } else if (numMonths.val() == "Now - 2 months") {
    uptodate = dayjs().add(2, "month").format("DD/MM/YYYY");
  } else if (numMonths.val() == "Now - 3 months") {
    uptodate = dayjs().add(3, "month").format("DD/MM/YYYY");
  } else if (numMonths.val() == "Now - 4 months") {
    uptodate = dayjs().add(4, "month").format("DD/MM/YYYY");
  } else if (numMonths.val() == "Now - 5 months") {
    uptodate = dayjs().add(5, "month").format("DD/MM/YYYY");
  } else if (numMonths.val() == "Now - 6 months") {
    uptodate = dayjs().add(6, "month").format("DD/MM/YYYY");
  }
  return uptodate;
}


var url = "https://api.tequila.kiwi.com/v2/search";
var apikey = "9dU5c1zZxOO4AyOA58aEW70owtRgoHgC";

var fromCity = "";
var toCity = "";

function getFlightUrl(fromCity, toCity) {
  var newurl =
    "https://api.tequila.kiwi.com/v2/search" +
    "?fly_from=" +
    fromCity +
    "&fly_to=" +
    toCity +
    "&return_from=" +
    today +
    "&return_to=" +
    uptodate +
    "&nights_in_dst_from=" +
    duration.val() +
    "&nights_in_dst_to=" +
    duration.val() +
    "&flight_type=round" +
    "&curr=USD&max_stopovers=0&sort=price&asc=1&limit=3";
  console.log(newurl);
  fetch(newurl, {
    method: "GET",
    withCredentials: true,
    headers: {
      apikey: apikey,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      console.log(data.data.length);
      for (let j = 0; j < data.data.length; j++) {
        var fullflight = data.data[j].route;
        console.log("price", data.data[j].price);
        console.log(
          "Flight from " +
            data.data[j].cityFrom +
            " to " +
            data.data[j].cityTo +
            " only $" +
            data.data[j].price
        );
        console.log(fullflight);
        var flightData = [];
        for (let i = 0; i < fullflight.length; i++) {
          console.log(fullflight.length);
          flightData.push({
            cityCodeFrom: fullflight[i].cityCodeFrom,
            cityCodeTo: fullflight[i].cityCodeTo,
            airline: fullflight[i].airline,
            fullCityNameFrom: fullflight[i].cityFrom,
            fullCityNameTo: fullflight[i].cityTo,
            flightNumber: fullflight[i].flight_no,
            departure: fullflight[i].local_departure,
            arrival: fullflight[i].local_arrival,
            flightprice: data.data[j].price,
          });
        }
        localStorage.setItem("flightData" + j, JSON.stringify(flightData));
        localStorage.setItem("toCityCode", toCity)

        window.location.href = "./assets/info.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function getCityCodeFrom() {
  var citynewurl =
    "https://api.tequila.kiwi.com/locations/query" +
    "?term=" +
    from.val() +
    "&locale=en-US&location_types=city&limit=10&active_only=true";
  console.log(citynewurl);
  await fetch(citynewurl, {
    method: "GET",
    withCredentials: true,
    headers: {
      apikey: apikey,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      fromCity = data.locations[0].code;
      console.log(fromCity);
      getCityCodeTo();
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function getCityCodeTo() {
  var toCityurl =
    "https://api.tequila.kiwi.com/locations/query" +
    "?term=" +
    to.val() +
    "&locale=en-US&location_types=city&limit=10&active_only=true";

  console.log(toCityurl);
  await fetch(toCityurl, {
    method: "GET",
    withCredentials: true,
    headers: {
      apikey: apikey,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      toCity = data.locations[0].code;
      console.log(toCity);
      getFlightUrl(fromCity, toCity);
    })
    .catch(function (error) {
      console.log(error);
    });
}

$(document).ready(function () {
  submitBtn.on("click", function (event) {
    event.preventDefault();
    returnMon(uptodate);
    getCityCodeFrom();

    // Submit the form
  });
});
var flightResults1 = JSON.parse(localStorage.getItem("flightData0"));
$(".card-title-1").text(flightResults1[0].airline);
$(".card-subtitle-1").text("$" + flightResults1[0].price);

var flightResults2 = JSON.parse(localStorage.getItem("flightData1"));
$(".card-title-2").text(flightResults2[0].airline);
$(".card-subtitle-2").text("$" + flightResults2[0].price);

var flightResults3 = JSON.parse(localStorage.getItem("flightData2"));
$(".card-title-3").text(flightResults3[0].airline);
$(".card-subtitle-3").text("$" + flightResults3[0].price);

//departure and arrival locations
$(".departure-1").text(flightResults1[0].fullCityNameFrom);
$(".arrival-1").text(flightResults1[0].fullCityNameTo);
$(".departure-2").text(flightResults2[0].fullCityNameFrom);
$(".arrival-2").text(flightResults2[0].fullCityNameTo);
$(".departure-3").text(flightResults3[0].fullCityNameFrom);
$(".arrival-3").text(flightResults3[0].fullCityNameTo);

//departure and arrival times
$(".departure-time-1").text(
  flightResults1[0].departure.split("T")[0] +
    " " +
    flightResults1[0].departure.split("T")[1].split(".")[0].slice(0, -3)
);
$(".arrival-time-1").text(
  flightResults1[0].arrival.split("T")[0] +
    " " +
    flightResults1[0].arrival.split("T")[1].split(".")[0].slice(0, -3)
);
$(".departure-time-2").text(
  flightResults2[0].departure.split("T")[0] +
    " " +
    flightResults2[0].departure.split("T")[1].split(".")[0].slice(0, -3)
);
$(".arrival-time-2").text(
  flightResults2[0].arrival.split("T")[0] +
    " " +
    flightResults2[0].arrival.split("T")[1].split(".")[0].slice(0, -3)
);
$(".departure-time-3").text(
  flightResults3[0].departure.split("T")[0] +
    " " +
    flightResults3[0].departure.split("T")[1].split(".")[0].slice(0, -3)
);
$(".arrival-time-3").text(
  flightResultsThree[0].arrival.split("T")[0] +
    " " +
    flightResultsThree[0].arrival.split("T")[1].split(".")[0].slice(0, -3)
);

var seatGeekKey = "&client_id=MzA4OTQzMjR8MTY3MDYxMjQzMi41NjI0NDc4";
var seatGeekURL = "https://api.seatgeek.com/2/events?"; 
var events = JSON.parse(localStorage.getItem("events"));
var destCity = localStorage.getItem("destCity");
var destArrival = localStorage.getItem("destArrival");
var destDeparture = localStorage.getItem("destDeparture");
var flightIndex = localStorage.getItem("flightIndex");

function getEvents(fr) {
  var seatGeekURL = "https://api.seatgeek.com/2/events?";
  var destCityCode = localStorage.getItem("toCityCode");
  for(var i = 0; i < fr.length; i++){
    if(fr[i].cityCodeTo == destCityCode){
      destArrival = fr[i].arrival.split("Z")[0];
      destCity = fr[i].fullCityNameTo;
    }
  }
  for(var i = 0; i < fr.length; i++){
    if(fr[i].cityCodeFrom == destCityCode){
      destDeparture = fr[i].arrival.split("Z")[0];
    }
  }
  localStorage.setItem("destCity", destCity);
  localStorage.setItem("destArrival", destArrival);
  localStorage.setItem("destDeparture", destDeparture);
  seatGeekURL = seatGeekURL + "datetime_utc.gt=" + destArrival + "&datetime_utc.lt=" + destDeparture + "&venue.city=" + destCity + "&sort=score.desc" +seatGeekKey;
  console.log(seatGeekURL);
  fetch(seatGeekURL)
    .then((resp) => resp.json())
    .then( function(data) {
      events = data.events;
      localStorage.setItem("events", JSON.stringify(events));
      window.location.replace('./events.html');
    });
}

$(".flight-btn-1").on("click", () => {
  localStorage.setItem("flightIndex", 0);
  getEvents(flightResults1);
});

$(".flight-btn-2").on("click", () => {
  localStorage.setItem("flightIndex", 1);
  getEvents(flightResults2);
});

$(".flight-btn-3").on("click", () => {
  localStorage.setItem("flightIndex", 2);
  getEvents(flightResults3);
});

var flight = JSON.parse(localStorage.getItem("flightData" + flightIndex));
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

$('.flights-heading').text("Your Itinerary");

for(var i=0; i<flight.length; i++){

  var takeoff = new Date(flight[i].departure);
  var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(takeoff);
  var mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(takeoff);
  var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(takeoff);
  var hour = flight[i].departure.split("T")[1].split(":")[0];
  var ampm = "AM";
  if(hour > 12){
    hour -= 12;
    ampm = "PM"
  }
  var minute = flight[i].departure.split("T")[1].split(":")[1];
  var takeoffString = weekday[takeoff.getDay()].slice(0,3) + ", " + `${mo} ${da}, ${ye}` +" (" + hour + ":" + minute + " " + ampm + ")";

  var landing = new Date(flight[i].arrival); 
  ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(landing);
  mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(landing);
  da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(landing);
  hour = flight[i].arrival.split("T")[1].split(":")[0];
  ampm = "AM";
  if(hour > 12){
    hour -= 12;
    ampm = "PM"
  }
  minute = flight[i].departure.split("T")[1].split(":")[1];
  var landingString = weekday[landing.getDay()].slice(0,3) + ", " + `${mo} ${da}, ${ye}` +" (" + hour + ":" + minute + " " + ampm + ")";

  var flightLeg = "<div style=\"margin: 30px 30px 40px 30px\"><h2 style=\"font-size: 20px; margin-bottom: 10px\">" + flight[i].airline + " Flight #" + flight[i].flightNumber + "</h2>";
  flightLeg += "<div style=\"margin-left: 20px\"> <i class=\"fa-solid fa-plane-departure\"></i><p style=\"margin-left:10px; display:inline-block; font-size: 17px; font-weight: normal;\"><b>" + flight[i].fullCityNameFrom + "</b>: " + takeoffString + "</p></div>";
  flightLeg += "<div style=\"margin-left: 20px\"> <i class=\"fa-solid fa-plane-arrival\"></i><p style=\"margin-left:10px; display:inline-block; font-size: 17px; font-weight: normal;\"><b>" + flight[i].fullCityNameTo + "</b>: " + landingString + "</p></div>";
  $('.flights-heading').append(flightLeg);
}

$('.events-heading').text("Events in " + destCity);

for(var i=0; i<events.length; i++){
  var printLine = true;
  for(var j=0; j<i; j++){
    if(events[j].title == events[i].title){
      printLine = false;
    }
  }
  if(printLine){
    var listItem = "<li>";
    listItem += "<b>" + parseInt(events[i].datetime_local.split("-")[1]) + "/" + parseInt(events[i].datetime_local.split("-")[2].split("T")[0]) + ":</b> ";
    listItem += "<a href=\"" + events[i].url + "\" target=_blank>"  + events[i].title + "</a>";
    $('.events-list').append(listItem);
  }
}
