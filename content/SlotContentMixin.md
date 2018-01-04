# SlotContentMixin

**Purpose:** allows a component to track its light DOM content as state. This helps a component satisfy the Gold Standard checklist item for monitoring [Content Changes](https://github.com/webcomponents/gold-standard/wiki/Content-Changes)
(Will the component respond to runtime changes in its content, including distributed content?).

This mixin works at the beginning of the Elix user interface [pipeline](pipeline):

> **events** ➞ **setState** → render → update DOM

**Expects** the component to provide:
* A default `<slot>` element in its shadow root. Such a template can be defined using [ShadowTemplateMixin](ShadowTemplateMixin).

**Provides** the component with:
* `state.content` member that holds the component's current, flattened set of light DOM child nodes.
* `slotchange` event listener that invokes `setState` with the updated content.


## Usage

    import SlotContentMixin from 'elix/src/SlotContentMixin.js';

    class MyElement extends SlotContentMixin(HTMLElement) {}


### Example

This component shows a count of how many children it has:

    class CountingElement extends SlotContentMixin(ReactiveMixin(HTMLElement)) {

      [symbols.render]() {
        if (!this.shadowRoot) {
          let root = this.attachShadow({ mode: 'open' });
          root.innerHTML = `
            <span id="count"></span>
            <slot></slot>
          `;
        }
        // Get the flattened list of children.
        const content = this.state.content;
        const count = content ? content.length : 0;
        this.shadowRoot.querySelector('#count').textContent = count;
      }

    }


## Tracking content changes

The standard DOM API for tracking content changes is to use the `slotchange` event. However, in compoennts written in functional-reactive style, the component should track its content as part of its state. This is the focused task of `SlotContentMixin`.

When a component is mounted (i.e., connected to the document), `SlotContentMixin` sets the slot's current, flattened list of assigned nodes as the component state, in `state.content`. It also begins listening to `slotchange` events on the component's default slot. When a `slotchange` event fires, the mixin invokes `setState` with the new `state.content`.
