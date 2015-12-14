import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return params.password_reset_token;
  },
  setupController: function (controller, model) {
    controller.set('password_reset_token', model);
  }
});
