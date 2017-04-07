# Tabs

`Tabs` is a set of tabbed panels that can be navigated by selecting
corresponding tab buttons (which must be supplied by the developer). A typical
example of `Tabs` being used for navigation:

    <elix-tabs>

      <button slot="tabButtons">Home</button>
      <div>Home page</div>

      <button slot="tabButtons">Search</button>
      <div>Search page</div>

      <button slot="tabButtons">Settings</button>
      <div>Settings page</div>

    </elix-tabs>

When styling and icons are added, the result might be:

[Tabs used for navigation](/demos/toolbarTabs.html)

`Tabs` is a general-purpose component that takes care of the relative
positioning of the tab buttons and the tab panels, and ensures that the
selection state of the buttons and panels remains in sync. As shown above, when
using `Tabs` directly you will need to supply your own tab buttons.

A subclass of `Tabs` called [LabeledTabs](LabeledTabs) automatically generates
generic tab buttons for each tab panel:

[LabeledTabs, showing options for tab button position and alignment](/demos/labeledTabs.html)

The `Tabs` class is registered as element `<elix-tabs>`.

## Usage

Use `Tabs` for situations in which the user can directly control which modal
state is presented. Tabs are typically used to allow a UI to offer more controls
than can fit in a confined area at a time.

* A common use case is Settings or configuration UIs. Here the classic look of
  a tabbed dialog or property sheet is addressed with `LabeledTabs`, although
  other looks are possible.
* Tabs may also be used in a main window to downplay less-commonly used aspects
  of a UI.
* Tabs are also an extremely common navigation model. Many mobile applications
  present a navigation toolbar that behave like tabs, presenting 3–5 buttons
  that correspond to the app's main areas. In navigation use cases, the tab
  buttons typically have a toolbar button style rather than a classic tabbed
  appearance.

In practice, what is fundamentally behaving like tabs may have widely varying
tab buttons or visual transition effects. To accommodate those use cases, `Tabs`
is constructed from lower-lever parts you can recombine to create more
specialized tab UIs.

For example, the `Tabs` component assumes a standard tabbed UI design in which
clicking a tab immediately makes the corresponding tab panel visible. To manage
that visual transition, `Tabs` internally on [TabStripWrapper](TabStripWrapper)
to apply a [TabStrip](TabStrip) to an instance of [Modes](Modes). If, however,
you wish to provide other visual effects for the transition between panels
(e.g., a sliding animation), you can create your own variant of `Tabs` by
applying `TabStripWrapper` to a component of your own that contains the tab
panels. See `TabStripWrapper` for details.
