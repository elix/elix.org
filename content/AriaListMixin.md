# AriaListMixin

**Purpose:**
Help list-like components expose their selection state to screen
readers and other assistive technologies via
[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
accessibility attributes. This allows components to satisfy the Gold Standard
criteria [Declared
Semantics](https://github.com/webcomponents/gold-standard/wiki/Declared-Semantics)
(Does the component expose its semantics by wrapping/extending a native element,
or using ARIA roles, states, and properties?).

This mixin generally works at the end of the render [pipeline](pipeline):

> events → methods/properties → **state** ➞ **render**

**Expects** the component to provide:
* `state.selectedIndex` property indicating the index of the currently selected item.
* `items` property representing the items that can be selected. This is usually provided by [ContentItemsMixin](ContentItemsMixin).

**Provides** the component with:
* `updates` property that [RenderUpdatesMixin](RenderUpdatesMixin) can use to update ARIA attributes on the component's host element and its contained items.


## Usage

Elix mixins and components support universal access for all users. The work required to properly expose the selection state of a component in ARIA is complex, but thankfully fairly generalizable. `AriaListMixin` provides a reasonable baseline implementation of ARIA support for list components. (Another important
aspect of supporting universal access is to provide full keyboard support. See
[KeyboardMixin](KeyboardMixin) and its related mixins.)


### Example

    // A sample element that exposes single-selection via ARIA.
    class AccessibleList extends
        AriaListMixin(SingleSelectionMixin(HTMLElement)) {
      get items() {
        return this.children;
      }
      // Not shown: when items change, invoke [symbols.itemAdded] for new items.
    }
    customElements.define('accessible-list', AccessibleList);

Suppose the developer initially populates the DOM as follows:

    <accessible-list aria-label="Fruits" tabindex="0">
      <div>Apple</div>
      <div>Banana</div>
      <div>Cherry</div>
    </accessible-list>

After the element is added to the page, the DOM result will be:

    <accessible-list aria-label="Fruits" tabindex="0" role="listbox">
      <div role="option" id="_option0" aria-selected="false">Apple</div>
      <div role="option" id="_option1" aria-selected="false">Banana</div>
      <div role="option" id="_option2" aria-selected="false">Cherry</div>
    </accessible-list>

The `AriaListMixin` has selected appropriate default values for the
attributes `role`, `id`, `aria-selected`. When the first item is selected, the
DOM will update to:

    <accessible-list aria-label="Fruits" tabindex="0" role="listbox"
        aria-activedescendant="_option0">
      <div role="option" id="_option0" aria-selected="true">Apple</div>
      <div role="option" id="_option1" aria-selected="false">Banana</div>
      <div role="option" id="_option2" aria-selected="false">Cherry</div>
    </accessible-list>

`AriaListMixin` has updated the `aria-selected` attribute of the selected
item, and reflected this at the list level with `aria-activedescendant`.

In practice, some additional attributes must be set for ARIA to be useful. The
author should specific a meaningful, context-dependent label for the element
with an `aria-label` or `aria-labeledby` attribute. In this example, a
`tabindex` of 0 is also specified, although a planned mixin for general keyboard
support can take care of providing a default `tabindex` value.

As a demonstration, the following [ListBox](ListBox) should be navigable with a
keyboard and a screen reader such as Apple VoiceOver (usually invoked by
pressing ⌘F5).

[A list box exposing selection state via AriaListMixin](/demos/listBox.html)

`AriaListMixin` complements the model of selection formalized in the
companion [SingleSelectionMixin](SingleSelectionMixin). If a component author
prefers, they can skip the latter mixin, and provide their own implementation of
the members [symbols.itemSelected](symbols#itemSelected),
[symbols.itemAdded](symbols#itemAdded), and `selectedItem`.

The mixin's primary work is setting ARIA attributes as follows.


## `role` attribute on the component and its items

The outer list-like component needs to have a `role` assigned to it. For
reference, the ARIA documentation defines the following
[roles](https://www.w3.org/TR/wai-aria/roles) for single-selection elements:

* `combobox`
* `grid`
* `listbox`
* `menu`
* `menubar`
* `radiogroup`
* `tablist`
* `tree`
* `treegrid`

The most general purpose of these roles is `listbox`, so unless otherwise
specified, `AriaListMixin` applies that role by default.

A suitable ARIA role must also be applied at the item level. The default role
applied to items is `option`, defined in the
[documentation](https://www.w3.org/TR/wai-aria/roles#option) as a selectable
item in a list element with role `listbox`.

In situations where different roles are defined, a component can provide
default values as [defaultState](ReactiveMixin#defaultState):

    class TabList extends AriaListMixin(HTMLElement) {
      get defaultState() {
        return Object.assign({}, super.defaultState, {
          itemRole: `tab`,  // Pick a role for the items
          role: `tablist`   // Pick a role for the component
        });
      }
      ...
    }

An app can override the `role` on a per-instance basis by defining a `role`
attribute before adding the element to the page:

    // Letting the mixin pick the role.
    const tabList = new TabList();
    document.appendChild(tabList);
    tabList.getAttribute('role'); // "tablist" (this component's default role)

    // Handling role on a per-element basis.
    const menu = new TabList();
    tabList.setAttribute('role', 'menu');
    document.appendChild(tabList);
    tabList.getAttribute('role')  // "menu" (mixin left the role alone).


## `id` attribute on the items

ARIA references requires that a potentially selectable item have an `id`
attribute that can be used with `aria-activedescendant` (see below). To that
end, this mixin will generate an `id` attribute for any item added to the list
that doesn't already have an `id`. The mixin performs this work when the
[symbols.itemAdded](symbols#itemAdded) method is invoked for a new item.

To minimize accidental `id` collisions on a page, the generated default `id`
value for an item includes:

* An underscore prefix.
* The `id` attribute of the outer component, if one has been specified.
* The word "option".
* An integer representing the item's index in the list.

Examples: a list with an `id` of `test` will produce default item IDs like
`_testOption7`. A list with no `id` of its own will produce default item IDs
like `_option7`.


## `aria-activedescendant` attribute on the component

To let ARIA know which item is selected, the component must set its own
`aria-activedescendant` attribute to the `id` attribute of the selected item.
`AriaListMixin` automatically handles that whenever the component's
`selectedItem` property is set.


## `aria-selected` attribute on the items

ARIA defines an `aria-selected` attribute that should be set to `true` on the
currently-selected item, and `false` on all other items. Therefore:

* `AriaListMixin` sets `aria-selected` to `false` for all new items. This
  is required to adhere to the ARIA spec for roles like
  [tab](https://www.w3.org/TR/wai-aria-1.1/#tab): "inactive tab elements
  [should] have their `aria-selected` attribute set to `false`". That is, it is
  insufficient for an element to omit the `aria-selected` attribute; it must
  exist and be set to `false`. This incurs a performance penalty, as every item
  must be touched by the mixin, but [real-world
  experience](https://github.com/PolymerElements/paper-tabs/issues/176)
  indicates that screen readers do exist which require this behavior.

* When an item's selection state changes, `AriaListMixin` reflects
  its new state in its `aria-selected` attribute. This is done in the
  [symbols.itemSelected](symbols#itemSelected) method, which is automatically invokes by
  `SingleSelectionMixin`, or the component author can invoke that method
  manually.
