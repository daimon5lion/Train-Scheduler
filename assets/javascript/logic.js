// Initialize Firebase
var config = {
  apiKey: "AIzaSyCTufWh0pYGkOlm6ImzwBg38wM4DdUTixo",
  authDomain: "train-scheduler-55a7e.firebaseapp.com",
  databaseURL: "https://train-scheduler-55a7e.firebaseio.com",
  storageBucket: "train-scheduler-55a7e.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format();
console.log(currentTime);

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrainTime = moment(
    $("#time-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
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
  var tDifference = moment().diff(moment(tMath), "minutes");
  console.log(tDifference);

  var mFrequency = childSnapshot.val().frequency;

  var minutesLeft = Math.abs(tDifference % mFrequency);
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
});
