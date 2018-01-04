# AttributeMarshallingMixin

**Purpose:** maps element attributes to component properties and vice versa.

This mixin works at the beginning of the Elix user interface [pipeline](pipeline):

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* Property getter/setters for all properties that correspond to attributes.

**Provides** the component with:
* `attributeChangedCallback` implementation that maps attribute changes to property changes.
* `observedAttributes` implementation that, by default, indicates the component wants to receive attribute change notifications for all attributes corresponding to the component's custom properties.

This mixin's function is so common that it is included in the Elix base class [ElementBase](ElementBase).


## Usage

    import AttributeMarshallingMixin from 'elix/src/AttributeMarshallingMixin.js';

    class MyElement extends AttributeMarshallingMixin(HTMLElement) {}


### Example

This sample component defines a custom `fooBar` property, then exposes it as a "foo-bar" attribute:

    const fooBarSymbol = Symbol('fooBar');

    class MyElement extends AttributeMarshallingMixin(HTMLElement) {
      get fooBar() {
        return this[fooBarSymbol];
      }
      set fooBar(value) {
        this[fooBarSymbol] = value;
      }
    }

    customElements.define('my-element', MyElement);

Because the component applies `AttributeMarshallingMixin`, the camelCase `fooBar` property can be set in markup via the hyphenated "foo-bar" attribute:

    <my-element foo-bar="Hello"></my-element>

When this element is instantiated, the `fooBar` property setter will automatically be invoked with the initial value "Hello".


## `attributeChangedCallback`

This mixin provides a default `attributeChangedCallback` implementation that will convert a change in an element attribute into a call to the corresponding property setter.

Attributes typically follow hyphenated names ("foo-bar"), whereas properties typically use camelCase names ("fooBar"). This mixin respects that convention, automatically mapping the hyphenated attribute name to the corresponding camelCase property name and invoking the indicated property setter.

Attributes can only have string values, so a string value is what is passed to the property setter. If you'd like to convert string attributes to other types
(numbers, booleans), you must implement parsing yourself in the property setter. For example, the following code implements a Boolean property that can be set as either: a) a Boolean value or b) a string representing a Boolean value:

    get fooBar() {
      return this[fooBarSymbol];
    }
    set fooBar(fooBar) {
      const parsed = String(fooBar) === 'true'; // Cast to Boolean
      const changed = parsed !== this[fooBarSymbol];
      this[fooBarSymbol] = parsed;
      if ('fooBar' in base.prototype) { super.fooBar = fooBar; }
      if (changed && this[symbols.raiseChangeEvents]) {
        const event = new CustomEvent('foo-bar-changed');
        this.dispatchEvent(event);
      }
    }


## `observedAttributes`

`AttributeMarshallingMixin` also provides a default implementation of the static `observedAttributes` property. This static getter on the class returns an array of the attributes the component wishes to monitor.

This mixin assumes that the component wishes to monitor changes in attributes that map to all public properties in the component's API. E.g., in the above example, the component defines a property called `fooBar`, so the default value of `observedAttributes` will automatically include an entry for the hyphenated attribute name, "foo-bar". A component can override this default implementation `observedAttributes` if, for some reason, it does _not_ want to monitor changes in some of its properties. (It is unclear why that would be useful, but that's up to the developer to decide.)
