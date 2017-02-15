var db = require("../init");

function uploadFile(req, res, next){
  db.none('insert into files(file_name)' + 'values( $1 )', req.files.upload.name)
  .then(function(){
    var file;
    if(!req.files || req.files !== undefined){
      file = req.files.upload
      file.mv('./app/static/files/' + file.name, function(){
        console.log("File Uploaded...")
      })
    }
    res.status(200)
    .json({
      status: 'success',
      message: 'uploaded ONE file...'
    })
  })
}

function getAllFiles(req, res, next){
  db.any('select * from files')
  .then(function(data){
    res.status(200)
    .json(data)
  })
  .catch(function(err){
    return next(err)
  })
}

function removeFile(req, res, next){
  var fileID = parseInt(req.params.id);
  deleteFile(fileID)
  db.result('delete from files where id = $1', fileID)
  .then(function(result){
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${result.rowCount} files...`
    })
  })
  .catch(function(err){
    return next(err);
  });
}

var fs = require('fs');

var deleteFile = function(id){
  db.one('select * from files where id = $1', id)
  .then(function(res){
    fs.unlink('./app/static/files/' + res.file_name, function(error){
      if(error) console.log(error);
      console.log("File successfully deleted...");
    });
  });
};

module.exports = {
  uploadFile: uploadFile,
  getAllFiles: getAllFiles,
  removeFile: removeFile
};