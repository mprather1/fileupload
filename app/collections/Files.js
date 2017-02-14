var File = require("../models/File")

var Files = Backbone.Collection.extend({
  model: File,
  url: 'http://shintech.ninja:8000/api/files',
  comparator: function(item){
    return -item.get('id')
  }
});

module.exports = Files;