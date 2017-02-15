var FilesView = require("./FilesView");

var FilesTableView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'panel panel-primary',
  template: require("../templates/files-table-view-template.html"),
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    },
    footer: {
      el: '.panel-footer'
    }
  },
  initialize: function(){
    this.render()
  },
  onRender: function(){
    this.showChildView('body', new FilesView({ collection: this.collection }))
  }
});

module.exports = FilesTableView;