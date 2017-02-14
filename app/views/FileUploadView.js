var File = require("../models/File")

var FileUploadView = Backbone.Marionette.View.extend({
  template: require("../templates/file-upload-view.html"),
  events: {
    'click #file-submit': 'handleClick'
  },
  
  className: 'panel panel-default',
  handleClick: function(e){
    e.preventDefault();
    var formData = new FormData()
    formData.append('upload', $('#file-upload')[0].files[0])

    var file = new File({ file_name: $('#file-upload')[0].files[0].name })
    this.collection.add(file)
    
    $.ajax({
      url: '/api/files',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log(data);
        Backbone.trigger('files:render');
      }
    });

  }
});

module.exports = FileUploadView;