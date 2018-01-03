# TabStrip

A row or column of tab buttons, typically as part of a [Tabs](Tabs) or similar component. It is responsible for positioning the tab buttons, handling keyboard navigation, and supporting accessibility.

A generic instance of `TabStrip` that uses plain `<button>` instances for tab buttons might look like this:

[Generic TabStrip with plain buttons](/demos/tabStrip.html)

The [LabeledTabs](LabeledTabs) component uses `TabStrip` internally to position its buttons:

[LabeledTabs uses TabStrip interally](/demos/labeledTabs.html)

`TabStrip` assigns a default ARIA role of `tab` to each button.

The `TabStrip` class is registered as element `<elix-tab-strip>`.
