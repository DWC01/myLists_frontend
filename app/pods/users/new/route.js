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

  model() {
    return this.store.createRecord('user');
  },

  setupController(controller,model) {
    controller.clearAll();
    controller.set('user', model);
  },

  actions: {
    willTransition() {
      let model = this.controllerFor('users.new').get('user');
      if (!model.get('id')) {
        model.unloadRecord();
      }
    }    
  }
  
});