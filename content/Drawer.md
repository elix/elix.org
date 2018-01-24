# Drawer

A drawer is a modal panel that slides in from the side of the page. A drawer is generally used to provide navigation in situations where: a) screen real estate is constrained and b) the navigation UI is not critical to completing the user’s primary goal (and, hence, not critical to the application’s business goal).

[The button above opens a typical drawer](/demos/drawer.html)

`Drawer` displays a [ModalBackdrop](ModalBackdrop) behind the main overlay content to help the user understand the modal condition. Both the backdrop and the dialog itself can be styled.

`Drawer` is very similar to [Dialog](Dialog) in construction, and provides the same level of [keyboard support](Dialog#keyboard-support).

The user may dismiss the drawer by pressing Esc, or by swiping to the side with touch or the trackpad. You may also provide a UI element inside the drawer — e.g., a close box — that dismisses the drawer.


## Usage

    import Drawer from 'elix/src/Drawer.js';
    const drawer = new Drawer(); // or
    const drawer = document.createElement('elix-drawer');

In HTML:

    <script type="module" src="node_modules/elix/src/Drawer.js"></script>
    <elix-drawer>
      <!-- Drawer contents go here -->
    </elix-drawer>
