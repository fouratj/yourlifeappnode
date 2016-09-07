var mdb = require('moviedb')('83e042991949ef7ee9683a5682d8fd7e');
var books = require('google-books-search');
var posterURI = "http://image.tmdb.org/t/p/w300";
var mydb = require('./db');

module.exports = {
  movies: function(name, media, current, callback) {
    mdb.searchMovie({query: name}, function(err, res) {
      mdb.movieInfo({id: res.results[0].id}, function(err, response) {
        current.name = response.original_title;
        current.type = media; //sets object type
        current.release = response.release_date.slice(0, 4);
        current.synopsis = response.overview;
        current.runtime = response.runtime + " minutes";
        current.poster = posterURI + response.poster_path;
        current.dateadded = Date.now();
        current.season = '';
        current.episodes = '';
        console.log(current);
        callback(current)
      });
    });
  },
  tvshows: function(name, season, media, current, callback) {
    mdb.searchTv({query: name}, function(err, res) {
      mdb.tvInfo({id: res.results[0].id}, function(err, response) {
        if (!err) {
          console.log("season: ", current)
          console.log(response)
          current.name = response.name;
          current.type = media; //sets object type
          current.synopsis = response.overview;
          current.poster = posterURI + response.seasons[season].poster_path;
          current.season = season;
          current.episodes = response.seasons[season].episode_count;
          current.release = response.seasons[season].air_date.slice(0, 4);
          current.runtime = (response.episode_run_time[0] * current.episodes / 60).toFixed(0) + " hours"
          current.dateadded = Date.now();
          console.log(current)
          callback(null, current)
      } else {
        callback( new Error("Error"), null)
      }
      });
    });
  },
  books: function(name, media, current, callback){
    var options = {
      key: "",
      limit: 5,
      type: 'books',
      order: 'relevance',
      lang:'en'
    }
    books.search(name, options, function (err, results, apiResponse) {
      if (!err) {
        books.lookup(results[0].id, function(err, result) {
          current.type = media;
          current.name = result.title;
          current.release = result.publishedDate;
          current.creator = result.authors[0];
          current.poster = result.thumbnail;
          current.dateadded = Date.now();
          current.runtime = result.pageCount + " pages";
          current.synopsis = result.description;
          console.log(current);
          callback(current)
          //MongoClient.connect(url, function(err, db) {
            //insertDocument(db, current, current.type, function() { db.close() });
          //mydb.insert(current);
          //});
        });
      } else {
        console.log(err)
      }
    });
  },
  item: function(callback) {
    var Item = function() {
      this.type = '';
      this.name = '',
      this.runtime = '',
      this.release= '',
      this.dateadded = '',
      this.synopsis = '',
      this.creator = '',
      this.poster = '',
      this.season = '',
      this.episodes = ''
    }
    callback(new Item);
  }
};
