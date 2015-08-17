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
      // + "</td><td>Favorite</td></tr>";

      + "</td><td><a href='#' class='btn btn-success' role='button'>Favorite</a></td>";
      $('#results-hanger').append(rowDiv);
      //add event listener for details.
      $($('a').last().parent().parent().find('a')[0]).on("click", function(e){
        e.preventDefault();
        getFilmDetails($(this).data("id"));
      });

      //add event listener for adding to favorites
      $('a').last().on("click", function (){
        console.log("favorite!");

        //find associated data
        favorite = $(this).parent().parent().find('a').first();

        //set up payload
        id = favorite.data('id');
        title = favorite.text();

        console.log(id, title);
        $.post("favorites", { name: title, oid: id});

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
  query = "https://omdbapi.com/?s=" + film + "&y&r=json"

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
  var query = "https://www.omdbapi.com/?i=" + filmId + "&plot=full&r=json"
  
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






