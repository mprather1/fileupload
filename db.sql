DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE files (
  ID SERIAL PRIMARY KEY,
    file_name VARCHAR
);


DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    title VARCHAR,
    username VARCHAR,
    password VARCHAR,
    phone VARCHAR,
    email VARCHAR
);

DROP DATABASE IF EXISTS api_production;
CREATE DATABASE api_production;

\c api_production;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    title VARCHAR,
    username VARCHAR,
    password VARCHAR,
    phone VARCHAR,
    email VARCHAR
);