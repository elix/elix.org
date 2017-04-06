# LabeledTabButton

This is a simple button component intended to show a text label, and styled by
default to look like a classic tab. It is used by [LabeledTabs](LabeledTabs)
to render button components for a set of tab panels.

The button supports a `tab-position` attribute that controls whether the tab
should style itself appropriately for appearing at the top, bottom, left or
right edge of the panels it controls. Visually, the tab button will have no
interior border on the edge it shares with the panels, so that the tab button
and panel appear to exist on the same surface. By default, the two corners
opposite that edge are rounded in skeumorphic reference to the tabs of
real-world tabbed cardstock folders.

The `LabeledTabButton` class is registered as element `<elix-labeled-tab-button>`.
