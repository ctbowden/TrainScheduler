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
var rate = 0;

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
  trainRate = parseInt(trainRate);

  // Log the above variables
  console.log("Name: ", trainName);
  console.log("Destination: ", trainDest);
  console.log("Departure: ", trainTime);
  console.log("Frequency: ", trainRate);

  //Calculating Minutes Away
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log("Time Converted: " + firstTimeConverted);

  var diffTime = moment.duration(moment().diff(moment(trainTime, "HH:mm")), "milliseconds").asMinutes();
  console.log("Difference in Time" + diffTime);

  var timeRemaining = trainRate - (Math.floor(diffTime) % trainRate);
  console.log(timeRemaining);

  var nextTrain = diffTime > 0 ? moment().add(timeRemaining, 'minutes' ) : moment(trainTime, "HH:mm") ;
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  
  var minTilTrain = Math.ceil(moment.duration(moment(nextTrain).diff(moment()), 'milliseconds').asMinutes());
  console.log("MINUTES TILL TRAIN: " + minTilTrain);

  nextTrain = moment(nextTrain).format("HH:mm");

  //Write Data From Database to Table
  var newTrainTableRow = "";
  $("#traintimes > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainRate + "</td><td>" + nextTrain + "</td><td>" + minTilTrain + "</td></tr>");
  
});