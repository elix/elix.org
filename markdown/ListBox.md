# ListBox

This component presents its assigned children as items in a single-selection
list box. This is modeled after the list box controls in macOS and Microsoft
Windows, and the standard `select` element in HTML in its list box mode.

`ListBox` uses `SingleSelectionMixin` to expose a single selection. The user can
click an item to select it, or navigate the selection with the keyboard (per
`KeyboardDirectionMixin`, `KeyboardPagedSelectionMixin`, and
`KeyboardPrefixSelectionMixin`).

By default, the selected item is shown with standard highlight colors (CSS
`highlight` color for the background, `highlighttext` for the text). This will
eventually be configurable with CSS, although Elix is still working out a
general theming strategy.

The ListBox exposes an `orientation` property that can either by "vertical" (the
default), or "horizontal". Moreover, the list reflects its `orientation`
property value as an attribute to simplify conditional styling.

The ListBox applies `SelectedItemTextValueMixin` (below) to expose a `value`
property.

By default, a `ListBox` shows a generic visual style. Once the Elix project
establishes a theming strategy, we will allow developers to style a `ListBox`
instance with CSS.

## Use cases

Single-selection list boxes are common in user interfaces. As written, the
`ListBox` component supports the same use cases as a standard `select` element
in list box mode (with the `size` attribute set to a value greater than 1). The
standard `select`, however, has many constraints on what can be done with it,
forcing developers to recreate much of its functionality. The advantage of
providing `ListBox` as a web component is that developers are free to extend it
to meet the needs of their interface. For example, one use case for `ListBox`
is a horizontal list (instead of the fixed vertical orientation provided by
`select`).
