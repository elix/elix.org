# ShadowTemplateMixin

**Purpose:** Create a component's shadow root, and clone a template into it when it is first rendered.

This mixin forms a core part of the Elix user interface [pipeline](pipeline):

> events → methods → setState → **render** ➞ **update DOM**

**Expects** the component to provide:
* Internal `symbols.template` property that returns a string to `<template>` element.

**Provides** the component with:
* Internal `symbols.render()` method that creates and populates the shadow root the first time the component is rendered.
* `$` property that can be used to access elements in the shadow tree that have `id` attributes.

All Elix [elements](elements) use `ShadowTemplateMixin` to populate their Shadow DOM subtree with template elements.


## Usage

    import ShadowTemplateMixin from 'elix/src/ShadowTemplateMixin.js';
    class MyElement extends ShadowTemplateMixin(HTMLElement) {}

### Example

    class GreetElement extends ShadowTemplate(HTMLElement) {

      connectedCallback() {
        this[symbols.render]();
      }

      get [symbols.template]() {
        return `
          Hello, <slot></slot>!
        `;
      }

    }

    const element = new GreetElement();
    element.textContent = 'world';      // User sees, "Hello, world!"

When the element above is instantiated, the constructor supplied by `ShadowTemplateMixin` finds the element's template and stamps it into a new shadow root.


## Rendering

This mixin does its primary work in a component's `symbols.render` method. The first time that method is called:

* The mixin looks for a template property (see below).
* If the [ShadyCSS](https://github.com/webcomponents/shadycss) polyfill is loaded, the mixin uses it to prepare the template.
* The mixin attaches a new, open shadow root.
* The mixin clones the prepared template into the shadow root.
* If the ShadyCSS polyfill is loaded, in the component's `connectedCallback`, the mixin invokes ShadyCSS to apply styles to the new component instance.


## The template property

The `ShadowTemplateMixin` expects a component to define a property getter identified as [symbols.template](symbols#template). If this property has not been defined, the mixin issues a console warning, but does not throw an exception.

The property can return a component template as either a real HTML `<template>` element or, for convenience, as a string. The mixin will upgrade a string template to a real `<template>`.

The template can come from anywhere. It can be embedded in the JavaScript as a backquoted template string (as shown in the example above), or it be loaded from some other resource.

## Template caching

For better performance, `ShadowTemplateMixin` caches a component's processed template.

The mixin reads the `[symbols.template]` property once, in the `constructor`. After processing the template (upgrading a string template to a `<template>`, and preparing the template for use with ShadyCSS), the processed template is cached.

Subsequent component instantiations will use the cached template directly.


## Accessing shadow elements with `this.$`

`ShadowTemplateMixin` defines a component property called `this.$` that holds references to shadow elements with IDs. E.g., if component's template contains an element `<button id="foo">`, then this mixin will create a member `this.$.foo` that points to that button in the component instance's shadow tree. This behavior is inspired by Polymer's [automatic node finding](https://www.polymer-project.org/1.0/docs/devguide/local-dom.html#node-finding) feature.

Such references simplify a component's access to its own elements. In exchange, this mixin trades off a one-time cost of querying all elements in the shadow tree instead of paying an ongoing cost to query for an element each time the component wants to inspect or manipulate it.

These `$` references are calculated when the component is instantiated, and _not_ updated if you subsequently modify the shadow tree yourself (to replace one item with another, to add new items with `id` attributes, etc.).
