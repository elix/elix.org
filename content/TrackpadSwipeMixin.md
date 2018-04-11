# TrackpadSwipeMixin

**Purpose:** maps trackpad events (or horizontal mouse wheel events) to swipe gestures. This allows, for example, users of laptops with trackpads to manipulate a view or selection with a trackpad swipe. (The exact user interface gesture depends on the OS and its configuration. A common OS configuration requires the user to drag on the trackpad with two fingers to perform a swipe.)

This mixin works at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline). In response to touch events, the mixin may call methods on the component or call `setState` directly.

> **events** ➞ **methods** → setState → updates → render DOM → post-render

**Expects** the component to provide:
* `setState` method compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).
* `swipeLeft` and `swipeRight` methods. If the component defines these, the mixin will call them if the user makes a full-width drag to the left or right, respectively.

**Provides** the component with:
* `state.swipeFraction` member expressing how far through a swipe the user is currently is. See below.


## Usage

    import TrackpadSwipeMixin from 'elix/src/TrackpadSwipeMixin.js';
    class MyElement extends TrackpadSwipeMixin(HTMLElement) {}

See also the related [TouchSwipeMixin](TouchSwipeMixin), which is like `TrackpadSwipeMixin`, but for touch devices instead of trackpads.


### Example

[Swiping shows the fraction of the demo's width you have swiped](/demos/swipeDemo.html)


## `state.swipeFraction`

This mixin calculates a state member `state.swipeFraction` to track the state of a trackpad swipe operation. If no swipe is in progress, this value is null. If a swipe _is_ in progress, then `swipeFraction` holds a real number expressing the distance the user has swiped, divided by the width of the element being swiped (which, by default is the element itself). This value is negative for swipes to the left, and positive for swipes to the right.

Example: If the user touches an element with `TrackpadSwipeMixin`, and drags to the left one half of the element's width, then `swipeFraction` will be equal to -0.5.

The related [TouchSwipeMixin](TouchSwipeMixin) may also set `state.swipeFraction`, adhering to an identical definition.


## Full-width drag operations

Trackpad operations may complete while the user is still dragging. If the user drags an item a full element width to the left (`swipeFraction` is less or equal to -1) or to the right (`swipeFraction` is greater than or equal to 1), the mixin interprets this as completing a drag. The mixin will invoke the component's `swipeLeft` or `swipeRight` method (if defined).

You can use `TrackpadSwipeMixin` with [SwipeDirectionMixin](SwipeDirectionMixin) to map these `swipeLeft` and `swipeRight` calls to directional navigations. You can additionally map directional navigation operations to selection calls using [DirectionSelectionMixin](DirectionSelectionMixin). Elix's carousel components like [SlidingPages](SlidingPages) use this chain of mixins to turn flick gestures into changes in the carousel's selection:

* `swipeLeft` → `symbols.goRight` → `selectNext`
* `swipeRight` → `symbols.goLeft` → `selectPrevious`


## Trackpad timeouts

If the user slows or stops their trackpad drag operation, the operation will timeout. If the swipe is over halfway to the left or right, the mixin will invoke `swipeLeft` or `swipeRight` respectively. Otherwise, the mixin will cancel the drag and set `state.swipeFraction` to null.
