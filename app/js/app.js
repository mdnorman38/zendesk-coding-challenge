/*jslint browser: true*/
/*global window document XMLHttpRequest btoa*/

var loadPagination = function (ticketNumber) {
    "use strict";

    //Emptying pagination div as this function is called multiple times.
    pagination.innerHTML = "";

    //Creating an array of page numbers. For example, for 5 pages the array would contain numbers from 0 to 4
    var pageNumbers = Array.apply(null, { length: Math.ceil(ticketNumber / 25) }).map(Number.call, Number);

    //Checking if the current page is 1 and disabling the back pagination button.
    pagination.innerHTML += ((currentPage === 1) ? "<li class='disabled'><a href='javascript:void(0)'><i class='material-icons'>chevron_left</i></a></li>"
        : "<li class='waves-effect' onclick='paginate(" + (currentPage - 1) + ")'><a href='javascript:void(0)'><i class='material-icons'>chevron_left</i></a></li>");

    //Loop that creates each number in the pagination container.
    pageNumbers.forEach(function (pNumber) {

        pagination.innerHTML += ((currentPage === (pNumber + 1)) ? "<li class='active' onclick='paginate(" + (pNumber + 1) + ")'><a href='javascript:void(0)'>" + (pNumber + 1) + "</a></li>"
            : "<li class='waves-effect' onclick='paginate(" + (pNumber + 1) + ")'><a href='javascript:void(0)'>" + (pNumber + 1) + "</a></li>");

    });

    //Checking if the current page is the last page and disabling the forward pagination button.
    pagination.innerHTML += ((currentPage === pageNumbers.length) ? "<li class='disabled'><a href='javascript:void(0)'><i class='material-icons'>chevron_right</i></a></li>"
        : "<li class='waves-effect' onclick='paginate(" + (currentPage + 1) + ")'><a href='javascript:void(0)'><i class='material-icons'>chevron_right</i></a></li>");

};

function displayData(apiData) {
    "use strict";

    //Checks if parameter is JSON object, this implies the AJAX request was successful.
    if (typeof (apiData) === 'object') {

        var resultsTable = document.getElementById("results");

        var ticketData = apiData.tickets;
        var ticketsReturned = apiData.count;

        resultsTable.innerHTML = "";

        //Each ticket creates a new row in the table.
        ticketData.forEach(function (ticket) {
            resultsTable.innerHTML += "<tr><td>"
                + ticket.id
                + "</td><td>" + ticket.subject
                + "</td><td>" + ticket.submitter_id
                + "</td><td>" + ticket.created_at
                + "</td><td>" + ticket.priority
                + "</td><td>" + ticket.status
                + "</td><td><a href='javascript:void(0)' id='details-button-" + ticket.id + "' onclick='showDetails(" + ticket.id + ")'>View Details</a>"
                + "</td><tr id='details-" + ticket.id + "' class='hide-details'>"
                + "<td colspan='7'><p><strong>Description:</strong> " + ticket.description + "</p>"
                + "</td></tr></tr>";
        });

        loadPagination(ticketsReturned);
    }
    else {
        //If the parameter is not a JSON object, then an error has occurred.
        var errors = document.getElementById("display-errors");
        errors.innerHTML = "";
        errors.innerHTML = "<h4>Well... this is awkward - " + apiData + "</h4>";
    }


}

//Function makes the API requests. Takes two parameters the API URL and a callback function.
function makeRequest(apiEndpoint, callback) {
    "use strict";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var returnedData = JSON.parse(this.responseText);
            //If successful, data is passed to the callback function.
            callback.apply(this, [returnedData]);
        }
        else if (this.readyState === 4 && this.status !== 200) {
            //If unsuccessful, data is also passed to the callback function.
            callback.apply(this, [this.status + " " + this.statusText]);
        }
    };
    xhttp.open("GET", apiEndpoint);
    //btoa function encodes credentials in Base64 format
    xhttp.setRequestHeader("Authorization", "Basic " + btoa("michael@rapid.digital:password"));
    xhttp.send();
}

function showDetails(rowNumber) {
    "use strict";

    //Toggles the hidden row which shows the ticket description.
    document.getElementById("details-" + rowNumber).classList.toggle("hide-details");
    var detailsButton = document.getElementById("details-button-" + rowNumber);

    detailsButton.innerHTML = ((detailsButton.innerHTML === "View Details") ? "Hide Details" : "View Details");
}

function paginate(pageNumber) {
    "use strict";

    //This function is triggered by the pagination buttons. Makes a new API request to fetch a new page.
    makeRequest("/tickets.json?page=" + pageNumber + "&per_page=25", displayData);
    currentPage = pageNumber;
}

function init() {
    "use strict";

    //Function is called by the HTML body onload. It initialises variables and makes API call for the first page.
    window.currentPage = 1;
    makeRequest("/tickets.json?page=1&per_page=25", displayData);
    window.pagination = document.getElementById("pagination-container");
}
