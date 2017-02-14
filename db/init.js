var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var config = require("../_config");
var environment = process.env.NODE_ENV || 'development';
var pgp = require("pg-promise")(options);
var connectionString = config.postgresURI[environment];
var init = pgp(connectionString);
var database_name = connectionString.split('/');

if (process.env.NODE_ENV === "development"){
  console.log("Connected to database: " + database_name[database_name.length - 1]);
}

module.exports = init;