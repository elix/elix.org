# ContentItemsMixin

**Purpose:** lets a list-like component obtain its list items from its DOM content. It expects the component to identify its HTML "contents", and then impose some restrictions on those contents to determine which of those HTML elements are actually interesting to use as the items in the list. This mixin also allows a component to render updates to its list items.

The rendering aspect of this mixin works at the end of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → methods → setState → **render** ➞ **update DOM**

**Expects** the component to provide:
* `state.content` member containing a flattened array of `Node` elements. You can use [SlotContentMixin](SlotContentMixin) for this purpose.

**Provides** the component with:
* `itemCalcs` method that can be used to calculate per-item conditions during rendering.
* `itemsForState` method that calculates the items that would exist in a given state.
* `itemUpdates` method to indicate what updates should be applied to a specific item.
* Internal `symbols.render` method that will be invoked when the component is rendering. This is designed to interoperate with [ReactiveMixin](ReactiveMixin). When the render method is called, ContentItemsMixin will asks the component for `itemUpdates`, then applies those to the items.


## Usage

    import ContentItemsMixin from 'elix/src/ContentItemsMixin.js';
    class MyElement extends ContentItemsMixin(HTMLElement) {}

Items differ from raw element contents in several ways:

* They are often referenced via index.
* They may have a selection state.
* It's common to do work to initialize the appearance or state of a new item.
* Text nodes (which are often whitespace) are ignored.
* Invisible child elements are filtered out and not counted as items.
  Instances of invisible `Node` subclasses such as `Comment` and
  `ProcessingInstruction` are filtered out, as are invisible auxiliary elements
  include link, script, style, and template elements. This filtering ensures
  that those auxiliary elements can be used in markup inside of a list without
  being treated as list items.

This mixin is designed to address the Gold Standard checklist critera for [Child Independence](https://github.com/webcomponents/gold-standard/wiki/Child-Independence) (Can you use the component with a wide range of child element types?) and [Auxiliary Content](https://github.com/webcomponents/gold-standard/wiki/Auxiliary-Content) (Does the component permit the use of child elements that perform auxiliary functions?). To meet those criteria, it is better for a component to filter _out_ what it doesn't want using `ContentItemsMixin` than to exclusively filter _in_ only a specific type of element (using, say, `querySelectorAll`).


### Example

    <my-element>
      <style>
        div {
          color: gray;
        }
      </style>
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </my-element>

If this element uses `ContentItemsMixin`, its `items` property will return the three `div` elements, and filter out the whitespace text nodes and the invisible `style` element.


## Obtaining items from content

`ContentItemsMixin` expects a component to define a state member `state.content` containing the raw set of HTML elements the component contains. How a component interprets "contains" can vary, but a common definition would be the component's light DOM children. In that common case, [SlotContentMixin](SlotContentMixin) can be used to define `state.content` as the light DOM children assigned to the component's default `slot`.

Other definitions of content are possible. Your component could, for example, define `state.content` to only extract nodes assigned to a particular named `slot`, or the children of a node in the component's shadow tree, or a set of nodes not actually in the DOM.

`ContentItemsMixin` defines a property called `items` that filters the results of `state.content`. This is an array of items designed for use with [SingleSelectionMixin](SingleSelectionMixin) and its companion mixins. `ContentItemsMixin` uses the helper function [content.substantiveElements](content#substantiveElements) to subtract out any nodes in `state.content` that would not normally be visible to the user.

To avoid having to recalculate the set of `items` each time that property is requested, the `items` property getter uses an object identity check on `state.content`. If the object referenced by `state.content` is the same as it was in a prior `items` request, then `items` immediately returns the same results as before.


## Rendering items

List-like components often need to [update their light DOM content too](https://component.kitchen/blog/posts/your-web-components-with-shadow-dom-may-need-to-update-light-dom-too), e.g., to add attributes or classes to the nodes for list items. To support this need, `ContentItemsMixin` includes a facility for rendering state to individual list items.

When `symbols.render` is invoked (typically via `ReactiveMixin`), `ContentItemsMixin` will loop through the current array of nodes in `items`:

* The mixin first invokes `itemCalcs` to give the component a chance to compute facts about the item which can be derived from component state.
* The mixin then invokes `itemUpdates`, passing in the item, the calculated results of the above step, and the set of original HTML attributes on the node. The component determines what updates should be applied to that particular item, using the same [updates](updates) format that [RenderUpdatesMixin](RenderUpdatesMixin) uses to update the top-level component.
* Finally, the mixin applies the indicated updates to the item in question.

This process is repeated for each item in the list.

Example: The [AriaListMixin](AriaListMixin) updates an item's `aria-selected` attribute to reflect the item's selection state. It does this with code similar to:

    itemUpdates(item, calcs, original) {
      const base = super.itemUpdates ? super.itemUpdates(item, calcs, original) : {};
      return merge(base, {
        attributes: {
          'aria-selected': calcs.selected
        },
      });
    }

For this code to work, `AriaListMixin` expects to be used in conjunction with [SingleSelectionMixin](SingleSelectionMixin), which will define `calcs.selected` to be true for the selected item, and false for all other items.
