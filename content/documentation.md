# Developer documentation

This section is organized into several areas:

* [Elements](/documentation/elements): web components which you can use directly
  in your web projects, or as starting points for your own components. These
  elements do their best to meet [Gold Standard checklist for Web
  Components](https://github.com/webcomponents/gold-standard/wiki), a rigorous
  standard for ensuring a high level of component quality.

* [Mixins](/documentation/mixins): aspects of component behavior that can be
  combined to create functional web components that meet the Gold Standard.

* [Helpers](/documentation/helpers): low-level functions used by the above, and
  also avaible for cases where you need to build your own solution.


## Elix render pipeline

Elix components use a functional-reactive programming (FRP) architecture. To achieve high quality, reliable behaviors across a large number of components, the project breaks down component behaviors in [mixins](mixins). These mixins cooperate with each other, generally handling a specific point in a rendering pipeline:

> events → methods → state → updates → DOM

1. User activity generates DOM **events**, such as a `keydown` or `touchstart` event. User activity can also trigger application behavior that produces custom element lifecycle callbacks (e.g., `attributeChangedCallback`). These can also be considered events in this pipeline.
2. Event handlers respond by invoking **methods** or setting **properties** on the component. (In very simple cases, an event handler skip this step, and directly call `setState` to update component state.)
3. Component methods/properties in turn update component **state**. The method/property may call `setState` directly, or it might invoke another method/property that ultimately calls `setState`.
4. The component is asked for **updates** it would like to apply to the DOM.
5. Updates **render** changes to the DOM. Alternatively, the component can implement an internal `render` method that updates the DOM directly.

In rare cases, a component may need to do additional work after updates have been been rendered to the DOM.


### Core mixins that define the pipeline

The pipeline described above is defined by a core set of component mixins:

* [ReactiveMixin](/documentation/ReactiveMixin). Manages a component's `state` property, and renders the compnent when state changes.
* [RenderUpdatesMixin](/documentation/RenderUpdatesMixin). Helps a component map `state` to a set of `updates` that should be applied to DOM attributes, classes, styles, and properties.
* [ShadowTemplateMixin](/documentation/ShadowTemplateMixin). Creates a component's shadow root and stamps a template into it.

For convenience, this set of core mixins is provided in a single base class called [ReactiveElement](/documentation/ReactiveElement). (ReactiveElement also includes `AttributeMarshallingMixin`, below.) When creating your own components, you don't have to use that base class; you can use the mixins above directly.

The remaining Elix mixins generally focus on the transition from one of these steps in the pipeline to the next.


### Mixins that handle events (events → methods)

Some of these mixins directly update state.

* [ArrowDirectionMixin](/documentation/ArrowDirectionMixin). Adds left/right buttons that map to `goLeft`/`goRight` methods.
* [AttributeMarshallingMixin](/documentation/AttributeMarshallingMixin). Maps attributes to properties.
* [ClickSelectionMixin](/documentation/ClickSelectionMixin). Maps clicks on items to setting `selectedIndex` property.
* [FocusVisibleMixin](/documentation/FocusVisibleMixin). Tracks whether to show a focus ring indicator, sets `state.focusRing`.
* [HoverMixin](/documentation/HoverMixin). Maps `mouseenter`/`mouseleave` events to `state.hover`.
* [KeyboardMixin](/documentation/KeyboardMixin). Maps `keydown` events to `keydown` method.
* [PopupModalityMixin](/documentation/PopupModalityMixin). Maps `blur` and various window/document events to `close` method.
* [SlotContentMixin](/documentation/SlotContentMixin). When the component's slot receives a `slotchange` event, this updates `state.content` with the new nodes assigned to the slot.
* [TouchSwipeMixin](/documentation/TouchSwipeMixin). Maps touch swipe gestures to `state.swipeFraction` and `swipeLeft`/`swipeRight` methods.
* [TrackpadSwipeMixin](/documentation/TrackpadSwipeMixin). Maps trackpad gestures to `state.swipeFraction` and `swipeLeft`/`swipeRight` methods.
* [TransitionEffectMixin](/documentation/TransitionEffectMixin). Manages state changes that depend upon completion of CSS transitions.


### Mixins that map methods to other methods

These mixins generally map from a low-level abstraction (e.g., a specific type of key has been pressed) to a higher-level abstraction (something should be selected).

* [DialogModalityMixin](/documentation/DialogModalityMixin). Maps Esc key to `close` method. (This mixin also has effects following the render phase.)
* [DirectionSelectionMixin](/documentation/DirectionSelectionMixin). Maps methods like `goLeft`/`goRight` to `selectPrevious`/`selectNext`.
* [FocusCaptureMixin](/documentation/FocusCaptureMixin). Wraps the keyboard focus within a component such as a dialog.
* [KeyboardDirectionMixin](/documentation/KeyboardDirectionMixin). Maps keypresses like Left and Right arrow keys to `goLeft`/`goRight` methods.
* [KeyboardPagedSelectionMixin](/documentation/KeyboardPagedSelectionMixin). Maps Page Up and Page Down keys to changes to `state.selectedIndex`.
* [KeyboardPrefixSelectionMixin](/documentation/KeyboardPrefixSelectionMixin). Maps prefix typing to changes to `state.selectedIndex`.
* [PopupModalityMixin](/documentation/PopupModalityMixin). Maps Esc key to `close` method.
* [SwipeDirectionMixin](/documentation/SwipeDirectionMixin). Maps `swipeLeft`/`swipeRight` methods to `goLeft`/`goRight` methods.


### Mixins that update state (methods → state)

* [OpenCloseMixin](/documentation/OpenCloseMixin). Tracks the opened/closed state, providing open/close methods that set a `state.opened` member.
* [SelectedItemTextValueMixin](/documentation/SelectedItemTextValueMixin). Supplies a `value` property that gets/sets the item specified by a `selectedIndex` property.
* [SingleSelectionMixin](/documentation/SingleSelectionMixin). Maps selection methods like `selectPrevious`/`selectNext` to changes in `state.selectedIndex`.


### Mixin that render state (state → render)

* [AriaListMixin](/documentation/AriaListMixin). Renders `state.selectedIndex` as various ARIA attributes like `aria-activedescendant`.
* [ArrowDirectionMixin](/documentation/ArrowDirectionMixin). Renders left/right arrow buttons.
* [ContentItemsMixin](/documentation/ContentItemsMixin). Defines an `items` property based on `state.content`, filtering out auxiliary invisible elements. During rendering, the component is given a chance to indicate what updates should be assigned to each specific item in `items`.
* [DialogModalityMixin](/documentation/DialogModalityMixin). Renders a default ARIA role.
* [OverlayMixin](/documentation/OverlayMixin). Renders an open state as changes to `display` and `z-index` to make an element appear on top.
* RenderUpdatesMixin


### Mixins that perform work after render

In rare cases, a mixin may need to perform work _after_ a component has been rendered in the DOM.

* [DialogModalityMixin](/documentation/DialogModalityMixin). Disables document scrolling while an overlay open.
* [LanguageDirectionMixin](/documentation/LanguageDirectionMixin). If component is in the content of a right-to-left language, this sets `state.rightToLeft`.
* [SelectionInViewMixin](/documentation/SelectionInViewMixin). When `state.selectedIndex` changes, ensure that the selected item is scrolled into view.


### Mixins that perform work at more than one stage

* [SlotItemsMixin](/documentation/SlotItemsMixin). Combines [SlotContentMixin](SlotContentMixin), which handles the `slotchange` event, and [ContentItemsMixin](ContentItemsMixin), which renders state.


## Other resources

More information and background about the Elix project can be found at the 
following:

* [The Web Platform Podcast: The Gold Standard Checklist for Web Components](http://thewebplatformpodcast.com/126-gold-standard-checklist-for-web-components)
* [The Web Platform Podcast: Elix Project](http://thewebplatformpodcast.com/129-elix-project)
* [Web Components Remote Conf: Getting the basics right with Jan Miksovsky](https://youtu.be/3Xq0IrFbZGg)
* [Component Kitchen](https://component.kitchen)
