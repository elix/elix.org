# SlidingStage

Displays a set of items on a horizontal axis, with a single item completely visible at a time. It shows a sliding transition when changing which item is selected.

`SlidingStage` provides no interaction on its own, but is the basis for carousel-like components in Elix, including [Carousel](Carousel) and [SlidingPages](SlidingPages) (shown below). Those components handle a variety of input methods to let the user navigate which item is shown in the viewport.

[You can navigate this `SlidingPages` with touch/mouse/keyboard/trackpad](/demos/slidingPages.html)

`SlidingStage` can be used as the stage in an [Explorer](Explorer). Here `SlidingStage` is used to provide a sliding transition between the pages in a [Tabs](Tabs) instance:

[`SlidingStage` used in `Tabs` for navigation](/demos/toolbarTabs.html)
