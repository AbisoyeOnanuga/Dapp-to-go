'use strict';

/* navbar toggle */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelector("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay]

const navToggleEvent = function (elem) {
    for (let i= 0; i < elem.length; i++) {
        elem[i].addEventListener("click", function() {
            navbar.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);


/* header sticky */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

    if(window.scrollY >= 200) {
        header.classList.add("active");
    }   else {
        header.classList.remove("active");
    }

});

/* flight search */

// Get the form element
var form = document.getElementById("flight-search-form");

// Add a submit event listener to the form
form.addEventListener("submit", function(event) {

  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the input fields
  var tripType = document.querySelector("input[name=trip-type]:checked").value;
  var origin = document.getElementById("origin-input").value;
  var destination = document.getElementById("destination-input").value;
  var outboundDate = document.getElementById("outbound-date-input").value;
  var returnDate = document.getElementById("return-date-input").value;
  var flightClass = document.getElementById("flight-class-select").value;
  var adults = document.getElementById("adults-input").value;
  var children = document.getElementById("children-input").value;

  // Validate the input values and show an alert if any of them is invalid
  if (!origin || !destination || !outboundDate || (tripType === "round-trip" && !returnDate) || !flightClass || !adults) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Create an object that stores the flight search parameters
  var flightSearchParams = {
    tripType: tripType,
    origin: origin,
    destination: destination,
    outboundDate: outboundDate,
    returnDate: returnDate,
    flightClass: flightClass,
    adults: adults,
    children: children
  };

  // Call a function that fetches and displays the flight results based on the flight search parameters
  fetchAndDisplayFlightResults(flightSearchParams);
});

// Define a function that fetches and displays the flight results based on the flight search parameters
function fetchAndDisplayFlightResults(flightSearchParams) {

  // Create a variable that stores the URL of the data source (such as a JSON file or a web service) that provides the flight results
  var dataSourceURL = "https://example.com/api/flights";

  // Create a variable that stores the query string parameters based on the flight search parameters
  var queryStringParams = "?tripType=" + flightSearchParams.tripType +
                          "&origin=" + flightSearchParams.origin +
                          "&destination=" + flightSearchParams.destination +
                          "&outboundDate=" + flightSearchParams.outboundDate +
                          "&returnDate=" + flightSearchParams.returnDate +
                          "&flightClass=" + flightSearchParams.flightClass +
                          "&adults=" + flightSearchParams.adults +
                          "&children=" + flightSearchParams.children;

  // Append the query string parameters to the data source URL
  var fullURL = dataSourceURL + queryStringParams;

  // Use the fetch API to make a GET request to the data source URL and get a promise that resolves to a response object
  fetch(fullURL)
    .then(function(response) {

      // Check if the response status is OK (200)
      if (response.ok) {

        // Return a promise that resolves to a JSON object that contains the flight results
        return response.json();
      } else {

        // Throw an error with the response status text
        throw new Error(response.statusText);
      }
    })
    .then(function(flightResults) {

      // Call a function that creates and appends the result cards with buttons for selecting the flight option based on the flight results
      createAndAppendResultCards(flightResults);
    })
    .catch(function(error) {

      // Log the error to the console and show an alert with the error message
      console.error(error);
      alert("Something went wrong. Please try again later.");
    });
}

// Define a function that creates and appends the result cards with buttons for selecting the flight option based on the flight results
function createAndAppendResultCards(flightResults) {

  // Get the element that will contain the result cards
  var resultContainer = document.getElementById("result-container");

  // Clear any existing content in the result container
  resultContainer.innerHTML = "";

   // Loop through each flight result in the flight results array 
   for (var i = 0; i < flightResults.length; i++) {

    // Get the current flight result object
    var flightResult = flightResults[i];

    // Create a div element that will contain the result card
    var resultCard = document.createElement("div");
    resultCard.className = "result-card";

    // Create a p element that will display the flight details
    var flightDetails = document.createElement("p");
    flightDetails.className = "flight-details";
    flightDetails.textContent = flightResult.airline + " | " +
                                flightResult.departureTime + " - " +
                                flightResult.arrivalTime + " | " +
                                flightResult.duration + " | " +
                                flightResult.stops + " stop(s)";

    // Create a p element that will display the flight price
    var flightPrice = document.createElement("p");
    flightPrice.className = "flight-price";
    flightPrice.textContent = "$" + flightResult.price;

    // Create a button element that will allow the user to select the flight option
    var selectButton = document.createElement("button");
    selectButton.className = "select-button";
    selectButton.textContent = "Select";

    // Add a click event listener to the select button
    selectButton.addEventListener("click", function() {

    // Store the selected flight result object in the local storage
    localStorage.setItem("selectedFlight", JSON.stringify(flightResult));

    // Redirect the user to a new page where they can choose more fare options
    window.location.href = "fare-options.html";
    });

    // Append the flight details, flight price, and select button to the result card
    resultCard.appendChild(flightDetails);
    resultCard.appendChild(flightPrice);
    resultCard.appendChild(selectButton);

    // Append the result card to the result container
    resultContainer.appendChild(resultCard);

    } }

/* Flight search */ 

// Get a reference to the input element where the user can type the airport name or code
var inputEl = document.getElementById("origin");

// Create a div element where the autocomplete suggestions will be displayed
var suggestionEl = document.getElementById("suggestionDiv");

// Define a function that will make an API request to AeroDataBox and get the matching airports
function getAirports(query) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set the request method, URL, and headers
  xhr.open(
    "GET",
    "https://aerodatabox.p.rapidapi.com/airports/search/name/" +
      query +
      "?limit=10&withFlightInfoOnly=0"
  );
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "aerodatabox.p.rapidapi.com");

  // Define what to do when the request is successful
  xhr.onload = function () {
    // Parse the response as JSON
    var data = JSON.parse(this.responseText);

    // Clear the previous suggestions
    suggestionEl.innerHTML = "";

    // Loop through the data array and create a list of suggestions
    for (var i = 0; i < data.length; i++) {
      // Create a list item element for each suggestion
      var li = document.createElement("li");

      // Set the text content of the list item as the airport name and code
      li.textContent = data[i].name + " (" + data[i].icao + ")";

      // Append the list item to the suggestion div
      suggestionEl.appendChild(li);

      // Add an event listener to the list item that will fill the input value with the selected suggestion
      li.addEventListener("click", function () {
        inputEl.value = this.textContent;
        suggestionEl.innerHTML = "";
      });
    }
  };

  // Send the request
  xhr.send();
}

// Add an event listener to the input element that will trigger the getAirports function when the user types something
inputEl.addEventListener("input", function () {
  // Get the input value
  var query = inputEl.value;

  // Check if the input value is not empty and has at least three characters
  if (query && query.length >= 3) {
    // Call the getAirports function with the input value as the query parameter
    getAirports(query);
  } else {
    // Clear the suggestions if the input value is empty or too short
    suggestionEl.innerHTML = "";
  }
});
