# AlertDialog

A type of [Dialog](Dialog) optimized for asking a single question the user can respond to with a small set of choices.

[Some simple `AlertDialog` examples](/demos/alertDialog.html)

## Usage

An `AlertDialog` is designed to be easy for you to create in JavaScript, making it an expedient way to ask the user a quick question with limited choices.

    import AlertDialog from 'elix/src/AlertDialog.js';

    const dialog = new AlertDialog();
    dialog.textContent = 'Hello, world';
    dialog.choices = ['OK', 'Cancel'];
    dialog.open();
    dialog.whenClosed().then(result => {
      response.textContent = result ?
        "You picked " + result + "." :
        "You didn't make a choice.";
    });

Like all modal UI elements, use `AlertDialog` sparingly. They can be effective in getting a user's attention, but because they're usually not anticipated, they typically interrupt the user's flow of work. Most modal UIs can be redesigned to avoid the use of modality and provide a better user experience.


## Choices

An `AlertDialog` presents the user a set of buttons they can click to respond to the dialog's question. You can control this set of buttons by supplying the dialog's `choices` property with an array of strings; a button will be created for each string.

By default, the `choices` property contains the single choice, "OK".

To help keyboard users, `AlertDialog` defines keyboard shortcuts for the choices: while the dialog is open, pressing a key that corresponds to the first character of a choice selects that choice. (If more than one choice shares that letter, the first such choice is selected.)

The selected choice is returned as the result of the dialog.

Pressing the Esc key cancels the dialog, and returns a result of null.
