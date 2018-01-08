# SelectedItemTextValueMixin

**Purpose:** defines a `value` property that reflects the text content of a selected item.

This mixin is independent of the Elix render [pipeline](pipeline).

**Expects** the component to provide:
* `state.selectedIndex` property indicating the index of the currently selected item. This is usually provided by [SingleSelectionMixin](SingleSelectionMixin).
* `items` property representing the items that can be selected. This is usually provided by [ContentItemsMixin](ContentItemsMixin).

**Provides** the component with:
* `value` property representing the text content of the currently-selected item.


## Usage

    import SelectedItemTextValueMixin from 'elix/src/SelectedItemTextValueMixin.js';
    class MyElement extends SelectedItemTextValueMixin(HTMLElement) {}

This mixin exists for list-like components that want to provide a more convenient way to get/set the selected item using text. It adds a `value` property that gets the `textContent` of a component's `selectedItem`. The `value` property can also be set to set the selection to the first item in the `items` collection that has the requested `textContent`. If the indicated text is not found in `items`, the selection is cleared.
