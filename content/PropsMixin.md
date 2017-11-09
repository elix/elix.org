# PropsMixin

**Purpose:** Renders changes in a component's state by efficiently updating
attributes, classes, styles, and properties on the component's host element and
its shadow elements.

**Provides the component with:**
* An internal `symbols.render` method that will be invoked when the component is rendering.
* A state property `state.original` that returns the original attributes, classes, and styles on the host element.
* An overridden `setAttribute` method and `style` property setter that can track live changes
to a component's style made by the application.

**Expects the component to provide:**
* A `props` getter that contains the changes the component would like to make to its own attributes, classes, styles, as well as to those of its shadow elements.

This arrangement lets mixins and component subclasses easily participate in the rendering of the component. For example, a subclass can alter the styling defined by a base class.
For more details, see the section below on "Mixins and subclasses".


## Example

The documentation for [ReactiveMixin](ReactiveMixin) provides a sample increment/decrement component, and shows how that mixin can be used in conjunction with `PropsMixin`.

    get props() {
      return {
        $: {
          value: {
            textContent: this.state.value
          }
        }
      }
    }


## Attributes

## Classes

## Styles


    get props() {
      return {
        style: {
          color: this.state.value < 0 ? 'red' : ''
        }
      }
    }

see mixins and subclasses

## Properties

Use only with shadow elements, not the host

## Updating shadow elements

## "original" props

Handling live changes to a component's host element from the application

## Mixins and subclasses

