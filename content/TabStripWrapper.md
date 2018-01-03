# TabStripWrapper

This wrapper adds a [TabStrip](TabStrip) to a base element, wiring the selection states of the two together. For example, the [Tabs](Tabs) component uses `TabStripWrapper` to connect a `TabStrip` to a [Modes](Modes) instance.

See the [wrappers](wrappers) overview for more details, including an example featuring `TabStripWrapper`.

As discussed in that example, a component using `TabStripWrapper` gains a slot called `tabButtons`. Child elements assigned to that slot will be appear inside the `TabStrip`.

`TabStripWrapper` handles the assignment of ARIA roles necessary to support best practices. It assigns a default ARIA role of `tablist` to the component itself and `tabpanel` to each tab panel.
