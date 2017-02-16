var Marionette = require("marionette");
var Files = require("./collections/Files")
var FilesTableView = require("./views/FilesTableView");
var LoginView = require("./views/LoginView")

var FileUploadView = require("./views/FileUploadView");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    this.files = new Files();
    this.files.fetch({
      success: function(model, response, options){
        if(options.xhr.status === 200){
          console.log("Successfully fetched files...")
        }
      },
      error: function(model, xhr, options){
        if(options.xhr.status === 400){
          console.log("Please log in...")
          Backbone.history.navigate('#login', { trigger: true })
        }
      }
    })

    this.app.view.showChildView('form', new FileUploadView({ collection: this.files }));
    this.app.view.showChildView('main', new FilesTableView({ collection: this.files }));
  },
  loginFunction: function(){
    this.app.view.showChildView('main', new LoginView())
  },
});

module.exports = Controller;