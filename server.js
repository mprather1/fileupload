var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var config = require("./_config");
var environment = process.env.NODE_ENV || "development";
var morgan = require("morgan");
var routes = require("./routes");
var port = process.env.PORT || 8000
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var passport = require("passport");
var store = new RedisStore({
    url: config.redisStore.url
});

if (environment === "development"){
  app.use(morgan('dev'));
}

app.use(session({
  store: store,
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(function(req, res, next){
  if(req.session.passport != undefined){
      res.cookie('userID', req.session.passport.user);
  }
  next();
});

require('./authentication').init(app, passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'app', 'static')));

app.use(passport.initialize());
app.use(passport.session());

app.get('/loginFailure', function(req, res, next) {
  res.sendFile('login-failure.html', { root: './' });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/loginFailure'
}));

app.use('/api', routes);

var server = app.listen(port, function(){
  if(environment === "development"){
    console.log(("Listening on port " + port + "..."))
  }
});

module.exports = server;