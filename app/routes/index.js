import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    this.store.pushPayload({
      data: {
        type: 'lists',
        id:   'thelist',
        relationships: {
          tasks: {
            data: [
              {type: 'tasks', id: '1'},
              {type: 'tasks', id: '2'},
              {type: 'tasks', id: '3'},
              {type: 'tasks', id: '4'},
              {type: 'tasks', id: '5'}
            ]
          },
          'new-task': {
            data: {type: 'tasks', id: '5'}
          }
        }
      },
      included: [
        {
          type: 'tasks',
          id: '1',
          attributes: {
            name: 'Foo'
          },
          relationships: {
            list: {
              data: {
                id: 'thelist',
                type: 'list'
              }
            }
          }
        },
        {
          type: 'tasks',
          id: '2',
          attributes: {
            name: 'Bar'
          },
          relationships: {
            list: {
              data: {
                id: 'thelist',
                type: 'list'
              }
            }
          }
        },
        {
          type: 'tasks',
          id: '3',
          attributes: {
            name: 'Baz',
            'is-complete': true
          },
          relationships: {
            list: {
              data: {
                id: 'thelist',
                type: 'list'
              }
            }
          }
        },
        {
          type: 'tasks',
          id: '4',
          attributes: {
            name: 'Quux'
          },
          relationships: {
            list: {
              data: {
                id: 'thelist',
                type: 'list'
              }
            }
          }
        },
        {
          type: 'tasks',
          id: '5',
          attributes: {
            name: ''
          },
          relationships: {
            list: {
              data: {
                id: 'thelist',
                type: 'list'
              }
            }
          }
        }
      ]
    });

    return this.store.peekAll('list');
  }
});
