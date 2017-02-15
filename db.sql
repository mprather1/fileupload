DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE files (
  ID SERIAL PRIMARY KEY,
    file_name VARCHAR,
    file_size VARCHAR,
    mimetype VARCHAR
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);

INSERT INTO users ( username, password )
VALUES ( 'mprather', 'password' );


DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE files (
  ID SERIAL PRIMARY KEY,
    file_name VARCHAR,
    file_size VARCHAR,
    mimetype VARCHAR
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);

DROP DATABASE IF EXISTS api_production;
CREATE DATABASE api_production;

\c api_production;

CREATE TABLE files (
  ID SERIAL PRIMARY KEY,
    file_name VARCHAR,
    file_size VARCHAR,
    mimetype VARCHAR
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR
);