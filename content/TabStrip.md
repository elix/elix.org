# TabStrip

A row or column of tab buttons, typically as part of a [Tabs](Tabs) or similar component. `TabStrip` is responsible for positioning the tab buttons, handling keyboard navigation, and supporting accessibility. `TabStrip` is provided for cases where you want to construct your own tabbed UI beyond what's possible with `Tabs`.

`TabStrip` relies upon the tab buttons it contains to provide an appropriate visual appearance. A generic instance of `TabStrip` that uses plain `<button>` instances for tab buttons might look like this:

[Generic TabStrip with plain buttons](/demos/tabStrip.html)

For a typical tabbed button apperance, you can use instances of [TabButton](TabButton) inside the `TabStrip`:

[TabStrip with default TabButton instances](/demos/tabStripWithTabButtons.html)


The `TabStrip` class is registered as element `<elix-tab-strip>`.


## Keyboard support

`TabStrip` provides some additional keyboard support to make it easier for your users to switch tabs:

* If one tab in the strip has the keyboard focus, you can press Left/Right (in horizontal orientation) or Up/Down (in vertical orientation) to select the previous/next tab.
* If you move the keyboard focus to an unselected tab, you can press Space or Enter to select that tab.
