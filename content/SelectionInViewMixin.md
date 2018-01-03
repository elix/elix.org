# SelectionInViewMixin

In horizontally or vertically scrollable lists, the component may be asked to select an item which is not currently in view. The `SelectionInViewMixin` listens for changes in the selection and, if the newly-selected item is not in view, scrolls the component by the minimum amount necessary to bring the item into view.

The following [ListBox](ListBox) lets users navigate the selection with the keyboard using Up/Down keys, Page Up/Page Down, Home/End. Navigation is handled by [KeyboardDirectionMixin](KeyboardDirectionMixin) and [KeyboardPagedSelectionMixin](KeyboardPagedSelectionMixin). Those mixins only change the selected item, but not directly scroll the list. Instead, as the user changes the selection, `SelectionInViewMixin` keeps the selection visible.

[A list that keeps its selection (if one exists) in view](/demos/listBox.html)

For reference, the Blink engine has a `scrollIntoViewIfNeeded()` function that does something similar, but unfortunately it's non-standard, and often ends up scrolling more than is absolutely necessary.

The component's scrolling surface may be the component itself, or it may be an element within the component's shadow subtree. By default, `SelectionInViewMixin` will try to determine which element should be scrolled. If the component has a default (unnamed) `<slot>`, the mixin will find the closest ancestor of that slot that has `overflow: auto` or `overflow: scroll`. If no such element is found, the component itself will be assumed to be the scrollable element.

A component can also explicitly indicate which of its shadow subtree elements should be scrolled by defining a property called [symbols.scrollTarget](symbols#scrollTarget) that returns the desired element.
