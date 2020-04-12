
$('.stuff').on('click', function (event) {
    event.preventDefault();
    var queryURL = 'https://api.giphy.com/v1/stickers/search?q=aliens&api_key=yj2GYkgWF6vExu23oEOyov2Ydg9xDUGU&limit=5&rating=g'
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
        console.log(results)
        console.log('hi')
      });
})