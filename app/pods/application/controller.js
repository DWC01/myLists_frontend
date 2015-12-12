import Ember from 'ember';

export default Ember.Controller.extend({
  
  session: Ember.inject.service('session'),

  isLoggedIn: function(){
    return this.get('session.isLoggedIn');
  }.property('session.isLoggedIn'),

  currentUser: function() {
    return this.get('session.currentUser');
  }.property('session.currentUser'),

  isAdmin: function() {
    return this.get('session.isAdmin');
  }.property('session.isAdmin'),

  currentAvatar: function() {
    return this.get('session.currentAvatar');
  }.property('session.currentAvatar')

});