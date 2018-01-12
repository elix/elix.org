# SlidingPages

A typical carousel with a sliding effect. The user can move between items with touch, the mouse, the keyboard, or a trackpad.

[Sliding pages](/demos/slidingPages.html)

`SlidingPages` provides no visible UI elements for navigation the items. For a variation of `SlidingPages` that includes left/right arrow buttons and page dots, see [SlidingCarousel](SlidingCarousel).


## Usage

    import SlidingPages from 'elix/src/SlidingPages.js';
    const listBox = new SlidingPages(); // or
    const listBox = document.createElement('elix-sliding-pages');

    <elix-sliding-pages>
      <!-- Carousel items such as img elements go here. -->
    </elix-sliding-pages>

`SlidingPages` is appropriate when:
* You want to present to the user a collection of images, or a mixture of graphical and textual content.
* You want to let the user focus on a single item at a time.
* The number of items may be large, but you can give the user a reasonable starting point in the collection, and there is reason to believe that the item(s) they will want to see are close to that point.
