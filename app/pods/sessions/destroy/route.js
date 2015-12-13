import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),

  beforeModel: function() {
    this.get('session').clearCurrentUserSession();
    this._clearAllModelStore();
    this.transitionTo('home');
  },
  _clearAllModelStore: function() {
    this.store.unloadAll('user');
    this.store.unloadAll('avatar');
  }
});