$(".stuff").on("click", function (event) {
	event.preventDefault();
	var queryURL =
		"https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=5&rating=g";
	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		var results = response.data;
		console.log(results);
		console.log("hi");
	});
});

$("#submit").on("click", function (event) {
	event.preventDefault();
	var adviceQueryURL = "https://api.adviceslip.com/advice";
	console.log(adviceQueryURL);

	$.ajax({
		url: adviceQueryURL,
		method: "GET",
	}).then(function (response) {
    console.log(response);
    // $("#advice-output").text(JSON.stringify(response));
    $("#advice-output").append(response["slip"].advice);
	});
});
