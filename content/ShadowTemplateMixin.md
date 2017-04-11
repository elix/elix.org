# ShadowTemplateMixin

This mixin helps plain JavaScript components stamp a template into a new shadow
root during instantiation.

    class GreetElement extends ShadowTemplate(HTMLElement) {
      get [symbols.template]() {
        return `
          Hello, <slot></slot>!
        `;
      }
    }

    const element = new GreetElement();
    element.textContent = 'world';      // User sees, "Hello, world!"

When the element above is instantiated, the constructor supplied by
`ShadowTemplateMixin` finds the element's template and stamps it into a new
shadow root. It also ensures the template will work with the
[ShadyCSS](https://github.com/webcomponents/shadycss) polyfill if that is being
used.

The mixin does the following:

* In a component's `constructor`, the mixin looks for a template property
  (see below).
* If the ShadyCSS polyfill is loaded, the mixin uses it to prepare the template.
* The mixin attaches a new, open shadow root.
* The mixin clones the prepared template into the shadow root.
* The mixin invokes [symbols.shadowCreated](symbols#shadowCreated) to let other
  mixins know the shadow subtree has been created.
* If the ShadyCSS polyfill is loaded, in the component's `connectedCallback`,
  the mixin invokes ShadyCSS to apply styles to the new component instance.

All Elix [elements](elements) use `ShadowTemplateMixin` to populate their
Shadow DOM subtree with template elements.


## The template property

The `ShadowTemplateMixin` expects a component to define a property getter
identified as [symbols.template](symbols#template). If this property has not
been defined, the mixin issues a console warning, but does not throw an
exception.

The property can return a component template as either a real HTML `<template>`
element or, for convenience, as a string. The mixin will upgrade a string
template to a real `<template>`.

The template can come from anywhere. It can be embedded in the JavaScript as a
backquoted template string (as shown in the example above), or it be loaded from
some other resource. E.g., if HTML Imports are used, the template could be
obtained from the same HTML file in which the class is defined:

    <template>
      Hello, <slot></slot>!
    </template>

    <script>
      const template = document.currentScript.ownerDocument.querySelector('template');
      class GreetElement extends ShadowTemplate(HTMLElement) {
        get [symbols.template]() {
          return template;
        }
      }
    </script>

_Note: The above code is theoretical, as it does not answer the question of how
to perform a JavaScript `import` in an HTML Import._


## Template caching

For better performance, `ShadowTemplateMixin` caches a component's processed
template.

The mixin reads the `[symbols.template]` property once, in the `constructor`.
After processing the template (upgrading a string template to a `<template>`,
and preparing the template for use with ShadyCSS), the processed template is
cached.

Subsequent component instantiations will use the cached template directly.
