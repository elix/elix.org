# ReactiveMixin

**Purpose:** Give a component class a functional-reactive programming (FRP) architecture that can track internal state and render that state to the DOM.

**Provides the component with:**
* A `state` object representing the current state.
* A `setState()` method to chnage state.
* A `render` method that will be invoked when state changes.

**Expects the component to provide:**
* An internal `symbols.render` method that actually updates the DOM. You can use [ShadowTemplateMixin](ShadowTemplateMixin) and [RenderPropsMixin](RenderPropsMixin) for that purpose.
* An optional `shouldComponentUpdate` method that can be used to determine when a change in state is significant enough that the component should be rerendered.
* An optional `componentDidMount` method that runs after the component renders for the first time.
* An optional `componentDidUpdate` method that runs after subsequent component renderings.

`ReactiveMixin` represents a minimal implementation of the functional-reactive programming architecture populate in React and similar frameworks. The mixin itself focuses exclusively on managing state and determining when the state should be
rendered.

You can use this mixin with whatever DOM rendering technology you like
(virtual-dom, hyperHTML, lit-html, plain old DOM API calls, etc.). The Elix project itself uses `ReactiveMixin` as a core part of all its components. Elix components generally use `ShadowTemplateMixin` and `RenderPropsMixin` to actually render the component state to the DOM.

## Example: an increment/decrement component

Functional-reactive frameworks often use a canonical increment/decrement component as an example. The ReactiveMixin version looks like this:

    import ReactiveMixin from '.../ReactiveMixin.js';

    // Create a native web component with reactive behavior.
    class IncrementDecrement extends ReactiveMixin(HTMLElement) {

      // This property becomes the initial value of this.state at constructor time.
      get defaultState() {
        return { value: 0 };
      }

      // Provide a public property that gets/sets state.
      get value() {
        return this.state.value;
      }
      set value(value) {
        this.setState({ value });
      }

      // Expose "value" as an attribute.
      attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'value') {
          this.value = parseInt(newValue);
        }
      }
      static get observedAttributes() {
        return ['value'];
      }

      // … Plus rendering code, with several options for rendering engine
    }

    customElements.define('increment-decrement', IncrementDecrement);

[A simple increment/decrement component defined with ReactiveMixin](/demos/reactiveExample.html)

ReactiveMixin provides a foundation very similar to React’s `Component` class (or,
more specifically, `PureComponent`), but for native HTML web components. The
compact mixin provides a small core of features that enable reactive web
component development in a flexible way.


## Defining state

ReactiveMixin gives the component a property called `state`, a dictionary object with all state defined by the component and any of its other mixins. The `state` property itself is read-only and immutable. You can reference it during rendering, and to provide backing for public properties like the `value` getter
above.

ReactiveMixin provides a `setState` method the component invokes to update its
own state. The mixin sets the initial state in the constructor by passing the
value of the `defaultState` property to `setState`. You can invoke `setState` in response to user interaction, as in the example above. *** show event handlers ***


## Detecting state changes

When you call `setState`, ReactiveMixin updates your component’s state. It then
invokes a `shouldComponentUpdate` method to determine whether the component
should be rerendered.

The default implementation of `shouldComponentUpdate` method performs a shallow
check on the state properties: if any top-level state properties have changed
identity or value, the component is considered dirty, prompting a rerender. This
is comparable to the similar behavior in `React.PureComponent`. In our
explorations, we have found that our web components tend to have shallow state,
so pure components are a natural fit. You can override this to provide a looser
dirty check (like `React.Component`) or a tighter one (to optimize performance,
or handle components with deep state objects).

If there are changes _and_ the component is in the DOM, the new state will be
rendered.


## Rendering

This mixin stays intentionally independent of the way you want to render state
to the DOM. Instead, the mixin invokes an internal component method whenever
your component should render, and that method can invoke whatever DOM updating
technique you like. This could be a virtual DOM engine, or you could just do it
with plain DOM API calls.

Here’s a plain DOM API render implementation for the increment/decrement example
above. We’ll start with a template:


    <template id="template">
      <button id="decrement">-</button>
      <span id="value"></span>
      <button id="increment">+</button>
    </template>


To the component code above, we’ll add an internal render method for
ReactiveMixin to invoke. The mixin uses an identifier from the
[symbols](symbols) module to identify the internal render method. This avoids
name collisions, and discourages someone from trying to invoke the render method
from the outside.


    import symbols from ‘.../symbols.js’;

    // This goes in the IncrementDecrement class ...
    [symbols.render]() {
      if (!this.shadowRoot) {
        // On our first render, clone the template into a shadow root.
        const root = this.attachShadow({ mode: 'open' });
        const clone = document.importNode(template.content, true);
        root.appendChild(clone);
        // Wire up event handlers too.
        root.querySelector('#decrement').addEventListener('click', () => {
          this.value--;
        });
        root.querySelector('#increment').addEventListener('click', () => {
          this.value++;
        });
      }
      // Render the state into the shadow.
      this.shadowRoot.querySelector('#value').textContent = this.state.value;
    }


That’s all that’s necessary. The last line is the core bit that will update the
DOM every time the state changes. The two buttons update state by setting the
`value` property, which in turn calls `setState`.

This ReactiveMixin would also be a natural fit with template literal libraries
like [lit-html](https://github.com/PolymerLabs/lit-html/) or
[hyperHTML](https://github.com/WebReflection/hyperHTML).


## Web component and FRP lifecycle methods

Since components created with this mixin are still regular web components, they
receive all the standard lifecycle methods. ReactiveMixin augments
`connectedCallback` so that a component will be rendered when it’s first added
to the DOM.

The mixin provides two React-style lifecycle methods:

* `componentDidMount` is invoked when your component has finished rendering for the first time.
* `componentDidUpdate` is invoked whenever your component has completed a subsequent
rerender.

ReactiveMixin does not provide `componentWillUnmount`; use the standard
`disconnectedCallback` instead. Similarly, use the standard
`attributeChangedCallback` instead of `componentWillReceiveProps`.
