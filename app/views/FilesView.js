var FileView = require("./FileView");

var FilesView = Backbone.Marionette.CollectionView.extend({
  childView: FileView,
  tagName: 'tbody',
  attachHtml: function(collectionView, itemView){
    collectionView.$el.prepend(itemView.el);
  },
});

module.exports = FilesView;