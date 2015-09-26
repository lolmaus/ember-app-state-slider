import Ember from 'ember';

export default Ember.Component.extend({
  task: null,
  isNew: false,

  actions: {
    focusOut () {
      if (!this.get('isNew')) {
        this.send('save');
      }
    },

    save () {
      if (this.get('isNew')) {
        this.attrs.acceptNewTask();
        return
      }

      this.attrs.finishEditTask(this.get('task'));
    }
  }
});
