import Ember from 'ember';

export default Ember.Component.extend({  
  
  tagName: 'nav',

  classNames: [],

  attributeBindings: ['role'],

  role: 'navigation'

});