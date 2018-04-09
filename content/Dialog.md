# Dialog

A basic type of [Overlay](Overlay) that presents its assigned children as a
basic modal dialog which appears on top of the main page content. The user must
interact with the dialog before they can return to the page.

[Clicking the button opens a simple dialog](/demos/dialog.html)

Dialog uses [ModalBackdrop](ModalBackdrop) to add a backdrop behind the main overlay content.


## Usage

    import Dialog from 'elix/src/Dialog.js';
    const dialog = new Dialog(); // or
    const dialog = document.createElement('elix-dialog');

In HTML:

    <script type="module" src="node_modules/elix/src/Dialog.js"></script>
    <elix-dialog>
      <!-- Dialog contents go here -->
    </elix-dialog>

As with other elements that use [DialogModalityMixin](DialogModalityMixin), use modal overlays only when it's critical that you gain the user's attention, or when you need them to provide a response in order to continue. For all other overlay situations, consider using a [Popup](Popup) or other component using [PopupModalityMixin](PopupModalityMixin).

For a simple form of `Dialog` that can be easily created in JavaScript to ask a single question, see [AlertDialog](AlertDialog).


## Keyboard support

`Dialog` uses [FocusCaptureMixin](FocusCaptureMixin) to wrap the keyboard focus within the dialog. The keyboard focus is initially on the dialog itself. Pressing Tab will cycle through the dialog's focusable elements. When the user reaches the last of the dialog's focusable elements, pressing Tab focuses the dialog again, repeating the cycle.

Pressing the Esc key closes the dialog.
