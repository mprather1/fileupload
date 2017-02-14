var FileView = require("./FileView");

var FilesView = Backbone.Marionette.CollectionView.extend({
  childView: FileView,
  attachHtml: function(collectionView, itemView){
    collectionView.$el.prepend(itemView.el);
  },
});

module.exports = FilesView;