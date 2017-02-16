var Marionette = require("marionette");
var Controller = require("./controller");

var Router = Marionette.AppRouter.extend({
  
  initialize: function(options){
    this.controller = new Controller({ app: options.app });
  },
  
  appRoutes: {
    '': 'index',
    'upload': "upload",
    'login': 'loginFunction',
    
  }
});

module.exports = Router;