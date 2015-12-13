import Ember from 'ember';
import ENV from "frontend/config/environment";

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),

  // --- Create -------------

  _createNewSession(data, attemptedTransition) {
    let self = this;

    Ember.$.post(ENV.APP.base_url + '/api/sessions', data).then(
      function(response){
        self._signInSucess(response, attemptedTransition);
      },
      function(response) {
        self._signInFailure(response);
      }
    ); 
  },

  _signInSucess(response, attemptedTransition) {
    let self = this,
        user = response.user;

    this.get('session').setCurrentUser(user.auth_token)
    .then(function() {
      self._redirect(attemptedTransition, user);
    });
  },

  _redirect(attemptedTransition, user) {
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('attemptedTransition', null);
    } else {
      this.transitionToRoute('users.show', user.id );
    }
  },

  _signInFailure(response) {
    if (response.status === 422) {
      let errorObject = JSON.parse(response.responseText);
      this.set('userErrors', errorObject.errors);
    }
  },

  // ---- Clear --------
  
  clearAll() {
    this.setProperties({
      email: undefined, userErrors: undefined, 
      password: undefined, auth_token: undefined, 
      currentUser: undefined, isLoggedIn: undefined, 
      currentAvatar: undefined
    });
  },

  actions: {
    signIn() {
      let data = this.getProperties('email','password'),
          attemptedTransition = this.get('attemptedTransition');
      this._createNewSession(data, attemptedTransition);
    }
  }

});