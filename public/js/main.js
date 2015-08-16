
// get the value of the form
film = $('input').val()

//process value
film = film.replace(' ', "+")

//set the query string
query = "http://omdbapi.com/?s=" + film + "&y&r=json"

// make the ajax call
var request = $.ajax({
                  method: "GET",
                  url: query
              });

// process results when ajax call is finished
request.done(function(results){
  $.each(request.responseJSON, function(i, val){
    $.each(val, function(key, val2){
      console.log(val2.Title)
    });  
  });  
});




