# Explorer

`Explorer` serves as a base class for implementing item selection user interface patterns that couple two synchronized elements that both support selection. The main "stage" element focuses the user's attention on a single item drawn from a list. A secondary "proxy list" element presents a set of smaller proxy elements, one for each item in the main list. The `Explorer` keeps the stage and proxy list elements in sync: if the user changes the selection in one element, the selection in the other element is updated to match.

`Explorer` serves as the basis for a variety of common user interface elements:

[`Carousel` uses a set of dots as proxies, and a `SlidingStage` as its stage](/demos/carousel.html)

[`Tabs` uses `TabButton` elements as proxies and `Modes` as its stage](/demos/tabs.html)

[A `Tabs` variation for navigation using `SlidingStage` as the stage](/demos/toolbarTabs.html)

[`ListExplorer` uses a `ListBox` for the proxy list and `Modes` for the stage](/demos/listExplorer.html)

These components present different user interfaces, but they all possess a list synchronized with a stage. The specific form of the stage or proxy list may vary while remaining true to the pattern.


## Customizing `Explorer` using element tags

You can customize `Explorer` or its subclasses by specifying which tags should be used to create various subelements:

* [stageTag](#stageTag): The element used for the main stage.
* [proxyListTag](#proxyListTag): The element used for the list of proxies.
* [proxyTag](#proxyTag): The element used to instantiate default proxy elements if none are supplied.

For example, both [Modes](Modes), [SlidingStage](SlidingStage), [CrossfadeStage](CrossfadeStage) can all serve as a stage showing a single item at a time. The only difference is that, when the selection changes, they show different transition effects: an immediate transition, a horizontal sliding effect, and a crossfade effect, respectively.


## Supplying items to an `Explorer`

Elements you place inside an `Explorer` become the list items navigated by the stage element. E.g., for a carousel:

```html
    <elix-carousel>
      <img src="image1.jpg">
      <img src="image2.jpg">
      <img src="image3.jpg">
      <img src="image4.jpg">
      <img src="image5.jpg">
    </elix-carousel>
```

Alternatively, you can allow `Explorer` to generate default proxies. For each item in the main list, `Explorer` will create an instance of the element specified by `proxyTag`. Additionally, certain subclasses of `Explorer` can set the content of the proxy element to reflect data in the corresponding list item. E.g., [Tabs](Tabs) will use the `aria-label` or `alt` attribute of the list item.

You can also create proxy elements yourself and slot them into the `proxy` slot:

```html
    <elix-carousel>
      <div slot="proxy">1</div>
      <div slot="proxy">2</div>
      <div slot="proxy">3</div>
      <div slot="proxy">4</div>
      <div slot="proxy">5</div>
      <img src="image1.jpg">
      <img src="image2.jpg">
      <img src="image3.jpg">
      <img src="image4.jpg">
      <img src="image5.jpg">
    </elix-carousel>
```

[`Carousel` with custom proxies](/demos/carouselWithProxies.html)

If you want to programmatically manipulate the appearance or content of a proxy element, you can override the Explorer's [proxyUpdates](#proxyUpdates) method.


## Layout

`Explorer` manages the top/left/bottom/right visual positioning of the list in relation the stage. You can specify a position through the [proxyListPosition](#proxyListPosition) property, and control whether the proxy list overlaps the stage with the [proxyListOverlap](#proxyListOverlap) property.
