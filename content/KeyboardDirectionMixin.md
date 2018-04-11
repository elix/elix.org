# KeyboardDirectionMixin

**Purpose:** map arrow and Home/End keys to semantic direction methods. This allows a developer to quickly support directional navigation in a component, and to avoid common pitfalls. For example, a component listening to presses of the Left or Right keys should take care to _not_ handle those keys if a meta key (Command key on Macs, Windows key on Windows) or alt key (Option key on Macs, Alt key on Windows) are pressed, as that would interfere with browser navigation shortcuts.


This mixin works in the middle of the [Elix render pipeline](/documentation#elix-render-pipeline):

> events → **methods** ➞ **methods** → setState → updates → render DOM → post-render

**Expects** the component to provide:
* `symbols.goDown`, `symbols.goUp`, `symbols.goLeft`, `symbols.goRight` methods, e.g., from [DirectionSelectionMixin](DirectionSelectionMixin).
* `symbols.keydown` method, usually defined by [KeyboardMixin](KeyboardMixin).

**Provides** the component with:
* Mappings from direction keyboard events to direction methods.


## Usage

    import KeyboardDirectionMixin from 'elix/src/KeyboardDirectionMixin.js';
    class MyElement extends KeyboardDirectionMixin(HTMLElement) {}


## Mapping direction keys to semantic direction methods

The supported mapping of keys to direction methods is:

* **Down** key → invokes [symbols.goDown](symbols#goDown) if vertical navigation
  is enabled. If the Alt key is pressed, this invokes
  [symbols.goEnd](symbols#goEnd).
* **End** key → invokes [symbols.goEnd](symbols#goEnd).
* **Home** key → invokes [symbols.goStart](symbols#goStart).
* **Left** key → invokes [symbols.goLeft](symbols#goLeft) if horizontal
  navigation is enabled. If the meta key or alt key is pressed, the key is
  ignored.
* **Right** key → invokes [symbols.goRight](symbols#goRight) if horizontal
  navigation is enabled. If the meta key or alt key is pressed, the key is
  ignored.
* **Up** key → invokes [symbols.goUp](symbols#goUp) if vertical navigation is
  enabled. If the Alt key is pressed, this invokes
  [symbols.goStart](symbols#goStart).

If your goal is to map direction semantics to selection semantics (e.g., to have direction keys navigate a list of items), you can use [DirectionSelectionMixin](DirectionSelectionMixin) for that purpose.

The mixin inspects a property called `orientation` to determine whether horizontal navigation, vertical navigation, or both are enabled. Valid values for that property are "horizontal", "vertical", or "both", respectively. If the property is not defined, the default value is "both".
