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
  events: {
    'mouseover .table-header': 'mouseoverHeader',
    'mouseout .table-header': 'mouseoutHeader',
    'mouseover .table-row': 'mouseoverRow',
    'mouseout .table-row': 'mouseoutRow',    
  },
  initialize: function(){
    this.render()
  },
  onRender: function(){
    this.showChildView('body', new FilesView({ collection: this.collection }))
  },
  mouseoverHeader: function(event){
    $(event.currentTarget).css({"background-color":"lightgrey","cursor":"pointer"});
  },
  mouseoutHeader: function(event){
    $(event.currentTarget).css("background-color", "rgb(231, 231, 230)");
  },
  mouseoverRow: function(event){
    $(event.currentTarget).css({"background-color":"rgb(255, 255, 117)"});
  },
  mouseoutRow: function(event){
    $(event.currentTarget).css("background-color", "");
  }  
});

module.exports = FilesTableView;