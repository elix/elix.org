# PageDotsMixin

**Purpose:** adds page dots to a carousel-like component like [SlidingCarousel](SlidingCarousel), adding one dot for each item in the carousel.

This mixin does most of its work at the beginning of the Elix user interface [pipeline](pipeline), although it also participates indirectly in rendering by adding elements to a component's template.

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `items` property returning the element's items, usually via [ContentItemsMixin](ContentItemsMixin).
* `selectedIndex` property governing which item is selected, usually via [SingleSelectionMixin](SingleSelectionMixin).
* `symbols.template` property for [ShadowTemplateMixin](ShadowTemplateMixin). The property getter must invoke the mixin's `wrapWithPageDots` (below).

**Provides** the component with:
* `wrapWithPageDots` method that wraps a string template with the elements for the page dots.


## Usage

    import PageDotsMixin from 'elix/src/PageDotsMixin.js';
    import symbols from 'elix/src/symbols.js';

    class MyElement extends PageDotsMixin(HTMLElement) {
      get [symbols.template]() {
        return `
          ... Elements outside page dots go here ...
          ${this.wrapWithPageDots(`
            ... Elements inside page dots go here ...
          `)}
        `;
      }
    }

See also [ArrowDirectionMixin](ArrowDirectionMixin).


### Example

[`PageDotsMixin` provides a dot for each item in a carousel](/demos/slidingPagesWithDots.html)
