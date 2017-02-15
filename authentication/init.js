var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var db = require("../db/init");
var authenticationMiddleware = require('./middleware')

passport.serializeUser(function (user, done) {
  done(null, user.id);
})

passport.deserializeUser(function (user, done) {
  db.one('select * from users where id = $1', user)
  .then(function(data){
    return done(null, data), data;
  })
  .catch(function(err){
    return done(err);
  });
});

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done){
      db.one('select * from users where username = $1', username)
      .then(function(user){
        if(!user){ return done(null, false) }
        if(password != user.password){
          return done(null, false);
        }
        return done(null, user), user;
      })
      .catch(function(err){
        return done(err);
      });
    }));
  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;