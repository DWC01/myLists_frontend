import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  
  beforeModel() {
    // Returns a promise so app init pauses until resolved
    return this.get('session').initSession({store: this.store});
  }

});