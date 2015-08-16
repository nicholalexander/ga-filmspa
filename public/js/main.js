var renderResults = function (results){
  $.each(results, function(i, val){
    $.each(val, function(key, val2){
      console.log(val2.Title);
      rowDiv = "<tr><td>"+val2.Title+"</td><td>"+val2.Year+"</td><td>Favorite</td></tr>"
      $('#results-hanger').append(rowDiv);
    });  
  });   
};

var getSearchResults = function (){
  // get the value of the form
  film = $('input').val()

  //process value
  film = film.replace(' ', "+")

  //setup the query string
  query = "http://omdbapi.com/?s=" + film + "&y&r=json"

  // make the ajax call
  var request = $.ajax({
                    method: "GET",
                    url: query
                });

  // process results when ajax call is finished
  request.done(function(){
    renderResults(request.responseJSON);
  });

};

window.onload = function(){
  
  console.log("hello from moviespa js!");
  
  // set up listener
  $('form').on("submit", function (e){
    e.preventDefault();
    getSearchResults();
  })

};






