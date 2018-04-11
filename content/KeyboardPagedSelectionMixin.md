# KeyboardPagedSelectionMixin

**Purpose:** map the Page Up and Page Down keys to selection operations.

This mixin works in the middle of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → **methods** ➞ **setState** → updates → render DOM → post-render

**Expects** the component to provide:
* `state.selectedIndex` state member updatable via [setState](ReactiveMixin#setState).
* `symbols.keydown` method, usually defined by [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Mappings from page navigation keyboard events to selection operations.


## Usage

    import KeyboardPagedSelectionMixin from 'elix/src/KeyboardPagedSelectionMixin.js';
    class MyElement extends KeyboardPagedSelectionMixin(HTMLElement) {}


## Example

The following [ListBox](ListBox) shows the mixin in use:

[A list box that supports Page Up and Page Down](/demos/listBox.html)

The paging behavior is modeled after that of standard Microsoft Windows list boxes, which seem to provide more useful keyboard paging than those in macOS:

* The Page Up and Page Down keys actually change the selection, rather than just
  scrolling. The former behavior seems more generally useful for keyboard users,
  as they can see where the selection is, and can easily refine the selection
  after paging by using the arrow keys.

* Pressing Page Up/Page Down will change the selection to the topmost/bottommost
  visible item if the selection is not already there. Thereafter, the key will
  move the selection up/down by a page.

The `KeyboardPagedSelectionMixin` only updates the selection by setting the `selectedIndex` property. It does not itself scroll the component. That responsibility can be fulfilled with [SelectionInViewMixin](SelectionInViewMixin).

This mixin relies on [symbols.keydown](symbols#keydown) being invoked. That will typically be done with [KeyboardMixin](KeyboardMixin), but you can also invoke that yourself.
