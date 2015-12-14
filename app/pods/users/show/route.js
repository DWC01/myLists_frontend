import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  
  model(params) {
    return this.store.find('user', params.user_id);
  },

  setupController(controller, model) {
    let session = this.get('session');

    controller.clearAll();
    controller.set('user', model);  
    controller.set('avatar', model.get('avatar').get('content'));
  }
});