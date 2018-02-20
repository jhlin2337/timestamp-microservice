// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  // Set the null timestamp for when the user doesn't enter a correct date
  let timestamp = {
  	unix: null, 
  	utc:"Invalid Date"
  };

  // Create a new date and set the timestamp to the date if the user does
  // not enter a date
  if (req.params.date_string === undefined) {
  	const currDate = new Date();
  	timestamp = {
  	  unix: currDate.getTime(),
  	  utc: currDate.toUTCString()
  	}
  } 

  // If the date the user inputted is correct, change the timestamp to match the date
  const inputDateUTC = new Date(req.params.date_string);
  if (inputDateUTC > 0) {
  	timestamp = {
  	  unix: inputDateUTC.getTime(),
  	  utc: inputDateUTC.toUTCString()
  	}
  }

  const inputDateUnix = new Date(Number(req.params.date_string));
  if (inputDateUnix > 0) {
  	timestamp = {
  	  unix: inputDateUnix.getTime(),
  	  utc: inputDateUnix.toUTCString()
  	}
  }

  res.json(timestamp);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});