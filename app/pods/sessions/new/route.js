import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  
  beforeModel() {
    let auth_token = Cookies.get('user_session');
    this._isLoggedIn(auth_token);
  },
  
  _isLoggedIn(auth_token) {
    if (auth_token) {
      this.transitionTo('home');
    }
  },

  setupController(controller) {
    controller.clearAll();
  }

});