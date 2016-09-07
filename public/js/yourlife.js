function apiCaller (x,y,z) {

  let Item = function() {
  this.name = "";
  this.runtime = "";
  this.userID = "";
  this.release = "";
  this.dateadded = "";
  this.synopsis = "";
  this.creator = "";
  this.poster = "";
  this.season = "";
  };

  let name = x, media = y || "", season = z || "";
  let itemID = "";
  let item = new Item;
  //API keys
  const api_key1 = "api_key=83e042991949ef7ee9683a5682d8fd7e"; //themoviedb api key
  const api_key2 = 'key=AIzaSyCTBVFSFP2D4u4KdxKn_ztO7JjgjDyRiZs'; //GoogleBooks api key
  const api_key3 = "token=79S6jQlho7gX5sq8CgRhn6u_ZoTdbRJZtlkTmsw00UM"; //igdb.com api key

  //Books API URIs
  var bookSearch = "https://www.googleapis.com/books/v1/volumes?q="
  var bookVol = "https://www.googleapis.com/books/v1/volumes/ID"
  //games API URIs
  var gameSearch = "https://www.igdb.com/api/v1/games/search?q="
  var gameID = "https://www.igdb.com/api/v1/games\?"
  //movies & tvshow API URIs
  var movieSearch = "https://api.themoviedb.org/3/search/movie?query="
  var movieID = "https://api.themoviedb.org/3/movie/"
  var tvSearch = "http://api.themoviedb.org/3/search/tv?query="
  var tvID = "http://api.themoviedb.org/3/tv/"
  var posterURI = "http://image.tmdb.org/t/p/w300"
  //headers
  var headers = {'Accept': 'application/json'}
  var gameHeader = {'Authorization': 'Token token="79S6jQlho7gX5sq8CgRhn6u_ZoTdbRJZtlkTmsw00UM"'}

  var api_key = "";
  var searchURI = "";
  var idURI = "";

  switch (media) {
    case "movie":
    case "tvshow":
      api_key = api_key1;
      searchURI = movieSearch;
      idURI = movieID;
      break;
    case "book":
      api_key = api_key2 + "&country=US";
      searchURI = bookSearch;
      idURI = bookVol;
      break;
    case "game":
      api_key = api_key3;
      searchURI = gameSearch;
      idURI = gameID;
      break;
  }
  var apiURL = searchURI + escape(name) + '&' + api_key;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", apiURL, true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      response = JSON.parse(xhttp.responseText);
      //console.log(response)
      var arr = [];
      if ( response.total_results > 1 && response.total_results != 0) {
        response.results.forEach( (item) => {
          arr.push(item.title)
        })
      } else {
        Item = result.results[0];
        itemiD = Item.id;
      }
      console.log(arr)
    }
  };
  xhttp.setRequestHeader("Accept", 'application/json');
  xhttp.send('name=', name);


  /*
  Item = result.results[0];
  itemiD = Item.id;
  fullURL = idURI + iD + "?" + api_key;

  item.name = result.title;
  item.runtime = result.runtime;
  item.release = result.release_date;
  item.synopsis = result.overview;
  item.poster = posterURI + result.poster_path;
*/
}
