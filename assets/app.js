var config = {
	apiKey: "AIzaSyC8qTXPN7ZPKgT-CuURP20Dv8BDBSwl6ws",
	authDomain: "robo-launch-3eae7.firebaseapp.com",
	databaseURL: "https://robo-launch-3eae7.firebaseio.com",
	projectId: "robo-launch-3eae7",
	storageBucket: "robo-launch-3eae7.appspot.com",
};

firebase.initializeApp(config);

var dataRef = firebase.database();

var friend = 0;
var work = 0;
var life = 0;
var love = 0;
var want = 0;
var you = 0;
var other = 0;
var friendCounter = friend;
var workCounter = work;
var lifeCounter = life;
var loveCounter = love;
var wantCounter = want;
var youCounter = you;
var otherCounter = other;

dataRef.ref().on("value", function (snapshot) {
	// Print the local data to the console.
	console.log(snapshot.val());
	// Change the HTML to reflect the local value in firebase.
	if (snapshot.child("friend").exists()) {
		friendCounter = snapshot.val().friend;
	}
	$("#friendCounter").text(friendCounter);
	if (snapshot.child("work").exists()) {
		workCounter = snapshot.val().work;
	}
	$("#workCounter").text(workCounter);
	if (snapshot.child("life").exists()) {
		lifeCounter = snapshot.val().life;
	}
	$("#lifeCounter").text(lifeCounter);
	if (snapshot.child("love").exists()) {
		loveCounter = snapshot.val().love;
	}
	$("#loveCounter").text(loveCounter);
	if (snapshot.child("want").exists()) {
		wantCounter = snapshot.val().want;
	}
	$("#wantCounter").text(wantCounter);
	if (snapshot.child("you").exists()) {
		youCounter = snapshot.val().you;
	}
	$("#youCounter").text(youCounter);
	if (snapshot.child("other").exists()) {
		otherCounter = snapshot.val().other;
	}
	$("#otherCounter").text(otherCounter);

	$("#submit").removeAttr("disabled");
});

$("#submit").on("click", function (event) {
	var name = $("#nameInput").val();
	if (name) {
		event.preventDefault();
		$("#user-name").text(name);
		var random = Math.floor(Math.random() * 30) + 1;
		var queryURL =
			"https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=1&offset=" +
			random +
			"&rating=g";
		// console.log(queryURL);

		// GIPHY API CALL
		$.ajax({
			url: queryURL,
			method: "GET",
		}).then(function (response) {
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
		$("#topic-output").text(topics);
		// console.log(adviceQueryURL);

		// ADVICE SLIP API CALL
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

		if (topics === "Friend") {
			friendCounter = friendCounter + 1;
			console.log(friendCounter);
		} else if (topics === "Work") {
			workCounter = workCounter + 1;
			console.log(workCounter);
		} else if (topics === "Life") {
			lifeCounter = lifeCounter + 1;
			console.log(lifeCounter);
		} else if (topics === "Love") {
			loveCounter = loveCounter + 1;
			console.log(loveCounter);
		} else if (topics === "Want") {
			wantCounter = wantCounter + 1;
			console.log(wantCounter);
		} else if (topics === "You") {
			youCounter = youCounter + 1;
			console.log(youCounter);
		} else if (topics === "Other") {
			otherCounter = otherCounter + 1;
			console.log(otherCounter);
		}

		dataRef.ref().set({
			friend: friendCounter,
			work: workCounter,
			life: lifeCounter,
			love: loveCounter,
			want: wantCounter,
			you: youCounter,
			other: otherCounter,
		});
	} else {
		alert("Please enter 'Your Name'");
	}
});
