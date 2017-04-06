# TabStripWrapper

This wrapper adds a [TabStrip](TabStrip) to a base element, wiring the selection
states of the two together. For example, the [Tabs](Tabs) component uses
`TabStripWrapper` to connect a `TabStrip` to a [Modes](Modes) instance.

This wrapper allows a `TabStrip` to be applied to many kinds of components. If,
for example, you wish to provide visual or interactive tab-switching effects
more complex than the instantaneous transition offered by `Modes`, you can
create a component of your own that styles/renders the tab panels, and then add
tabs to it with `TabStripWrapper`.

`TabStripWrapper` is a kind of mixin that returns a new class incorporating a
base class' template. Suppose `TabStripWrapper` is applied to a component that
uses [ShadowTemplateMixin](ShadowTemplateMixin) to define a simple template that
just contains a single `div` holding a default `slot`:

    class DivWithTabs extends TabStripWrapper(ShadowTemplateMixin(HTMLElement)) {
      get [symbols.template]() {
        return `
          <!-- Defined by DivWithTabs -->
          <div id="container">
            <slot></slot>
          </div>
        `;
      }
    }
    customElements.define('div-with-tabs', DivWithTabs);

`TabStripWrapper` will wrap the template above, so the final class will contain
a template the contents of the `DivWithTabs` template alongside a `TabStrip`
instance. The final template will look like:

    <div-with-tabs>
      <TabStrip>
        <slot name="tabButtons"></slot>
      </TabStrip>

      <!-- Defined by DivWithTabs -->
      <div id="container">
        <slot></slot>
      </div>

    </div-with-tabs>

As shown in the complete (wrapped) template above, a component using
`TabStripWrapper` gains a slot called `tabButtons`. Child elements assigned to
that slot will be appear inside the `TabStrip`.

`TabStripWrapper` handles the assignment of ARIA roles necessary to support best
practices. It assigns a default ARIA role of `tablist` to the component itself
and `tabpanel` to each tab panel.
