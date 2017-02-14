var FileView = require("./FileView");

var FilesView = Backbone.Marionette.CollectionView.extend({
  childView: FileView,
});

module.exports = FilesView;