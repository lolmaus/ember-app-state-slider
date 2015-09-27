import DS from 'ember-data';

import ModelSaveStateMixin from 'ember-app-state-slider/mixins/model-save-state';

export default DS.Model.extend(ModelSaveStateMixin, {

  name:       DS.attr('string'),
  isComplete: DS.attr('boolean', {defaultValue: false}),

  list: DS.belongsTo('list', {async: false, inverse: 'tasks'})
});
