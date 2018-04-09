# Popup

A lightweight form of modeless [Overlay](Overlay) that, when opened, displays its assigned children on top of other page elements.

[Clicking the button opens a simple popup](/demos/popup.html)

## Usage

You can use `Popup` for overlays that float over other content and are easily dismissed. `Popup` incorporates [PopupModalityMixin](PopupModalityMixin), and so will be dismissed if the user:

* Clicks outside the popup.
* Presses the Esc key.
* Moves the focus outside the popup.
* Scrolls the document.
* Resizes the document.
* Switches focus away from the document.

If your popup needs are simple, you might use `Popup` on its own. For more complex situations, it may be easier to apply `PopupModalityMixin` to your own component.

For modal overlays, see [Dialog](Dialog) or its constituents [DialogModalityMixin](DialogModalityMixin) and [ModalBackdrop](ModalBackdrop). For a plain overlay base class that provides no built-in modal or modeless user interface, see [Overlay](Overlay).

See also [Toast](Toast), a special type of popup that appears at the edge of the window.
