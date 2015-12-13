import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';
import ENV from "frontend/config/environment";
import Cookies from 'npm:js-cookie';


export default ActiveModelAdapter.extend({
  namespace: 'api',
  host: Ember.computed(function() {
    return ENV.APP.base_url;
  }).property(),
  headers: Ember.computed(function() {

    var auth_token = Cookies.get('user_session');
    if (auth_token) {
      return {'Authorization': 'Token token=' + '"' + auth_token + '"'};
    } 
  }).property().volatile(),

  handleResponse: function(status, headers, payload) {
	  if (status === 422) {
	    return payload;
	  }
	  return this._super(status, headers, payload);
	}
});