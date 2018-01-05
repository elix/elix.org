# DirectionSelectionMixin

**Purpose:** maps direction semantics (e.g., "down") to selection semantics
("selectNext").

This mixin works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `selectNext`, `selectPrevious`, `selectLast`, `selectFirst` methods.

**Provides** the component with:
* `symbols.goDown`, `symbols.goUp`, `symbols.goLeft`, `symbols.goRight` methods. 


## Usage

    import DirectionSelectionMixin from 'elix/src/DirectionSelectionMixin.js';
    class MyElement extends DirectionSelectionMixin(HTMLElement) {}


## Mapping direction semantics to selection semantics

When a direction method with a standard identifier is invoked, a corresponding
selection method is invoked:

* [symbols.goDown](symbols#goDown) → `selectNext`
* [symbols.goEnd](symbols#goEnd) → `selectLast`
* [symbols.goLeft](symbols#goLeft) → `selectPrevious` (or `selectNext` in right-to-left languages*)
* [symbols.goRight](symbols#goRight) → `selectNext` (or `selectPrevious` in right-to-left languages*)
* [symbols.goStart](symbols#goStart) → `selectFirst`
* [symbols.goUp](symbols#goUp) → `selectPrevious`

*If the component has a `rightToLeft` property that is true, the mapping of left/right to previous/next is reversed. That is, going left means going to the _next_ item, not the previous one. A typicaly way to define such a `rightToLeft` property is with [LanguageDirectionMixin](LanguageDirectionMixin).

A common use of `DirectionSelectionMixin` will be to connect the [KeyboardMixin](KeyboardMixin) and [KeyboardDirectionMixin](KeyboardDirectionMixin) above to the Elix [SingleSelectionMixin](SingleSelectionMixin). This effectively creates a chain of actions that convert keyboard events to changes in selection.

Example: a press of the Down arrow key can be handled in the following steps:

1. [KeyboardMixin](KeyboardMixin) receives the `keydown` event for the Down arrow key and
   invokes the component's `symbols.keydown` method.
2. [KeyboardDirectionMixin](KeyboardDirectionMixin) handles `symbols.keydown` for the key, and invokes
   `symbols.goDown`.
3. `DirectionSelectionMixin` handles `symbols.goDown` and invokes `selectNext`.
4. [SingleSelectionMixin](SingleSelectionMixin) handles `selectNext` and updates the selection.

This sequence may seem circuitous, but factoring the behaviors this way allows other forms of interaction. E.g., a separate mixin to handle touch gestures only has to map a "swipe left" gesture to a direction method like `goRight` in order to patch into this chain. This saves the touch logic from having to know anything about selection.
