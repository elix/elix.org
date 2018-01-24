# ClickSelectionMixin

**Purpose:** map a click (actually, a mousedown) to an item selection. This simple mixin is useful in list-like elements like [ListBox](ListBox), where a click on a list item implicitly selects it.


This mixin works at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline):

> **events** ➞ **setState** → render → update DOM

**Expects** the component to provide:
* `state.selectedIndex` property indicating the index of the currently selected item. This is usually provided by [SingleSelectionMixin](SingleSelectionMixin).
* `items` property representing the items that can be selected. This is usually provided by [ContentItemsMixin](ContentItemsMixin).

**Provides** the component with:
* Logic that updates `state.selectedIndex` to the index of the item the user clicked.


## Usage

    import ClickSelectionMixin from 'elix/src/ClickSelectionMixin.js';
    class MyElement extends ClickSelectionMixin(HTMLElement) {}


The standard use for this mixin is in list-like elements that support a mouse and/or touch for selection.


### Example

[This typical ListBox selects an item when you click/tap it.](/demos/listBox.html)


## Handling clicks/taps

Native list boxes don't appear to be consistent with regard to whether they select on `mousedown` or `click`/`mouseup`. This mixin assumes the use of `mousedown`. On touch devices, that event appears to trigger when the touch is _released_.

This mixin only listens to `mousedown` events for the primary mouse button (typically the left button. Right-clicks are ignored so that, among other things, the browser may display a context menu.

Much has been written about how to ensure "fast tap" behavior on mobile devices. This mixin makes a very straightforward use of a standard event, and this appears to perform well on mobile devices when,e.g., the viewport is configured with `width=device-width`.

If the component receives a clicks that doesn't correspond to an item (e.g., the user clicks on a portion of the element background which is visible between items), the selection will be removed. However, if the component sets `state.selectionRequired` to true, a background click will *not* remove the selection.
