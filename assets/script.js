var requestUrl =
  "https://api.tequila.kiwi.com/v2/search?fly_from=LGA&fly_to=MIA&dateFrom=01/04/2023&dateTo=02/04/2023";
var apikey = "9dU5c1zZxOO4AyOA58aEW70owtRgoHgC";
fetch(requestUrl, {
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
  })
  .catch(function (error) {
    console.log(error);
  });

