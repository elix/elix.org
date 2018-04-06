# Explorer

`Explorer` serves as a base class for implementing user interface patterns that couple two elements: 1) a "list" element that presents multiple items at a time for selection, and 2) a "stage" element for focusing attention on a single selected item at a time.

Some components that extend `Explorer` include the following:

[`Carousel` uses a set of dots as its list, and a `SlidingStage` as its stage](/demos/carousel.html)

[`Tabs` uses `TabButton` elements in its list and `Modes` as its stage](/demos/tabs.html)

[A `Tabs` variation for navigation using `SlidingStage` as the stage](/demos/toolbarTabs.html)

[`ListExplorer` uses a `ListBox` for the list and `Modes` for the stage](/demos/listExplorer.html)

These components present different user interfaces, but they all possess a list synchronized with a stage. The specific form of the list or stage can vary while remaining true to the pattern. For example, both [Modes](Modes), [SlidingStage](SlidingStage), [CrossfadeStage](CrossfadeStage) can all serve as a stage showing a single item at a time — the only difference is the type of visual transition they display when the selection changes. `Modes` shows an immediate transition, `SlidingStage` shows a horizontal sliding effect, and `CrossfadeStage` shows a crossfade effect.

You can create variations of this pattern by customizing `Explorer` through properties that determine the type of element used for the list (the `listTag` property) or stage (`stageTag`).

`Explorer` takes care of synchronizing the list and stage elements: if the selection changes in either element, the selection of the other element will be updated to match. The items in the list element are said to be _proxies_ for the items shown on the stage. (See more on proxies, below.)

`Explorer` also manages the visual positioning of the list in relation the stage (top/left/bottom/right).

## Supplying items to an `Explorer`

You can use an `Explorer` in one of two ways:

1. Provide two lists of DOM items.

2. Provide a single list of items. These will be slotted into the stage element. `Explorer` will generate an equivalently long set of _proxy_ elements

[proxyUpdates](#proxyUpdates) method