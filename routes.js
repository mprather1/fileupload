var express = require("express");
var router = express.Router();
var files = require("./db").files;
var users = require("./db").users;
var multer = require("multer")

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
  .get(users.getAllUsers)
  .post(users.createUser)

router.route("/users/:id")
  .get(users.getSingleUser)
  .put(users.updateUser)
.delete(users.removeUser)

router.route('/files')
  .post(upload.single('upload'), files.uploadFile)
  .get(files.getAllFiles)
  
router.route('/files/:id')
  .delete(files.removeFile)
  .get(files.getSingleFile)
  
module.exports = router;