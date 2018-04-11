# RenderUpdatesMixin

**Purpose:** Renders changes in a component's state by efficiently updating attributes, child nodes, classes, styles, and properties on the component's host element and its shadow elements.

This mixin forms a core part of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → methods → setState → **updates** ➞ **render** → post-render


**Expects** the component to provide:
* `updates` property that contains the changes the component would like to make to its own attributes, child nodes, classes, styles, as well as to those of its shadow elements.

**Provides** the component with:
* Internal `symbols.render` method that will be invoked when the component is rendering. This is designed to interoperate with [ReactiveMixin](ReactiveMixin). When the render method is called, RenderUpdatesMixin will asks the component for `updates`, then applies those to the DOM.
* `state.original` property that returns the original attributes, classes, and styles on the host element.
* `setAttribute()` method override and `style` property override that track live changes to a component's style made by the application.


## Usage

    import RenderUpdatesMixin from 'elix/src/RenderUpdatesMixin.js';
    class MyElement extends RenderUpdatesMixin(HTMLElement) {}


### Example

The documentation for ReactiveMixin provides a sample increment/decrement component, and shows how that mixin can be used in conjunction with `RenderUpdatesMixin`. That sample component has a numeric `state.value` member, and would like its own styling to reflect whether that number is positive or negative. Specifically, if `state.value` is negative, the component would like to have its text appear in red. The component achieves this by defining an `updates` getter as follows:

    get updates() {
      return {
        style: {
          color: this.state.value < 0 ? 'red' : ''
        }
      };
    }

When the component's state changes, `ReactiveMixin` will tell the component to render, and `RenderUpdatesMixin` will then ask the component to identify `updates` based on the current state. The code above indicates that the component wants to set the `color` based on `state.value`. `RenderUpdatesMixin` will take care of applying those updates to the DOM. The above code is therefore equivalent to:

    [symbols.render]() {
      if (super[symbols.render]) { super[symbols.render](); }
      this.style.color = this.state.value < 0 ? 'red' : '';
    }

A key advantage of using `updates` over writing a render function yourself is that the former allows mixins and component subclasses to cooperate in the rendering of the component. If other aspects of the component also wanted to update the component's style, those updates could all be handled together. For more, see the section below on "Mixins and subclasses".


## Defining `updates`

Your component's `updates` property should return a plain JavaScript object. The keys of that object indicate what changes you want to make to the component's host element.


### Updating attributes

An `updates` object with an `attributes` key asks `UpdateMixin` to update the host element's attributes. E.g., the component can set its own `tabindex` attribute with:

    {
      attributes: {
        tabindex: 0
      }
    }

The values of the attributes will be cast to strings, so `tabindex: 0` and `tabindex: '0'` are equivalent. A `null` value asks that the indicated attribute be _removed_ from the element.


### Updating child nodes

An `updates` object with a `childNodes` key causes `UpdateMixin` to update the element's child nodes to a `NodeList` or array of `Node` objects. This key is generally only used in conjunction with `$` (below) to update the child nodes of a shadow element. (It would be rather unusual and surprising for a component to modify its own light DOM children.)


### Updating classes

An `updates` object with a `classes` key indicates CSS classes that should be added to, or removed from, the host element:

    {
      classes: {
        foo: true,
        bar: false
      }
    }

This adds the `foo` class and removes the `bar` class. Any other classes on the host element are left as is.


### Updating styles

An `updates` object with a `styles` key sets styles on the host element:

    {
      styles: {
        'background-color': 'black',
        color: 'red'
      }
    }

For consistency, style rules should generally be identified with lowercase, hyphenated names (`background-color`), but Pascal-case names (`BackgroundColor`) are also supported.

To unset a particular rule, pass in a value of the empty string, `''`.


### Updating shadow elements with `$`

`RenderUpdatesMixin` can also apply updates to elements in a component's shadow subtree. This is typically done in conjunction with `ShadowTemplateMixin`, which automatically creates `this.$` references for shadow elements with IDs. For example, given the following template:

    get [symbols.template]() {
      return `
        <button id="decrement">-</button>
        <span id="value"></span>
        <button id="increment">+</button>
      `;
    }

`ShadowTemplateMixin` will create shadow references for `this.$.decrement`, `this.$.value`, and `this.$.increment` that refer to the above elements.

Given such `this.$` shadow element references, `RenderUpdatesMixin` can be used to apply changes to those shadow elements. To do this, give the `updates` object a `$` key, with subkeys for the shadow elements you want to update:

    get updates() {
      return {
        $: {
          value: {
            textContent: this.state.value
          }
        }
      };
    }

This `updates` object indicates that, during rendering, the component's current `value` state should be put into the `textContent` of the shadow element identified as `this.$.value`. The above code is equivalent to:

    this.shadowRoot.querySelector('#value').textContent = this.state.value;

Shadow element content can be set by specifying updates to `textContent` (as shown above) or `innerHTML`. As a convenience, you can also specify an update to a shadow element's `childNodes` property, supplying an array of elements you want to set as the shadow element's children. The built-in `childNodes` property is read-only, but can be indicates as a property you want to update, and `RenderUpdatesMixin` will handle updates to `childNodes` efficiently.


### Updating properties

Any keys in an `updates` object that are not specially identified above (`attributes`, `classes`, `style`, and `$`) will be set as properties. Example:

    get updates() {
      return {
        $: {
          list: {
            selectedIndex: this.state.index
          }
        }
      };
    }

This updates the `selectedIndex` property of shadow element `this.$.list`.


## Referencing "original" properties

Sometimes a component wants to update an element's attribute, class, style, or property only if no value has been otherwise specified. But if the page author _has_ specified a value, the component will defer to that.

Consider the `tabindex` example shown earlier, in which a component wants to indicate that the element should be placed in the document's tab order by setting a `tabindex` of zero:

    {
      attributes: {
        tabindex: 0
      }
    }

This will unfortunately override any `tabindex` attribute set on the element (in HTML, say). A better solution is to defer to any value of `tabindex` explicitly specified on the element, and only provide a default `tabindex` if not.

For these scenarios, `RenderUpdatesMixin` tracks a component's original attributes, classes, and styles as a state object `this.state.original`. That object contains members for the `attributes`, `classes`, and `style` rules originally set in markup.

This `original` state can be referenced in `updates`. To provide a default `tabindex` if none is otherwise specified:

    get updates() {
      return {
        attributes: {
          tabindex: this.state.original.attributes.tabindex || 0
        }
      };
    }


### Handling live changes to component styles

It's common for frameworks such as React to set inline styles via the `style` attribute at runtime. To accommodate those, `RenderUpdatesMixin` will recalculate `this.state.original.styles` when styles are dynamically applied. This allows the component to decide whether it wants to override such styles or not. E.g., to provide a default `color` if no `color` is explicitly specified:

    get updates() {
      return {
        styles: {
          color: this.state.original.style.color || 'red'
        }
      };
    }


## Composing `updates` with mixins and subclasses

One key advantage of using an `updates` object to track what changes should be applied is that it can readily accommodate augmentation by mixins or subclasses. For this to work, any class defining an `updates` property should generally merge its updates on top of `super.updates`.

For example, a base class might define `updates` to define some attributes and styles:

    import * as updates from 'elix/src/updates.js'

    // In the base class
    get updates() {
      return updates.merge(super.updates, {
        attributes: {
          tabindex: this.state.original.attributes.tabindex || 0
        },
        styles: {
          'background-color': 'gray',
          color: this.state.original.style.color || 'red'
        }
      });
    }

The `updates.merge` call intelligently merges the updates defined by the `super` class with the updates provided inline. That merge will ensure that `attributes`, `classes`, and `style` updates are merged together. The last object to specific an update wins. Updates to subelements via `$` will be similarly merged.

A subclass of the above can further extend `updates` to add additional customizations. If the subclass wants to generally preserve the behavior of the base class, but wants to override the `color` style:

    // In the subclass
    get updates() {
      return updates.merge(super.updates, {
        styles: {
          color: this.state.original.style.color || 'orange'
        }
      });
    }

The resulting component will include the `tabindex` and `background-color` specified by the base class, and the `color` specified by the subclass.
