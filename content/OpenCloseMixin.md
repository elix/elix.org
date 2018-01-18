# OpenCloseMixin

**Purpose:** tracks the opened/closed state of an element with open/close semantics, such as a [Dialog](Dialog), [Drawer](Drawer), [Popup](Popup), or [Toast](Toast). It allows for the possibility that the open/close operations are asynchronous.

This mixin works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods/properties** ➞ **state** → render

**Expects** the component to provide:
* `setState` method, usually supplied by [ReactiveMixin](ReactiveMixin).

**Provides** the component with:
* `state.opened` member that is true if the element is open, false if closed.
* `opened` property that reflects the internal state of `state.opened`.
* `closed` property that is the inverse of `opened`.
* `toggle` method that toggles the opened/closed state.
* `open` method that opens the element.
* `close` method that closes the element.
* `state.openCloseEffects` member that defaults to true if this mixin is used in combination with [TransitionEffectMixin](TransitionEffectMixin).
* `closeFinished` property. By default, this is the same value as the `close` property. If `state.openCloseEffects` (see above) is true, then `closeFinished` is true only after the `close` effect has finished (reached the `after` phase). See asynchronous effects, below.


## Usage

    import OpenCloseMixin from 'elix/src/OpenCloseMixin.js';
    class MyElement extends OpenCloseMixin(HTMLElement) {}

You can use `OpenCloseMixin` to provide any component that conceptually opens and closes with a consistent open/close API. This can make things easier for developers to use your component.

Using `OpenCloseMixin` allows makes it easy to take advantage of related Elix mixins, including [DialogModalityMixin](DialogModalityMixin), [OverlayMixin](OverlayMixin), [PopupModalityMixin](PopupModalityMixin), and [TransitionEffectMixin](TransitionEffectMixin). However, `OpenCloseMixin` can be used for components which aren't overlays, such as components that expand or open in place.

### Example

[Overlays like dialogs can use `OpenCloseMixin` for a consistent API](/demos/dialog.html)


## Asynchronous open/close effects

Many components that open and close do so with asynchronous transitional effects: fading in, sliding in, etc., when opened, then fading out or sliding out when closed. Such effects can add considerable complexity to an element's state, making it hard to define exactly when a component has "opened" or "closed".

[A Drawer has asynchronous open/close transition effects](/demos/drawer.html)

To support such effects, `OpenCloseMixin` interoperates with [TransitionEffectMixin](TransitionEffectMixin). When used in combination, `OpenCloseMixin` will:

* Assume an element is completely closed by default. The default `state.effect` is "close", and the default `state.effectPhase` is "after".
* Define `state.openCloseEffects` to be true by default — i.e., that the element wants to use transition effects for open/close operations.
* Trigger the "open" effect when the element is opened by any means (the `open` or `toggle` methods, or setting `opened` to true). This sets `state.effect` to "open" and the phase to "before". `TransitionEffectMixin` will then manage the remaining phases of the effect.
* Conversely, trigger the "close" effect when the element is closed by any means.
