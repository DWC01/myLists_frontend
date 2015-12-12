import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '',
  
  filesDidChange: function(files) {
    var self = this,

    uploadUrl = this.get('url'),

    uploader = EmberUploader.Uploader.create({
      url: uploadUrl
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    }

    uploader.on('didUpload', function(response) {
      self.sendAction('setMetaData', response);
      self._clearValue();
    });

  }

});