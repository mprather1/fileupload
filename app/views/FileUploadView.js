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
    var formData = new FormData();
    var file = document.getElementById('file-upload').files[0]
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
      var newFile = new File({ file_name: file.name })
      that.collection.add(newFile)
    }
    
    xhr.send(formData)

  }
});

module.exports = FileUploadView;