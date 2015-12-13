import Ember from 'ember';

export default Ember.Controller.extend({
  
  clearAll() {
    this.set('users', undefined);
  }

});