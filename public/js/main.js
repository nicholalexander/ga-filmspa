var renderSearchResults = function (results){
  $.each(results, function(i, val){
    $.each(val, function(key, val2){
      console.log(val2.Title);
      rowDiv= "<tr><td><a href='' data-id=" 
      + val2.imdbID 
      + ">"
      + val2.Title
      + "</a></td><td>"
      + val2.Year 
      + "</td><td>Favorite</td></tr>";
      $('#results-hanger').append(rowDiv);
      //add event listener
      $('a').last().on("click", function(e){
        e.preventDefault();
        getFilmDetails($(this).data("id"));
      });
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
    renderSearchResults(request.responseJSON);
  });

};

var renderDetailedResults = function (results){
  console.log(results)
  // Title / Year/ Actors / Plot / Poster / Rating

  detailsDiv = '<div class="details"><div class="row details"><div class="col-md-12"><div class="thumbnail"><img src= '
  + results.Poster 
  + ' alt="..." class="img img-responsive"><div class="caption"><h3>'
  + results.Title 
  + ' </h3><p> '
  + results.Plot 
  + '</p></div></div></div></div></div>'
  $('*[data-id="22"]');

  $('.details').remove();
  $('.modal-body').append(detailsDiv);
  $('.modal').modal('show');  
}

var getFilmDetails = function(filmId) {
  //setup the query string
  var query = "http://www.omdbapi.com/?i=" + filmId + "&plot=full&r=json"
  
  //make the ajax call
  var request = $.ajax({
                    method: "GET",
                    url: query
                });

  // process results when ajax call is finished
  request.done(function(){
    renderDetailedResults(request.responseJSON);
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






