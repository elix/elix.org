# ContentItemsMixin

This mixin maps content semantics to list item semantics. It expects the
component to identify the HTML elements it "contains", and then impose some
restrictions on that set to determine which of those HTML elements are actually
interesting to use as the "items" in a list.

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

Example:

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

If this element uses `ContentItemsMixin`, its `items` property will return the
three `div` elements, and filter out the whitespace text nodes and the invisible
`style` element.

This mixin is designed to address the Gold Standard checklist critera for [Child
Independence](https://github.com/webcomponents/gold-standard/wiki/Child-Independence)
(Can you use the component with a wide range of child element types?) and
[Auxiliary
Content](https://github.com/webcomponents/gold-standard/wiki/Auxiliary-Content)
(Does the component permit the use of child elements that perform auxiliary
functions?). To meet those criteria, it is better for a component to filter
_out_ what it doesn't want using `ContentItemsMixin` than to exclusively filter
_in_ only a specific type of element (using, say, `querySelectorAll`).

`ContentItemsMixin` expects a component to define a property called
[symbols.content](Symbols#content) for the raw set of HTML elements the
component contains. How a component interprets "contains" can vary, but it
typically means the component's light DOM children. In that common case,
[SlotContentMixin](SlotContentMixin) can be used to define
`symbols.content` as the light DOM children assigned to the component's default
`slot`. But other definitions of content are possible. Your component could, for
example, define `symbols.content` to only extract nodes assigned to a particular
`slot`. Or if you are creationg a list-like component whose list items are
hard-coded, the component could define `symbols.content` to return the children
of a particular element inside the component's shadow subtree. (The
[ListBox](ListBox) page shows an example of such a hard-coded list.)

`ContentItemsMixin` defines a property called `items` that filters the results
of `symbols.content`. This is an array of items designed for use with
`SingleSelectionMixin` and its companion mixins. The mixin constructs a value
for the `items` property that is equal to `symbols.content` — minus anything
that would not normally be visible to the user. This filtering is done through
the helper function [content.substantiveElements](content#substantiveElements).

To allow a component to initialize items, `ContentItemsMixin` implements a
handler for `symbols.itemsChanged` that invokes `symbols.itemAdded` for any new
items added since the last `itemsChanged` call. The component can then perform
per-item initialization work in `itemAdded`.

To avoid having to recalculate the set of `items` each time that property is
request, this mixin supports an optimized mode. If the method
`symbols.contentChanged` is invoked, the mixin concludes that the component will
notify it of future content changes, and turns on the optimization. In that
mode, the mixin saves a reference to the computed set of items, and will return
that immediately on subsequent calls to the `items` property. If this mixin is
used in conjunction with `SlotContentMixin` (above), the latter will take
care of automatically invoking `symbols.contentChanged`, and automatically
engage the optimization.
