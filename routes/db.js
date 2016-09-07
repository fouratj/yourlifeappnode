var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
//var url = 'mongodb://user:fouratj@jello.modulusmongo.net:27017/nusAb3uh'

module.exports = {
  insert: function(data) {
    MongoClient.connect(url, function(err, db) {
      db.collection('media').insertOne({
        'type': data.type,
        'name': data.name,
        'runtime': data.runtime,
        'release': data.release,
        'dateadded': data.dateadded,
        'synopsis': data.synopsis,
        'creator': data.creator || '',
        'poster': data.poster,
        'season': data.season || '',
        'episodes': data.episodes
      }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document");
        db.close()
      });
    });
  },
  find: function(media, callback) {
    var table = media.toString();
    //console.log(table)
    MongoClient.connect(url, function(err, db) {
      db.collection(media, function(err, doc) {
        doc.find().toArray(function(err, items) {
          //console.log(items);
          callback(null, items);
        })
      })
      db.close();
    });
  },
  update: function() {

  },
  delete: function() {

  }
};