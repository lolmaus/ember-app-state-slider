import E from 'ember';

export default E.Controller.extend({
  state: E.inject.service(),

  list: E.computed.alias('model.firstObject'),

  actions: {
    setState (i) {
      this.get('state').setState(i);
    },

    acceptNewTask () {
      this.get('list').acceptNewTask();
    },

    editTask (task) {
      this.get('list').set('editedTask', task);
    },

    finishEditTask () {
      this.get('list').set('editedTask', null);
    },

    deleteTask (task) {
      task.deleteRecord();
      //this.get('state').fetchNewState();
    },

    clearComplete () {
      this.get('list').clearComplete();
    },

    toggleComplete () {
      this.get('list').toggleComplete();
    }
  }
});
