var FileView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  template: require("../templates/file-view-template.html"),
  serializeData: function(){
    var formatUnits = function(bytes){
      if(bytes>=1000000000) { bytes=(bytes/1000000000).toFixed(2)+' GB'; }
      else if (bytes>=1000000) { bytes=(bytes/1000000).toFixed(2)+' MB'; }
      else if (bytes>=1000) { bytes=(bytes/1000).toFixed(2)+' KB'; }
      else if (bytes>1) { bytes=bytes+' bytes'; }
      else if (bytes==1) { bytes=bytes+' byte'; }
      else { bytes='0 byte'; }
      return bytes;      
    }
    return {
      'file_name': this.model.get('file_name'),
      'file_size': formatUnits(this.model.get('file_size')),
      'mimetype': this.model.get('mimetype'),
    }
  }
});

module.exports = FileView;