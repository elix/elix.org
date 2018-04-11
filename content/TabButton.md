# TabButton

A classic rounded tab button.

[By default, `Tabs` creates a `TabButton` for each tab panel](/demos/tabs.html)

This component is intended to show a text label, and styled by default to look like a classic tab. [Tabs](Tabs) uses this class as the default proxy for tab panels — for each tab panel, `Tabs` will create a corresponding `TabButton`.

The button supports a [position](#position) property that controls whether the tab should style itself appropriately for appearing at the top, bottom, left or right edge of the panels it controls. Visually, the tab button will have no interior border on the edge it shares with the panels, so that the tab button and panel appear to exist on the same surface. By default, the two corners opposite that edge are rounded in skeumorphic reference to the real-world tabs on cardstock folders.

The `TabButton` class is registered as element `<elix-tab-button>`.
