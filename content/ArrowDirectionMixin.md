# ArrowDirectionMixin

**Purpose:** adds left and right arrow buttons to a carousel-like component like [SlidingCarousel](SlidingCarousel).

This mixin does most of its work at the beginning of the [Elix render pipeline](/documentation#elix-render-pipeline), although it also participates indirectly in rendering by adding elements to a component's template.

> **events** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `symbols.canGoLeft` and `symbols.canGoRight` properties, typically via [DirectionSelectionMixin](DirectionSelectionMixin). These properties determine when the arrow buttons are enabled or disabled. If the component does not define these properties, the arrow buttons are always enabled.
* `symbols.goLeft` and `symbols.goRight` methods, typically via [DirectionSelectionMixin](DirectionSelectionMixin).
* `symbols.template` property for [ShadowTemplateMixin](ShadowTemplateMixin). The property getter must invoke the mixin's `wrapWithArrowDirection` (below).

**Provides** the component with:
* `wrap` method that wraps a string template with the elements for left and right arrow buttons.


## Usage

    import { ArrowDirectionMixin, symbols } from 'elix';

    class MyElement extends ArrowDirectionMixin(HTMLElement) {
      get [symbols.template]() {
        return `
          ... Elements outside arrows go here ...
          ${ArrowDirectionMixin.wrap(`
            ... Elements inside arrows go here ...
          `)}
        `;
      }
    }

`ArrowDirectionMixin` is a [mixin that contributes to a component's template](mixins#mixins-that-contribute-to-a-component-s-template), as shown above.

As currently implemented, `ArrowDirectionMixin` only displays the arrow buttons if mouse movement is detected. This behavior is intended to avoid showing arrows when the user is viewing a carousel-like component on a mobile device with no mouse. In such cases, it is expected that the component will provided touch gestures (e.g., with [TouchSwipeMixin](TouchSwipeMixin)), so the arrows are unnecessary and may prove distracting or reduce the screen real estate available for touch gestures.

See also [PageDotsMixin](PageDotsMixin).


### Example

[`ArrowDirectionMixin` provides left and right arrow buttons if a mouse is detected](/demos/slidingPagesWithArrows.html)
