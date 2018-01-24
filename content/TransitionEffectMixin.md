# TransitionEffectMixin

**Purpose:** manages state changes that depend upon completion of CSS transitions.

This mixin primarily works at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline):

> **events** ➞ **methods** → setState → render → update DOM

The mixin also performs work after the DOM has been updated.

**Expects** the component to provide:
* `setState` and `render` methods compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).
* `state.effect` member indicating the name of an effect to perform.

**Provides** the component with:
* `state.effectPhase` member indicating the current phase of the effect: "before", "during", or "after". See below.
* `effect-phase-changed` event when `state.effectPhase` has changed.


## Usage

    import TransitionEffectMixin from 'elix/src/TransitionEffectMixin.js';
    class MyElement extends TransitionEffectMixin(HTMLElement) {}

You can use `TransitionEffectMixin` if your component has CSS transitions that effect or determine state. This is particularly useful for elements that need to perform work after an effect has completed.

`TransitionEffectMixin` can interoperate with [OpenCloseMixin](OpenCloseMixin) for elements that display asynchronous CSS transitions when opening and/or closing. Among other things, `OpenCloseMixin` ensures the element's `closeFinished` property returns false until the close effect has finished. That in turn allows mixins like [OverlayMixin](OverlayMixin) to wait until an overlay has closed before hiding it.


### Example

The [Drawer](Drawer) and [Toast](Toast) components are overlays with CSS transition effects for their open/close operations. Overlays are generally hidden when closed, which presents a particular challenge if you wish to create an overlay with an asynchronous closing effect: the overlay must remain visible until the closing effect has completed. Otherwise the overlay will immediately disappear, preventing the closing effect from rendering.

[`Drawer` uses `TransitionEffectMixin` to perform work after it closes](/demos/drawer.html)

By using `TransitionEffectMixin`, `Drawer` ensures that `OverlayMixin` will not hide the drawer until it the "close" effect has finished.


## Effect phases

`TransitionEffectMixin` defines an effect timing model with three phases: before, during, and after.

* before: In this phase, the element can prepare for the application of a CSS transition. E.g., before an opening effect, the element might ensure that it's visible.
* during: The element applies CSS classes or attributes to itself or shadow elements sufficient to trigger the application of one or more CSS transitions.
* after: The CSS transitions have completed, so the element can perform any necessary clean-up. E.g., after a closing effect, the element might hide itself.

The mixin tracks the effect phase as a string value in `state.effectPhase`. When an effect is started via the mixin's `startEffect` method, the mixin sets `state.effectPhase` to "before". When that state has rendered and `componentDidUpdate` is called, the mixin will immediately move to the "during" phase. The component will then rerender. The component can then apply whatever CSS transitions constitute the desired visual effect.

The second phase transition, from "during" to "after", is asynchronous, and will occur when one of the elements with defined CSS transitions raises the `transitionend` event. By default, the mixin listens to the host element for `transitionend`. If, however, you want to apply CSS transitions to shadow elements, you can override the [symbols.elementsWithTransitions](#symbols.elementsWithTransitions) property and return an array of the elements that have transitions. Once `transitionend` is received, the mixins sets `state.effectPhase` to "after", and the component can rerender if necessary.
