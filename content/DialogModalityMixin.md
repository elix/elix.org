# DialogModalityMixin

**Purpose:** blocks various user interactions to make an overlay behave like a modal dialog. This mixin is generally used in conjunction with [OverlayMixin](OverlayMixin) for basic overlay behavior, and a backdrop like [ModalBackdrop](ModalBackdrop) for additional modality.

This mixin primarily works in the updates phase of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → methods → setState → **updates** → render DOM → post-render

**Expects** the component to provide:
* `close` method and `closed` property, typically via [OpenCloseMixin](OpenCloseMixin).
* `keydown` method for keyboard events, typically via [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Disables scrolling on the background document. *This is a global side-effect of opening the component.*
* A default ARIA `role` of `dialog`.
* Closes the element if user presses the Esc key.


## Usage

    import DialogModalityMixin from 'elix/src/DialogModalityMixin.js';
    class MyElement extends DialogModalityMixin(HTMLElement) {}

In general, use modal overlays with `DialogModalityMixin` only when it's critical that you gain the user's attention, or when you need them to provide a response in order to continue.

For all other overlay situations, consider making the overlay a popup with [PopupModalityMixin](PopupModalityMixin) instead.


### Example

[This dialog's behavior comes from `DialogModalityMixin` and `ModalBackdrop`](/demos/dialog.html)
