# SwipeDirectionMixin

**Purpose:** maps swipe gestures to direction semantics.

This mixin works in the middle of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → **methods** ➞ **methods** → setState → updates → render DOM → post-render

**Expects** the component to provide:
* `symbols.goLeft` and `symbols.goRight` methods, e.g., by applying [DirectionSelectionMixin](DirectionSelectionMixin).

**Provides** the component with:
* `swipeLeft` and `swipeRight` methods compatible with [TouchSwipeMixin](TouchSwipeMixin) and [TrackpadSwipeMixin](TrackpadSwipeMixin).


## Usage

    import SwipeDirectionMixin from 'elix/src/SwipeDirectionMixin.js';
    class MyElement extends SwipeDirectionMixin(HTMLElement) {}


## Mapping swipe gestures to direction semantics

This mixin maps a `swipeLeft` call to [symbols.goRight](symbols#goRight), and a `swipeRight` call to [symbols.goLeft](symbols#goLeft). Note that the reversal of direction in those mappings: e.g., a swipe to the left means the user wants to go _right_, because the user is typically dragging something in from the right.
