//Javascript for Train Schedule 
// UNC Coding BootCamp Week 7
// Charles Bowden


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXFIGXFboh8Jvto5SMkXhTAcrhDkp5PL4",
  authDomain: "trainscheduler-933df.firebaseapp.com",
  databaseURL: "https://trainscheduler-933df.firebaseio.com",
  projectId: "trainscheduler-933df",
  storageBucket: "",
  messagingSenderId: "882042511741"
};
  
firebase.initializeApp(config);

// Firebase Database Variable
var database = firebase.database();

// Variables to be stored in database
var name = "";
var dest = "";
var time = "";
var rate = "";

// Submit On Click

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Saving Form inputs to our variables
  name = $("#input-name").val().trim();
  dest = $("#input-dest").val().trim();
  time = $("#input-time").val().trim();
  rate = $("#input-rate").val().trim();

  //Submitting Data to Database
  database.ref().push({
    name: name,
    dest: dest,
    time: time,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Write Table Data to HTML when page loads or when Firebase is updated
database.ref().on("child_added", function(childSnapshot, prevChildKey){
  
  console.log(childSnapShot.val());
  //Retrieve Values from Database set to variables
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainRate = childSnapshot.val().rate;

  // Convert Starting Time to UTC Time in minutes
  var trainTimeUTC = moment.utc(trainTime, "minutes");

  // Variable to Hold Current Time and set it equal to minutes
  var currentTime = moment.utc();

  // Next Arrival
  var trainArrival = "";
  trainArrival = trainTimeUTC.diff(currentTime, "minutes");

  // Minutes Away


  //Write Data From Database to Table
  var newTrainTableRow = "";
  $("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" + trainArrival + "</td><td>" + trainMinAway + "</td></tr>");
  
});