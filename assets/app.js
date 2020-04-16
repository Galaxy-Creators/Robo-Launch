$('#submit').on('click', function (event) {
    event.preventDefault();
    var random = Math.floor(Math.random() * 30) + 1  
    var queryURL = 'https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=1&offset='+random+'&rating=g'
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
        console.log(results)
       
        var imageRes = results[0].images.original.url
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
$("#submit").on("click", function (event) {
	event.preventDefault();
	var adviceQueryURL = "https://api.adviceslip.com/advice";
  console.log(adviceQueryURL);

 

	$.ajax({
		url: adviceQueryURL,
		method: "GET",
	}).then(function (data) {
    var obj = JSON.parse(data);
    console.log(data);
    $("#advice-output").text(obj.slip.advice);
    console.log(obj.slip.advice)
 
	});
});
