# OverlayMixin

**Purpose:** make an opened element appear on top of other page elements, then hide or remove it when closed.

This mixin primarily works in the render phase of the Elix user interface [pipeline](pipeline):

> events → methods → setState → **render ➞ update DOM**

It also performs some additional work after updates have been rendered to the DOM.

**Expects** the component to provide:
* `closed` property indicating whether the overlay is closed. You can use [OpenCloseMixin](OpenCloseMixin) to provide this property.
* optional `closeFinished` property indicating whether the overlay has finished rendering its closed state. If defined, the overlay will not be rendered as closed until `closeFinished` is true. This is designed to let `OverlayMixin` interoperate cleanly with [TransitionEffectMixin](TransitionEffectMixin).

**Provides** the component with:
* `updates` property for [RenderUpdatesMixin](RenderUpdatesMixin) that applies overlay styling, primarily a `z-index` (see below).
* Appends the element to the DOM when opened, if it’s not already in the DOM. When later closed, the element will be removed from the DOM.
* Remembers which element had the focus before the overlay was opened, and tries to restore the focus there when the overlay is closed.


## Usage

    import OverlayMixin from 'elix/src/OverlayMixin.js';
    class MyElement extends OverlayMixin(HTMLElement) {}

`OverlayMixin` provides the core overlay behavior for Elix elements. It is often used in combination with:
* [OpenCloseMixin](OpenCloseMixin) to provide a component with open/close semantics.
* [PopupModalityMixin](PopupModalityMixin) or [DialogModalityMixin](DialogModalityMixin) to intercept and respond to UI events.
* [TransitionEffectMixin](TransitionEffectMixin) to handle open/close transition effects.
* [ModalBackdrop](ModalBackdrop) to absorb background clicks.


### Example

[A `Dialog` uses `OverlayMixin` to appear on top](/demos/dialog.html)


## Calculating a default `z-index`

If an overlay element has not been assigned a CSS `z-index`, `OverlayMixin` calculates a default `z-index` for the element that should be sufficient for it to appear above all currently-visible elements.

This calculation looks at all light DOM elements, so is theoretically expensive. That said, it only runs when an overlay is opening, and is only used if an overlay doesn't have a z-index already. In cases where performance is an issue, you can completely avoid this calculation by taking care to manually applying an appropriate z-index to an overlay.
