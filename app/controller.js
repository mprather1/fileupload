var Marionette = require("marionette");
var Files = require("./collections/Files")
var FilesView = require("./views/FilesView");

var FileUploadView = require("./views/FileUploadView");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    this.files = new Files();
    this.files.fetch()

    this.app.view.showChildView('form', new FileUploadView({ collection: this.files }));
    this.app.view.showChildView('main', new FilesView({ collection: this.files }));
  }
});

module.exports = Controller;