# SingleSelectionMixin

**Purpose:** Updates component state to track a single selected item at a time. It includes a public API for setting and retrieving the selected item, as well as methods for moving the selection with cursor operations.

This mixin generally works in the middle of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → **methods/properties** ➞ **state** → render

**Expects** the component to provide:
* `setState` method, usually supplied by [ReactiveMixin](ReactiveMixin).
* `items` property representing the items that can be selected. This is usually provided by [ContentItemsMixin](ContentItemsMixin).

**Provides** the component with:
* `itemCalcs.selected` calculation that indicates whether a specific item is the selected item. See [ContentItemsMixin](ContentItemsMixin) for details.
* `state.selectedIndex` state to track the index of the currently selected item.
* `selectedIndex` and `selectedItem` properties to read or manipulate the selected index.
* `selectFirst()`, `selectLast()`, `selectNext()`, and `selectPrevious()` methods to set and move the selection.


## Usage

    import SingleSelectionMixin from 'elix/src/SingleSelectionMixin.js';
    class MyElement extends SingleSelectionMixin(HTMLElement) {}

`SingleSelectionMixin` is designed to support components that let the user select a single thing at a time. This is generally done to let the user select a value (e.g., as the target of an action, or in configuring something), or as a navigation construct (where only one page/mode is visible at a time).

Examples:

* List boxes such as [ListBox](ListBox).
* Dropdown lists and combo boxes
* Carousels such as [Carousel](Carousel).
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

`SingleSelectionMixin` manages a selection within an identified collection of HTML elements. A component identifies that collection by defining a read-only `items` property. A simplistic implementation of `items` could return the component's light DOM children:

    class SimpleList extends SingleSelectionMixin(HTMLElement) {
      get items() {
        return this.children;
      }
    }

The above definition for `items` is simplistic, as it does not support the Gold Standard checklist item [Content Assignment](https://github.com/webcomponents/gold-standard/wiki/Content-Assignment). Neverthless, it can suffice here for demonstration purposes. A more complete component could use [SlotContentMixin](SlotContentMixin) and [ContentItemsMixin](ContentItemsMixin) to meet the Gold Standard criteria.

The key point is that the component provides the collection of items, and they can come from anywhere. The component could, for example, indicate that the items being managed reside in the component's own Shadow DOM subtree:

    class ShadowList extends SingleSelectionMixin(ReactiveMixin(HTMLElement)) {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Populate shadow tree with elements.
      }
      get items() {
        return this.shadowRoot.children;
      }
    }

For flexibility, SingleSelectionMixin can work with an `items` collection of type `NodeList` (as in the above examples) or `Array` (e.g., if the component wants to filter elements for use as items).

The `items` property is often derived from component state, ensuring that `SingleSelectionMixin` will be notified when the component's state changes.


## The selected item

The mixin tracks the currently selected item by its index in `state.selectedIndex`. This is the zero-based index of the currently-selected item within the `items` collection (above). If there is no selection, `selectedIndex` is -1.

To facilitate manipulation of a component's selection from outside, `SingleSelectionMixin` adds
public properties to the component for reading and updating the selectedIndex state. Applications working with selection sometimes want to reference select by index, and sometimes by object reference. The mixin supports both approaches with complementary properties that can both be get and set:

* `selectedIndex`. This reflects the current value of `state.selectedIndex`.
* `selectedItem`. This returns or sets the current item at `state.selectedIndex` within the `items` collection. If there is no selection, `selectedItem` is null.

If items are present, `SingleSelectionMixin` clamps the `selectedIndex` value so that it falls within the bounds of the `items` array. Example: suppose there are 5 items, and `selectedIndex` is 4 (the last item). If the last item is removed, `selectedIndex` will be updated to 3 (the new last item) so that the index remains valid. Clamping is disabled if the `items` array is not defined or contains no item. This supports more flexible timing in cases where `selectedIndex` will end up beinga applied before the items have become available.

When this property changes as a result of internal component activity, the
mixin raises a `selected-index-changed` event.


# Requiring a selection

The `SingleSelectionMixin` defines a `selectionRequired` property that wraps an internal state member `state.selectionRequired`. By default, `selectionRequired` is false. This is appropriate, for example, in components like list boxes or combo boxes which initially may have no selection.

Some components do require a selection. An example is a carousel: as long as the carousel contains at least one item, the carousel should always show some item as selected. Such components can set `selectionRequired` to true.

When `selectionRequired` is true, the following checks are performed when a component's `validateState` method is called:

* If items exist and no selection has been established, the first item is
  selected by default.
* If the selected item is removed, a new item is selected. By default, this is
  the item with the same index as the previously-selected item. If that index no
  longer exists because one or more items at the end of the list were removed,
  the last item in the new set is selected.
* If all items have been removed, `selectedIndex` and `selectedItem` are reset
  to -1 and null, respectively.


# Cursor operations

The selection can be programmatically manipulated via public cursor methods:

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

In some cases, such as carousels, cursor operations should wrap around from the last item to the first and vice versa. This optional behavior, useful in carousel-style components and slideshows, can be enabled by setting the mixin's `selectionWraps` property to true. Internally, this maps to a state member `state.selectionWraps`. The default value is false.


## Cursor properties

Two properties track whether the `selectNext` and `selectPrevious` methods are available:

* `canSelectPrevious`. This is true if the `selectPrevious` method can be called.
* `canSelectNext`. This is true if the `selectNext` method can be called.

These properties are useful for components that want to offer the user, e.g., Next/Previous buttons to move the selection. The properties above can be monitored for changes to know whether such Next/Previous buttons should be enabled or disabled.

Both `selectNext` and `selectPrevious` support a special case: if there is no selection but items exist, those methods select the first or last item respectively. Accordingly, if there is no selection but items exist, the `canSelectNext` and `canSelectPrevious` properties will always be true.


# Per-item selection state

`SingleSelectionMixin` helps map a component's overall selection state (which item is selected?) to the selection states of individual items (is this item currently selected or not?). This is done in conjunction with the separate [ContentItemsMixin](ContentItemsMixin).

`ContentItemsMixin` helps a component render updates to individual list items when the component's state changes. During rendering, `ContentItemsMixin` asks a component for any [itemUpdates](ContentItemsMixin#itemUpdates) that should be applied to each list item. That `itemUpdates` method includes a `calcs` parameter with relevant per-item state information.

When `SingleSelectionMixin` is used with `ContentItemsMixin`, the `calcs` parameter includes a `selected` property that is true if the given item is currently the list's selected item, and false otherwise. A component can use this `calcs.selected` value in determining how the item should be rendered.

Example: A simple ARIA mixin could manage the `aria-selected` value for selected items.

    const SimpleAriaMixin = (base) => class SimpleAria extends base {

      // Update the aria-selected attribute to reflect a change in item state.
      itemUpdates(item, calcs, original) {
        return {
          attributes: {
            'aria-selected': calcs.selected
          }
        };
      }

    }

The above code is provided for reference only. A more complete implementation of the attributes required for full ARIA supports is provided by [AriaListMixin](AriaListMixin).
