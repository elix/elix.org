# TouchSwipeMixin

**Purpose:** maps touch events to swipe gestures.

This mixin works at the beginning of the Elix user interface [pipeline](pipeline). In response to touch events, the mixin may call methods on the component or call `setState` directly.

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `setState` method compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).
* `swipeLeft` and `swipeRight` methods. If the component defines these, the mixin will call them if the user makes a flick (fast swipe) gesture in the left or right direction, respectively.

**Provides** the component with:
* `state.swipeFraction` member expressing how far through a swipe the user is currently is. See below.


## Usage

    import TouchSwipeMixin from 'elix/src/TouchSwipeMixin.js';
    class MyElement extends TouchSwipeMixin(HTMLElement) {}

See also the related [TrackpadSwipeMixin](TrackpadSwipeMixin), which is like `TouchSwipeMixin`, but for trackpads instead of touch devices.


### Example

[Swiping shows the fraction of the demo's width you have swiped](/demos/swipeDemo.html)


## `state.swipeFraction`

This mixin calculates a state member `state.swipeFraction` to track the state of a touch swipe operation. If no swipe is in progress, this value is null. If a swipe _is_ in progress, then `swipeFraction` holds a real number expressing the distance the user has swiped, divided by the width of the element being swiped (which, by default is the element itself). This value is negative for swipes to the left, and positive for swipes to the right.

Example: If the user touches an element with `TouchSwipeMixin`, and drags to the left one half of the element's width, then `swipeFraction` will be equal to -0.5.

The related [TrackpadSwipeMixin](TrackpadSwipeMixin) may also set `state.swipeFraction`, adhering to an identical definition.


## Completing a swipe

When the user lifts their finger to complete a swipe, the mixin inspects the current value of `state.swipeFraction`:

* If the drag is over halfway to the left (`swipeFraction` less than -0.5), the mixin will invoke the component's `swipeLeft` method (if defined).
* Conversely, if the drag ends over halfway to the right (`swipeFraction` greater than 0.5), the mixin will invoke `swipeRight` (if defined).

In all cases, when the drag completes, the mixin will set `state.swipeFraction` to null.


## Flick gestures

If the user ends a swipe at high speed, the gesture is interpreted as a flick. If the flick is to the left, the mixin will invoke the component's `swipeLeft` method (if defined). Conversely, if the flick is to the right, the mixin will invoke `swipeRight` (if defined).

You can use `TouchSwipeMixin` with [SwipeDirectionMixin](SwipeDirectionMixin) to map these `swipeLeft` and `swipeRight` calls to directional navigations. You can additionally map directional navigation operations to selection calls using [DirectionSelectionMixin](DirectionSelectionMixin). Elix's carousel components like [SlidingPages](SlidingPages) use this chain of mixins to turn flick gestures into changes in the carousel's selection:

* `symbols.swipeLeft` → `symbols.goRight` → `selectNext`
* `symbols.swipeRight` → `symbols.goLeft` → `selectPrevious`
