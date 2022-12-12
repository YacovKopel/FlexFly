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
    return uptodate
}

var url = 'https://api.tequila.kiwi.com/v2/search';
var apikey = '9dU5c1zZxOO4AyOA58aEW70owtRgoHgC';

var fromCity='';
function getFlightUrl(fromCity) {
        
    var newurl= 'https://api.tequila.kiwi.com/v2/search' + '?fly_from='+ fromCity
     + '&fly_to=' + toCity +'&return_from='+ today +'&return_to='+ uptodate + '&nights_in_dst_from=' + duration.val() 
     + '&nights_in_dst_to=' + duration.val()+'&flight_type=round' + '&curr=USD&max_stopovers=1&sort=price&asc=1&limit=3'      
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
           console.log("price", data.data[i].price)
           console.log("Flight from "+data.data[i].cityFrom+ " to "+data.data[i].cityTo+ " only $"+  data.data[i].price)
            console.log(fullflight)
            var flightData=[]
            for (let i = 0; i < fullflight.length; i++) {
                console.log(fullflight.length)
                flightData.push({
                    cityCodefrom :fullflight[i].cityCodeFrom,
                    cityCodeto: fullflight[i].cityCodeTo,
                    airline: fullflight[i].airline,
                    fullCityNameFrom: fullflight[i].cityFrom,
                    fullCityNameTo: fullflight[i].cityTo,
                    flightNumber: fullflight[i].flight_no,
                    departure: fullflight[i].local_departure,
                    arrival: fullflight[i].local_arrival

                })
  
        
            }
            localStorage.setItem("flightData"+i, JSON.stringify(flightData))
        }
        })
        .catch(function(error) {
          console.log(error);
        });
}
async function getCityCodeFrom() {
    var citynewurl= 'https://api.tequila.kiwi.com/locations/query' + '?term='+ from.val()+'&locale=en-US&location_types=city&limit=10&active_only=true'      
    console.log(citynewurl)
    await fetch(citynewurl, {
        method: "GET",
        withCredentials: true,
        headers: {
          "apikey": apikey,
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(function(data){
           fromCity= data.locations[0].code
           console.log(fromCity)
           getCityCodeTo()
        })
        .catch(function(error) {
          console.log(error);
        });
       
}
async function getCityCodeTo() {
    var toCityurl = 'https://api.tequila.kiwi.com/locations/query' + '?term='+ to.val()+'&locale=en-US&location_types=city&limit=10&active_only=true'      

    console.log(toCityurl)
    await fetch(toCityurl, {
        method: "GET",
        withCredentials: true,
        headers: {
          "apikey": apikey,
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(function(data){
           toCity= data.locations[0].code
           console.log(toCity)
           getFlightUrl(fromCity, toCity)
        })
        .catch(function(error) {
          console.log(error);
        });
       
}

$(document).ready(function(){
    submitBtn.on('click',function(event){
        event.preventDefault();
        returnMon(uptodate);
        getCityCodeFrom();
        
         // Submit the form
    });
});


// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false;}
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//           /*check if the item starts with the same letters as the text field value:*/
//           if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//             /*create a DIV element for each matching element:*/
//             b = document.createElement("DIV");
//             /*make the matching letters bold:*/
//             b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//             b.innerHTML += arr[i].substr(val.length);
//             /*insert a input field that will hold the current array item's value:*/
//             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//             /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function(e) {
//                 /*insert the value for the autocomplete text field:*/
//                 inp.value = this.getElementsByTagName("input")[0].value;
//                 /*close the list of autocompleted values,
//                 (or any other open lists of autocompleted values:*/
//                 closeAllLists();
//             });
//             a.appendChild(b);
//           }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function(e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//           /*If the arrow DOWN key is pressed,
//           increase the currentFocus variable:*/
//           currentFocus++;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 38) { //up
//           /*If the arrow UP key is pressed,
//           decrease the currentFocus variable:*/
//           currentFocus--;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 13) {
//           /*If the ENTER key is pressed, prevent the form from being submitted,*/
//           e.preventDefault();
//           if (currentFocus > -1) {
//             /*and simulate a click on the "active" item:*/
//             if (x) x[currentFocus].click();
//           }
//         }
//     });
//     function addActive(x) {
//       /*a function to classify an item as "active":*/
//       if (!x) return false;
//       /*start by removing the "active" class on all items:*/
//       removeActive(x);
//       if (currentFocus >= x.length) currentFocus = 0;
//       if (currentFocus < 0) currentFocus = (x.length - 1);
//       /*add class "autocomplete-active":*/
//       x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//       /*a function to remove the "active" class from all autocomplete items:*/
//       for (var i = 0; i < x.length; i++) {
//         x[i].classList.remove("autocomplete-active");
//       }
//     }
//     function closeAllLists(elmnt) {
//       /*close all autocomplete lists in the document,
//       except the one passed as an argument:*/
//       var x = document.getElementsByClassName("autocomplete-items");
//       for (var i = 0; i < x.length; i++) {
//         if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
//   /*execute a function when someone clicks in the document:*/
//   document.addEventListener("click", function (e) {
//       closeAllLists(e.target);
//   });
//   };
//   autocomplete(document.getElementById("fromInput"), countries);


// need from input to switch to code from location api
// then do same for return city

// set data as variables for second page

// print results on cards
