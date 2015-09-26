# Immutable state management in Ember

This is a crude todo app.

You have to fiddle with it for a while: create new todos, edit existing, delete, create some more, etc. Then use the slider to switch between states you just produced.

Read the post to the right for details.

[Demo](http://ember-app-state-slider.divshot.io/)


### Preamble

Hey. [@lolmaus](https://github.com/lolmaus) here.

Throughout the last year, every JS meetup got me increasingly bored with the hype around React and related "architectures" like Flux, Redux, Reflux, etc.

From a characteristic reactboy's perspective, one of the most important React features is that all the application state is stored in a single enormous plain object, which can be immutable. On every user action, a new state object instance is produced. By not throwing previous state object instances away, you can efforlessly implement undo-redo functionality.

Some reactboys are so hyped on this that they literally consider the React paradigm to be the only "true" way to develop interfaces. Ember's OOP paradigm in their eyes is inherently broken.


### What's this

On the recent MoscowJS meetup, the brightest demo of React immutability virtues was [a TodoMVC app](https://github.com/calesce/redux-slider-monitor) that saved previous states and allowed switching between them with a slider. By steadily dragging the slider you could see all your edits sequentially (dis)appearing.

I decided to implement the same thing in Ember to demonstrate that immutable state management in not a feature specific to React.

I didn't put much effor into it, made it over an idle Saturday afternoon. **The whole thing is only about 150 lines long** (with up to a half of 'em being non-meaningful lines). I spent more time on building the todo functionality. Was too lazy to use a TodoMVC boilerplace, so no good looks.


### How it works

It consists of a [service](https://github.com/lolmaus/ember-app-state-slider/blob/development/app/services/state.js) to manage states and a [mixin](https://github.com/lolmaus/ember-app-state-slider/blob/development/app/mixins/model-save-state.js) to let models records notify the service of changes. If you don't include the mixin, you can instead manually configure a model to poke the service when necessary.

**The implementation should work with any Ember Data models and you don't need to customize anything in your app**.

But keep in mind that it's just a quick proof of concept. It will blow up users' RAM if you use it in production.


### What can be improved

The implementation is naive: it watches for every attribute or relationship change. When a relationship changes, Ember does its relationship bookkeeping, producing intermediate states. Those intermetdiate states should be filtered out. Currently only a very crude check filters out a certain invalid intermediate state and leaves the rest.
