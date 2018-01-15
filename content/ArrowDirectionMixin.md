# ArrowDirectionMixin

**Purpose:** adds left and right arrow buttons to a carousel-like component like [SlidingCarousel](SlidingCarousel).

This mixin does most of its work at the beginning of the Elix user interface [pipeline](pipeline), although it also participates indirectly in rendering by adding elements to a component's template.

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `symbols.canGoLeft` and `symbols.canGoRight` properties, typically via [DirectionSelectionMixin](DirectionSelectionMixin). These properties determine when the arrow buttons are enabled or disabled. If the component does not define these properties, the arrow buttons are always enabled.
* `symbols.goLeft` and `symbols.goRight` methods, typically via [DirectionSelectionMixin](DirectionSelectionMixin).
* `symbols.template` property for [ShadowTemplateMixin](ShadowTemplateMixin). The property getter must invoke the mixin's `wrapWithArrowDirection` (below).

**Provides** the component with:
* `wrapWithArrowDirection` method that wraps a string template with the elements for left and right arrow buttons.


## Usage

    import ArrowDirectionMixin from 'elix/src/ArrowDirectionMixin.js';
    import symbols from 'elix/src/symbols.js';

    class MyElement extends ArrowDirectionMixin(HTMLElement) {
      get [symbols.template]() {
        return `
          ... Elements outside arrows go here ...
          ${this.wrapWithArrowDirection(`
            ... Elements inside arrows go here ...
          `)}
        `;
      }
    }

As currently implemented, `ArrowDirectionMixin` only displays the arrow buttons if mouse movement is detected. This behavior is intended to avoid showing arrows when the user is viewing a carousel-like component on a mobile device with no mouse. In such cases, it is expected that the component will provided touch gestures (e.g., with [TouchSwipeMixin](TouchSwipeMixin)), so the arrows are unnecessary and may prove distracting or reduce the screen real estate available for touch gestures.

See also [PageDotsMixin](PageDotsMixin).


### Example

[`ArrowDirectionMixin` provides left and right arrow buttons if a mouse is detected](/demos/slidingPagesWithArrows.html)
