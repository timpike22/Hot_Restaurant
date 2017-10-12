// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var characters = [
  {
    routeName: "bob",
    name: "Bob",
    phoneNumber: "480 999 9999",
    email: "bob@gmail.com",
    uniqueId: "sloppybob"
  }
  
];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Home page
app.get("/", function(req, res)
{
	res.sendFile(path.join(__dirname, "home.html"));
});

//Open the tables page
app.get("/tables", function(req, res)
{
	res.sendFile(path.join(__dirname, "tables.html"));
});

//Open the reserve
app.get("/reserve", function(req, res)
{
	res.sendFile(path.join(__dirname, "reserve.html"));

});

/*
app.get("/waitlist", function(req, res)
{
	res.sendFile(path.join(__dirname, "waitlist.html"));
});
*/
// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) 
{
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function()
{
  console.log("App listening on PORT " + PORT);
});


