# AttributeMarshallingMixin

`AttributeMarshallingMixin` lets a component easily map attributes to properties
and vice versa. For the latter, it uses a set of separately-available helpers
called [attributes](attributes) that components can use to enqueue attribute
changes in their constructor, when direct attribute updates are prohibited.

This sample component defines a property:

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

Because the component applies `AttributeMarshallingMixin`, the camelCase
`fooBar` property can be set in markup via the hyphenated "foo-bar" attribute:

    <my-element foo-bar="Hello"></my-element>

When this element is instantiated, the `fooBar` property setter will
automatically be invoked with the initial value "Hello".

## `attributeChangedCallback`
This mixin implements an `attributeChangedCallback` that will convert a change
in an element attribute into a call to the corresponding property setter.
Attributes typically follow hyphenated names ("foo-bar"), whereas properties
typically use camelCase names ("fooBar"). This mixin respects that convention,
automatically mapping the hyphenated attribute name to the corresponding
camelCase property name and invoking the indicated property setter.

Attributes can only have string values, so a string value is what is passed to
the property setter. If you'd like to convert string attributes to other types
(numbers, booleans), you must implement parsing yourself in the property setter.
For example, the following code implements a Boolean property that can be set as
either: a) a Boolean value or b) a string representing a Boolean value:

    get fooBar() {
      return this[fooBarSymbol];
    }
    set fooBar(fooBar) {
      const parsed = String(fooBar) === 'true'; // Cast to Boolean
      const changed = parsed !== this[fooBarSymbol];
      this[fooBarSymbol] = parsed;
      if ('fooBar' in base.prototype) { super.fooBar = fooBar; }
      if (changed && this[symbols.raiseChangeEvents]) {
        const event = new CustomEvent('selection-required-changed');
        this.dispatchEvent(event);
      }
    }


## `observedAttributes`

`AttributeMarshallingMixin` also provides a default implementation of
`observedAttributes`. This static getter on the class should return an array of
the attributes the component wishes to monitor. This mixin assumes that the
component wishes to monitor changes in attributes that map to all public
properties in the component's API. E.g., in the above example, the component
defines a property called `fooBar`, so the default value of `observedAttributes`
will automatically include an entry for the hyphenated attribute name,
"foo-bar". A component can override this default implementation
`observedAttributes` if, for some reason, it does _not_ want to monitor changes
in some of its properties. (It is unclear why that would be useful, but that's
up to the developer to decide.)


## Updating attributes

The mixin also facilitates marshalling property values in the opposite
direction: i.e., changes in properties that should in turn update attributes.
This is not normally necessary, but is useful in specific circumstances: a)
reflecting a property value to an attribute for CSS styling purposes, or b)
updating an ARIA attribute for accessibility purposes.

This mixin makes use of the [attributes](attributes) helpers to allow attributes
to be specified during the component's constructor.
