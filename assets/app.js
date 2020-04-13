$('.stuff').on('click', function (event) {
    event.preventDefault();
    var queryURL = 'https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=1&rating=g'
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
        console.log(results)
       
        var imageRes = results[0].images.fixed_width_small_still.url
        console.log(imageRes)

        // var res = $("<img>")
        // res.attr("src", imageRes)
        // res.attr("height", "150")
        // res.attr("width", "150")
        // $("#steve-image").append(res)

        var steveImage = $("#steve-image")
        steveImage.css("background-image", "url("+imageRes+")")
        steveImage.css("background-repeat", "no-repeat")
        steveImage.css("background-position", "center")
        steveImage.css("background-size", "contain")
      });
})
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		var results = response.data;
		console.log(results);
		console.log("hi");
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
	});
});
