# FocusVisibleMixin

**Purpose:** Tracks a component's focus state so that it can render a focus indication (e.g., a glowing outline) if and only if the user has used the keyboard to interact with the component. This is modeled after the proposed
[focus-visible](https://github.com/WICG/focus-visible) feature for CSS.

This mixin works at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline):

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `setState` method compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).


**Provides** the component with:
* `state.focusVisible` member that is true if the element should render focus.


## Usage

    import FocusVisibleMixin from 'elix/src/FocusVisibleMixin.js';
    class MyElement extends FocusVisibleMixin(HTMLElement) {}

`FocusVisibleMixin` is appropriate for all components that can receive the keyboard focus but only want to show the focus when the keyboard is actually being used. This is generally useful on mobile devices such as phones, where most users don't need or want to see the keyboard focus.

See also [KeyboardMixin](KeyboardMixin), which can be used to handle keyboard events.


### Example

[These custom buttons only show focus for keyboard activity](/demos/focusVisible.html)


## Heuristic

This mixin sets `state.focusVisible` if the last UI event received before the element got the focus was a keyboard event (and not a mouse/touch event).

`FocusVisibleMixin` also tracks focus visibility across changes in window focus. If an element has `state.focusVisible` set to true (i.e., it should show focus state) and the window loses focus, then `state.focusVisible` will be set to false. If the window later regains focus, then the browser will restore focus to the previously-focused element, and `state.focusVisible` will be set to true again.

To see this, use the keyboard to move the focus to one of the buttons in the demo above. Then tab away from that window. The button should drop its visible focus. Then tab back to the window. The button should once again show its visible focus.