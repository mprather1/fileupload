var FileView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  className: 'table-row',
  template: require("../templates/file-view-template.html"),
  serializeData: function(){
    var formatUnits = function(bytes){
      if(bytes === 0) return '0 bytes';
      var k = 1000;
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    var file_type = function(type){
      if(type !== ''){
        return type;
      } else {
        return "unknown";
      }
    };
    return {
      'file_name': this.model.get('file_name'),
      'file_size': formatUnits(this.model.get('file_size')),
      'mimetype': file_type(this.model.get('mimetype')),
    };
  }
});

module.exports = FileView;