# SlidingPages

A typical carousel with a sliding effect. The user can move between items with touch, the mouse, the keyboard, or a trackpad.

[You can navigate sliding pages with touch/mouse/keyboard/trackpad](/demos/slidingPages.html)

`SlidingPages` wraps a [SlidingViewport](SlidingViewport) and adds various input mixins, such as [TouchSwipeMixin](TouchSwipeMixin).

`SlidingPages` provides no visible UI elements for navigation the items. For a variation of `SlidingPages` that includes left/right arrow buttons and page dots, see [SlidingCarousel](SlidingCarousel).


## Usage

    import SlidingPages from 'elix/src/SlidingPages.js';
    const slidingPages = new SlidingPages(); // or
    const slidingPages = document.createElement('elix-sliding-pages');

    <elix-sliding-pages>
      <!-- Carousel items such as img elements go here. -->
    </elix-sliding-pages>

`SlidingPages` is appropriate when:
* You want to present to the user a collection of images, or a mixture of graphical and textual content.
* You want to let the user focus on a single item at a time.
* The number of items may be large, but you can give the user a reasonable starting point in the collection, and there is reason to believe that the item(s) they will want to see are close to that point. If you have a small collection of items (10 or fewer), consider using [SlidingCarousel](SlidingCarousel) instead, which provides dots for easy navigation.

The simpler [Modes](Modes) component is useful in cases where you do not need to provide a sliding effect.
