# ResizeMixin

**Purpose:** Allow components that want to perform layout based on their size to re-render when their size changes.

This mixin does its work at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline).

> **events** ➞ **methods** → setState → updates → render DOM → post-render

**Expects** the component to provide:
* `setState` method compatible with `ReactiveMixin`'s [setState](ReactiveMixin#setState).

**Provides** the component with:
* `state.clientHeight` and `state.clientWidth` members that track the component's `clientHeight` and `clientWidth`. Tracking these as state allows changes in size to trigger a re-render of the component.

This mixin can only guarantee results on browsers that support `ResizeObserver` (as of 22 Mar 2018, only Google Chrome).

On other browsers, the mixin will check the component's size when it is first mounted and when it's finished rendering. It will also check the size if the window resizes. This can catch most cases, but is somewhat inefficient, and misses cases where a component changes size for reasons beyond the component's awareness (e.g., CSS finished loading, something else on the page changed that forced a change in the component's size).


## Usage

    import ResizeMixin from 'elix/src/ResizeMixin.js';
    class MyElement extends ResizeMixin(HTMLElement) {}


### Example

[CenteredStrip](CenteredStrip) has custom layout logic that keeps the selected item centered when possible. Accordingly, `CenteredStrip` uses `ResizeMixin` so that, it can recalculate its layout if it changes size.
