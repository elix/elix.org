# PopupModalityMixin

**Purpose:** makes an overlay behave like a popup by dismissing it when certain user interactions occur.

This mixin works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `close` method and `closed` property, typically via [OpenCloseMixin](OpenCloseMixin).
* `keydown` method for keyboard events, typically via [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Event handlers that close the element if the user clicks outside the element, presses the Esc key, moves the focus outside the element, scrolls the document, resizes the document, or switches focus away from the document.
* A default ARIA `role` of `alert`.


## Usage

    import PopupModalityMixin from 'elix/src/PopupModalityMixin.js';
    class MyElement extends PopupModalityMixin(HTMLElement) {}

For modal overlays, use [DialogModalityMixin](DialogModalityMixin) instead. See the documentation of that mixin for a comparison of modality behaviors.


### Example

[This overlay's behavior comes from `PopupModalityMixin`](/demos/popup.html)
