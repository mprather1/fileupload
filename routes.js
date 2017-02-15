var express = require("express");
var router = express.Router();
var files = require("./db").files;
var users = require("./db").users;
var multer = require("multer")
var passport = require("./authentication/index")

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + '/app/static/files')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.route("/users")
  .get(passport.middleware(), users.getAllUsers)
  .post(passport.middleware(), users.createUser)

router.route("/users/:id")
  .get(passport.middleware(), users.getSingleUser)
  .put(passport.middleware(), users.updateUser)
  .delete(passport.middleware(), users.removeUser)

router.route('/files')
  .post(passport.middleware(), upload.single('upload'), files.uploadFile)
  .get(passport.middleware(), files.getAllFiles)
  
router.route('/files/:id')
  .delete(passport.middleware(), files.removeFile)
  .get(passport.middleware(), files.getSingleFile)
  
module.exports = router;