function makeRequest(apiEndpoint, callback) {
    "use strict";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var returnedData = JSON.parse(this.responseText);
            callback.apply(this, [returnedData]);
            console.log(returnData);
        }
        else if (this.readyState === 4 && this.status !== 200) {
            console.log("Well... this is awkward - " + this.status + " " + this.statusText);
        }
    };
    xhttp.open("GET", apiEndpoint);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa("michael@rapid.digital:password"));
    xhttp.send();
}

function returnData(apiData) {
    console.log(apiData);
}

makeRequest("/tickets.json?page=1&per_page=25", returnData);
// console.log(test);