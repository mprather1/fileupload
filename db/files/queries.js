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

module.exports = {
  uploadFile: uploadFile,
  getAllFiles: getAllFiles
}