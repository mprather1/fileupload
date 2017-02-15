var File = require("../models/File")

var FileUploadView = Backbone.Marionette.View.extend({
  template: require("../templates/file-upload-view.html"),
  events: {
    'click #file-submit': 'handleClick'
  },
  
  className: 'panel panel-default',
  
  showInfo: function(message){
    $('.progress').addClass('hide')
    $('.message').text(message)
  },
  handleClick: function(e){
    
    e.preventDefault();
    
    var that = this;
    
    $('.progress-bar').css('width', '0%')    
    $('.progress').removeClass('hide');
    
    var file = document.getElementById('file-upload').files[0]
    var newFile = new File({ file_name: file.name, file_size: file.size, mimetype: file.type })
    
    var formData = new FormData();
    formData.append('upload', file)
    
    var xhr = new XMLHttpRequest();
    
    xhr.open('post', '/api/files', true)
    
    xhr.upload.onprogress = function(e){
      if(e.lengthComputable){
        var percentage = (e.loaded / e.total) * 100
        $('.progress-bar').css('width', percentage + '%')
      }
    }
    
    xhr.onerror = function(e){
      that.showInfo("Error...")
    }
    
    xhr.onload = function(){
      that.showInfo(file.name + " was successfully uploaded...")
      that.collection.add(newFile)
      document.getElementById('file-upload').value = ''
    }
    
    xhr.send(formData)

  }
});

module.exports = FileUploadView;