import Ember from 'ember';

export default Ember.Component.extend({  
  
  initSidebar: function() {
    Ember.$('.button-collapse').sideNav();
  }.on('didInsertElement'),

  tagName: 'nav',

  classNames: [],

  attributeBindings: ['role'],

  role: 'navigation'

});