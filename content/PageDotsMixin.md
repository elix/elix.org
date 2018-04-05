# PageDotsMixin

**Purpose:** adds page dots to a carousel-like component like [Carousel](Carousel), adding one dot for each item in the carousel.

This mixin does most of its work at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline), although it also participates indirectly in rendering by adding elements to a component's template.

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `items` property returning the element's items, usually via [ContentItemsMixin](ContentItemsMixin).
* `selectedIndex` property governing which item is selected, usually via [SingleSelectionMixin](SingleSelectionMixin).
* `symbols.template` property for [ShadowTemplateMixin](ShadowTemplateMixin). The property getter must invoke the mixin's `wrapWithPageDots` (below).

**Provides** the component with:
* `wrapWithPageDots` method that wraps a string template with the elements for the page dots.


## Usage

    import { PageDotsMixin, symbols } from 'elix';

    class MyElement extends PageDotsMixin(HTMLElement) {
      get [symbols.template]() {
        return `
          ... Elements outside page dots go here ...
          ${PageDotsMixin.wrap(`
            ... Elements inside page dots go here ...
          `)}
        `;
      }
    }

`PageDotsMixin` is a [mixin that contributes to a component's template](mixins#mixins-that-contribute-to-a-component-s-template), as shown above.

See also [ArrowDirectionMixin](ArrowDirectionMixin).


### Example

[`PageDotsMixin` provides a dot for each item in a carousel](/demos/slidingPagesWithDots.html)
