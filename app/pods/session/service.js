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
  setCurrentUser(cfg) {
    let user = this._normalizeUser(cfg.user),
        auth_token = cfg.auth_token;
    
    if(user) {
      return this._setCurrentUser(user);
    }

    if(auth_token) {
      return this._getAndSetCurrentUser(auth_token);
    }
  },

  _normalizeUser(user) {
    if (user.store) {
      return user;
    } else {
      let userModel = this.get('store').createRecord('user');
      userModel.setProperties(user);
      console.log(userModel);
      return userModel;
    }
  },

  _setCurrentUser(user) {
    this._setCurrentUserCookie(user.get('auth_token'));
    this._setCurrentUserProperties(user);
    return this._setCurrentAvatar(user);
  },

  _getAndSetCurrentUser(auth_token) {
    let self = this;
    
    return this.get('store')
      .query('user', {
        auth_token: auth_token
      })
      .then(function(user) {
        self._setCurrentUserProperties(user.objectAt(0));
        self._setCurrentAvatar(user.objectAt(0));
      });
  },

  _setCurrentUserProperties(user) {    
    this.set('currentUser', user);
    this.set('isLoggedIn', true);
    this.set('isAdmin', user.get('admin'));
  },

  _setCurrentAvatar(user) {
    let self = this;

    return this.get('store')
      .query('avatar', {
        user_id: user.get('id')
      })
      .then(function(avatar) {
        self.set('currentAvatar', avatar.objectAt(0));
      });
  },

  _setCurrentUserCookie(auth_token) {
    Cookies.set('user_session', auth_token, {path: '/' });
  },

  clearCurrentUserSession() {
    Cookies.remove('user_session', { path: '/' });
    
    this.setProperties({
      currentAvatar: undefined,
      currentUser: undefined,
      isLoggedIn: undefined,
      isAdmin: undefined
    });
  }

});