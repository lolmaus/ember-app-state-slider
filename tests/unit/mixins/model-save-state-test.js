import Ember from 'ember';
import ModelSaveStateMixin from '../../../mixins/model-save-state';
import { module, test } from 'qunit';

module('Unit | Mixin | model save state');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModelSaveStateObject = Ember.Object.extend(ModelSaveStateMixin);
  var subject = ModelSaveStateObject.create();
  assert.ok(subject);
});
