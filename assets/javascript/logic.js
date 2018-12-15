// Initialize Firebase
var config = {
  apiKey: "AIzaSyCTufWh0pYGkOlm6ImzwBg38wM4DdUTixo",
  authDomain: "train-scheduler-55a7e.firebaseapp.com",
  databaseURL: "https://train-scheduler-55a7e.firebaseio.com",
  storageBucket: "train-scheduler-55a7e.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format("LLLL");
console.log(currentTime);

//Displaying current local time
var myVar = setInterval(myTimer, 1000);
function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  $("#current-time").text("Local Time: " + t);
}

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrainTime = $("#time-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();

  var trainTable = {
    trainname: trainName,
    destination: destination,
    firsttraintime: firstTrainTime,
    frequency: frequency
  };

  database.ref().push(trainTable);

  console.log(trainTable.trainname);
  console.log(trainTable.destination);
  console.log(trainTable.firsttraintime);
  console.log(trainTable.frequency);

  alert("New Train Added");

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  var tName = childSnapshot.val().trainname;
  var tDestination = childSnapshot.val().destination;
  var tTime = childSnapshot.val().firsttraintime;
  var tFrequency = childSnapshot.val().frequency;

  console.log(tName);
  console.log(tDestination);
  console.log(tTime);
  console.log(tFrequency);

  var tMath = moment(tTime, "HH:mm");
  var tDifference = moment().diff(moment(tMath, "minutes"), "minutes");
  console.log(tMath);
  console.log(tDifference);

  var mFrequency = childSnapshot.val().frequency;

  var minutesPassed = tDifference % mFrequency;
  console.log(minutesPassed);

  /*
  var minutesLeft = tFrequency - minutesPassed;
  console.log(minutesLeft);
  */

  if (minutesPassed < 0) {
    var minutesLeft = Math.abs(minutesPassed - 1);
  } else {
    var minutesLeft = tFrequency - minutesPassed;
  }
  console.log(minutesLeft);

  var nextArrival = moment(currentTime)
    .add(minutesLeft, "minutes")
    .format("hh:mm A");
  
  $("#train-table > tbody").append(
    "<tr><td>" +
      tName +
      "</td><td>" +
      tDestination +
      "</td><td>" +
      tFrequency +
      "</td><td>" +
      nextArrival +
      "</td><td>" +
      minutesLeft +
      "</td></tr>"
  );

  

  setTimeout(function() {
    $("#train-table").slideUp(2000);
    location.reload();
  }, 60000);
});
