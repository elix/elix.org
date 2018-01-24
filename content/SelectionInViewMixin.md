# SelectionInViewMixin

**Purpose:** ensures the selected item is scrolled into view.

This mixin works at the very end of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → methods → setState → updates → DOM

**Expects** the component to provide:
* `items` property that returns the list's items. You can supply that with [ContentItemsMixin](ContentItemsMixin).
* `state.selectedIndex` state member updatable via [setState](ReactiveMixin#setState).

**Provides** the component with:
* Automatic scrolling of the selected item into view.
* `scrollSelectionIntoView` method to force the currently-selected item into view.


## Usage

    import SelectionInViewMixin from 'elix/src/SelectionInViewMixin.js';
    class MyElement extends SelectionInViewMixin(HTMLElement) {}

In horizontally or vertically scrollable lists, the component may be asked to select an item which is not currently in view. The `SelectionInViewMixin` listens for changes in the selection and, if the newly-selected item is not in view, scrolls the component by the minimum amount necessary to bring the item into view.

For reference, the Blink engine has a `scrollIntoViewIfNeeded()` function that does something similar, but unfortunately it's non-standard, and often ends up scrolling more than is absolutely necessary.


### Example

[A list that keeps its selection (if one exists) in view](/demos/listBox.html)

The above [ListBox](ListBox) lets users navigate the selection with the keyboard using Up/Down keys, Page Up/Page Down, Home/End. Navigation in the list is handled by [KeyboardDirectionMixin](KeyboardDirectionMixin) and [KeyboardPagedSelectionMixin](KeyboardPagedSelectionMixin). Those mixins only change the selected item, but not directly scroll the list. It is `SelectionInViewMixin` that scrolls the list to ensure a newly-selected item is made visible.


## Determining which element to scroll

The component's scrolling surface may be the component itself, or it may be an element within the component's shadow subtree. By default, `SelectionInViewMixin` will try to determine which element should be scrolled. If the component has a default (unnamed) `<slot>`, the mixin will find the closest ancestor of that slot that has `overflow: auto` or `overflow: scroll`. If no such element is found, the component itself will be assumed to be the scrollable element.

A component can also explicitly indicate which of its shadow subtree elements should be scrolled by defining a property called [symbols.scrollTarget](symbols#scrollTarget) that returns the desired element.
