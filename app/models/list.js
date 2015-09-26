import E     from 'ember';
import DS    from 'ember-data';
import faker from 'npm:faker';

import ModelSaveStateMixin from 'ember-app-state-slider/mixins/model-save-state';

export default DS.Model.extend(ModelSaveStateMixin, {
  tasks:      DS.hasMany(   'task', {async: false} ),
  newTask:    DS.belongsTo( 'task', {async: false} ),
  editedTask: DS.belongsTo( 'task', {async: false} ),

  activeTasks: E.computed('tasks.@each.isDeleted', 'newTask', function() {
    const newTask = this.get('newTask');

    return this
      .get('tasks')
      .filter(t => t !== newTask && !t.get('isDeleted'));
  }),

  produceNewTask () {
    return this.store.createRecord('task', {
      id:   faker.random.uuid(),
      list: this
    });
  },

  acceptNewTask () {
    this.set('newTask', this.produceNewTask());
  }
});
