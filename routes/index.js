var express = require('express');
var router = express.Router();
var app = require('../app');
var http = require('http');
var https = require('https');
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');
//mongoose.connect('mongodb://user:fouratj@jello.modulusmongo.net:27017/iseTu4ty')
var igdb = require('igdb-api-node');
var igDB = require('igdb-wrapper-node');
  // my modules
var myapi = require('./api');
var mydb = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userdb = require('../db');
var User = require('./user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res) {
  if (req.user) { //checks to see if user logged in
    mydb.find("media", function(err, items) {
      res.render('myapp', {
        user: req.user,
        categories: ["movie", "tvshow", "book", "game"],
        medias: items,
        nickname: "Foo"
      })
    });
  } else {
    res.redirect('/login')
  }
});

router.post('/add2db', function(req, res) {
  "use strict";
  var current = {};
  myapi.item( function(response) { //retrieves empty object to store media data
    current = response;
  });
  var name = req.body.name, media = req.body.media, extra = '';

  if (media === "tvshow" || "game")
    extra = req.body.extra

  if (media === "movie") {
    myapi.movies(name, media, current, function(response) {
      current = response;
      mydb.insert(current) //inserts object into database
    });
  } else if (media === "tvshow") {
    myapi.tvshows(name, extra, media, current, function(err, response) {
      if ( err ) { console.log(err) }
      current = response;
      mydb.insert(current) //inserts object into database
    })
  } else if (media === "book") {
    myapi.books(name, media, current, function(response) {
      current = response;
      mydb.insert(current) //inserts object into database
    })
  } else if (media === "game") {
      igDB.games.search({query: name}, function(err, response) {
        console.log(response)
      })
  }
  res.send('Received');
});

router.get('/login', function(req, res) {
  res.render('login.html');
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/')
  }
);

router.post('/register', function(req, res) {
  User.register(new User({username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
})
module.exports = router;
