// Get references to elements
var $tbody = document.querySelector("tbody");
var $panel = document.querySelector("div.panel");
var $input = document.querySelector("#input");
var $searchBtn = document.querySelector("#search");
// Set filteredSightings to dataSet initially
var filteredSightings = dataSet;

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable renders the filteredSightings to the tbody
function renderTable() {

    $tbody.innerHTML = "";
    for (var i = 0; i < filteredSightings.length; i++) {
        // Get get the current sighting object and its fields
        var sighting = filteredSightings[i];
        var fields = Object.keys(sighting);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the sighting object, create a new cell at set its inner text to be the current 
            // value at the current sighting's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
            }
  
    };
};

// Fill $panel text based on user dropdown selection, will use this text to drive filtering
for (var x = 1; x < 6; x++){
    jQuery('#action-'+x).click(function(selectColumnName){
        var columnName = $(this).text()
        $panel.innerText = columnName
        selectColumnName.preventDefault();
    })
};

//Allow option to clear clear column selection
jQuery('#action-6').click(function(selectColumnName){
    $panel.innerText = "" ;
    $input.value = "Look for" ;
    selectColumnName.preventDefault();
});

    function handleSearchButtonClick() {
        //Format the user's search by removing leading and trailing whitespace, lowercase the string
        var filterInput = $input.value.trim().toLowerCase();
      
        // Set filteredSightings to an array of all addresses whose column value matches the filter
        filteredSightings = dataSet.filter(function(sighting) {
          var sightingsDate = sighting.datetime.toLowerCase();
          var sightingsCity = sighting.city.toLowerCase();
          var sightingsState = sighting.state.toLowerCase();
          var sightingsCountry = sighting.country.toLowerCase();
          var sightingsShape = sighting.shape.toLowerCase();
          // If true, add the address to the filteredSightings, otherwise don't add it to filteredSightings
          if ($panel.innerText == "Date"){
              return sightingsDate === filterInput;
          }
          else if ($panel.innerText == "City"){
              return sightingsCity === filterInput;
          }
          else if ($panel.innerText == "State"){
              return sightingsState === filterInput;
          }
          else if ($panel.innerText == "Country"){
              return sightingsCountry === filterInput;
          }
          else if ($panel.innerText == "Shape"){
              return sightingsShape === filterInput;
          }    
          //Deal with no column selection or "CLear Selection"
          else {return dataSet}
        });
      
        renderTable();

        //Redraw DataTable based on new values in filteredSigntings
        datatable.clear();
        datatable.rows.add(filteredSightings);
        datatable.columns.adjust().draw();       
    }
      
 // Render the table for the first time on page load
renderTable();

// Set DataTable parameters so it behaves properly on search
var datatable = $("#ufoTable").DataTable({
    "searching" : false,
    "lengthMenu": [ [50, 25, 10, -1], [50, 25, 10, "All"] ],
    "data": filteredSightings,
    "columns": [
        { "data": "datetime" },
        { "data": "city" },
        { "data": "state" },
        { "data": "country" },
        { "data": "shape" },
        { "data": "durationMinutes" },
        { "data": "comments" }
    ]
});

//Load DataTable formatting and controls
$(document).ready(function() {
    datatable
} );



