# SingleSelectionMixin

**Purpose:** Updates component state to track a single selected item at a time. It includes a public API for setting and retrieving the selected item, as well as methods for moving the selection with cursor operations.

This mixin generally works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods/properties** ➞ **state** → render

**Expects** the component to provide:
* `setState` method, usually supplied by [ReactiveMixin](ReactiveMixin).
* `items` property representing the items that can be selected. This is usually provided by [ContentItemsMixin](ContentItemsMixin).

**Provides** the component with:
* `state.selectedIndex` property that tracks the index of the currently selected item.
* `selectFirst()`, `selectLast()`, `selectNext()`, and `selectPrevious()` methods to set and move the selection.


## Usage

`SingleSelectionMixin` is designed to support components that let the user select a single thing at a time. This is generally done to let the user select a value (e.g., as the target of an action, or in configuring something), or as a navigation construct (where only one page/mode is visible at a time).

Examples:

* List boxes such as [ListBox](ListBox).
* Dropdown lists and combo boxes
* Carousels such as [SlidingCarousel](SlidingCarousel).
* Slideshows
* Tab UIs (including top-level navigation toolbars that behave like tabs) such as [Tabs](Tabs).


### Example

    // A sample element that supports single-selection on its children.
    class SimpleList extends SingleSelectionMixin(ReactiveMixin(HTMLElement)) {
      get items() {
        return this.children;
      }
    }

    const list = new SimpleList();
    list.innerHTML = `
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
    `;
    list.selectedIndex = 0;   // Select the first item
    list.selectedItem         // <div>Zero</div>
    list.selectNext();        // Select the next item
    list.selectedItem         // <div>One</div>
    list.selectedIndex        // 1

The following is a slightly expanded demo of the above, adding the ability to click an item to select it, and styling to highlight the selected item with color:

[SingleSelectionMixin applied to HTMLElement](/demos/singleSelection.html)

Here, the currently-selected item is tracked with `SingleSelectionMixin`.


# The `items` collection

`SingleSelectionMixin` manages a selection within an identified collection of HTML elements. A component identifies that collection by defining a read-only `items` property. A simplistic implementation of `items` return the component's children:

    class SimpleList extends SingleSelectionMixin(HTMLElement) {
      get items() {
        return this.children;
      }
    }

Note: The above definition for `items` is too simplistic, as it does not support the Gold Standard checklist item [Content Assignment](https://github.com/webcomponents/gold-standard/wiki/Content-Assignment), but it can suffice here for demonstration purposes. A more complete component could use [SlotContentMixin](SlotContentMixin) and [ContentItemsMixin](ContentItemsMixin) to meet the Gold Standard criteria.

The key point is that the component provides the collection of items, and they can come from anywhere. The component could, for example, indicate that the items being managed reside in the component's own Shadow DOM subtree:

    class ShadowList extends SingleSelectionMixin(ReactiveMixin(HTMLElement)) {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Populate shadow subtree it with elements.
      }
      get items() {
        return this.shadowRoot.children;
      }
    }

For flexibility, SingleSelectionMixin can work with an `items` collection of type `NodeList` (as in the above examples) or `Array` (e.g., if the component wants to filter elements for use as items).

The `items` property should normally be defined in terms of component state. This ensures that `SingleSelectionMixin` will be notified when the component's state changes.


## The selected item

Components managing selection often want to reference the selection in two different ways: 1) by index and 2) by object reference. `SingleSelectionMixin` supports both approaches with complementary properties that can _both_ be get/set, and that are automatically kept in sync:

* `selectedIndex`. This is the zero-based index of the currently selected item
  within the `items` collection. If there is no selection, `selectedIndex` is -1.
  When this property changes as a result of internal component activity, the
  mixin raises a `selected-index-changed` event.
* `selectedItem`. This is a reference to the currently selected
  HTMLElement in the `items` collection. If there is no selection,
  `selectedItem` is null. When this property changes as a result of internal
  component activity, the mixin raises a `selected-item-changed` event.

Updating one of these properties also updates the other, as shown in the first `SimpleList` example at the beginning of this document. Setting either property will raise _both_ the `selected-index-changed` and `selected-item-changed` events.


# Per-item selection state

`SingleSelectionMixin` helps map a component's overall selection state (which item is selected?) to the selection states of individual items (is this item currently selected or not?). When the `selectedItem` property changes, the mixin invokes a method, `itemSelected` so that other mixins can update any per-item selection state. The `itemSelected` method will be invoked either once or twice:

* If there had previously been a selection, the old item is passed to
  `itemSelected` along with a value of `false` to indicate the item is no longer
  selected.
* If there is now a new selected item, the new item is passed to `itemSelected`
  along with a value of `true` to indicate it is now selected.

Example: A simple ARIA mixin could manage the `aria-selected` value for selected items.

    import symbols from './symbols';

    const SimpleAriaMixin = (base) => class SimpleAria extends base {

      // Mark new items as unselected by default.
      [symbols.itemAdded](item) {
        item.setAttribute('aria-selected', false);
      }

      // Update the aria-selected attribute to reflect a change in item state.
      [symbols.itemSelected](item, selected) {
        item.setAttribute('aria-selected', selected);
      }
    }

The above code is provided for reference only. A more complete implementation of the attributes required for full ARIA supports is provided by [AriaListMixin](AriaListMixin).


### Updating the selection in response to `itemsChanged`

When the component invokes `itemsChanged`, `SingleSelectionMixin` tracks any changes the mutations entail for the `selectedIndex` and `selectedItem` properties. In particular, there are situations in which the selected item might be moved within the `items` collection. Suppose a list has three items, and the selected item is moved:

    list.selectedIndex = 0;
    list.appendChild(list.items[0]);  // Move selected item to end of list.
    list.selectedIndex                // Now this is 2, since item moved.

The above example would raise the `selected-index-changed` event but _not_ the `selected-item-changed` event, because the `selectedIndex` property changed but the `selectedItem` property did not.

Similarly, if the selected item is removed from the `items` collection, the `selectedIndex` and `selectedItem` properties will be reset to -1 and null, respectively. (Unless `selectionRequired` is true, see below.)

When `SingleSelectionMixin` has finished updating the selection properties, it raises an `items-changed` event.


# Requiring a selection

The `SingleSelectionMixin` defines a `selectionRequired` property. If true, the component will always have a selection as long as it has at least one item. By default, `selectionRequired` is false. This is appropriate, for example, in components like list boxes or combo boxes which initially may have no selection.

Some components do require a selection. An example is a carousel: as long as the carousel contains at least one item, the carousel should always show some item as selected. Such components can set `selectionRequired` to true.

When `selectionRequired` is true, the following checks are performed when `itemsChanged` is invoked:

* If items exist and no selection has been established, the first item is
  selected by default.
* If the selected item is removed, a new item is selected. By default, this is
  the item with the same index as the previously-selected item. If that index no
  longer exists because one or more items at the end of the list were removed,
  the last item in the new set is selected.
* If all items have been removed, `selectedIndex` and `selectedItem` are reset
  to -1 and null, respectively.


# Cursor operations

The selection can be programmatically manipulated via cursor methods:

* `selectFirst`. Selects the first item.
* `selectLast`. Selects the last item.
* `selectNext`. Selects the next item in the list. Special case: if no item is
  currently selected, but items exist, this selects the first item. This case
  covers list-style components that receive the keyboard focus but do not yet
  have a selection. In such a case, advancing the selection (with, say, the Down
  arrow) can be implicitly interpreted as selecting the first item.
* `selectPrevious`. Selects the previous item in the list. Special case: if no
  item is currently selected, but items exist, this selects the last item. As
  with `selectNext`, this behavior covers list-style components.

If `items` has no items, these cursor operations have no effect.

All cursor methods return a boolean value: true if they changed the selection, false if not.


## Selection wrapping

In some cases, such as carousels, cursor operations should wrap around from the last item to the first and vice versa. This optional behavior, useful in carousel-style components and slideshows, can be enabled by setting the mixin's `selectionWraps` property to true. The default value is false.


## Cursor properties

Two properties track whether the `selectNext` and `selectPrevious` methods are available:

* `canSelectPrevious`. This is true if the `selectPrevious` method can be
  called. When this property changes as a result of internal component activity,
  the mixin raises a `can-select-previous-changed` event.
* `canSelectNext`. This is true if the `selectNext` method can be called.
  When this property changes as a result of internal component activity, the
  mixin raises a `can-select-next-changed` event.

These properties are useful for components that want to offer the user, e.g., Next/Previous buttons to move the selection. The properties above can be monitored for changes to know whether such Next/Previous buttons should be enabled or disabled.

Both `selectNext` and `selectPrevious` support a special case: if there is no selection but items exist, those methods select the first or last item respectively. Accordingly, if there is no selection but items exist, the `canSelectNext` and `canSelectPrevious` properties will always be true.
