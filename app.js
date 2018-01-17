const express = require( 'express' );
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const tweetBank = require('./tweetBank.js');
const bodyParser = require('body-parser');
const app = express(); // creates an instance of an express application
const routes = require('./routes');

var locals = {
  title: 'An Example',
  people: [
      { name: 'Gandalf'},
      { name: 'Frodo' },
      { name: 'Hermione'}
  ]
};

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

nunjucks.configure('views', {
  noCache: true,
  express: app
});

app.use(bodyParser.urlencoded({extended: true})); // form HTML form submits
app.use(bodyParser.json());// would be for AJAX requests


app.use(routes,
  (req, res, next) => {
    console.log(`method: ${req.method} , path: ${req.path}`);
    next();
    },
  (req, res, next) => {console.log(`method: ${req.method} , path: ${req.path} Is anybody there?`);
    next();
    },
);


app.listen(3000, () => console.log('server listening'));



