import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  
  model() {
    return this.get('session').get('currentUser');
  },

  setupController(controller) {
    let session = this.get('session'),
        user = session.get('currentUser');

    controller.clearAll();
    controller.set('user', user);  
    controller.set('avatar', user.get('avatar').get('content'));
  }
});