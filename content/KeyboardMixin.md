# KeyboardMixin

This mixin lets a component and multiple mixins all handle keyboard events with
a single `keydown` event listener, with the general intention of supporting
keyboard navigation of a component's main features.

Keyboard support is an important aspect of supporting universal access, as
covered in the Gold Standard checklist item [Keyboard
Support](https://github.com/webcomponents/gold-standard/wiki/Keyboard-Support)
(Can you use the basic aspects of component exclusively with the keyboard?)
Along with supporting the keyboard, your component should also support the
checklist item [Declared
Semantics](https://github.com/webcomponents/gold-standard/wiki/Declared-Semantics)
(Does the component expose its semantics by wrapping/extending a native element,
or using ARIA roles, states, and properties?). See
[SelectionAriaMixin](SelectionAriaMixin) for more details.

This mixin uses a `keydown` listener rather than `keyup`, as most keyboard
behavior (e.g., pressing arrow keys) should respond on keydown for faster
response time and to allow key repeats. A `keydown` event is used instead of
`keypress` because `keypress` is not fired when many keys are pressed, including
Tab, Delete, backspace, arrow keys. (See this [webkit
changelog](https://lists.webkit.org/pipermail/webkit-dev/2007-December/002992.html)
for more details.)

When `KeyboardMixin` receives a keydown event, it invokes a method called
`symbols.keydown`, passing in the event object. The component or its other
mixins can then take their turns examining the event. An implementation of
`symbols.keydown` should return `true` if it handled the event, and `false`
otherwise.

Some related keyboard mixins that rely on `KeyboardMixin` to invoke
`symbols.keydown` include [KeyboardDirectionMixin](KeyboardDirectionMixin),
[KeyboardPagedSelectionMixin](KeyboardPagedSelectionMixin), and
[KeyboardPrefixSelectionMixin](KeyboardPrefixSelectionMixin).

The convention for handling `symbols.keydown` is that the last mixin applied
wins. That is, if an implementation of `symbols.keydown` *did* handle the event,
it can return immediately. If it did not, it should invoke `super` to let
implementations further up the prototype chain have their chance.

Example:

    class EnterElement extends KeyboardMixin(HTMLElement) {
      [symbols.keydown](event) {
        if (event.keyCode === 13 /* Enter */) {
          console.log("Enter key was pressed.");
          return true; // We handled the event.
        }
        // We didn't handle the event; invoke super.
        return super[symbols.keydown] && super[symbols.keydown](event);
      }
    }

If an implementation of `symbols.keydown` returns `true` — indicating that the
event was handled — then `KeyboardMixin` invokes the event's `preventDefault`
and `stopPropagation` methods to let the browser know the event was handled.

Examples of components using `KeyboardMixin` include
[ListBox](ListBox) and [TabStrip](TabStrip).
