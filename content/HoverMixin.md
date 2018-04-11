# HoverMixin

**Purpose:** tracks whether the user has moved the mouse over an element so it can decide whether to render hover effects..

This mixin works at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline):

> **events** ➞ **methods** → setState → updates → render DOM → post-render

**Expects** the component to provide:
* `setState` method compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).

**Provides** the component with:
* `state.hover` member that is true when the mouse is over the element.
* `mouseEnter` and `mouseLeave` methods the component can use to perform additional work on `mouseEnter`/`mouseLeave`.


## Usage

    import HoverMixin from 'elix/src/HoverMixin.js';
    class MyElement extends HoverMixin(HTMLElement) {}

This mixin simplifies the task of translating mouse state into component state. This can be used, for example, to decide whether to render hover effects that must be calculated in code.
