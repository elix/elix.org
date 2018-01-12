# LanguageDirectionMixin

**Purpose:** helps an element determine whether it's in the context of right-to-left text..

This mixin works at the beginning of the Elix user interface [pipeline](pipeline):

> **events** ➞ **setState** → render → update DOM

**Expects** the component to provide:
* `componentDidMount`, typically via [ReactiveMixin](ReactiveMixin).

**Provides** the component with:
* `state.languageDirection` state member equal to "ltr" (left-to-right) or "rtl" (right-to-left),
depending on the element's effective `dir` attribute value.
* `rightToLeft` property.


## Usage

    import LanguageDirectionMixin from 'elix/src/LanguageDirectionMixin.js';
    class MyElement extends LanguageDirectionMixin(HTMLElement) {}

This mixin is useful for components that need to orient a sequence horizontally. In right-to-left languages (Arabic, Hebrew), the beginning of a list should appear on the _right_, instead on the left in left-to-right languages (English, etc.).


### Example

[Horizontal list set for right-to-left text layout](/demos/horizontalListRightToLeft.html)

This horizontally-scrolling [ListBox](ListBox) is layed out right-to-left, as in languages like Arabic and Hebrew. Accordingly, the list starts on the right and goes to the left. The Left and Right arrow keys are sensitive to the text direction, so still work as expected. The Home and End keys select the rightmost and leftmost items, respectively (the opposite of what they would do in left-to-right text).

[SlidingCarousel set for right-to-left layout](/demos/slidingCarouselRightToLeft.html)

In the context of a right-to-left language, this `SlidingCarousel` starts with the first item on the right instead of the left. You can compare this with its standard left-to-right demo on the  [SlidingCarousel](SlidingCarousel) page.
