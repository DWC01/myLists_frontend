import Ember from 'ember';
  
export default Ember.Controller.extend({
  
  session: Ember.inject.service('session'),

  // ---- Create --------

  _saveUserModel(model) {
    let self = this;

    model.save().then(
      function(response) {
        self._userCreateSuccess(response);
      },
      function(response) {
        self._userCreateFailure(response);
      }
    );
  },
  
  _userCreateSuccess(user) {
    let self = this;

    this.get('session').setCurrentUser(user.get('auth_token'))
    .then(function() {
      console.log('Did we make it here??');
      self.transitionToRoute('users.show', user.id );
    });
  },

  _userCreateFailure(response) {
    this.set('user_errors', response.errors);
  },

  // ---- Clear --------

  clearAll() {
    this.setProperties({
      first_name: undefined, last_name: undefined, 
      email: undefined, password: undefined, 
      password_confirmation: undefined, 
      user_errors: undefined
    }); 
  },

  actions: {
    createUser: function() {
      let user = this.get('user');
      this._saveUserModel(user);
    }
  }
});