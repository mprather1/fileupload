var db = require("../init");

function getAllUsers(req, res, next){
  db.any('select * from users')
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });  
}

function getSingleUser(req, res, next){
  var userID = parseInt(req.params.id);
  db.one('select * from users where id = $1', userID)
    .then(function(data){
      res.status(200)
       .json(data);
    })
    .catch(function(err){
      return next(err);
    });
}

function createUser(req, res, next){
  db.none('insert into users( username, password )' + 'values( ${username}, ${password} )', req.body)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted ONE user'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

function updateUser(req, res, next){
  db.none('update users set password=$1 where id=$2', [req.body.password, parseInt(req.params.id)])
    .then(function(){
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function(err){
      return next(err);
    });
}

function removeUser(req, res, next){
  var userID = parseInt(req.params.id);
  db.result('delete from users where id = $1', userID)
    .then(function(result){
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        });
    })
    .catch(function(err){
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};