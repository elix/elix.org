# WrappedStandardElement

Wraps a standard HTML element so that you can create custom element classes that in many ways function as extensions of the standard element.

[This Elix `AutosizeTextarea` element wraps a standard `textarea`](/demos/autosizeTextarea.html)

The above demo of an Elix [AutosizeTextarea](AutosizeTextarea) uses `WrappedStandardElement` to wrap a standard `<textarea>`. That gives it a foundation of all the properties, methods, and events of a standard `<textarea>`, allowing the component to provide additional behavior. In this case, `AutosizeTextarea` automatically updates the element's height to accommodate its text.

Although the Custom Elements spec defines support for [customized built-in elements](https://www.w3.org/TR/custom-elements/#customized-built-in-element), Apple has elected not to support them, effectively limiting their use. This means you cannot extend the behavior of a standard HTML element like `<a>` or `<button>` and still expect the result to work on all browsers that support Custom Elements.

As a partial workaround, the `WrappedStandardElement` class can create a class for you that wraps an instance of a standard HTML element. For example, the code below creates a class that will wrap an instance of a standard `<a>` element:

    class WrappedA extends WrappedStandardElement.wrap('a') {
      customMethod() { ... }
    }
    customElements.define('wrapped-a', WrappedA);

An instance of the resulting class will look to the user like an instance of the standard element class it wraps. The resulting class will *not* be an `instanceof` the standard class (here, `HTMLAnchorElement`). Another limitation is that the resulting `<wrapped-a>` will not automatically pick up CSS styles for standard `<a>` elements. However, the resulting class *can* be extended. E.g., instances of the above class have a `customMethod()` available to them.

Any properties defined by the original standard element will be exposed on the resulting wrapper class, and calls to get or set those properties will be delegated to the wrapped element instance. Continuing the above example:

    let wrapped = document.createElement('wrapped-a');
    wrapped.href = 'http://example.com/';
    wrapped.textContent = 'Click here';

Here, the created custom `<wrapped-a>` element will contain inside its shadow tree an instance of a standard `<a>` element. The call to set the wrapper's `href` property will ultimately set the `href` on the inner link. Moreover, the text content of the `<wrapped-a>` element will appear inside the inner link. The result of all this is that the user will see what *looks* like a normal link, just as if you had written `<a href="http://example.com/">Click here</a>`. However, the actual element will be an instance of your custom class, with whatever behavior you've defined for it.

Attributes set on the wrapping element will similarly be delegated to the inner element. For example, the `AutosizeTextarea` demo above includes a `placeholder="Type here"` attribute on the wrapping `<elix-autosize-textarea>` instance. (To see the placeholder, delete all text in the sample textarea.)The class delegates this `placeholder` attribute to the inner `<textarea>`. The inner `<textarea>` then renders the placeholder as a prompt to the user if the text area contains no text.

Wrapped elements should raise the same events as the original standard elements. E.g., if you wrap an `<img>` element, the wrapped result will raise the standard `load` event as expected.

Some elements, including `<body>`, `<html>`, and `<style>`, cannot be wrapped and still retain their normal behavior.
