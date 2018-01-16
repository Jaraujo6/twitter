const express = require( 'express' );
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const app = express(); // creates an instance of an express application

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

app.get('/', (req, res) => {
  res.render('index.html', locals, (err, output) => console.log(output));
});

app.use(
  (req, res, next) => {

    console.log(`method: ${req.method} , path: ${req.path}`);
    next();
    },
  (req, res, next) => {console.log(`method: ${req.method} , path: ${req.path} Is anybody there?`);
    next();
    },
);

app.get('/', (req, res) => res.send('Hello World'));
app.get('/news', (req, res) => res.send('news test'));
app.listen(3000, () => console.log('server listening'));


