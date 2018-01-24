# SlidingCarousel

A typical carousel with a sliding effect, left/right arrow buttons, and page dots.

[Sliding carousel](/demos/slidingCarousel.html)

The user can move between items with touch, the mouse, the keyboard, or a trackpad. For a carousel that supports the same types of navigation, but without arrows or dots, see [SlidingPages](SlidingPages).

`SlidingCarousel` uses a [SlidingViewport](SlidingViewport) to render the items. The left/right arrow buttons are provided by [ArrowDirectionMixin](ArrowDirectionMixin), and the small dots at the bottom of the carousel are provided by [PageDotsMixin](PageDotsMixin). It's possible to wrap `SlidingViewport` with just arrows (if you don't want dots) or just page dots (if you don't want arrow buttons); see the demos of those mixins for examples.

`SlidingCarousel` incorporates [LanguageDirectionMixin](LanguageDirectionMixin) so that it can flip the order of items in right-to-left languages. See that page for a demonstration.


## Usage

    import SlidingCarousel from 'elix/src/SlidingCarousel.js';
    const slidingCarousel = new SlidingCarousel(); // or
    const slidingCarousel = document.createElement('elix-sliding-carousel');

In HTML:

    <script type="module" src="node_modules/elix/src/SlidingCarousel.js"></script>
    <elix-sliding-carousel>
      <!-- Carousel items such as img elements go here. -->
    </elix-sliding-carousel>

`SlidingCarousel` is appropriate when:
* You want to present to the user a collection of images, or a mixture of graphical and textual content.
* You want to let the user focus on a single item at a time.
* The number of items is small (2–10). The `PageDotsMixin` will create a [PageDot](PageDot) for each item, which would be unweildy for larger collections. If you have a large collection of images to show, it might be better to use [SlidingPages](SlidingPages), or create your own component that uses `ArrowDirectionMixin` but not `PageDotsMixin`.
