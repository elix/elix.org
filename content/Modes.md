# Modes

The `Modes` component shows exactly one of its assigned children at any given
time. It can be thought of as a list that only shows the currently selected
item.

[Modes controlled with Left/Right keyboard keys](/demos/modesWithKeyboard.html)

`Modes` uses [SingleSelectionMixin](SingleSelectionMixin) to expose a single
selection. A developer must programmatically modify which item is currently
visible, as `Modes` provides no user interface itself.

The `Modes` class is registered as element `<elix-modes>`.

## Usage

`Modes` can be used for any portion of a UI with a modal state that can display
two or more different sets of UI controls depending upon the state. This pattern
is so common that developers rarely think of it as a thing itself. Historically,
they have often created a containing `div` holding an inner `div` for each modal
state, then show the `div` for the current state and hide the rest. But
rewriting that code each time is slow and error-prone. `Modes` serves this need
in much the same way as Polymer's `iron-pages` component.
