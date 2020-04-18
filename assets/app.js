// var config = {
//   apiKey: "AIzaSyC8qTXPN7ZPKgT-CuURP20Dv8BDBSwl6ws",
//   authDomain: "robo-launch-3eae7.firebaseapp.com",
//   databaseURL: "https://robo-launch-3eae7.firebaseio.com",
//   projectId: "robo-launch-3eae7",
//   storageBucket: "robo-launch-3eae7.appspot.com"
// };
var config = {
  apiKey: "AIzaSyDSXV5ayqQFNOatW0qGmlWWgsUH32P_5b4",
  authDomain: "wisconsin-lc.firebaseapp.com",
  databaseURL: "https://wisconsin-lc.firebaseio.com",
  projectId: "wisconsin-lc",
  storageBucket: "wisconsin-lc.appspot.com"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

var friendship = 0;
var food = 0;
var life = 0;
var love = 0;
var other = 0;
var friendshipCounter = friendship;
var foodCounter = food;
var lifeCounter = life;
var loveCounter = love;
var otherCounter = other;

$("#submit").on("click", function(event) {
  event.preventDefault();
  var random = Math.floor(Math.random() * 30) + 1;
  var queryURL =
    "https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=1&offset=" +
    random +
    "&rating=g";
  // console.log(queryURL);

  // GIPHY API CALL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    // console.log(results);

    var imageRes = results[0].images.original.url;
    // console.log(imageRes);

    var steveImage = $("#steve-image");
    steveImage.css("background-image", "url(" + imageRes + ")");
    steveImage.css("background-repeat", "no-repeat");
    steveImage.css("background-position", "center");
    steveImage.css("background-size", "contain");
  });

  var topics = $("#topics").val();
  var adviceQueryURL = "https://api.adviceslip.com/advice/search/" + topics;
  console.log(topics);
  // console.log(adviceQueryURL);

  // ADVICE SLIP API CALL
  $.ajax({
    url: adviceQueryURL,
    method: "GET"
  }).then(function(data) {
    var obj = JSON.parse(data);
    console.log(obj);
    var randomize = Math.floor(Math.random() * obj.slips.length);
    $("#advice-output").text(obj.slips[randomize].advice);
    console.log(obj.slips[randomize].advice);
  });

  dataRef.ref().on("value", function(snapshot) {
    // Print the local data to the console.
    console.log(snapshot.val());
    // Change the HTML to reflect the local value in firebase.
    friendshipCounter = snapshot.val().friendship;
    foodCounter = snapshot.val().food;
    lifeCounter = snapshot.val().life;
    loveCounter = snapshot.val().love;
    otherCounter = snapshot.val().other;

    $("#friendshipCounter").text(friendshipCounter);
    $("#foodCounter").text(foodCounter);
    $("#lifeCounter").text(lifeCounter);
    $("#loveCounter").text(loveCounter);
    $("#otherCounter").text(otherCounter);
  });

  if (topics === "Friendship") {
    friendshipCounter = friendshipCounter + 1;
    console.log(friendshipCounter);
  } else if (topics === "Food") {
    foodCounter = foodCounter + 1;
    console.log(foodCounter);
  } else if (topics === "Life") {
    lifeCounter = lifeCounter + 1;
    console.log(lifeCounter);
  } else if (topics === "Love") {
    loveCounter = loveCounter + 1;
    console.log(loveCounter);
  } else if (topics === "Other") {
    otherCounter = otherCounter + 1;
    console.log(otherCounter);
  }

  dataRef.ref().set({
    friendship: friendshipCounter,
    food: foodCounter,
    life: lifeCounter,
    love: loveCounter,
    other: otherCounter
  });

  // Change the HTML to reflect the local value in firebase.
  // $("#click-value").text(clickCounter);
});
