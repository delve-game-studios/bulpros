var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = {
	db: require('./config/database.js')
};

mongoose.connect(config.db.url, {
  useMongoClient: true,
  /* other options */
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'mevkok',
	saveUninitialized: true,
	resave: true
}));
app.set('view engine', 'ejs');

require('./app/routes.js')(app);

app.listen(port);
console.log('server running on port: ' + port);
