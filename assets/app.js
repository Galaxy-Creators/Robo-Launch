$("#submit").on("click", function (event) {
	event.preventDefault();
	var random = Math.floor(Math.random() * 30) + 1;
	var queryURL =
		"https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=1&offset=" +
		random +
		"&rating=g";
	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		var results = response.data;
		console.log(results);

		var imageRes = results[0].images.original.url;
		console.log(imageRes);

		// var res = $("<img>")
		// res.attr("src", imageRes)
		// res.attr("height", "150")
		// res.attr("width", "150")
		// $("#steve-image").append(res)

		var steveImage = $("#steve-image");
		steveImage.css("background-image", "url(" + imageRes + ")");
		steveImage.css("background-repeat", "no-repeat");
		steveImage.css("background-position", "center");
		steveImage.css("background-size", "contain");
	});
});
$("#submit").on("click", function (event) {
	event.preventDefault();
	var topics = $("#topics").val();
	var adviceQueryURL = "https://api.adviceslip.com/advice/search/" + topics;
	console.log(topics);
	console.log(adviceQueryURL);

	$.ajax({
		url: adviceQueryURL,
		method: "GET",
	}).then(function (data) {
		var obj = JSON.parse(data);
		console.log(obj);
		var randomize = Math.floor(Math.random() * obj.slips.length);
		$("#advice-output").text(obj.slips[randomize].advice);
		console.log(obj.slips[randomize].advice);
	});
});


var config = {
  apiKey: "AIzaSyCrN5q0jT45Px5plI5mMoRlTyeTFR2Aoow",
  authDomain: "clickcountdown-a6a78.firebaseapp.com",
  databaseURL: "https://clickcountdown-a6a78.firebaseio.com",
  projectId: "clickcountdown-a6a78",
  storageBucket: "clickcountdown-a6a78.appspot.com",
};

firebase.initializeApp(config);

var dataRef = firebase.database();

var friendship = "";
var food = "";
var life = "";
var love = "";
var other = "";

$("#submit").on("click", function(event) {
  event.preventDefault();

  friendship = $("#frienship").val().trim();
  food = $("food").val().trim();
  life = $("#life").val().trim();
  love = $("#love").val().trim();
  other = $("#other").val().trim();
  
  dataRef.ref().push({

    friendship: friendship,
    food: food,
    life: life,
    love: love,
    other: other,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

});
});

dataRef.ref().on("child_added", function(childSnapshot) {

console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().friendship);
      console.log(childSnapshot.val().food);
      console.log(childSnapshot.val().life);
      console.log(childSnapshot.val().love);
      console.log(childSnapshot.val().other);

    }); 