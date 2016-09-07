var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'fourat', password: 'eminem', displayName: 'foo', emails: [ { value: 'foo@example.com' } ] }
];

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/users';

exports.insertUser = function(user) {
  MongoClient.connect(url, function(err, db) {
    db.collection('user').insertOne({
      'login': '',
      'name': '',
      'password': '',
      'email': ''
    }, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted a document user");
      db.close()
    });
  });
}

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.addUser = function(user, cb) {
  records.push(user)
  console.log(records)
  //cb("success");
}
