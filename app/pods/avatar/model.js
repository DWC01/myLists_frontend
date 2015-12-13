import DS from 'ember-data';

export default DS.Model.extend({
  user:       DS.belongsTo('user'),
  
  name:         DS.attr('string'),
  meta_data:    DS.attr('string'),
  original_url: DS.attr('string'),
  profile_url:  DS.attr('string'),
  nav_url:      DS.attr('string'),
  user_id:      DS.attr('number'),
  created_at:   DS.attr('date'),
  updated_at:   DS.attr('date')
});