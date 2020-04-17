var config = {
    apiKey: "AIzaSyC8qTXPN7ZPKgT-CuURP20Dv8BDBSwl6ws",
    authDomain: "robo-launch-3eae7.firebaseapp.com",
    databaseURL: "https://robo-launch-3eae7.firebaseio.com",
    projectId: "robo-launch-3eae7",
    storageBucket: "robo-launch-3eae7.appspot.com"
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
var reset = false;




$("#submit").on("click", function (event) {
	event.preventDefault();
	reset
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

		var steveImage = $("#steve-image");
		steveImage.css("background-image", "url(" + imageRes + ")");
		steveImage.css("background-repeat", "no-repeat");
		steveImage.css("background-position", "center");
		steveImage.css("background-size", "contain");
	});

	
	var topics = $("#topics").val();
	var adviceQueryURL = "https://api.adviceslip.com/advice/search/" + topics;
	// console.log(topics);
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
	dataRef.ref().on("value", function(snapshot) {

		// Print the local data to the console.
		console.log(snapshot.val());
		// Change the HTML to reflect the local value in firebase.
		friendshipCounter = snapshot.val().friendship;
		// Log the value of the clickCounter
		console.log(friendshipCounter);
	  });
	  
	if (topics === "Friendship") {
		friendshipCounter = friendshipCounter+1
		console.log(friendshipCounter)
	};

	
  dataRef.ref().set({
	
    friendship: friendshipCounter,
    food: food,
    life: life,
    love: love,
    other: other,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
});


  // Change the HTML to reflect the local value in firebase.
	// $("#click-value").text(clickCounter);
});

