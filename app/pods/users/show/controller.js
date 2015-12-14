import Ember from 'ember';

export default Ember.Controller.extend({
  
  session: Ember.inject.service('session'),
  
  // --- Set Clear -------------

  clearAll: function() {
    this.setProperties({
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      avatar: undefined,
      user: undefined
    });
  },

  // --- Update Models -------------

  _updateAvatar: function() {
    let self = this;
    if (this.get('avatar.hasDirtyAttributes')) {
      this.get('avatar').save().then(
        function(avatar) {
          self._updateCurrentAvatar(avatar);
        }, 
        function() {
          // this._setError();
        }
      );
    }
  },

  _updateCurrentAvatar: function(avatar) {
    this.get('session').setProperties({
      currentAvatar: avatar,
    });
  },

  _updateUser: function() {
    let self = this;
    if (this.get('user.hasDirtyAttributes')) {        
      this.get('user').save().then(
        function(user) {
          self._updateCurrentUser(user);
        }, 
        function() {
          // this._setError();
        }
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
      let self = this;
      this.get('user').destroyRecord().then(function() {
        self.transitionToRoute('users');
      });
    },
    setMetaData: function(meta_data) {
      this.get('avatar').set('meta_data', JSON.stringify(meta_data));
    }
  }
});