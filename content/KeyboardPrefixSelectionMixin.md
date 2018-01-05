# KeyboardPrefixSelectionMixin

**Purpose:** handles list box-style prefix typing, in which the user can type a string to select the first item that begins with that string.

This mixin works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods** ➞ **setState** → render → update DOM

**Expects** the component to provide:
* `items` property that returns the list's items. You can supply that with [ContentItemsMixin](ContentItemsMixin).
* `state.selectedIndex` state member updatable via [setState](ReactiveMixin#setState).
* `symbols.keydown` method, usually defined by [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Mappings of keyboard events to selection operations.


## Usage

    import KeyboardPrefixSelectionMixin from 'elix/src/KeyboardPrefixSelectionMixin.js';
    class MyElement extends KeyboardPrefixSelectionMixin(HTMLElement) {}


## Example

[A list box that supports prefix typing](/demos/listBox.html)

If this component receives the focus, and you press the "b" or "B" key, the "Banana" item will be selected, because it's the first item that matches the prefix "b". (Matching is case-insensitive.) If you now presses the "l" or "L" key quickly, the prefix to match becomes "bl", so "Blackberry" will be selected.

The prefix typing feature has a one second timeout — the prefix to match will be reset after a second has passed since you last typed a key. If, in the above example, you wait a second between typing "b" and
"l", the timeout will reset the prefix to empty. When the "l" key is pressed, "Lemon" will be selected.

If you press the Backspace key, the last character is removed from the prefix under construction. This re-selects the first item that matches the new, shorter prefix. Suppose you type "c", and "Cantaloupe" is selected, then type "h" to select "Cherry". If you now immediately press Backspace (before the aforementioned one second timeout elapses), the prefix will revert to "C", and "Cantaloupe" will be reselected.


## Extracting item text

To extract the text of an item, the mixin invokes a method [symbols.getItemText](symbols#getItemText) on each item. The default behavior of that method is to return the item's `alt` attribute or, if that does not exist, its `textContent`. This allows a component user to customize which text the prefix will be matched against.
