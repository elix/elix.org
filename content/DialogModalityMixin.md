# DialogModalityMixin

**Purpose:** blocks various user interactions to make an overlay behave like a modal dialog. This mixin is generally used in conjunction with a backdrop like [ModalBackdrop](ModalBackdrop).

This mixin works in the middle of the Elix user interface [pipeline](pipeline):

> events → **methods** ➞ **methods** → setState → render → update DOM

**Expects** the component to provide:
* `close` method and `closed` property, typically via [OpenCloseMixin](OpenCloseMixin).
* `keydown` method for keyboard events, typically via [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Disables scrolling on the background document. **This is a global side-effect of opening the component.**
* A default ARIA `role` of `dialog`.
* Closes the element if user presses the Esc key.

## Usage

    import DialogModalityMixin from 'elix/src/DialogModalityMixin.js';
    class MyElement extends DialogModalityMixin(HTMLElement) {}

For modeless overlays, see [PopupModalityMixin](PopupModalityMixin) instead.


### Example

[This overlay uses `DialogModalityMixin` for dialog behavior](/demos/dialog.html)
