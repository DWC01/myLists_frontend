import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('home', {path: '/'});
  
  this.route('users', function() {
    this.route('show', {path: ':user_id'});
  });
  this.route('users.new', {path: 'sign-up'});

  this.route('sessions.new', {path: 'sign-in'});
  this.route('sessions.destroy', {path: 'sign-out'});

  this.route('passwords.new', {path: 'passwords/new'});
  this.route('passwords.edit', {path: 'passwords/reset'});
  this.route('unauthorized', {path: 'unauthorized'});
});

export default Router;
