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

  completeTasks: E.computed.filterBy('activeTasks', 'isComplete', true),

  produceNewTask () {
    return this.store.createRecord('task', {
      id:   faker.random.uuid(),
      list: this
    });
  },

  acceptNewTask () {
    this.set('newTask', this.produceNewTask());
  },

  clearComplete () {
    this
      .get('completeTasks')
      .forEach(t => t.deleteRecord());
  },

  toggleComplete () {
    const value = this.get('completeTasks.length') !== this.get('activeTasks.length');

    this
      .get('activeTasks')
      .forEach(t => t.set('isComplete', value));
  }
});
