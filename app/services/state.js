import E from 'ember';
import _ from 'npm:lodash';

import config from 'ember-app-state-slider/config/environment';
import {pluralize} from 'ember-inflector';

export default E.Service.extend({

  states: [],
  currentStateIndex: null,
  shouldAcceptStateChanges: true,

  store: E.inject.service(),

  modelNames: E.computed(function() {
    return Object
      .keys(require._eak_seen)
      .filter((module) =>
        module.indexOf(config.modulePrefix + '/models/') === 0
      )
      .map((name) => name.split('/').get('lastObject'));
  }),

  lastStateIndex: E.computed('states.[]', function() {
    return ( this.get('states.length') || 1 ) - 1;
  }),

  updateStateOncurrentStateIndexChange: E.observer('currentStateIndex', function () {
    this.setState( this.get('currentStateIndex') );
  }),

  fetchStateForModelName (modelName) {

    const store = this.get('store');

    return store
      .peekAll(modelName)
      .filter(r => !r.get('isDeleted'))
      .map(r => {
        const serializer = store.serializerFor(modelName);
        const snapshot = r._internalModel.createSnapshot();

        return serializer
            .serialize(snapshot, {includeId: true})
            .data;
      });
  },

  getCurrentState () {
    return _(this.get('modelNames'))
      .map(modelName => this.fetchStateForModelName(modelName))
      .flatten()
      .value();
  },

  fetchNewState () {
    if (
      !this.get('shouldAcceptStateChanges')

      // App-specific hack
      || !this.get('store').peekRecord('list', 'thelist').get('newTask')
    ) { return; }
    const states = this.get('states');
    const currentState = this.getCurrentState();

    // App-specific hack
    const thelist = currentState.find((r) => r.type === 'lists');
    if(thelist && !thelist.relationships['new-task'].data) {
      return;
    }

    states.pushObject(currentState);
    this.set('currentStateIndex', states.get('length'));
  },

  setState (i) {

    const states = this.get('states');
    const state = states.objectAt(i);
    if (!state) { return; }

    this.set('shouldAcceptStateChanges', false);

    const store = this.get('store');

    const stateCopy = _.cloneDeep(state);

    //console.log(JSON.stringify(stateCopy, null, 2))

    store.unloadAll();

    store.pushPayload({
      data: stateCopy
    });

    this.set('shouldAcceptStateChanges', true);
  }
});
