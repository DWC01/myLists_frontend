import Ember from 'ember';

export default Ember.Controller.extend({
  
  session: Ember.inject.service('session'),
  
  // --- Set Clear -------------

  clearAll: function() {
    this.setProperties({
      first_name: undefined,
      last_name: undefined,
      email: undefined
    });
  },
  
  // --- Bind Observers -------------

  _setAvatarProperties: function() {
    this.get('avatar').set('meta_data', this.get('meta_data'));
  }.observes('meta_data'),

  // --- Update Models -------------

  _updateAvatar: function() {
    if (this.get('avatar.hasDirtyAttributes')) {
      this.get('avatar').save().then(
        function(avatar) {
          this._updateCurrentAvatar(avatar);
          // TODO: FLASH
          // this._setSuccessFlash();
        }.bind(this), 
        function() {
          // TODO: FLASH
          // this._setErrorFlash();
        }.bind(this)
      );
    }
  },

  _updateCurrentAvatar: function(avatar) {
    this.get('session').setProperties({
      currentAvatar: avatar,
    });
  },

  _updateUser: function() {
    if (this.get('user.hasDirtyAttributes')) {        
      this.get('user').save().then(
        function(user) {
          this._updateCurrentUser(user);
          // TODO: FLASH
          // this._setSuccessFlash();
        }.bind(this), 
        function() {
          // TODO: FLASH
          // this._setErrorFlash();
        }.bind(this)
      );
    }
  },

  _updateCurrentUser: function(user) {
    this.get('session').setProperties({
      currentUser: user,
    });
  },

  // --- Set View Actions -------------

  actions: {
    saveChanges: function() {
      this._updateAvatar();
      this._updateUser();
    },
    delete: function() {
      this.get('user').destroyRecord().then(function() {
        this.transitionToRoute('users');
      }.bind(this));
    },
    setMetaData: function(meta_data) {
      this.set('meta_data', JSON.stringify(meta_data));
    }
  }
});