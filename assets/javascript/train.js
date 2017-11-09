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

  //Creating an object to be submitted to the Firebase Database
  var newTrain = {
    name: name,
    dest: dest,
    time: time,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Pushes the newTrain Data to Firebase
  database.ref().push(newTrain);

  //Clear the Form
  $("#input-name").val("");
  $("#input-dest").val("");
  $("#input-time").val("");
  $("#input-rate").val("");

});

// Write Table Data to HTML when page loads or when Firebase is updated
database.ref().on("child_added", function(childSnapShot, prevChildKey) {
  
  console.log(childSnapShot.val());
  //Retrieve Values from Database set to variables
  var trainName = childSnapShot.val().name;
  var trainDest = childSnapShot.val().dest;
  var trainTime = childSnapShot.val().time;
  var trainRate = childSnapShot.val().rate;


  // Time Conversions to Minutes
  var convertedTrainTime = moment(trainTime, "HH:mm").minutes();
  console.log("Converted Train Time: " + convertedTrainTime);

  // System Time
  var now = moment().minutes();
  console.log("Now:" + now);

  // Next Arrival
  var then = trainTime;
  console.log("Then:" +then);

  var difference = moment().diff(moment(then, "mm"), "minutes");
  console.log("Difference"  + difference);
  var trainArrival = "";
  // console.log(trainTimeMin);
  // console.log(trainArrival);


  // Minutes Away
  var trainMinAway = "";

  //Write Data From Database to Table
  var newTrainTableRow = "";
  $("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" + trainArrival + "</td><td>" + trainMinAway + "</td></tr>");
  
});