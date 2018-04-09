# Elements

The Elix elements are a collection of web components implementing extremely common general-purpose user interface patterns.

These elements are all designed to satisfy the [Gold Standard checklist for Web Components](https://github.com/webcomponents/gold-standard/wiki), and so are intended to be immediately useful in your web projects.

Since no solution is perfect for everyone, all of these elements are built from smaller [mixins](mixins) that you can recombine to suit your needs. In that case, you may find the Elix elements helpful as reference examples.

<div class="pageNavigation">
  <h2>Elements</h2>
  <ul>
    <li><a href="AlertDialog">AlertDialog</a></li>
    <li><a href="ArrowDirectionButton">ArrowDirectionButton</a></li>
    <li><a href="AutosizeTextarea">AutosizeTextarea</a></li>
    <li><a href="Carousel">Carousel</a></li>
    <li><a href="CarouselWithThumbnails">CarouselWithThumbnails</a></li>
    <li><a href="CenteredStrip">CenteredStrip</a></li>
    <li><a href="CenteredStripHighlight">CenteredStripHighlight</a></li>
    <li><a href="CenteredStripOpacity">CenteredStripOpacity</a></li>
    <li><a href="Dialog">Dialog</a></li>
    <li><a href="Drawer">Drawer</a></li>
    <li><a href="ExpandablePanel">ExpandablePanel</a></li>
    <li><a href="Explorer">Explorer</a></li>
    <li><a href="ListBox">ListBox</a></li>
    <li><a href="ListExplorer">ListExplorer</a></li>
    <li><a href="ModalBackdrop">ModalBackdrop</a></li>
    <li><a href="ModalBackdrop">ModalBackdrop</a></li>
    <li><a href="Modes">Modes</a></li>
    <li><a href="Overlay">Overlay</a></li>
    <li><a href="PageDot">PageDot</a></li>
    <li><a href="Popup">Popup</a></li>
    <li><a href="ReactiveElement">ReactiveElement</a></li>
    <li><a href="SlidingPages">SlidingPages</a></li>
    <li><a href="SlidingStage">SlidingStage</a></li>
    <li><a href="TabButton">TabButton</a></li>
    <li><a href="Tabs">Tabs</a></li>
    <li><a href="TabStrip">TabStrip</a></li>
    <li><a href="Thumbnail">Thumbnail</a></li>
    <li><a href="Toast">Toast</a></li>
    <li><a href="WrappedStandardElement">WrappedStandardElement</a></li>
  </ul>
</div>


## Customizing elements

You can extensively customize Elix elements for the context of your application. There are several techniques for doing this:

* [updates](updates) property. When the state of an Elix element changes, it uses a mixin called [RenderUpdatesMixin](RenderUpdatesMixin) to determine what updates should be applied to the element host and the elements in its shadow tree. This system allows for the appearance and behavior of an element to be collectively defined by the element class, its base classes, and any mixins applied to it. You can tap into this system by subclassing an Elix element and defining an `updates` property that sets styles and other properties on the element or its subelements.

* Element tag properties. Complex Elix elements like [Carousel](Carousel) and [Tabs](Tabs) have templates with various key subelements. Such complex elements expose properties you can set to determine what standard or custom HTML elements are used at those key points in the template. E.g., `Carousel` has a key subelement called the "stage" that shows a single selected item (usually an image) at a large size, and another key subelement called the "proxy list" showing a set of elements (by default, small dots) that can be used to select a specific item. By specifying what standard or custom element should be used for that key subelements, you can provide arbitrary customizations of the `Carousel`'s appearance and behavior. See this [blog post on customizable elements](https://component.kitchen/blog/posts/customizing-custom-elements-with-custom-elements) for more background.

* Slots. Most Elix elements accept content via their default slot. Some complex elements have multiple slots. E.g., `Carousel` defines slots inside its left and right arrow buttons, allowing you to customize the arrow icon or other content shown inside those buttons.
