const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('public'));

// router.post('/', urlParser, (req, res) => {
//   tweet = {
//   name: req.body.name,
//   tweet: req.body.content
//   }
//   let tweets = tweetBank.list();
//   tweets.add( tweet.name, tweet.tweet );
//   res.render( 'index', { tweets: tweets, showForm: true } );
// });

router.post('/tweets', function (req, res, next){
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');
});

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res, next) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets, showForm: true, username: req.params.name} );
});

router.get('/tweets/:id', function(req, res, next) {
  var idNum = req.params.id;

  var tweets = tweetBank.find( {id: idNum} );
  console.log(tweets);
  res.render( 'index', { tweets: tweets } );
});

module.exports = router;
