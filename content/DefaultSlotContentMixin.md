# DefaultSlotContentMixin

This mixin provides an implementation of a property called
[symbols.content](Symbols#content) that returns all nodes assigned to the
component's default (unnamed) slot. This mixin is often used in conjunction
with [ContentItemsMixin](ContentItemsMixin), which can filter the content into a
set of items.

This also provides notification of changes to the component's `symbols.content`
property. It will invoke a [symbols.contentChanged](Symbols#contentChanged)
method when the component is first instantiated, and whenever the elements
assigned to its default slot change. This is intended to satisfy the Gold
Standard checklist item for monitoring [Content
Changes](https://github.com/webcomponents/gold-standard/wiki/Content-Changes)
(Will the component respond to runtime changes in its content (including
distributed content?).

Example:

```
class CountingElement extends DefaultSlotContentMixin(HTMLElement) {

  constructor() {
    super();
    let root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<slot></slot>`;
    this[symbols.shadowCreated]();
  }

  [symbols.contentChanged]() {
    if (super[symbols.contentChanged]) { super[symbols.contentChanged](); }
    // Count the component's children, both initially and when changed.
    this.count = this.assignedChildren.length;
  }

}
```

To receive `contentChanged` notification, this mixin expects a component to
invoke a method called
[symbols.symbols.shadowCreated](Symbols#symbols.shadowCreated) after the
component's shadow root has been created and populated. This allows the mixin to
inspect the shadow subtree for a default `slot` element and listen to its
`slotchange` event. A console warning is emitted if no such slot is found.
