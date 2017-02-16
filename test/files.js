var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var agent = require("supertest").agent(server)
var db = require("../db").init;

chai.use(chaiHttp);

describe("Clear files...", function(done) {
  
  beforeEach(function(done){
    db.none('TRUNCATE files RESTART IDENTITY');
    db.none('TRUNCATE users RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from files')
    .then(function(data){
      expect(data).to.deep.equal([]);
      done();      
    });
  });
});

describe("Files", function(){
  
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
  
  it('should add a single file at /files POST', function(done){
    agent.post('/api/files')
    .attach('upload', './test/unicorn.jpg' )
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should get all files at /files GET', function(done) {
    agent.get('/api/files')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body[0]).to.have.property('file_name');
      expect(res.body[0].file_name).to.equal('unicorn.jpg');
      done();
    });
  });
  
  it('should delete a single file at /files/:id DELETE', function(done) {
    agent.get('/api/files')
    .end(function(error, response){
      agent.delete('/api/files/' + response.body[0].id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('success')
        done();
      });
    });
  });
});