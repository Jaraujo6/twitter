const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('public'));

const urlParser = bodyParser.urlencoded({ extended: false});
router.post('/', urlParser, (req, res) => {
  tweet = {
  name: req.body.name,
  tweet: req.body.content
  }
  let tweets = tweetBank.list();
  tweets.add( tweet.name, tweet.tweet );
  res.render( 'index', { tweets: tweets, showForm: true } );
});

const jsonParser = bodyParser.json();
router.post('/', jsonParser, (req, res) => {

});

router.use(bodyParser.json());

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets } );
});

router.get('/tweets/:id', function(req, res) {
  var idNum = req.params.id;

  var tweets = tweetBank.find( {id: idNum} );
  console.log(tweets);
  res.render( 'index', { tweets: tweets } );
});

module.exports = router;
