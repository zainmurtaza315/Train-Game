$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyCtWBg1K72RDA0a-biqbVMMw1gsIHY-q6k",
    authDomain: "train-schedule-c860c.firebaseapp.com",
    databaseURL: "https://train-schedule-c860c.firebaseio.com",
    projectId: "train-schedule-c860c",
    storageBucket: "train-schedule-c860c.appspot.com",
    messagingSenderId: "278343664732"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var TrainName = "";
  var Destination = "";
  var FirstTrain = "";
  var Frequency = 0;

  $("#SubBtn").on("click", function(event) {
    event.preventDefault();
    TrainName = $("#train-name")
      .val()
      .trim();

    Destination = $("#Destination")
      .val()
      .trim();

    FirstTrain = $("#First-Train")
      .val()
      .trim();

    Frequency = $("#Frequency")
      .val()
      .trim();

    database.ref("/train-table").push({
      TrainName: TrainName,
      Destination: Destination,
      FirstTrain: FirstTrain,
      Frequency: Frequency
    });
  });

  database.ref("/train-table").on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var currentDate = moment();
    console.log("curr: " + currentDate);

    var trElem = $("<tr>");
    var tdName = $("<td>");
    var tdDestination = $("<td>");
    var tdFirstTrain = $("<td>");
    var tdFrequency = $("<td>");
    var tdNextArrival = $("<td>");
    var tdMinutesAway = $("<td>");

    tdName.text(sv.TrainName);
    tdDestination.text(sv.Destination);
    tdFirstTrain.text(sv.FirstTrain);
    console.log("start: " + sv.FirstTrain);

    var tdMinutesAway = Math.floor(
      moment.duration(currentDate.diff(sv.FirstTrain)).asMonths()
    );
    tdMinutesAway.text(tdMinutesAway);

    tdNextArrival.text(sv.tdNextArrival);

    var totalminutes = tdMinutesAway * sv.tdNextArrival;
    tdMinutesAway.text(tdMinutesAway);

    trElem.append(
      tdName,
      tdDestination,
      tdFirstTrain,
      tdFrequency,
      tdNextArrival,
      tdMinutesAway
    );
    $("#Train-Schedule").append(trElem);
  });
});
