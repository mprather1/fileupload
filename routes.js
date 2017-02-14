var express = require("express");
var router = express.Router();
var files = require("./db").files;

// Routes

router.route('/files')
  .post(files.uploadFile)
  .get(files.getAllFiles)
  
module.exports = router;