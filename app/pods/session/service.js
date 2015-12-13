import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Service.extend({

  // Returns a promise so Application Router pauses until actualized
  initSession(cfg) {
    this.set('store', cfg.store);
    let auth_token = Cookies.get('user_session');

    if (auth_token) {
      return this._getAndSetCurrentUser(auth_token);
    }
  },

  // Returns a promise
  setCurrentUser(auth_token) {
    if(auth_token) {
      return this._getAndSetCurrentUser(auth_token);
    }
  },

  _getAndSetCurrentUser(auth_token) {
    let self = this;
    
    return this.get('store')
      .query('user', {
        auth_token: auth_token
      })
      .then(function(user) {
        self._setCurrentUserCookie(auth_token);
        self._setCurrentUserProperties(user.objectAt(0));
      });
  },

  _setCurrentUserProperties(user) {    
    this.set('currentUser', user);
    this.set('isLoggedIn', true);
    this.set('isAdmin', user.get('admin'));
  },

  _setCurrentUserCookie(auth_token) {
    Cookies.set('user_session', auth_token, {path: '/' });
  },

  clearCurrentUserSession() {
    Cookies.remove('user_session', { path: '/' });
    
    this.setProperties({
      currentUser: undefined,
      isLoggedIn: undefined,
      isAdmin: undefined
    });
  }

});