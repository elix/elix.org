# Modes

Shows exactly one of its assigned children at any given time. It can be thought of as a list that only shows the currently selected item.

[Modes controlled with Left/Right keyboard keys](/demos/modesWithKeyboard.html)

`Modes` uses [SingleSelectionMixin](SingleSelectionMixin) to expose a single selection. A developer must programmatically modify which item is currently visible, as `Modes` provides no user interface itself.


## Usage

You can use `Modes` for any portion of a UI with a modal state that can display two or more different sets of UI controls depending upon the state. This pattern is so common that many developers rarely think of it as entailing any complexity. Historically, they have often created a containing `div` holding an inner `div` for each modal state, then show the `div` for the current state and hide the rest. But rewriting that code each time is slow, error-prone, and not universally accessible.

The [Tabs](Tabs) component combines a `Modes` instance with a [TabStrip](TabStrip). The tab strip lets the user know how many panels there are, and lets them easily navigate between the modal panels.

See also [SlidingViewport](SlidingViewport) and its related components. Those handle similar situations, but express the modes as pages on a horizontally-sliding surface.
