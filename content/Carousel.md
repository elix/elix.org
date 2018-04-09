# Carousel

A typical carousel with a sliding effect, left/right arrow buttons, and page dots.

[A Carousel](/demos/carousel.html)

The user can move between items with touch, the mouse, the keyboard, or a trackpad.

`Carousel` uses a [SlidingStage](SlidingStage) as the "stage" for rendering the featured or selected item. The left/right arrow buttons are provided by [ArrowDirectionMixin](ArrowDirectionMixin).

By default, each item in the list is represented with a simple [PageDot](PageDot) as a proxy element. The related [CarouselWithThumbnails](CarouselWithThumbnails) represents items with a [Thumbnail](Thumbnail) proxy instead of a dot. You can also [supply custom proxy elements](Explorer#supplying-proxies-for-the-items) used to represent the items.

For a carousel that supports the same types of navigation, but without arrows, dots, or other adornments, see [SlidingPages](SlidingPages).

`Carousel` uses [ArrowDirectionMixin](ArrowDirectionMixin) to create the left and right arrow buttons. See that mixin for customization options.

`Carousel` incorporates [LanguageDirectionMixin](LanguageDirectionMixin) so that it can flip the order of items in right-to-left languages. See that page for a demonstration.


## Usage

    import Carousel from 'elix/src/Carousel.js';
    const carousel = new Carousel(); // or
    const carousel = document.createElement('elix-carousel');

In HTML:

    <script type="module" src="node_modules/elix/src/Carousel.js"></script>
    <elix-carousel>
      <!-- Carousel items such as img elements go here. -->
      <img src="image1.jpg">
      <img src="image2.jpg">
      <img src="image3.jpg">
      <img src="image4.jpg">
      <img src="image5.jpg">
    </elix-carousel>

`Carousel` is appropriate when:
* You want to present to the user a collection of images, or a mixture of graphical and textual content.
* You want to let the user focus on a single item at a time.
* The number of items is small (2–10). The `Carousel` will create a [PageDot](PageDot) for each item, which would be unweildy for larger collections. If you have a large collection of images to show, it might be better to use [CarouselWithThumbnails](CarouselWithThumbnails) or [SlidingPages](SlidingPages) directly.
