var chai = require("chai");
var supertest = require("supertest");
var chaiHttp = require("chai-http");
var server = require('../server');
var request = supertest(server)
var expect = chai.expect;
var db = require("../db").init;

chai.use(chaiHttp);

describe("Clear files...", function(done) {
  
  beforeEach(function(done){
    db.none('TRUNCATE files RESTART IDENTITY');
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
  
  it('should add a single file at /files POST', function(done){
    request.post('/api/files')
    .attach('upload', './test/unicorn.jpg' )
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should get all files at /files GET', function(done) {
    request.get('/api/files')
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res.body[0]).to.have.property('file_name');
      expect(res.body[0].file_name).to.equal('unicorn.jpg');
      done();
    });
  });
  
  it('should delete a single file at /files/:id DELETE', function(done) {
    request.get('/api/files')
    .end(function(error, response){
      request.delete('/api/files/' + response.body[0].id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.status('success')
        done();
      });
    });
  });
});