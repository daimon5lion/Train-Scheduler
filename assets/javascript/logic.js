// Initialize Firebase
var config = {
  apiKey: "AIzaSyCTufWh0pYGkOlm6ImzwBg38wM4DdUTixo",
  authDomain: "train-scheduler-55a7e.firebaseapp.com",
  databaseURL: "https://train-scheduler-55a7e.firebaseio.com",
  storageBucket: "train-scheduler-55a7e.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();

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

  $("##name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});
