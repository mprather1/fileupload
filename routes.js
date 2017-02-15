var express = require("express");
var router = express.Router();
var files = require("./db").files;
var users = require("./db").users;

router.route("/users")
  .get(users.getAllUsers)
  .post(users.createUser)

router.route("/users/:id")
  .get(users.getSingleUser)
  .put(users.updateUser)
.delete(users.removeUser)

router.route('/files')
  .post(files.uploadFile)
  .get(files.getAllFiles)
  
router.route('/files/:id')
  .delete(files.removeFile)
  
module.exports = router;