# ListBox

This component presents its assigned children as items in a single-selection list box. This is modeled after the list box controls in macOS and Microsoft Windows, and the standard `select` element in HTML in its list box mode.

[Typical single-selection list box](/demos/listBox.html)

`ListBox` uses `SingleSelectionMixin` to expose a single selection. The user can click an item to select it, or navigate the selection with the keyboard (per `KeyboardDirectionMixin`, `KeyboardPagedSelectionMixin`, and `KeyboardPrefixSelectionMixin`).

By default, a `ListBox` shows a generic visual style. The selected item is shown with standard highlight colors (CSS `highlight` color for the background, `highlighttext` for the text). You can create custom subclasses of ListBox that override the `updates` property to provide custom styling.

The ListBox exposes an `orientation` property that can either by "vertical" (the default), or "horizontal". Internally, the orientation is tracked as `state.orientation`.


[A horizontal list](/demos/horizontalList.html)

The ListBox applies `SelectedItemTextValueMixin` (below) to expose a `value` property.

Lists typically obtain their items from their child elements using `SlotContentMixin`. However, it is easy to create variations of `ListBox` for lists with hard-coded content. The custom list box below uses the same mixins as `ListBox`, but omits `SlotContentMixin`. Instead, it draws its content from a hard-coded set of items in its template.

[A list with hard-coded items](/demos/countryListBox.html)

You could create such components in cases where you want to ensure a particular set of items is always provided.


## Usage

    import ListBox from 'elix/src/ListBox.js';

    const listBox = new ListBox(); // or
    const listBox = document.createElement('elix-list-box');

    <elix-list-box>
      <!-- List items go here -->
    </elix-list-box>

Single-selection list boxes are common in user interfaces. As written, the `ListBox` component supports the same use cases as a standard `select` element in list box mode (with the `size` attribute set to a value greater than 1). The standard `select`, however, has many constraints on what can be done with it, forcing developers to recreate much of its functionality. The advantage of providing `ListBox` as a web component is that developers are free to extend it to meet the needs of their interface. For example, one use case for `ListBox` is a horizontal list (instead of the fixed vertical orientation provided by `select`).
