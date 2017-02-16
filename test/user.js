var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var agent = require("supertest").agent(server);
var db = require("../db").init;


chai.use(chaiHttp);

describe("Clear users...", function(done) {
  
  beforeEach(function(done){
    db.none('TRUNCATE users RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from users')
    .then(function(data){
      expect(data).to.deep.equal([]);
      });
      done()
  });
});

describe('Users', function(){
  
  before(function(done){
    db.none('insert into users( username, password )' + 'values( $1, $2 )', ['username', 'password'] )
    done();
  })  
  
  it('should sign in', function(done) {
    agent.post('/login')
    .send({ 'username': 'username', 'password': 'password' })
    .expect(200)
    .end(function(err, res){
      expect(res).to.have.status(302)
      done()
    })
  })
  
  it('should add a SINGLE user on /users POST', function(done) {
    agent.post('/api/users')
    .send({ 'username':'username', 'password':'password' })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status('success')
      done();
    });
  });
  
  it('should list ALL users on /users/active GET', function(done){
      agent.get('/api/users')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0]).to.have.property('id');
        done();
      });
  });
  
  it('should update a SINGLE user on /users/:id PUT', function(done) {
    agent.put('/api/users/1')
    .send({"password":"1111111111"})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should list a SINGLE user on /user/:id GET', function(done) {
      agent.get('/api/users/1')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('username');
        expect(res.body.username).to.equal('username')
        done();
      });    
  });
   
  it('should delete a SINGLE user on /users/:id DELETE', function(done) {
      agent.get("/api/users/")
      .end(function(err, res) {
          agent.delete("/api/users/" + res.body[0].id )
          .end(function(error, response){
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            expect(response.body).to.be.a('object');
            expect(response.body).to.have.status('success');
            done();
          });
      });
  });
});